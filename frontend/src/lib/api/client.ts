import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";

import { clientEnv } from "@/config/environment";
import { API_ERROR_CODES, type ApiEnvelope } from "@/types/api.types";
import { ApiError, defaultMessageForStatus, parseErrorPayload } from "./api-error";
import { attachAuthInterceptors } from "./interceptors";

/**
 * Browser-side API client.
 *
 * It talks to this Next app's BFF routes under `NEXT_PUBLIC_API_BASE_PATH`, never
 * to the Rust origin directly. The BFF holds the HTTP-only session cookie and
 * attaches the bearer token server-side, so no token is ever readable from JS.
 */
function createClient(): AxiosInstance {
  const instance = axios.create({
    baseURL: clientEnv.NEXT_PUBLIC_API_BASE_PATH,
    timeout: 30_000,
    // Send the HTTP-only session cookie on same-origin BFF requests.
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });

  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => config);
  instance.interceptors.response.use(
    (response) => response,
    (error: unknown) => Promise.reject(normaliseError(error)),
  );

  attachAuthInterceptors(instance);
  return instance;
}

/** Converts anything thrown by Axios into an `ApiError`. */
function normaliseError(error: unknown): ApiError {
  if (axios.isCancel(error)) {
    return new ApiError({
      code: API_ERROR_CODES.CANCELLED,
      message: "Request cancelled.",
      status: 0,
    });
  }

  if (error instanceof AxiosError) {
    if (error.code === "ECONNABORTED") {
      return new ApiError({
        code: API_ERROR_CODES.TIMEOUT,
        message: "The request timed out. Please try again.",
        status: 0,
      });
    }

    if (!error.response) {
      return new ApiError({
        code: API_ERROR_CODES.NETWORK_ERROR,
        message: "Unable to reach the server. Check your connection.",
        status: 0,
      });
    }

    const { status, data } = error.response;
    const payload = parseErrorPayload(data);
    return new ApiError({
      code: payload?.code ?? API_ERROR_CODES.UNKNOWN,
      message: payload?.message ?? defaultMessageForStatus(status),
      status,
      fields: payload?.fields,
      requestId: payload?.requestId,
    });
  }

  return new ApiError({
    code: API_ERROR_CODES.UNKNOWN,
    message: error instanceof Error ? error.message : "An unexpected error occurred.",
    status: 0,
  });
}

export const apiClient = createClient();

/**
 * Unwraps the success envelope and returns `data`, so feature code works with
 * domain objects rather than transport envelopes.
 */
async function request<TData>(config: AxiosRequestConfig): Promise<TData> {
  const response = await apiClient.request<ApiEnvelope<TData>>(config);
  const body = response.data;

  if (body && typeof body === "object" && "success" in body) {
    if (body.success) return body.data;
    throw new ApiError({
      code: body.error.code,
      message: body.error.message,
      status: response.status,
      fields: body.error.fields,
      requestId: body.error.requestId,
    });
  }

  // Endpoint returned a bare body (e.g. 204). Pass it through.
  return body as TData;
}

/** Thin verb helpers. `signal` enables TanStack Query cancellation. */
export const api = {
  get: <TData>(url: string, config?: AxiosRequestConfig) =>
    request<TData>({ ...config, method: "GET", url }),
  post: <TData>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    request<TData>({ ...config, method: "POST", url, data }),
  put: <TData>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    request<TData>({ ...config, method: "PUT", url, data }),
  patch: <TData>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    request<TData>({ ...config, method: "PATCH", url, data }),
  delete: <TData>(url: string, config?: AxiosRequestConfig) =>
    request<TData>({ ...config, method: "DELETE", url }),
};
