use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct User {
    pub id: Uuid,
    pub email: String,
    #[serde(skip_serializing)]
    pub password_hash: String,
    pub first_name: String,
    pub last_name: String,
    pub phone: Option<String>,
    pub role: String,
    pub is_active: bool,
    pub is_email_verified: bool,
    pub company_name: Option<String>,
    pub country: Option<String>,
    pub avatar_url: Option<String>,
    pub last_login_at: Option<DateTime<Utc>>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UserResponse {
    pub id: Uuid,
    pub email: String,
    pub first_name: String,
    pub last_name: String,
    pub full_name: String,
    pub phone: Option<String>,
    pub role: String,
    pub is_active: bool,
    pub is_email_verified: bool,
}

impl From<User> for UserResponse {
    fn from(u: User) -> Self {
        let full_name = format!("{} {}", u.first_name, u.last_name).trim().to_string();
        Self {
            id: u.id,
            email: u.email,
            first_name: u.first_name,
            last_name: u.last_name,
            full_name,
            phone: u.phone,
            role: u.role,
            is_active: u.is_active,
            is_email_verified: u.is_email_verified,
        }
    }
}

/// The signed-in user as the frontend session layer expects it (camelCase,
/// `roles` as a list). Permissions are resolved from roles on the frontend, so
/// only permissions granted beyond the role defaults would be listed here.
#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SessionUserDto {
    pub id: Uuid,
    pub email: String,
    pub first_name: String,
    pub last_name: String,
    pub phone: Option<String>,
    pub roles: Vec<String>,
    pub permissions: Vec<String>,
    pub email_verified: bool,
    pub company_name: Option<String>,
    pub country: Option<String>,
    pub avatar_url: Option<String>,
}

impl From<User> for SessionUserDto {
    fn from(u: User) -> Self {
        Self {
            id: u.id,
            email: u.email,
            first_name: u.first_name,
            last_name: u.last_name,
            phone: u.phone,
            roles: vec![u.role],
            permissions: Vec::new(),
            email_verified: u.is_email_verified,
            company_name: u.company_name,
            country: u.country,
            avatar_url: u.avatar_url,
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: Uuid,
    pub email: String,
    pub role: String,
    pub exp: i64,
    pub iat: i64,
}

/// Issued on login, registration and refresh. The Next.js BFF moves the tokens
/// into HTTP-only cookies and strips them before the body reaches the browser.
#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AuthTokens {
    pub access_token: String,
    pub refresh_token: String,
    pub token_type: String,
    /// Access-token lifetime in seconds.
    pub expires_in: i64,
    /// Refresh-token lifetime in seconds.
    pub refresh_expires_in: i64,
    pub user: SessionUserDto,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub verification_required: Option<bool>,
}
