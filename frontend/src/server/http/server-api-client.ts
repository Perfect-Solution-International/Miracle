import "server-only";

import { cookies } from "next/headers";

import { getServerEnv } from "@/config/environment";
import {
  ApiError,
  defaultMessageForStatus,
  parseErrorPayload,
} from "@/lib/api/api-error";
import { API_ERROR_CODES, type ApiEnvelope } from "@/types/api.types";

/**
 * Server-side client for the Rust API.
 *
 * This is the only module that knows `RUST_API_URL`. It reads the HTTP-only
 * session cookie and forwards it as a bearer token, so the browser bundle never
 * sees a credential. `server-only` makes an accidental client import a build error.
 */
export interface ServerRequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  /** Forwarded to fetch caching. Authenticated reads should stay uncached. */
  cache?: RequestCache;
  searchParams?: Record<string, string | number | boolean | undefined>;
}

function buildUrl(
  path: string,
  searchParams?: ServerRequestOptions["searchParams"],
): string {
  const env = getServerEnv();
  const url = new URL(`/api/v1${path}`, env.RUST_API_URL);
  for (const [key, value] of Object.entries(searchParams ?? {})) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }
  return url.toString();
}

export async function serverFetch<TData>(
  path: string,
  options: ServerRequestOptions = {},
): Promise<TData> {
  const env = getServerEnv();
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(env.SESSION_COOKIE_NAME)?.value;

  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");
  if (options.body !== undefined) headers.set("Content-Type", "application/json");
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), env.RUST_API_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(buildUrl(path, options.searchParams), {
      ...options,
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      signal: controller.signal,
      // Authenticated data must not be shared between users.
      cache: options.cache ?? "no-store",
    });
  } catch (cause) {
    const aborted = cause instanceof Error && cause.name === "AbortError";
    throw new ApiError({
      code: aborted ? API_ERROR_CODES.TIMEOUT : API_ERROR_CODES.NETWORK_ERROR,
      message: aborted
        ? "The backend did not respond in time."
        : "Unable to reach the backend service.",
      status: 0,
    });
  } finally {
    clearTimeout(timeout);
  }

  if (response.status === 204) return undefined as TData;

  const raw: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const payload = parseErrorPayload(raw);
    throw new ApiError({
      code: payload?.code ?? API_ERROR_CODES.UNKNOWN,
      message: payload?.message ?? defaultMessageForStatus(response.status),
      status: response.status,
      fields: payload?.fields,
      requestId: payload?.requestId,
    });
  }

  const body = raw as ApiEnvelope<TData>;
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
  return raw as TData;
}
