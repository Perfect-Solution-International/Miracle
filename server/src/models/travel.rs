use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct TravelPackage {
    pub id: Uuid,
    pub title: String,
    pub slug: String,
    pub category: String, // 'inbound', 'outbound', 'customized', 'flight', 'visa'
    pub destination: String,
    pub duration_days: i32,
    pub duration_nights: i32,
    pub price_cents: i64,
    pub currency: String,
    pub badge: Option<String>,
    pub overview: String,
    pub highlights: Value,
    pub itinerary: Value,
    pub inclusions: Value,
    pub exclusions: Value,
    pub image_url: Option<String>,
    pub is_published: bool,
    pub is_featured: bool,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct TravelInquiry {
    pub id: Uuid,
    pub package_id: Option<Uuid>,
    pub category: String,
    pub contact_name: String,
    pub email: String,
    pub phone: String,
    pub travel_dates: Option<String>,
    pub travelers_count: i32,
    pub budget_range: Option<String>,
    pub notes: Option<String>,
    pub status: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
pub struct CreateTravelPackageDto {
    pub title: String,
    pub slug: String,
    pub category: String,
    pub destination: String,
    pub duration_days: i32,
    pub duration_nights: i32,
    pub price_cents: i64,
    pub currency: Option<String>,
    pub badge: Option<String>,
    pub overview: String,
    pub highlights: Option<Value>,
    pub itinerary: Option<Value>,
    pub inclusions: Option<Value>,
    pub exclusions: Option<Value>,
    pub image_url: Option<String>,
    pub is_published: Option<bool>,
    pub is_featured: Option<bool>,
}

#[derive(Debug, Deserialize)]
pub struct CreateTravelInquiryDto {
    pub package_id: Option<Uuid>,
    pub category: String,
    pub contact_name: String,
    pub email: String,
    pub phone: String,
    pub travel_dates: Option<String>,
    pub travelers_count: Option<i32>,
    pub budget_range: Option<String>,
    pub notes: Option<String>,
}
