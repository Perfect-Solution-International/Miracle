use axum::{
    extract::{Path, State},
    response::IntoResponse,
    routing::{get, post},
    Json, Router,
};
use serde::Deserialize;
use uuid::Uuid;

use crate::{
    db::DbPool,
    error::AppError,
    middleware::AuthUser,
    models::{ApiResponse, SourcingRequirement},
};

#[derive(Debug, Deserialize)]
pub struct CreateRequirementDto {
    pub title: String,
    pub category: String,
    pub target_country: String,
    pub quantity: String,
    pub specifications: String,
}

pub fn router() -> Router<DbPool> {
    Router::new()
        .route("/", get(list_requirements).post(create_requirement))
        .route("/:id", get(get_requirement_by_id))
}

pub async fn list_requirements(
    auth: AuthUser,
    State(pool): State<DbPool>,
) -> Result<impl IntoResponse, AppError> {
    let reqs = if auth.0.role == "admin" {
        sqlx::query_as::<_, SourcingRequirement>(
            "SELECT * FROM sourcing_requirements ORDER BY created_at DESC LIMIT 50",
        )
        .fetch_all(&pool)
        .await?
    } else {
        sqlx::query_as::<_, SourcingRequirement>(
            "SELECT * FROM sourcing_requirements WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50",
        )
        .bind(auth.0.sub)
        .fetch_all(&pool)
        .await?
    };

    Ok(Json(ApiResponse::success(reqs)))
}

pub async fn get_requirement_by_id(
    auth: AuthUser,
    State(pool): State<DbPool>,
    Path(id): Path<Uuid>,
) -> Result<impl IntoResponse, AppError> {
    let req = sqlx::query_as::<_, SourcingRequirement>(
        "SELECT * FROM sourcing_requirements WHERE id = $1",
    )
    .bind(id)
    .fetch_optional(&pool)
    .await?
    .ok_or_else(|| AppError::NotFound("Requirement not found".to_string()))?;

    if auth.0.role != "admin" && req.user_id != Some(auth.0.sub) {
        return Err(AppError::Forbidden("Access denied".to_string()));
    }

    Ok(Json(ApiResponse::success(req)))
}

pub async fn create_requirement(
    auth: AuthUser,
    State(pool): State<DbPool>,
    Json(dto): Json<CreateRequirementDto>,
) -> Result<impl IntoResponse, AppError> {
    let id = Uuid::new_v4();
    let req = sqlx::query_as::<_, SourcingRequirement>(
        r#"
        INSERT INTO sourcing_requirements (id, user_id, title, category, target_country, quantity, specifications, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, 'open')
        RETURNING *
        "#
    )
    .bind(id)
    .bind(auth.0.sub)
    .bind(&dto.title)
    .bind(&dto.category)
    .bind(&dto.target_country)
    .bind(&dto.quantity)
    .bind(&dto.specifications)
    .fetch_one(&pool)
    .await?;

    Ok(Json(ApiResponse::success(req)))
}
