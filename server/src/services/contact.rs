use std::{collections::HashMap, net::IpAddr, time::Duration};

use lettre::{
    message::{header::ContentType, Mailbox},
    transport::smtp::authentication::Credentials,
    AsyncSmtpTransport, AsyncTransport, Message, Tokio1Executor,
};
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};
use sqlx::PgPool;
use validator::ValidateEmail;

pub const MAIL_FROM: &str = "admin@miracleinternational.lk";
pub const MAIL_TO: &str = "infomiracle.lk@gmail.com";

// Deliberately no Debug implementation: this contains mailbox credentials.
pub struct ContactConfig {
    pub origins: Vec<String>,
    pub trusted_proxies: Vec<IpAddr>,
    smtp_user: String,
    smtp_password: String,
}

impl ContactConfig {
    pub fn from_env() -> Result<Self, &'static str> {
        Self::from_values(|key| std::env::var(key).ok())
    }

    pub(crate) fn from_values(get: impl Fn(&str) -> Option<String>) -> Result<Self, &'static str> {
        let required = |key| {
            get(key)
                .filter(|v| !v.trim().is_empty() && !v.contains("replace-with"))
                .ok_or("configuration")
        };
        for (key, expected) in [
            ("SMTP_HOST", "smtp.stackmail.com"),
            ("SMTP_PORT", "465"),
            ("SMTP_SECURE", "true"),
            ("MAIL_FROM", MAIL_FROM),
            ("MAIL_TO", MAIL_TO),
        ] {
            if required(key)? != expected {
                return Err("configuration");
            }
        }
        let origins = parse_origins(&required("ALLOWED_ORIGIN")?)?;
        let trusted_proxies = get("CONTACT_TRUSTED_PROXY_IPS")
            .unwrap_or_default()
            .split(',')
            .filter(|v| !v.trim().is_empty())
            .map(|v| v.trim().parse().map_err(|_| "configuration"))
            .collect::<Result<Vec<IpAddr>, _>>()?;
        Ok(Self {
            origins,
            trusted_proxies,
            smtp_user: required("SMTP_USER")?,
            smtp_password: required("SMTP_PASSWORD")?,
        })
    }
}

pub fn parse_origins(value: &str) -> Result<Vec<String>, &'static str> {
    value
        .split(',')
        .map(|value| {
            let origin = value.trim();
            let url = url::Url::parse(origin).map_err(|_| "configuration")?;
            let local = matches!(url.host_str(), Some("localhost" | "127.0.0.1" | "[::1]"));
            if url.origin().ascii_serialization() != origin
                || !(url.scheme() == "https" || (local && url.scheme() == "http"))
            {
                return Err("configuration");
            }
            Ok(origin.to_string())
        })
        .collect()
}

#[derive(Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ContactMessage {
    pub name: String,
    pub email: String,
    #[serde(default)]
    pub phone: String,
    pub subject: String,
    pub message: String,
    pub website: String,
}

impl ContactMessage {
    pub fn validate(mut self) -> Result<Self, HashMap<String, String>> {
        let mut errors = HashMap::new();
        for (key, value, min, max) in [
            ("name", &mut self.name, 2, 100),
            ("email", &mut self.email, 3, 254),
            ("phone", &mut self.phone, 0, 40),
            ("subject", &mut self.subject, 1, 120),
            ("message", &mut self.message, 10, 5000),
        ] {
            *value = value.trim().to_string();
            // Match JavaScript's UTF-16 character limits, including emoji.
            let length = value.encode_utf16().count();
            let invalid = value.chars().any(|c| {
                if key == "message" {
                    c.is_control() && !matches!(c, '\n' | '\r' | '\t')
                } else {
                    c.is_control() || matches!(c, '\u{2028}' | '\u{2029}')
                }
            });
            if length < min || length > max || invalid {
                errors.insert(
                    key.to_string(),
                    format!(
                        "Use {min} to {max} characters for {key}, without unsupported characters."
                    ),
                );
            }
        }
        if !self.email.validate_email() || self.email.parse::<lettre::Address>().is_err() {
            errors.insert("email".into(), "Enter a valid email address.".into());
        }
        if !self.website.is_empty() {
            errors.insert(
                "security".into(),
                "We could not accept this message.".into(),
            );
        }
        if errors.is_empty() {
            Ok(self)
        } else {
            Err(errors)
        }
    }

    fn email_message(&self) -> Result<Message, &'static str> {
        let phone = if self.phone.is_empty() {
            String::new()
        } else {
            format!("Phone Number: {}\n\n", self.phone)
        };
        Message::builder()
            .from(Mailbox::new(Some("Miracle International".into()), MAIL_FROM.parse().map_err(|_| "configuration")?))
            .to(MAIL_TO.parse().map_err(|_| "configuration")?)
            .reply_to(self.email.parse().map_err(|_| "validation")?)
            .subject(format!("New Website Inquiry: {}", self.subject))
            .header(ContentType::TEXT_PLAIN)
            .body(format!("New Contact Form Submission\n\nFull Name: {}\n\nEmail Address: {}\n\n{}Subject: {}\n\nMessage:\n\n{}\n\nSource: Miracle International Website", self.name, self.email, phone, self.subject, self.message))
            .map_err(|_| "message")
    }
}

