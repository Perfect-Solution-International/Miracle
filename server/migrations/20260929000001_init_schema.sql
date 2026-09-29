-- PostgreSQL Initial Schema for Miracle International Platform

-- 1. UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Users & Authentication
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(50),
    role VARCHAR(50) NOT NULL DEFAULT 'user', -- 'admin', 'customer', 'supplier', 'user'
    is_active BOOLEAN NOT NULL DEFAULT true,
    is_email_verified BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Refresh Tokens for session management
CREATE TABLE IF NOT EXISTS refresh_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    revoked BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Travel & Tourism Packages
CREATE TABLE IF NOT EXISTS travel_packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'inbound', 'outbound', 'customized', 'flight', 'visa'
    destination VARCHAR(255) NOT NULL,
    duration_days INTEGER NOT NULL DEFAULT 1,
    duration_nights INTEGER NOT NULL DEFAULT 0,
    price_cents BIGINT NOT NULL DEFAULT 0,
    currency VARCHAR(10) NOT NULL DEFAULT 'USD',
    badge VARCHAR(100),
    overview TEXT NOT NULL,
    highlights JSONB NOT NULL DEFAULT '[]'::jsonb,
    itinerary JSONB NOT NULL DEFAULT '[]'::jsonb,
    inclusions JSONB NOT NULL DEFAULT '[]'::jsonb,
    exclusions JSONB NOT NULL DEFAULT '[]'::jsonb,
    image_url VARCHAR(500),
    is_published BOOLEAN NOT NULL DEFAULT true,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Travel Inquiries & Booking Requests
CREATE TABLE IF NOT EXISTS travel_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    package_id UUID REFERENCES travel_packages(id) ON DELETE SET NULL,
    category VARCHAR(50) NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    travel_dates VARCHAR(100),
    travelers_count INTEGER NOT NULL DEFAULT 1,
    budget_range VARCHAR(100),
    notes TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'pending', -- 'pending', 'reviewed', 'contacted', 'closed'
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Sourcing Requirements
CREATE TABLE IF NOT EXISTS sourcing_requirements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    target_country VARCHAR(100) NOT NULL,
    quantity VARCHAR(100) NOT NULL,
    specifications TEXT NOT NULL,
    target_budget_usd NUMERIC(12, 2),
    status VARCHAR(50) NOT NULL DEFAULT 'open', -- 'open', 'reviewing', 'quoted', 'completed', 'cancelled'
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Quotations
CREATE TABLE IF NOT EXISTS quotations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    requirement_id UUID REFERENCES sourcing_requirements(id) ON DELETE SET NULL,
    customer_id UUID REFERENCES users(id) ON DELETE CASCADE,
    quote_number VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    total_amount_cents BIGINT NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'USD',
    valid_until TIMESTAMPTZ NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'draft', -- 'draft', 'sent', 'accepted', 'rejected', 'expired'
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Orders & Trade Shipments
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(100) UNIQUE NOT NULL,
    customer_id UUID REFERENCES users(id) ON DELETE SET NULL,
    quotation_id UUID REFERENCES quotations(id) ON DELETE SET NULL,
    total_cents BIGINT NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'USD',
    status VARCHAR(50) NOT NULL DEFAULT 'processing', -- 'pending', 'processing', 'shipped', 'delivered', 'cancelled'
    payment_status VARCHAR(50) NOT NULL DEFAULT 'pending', -- 'pending', 'paid', 'partially_paid', 'refunded'
    shipping_address JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. Seed default admin user (password: Admin@123456)
-- Password hash generated with Argon2id
INSERT INTO users (id, email, password_hash, first_name, last_name, phone, role, is_active, is_email_verified)
VALUES (
    'a0000000-0000-0000-0000-000000000001',
    'admin@miracleinternational.com',
    '$argon2id$v=19$m=19456,t=2,p=1$4w9pL7kG1f2h$q6/7/vH/e+2QvC5u2eE4N6rP8Z9xW1y0A3bC5dE7f8g',
    'Admin',
    'Miracle',
    '+94 11 234 5678',
    'admin',
    true,
    true
) ON CONFLICT (email) DO NOTHING;
