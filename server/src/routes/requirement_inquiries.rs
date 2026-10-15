use std::{collections::HashMap, net::SocketAddr};

use axum::{
    extract::{ConnectInfo, FromRequest, Multipart, Request, State},
    http::{header, StatusCode},
    response::{IntoResponse, Response},
    Json,
};
use serde::Deserialize;
use serde_json::json;
use validator::ValidateEmail;

use super::contact::{enforce_email_limit, enforce_request_limits, failure, unavailable};
use crate::{
    db::DbPool,
    services::contact::{self, ContactConfig, ContactMessage, MailAttachment},
};

const MAX_FILE_BYTES: usize = 10 * 1024 * 1024;
const MAX_TOTAL_BYTES: usize = 15 * 1024 * 1024;
const MAX_FILES: usize = 3;

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct RequirementInquiry {
    #[serde(default)]
    context: String,
    full_name: String,
    email: String,
    phone: String,
    #[serde(default)]
    whatsapp_number: String,
    requirement_type: String,
    what_do_you_need: String,
    #[serde(default)]
    country: String,
    #[serde(default)]
    timeline: String,
    #[serde(default)]
    budget_range: String,
    #[serde(default)]
    additional_requirements: String,
    agree_to_terms: bool,
    website: String,
}

impl RequirementInquiry {
    fn validate(mut self) -> Result<Self, HashMap<String, String>> {
        let mut errors = HashMap::new();
        for (key, value, min, max, multiline) in [
            ("context", &mut self.context, 0, 60, false),
            ("fullName", &mut self.full_name, 1, 120, false),
            ("email", &mut self.email, 3, 254, false),
            ("phone", &mut self.phone, 7, 20, false),
            ("whatsappNumber", &mut self.whatsapp_number, 0, 60, false),
            ("requirementType", &mut self.requirement_type, 1, 120, false),
            ("whatDoYouNeed", &mut self.what_do_you_need, 1, 4000, true),
            ("country", &mut self.country, 0, 120, false),
            ("timeline", &mut self.timeline, 0, 120, false),
            ("budgetRange", &mut self.budget_range, 0, 120, false),
            (
                "additionalRequirements",
                &mut self.additional_requirements,
                0,
                4000,
                true,
            ),
        ] {
            *value = value.trim().to_string();
            let length = value.encode_utf16().count();
            if length < min
                || length > max
                || value.chars().any(|c| {
                    if multiline {
                        c.is_control() && !matches!(c, '\r' | '\n' | '\t')
                    } else {
                        c.is_control() || matches!(c, '\u{2028}' | '\u{2029}')
                    }
                })
            {
                errors.insert(
                    key.into(),
                    format!("Use {min} to {max} characters without unsupported characters."),
                );
            }
        }
        if !self.email.validate_email() || self.email.parse::<lettre::Address>().is_err() {
            errors.insert("email".into(), "Enter a valid email address.".into());
        }
        if !self
            .phone
            .strip_prefix('+')
            .unwrap_or(&self.phone)
            .chars()
            .all(|c| c.is_ascii_digit() || matches!(c, ' ' | '(' | ')' | '-'))
        {
            errors.insert("phone".into(), "Enter a valid phone number.".into());
        }
        if !self.agree_to_terms {
            errors.insert(
                "agreeToTerms".into(),
                "You must confirm before submitting your requirement.".into(),
            );
        }
        if !self.website.is_empty() {
            errors.insert(
                "security".into(),
                "We could not accept this requirement.".into(),
            );
        }
        if errors.is_empty() {
            Ok(self)
        } else {
            Err(errors)
        }
    }

    fn email_message(self, reference: &str) -> ContactMessage {
        ContactMessage {
            name: self.full_name,
            email: self.email,
            phone: self.phone,
            subject: format!("Requirement: {} [{reference}]", self.requirement_type),
            message: format!("New Requirement Submission\n\nReference: {reference}\nContext: {}\nType of Requirement: {}\nWhatsApp Number: {}\nCountry / City: {}\nPreferred Timeline: {}\nBudget Range: {}\n\nWhat Do You Need?\n{}\n\nAdditional Notes or Specifications:\n{}\n\nPrivacy consent: Confirmed\nSource page: Tell Us What You Need", self.context, self.requirement_type, self.whatsapp_number, self.country, self.timeline, self.budget_range, self.what_do_you_need, self.additional_requirements),
            website: String::new(),
        }
    }
}