/// An atomic UPSERT shares counters across all instances using the existing DB.
pub async fn rate_limit(
    pool: &PgPool,
    key: &str,
    maximum: i64,
    seconds: i32,
) -> Result<Option<i64>, &'static str> {
    let key = hex::encode(Sha256::digest(key.as_bytes()));
    let (attempts, retry): (i64, i64) = sqlx::query_as(
        "INSERT INTO contact_rate_limits (bucket_key, attempts, expires_at)
         VALUES ($1, 1, now() + make_interval(secs => $2::double precision))
         ON CONFLICT (bucket_key) DO UPDATE SET
           attempts = CASE WHEN contact_rate_limits.expires_at <= now() THEN 1 ELSE contact_rate_limits.attempts + 1 END,
           expires_at = CASE WHEN contact_rate_limits.expires_at <= now() THEN EXCLUDED.expires_at ELSE contact_rate_limits.expires_at END
         RETURNING attempts, GREATEST(1, CEIL(EXTRACT(EPOCH FROM (expires_at - now())))::bigint)"
    ).bind(key).bind(f64::from(seconds)).fetch_one(pool).await.map_err(|_| "rate-limit")?;
    Ok((attempts > maximum).then_some(retry))
}

pub async fn send(config: &ContactConfig, message: &ContactMessage) -> Result<(), &'static str> {
    // relay() uses implicit TLS on 465 and verifies the Stackmail certificate.
    let transport = AsyncSmtpTransport::<Tokio1Executor>::relay("smtp.stackmail.com")
        .map_err(|_| "smtp-configuration")?
        .credentials(Credentials::new(
            config.smtp_user.clone(),
            config.smtp_password.clone(),
        ))
        .timeout(Some(Duration::from_secs(15)))
        .build();
    let email = message.email_message()?;
    tokio::time::timeout(Duration::from_secs(25), transport.send(email))
        .await
        .map_err(|_| "smtp-timeout")?
        .map_err(|error| {
            if error.is_timeout() {
                "smtp-timeout"
            } else {
                "smtp-delivery"
            }
        })?;
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    fn message() -> ContactMessage {
        ContactMessage {
            name: "Test Visitor".into(),
            email: "visitor@example.com".into(),
            phone: "+94 77 123 4567".into(),
            subject: "General Inquiry".into(),
            message: "Please send more information.".into(),
            website: String::new(),
        }
    }

    #[test]
    fn validates_required_fields_limits_and_injection() {
        assert!(message().validate().is_ok());
        let mut value = message();
        value.name.clear();
        assert!(value.validate().is_err());
        let mut value = message();
        value.email = "invalid".into();
        assert!(value.validate().is_err());
        let mut value = message();
        value.subject = "Hi\r\nBcc: victim@example.com".into();
        assert!(value.validate().is_err());
        let mut value = message();
        value.message = "x".repeat(5001);
        assert!(value.validate().is_err());
        let mut value = message();
        value.name = "😀".repeat(51);
        assert!(value.validate().is_err());
        let mut value = message();
        value.website = "spam".into();
        assert!(value.validate().is_err());
    }

    #[test]
    fn sender_recipient_and_plain_text_are_fixed() {
        let mail = message().email_message().unwrap();
        assert_eq!(mail.envelope().from().unwrap().to_string(), MAIL_FROM);
        assert_eq!(mail.envelope().to()[0].to_string(), MAIL_TO);
        let text = String::from_utf8(mail.formatted()).unwrap();
        assert!(text.contains("Reply-To: visitor@example.com"));
        assert!(text.contains("Content-Type: text/plain"));
        assert!(text.contains("New Website Inquiry: General Inquiry"));
        assert!(text.contains("Source: Miracle International Website"));
    }

    #[test]
    fn origins_are_exact_and_https_except_loopback() {
        assert!(parse_origins("https://miracleinternational.lk,http://localhost:3000").is_ok());
        for invalid in [
            "*",
            "https://example.com/",
            "http://example.com",
            "https://example.com/path",
            "",
        ] {
            assert!(parse_origins(invalid).is_err());
        }
    }

    #[test]
    fn configuration_fails_closed() {
        let vars: HashMap<&str, &str> = [
            ("SMTP_HOST", "smtp.stackmail.com"),
            ("SMTP_PORT", "465"),
            ("SMTP_SECURE", "true"),
            ("MAIL_FROM", MAIL_FROM),
            ("MAIL_TO", MAIL_TO),
            ("SMTP_USER", "authorized@example.com"),
            ("SMTP_PASSWORD", "test-only"),
            ("ALLOWED_ORIGIN", "https://miracleinternational.lk"),
        ]
        .into();
        assert!(ContactConfig::from_values(|k| vars.get(k).map(|v| v.to_string())).is_ok());
        for key in ["SMTP_USER", "SMTP_PASSWORD", "SMTP_HOST", "MAIL_TO"] {
            assert!(ContactConfig::from_values(|k| if k == key {
                None
            } else {
                vars.get(k).map(|v| v.to_string())
            })
            .is_err());
        }
        for (key, value) in [
            ("SMTP_PORT", "587"),
            ("SMTP_SECURE", "false"),
            ("MAIL_TO", "attacker@example.com"),
        ] {
            assert!(ContactConfig::from_values(|k| if k == key {
                Some(value.into())
            } else {
                vars.get(k).map(|v| v.to_string())
            })
            .is_err());
        }
    }
}
