use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
    Json,
};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Serialize, Deserialize)]
pub struct ApiErrorPayload {
    pub code: String,
    pub message: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub fields: Option<HashMap<String, Vec<String>>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub request_id: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ApiFailureEnvelope {
    pub success: bool,
    pub error: ApiErrorPayload,
}

#[derive(thiserror::Error, Debug)]
pub enum AppError {
    #[error("Validation failed")]
    Validation(String, Option<HashMap<String, Vec<String>>>),

    #[error("Unauthorized: {0}")]
    Unauthorized(String),

    #[error("Forbidden: {0}")]
    Forbidden(String),

    #[error("Resource not found: {0}")]
    NotFound(String),

    #[error("Conflict: {0}")]
    Conflict(String),

    #[error("Database error: {0}")]
    Database(#[from] sqlx::Error),

    #[error("Internal server error: {0}")]
    Internal(String),
}

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        let (status, code, message, fields) = match self {
            AppError::Validation(msg, f) => (
                StatusCode::UNPROCESSABLE_ENTITY,
                "VALIDATION_ERROR".to_string(),
                msg,
                f,
            ),
            AppError::Unauthorized(msg) => (
                StatusCode::UNAUTHORIZED,
                "UNAUTHENTICATED".to_string(),
                msg,
                None,
            ),
            AppError::Forbidden(msg) => (
                StatusCode::FORBIDDEN,
                "FORBIDDEN".to_string(),
                msg,
                None,
            ),
            AppError::NotFound(msg) => (
                StatusCode::NOT_FOUND,
                "NOT_FOUND".to_string(),
                msg,
                None,
            ),
            AppError::Conflict(msg) => (
                StatusCode::CONFLICT,
                "CONFLICT".to_string(),
                msg,
                None,
            ),
            AppError::Database(err) => {
                tracing::error!("Database query error: {:?}", err);
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    "DATABASE_ERROR".to_string(),
                    "A database operation failed. Please try again.".to_string(),
                    None,
                )
            }
            AppError::Internal(msg) => {
                tracing::error!("Internal server error: {}", msg);
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    "SERVER_ERROR".to_string(),
                    msg,
                    None,
                )
            }
        };

        let payload = ApiFailureEnvelope {
            success: false,
            error: ApiErrorPayload {
                code,
                message,
                fields,
                request_id: None,
            },
        };

        (status, Json(payload)).into_response()
    }
}
