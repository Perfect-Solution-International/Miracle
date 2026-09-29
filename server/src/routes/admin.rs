use axum::{
    extract::State,
    response::IntoResponse,
    routing::get,
    Json, Router,
};
use serde_json::json;

use crate::{
    db::DbPool,
    error::AppError,
    middleware::AuthUser,
    models::{ApiResponse, User, UserResponse},
};

pub fn router() -> Router<DbPool> {
    Router::new()
        .route("/profile", get(get_admin_profile))
        .route("/users", get(list_users))
        .route("/reports/summary", get(get_reports_summary))
}

pub async fn get_admin_profile(
    auth: AuthUser,
    State(pool): State<DbPool>,
) -> Result<impl IntoResponse, AppError> {
    if auth.0.role != "admin" {
        return Err(AppError::Forbidden("Admin privileges required".to_string()));
    }

    let user = sqlx::query_as::<_, User>("SELECT * FROM users WHERE id = $1")
        .bind(auth.0.sub)
        .fetch_optional(&pool)
        .await?
        .ok_or_else(|| AppError::NotFound("Admin profile not found".to_string()))?;

    Ok(Json(ApiResponse::success(UserResponse::from(user))))
}

pub async fn list_users(
    auth: AuthUser,
    State(pool): State<DbPool>,
) -> Result<impl IntoResponse, AppError> {
    if auth.0.role != "admin" {
        return Err(AppError::Forbidden("Admin privileges required".to_string()));
    }

    let users = sqlx::query_as::<_, User>("SELECT * FROM users ORDER BY created_at DESC LIMIT 100")
        .fetch_all(&pool)
        .await?;

    let user_responses: Vec<UserResponse> = users.into_iter().map(UserResponse::from).collect();

    Ok(Json(ApiResponse::success(user_responses)))
}

pub async fn get_reports_summary(
    auth: AuthUser,
    State(pool): State<DbPool>,
) -> Result<impl IntoResponse, AppError> {
    if auth.0.role != "admin" {
        return Err(AppError::Forbidden("Admin privileges required".to_string()));
    }

    let total_users = sqlx::query_scalar::<_, i64>("SELECT COUNT(*) FROM users")
        .fetch_one(&pool)
        .await?;

    let total_packages = sqlx::query_scalar::<_, i64>("SELECT COUNT(*) FROM travel_packages")
        .fetch_one(&pool)
        .await?;

    let total_inquiries = sqlx::query_scalar::<_, i64>("SELECT COUNT(*) FROM travel_inquiries")
        .fetch_one(&pool)
        .await?;

    let total_orders = sqlx::query_scalar::<_, i64>("SELECT COUNT(*) FROM orders")
        .fetch_one(&pool)
        .await?;

    Ok(Json(ApiResponse::success(json!({
        "total_users": total_users,
        "total_packages": total_packages,
        "total_inquiries": total_inquiries,
        "total_orders": total_orders,
    }))))
}
