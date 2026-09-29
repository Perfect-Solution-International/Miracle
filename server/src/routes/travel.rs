use axum::{
    extract::{Path, Query, State},
    response::IntoResponse,
    routing::{get, post},
    Json, Router,
};
use serde::Deserialize;
use serde_json::json;
use uuid::Uuid;

use crate::{
    db::DbPool,
    error::AppError,
    middleware::AuthUser,
    models::{
        ApiResponse, CreateTravelInquiryDto, CreateTravelPackageDto, PaginatedData,
        PaginationMeta, TravelInquiry, TravelPackage,
    },
};

#[derive(Debug, Deserialize)]
pub struct TravelFilterParams {
    pub category: Option<String>,
    pub page: Option<i64>,
    pub page_size: Option<i64>,
}

pub fn router() -> Router<DbPool> {
    Router::new()
        .route("/packages", get(list_packages).post(create_package))
        .route("/packages/:slug", get(get_package_by_slug))
        .route("/inquiries", get(list_inquiries).post(create_inquiry))
}

pub async fn list_packages(
    State(pool): State<DbPool>,
    Query(params): Query<TravelFilterParams>,
) -> Result<impl IntoResponse, AppError> {
    let page = params.page.unwrap_or(1).max(1);
    let page_size = params.page_size.unwrap_or(20).clamp(1, 100);
    let offset = (page - 1) * page_size;

    let (packages, total_items) = if let Some(cat) = params.category {
        let items = sqlx::query_as::<_, TravelPackage>(
            r#"
            SELECT * FROM travel_packages
            WHERE category = $1 AND is_published = true
            ORDER BY is_featured DESC, created_at DESC
            LIMIT $2 OFFSET $3
            "#
        )
        .bind(&cat)
        .bind(page_size)
        .bind(offset)
        .fetch_all(&pool)
        .await?;

        let count = sqlx::query_scalar::<_, i64>(
            "SELECT COUNT(*) FROM travel_packages WHERE category = $1 AND is_published = true"
        )
        .bind(&cat)
        .fetch_one(&pool)
        .await?;

        (items, count)
    } else {
        let items = sqlx::query_as::<_, TravelPackage>(
            r#"
            SELECT * FROM travel_packages
            WHERE is_published = true
            ORDER BY is_featured DESC, created_at DESC
            LIMIT $1 OFFSET $2
            "#
        )
        .bind(page_size)
        .bind(offset)
        .fetch_all(&pool)
        .await?;

        let count = sqlx::query_scalar::<_, i64>(
            "SELECT COUNT(*) FROM travel_packages WHERE is_published = true"
        )
        .fetch_one(&pool)
        .await?;

        (items, count)
    };

    let total_pages = (total_items + page_size - 1) / page_size;

    Ok(Json(ApiResponse::success(PaginatedData {
        items: packages,
        pagination: PaginationMeta {
            page,
            page_size,
            total_items,
            total_pages,
        },
    })))
}

pub async fn get_package_by_slug(
    State(pool): State<DbPool>,
    Path(slug): Path<String>,
) -> Result<impl IntoResponse, AppError> {
    let package = sqlx::query_as::<_, TravelPackage>(
        "SELECT * FROM travel_packages WHERE slug = $1 AND is_published = true"
    )
    .bind(&slug)
    .fetch_optional(&pool)
    .await?
    .ok_or_else(|| AppError::NotFound(format!("Package not found with slug: {}", slug)))?;

    Ok(Json(ApiResponse::success(package)))
}

pub async fn create_package(
    _auth: AuthUser,
    State(pool): State<DbPool>,
    Json(dto): Json<CreateTravelPackageDto>,
) -> Result<impl IntoResponse, AppError> {
    let id = Uuid::new_v4();
    let package = sqlx::query_as::<_, TravelPackage>(
        r#"
        INSERT INTO travel_packages (
            id, title, slug, category, destination, duration_days, duration_nights,
            price_cents, currency, badge, overview, highlights, itinerary,
            inclusions, exclusions, image_url, is_published, is_featured
        )
        VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,
            COALESCE($12, '[]'::jsonb), COALESCE($13, '[]'::jsonb),
            COALESCE($14, '[]'::jsonb), COALESCE($15, '[]'::jsonb),
            $16, COALESCE($17, true), COALESCE($18, false)
        )
        RETURNING *
        "#
    )
    .bind(id)
    .bind(&dto.title)
    .bind(&dto.slug)
    .bind(&dto.category)
    .bind(&dto.destination)
    .bind(dto.duration_days)
    .bind(dto.duration_nights)
    .bind(dto.price_cents)
    .bind(dto.currency.unwrap_or_else(|| "USD".to_string()))
    .bind(dto.badge)
    .bind(&dto.overview)
    .bind(dto.highlights)
    .bind(dto.itinerary)
    .bind(dto.inclusions)
    .bind(dto.exclusions)
    .bind(dto.image_url)
    .bind(dto.is_published)
    .bind(dto.is_featured)
    .fetch_one(&pool)
    .await?;

    Ok(Json(ApiResponse::success(package)))
}

pub async fn create_inquiry(
    State(pool): State<DbPool>,
    Json(dto): Json<CreateTravelInquiryDto>,
) -> Result<impl IntoResponse, AppError> {
    let id = Uuid::new_v4();
    let inquiry = sqlx::query_as::<_, TravelInquiry>(
        r#"
        INSERT INTO travel_inquiries (
            id, package_id, category, contact_name, email, phone,
            travel_dates, travelers_count, budget_range, notes, status
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, COALESCE($8, 1), $9, $10, 'pending')
        RETURNING *
        "#
    )
    .bind(id)
    .bind(dto.package_id)
    .bind(&dto.category)
    .bind(&dto.contact_name)
    .bind(&dto.email)
    .bind(&dto.phone)
    .bind(dto.travel_dates)
    .bind(dto.travelers_count)
    .bind(dto.budget_range)
    .bind(dto.notes)
    .fetch_one(&pool)
    .await?;

    Ok(Json(ApiResponse::success(inquiry)))
}

pub async fn list_inquiries(
    _auth: AuthUser,
    State(pool): State<DbPool>,
) -> Result<impl IntoResponse, AppError> {
    let inquiries = sqlx::query_as::<_, TravelInquiry>(
        "SELECT * FROM travel_inquiries ORDER BY created_at DESC LIMIT 100"
    )
    .fetch_all(&pool)
    .await?;

    Ok(Json(ApiResponse::success(inquiries)))
}
