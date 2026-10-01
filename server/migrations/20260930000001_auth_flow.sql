-- Auth flow: profile fields collected at registration, refresh-token rotation
-- metadata, and single-use tokens for email verification and password reset.

-- 1. Profile fields captured by the registration form
ALTER TABLE users
    ADD COLUMN IF NOT EXISTS company_name VARCHAR(160),
    ADD COLUMN IF NOT EXISTS country VARCHAR(80),
    ADD COLUMN IF NOT EXISTS avatar_url VARCHAR(500),
    ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS password_changed_at TIMESTAMPTZ;

-- Roles now mirror the frontend role catalogue; the legacy generic 'user'
-- role becomes 'customer'.
UPDATE users SET role = 'customer' WHERE role = 'user';
ALTER TABLE users ALTER COLUMN role SET DEFAULT 'customer';

CREATE UNIQUE INDEX IF NOT EXISTS users_email_lower_idx ON users (LOWER(email));

-- 2. Refresh tokens: remember-me lifetime and client metadata for rotation
ALTER TABLE refresh_tokens
    ADD COLUMN IF NOT EXISTS remember_me BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN IF NOT EXISTS user_agent TEXT,
    ADD COLUMN IF NOT EXISTS revoked_at TIMESTAMPTZ,
    -- Set only when a token is exchanged for a new one (not on logout), so a
    -- short grace window can absorb parallel refreshes of the same token.
    ADD COLUMN IF NOT EXISTS rotated_at TIMESTAMPTZ;

CREATE UNIQUE INDEX IF NOT EXISTS refresh_tokens_token_hash_idx ON refresh_tokens (token_hash);
CREATE INDEX IF NOT EXISTS refresh_tokens_user_id_idx ON refresh_tokens (user_id);

-- 3. Single-use tokens (email verification, password reset). Only the SHA-256
-- hash is stored, so a database leak does not expose usable links.
CREATE TABLE IF NOT EXISTS user_action_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    purpose VARCHAR(50) NOT NULL, -- 'email_verification', 'password_reset'
    token_hash VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMPTZ NOT NULL,
    used_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS user_action_tokens_user_purpose_idx
    ON user_action_tokens (user_id, purpose);

-- 4. The initial seed stored a placeholder that is not a valid Argon2 hash, so
-- the seeded admin could never sign in. Replace it with a real Argon2id hash of
-- the documented password (Admin@123456) — only if it is still the placeholder.
UPDATE users
SET password_hash = '$argon2id$v=19$m=19456,t=2,p=1$v1lfSnFvpY6N24XQUIcOAQ$BlxQhvBSmC8h55d4oqt4WqykVfsl7oenthe+4zCfE+8'
WHERE email = 'admin@miracleinternational.com'
  AND password_hash = '$argon2id$v=19$m=19456,t=2,p=1$4w9pL7kG1f2h$q6/7/vH/e+2QvC5u2eE4N6rP8Z9xW1y0A3bC5dE7f8g';
