use sqlx::{postgres::PgPoolOptions, PgPool};
use std::time::Duration;
use tracing::info;

pub type DbPool = PgPool;

pub async fn init_db_pool(database_url: &str) -> Result<DbPool, sqlx::Error> {
    info!("Connecting to PostgreSQL database...");

    let pool = PgPoolOptions::new()
        .max_connections(20)
        .min_connections(5)
        .acquire_timeout(Duration::from_secs(10))
        .idle_timeout(Duration::from_secs(600))
        .connect(database_url)
        .await?;

    info!("Database connection established. Running pending migrations...");
    sqlx::migrate!("./migrations")
        .run(&pool)
        .await?;

    info!("Database migrations applied successfully.");
    Ok(pool)
}
