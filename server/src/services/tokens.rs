use chrono::{Duration, Utc};
use jsonwebtoken::{encode, EncodingKey, Header};
use rand::RngCore;
use sha2::{Digest, Sha256};

use crate::{
    config::Config,
    error::AppError,
    models::{Claims, User},
};

pub const PURPOSE_EMAIL_VERIFICATION: &str = "email_verification";
pub const PURPOSE_PASSWORD_RESET: &str = "password_reset";

/// Signs a short-lived JWT access token. Returns the token and its lifetime in seconds.
pub fn issue_access_token(user: &User, config: &Config) -> Result<(String, i64), AppError> {
    let now = Utc::now();
    let ttl = Duration::minutes(config.access_token_ttl_minutes);
    let claims = Claims {
        sub: user.id,
        email: user.email.clone(),
        role: user.role.clone(),
        exp: (now + ttl).timestamp(),
        iat: now.timestamp(),
    };

    let token = encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(config.jwt_secret.as_bytes()),
    )
    .map_err(|e| AppError::Internal(format!("JWT creation failed: {}", e)))?;

    Ok((token, ttl.num_seconds()))
}

/// 256 bits from the OS RNG, hex-encoded. Used for refresh tokens and email links.
pub fn generate_opaque_token() -> String {
    let mut bytes = [0u8; 32];
    rand::rngs::OsRng.fill_bytes(&mut bytes);
    hex::encode(bytes)
}

/// Opaque tokens are stored as SHA-256 digests. They carry 256 bits of entropy,
/// so a fast hash is sufficient — unlike passwords, they cannot be brute-forced.
pub fn hash_opaque_token(token: &str) -> String {
    hex::encode(Sha256::digest(token.as_bytes()))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn opaque_tokens_are_unique_and_hash_deterministically() {
        let a = generate_opaque_token();
        let b = generate_opaque_token();
        assert_eq!(a.len(), 64);
        assert_ne!(a, b);
        assert_eq!(hash_opaque_token(&a), hash_opaque_token(&a));
        assert_ne!(hash_opaque_token(&a), a);
    }
}
