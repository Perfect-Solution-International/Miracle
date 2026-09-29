use axum::{
    extract::{Path, State},
    response::IntoResponse,
    routing::get,
    Json, Router,
};
use uuid::Uuid;

use crate::{
    db::DbPool,
    error::AppError,
    middleware::AuthUser,
    models::{ApiResponse, Order},
};

pub fn router() -> Router<DbPool> {
    Router::new()
        .route("/", get(list_orders))
        .route("/:id", get(get_order_by_id))
}

pub async fn list_orders(
    auth: AuthUser,
    State(pool): State<DbPool>,
) -> Result<impl IntoResponse, AppError> {
    let orders = if auth.0.role == "admin" {
        sqlx::query_as::<_, Order>("SELECT * FROM orders ORDER BY created_at DESC LIMIT 50")
            .fetch_all(&pool)
            .await?
    } else {
        sqlx::query_as::<_, Order>(
            "SELECT * FROM orders WHERE customer_id = $1 ORDER BY created_at DESC LIMIT 50",
        )
        .bind(auth.0.sub)
        .fetch_all(&pool)
        .await?
    };

    Ok(Json(ApiResponse::success(orders)))
}

pub async fn get_order_by_id(
    auth: AuthUser,
    State(pool): State<DbPool>,
    Path(id): Path<Uuid>,
) -> Result<impl IntoResponse, AppError> {
    let order = sqlx::query_as::<_, Order>("SELECT * FROM orders WHERE id = $1")
        .bind(id)
        .fetch_optional(&pool)
        .await?
        .ok_or_else(|| AppError::NotFound("Order not found".to_string()))?;

    if auth.0.role != "admin" && order.customer_id != Some(auth.0.sub) {
        return Err(AppError::Forbidden("Access denied".to_string()));
    }

    Ok(Json(ApiResponse::success(order)))
}
