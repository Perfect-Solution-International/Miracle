use std::net::{IpAddr, SocketAddr};

use axum::{
    extract::{rejection::JsonRejection, ConnectInfo, DefaultBodyLimit, State},
    http::{header, HeaderMap, HeaderValue, Method, StatusCode},
    response::{IntoResponse, Response},
    routing::post,
    Json, Router,
};
use serde_json::json;
use tower_http::cors::{AllowOrigin, CorsLayer};

use crate::{
    db::DbPool,
    services::contact::{self, ContactConfig, ContactMessage},
};

pub fn router() -> Router<DbPool> {
    if let Err(setting) = ContactConfig::from_env() {
        tracing::error!(
            setting,
            "contact_email_configuration_invalid; check backend environment and restart"
        );
    }
    let cors = CorsLayer::new()
        .allow_origin(AllowOrigin::predicate(|origin: &HeaderValue, _| {
            std::env::var("ALLOWED_ORIGIN")
                .ok()
                .and_then(|value| contact::parse_origins(&value).ok())
                .is_some_and(|origins| {
                    origin
                        .to_str()
                        .is_ok_and(|origin| origins.iter().any(|allowed| allowed == origin))
                })
        }))
        .allow_methods([Method::POST, Method::OPTIONS])
        .allow_headers([header::CONTENT_TYPE])
        .expose_headers([header::RETRY_AFTER]);
    Router::new()
        .route("/contact", post(submit))
        .layer(DefaultBodyLimit::max(32 * 1024))
        .route(
            "/requirement-inquiries",
            post(super::requirement_inquiries::submit)
                .layer(DefaultBodyLimit::max(16 * 1024 * 1024)),
        )
        .layer(cors)
}

pub(super) fn failure(status: StatusCode, code: &str, message: &str) -> Response {
    (
        status,
        [(header::CACHE_CONTROL, "no-store")],
        Json(json!({"success": false, "error": {"code": code, "message": message}})),
    )
        .into_response()
}

pub(super) fn unavailable(stage: &str) -> Response {
    // Never log SMTP exceptions, credentials or visitor messages.
    tracing::error!(stage, "contact_email_failure");
    failure(
        StatusCode::SERVICE_UNAVAILABLE,
        "CONTACT_UNAVAILABLE",
        "We cannot send your message right now. Please try again later or contact us by email.",
    )
}

fn limited(seconds: i64) -> Response {
    let mut response = failure(
        StatusCode::TOO_MANY_REQUESTS,
        "RATE_LIMITED",
        "Too many attempts. Please try again later.",
    );
    if let Ok(value) = HeaderValue::from_str(&seconds.to_string()) {
        response.headers_mut().insert(header::RETRY_AFTER, value);
    }
    response
}

fn client_ip(
    config: &ContactConfig,
    peer: IpAddr,
    headers: &HeaderMap,
) -> Result<IpAddr, &'static str> {
    if config.trusted_proxies.contains(&peer) {
        // The explicitly trusted reverse proxy must overwrite X-Real-IP.
        headers
            .get("x-real-ip")
            .and_then(|v| v.to_str().ok())
            .and_then(|v| v.parse().ok())
            .ok_or("proxy-configuration")
    } else {
        Ok(peer)
    }
}

async fn submit(
    State(pool): State<DbPool>,
    ConnectInfo(peer): ConnectInfo<SocketAddr>,
    headers: HeaderMap,
    payload: Result<Json<ContactMessage>, JsonRejection>,
) -> Response {
    let config = match ContactConfig::from_env() {
        Ok(config) => config,
        Err(stage) => return unavailable(stage),
    };
    let data = match validate_submission(&config, &pool, peer.ip(), &headers, payload).await {
        Ok(data) => data,
        Err(response) => return response,
    };
    match contact::send(&config, &data).await {
        Ok(()) => {
            tracing::info!(form = "contact", "contact_email_accepted_by_smtp");
            (
                StatusCode::OK,
                [(header::CACHE_CONTROL, "no-store")],
                Json(json!({"success": true, "data": {"accepted": true}})),
            )
                .into_response()
        }
        Err(stage) => unavailable(stage),
    }
}

