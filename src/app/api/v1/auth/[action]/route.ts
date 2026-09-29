import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

import { getServerEnv } from "@/config/environment";
import { errorResponse, successResponse } from "@/lib/api/api-response";
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
]);

interface TokenPayload {
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
}

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

  let upstream: Response;
  try {
    upstream = await fetch(new URL(`/api/v1/auth/${action}`, env.RUST_API_URL), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Forwarded so the backend can record the originating client.
        "User-Agent": request.headers.get("user-agent") ?? "",
      },
      body: JSON.stringify(payload ?? {}),
      cache: "no-store",
      signal: AbortSignal.timeout(env.RUST_API_TIMEOUT_MS),
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

  const data: unknown = await upstream.json().catch(() => null);

  if (action === "logout") {
    // Clear cookies regardless of the upstream result, so the browser is not
    // left holding a session the user asked to end.
    cookieStore.delete(env.SESSION_COOKIE_NAME);
    cookieStore.delete(env.REFRESH_COOKIE_NAME);
    return successResponse({ signedOut: true });
  }

  if (!upstream.ok) {
    // Pass the backend's error envelope straight through, preserving field errors.
    return Response.json(data ?? { success: false }, { status: upstream.status });
  }

  const tokens = extractTokens(data);

  if (tokens.accessToken) {
    const secure = process.env.NODE_ENV === "production";

    cookieStore.set(env.SESSION_COOKIE_NAME, tokens.accessToken, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: tokens.expiresIn ?? 60 * 15,
    });

    if (tokens.refreshToken) {
      cookieStore.set(env.REFRESH_COOKIE_NAME, tokens.refreshToken, {
        httpOnly: true,
        secure,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
    }
  }

  // Strip tokens before replying: the browser must never see them.
  return Response.json(stripTokens(data), { status: upstream.status });
}

function extractTokens(data: unknown): TokenPayload {
  if (typeof data !== "object" || data === null) return {};
  const envelope = data as { data?: unknown };
  const source = (
    typeof envelope.data === "object" && envelope.data !== null ? envelope.data : data
  ) as Record<string, unknown>;

  return {
    accessToken:
      typeof source["accessToken"] === "string" ? source["accessToken"] : undefined,
    refreshToken:
      typeof source["refreshToken"] === "string" ? source["refreshToken"] : undefined,
    expiresIn: typeof source["expiresIn"] === "number" ? source["expiresIn"] : undefined,
  };
}

function stripTokens(data: unknown): unknown {
  if (typeof data !== "object" || data === null) return data;

  const clone = structuredClone(data) as Record<string, unknown>;
  const target = (
    typeof clone["data"] === "object" && clone["data"] !== null ? clone["data"] : clone
  ) as Record<string, unknown>;

  delete target["accessToken"];
  delete target["refreshToken"];
  delete target["expiresIn"];

  return clone;
}