fn attachment(name: String, data: Vec<u8>) -> Result<MailAttachment, Response> {
    let invalid = || {
        failure(
            StatusCode::BAD_REQUEST,
            "INVALID_ATTACHMENT",
            "Use PDF, DOC, DOCX, JPG, PNG or WEBP files up to 10 MB each.",
        )
    };
    if name.is_empty()
        || name.encode_utf16().count() > 200
        || name
            .chars()
            .any(|c| c.is_control() || matches!(c, '/' | '\\' | '\u{2028}' | '\u{2029}'))
        || data.is_empty()
        || data.len() > MAX_FILE_BYTES
    {
        return Err(invalid());
    }
    // Do not trust a browser-supplied MIME type or filename extension alone.
    let extension = name
        .rsplit('.')
        .next()
        .unwrap_or_default()
        .to_ascii_lowercase();
    let content_type = match extension.as_str() {
        "pdf" if data.starts_with(b"%PDF-") => "application/pdf",
        "doc" if data.starts_with(&[0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]) => {
            "application/msword"
        }
        "docx"
            if data.starts_with(b"PK\x03\x04")
                && data.windows(19).any(|s| s == b"[Content_Types].xml")
                && data.windows(5).any(|s| s == b"word/") =>
        {
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        }
        "jpg" | "jpeg" if data.starts_with(&[0xff, 0xd8, 0xff]) => "image/jpeg",
        "png" if data.starts_with(b"\x89PNG\r\n\x1a\n") => "image/png",
        "webp" if data.starts_with(b"RIFF") && data.get(8..12) == Some(b"WEBP") => "image/webp",
        _ => return Err(invalid()),
    }
    .parse()
    .map_err(|_| invalid())?;
    Ok(MailAttachment {
        name,
        content_type,
        data,
    })
}