// SMTP is called only after this gate accepts the submission. Origin limits
// browser access; persistent counters and validation also apply to direct clients.
async fn validate_submission(
    config: &ContactConfig,
    pool: &DbPool,
    peer: IpAddr,
    headers: &HeaderMap,
    payload: Result<Json<ContactMessage>, JsonRejection>,
) -> Result<ContactMessage, Response> {
    enforce_request_limits(config, pool, peer, headers).await?;
    let data = match payload {
        Ok(Json(data)) => match data.validate() {
            Ok(data) => data,
            Err(fields) => return Err((StatusCode::BAD_REQUEST, [(header::CACHE_CONTROL, "no-store")], Json(json!({"success": false, "error": {"code":"VALIDATION_ERROR", "message":"Check your details."}, "fieldErrors": fields}))).into_response()),
        },
        Err(error) => return Err(failure(if error.status() == StatusCode::PAYLOAD_TOO_LARGE { StatusCode::PAYLOAD_TOO_LARGE } else { StatusCode::BAD_REQUEST }, "INVALID_REQUEST", "Enter a valid message within the size limit.")),
    };
    enforce_email_limit(pool, &data.email).await?;
    Ok(data)
}

pub(super) async fn enforce_request_limits(
    config: &ContactConfig,
    pool: &DbPool,
    peer: IpAddr,
    headers: &HeaderMap,
) -> Result<(), Response> {
    match headers.get(header::ORIGIN).and_then(|v| v.to_str().ok()) {
        Some(origin) if config.origins.iter().any(|allowed| allowed == origin) => {}
        _ => {
            return Err(failure(
                StatusCode::FORBIDDEN,
                "ORIGIN_REJECTED",
                "This origin is not allowed.",
            ));
        }
    }
    let ip = match client_ip(config, peer, headers) {
        Ok(ip) => ip,
        Err(stage) => return Err(unavailable(stage)),
    };
    // Indexed expiry cleanup keeps persistent counters bounded without a new job.
    if sqlx::query("DELETE FROM contact_rate_limits WHERE expires_at < now() - interval '1 day'")
        .execute(pool)
        .await
        .is_err()
    {
        return Err(unavailable("rate-limit"));
    }
    for (key, maximum, seconds) in [
        ("global".to_string(), 100, 3600),
        (format!("ip:{ip}"), 3, 600),
    ] {
        match contact::rate_limit(pool, &key, maximum, seconds).await {
            Ok(Some(retry)) => return Err(limited(retry)),
            Ok(None) => {}
            Err(stage) => return Err(unavailable(stage)),
        }
    }
    Ok(())
}

