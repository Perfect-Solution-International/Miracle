import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { AUTH_PATHS, ROUTES, isProtectedPath } from "@/config/routes";

/**
 * Proxy (formerly Middleware — renamed in Next.js 16).
 *
 * This performs an *optimistic* check only: it looks for the presence of the
 * session cookie and redirects accordingly. It deliberately does not decode the
 * token or call the backend, because the Next.js docs are explicit that Proxy
 * "should not be used as a full session management or authorization solution"
 * and is not intended for data fetching.
 *
 * Real enforcement lives in the Data Access Layer (`src/server/dal`) and,
 * authoritatively, in the Rust API. This layer exists purely to avoid rendering
 * a dashboard shell for a visitor who is obviously signed out.
 */
const SESSION_COOKIE = process.env.SESSION_COOKIE_NAME ?? "mi_session";

export function proxy(request: NextRequest): NextResponse {
  const { pathname, search } = request.nextUrl;
  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value);

  // Signed-out visitor hitting a portal route: send to login, remembering where
  // they were headed so the form can bounce them back afterwards.
  if (!hasSession && isProtectedPath(pathname)) {
    const loginUrl = new URL(ROUTES.auth.login, request.url);
    loginUrl.searchParams.set("redirectTo", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  // Signed-in user hitting login/register: send them into the app. The landing
  // portal is resolved server-side, since roles are not readable here.
  if (hasSession && AUTH_PATHS.includes(pathname)) {
    return NextResponse.redirect(new URL(ROUTES.public.home, request.url));
  }

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