pub async fn submit(
    State(pool): State<DbPool>,
    ConnectInfo(peer): ConnectInfo<SocketAddr>,
    request: Request,
) -> Response {
    let config = match ContactConfig::from_env() {
        Ok(config) => config,
        Err(stage) => return unavailable(stage),
    };
    if let Err(response) =
        enforce_request_limits(&config, &pool, peer.ip(), request.headers()).await
    {
        return response;
    }
    let mut multipart = match Multipart::from_request(request, &pool).await {
        Ok(multipart) => multipart,
        Err(_) => {
            return failure(
                StatusCode::BAD_REQUEST,
                "INVALID_REQUEST",
                "Submit valid requirement details and attachments.",
            )
        }
    };
    let mut data = None;
    let mut files = Vec::new();
    let mut total_bytes = 0;
    loop {
        let field = match multipart.next_field().await {
            Ok(Some(field)) => field,
            Ok(None) => break,
            Err(error) => {
                return failure(
                    error.status(),
                    "INVALID_REQUEST",
                    "Your upload could not be accepted. Check the file size and try again.",
                )
            }
        };
        let name = field.name().unwrap_or_default().to_string();
        let filename = field.file_name().map(str::to_string);
        let bytes = match field.bytes().await {
            Ok(bytes) => bytes,
            Err(error) => {
                return failure(
                    error.status(),
                    "INVALID_REQUEST",
                    "Your upload could not be accepted. Check the file size and try again.",
                )
            }
        };
        match name.as_str() {
            "data" if data.is_none() && filename.is_none() && bytes.len() <= 32 * 1024 => {
                data = serde_json::from_slice::<RequirementInquiry>(&bytes).ok();
                if data.is_none() {
                    return failure(
                        StatusCode::BAD_REQUEST,
                        "INVALID_REQUEST",
                        "Check your requirement details.",
                    );
                }
            }
            "files" if files.len() < MAX_FILES && filename.is_some() => {
                total_bytes += bytes.len();
                if total_bytes > MAX_TOTAL_BYTES {
                    return failure(
                        StatusCode::PAYLOAD_TOO_LARGE,
                        "UPLOAD_TOO_LARGE",
                        "Attach up to 3 files totaling 15 MB or less.",
                    );
                }
                match attachment(filename.unwrap(), bytes.to_vec()) {
                    Ok(file) => files.push(file),
                    Err(response) => return response,
                }
            }
            _ => {
                return failure(
                    StatusCode::BAD_REQUEST,
                    "INVALID_REQUEST",
                    "Attach up to 3 files and submit one set of requirement details.",
                )
            }
        }
    }
    let data = match data {
        Some(data) => match data.validate() {
            Ok(data) => data,
            Err(fields) => {
                return (
                    StatusCode::BAD_REQUEST,
                    [(header::CACHE_CONTROL, "no-store")],
                    Json(json!({"success":false,"fieldErrors":fields})),
                )
                    .into_response()
            }
        },
        None => {
            return failure(
                StatusCode::BAD_REQUEST,
                "INVALID_REQUEST",
                "Enter your requirement details.",
            )
        }
    };
    if let Err(response) = enforce_email_limit(&pool, &data.email).await {
        return response;
    }
    let reference = format!(
        "REQ-{}",
        &uuid::Uuid::new_v4().simple().to_string()[..12].to_uppercase()
    );
    let message = data.email_message(&reference);
    match contact::send_with_attachments(&config, &message, files).await {
        Ok(()) => {
            tracing::info!(
                form = "requirement",
                reference,
                "contact_email_accepted_by_smtp"
            );
            (
                StatusCode::OK,
                [(header::CACHE_CONTROL, "no-store")],
                Json(json!({"success":true,"data":{"accepted":true,"reference":reference}})),
            )
                .into_response()
        }
        Err(stage) => unavailable(stage),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn inquiry() -> RequirementInquiry {
        serde_json::from_value(json!({
            "context":"general","fullName":"Test Visitor","email":"visitor@example.com",
            "phone":"+94 77 123 4567","whatsappNumber":"+94 77 123 4567",
            "requirementType":"IT Solutions","whatDoYouNeed":"A stock management application.",
            "country":"Sri Lanka","timeline":"Within 1 month","budgetRange":"Flexible",
            "additionalRequirements":"First line\nSecond line","agreeToTerms":true,"website":""
        }))
        .unwrap()
    }

    #[test]
    fn validates_fields_consent_and_honeypot_before_email_creation() {
        assert!(inquiry().validate().is_ok());
        for field in [
            "fullName",
            "email",
            "phone",
            "requirementType",
            "whatDoYouNeed",
        ] {
            let mut value = serde_json::to_value(json!({
                "fullName":"Visitor","email":"visitor@example.com","phone":"12345678",
                "requirementType":"IT","whatDoYouNeed":"Software","agreeToTerms":true,"website":""
            }))
            .unwrap();
            value[field] = json!("");
            assert!(serde_json::from_value::<RequirementInquiry>(value)
                .unwrap()
                .validate()
                .is_err());
        }
        let mut value = inquiry();
        value.agree_to_terms = false;
        assert!(value.validate().is_err());
        let mut value = inquiry();
        value.website = "spam".into();
        assert!(value.validate().is_err());
        let mut value = inquiry();
        value.full_name = "Visitor\r\nBcc: victim@example.com".into();
        assert!(value.validate().is_err());
        let mut value = inquiry();
        value.additional_requirements = "x".repeat(4001);
        assert!(value.validate().is_err());
    }

    #[test]
    fn includes_every_requirement_field_and_reference_in_the_email() {
        let mail = inquiry().email_message("REQ-ABC123DEF456");
        assert_eq!(mail.email, "visitor@example.com");
        assert_eq!(mail.name, "Test Visitor");
        assert!(mail.subject.contains("IT Solutions [REQ-ABC123DEF456]"));
        for text in [
            "general",
            "IT Solutions",
            "+94 77 123 4567",
            "Sri Lanka",
            "Within 1 month",
            "Flexible",
            "A stock management application.",
            "First line\nSecond line",
            "Privacy consent: Confirmed",
        ] {
            assert!(mail.message.contains(text));
        }
    }

    #[test]
    fn checks_attachment_content_size_and_filename_without_trusting_mime() {
        assert!(attachment("specification.pdf".into(), b"%PDF-1.4\nTest".to_vec()).is_ok());
        assert!(attachment("picture.png".into(), b"\x89PNG\r\n\x1a\nTest".to_vec()).is_ok());
        for (name, bytes) in [
            ("script.pdf", b"<script>test</script>".to_vec()),
            ("test.exe", b"%PDF-1.4".to_vec()),
            ("../test.pdf", b"%PDF-1.4".to_vec()),
            ("test\r\n.pdf", b"%PDF-1.4".to_vec()),
            ("test.pdf", Vec::new()),
            ("test.pdf", vec![0; MAX_FILE_BYTES + 1]),
        ] {
            assert!(attachment(name.into(), bytes).is_err());
        }
    }
}
