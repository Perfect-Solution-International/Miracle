import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

import { getServerEnv } from "@/config/environment";
import { errorResponse } from "@/lib/api/api-response";
import { API_ERROR_CODES } from "@/types/api.types";

/**
 * Catch-all BFF proxy to the Rust API.
 *
 * The browser calls `/api/v1/*` with its HTTP-only cookie; this handler attaches
 * the access token server-side and forwards the request. The Rust origin is
 * therefore never exposed to the browser, no CORS configuration is needed, and
 * the token stays out of reach of client-side JavaScript.
 *
 * Auth routes are handled separately by `src/app/api/v1/auth/[action]/route.ts`,
 * which Next matches ahead of this catch-all because it is the more specific route.
 */
async function handler(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
): Promise<Response> {
  const { path } = await context.params;
  const env = getServerEnv();
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(env.SESSION_COOKIE_NAME)?.value;

  const target = new URL(`/api/v1/${path.join("/")}`, env.RUST_API_URL);
  target.search = request.nextUrl.search;

  const headers = new Headers();
  headers.set("Accept", "application/json");

  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("Content-Type", contentType);
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);

  // Forwarded for request tracing across the frontend and backend logs.
  const requestId = request.headers.get("x-request-id");
  if (requestId) headers.set("x-request-id", requestId);

  const hasBody = request.method !== "GET" && request.method !== "HEAD";

  try {
    const upstream = await fetch(target, {
      method: request.method,
      headers,
      body: hasBody ? await request.text() : undefined,
      cache: "no-store",
      signal: AbortSignal.timeout(env.RUST_API_TIMEOUT_MS),
    });

    const responseHeaders = new Headers();
    const upstreamType = upstream.headers.get("content-type");
    if (upstreamType) responseHeaders.set("content-type", upstreamType);

    // Authenticated responses must never be cached by a shared cache.
    responseHeaders.set("cache-control", "no-store");

    return new Response(upstream.body, {
      status: upstream.status,
      headers: responseHeaders,
    });
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "TimeoutError";
    return errorResponse(
      {
        code: timedOut ? API_ERROR_CODES.TIMEOUT : API_ERROR_CODES.NETWORK_ERROR,
        message: timedOut
          ? "The backend did not respond in time."
          : "Unable to reach the backend service.",
      },
      504,
    );
  }
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
};
