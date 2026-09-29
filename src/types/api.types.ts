/**
 * Wire contract shared with the Rust backend.
 *
 * Every endpoint responds with an envelope so success and failure are
 * distinguishable without inspecting HTTP status alone.
 */

export interface ApiSuccess<TData> {
  success: true;
  data: TData;
  meta?: ApiMeta;
}

export interface ApiFailure {
  success: false;
  error: ApiErrorPayload;
}

export type ApiEnvelope<TData> = ApiSuccess<TData> | ApiFailure;

export interface ApiErrorPayload {
  /** Stable machine-readable code, e.g. `VALIDATION_ERROR`. */
  code: string;
  /** Human-readable message safe to surface to users. */
  message: string;
  /** Field-level validation messages keyed by form field path. */
  fields?: Record<string, string[]>;
  /** Correlation id emitted by the backend, echoed in logs and support tickets. */
  requestId?: string;
}

export interface ApiMeta {
  requestId?: string;
  pagination?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface Paginated<TItem> {
  items: TItem[];
  pagination: PaginationMeta;
}

/** Canonical error codes the frontend reacts to specifically. */
export const API_ERROR_CODES = {
  VALIDATION_ERROR: "VALIDATION_ERROR",
  UNAUTHENTICATED: "UNAUTHENTICATED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  CONFLICT: "CONFLICT",
  RATE_LIMITED: "RATE_LIMITED",
  NETWORK_ERROR: "NETWORK_ERROR",
  TIMEOUT: "TIMEOUT",
  CANCELLED: "CANCELLED",
  SERVER_ERROR: "SERVER_ERROR",
  UNKNOWN: "UNKNOWN",
} as const;

export type ApiErrorCode = (typeof API_ERROR_CODES)[keyof typeof API_ERROR_CODES];
