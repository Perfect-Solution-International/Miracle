use std::sync::OnceLock;

use argon2::{
    password_hash::{rand_core::OsRng, PasswordHash, PasswordHasher, PasswordVerifier, SaltString},
    Argon2,
};

use crate::error::AppError;

pub fn hash_password(password: &str) -> Result<String, AppError> {
    let salt = SaltString::generate(&mut OsRng);
    Argon2::default()
        .hash_password(password.as_bytes(), &salt)
        .map(|h| h.to_string())
        .map_err(|e| AppError::Internal(format!("Password hashing failed: {}", e)))
}

/// A malformed stored hash counts as a mismatch rather than a server error, so a
/// corrupt row cannot be told apart from a wrong password.
pub fn verify_password(password: &str, stored_hash: &str) -> bool {
    PasswordHash::new(stored_hash)
        .map(|parsed| {
            Argon2::default()
                .verify_password(password.as_bytes(), &parsed)
                .is_ok()
        })
        .unwrap_or(false)
}

/// Runs a verification against a throwaway hash. Called when the email is
/// unknown so a failed login takes as long whether or not the account exists,
/// which stops the response time from revealing registered emails.
pub fn burn_verification(password: &str) {
    static DUMMY_HASH: OnceLock<String> = OnceLock::new();
    let hash = DUMMY_HASH.get_or_init(|| {
        hash_password("dummy-password-for-timing").unwrap_or_default()
    });
    let _ = verify_password(password, hash);
}

/// Mirrors `passwordSchema` in `src/lib/validation/common.schema.ts`.
pub fn password_policy_errors(password: &str) -> Vec<String> {
    let mut errors = Vec::new();
    let len = password.chars().count();
    if len < 10 {
        errors.push("Password must be at least 10 characters".to_string());
    }
    if len > 128 {
        errors.push("Password must be at most 128 characters".to_string());
    }
    if !password.chars().any(|c| c.is_ascii_lowercase()) {
        errors.push("Include at least one lowercase letter".to_string());
    }
    if !password.chars().any(|c| c.is_ascii_uppercase()) {
        errors.push("Include at least one uppercase letter".to_string());
    }
    if !password.chars().any(|c| c.is_ascii_digit()) {
        errors.push("Include at least one number".to_string());
    }
    errors
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn hash_round_trips() {
        let hash = hash_password("Correct-Horse-9").unwrap();
        assert!(verify_password("Correct-Horse-9", &hash));
        assert!(!verify_password("wrong-password", &hash));
    }

    #[test]
    fn malformed_hash_is_a_mismatch() {
        assert!(!verify_password("anything", "not-a-hash"));
    }

    #[test]
    fn policy_matches_frontend_rules() {
        assert!(password_policy_errors("Str0ngPassword").is_empty());
        assert_eq!(password_policy_errors("short").len(), 3);
        assert!(!password_policy_errors("alllowercase1").is_empty());
    }
}
