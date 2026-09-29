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
    models::{ApiResponse, Quotation},
};

pub fn router() -> Router<DbPool> {
    Router::new()
        .route("/", get(list_quotations))
        .route("/:id", get(get_quotation_by_id))
}

pub async fn list_quotations(
    auth: AuthUser,
    State(pool): State<DbPool>,
) -> Result<impl IntoResponse, AppError> {
    let quotations = if auth.0.role == "admin" {
        sqlx::query_as::<_, Quotation>("SELECT * FROM quotations ORDER BY created_at DESC LIMIT 50")
            .fetch_all(&pool)
            .await?
    } else {
        sqlx::query_as::<_, Quotation>(
            "SELECT * FROM quotations WHERE customer_id = $1 ORDER BY created_at DESC LIMIT 50",
        )
        .bind(auth.0.sub)
        .fetch_all(&pool)
        .await?
    };

    Ok(Json(ApiResponse::success(quotations)))
}

pub async fn get_quotation_by_id(
    auth: AuthUser,
    State(pool): State<DbPool>,
    Path(id): Path<Uuid>,
) -> Result<impl IntoResponse, AppError> {
    let quotation = sqlx::query_as::<_, Quotation>("SELECT * FROM quotations WHERE id = $1")
        .bind(id)
        .fetch_optional(&pool)
        .await?
        .ok_or_else(|| AppError::NotFound("Quotation not found".to_string()))?;

    if auth.0.role != "admin" && quotation.customer_id != auth.0.sub {
        return Err(AppError::Forbidden("Access denied".to_string()));
    }

    Ok(Json(ApiResponse::success(quotation)))
}
