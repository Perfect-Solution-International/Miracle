pub mod admin;
pub mod auth;
pub mod health;
pub mod orders;
pub mod quotations;
pub mod requirements;
pub mod travel;

use axum::Router;
use crate::db::DbPool;

pub fn api_router() -> Router<DbPool> {
    Router::new()
        .route("/health", axum::routing::get(health::health_check))
        .nest("/auth", auth::router())
        .nest("/travel", travel::router())
        .nest("/orders", orders::router())
        .nest("/quotations", quotations::router())
        .nest("/requirements", requirements::router())
        .nest("/admin", admin::router())
}
