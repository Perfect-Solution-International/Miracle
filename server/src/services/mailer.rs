use tracing::info;

use crate::config::Config;

/// Outbound auth email.
///
/// No mail provider is wired up yet, so messages are written to the log. Swap the
/// body of `deliver` for an SMTP / API client once one is chosen; callers do not
/// change.
fn deliver(to: &str, subject: &str, body: &str) {
    info!(to, subject, "[mailer] email queued (log transport)\n{}", body);
}

pub fn send_verification_email(config: &Config, to: &str, first_name: &str, token: &str) {
    let link = format!("{}/verify-email?token={}", config.frontend_url, token);
    let body = format!(
        "Hi {},\n\nConfirm your email address to finish setting up your Miracle International account:\n{}\n\nThis link expires in {} hours.",
        first_name, link, config.email_verification_ttl_hours
    );
    deliver(to, "Verify your email address", &body);
}

pub fn send_password_reset_email(config: &Config, to: &str, first_name: &str, token: &str) {
    let link = format!("{}/reset-password?token={}", config.frontend_url, token);
    let body = format!(
        "Hi {},\n\nWe received a request to reset your password. Choose a new one here:\n{}\n\nThis link expires in {} minutes. If you did not request this, you can ignore this email.",
        first_name, link, config.password_reset_ttl_minutes
    );
    deliver(to, "Reset your password", &body);
}
