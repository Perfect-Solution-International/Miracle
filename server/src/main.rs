mod config;
mod db;
mod error;
mod middleware;
mod models;
mod routes;
mod services;

use std::net::SocketAddr;
use axum::{Router, response::IntoResponse};
use tokio::net::TcpListener;
use tracing::info;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

use crate::{
    config::Config,
    db::init_db_pool,
    middleware::cors_layer,
    routes::api_router,
};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // 1. Initialize logging
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "miracle_server=debug,tower_http=info,axum=trace".into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    // 2. Load configuration
    let config = Config::from_env();
    info!("Starting Miracle International Backend Server on {}:{}", config.host, config.port);

    // 3. Connect to PostgreSQL database & run migrations
    let pool = init_db_pool(&config.database_url).await?;

    // 4. Build application router
    let app = Router::new()
        .nest("/api/v1", api_router())
        .fallback(fallback_handler)
        .layer(cors_layer())
        .layer(tower_http::trace::TraceLayer::new_for_http())
        .with_state(pool);

    // 5. Start listener
    let addr = format!("{}:{}", config.host, config.port);
    let listener = TcpListener::bind(&addr).await?;
    info!("🚀 Rust + PostgreSQL backend running on http://{}", addr);

    axum::serve(listener, app.into_make_service_with_connect_info::<SocketAddr>())
        .with_graceful_shutdown(shutdown_signal())
        .await?;

    Ok(())
}

async fn fallback_handler() -> impl IntoResponse {
    (
        axum::http::StatusCode::NOT_FOUND,
        axum::Json(serde_json::json!({
            "success": false,
            "error": {
                "code": "NOT_FOUND",
                "message": "Endpoint not found"
            }
        })),
    )
}

async fn shutdown_signal() {
    let ctrl_c = async {
        tokio::signal::ctrl_c()
            .await
            .expect("failed to install Ctrl+C handler");
    };

    #[cfg(unix)]
    let terminate = async {
        tokio::signal::unix::signal(tokio::signal::unix::SignalKind::terminate())
            .expect("failed to install signal handler")
            .recv()
            .await;
    };

    #[cfg(not(unix))]
    let terminate = std::future::pending::<()>();

    tokio::select! {
        _ = ctrl_c => {
            info!("Received shutdown signal (Ctrl+C). Gracefully stopping...");
        },
        _ = terminate => {
            info!("Received terminate signal. Gracefully stopping...");
        },
    }
}
