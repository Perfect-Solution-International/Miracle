use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct Order {
    pub id: Uuid,
    pub order_number: String,
    pub customer_id: Option<Uuid>,
    pub quotation_id: Option<Uuid>,
    pub total_cents: i64,
    pub currency: String,
    pub status: String,
    pub payment_status: String,
    pub shipping_address: Option<Value>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct Quotation {
    pub id: Uuid,
    pub requirement_id: Option<Uuid>,
    pub customer_id: Uuid,
    pub quote_number: String,
    pub title: String,
    pub total_amount_cents: i64,
    pub currency: String,
    pub valid_until: DateTime<Utc>,
    pub status: String,
    pub items: Value,
    pub notes: Option<String>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct SourcingRequirement {
    pub id: Uuid,
    pub user_id: Option<Uuid>,
    pub title: String,
    pub category: String,
    pub target_country: String,
    pub quantity: String,
    pub specifications: String,
    pub target_budget_usd: Option<sqlx::types::BigDecimal>,
    pub status: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}