pub(super) async fn enforce_email_limit(pool: &DbPool, email: &str) -> Result<(), Response> {
    match contact::rate_limit(pool, &format!("email:{}", email.to_lowercase()), 3, 600).await {
        Ok(Some(retry)) => return Err(limited(retry)),
        Ok(None) => {}
        Err(stage) => return Err(unavailable(stage)),
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use sqlx::postgres::PgPoolOptions;

    fn config() -> ContactConfig {
        ContactConfig::from_values(|key| {
            Some(
                match key {
                    "SMTP_HOST" => "smtp.stackmail.com",
                    "SMTP_PORT" => "465",
                    "SMTP_SECURE" => "true",
                    "MAIL_FROM" => contact::MAIL_FROM,
                    "MAIL_TO" => contact::MAIL_TO,
                    "SMTP_USER" => "test@example.com",
                    "SMTP_PASSWORD" => "test-only",
                    "ALLOWED_ORIGIN" => "https://miracleinternational.lk",
                    _ => return None,
                }
                .to_string(),
            )
        })
        .unwrap()
    }

    fn message() -> ContactMessage {
        ContactMessage {
            name: "Test Visitor".into(),
            email: "visitor@example.com".into(),
            phone: String::new(),
            subject: "General Inquiry".into(),
            message: "Please send more information.".into(),
            website: String::new(),
        }
    }

    fn headers() -> HeaderMap {
        let mut headers = HeaderMap::new();
        headers.insert(
            header::ORIGIN,
            HeaderValue::from_static("https://miracleinternational.lk"),
        );
        headers
    }

    #[test]
    fn forwarding_headers_require_an_explicitly_trusted_proxy() {
        let peer = "127.0.0.1".parse().unwrap();
        let visitor: IpAddr = "192.0.2.10".parse().unwrap();
        let mut config = config();
        let mut headers = headers();
        headers.insert("x-real-ip", HeaderValue::from_static("192.0.2.10"));
        headers.insert("x-forwarded-for", HeaderValue::from_static("198.51.100.1"));
        assert_eq!(client_ip(&config, peer, &headers).unwrap(), peer);
        config.trusted_proxies.push(peer);
        assert_eq!(client_ip(&config, peer, &headers).unwrap(), visitor);
        headers.insert(
            "x-real-ip",
            HeaderValue::from_static("192.0.2.10, 198.51.100.1"),
        );
        assert!(client_ip(&config, peer, &headers).is_err());
        headers.remove("x-real-ip");
        assert!(client_ip(&config, peer, &headers).is_err());
    }

    #[tokio::test]
    #[ignore = "requires existing PostgreSQL; creates and removes an isolated test schema"]
    async fn postgres_submission_gate_rejects_spam_and_enforces_concurrent_limits() {
        dotenvy::dotenv().ok();
        let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL required");
        let admin = PgPoolOptions::new()
            .max_connections(1)
            .connect(&database_url)
            .await
            .expect("test database connection");
        // UUID-only suffix: schema names cannot contain SQL supplied by a visitor.
        let schema = format!("contact_test_{}", uuid::Uuid::new_v4().simple());
        sqlx::query(&format!("CREATE SCHEMA {schema}"))
            .execute(&admin)
            .await
            .unwrap();
        let search_path = schema.clone();
        let pool = PgPoolOptions::new()
            .max_connections(12)
            .after_connect(move |connection, _| {
                let query = format!("SET search_path TO {search_path}");
                Box::pin(async move {
                    sqlx::query(&query).execute(connection).await?;
                    Ok(())
                })
            })
            .connect(&database_url)
            .await
            .unwrap();
        sqlx::raw_sql(include_str!(
            "../../migrations/20261015000001_contact_rate_limits.sql"
        ))
        .execute(&pool)
        .await
        .unwrap();
        let config = config();
        let headers = headers();
        let peer: IpAddr = "192.0.2.1".parse().unwrap();

        // The same gate used before SMTP never releases these messages for sending.
        let mut spam = message();
        spam.website = "https://spam.example".into();
        assert_eq!(
            validate_submission(&config, &pool, peer, &headers, Ok(Json(spam)))
                .await
                .err()
                .unwrap()
                .status(),
            StatusCode::BAD_REQUEST
        );
        let mut invalid = message();
        invalid.email = "invalid".into();
        assert_eq!(
            validate_submission(&config, &pool, peer, &headers, Ok(Json(invalid)))
                .await
                .err()
                .unwrap()
                .status(),
            StatusCode::BAD_REQUEST
        );
        let mut wrong_origin = headers.clone();
        wrong_origin.insert(
            header::ORIGIN,
            HeaderValue::from_static("https://attacker.example"),
        );
        assert_eq!(
            validate_submission(&config, &pool, peer, &wrong_origin, Ok(Json(message())))
                .await
                .err()
                .unwrap()
                .status(),
            StatusCode::FORBIDDEN
        );

        // Race requests on independent pooled connections, as separate instances do.
        let concurrent_peer: IpAddr = "192.0.2.2".parse().unwrap();
        let mut jobs = tokio::task::JoinSet::new();
        for _ in 0..20 {
            let pool = pool.clone();
            let headers = headers.clone();
            jobs.spawn(async move {
                match validate_submission(
                    &super::tests::config(),
                    &pool,
                    concurrent_peer,
                    &headers,
                    Ok(Json(message())),
                )
                .await
                {
                    Ok(_) => true,
                    Err(response) => {
                        assert_eq!(response.status(), StatusCode::TOO_MANY_REQUESTS);
                        let retry: i64 = response.headers()[header::RETRY_AFTER]
                            .to_str()
                            .unwrap()
                            .parse()
                            .unwrap();
                        assert!((1..=600).contains(&retry));
                        false
                    }
                }
            });
        }
        let mut accepted = 0;
        while let Some(result) = jobs.join_next().await {
            accepted += usize::from(result.unwrap());
        }
        assert_eq!(accepted, 3);
        use sha2::{Digest, Sha256};
        let attempts: i64 =
            sqlx::query_scalar("SELECT attempts FROM contact_rate_limits WHERE bucket_key = $1")
                .bind(hex::encode(Sha256::digest(b"ip:192.0.2.2")))
                .fetch_one(&pool)
                .await
                .unwrap();
        assert_eq!(attempts, 20);

        // A separate pool still observes the exhausted quota, and expiry resets it.
        let mut connection = admin.acquire().await.unwrap();
        sqlx::query(&format!("SET search_path TO {schema}"))
            .execute(&mut *connection)
            .await
            .unwrap();
        drop(connection);
        assert!(contact::rate_limit(&admin, "ip:192.0.2.2", 3, 600)
            .await
            .unwrap()
            .is_some());
        sqlx::query("UPDATE contact_rate_limits SET expires_at = now() - interval '1 second'")
            .execute(&pool)
            .await
            .unwrap();
        assert!(validate_submission(
            &config,
            &pool,
            concurrent_peer,
            &headers,
            Ok(Json(message()))
        )
        .await
        .is_ok());

        pool.close().await;
        sqlx::query(&format!("DROP SCHEMA {schema} CASCADE"))
            .execute(&admin)
            .await
            .unwrap();
        admin.close().await;
    }
}
