CREATE TABLE contact_rate_limits (
    bucket_key TEXT PRIMARY KEY,
    attempts BIGINT NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX contact_rate_limits_expiry_idx ON contact_rate_limits (expires_at);
