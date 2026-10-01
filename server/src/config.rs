use std::env;

#[derive(Clone, Debug)]
pub struct Config {
    pub database_url: String,
    pub host: String,
    pub port: u16,
    pub jwt_secret: String,
    /// Lifetime of the JWT access token.
    pub access_token_ttl_minutes: i64,
    /// Refresh-token lifetime when the user ticks "Remember me".
    pub refresh_token_ttl_days: i64,
    /// Refresh-token lifetime for an ordinary sign-in.
    pub session_refresh_ttl_hours: i64,
    pub email_verification_ttl_hours: i64,
    pub password_reset_ttl_minutes: i64,
    pub frontend_url: String,
}

fn env_i64(key: &str, default: i64) -> i64 {
    env::var(key)
        .ok()
        .and_then(|v| v.parse().ok())
        .unwrap_or(default)
}

impl Config {
    pub fn from_env() -> Self {
        dotenvy::dotenv().ok();

        Self {
            database_url: env::var("DATABASE_URL").unwrap_or_else(|_| {
                "postgres://miracle_user:miracle_password@localhost:5432/miracle_db".to_string()
            }),
            host: env::var("HOST").unwrap_or_else(|_| "0.0.0.0".to_string()),
            port: env::var("PORT")
                .ok()
                .and_then(|p| p.parse().ok())
                .unwrap_or(8080),
            jwt_secret: env::var("JWT_SECRET")
                .unwrap_or_else(|_| "miracle_super_secret_jwt_key_development_only_2026".to_string()),
            access_token_ttl_minutes: env_i64("ACCESS_TOKEN_TTL_MINUTES", 60),
            refresh_token_ttl_days: env_i64("REFRESH_TOKEN_TTL_DAYS", 30),
            session_refresh_ttl_hours: env_i64("SESSION_REFRESH_TTL_HOURS", 24),
            email_verification_ttl_hours: env_i64("EMAIL_VERIFICATION_TTL_HOURS", 48),
            password_reset_ttl_minutes: env_i64("PASSWORD_RESET_TTL_MINUTES", 60),
            frontend_url: env::var("FRONTEND_URL")
                .unwrap_or_else(|_| "http://localhost:3000".to_string()),
        }
    }
}
