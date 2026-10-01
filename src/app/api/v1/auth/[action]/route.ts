import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

import { getServerEnv } from "@/config/environment";
import { errorResponse, successResponse } from "@/lib/api/api-response";
import {
  clearSessionCookies,
  extractSessionTokens,
  stripSessionTokens,
  writeSessionCookies,
} from "@/lib/auth/session-cookies";
import { API_ERROR_CODES } from "@/types/api.types";

/**
 * Backend-for-frontend auth bridge.
 *
 * The browser never receives a token. It calls these routes with the session
 * cookie; this handler exchanges credentials with the Rust API and writes the
 * access and refresh tokens as HTTP-only cookies, which JavaScript cannot read.
 * That satisfies the rule that long-lived tokens never touch localStorage, and
 * means an XSS bug cannot exfiltrate a session.
 *
 * Only the actions in `PROXIED_ACTIONS` are reachable, so this cannot be used as
 * an open proxy into the backend.
 */
const PROXIED_ACTIONS = new Set([
  "login",
  "register",
  "logout",
  "refresh",
  "verify-email",
  "resend-verification",
  "forgot-password",
  "reset-password",
  "change-password",
]);

/** Actions that act on the signed-in user, so need the access token forwarded. */
const AUTHENTICATED_ACTIONS = new Set(["resend-verification", "change-password"]);

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ action: string }> },
) {
  // Route params are async in this version of Next.js.
  const { action } = await context.params;

  if (!PROXIED_ACTIONS.has(action)) {
    return errorResponse(
      { code: API_ERROR_CODES.NOT_FOUND, message: "Unknown auth action." },
      404,
    );
  }

  const env = getServerEnv();
  const cookieStore = await cookies();
  const cookieNames = { session: env.SESSION_COOKIE_NAME, refresh: env.REFRESH_COOKIE_NAME };

  const body: unknown = await request.json().catch(() => ({}));

  // Refresh and logout read the refresh token from the cookie, not the body.
  const refreshToken = cookieStore.get(env.REFRESH_COOKIE_NAME)?.value;
  const payload =
    action === "refresh" || action === "logout"
      ? { ...(body as Record<string, unknown>), refreshToken }
      : body;

  if (action === "refresh" && !refreshToken) {
    return errorResponse(
      { code: API_ERROR_CODES.UNAUTHENTICATED, message: "No active session." },
      401,
    );
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    // Forwarded so the backend can record the originating client.
    "User-Agent": request.headers.get("user-agent") ?? "",
  };

  if (AUTHENTICATED_ACTIONS.has(action)) {
    const accessToken = cookieStore.get(env.SESSION_COOKIE_NAME)?.value;
    if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
  }

  let upstream: Response;
  try {
    upstream = await fetch(new URL(`/api/v1/auth/${action}`, env.RUST_API_URL), {
      method: "POST",
      headers,
      body: JSON.stringify(payload ?? {}),
      cache: "no-store",
      signal: AbortSignal.timeout(env.RUST_API_TIMEOUT_MS),
    });
  } catch {
    if (action === "logout") {
      clearSessionCookies(cookieStore, cookieNames);
      return successResponse({ signedOut: true });
    }
    return errorResponse(
      {
        code: API_ERROR_CODES.NETWORK_ERROR,
        message: "Unable to reach the authentication service.",
      },
      502,
    );
  }

  const data: unknown = await upstream.json().catch(() => null);

  if (action === "logout") {
    // Clear cookies regardless of the upstream result, so the browser is not
    // left holding a session the user asked to end.
    clearSessionCookies(cookieStore, cookieNames);
    return successResponse({ signedOut: true });
  }

  if (!upstream.ok) {
    // A rejected refresh means the session is over; drop the dead cookies.
    if (action === "refresh" && upstream.status === 401) {
      clearSessionCookies(cookieStore, cookieNames);
    }
    // Pass the backend's error envelope straight through, preserving field errors.
    return Response.json(data ?? { success: false }, { status: upstream.status });
  }

  writeSessionCookies(cookieStore, cookieNames, extractSessionTokens(data));

  // Strip tokens before replying: the browser must never see them.
  return Response.json(stripSessionTokens(data), { status: upstream.status });
}

/**
 * `GET /api/v1/auth/me`. This route shadows the catch-all proxy for every
 * `/auth/*` path, so the one read endpoint is forwarded here explicitly.
 */
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ action: string }> },
) {
  const { action } = await context.params;

  if (action !== "me") {
    return errorResponse(
      { code: API_ERROR_CODES.NOT_FOUND, message: "Unknown auth action." },
      404,
    );
  }

  const env = getServerEnv();
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(env.SESSION_COOKIE_NAME)?.value;

  if (!accessToken) {
    return errorResponse(
      { code: API_ERROR_CODES.UNAUTHENTICATED, message: "No active session." },
      401,
    );
  }

  try {
    const upstream = await fetch(new URL("/api/v1/auth/me", env.RUST_API_URL), {
      headers: { Accept: "application/json", Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
      signal: AbortSignal.timeout(env.RUST_API_TIMEOUT_MS),
    });
    const data: unknown = await upstream.json().catch(() => null);
    return Response.json(data ?? { success: false }, {
      status: upstream.status,
      headers: { "cache-control": "no-store" },
    });
  } catch {
    return errorResponse(
      {
        code: API_ERROR_CODES.NETWORK_ERROR,
        message: "Unable to reach the authentication service.",
      },
      502,
    );
  }
}
