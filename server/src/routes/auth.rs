use argon2::{
    password_hash::{rand_core::OsRng, PasswordHash, PasswordHasher, PasswordVerifier, SaltString},
    Argon2,
};
use axum::{
    extract::State,
    response::IntoResponse,
    routing::{get, post},
    Json, Router,
};
use chrono::{Duration, Utc};
use jsonwebtoken::{encode, EncodingKey, Header};
use serde::{Deserialize, Serialize};
use serde_json::json;
use uuid::Uuid;

use crate::{
    config::Config,
    db::DbPool,
    error::AppError,
    middleware::AuthUser,
    models::{ApiResponse, AuthTokens, Claims, User, UserResponse},
};

#[derive(Debug, Deserialize)]
pub struct LoginDto {
    pub email: String,
    pub password: String,
}

#[derive(Debug, Deserialize)]
pub struct RegisterDto {
    pub email: String,
    pub password: String,
    pub first_name: String,
    pub last_name: String,
    pub phone: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct ForgotPasswordDto {
    pub email: String,
}

#[derive(Debug, Deserialize)]
pub struct ResetPasswordDto {
    pub token: String,
    pub new_password: String,
}

pub fn router() -> Router<DbPool> {
    Router::new()
        .route("/login", post(login))
        .route("/register", post(register))
        .route("/me", get(current_user))
        .route("/logout", post(logout))
        .route("/forgot-password", post(forgot_password))
        .route("/reset-password", post(reset_password))
}

pub async fn login(
    State(pool): State<DbPool>,
    Json(payload): Json<LoginDto>,
) -> Result<impl IntoResponse, AppError> {
    let email = payload.email.trim().to_lowercase();
    let user = sqlx::query_as::<_, User>("SELECT * FROM users WHERE LOWER(email) = $1")
        .bind(&email)
        .fetch_optional(&pool)
        .await?
        .ok_or_else(|| AppError::Unauthorized("Invalid email or password".to_string()))?;

    if !user.is_active {
        return Err(AppError::Forbidden("Account is deactivated".to_string()));
    }

    // Verify password with Argon2
    let parsed_hash = PasswordHash::new(&user.password_hash)
        .map_err(|_| AppError::Internal("Password hash parsing error".to_string()))?;

    let is_valid = Argon2::default()
        .verify_password(payload.password.as_bytes(), &parsed_hash)
        .is_ok();

    if !is_valid {
        return Err(AppError::Unauthorized("Invalid email or password".to_string()));
    }

    let config = Config::from_env();
    let expiration = Utc::now() + Duration::hours(config.jwt_expiration_hours);
    let claims = Claims {
        sub: user.id,
        email: user.email.clone(),
        role: user.role.clone(),
        exp: expiration.timestamp(),
        iat: Utc::now().timestamp(),
    };

    let token = encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(config.jwt_secret.as_bytes()),
    )
    .map_err(|e| AppError::Internal(format!("JWT creation failed: {}", e)))?;

    let user_resp = UserResponse::from(user);

    Ok(Json(ApiResponse::success(AuthTokens {
        access_token: token,
        token_type: "Bearer".to_string(),
        expires_in: config.jwt_expiration_hours * 3600,
        user: user_resp,
    })))
}

pub async fn register(
    State(pool): State<DbPool>,
    Json(payload): Json<RegisterDto>,
) -> Result<impl IntoResponse, AppError> {
    let email = payload.email.trim().to_lowercase();

    // Check existing
    let existing = sqlx::query_scalar::<_, i64>("SELECT COUNT(*) FROM users WHERE LOWER(email) = $1")
        .bind(&email)
        .fetch_one(&pool)
        .await?;

    if existing > 0 {
        return Err(AppError::Conflict("An account with this email already exists".to_string()));
    }

    let salt = SaltString::generate(&mut OsRng);
    let password_hash = Argon2::default()
        .hash_password(payload.password.as_bytes(), &salt)
        .map_err(|e| AppError::Internal(format!("Password hashing failed: {}", e)))?
        .to_string();

    let user_id = Uuid::new_v4();
    let new_user = sqlx::query_as::<_, User>(
        r#"
        INSERT INTO users (id, email, password_hash, first_name, last_name, phone, role, is_active, is_email_verified)
        VALUES ($1, $2, $3, $4, $5, $6, 'user', true, false)
        RETURNING *
        "#
    )
    .bind(user_id)
    .bind(&email)
    .bind(&password_hash)
    .bind(payload.first_name.trim())
    .bind(payload.last_name.trim())
    .bind(payload.phone.as_deref())
    .fetch_one(&pool)
    .await?;

    let config = Config::from_env();
    let expiration = Utc::now() + Duration::hours(config.jwt_expiration_hours);
    let claims = Claims {
        sub: new_user.id,
        email: new_user.email.clone(),
        role: new_user.role.clone(),
        exp: expiration.timestamp(),
        iat: Utc::now().timestamp(),
    };

    let token = encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(config.jwt_secret.as_bytes()),
    )
    .map_err(|e| AppError::Internal(format!("JWT creation failed: {}", e)))?;

    let user_resp = UserResponse::from(new_user);

    Ok(Json(ApiResponse::success(AuthTokens {
        access_token: token,
        token_type: "Bearer".to_string(),
        expires_in: config.jwt_expiration_hours * 3600,
        user: user_resp,
    })))
}

pub async fn current_user(
    auth: AuthUser,
    State(pool): State<DbPool>,
) -> Result<impl IntoResponse, AppError> {
    let user = sqlx::query_as::<_, User>("SELECT * FROM users WHERE id = $1")
        .bind(auth.0.sub)
        .fetch_optional(&pool)
        .await?
        .ok_or_else(|| AppError::NotFound("User not found".to_string()))?;

    Ok(Json(ApiResponse::success(UserResponse::from(user))))
}

pub async fn logout() -> impl IntoResponse {
    Json(ApiResponse::success(json!({ "signedOut": true })))
}

pub async fn forgot_password(Json(_payload): Json<ForgotPasswordDto>) -> impl IntoResponse {
    // In production, trigger password reset email token
    Json(ApiResponse::success(json!({ "sent": true })))
}

pub async fn reset_password(Json(_payload): Json<ResetPasswordDto>) -> impl IntoResponse {
    // In production, verify reset token and update password
    Json(ApiResponse::success(json!({ "reset": true })))
}
