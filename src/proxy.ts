import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { AUTH_PATHS, ROUTES, isProtectedPath } from "@/config/routes";
import {
  clearSessionCookies,
  extractSessionTokens,
  writeSessionCookies,
  type SessionTokens,
} from "@/lib/auth/session-cookies";

/**
 * Proxy (formerly Middleware — renamed in Next.js 16).
 *
 * This performs an *optimistic* check only: it looks for the presence of the
 * session cookie and redirects accordingly. It deliberately does not decode the
 * token, because the Next.js docs are explicit that Proxy "should not be used
 * as a full session management or authorization solution".
 *
 * The one backend call it makes is a silent refresh: the access cookie expires
 * with its short-lived JWT, and Server Components cannot set cookies, so this is
 * the only place a page navigation can trade the refresh cookie for a new one.
 *
 * Real enforcement lives in the Data Access Layer (`src/server/dal`) and,
 * authoritatively, in the Rust API. This layer exists purely to avoid rendering
 * a dashboard shell for a visitor who is obviously signed out.
 */
const COOKIE_NAMES = {
  session: process.env.SESSION_COOKIE_NAME ?? "mi_session",
  refresh: process.env.REFRESH_COOKIE_NAME ?? "mi_refresh",
};
const RUST_API_URL = process.env.RUST_API_URL ?? "http://localhost:8080";
const REFRESH_TIMEOUT_MS = 5_000;

type RefreshOutcome =
  | { kind: "refreshed"; tokens: SessionTokens }
  | { kind: "rejected" }
  // Backend unreachable: keep the refresh cookie so a later request can retry.
  | { kind: "unavailable" };

async function refreshSession(
  refreshToken: string,
  userAgent: string,
): Promise<RefreshOutcome> {
  try {
    const response = await fetch(new URL("/api/v1/auth/refresh", RUST_API_URL), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": userAgent,
      },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
      signal: AbortSignal.timeout(REFRESH_TIMEOUT_MS),
    });
    if (response.status === 401) return { kind: "rejected" };
    if (!response.ok) return { kind: "unavailable" };

    const tokens = extractSessionTokens(await response.json().catch(() => null));
    return tokens.accessToken ? { kind: "refreshed", tokens } : { kind: "unavailable" };
  } catch {
    return { kind: "unavailable" };
  }
}

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname, search } = request.nextUrl;

  let refresh: RefreshOutcome | null = null;
  const refreshToken = request.cookies.get(COOKIE_NAMES.refresh)?.value;
  if (!request.cookies.get(COOKIE_NAMES.session)?.value && refreshToken) {
    refresh = await refreshSession(refreshToken, request.headers.get("user-agent") ?? "");
    if (refresh.kind === "refreshed" && refresh.tokens.accessToken) {
      // Mutating the request cookies lets Server Components in this same
      // request see the new access token via `cookies()`.
      request.cookies.set(COOKIE_NAMES.session, refresh.tokens.accessToken);
      if (refresh.tokens.refreshToken) {
        request.cookies.set(COOKIE_NAMES.refresh, refresh.tokens.refreshToken);
      }
    }
  }

  const response = route(request, pathname, search);

  if (refresh?.kind === "refreshed") {
    writeSessionCookies(response.cookies, COOKIE_NAMES, refresh.tokens);
  } else if (refresh?.kind === "rejected") {
    clearSessionCookies(response.cookies, COOKIE_NAMES);
  }

  return response;
}

function route(request: NextRequest, pathname: string, search: string): NextResponse {
  const hasSession = Boolean(request.cookies.get(COOKIE_NAMES.session)?.value);

  // Signed-out visitor hitting a portal route: send to login, remembering where
  // they were headed so the form can bounce them back afterwards.
  if (!hasSession && isProtectedPath(pathname)) {
    const loginUrl = new URL(ROUTES.auth.login, request.url);
    loginUrl.searchParams.set("redirectTo", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  // Signed-in user hitting login/register: send them into the app. The landing
  // portal is resolved server-side, since roles are not readable here.
  // Note: Redirect is now handled by the client component (LoginForm) so we can
  // resolve the correct portal based on the user's role.
  // We removed the proxy redirect to allow LoginForm to load and redirect.

  // Layouts can't read the pathname themselves, so it's forwarded here for the
  // customer layout to tell the public dashboard route apart from its
  // protected siblings under the same `/customer` segment.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  /**
   * Exclude static assets and image optimisation. Without a negative matcher the
   * proxy runs on every request including `_next/static`, which would let auth
   * redirects block CSS and JS from loading.
   */
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
