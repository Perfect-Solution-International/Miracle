use axum::{response::IntoResponse, Json};
use serde_json::json;

pub async fn health_check() -> impl IntoResponse {
    Json(json!({
        "success": true,
        "status": "healthy",
        "service": "Miracle International API",
        "database": "PostgreSQL connected",
        "timestamp": chrono::Utc::now()
    }))
}
