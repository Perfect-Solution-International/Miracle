use std::collections::HashMap;

use axum::{
    extract::State,
    http::{header, HeaderMap},
    response::IntoResponse,
    routing::{get, post},
    Json, Router,
};
use chrono::{Duration, Utc};
use serde::Deserialize;
use serde_json::json;
use uuid::Uuid;
use validator::ValidateEmail;

use crate::{
    config::Config,
    db::DbPool,
    error::AppError,
    middleware::AuthUser,
    models::{ApiResponse, AuthTokens, SessionUserDto, User},
    services::{
        mailer,
        password::{burn_verification, hash_password, password_policy_errors, verify_password},
        tokens::{
            generate_opaque_token, hash_opaque_token, issue_access_token,
            PURPOSE_EMAIL_VERIFICATION, PURPOSE_PASSWORD_RESET,
        },
    },
};

/// Account types a visitor may self-register as. Staff and admin roles are only
/// ever assigned internally. Mirrors `REGISTRABLE_ACCOUNT_TYPES` on the frontend.
const REGISTRABLE_ACCOUNT_TYPES: [&str; 5] =
    ["customer", "business_owner", "entrepreneur", "investor", "supplier"];
const COMPANY_REQUIRED_ACCOUNT_TYPES: [&str; 2] = ["supplier", "business_owner"];

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct LoginDto {
    pub email: String,
    pub password: String,
    #[serde(default)]
    pub remember_me: bool,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RegisterDto {
    pub email: String,
    pub password: String,
    pub first_name: String,
    pub last_name: String,
    pub phone: Option<String>,
    pub company_name: Option<String>,
    pub account_type: Option<String>,
    pub country: Option<String>,
    #[serde(default)]
    pub accept_terms: bool,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RefreshDto {
    pub refresh_token: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct ForgotPasswordDto {
    pub email: String,
}

#[derive(Debug, Deserialize)]
pub struct ResetPasswordDto {
    pub token: String,
    pub password: String,
}

#[derive(Debug, Deserialize)]
pub struct VerifyEmailDto {
    pub token: String,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ChangePasswordDto {
    pub current_password: String,
    pub new_password: String,
}

pub fn router() -> Router<DbPool> {
    Router::new()
        .route("/login", post(login))
        .route("/register", post(register))
        .route("/refresh", post(refresh))
        .route("/logout", post(logout))
        .route("/me", get(current_user))
        .route("/verify-email", post(verify_email))
        .route("/resend-verification", post(resend_verification))
        .route("/forgot-password", post(forgot_password))
        .route("/reset-password", post(reset_password))
        .route("/change-password", post(change_password))
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/// Collects field errors keyed by the frontend form field name.
#[derive(Default)]
struct FieldErrors(HashMap<String, Vec<String>>);

impl FieldErrors {
    fn add(&mut self, field: &str, message: impl Into<String>) {
        self.0.entry(field.to_string()).or_default().push(message.into());
    }

    fn into_result(self) -> Result<(), AppError> {
        if self.0.is_empty() {
            Ok(())
        } else {
            Err(AppError::Validation(
                "Please correct the highlighted fields.".to_string(),
                Some(self.0),
            ))
        }
    }
}

fn normalise_email(email: &str) -> String {
    email.trim().to_lowercase()
}

fn user_agent(headers: &HeaderMap) -> Option<String> {
    headers
        .get(header::USER_AGENT)
        .and_then(|v| v.to_str().ok())
        .filter(|v| !v.is_empty())
        .map(|v| v.chars().take(500).collect())
}

async fn find_user_by_id(pool: &DbPool, id: Uuid) -> Result<Option<User>, AppError> {
    Ok(sqlx::query_as::<_, User>("SELECT * FROM users WHERE id = $1")
        .bind(id)
        .fetch_optional(pool)
        .await?)
}

/// Issues an access token plus a fresh refresh token, persisting the latter's hash.
async fn start_session(
    pool: &DbPool,
    config: &Config,
    user: User,
    remember_me: bool,
    user_agent: Option<String>,
    verification_required: Option<bool>,
) -> Result<AuthTokens, AppError> {
    let (access_token, expires_in) = issue_access_token(&user, config)?;

    let refresh_ttl = if remember_me {
        Duration::days(config.refresh_token_ttl_days)
    } else {
        Duration::hours(config.session_refresh_ttl_hours)
    };
    let refresh_token = generate_opaque_token();

    sqlx::query(
        r#"
        INSERT INTO refresh_tokens (user_id, token_hash, expires_at, remember_me, user_agent)
        VALUES ($1, $2, $3, $4, $5)
        "#,
    )
    .bind(user.id)
    .bind(hash_opaque_token(&refresh_token))
    .bind(Utc::now() + refresh_ttl)
    .bind(remember_me)
    .bind(user_agent)
    .execute(pool)
    .await?;

    Ok(AuthTokens {
        access_token,
        refresh_token,
        token_type: "Bearer".to_string(),
        expires_in,
        refresh_expires_in: refresh_ttl.num_seconds(),
        user: SessionUserDto::from(user),
        verification_required,
    })
}

async fn revoke_all_refresh_tokens(
    executor: impl sqlx::PgExecutor<'_>,
    user_id: Uuid,
) -> Result<(), AppError> {
    // Clearing `rotated_at` also closes the refresh grace window, so a token
    // rotated moments before a password reset cannot be replayed.
    sqlx::query(
        r#"
        UPDATE refresh_tokens
        SET revoked = true, revoked_at = COALESCE(revoked_at, NOW()), rotated_at = NULL
        WHERE user_id = $1 AND (revoked = false OR rotated_at IS NOT NULL)
        "#,
    )
    .bind(user_id)
    .execute(executor)
    .await?;
    Ok(())
}

/// Creates a single-use token for `purpose`, invalidating any earlier unused ones.
async fn create_action_token(
    pool: &DbPool,
    user_id: Uuid,
    purpose: &str,
    ttl: Duration,
) -> Result<String, AppError> {
    let token = generate_opaque_token();
    let mut tx = pool.begin().await?;

    sqlx::query(
        "UPDATE user_action_tokens SET used_at = NOW() WHERE user_id = $1 AND purpose = $2 AND used_at IS NULL",
    )
    .bind(user_id)
    .bind(purpose)
    .execute(&mut *tx)
    .await?;

    sqlx::query(
        "INSERT INTO user_action_tokens (user_id, purpose, token_hash, expires_at) VALUES ($1, $2, $3, $4)",
    )
    .bind(user_id)
    .bind(purpose)
    .bind(hash_opaque_token(&token))
    .bind(Utc::now() + ttl)
    .execute(&mut *tx)
    .await?;

    tx.commit().await?;
    Ok(token)
}

/// Atomically marks a single-use token as used and returns its owner. The
/// conditional UPDATE makes a second, concurrent redemption find nothing.
async fn consume_action_token(
    executor: impl sqlx::PgExecutor<'_>,
    token: &str,
    purpose: &str,
) -> Result<Option<Uuid>, AppError> {
    Ok(sqlx::query_scalar::<_, Uuid>(
        r#"
        UPDATE user_action_tokens
        SET used_at = NOW()
        WHERE token_hash = $1 AND purpose = $2 AND used_at IS NULL AND expires_at > NOW()
        RETURNING user_id
        "#,
    )
    .bind(hash_opaque_token(token.trim()))
    .bind(purpose)
    .fetch_optional(executor)
    .await?)
}

async fn send_verification(pool: &DbPool, config: &Config, user: &User) -> Result<(), AppError> {
    let token = create_action_token(
        pool,
        user.id,
        PURPOSE_EMAIL_VERIFICATION,
        Duration::hours(config.email_verification_ttl_hours),
    )
    .await?;
    mailer::send_verification_email(config, &user.email, &user.first_name, &token);
    Ok(())
}

// ---------------------------------------------------------------------------
// Handlers
// ---------------------------------------------------------------------------

/// POST /auth/login
pub async fn login(
    State(pool): State<DbPool>,
    headers: HeaderMap,
    Json(payload): Json<LoginDto>,
) -> Result<impl IntoResponse, AppError> {
    let email = normalise_email(&payload.email);
    let invalid = || AppError::Unauthorized("Invalid email or password".to_string());

    let Some(user) = sqlx::query_as::<_, User>("SELECT * FROM users WHERE LOWER(email) = $1")
        .bind(&email)
        .fetch_optional(&pool)
        .await?
    else {
        burn_verification(&payload.password);
        return Err(invalid());
    };

    if !verify_password(&payload.password, &user.password_hash) {
        return Err(invalid());
    }

    // Checked only after the password, so a deactivated account is not
    // disclosed to someone who does not know its password.
    if !user.is_active {
        return Err(AppError::Forbidden("This account has been deactivated.".to_string()));
    }

    sqlx::query("UPDATE users SET last_login_at = NOW() WHERE id = $1")
        .bind(user.id)
        .execute(&pool)
        .await?;

    let config = Config::from_env();
    let tokens = start_session(
        &pool,
        &config,
        user,
        payload.remember_me,
        user_agent(&headers),
        None,
    )
    .await?;

    Ok(Json(ApiResponse::success(tokens)))
}

/// POST /auth/register
pub async fn register(
    State(pool): State<DbPool>,
    headers: HeaderMap,
    Json(payload): Json<RegisterDto>,
) -> Result<impl IntoResponse, AppError> {
    let email = normalise_email(&payload.email);
    let first_name = payload.first_name.trim();
    let last_name = payload.last_name.trim();
    let phone = payload.phone.as_deref().map(str::trim).filter(|v| !v.is_empty());
    let company_name = payload
        .company_name
        .as_deref()
        .map(str::trim)
        .filter(|v| !v.is_empty());
    let country = payload.country.as_deref().map(str::trim).filter(|v| !v.is_empty());
    let account_type = payload.account_type.as_deref().unwrap_or("customer");

    let mut errors = FieldErrors::default();
    if email.is_empty() || email.len() > 254 || !email.validate_email() {
        errors.add("email", "Enter a valid email address");
    }
    if first_name.is_empty() || first_name.chars().count() > 80 {
        errors.add("firstName", "First name is required");
    }
    if last_name.is_empty() || last_name.chars().count() > 80 {
        errors.add("lastName", "Last name is required");
    }
    if let Some(phone) = phone {
        let valid = (7..=20).contains(&phone.len())
            && phone
                .chars()
                .enumerate()
                .all(|(i, c)| c.is_ascii_digit() || " ()-".contains(c) || (i == 0 && c == '+'));
        if !valid {
            errors.add("phone", "Enter a valid phone number");
        }
    }
    if !REGISTRABLE_ACCOUNT_TYPES.contains(&account_type) {
        errors.add("accountType", "Choose a valid account type");
    }
    if COMPANY_REQUIRED_ACCOUNT_TYPES.contains(&account_type) && company_name.is_none() {
        errors.add("companyName", "Company name is required for this account type");
    }
    if company_name.is_some_and(|c| c.chars().count() > 160) {
        errors.add("companyName", "Company name must be at most 160 characters");
    }
    if country.is_some_and(|c| c.chars().count() > 80) {
        errors.add("country", "Country must be at most 80 characters");
    }
    for message in password_policy_errors(&payload.password) {
        errors.add("password", message);
    }
    if !payload.accept_terms {
        errors.add("acceptTerms", "You must accept the terms to continue");
    }
    errors.into_result()?;

    let password_hash = hash_password(&payload.password)?;

    // The unique index on LOWER(email) is the real guard; ON CONFLICT turns a
    // concurrent duplicate into "no row" instead of a database error.
    let new_user = sqlx::query_as::<_, User>(
        r#"
        INSERT INTO users (email, password_hash, first_name, last_name, phone, role,
                           company_name, country, is_active, is_email_verified)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, true, false)
        ON CONFLICT DO NOTHING
        RETURNING *
        "#,
    )
    .bind(&email)
    .bind(&password_hash)
    .bind(first_name)
    .bind(last_name)
    .bind(phone)
    .bind(account_type)
    .bind(company_name)
    .bind(country)
    .fetch_optional(&pool)
    .await?
    .ok_or_else(|| {
        let mut fields = HashMap::new();
        fields.insert(
            "email".to_string(),
            vec!["An account with this email already exists".to_string()],
        );
        AppError::Validation("An account with this email already exists".to_string(), Some(fields))
    })?;

    let config = Config::from_env();
    send_verification(&pool, &config, &new_user).await?;

    let tokens = start_session(
        &pool,
        &config,
        new_user,
        false,
        user_agent(&headers),
        Some(true),
    )
    .await?;

    Ok(Json(ApiResponse::success(tokens)))
}

/// How long a just-rotated refresh token is still honoured. A page load can fire
/// several requests carrying the same refresh cookie before the browser stores
/// the rotated one; without this window they would trip reuse detection.
const REFRESH_REUSE_GRACE_SECONDS: i64 = 30;

/// POST /auth/refresh — rotates the refresh token. Every refresh token is single
/// use: presenting one that was rotated longer ago than the grace window signals
/// theft, so every session for that user is revoked.
pub async fn refresh(
    State(pool): State<DbPool>,
    headers: HeaderMap,
    Json(payload): Json<RefreshDto>,
) -> Result<impl IntoResponse, AppError> {
    let no_session = || AppError::Unauthorized("Your session has expired. Please sign in again.".to_string());

    let token = payload
        .refresh_token
        .filter(|t| !t.is_empty())
        .ok_or_else(no_session)?;
    let token_hash = hash_opaque_token(&token);

    let rotated = sqlx::query_as::<_, (Uuid, bool)>(
        r#"
        UPDATE refresh_tokens
        SET revoked = true, revoked_at = NOW(), rotated_at = NOW()
        WHERE token_hash = $1 AND revoked = false AND expires_at > NOW()
        RETURNING user_id, remember_me
        "#,
    )
    .bind(&token_hash)
    .fetch_optional(&pool)
    .await?;

    let rotated = match rotated {
        Some(row) => Some(row),
        None => {
            sqlx::query_as::<_, (Uuid, bool)>(
                r#"
                SELECT user_id, remember_me FROM refresh_tokens
                WHERE token_hash = $1
                  AND rotated_at > NOW() - make_interval(secs => $2)
                  AND expires_at > NOW()
                "#,
            )
            .bind(&token_hash)
            .bind(REFRESH_REUSE_GRACE_SECONDS as f64)
            .fetch_optional(&pool)
            .await?
        }
    };

    let Some((user_id, remember_me)) = rotated else {
        let reused = sqlx::query_scalar::<_, Uuid>(
            "SELECT user_id FROM refresh_tokens WHERE token_hash = $1 AND revoked = true",
        )
        .bind(&token_hash)
        .fetch_optional(&pool)
        .await?;

        if let Some(user_id) = reused {
            tracing::warn!(%user_id, "Refresh token reuse detected; revoking all sessions");
            revoke_all_refresh_tokens(&pool, user_id).await?;
        }
        return Err(no_session());
    };

    let user = find_user_by_id(&pool, user_id)
        .await?
        .filter(|u| u.is_active)
        .ok_or_else(no_session)?;

    let config = Config::from_env();
    let tokens = start_session(&pool, &config, user, remember_me, user_agent(&headers), None).await?;

    Ok(Json(ApiResponse::success(tokens)))
}

/// POST /auth/logout — revokes the presented refresh token. Always succeeds so
/// the client can clear its cookies unconditionally.
pub async fn logout(
    State(pool): State<DbPool>,
    Json(payload): Json<RefreshDto>,
) -> Result<impl IntoResponse, AppError> {
    if let Some(token) = payload.refresh_token.filter(|t| !t.is_empty()) {
        sqlx::query(
            "UPDATE refresh_tokens SET revoked = true, revoked_at = NOW() WHERE token_hash = $1 AND revoked = false",
        )
        .bind(hash_opaque_token(&token))
        .execute(&pool)
        .await?;
    }

    Ok(Json(ApiResponse::success(json!({ "signedOut": true }))))
}

/// GET /auth/me
pub async fn current_user(
    auth: AuthUser,
    State(pool): State<DbPool>,
) -> Result<impl IntoResponse, AppError> {
    let user = find_user_by_id(&pool, auth.0.sub)
        .await?
        .ok_or_else(|| AppError::Unauthorized("Account no longer exists".to_string()))?;

    if !user.is_active {
        return Err(AppError::Forbidden("This account has been deactivated.".to_string()));
    }

    Ok(Json(ApiResponse::success(SessionUserDto::from(user))))
}

/// POST /auth/verify-email
pub async fn verify_email(
    State(pool): State<DbPool>,
    Json(payload): Json<VerifyEmailDto>,
) -> Result<impl IntoResponse, AppError> {
    let mut tx = pool.begin().await?;

    let user_id = consume_action_token(&mut *tx, &payload.token, PURPOSE_EMAIL_VERIFICATION)
        .await?
        .ok_or_else(|| {
            AppError::Validation(
                "This verification link is invalid or has expired.".to_string(),
                None,
            )
        })?;

    sqlx::query("UPDATE users SET is_email_verified = true, updated_at = NOW() WHERE id = $1")
        .bind(user_id)
        .execute(&mut *tx)
        .await?;

    tx.commit().await?;

    Ok(Json(ApiResponse::success(json!({ "verified": true }))))
}

/// POST /auth/resend-verification — requires the (unverified) user's session.
pub async fn resend_verification(
    auth: AuthUser,
    State(pool): State<DbPool>,
) -> Result<impl IntoResponse, AppError> {
    let user = find_user_by_id(&pool, auth.0.sub)
        .await?
        .ok_or_else(|| AppError::Unauthorized("Account no longer exists".to_string()))?;

    if !user.is_email_verified {
        let config = Config::from_env();
        send_verification(&pool, &config, &user).await?;
    }

    Ok(Json(ApiResponse::success(json!({
        "sent": !user.is_email_verified,
        "alreadyVerified": user.is_email_verified,
    }))))
}

/// POST /auth/forgot-password — responds identically whether or not the email
/// is registered, so it cannot be used to discover accounts.
pub async fn forgot_password(
    State(pool): State<DbPool>,
    Json(payload): Json<ForgotPasswordDto>,
) -> Result<impl IntoResponse, AppError> {
    let email = normalise_email(&payload.email);

    let user = sqlx::query_as::<_, User>(
        "SELECT * FROM users WHERE LOWER(email) = $1 AND is_active = true",
    )
    .bind(&email)
    .fetch_optional(&pool)
    .await?;

    if let Some(user) = user {
        let config = Config::from_env();
        let token = create_action_token(
            &pool,
            user.id,
            PURPOSE_PASSWORD_RESET,
            Duration::minutes(config.password_reset_ttl_minutes),
        )
        .await?;
        mailer::send_password_reset_email(&config, &user.email, &user.first_name, &token);
    }

    Ok(Json(ApiResponse::success(json!({ "sent": true }))))
}

/// POST /auth/reset-password — sets the new password and signs out every
/// existing session.
pub async fn reset_password(
    State(pool): State<DbPool>,
    Json(payload): Json<ResetPasswordDto>,
) -> Result<impl IntoResponse, AppError> {
    let mut errors = FieldErrors::default();
    for message in password_policy_errors(&payload.password) {
        errors.add("password", message);
    }
    errors.into_result()?;

    let password_hash = hash_password(&payload.password)?;
    let mut tx = pool.begin().await?;

    let user_id = consume_action_token(&mut *tx, &payload.token, PURPOSE_PASSWORD_RESET)
        .await?
        .ok_or_else(|| {
            AppError::Validation(
                "This password reset link is invalid or has expired. Request a new one.".to_string(),
                None,
            )
        })?;

    sqlx::query(
        "UPDATE users SET password_hash = $1, password_changed_at = NOW(), updated_at = NOW() WHERE id = $2",
    )
    .bind(&password_hash)
    .bind(user_id)
    .execute(&mut *tx)
    .await?;

    revoke_all_refresh_tokens(&mut *tx, user_id).await?;
    tx.commit().await?;

    Ok(Json(ApiResponse::success(json!({ "reset": true }))))
}

/// POST /auth/change-password — for a signed-in user who knows their current password.
pub async fn change_password(
    auth: AuthUser,
    State(pool): State<DbPool>,
    Json(payload): Json<ChangePasswordDto>,
) -> Result<impl IntoResponse, AppError> {
    let user = find_user_by_id(&pool, auth.0.sub)
        .await?
        .ok_or_else(|| AppError::Unauthorized("Account no longer exists".to_string()))?;

    let mut errors = FieldErrors::default();
    if !verify_password(&payload.current_password, &user.password_hash) {
        errors.add("currentPassword", "Current password is incorrect");
    }
    for message in password_policy_errors(&payload.new_password) {
        errors.add("newPassword", message);
    }
    if payload.new_password == payload.current_password {
        errors.add("newPassword", "Choose a password you have not used here before");
    }
    errors.into_result()?;

    let password_hash = hash_password(&payload.new_password)?;
    let mut tx = pool.begin().await?;

    sqlx::query(
        "UPDATE users SET password_hash = $1, password_changed_at = NOW(), updated_at = NOW() WHERE id = $2",
    )
    .bind(&password_hash)
    .bind(user.id)
    .execute(&mut *tx)
    .await?;

    // Other devices must sign in again with the new password.
    revoke_all_refresh_tokens(&mut *tx, user.id).await?;
    tx.commit().await?;

    Ok(Json(ApiResponse::success(json!({ "changed": true }))))
}
