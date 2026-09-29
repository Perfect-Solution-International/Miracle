import {
  API_ERROR_CODES,
  type ApiErrorCode,
  type ApiErrorPayload,
} from "@/types/api.types";
import { isRecord } from "@/types/common.types";

/**
 * The single error type every API failure is normalised into, so callers never
 * branch on Axios internals, `Response` objects, or raw thrown values.
 */
export class ApiError extends Error {
  readonly code: ApiErrorCode | string;
  readonly status: number;
  readonly fields?: Record<string, string[]>;
  readonly requestId?: string;

  constructor(params: {
    code: ApiErrorCode | string;
    message: string;
    status: number;
    fields?: Record<string, string[]>;
    requestId?: string;
  }) {
    super(params.message);
    this.name = "ApiError";
    this.code = params.code;
    this.status = params.status;
    this.fields = params.fields;
    this.requestId = params.requestId;
  }

  get isValidation(): boolean {
    return this.code === API_ERROR_CODES.VALIDATION_ERROR || this.status === 422;
  }
  get isUnauthenticated(): boolean {
    return this.status === 401;
  }
  get isForbidden(): boolean {
    return this.status === 403;
  }
  get isNotFound(): boolean {
    return this.status === 404;
  }
  get isCancelled(): boolean {
    return this.code === API_ERROR_CODES.CANCELLED;
  }
  /** Transient failures worth retrying. */
  get isRetryable(): boolean {
    return (
      this.status >= 500 ||
      this.code === API_ERROR_CODES.NETWORK_ERROR ||
      this.code === API_ERROR_CODES.TIMEOUT
    );
  }

  toPayload(): ApiErrorPayload {
    return {
      code: this.code,
      message: this.message,
      fields: this.fields,
      requestId: this.requestId,
    };
  }
}

/** Reads the backend error envelope out of an arbitrary response body. */
export function parseErrorPayload(body: unknown): ApiErrorPayload | null {
  if (!isRecord(body)) return null;
  const error = body["error"];
  if (!isRecord(error)) return null;

  const code =
    typeof error["code"] === "string" ? error["code"] : API_ERROR_CODES.UNKNOWN;
  const message =
    typeof error["message"] === "string" ? error["message"] : "Something went wrong.";

  const rawFields = error["fields"];
  let fields: Record<string, string[]> | undefined;
  if (isRecord(rawFields)) {
    fields = {};
    for (const [key, value] of Object.entries(rawFields)) {
      if (Array.isArray(value)) {
        fields[key] = value.filter((v): v is string => typeof v === "string");
      } else if (typeof value === "string") {
        fields[key] = [value];
      }
    }
  }

  const requestId =
    typeof error["requestId"] === "string" ? error["requestId"] : undefined;
  return { code, message, fields, requestId };
}

/** Default user-facing copy per status, used when the backend sends none. */
export function defaultMessageForStatus(status: number): string {
  if (status === 401) return "Your session has expired. Please sign in again.";
  if (status === 403) return "You do not have permission to perform this action.";
  if (status === 404) return "The requested resource could not be found.";
  if (status === 409) return "This action conflicts with the current state.";
  if (status === 429) return "Too many requests. Please try again shortly.";
  if (status >= 500) return "The server encountered an error. Please try again.";
  return "The request could not be completed.";
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}
