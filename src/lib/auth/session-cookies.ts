/**
 * Moving auth tokens between Rust API responses and HTTP-only cookies.
 *
 * Shared by the auth BFF route and the proxy's silent refresh, so both write
 * identical cookies. Server-side only in practice: nothing here reads
 * `document.cookie`, and the tokens never reach the browser's JavaScript.
 */

export interface SessionTokens {
  accessToken?: string;
  refreshToken?: string;
  /** Access-token lifetime in seconds. */
  expiresIn?: number;
  /** Refresh-token lifetime in seconds. */
  refreshExpiresIn?: number;
}

export interface SessionCookieNames {
  session: string;
  refresh: string;
}

interface CookieOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "lax";
  path: string;
  maxAge: number;
}

/** Structural subset of both `cookies()` and `NextResponse.cookies`. */
interface CookieWriter {
  set(name: string, value: string, options: CookieOptions): unknown;
  delete(name: string): unknown;
}

const TOKEN_KEYS = [
  "accessToken",
  "refreshToken",
  "expiresIn",
  "refreshExpiresIn",
  "tokenType",
] as const;

const DEFAULT_ACCESS_MAX_AGE = 60 * 15;
const DEFAULT_REFRESH_MAX_AGE = 60 * 60 * 24;

/** Reads tokens from a success envelope (`{ data: { accessToken, ... } }`) or a bare body. */
export function extractSessionTokens(data: unknown): SessionTokens {
  if (typeof data !== "object" || data === null) return {};
  const envelope = data as { data?: unknown };
  const source = (
    typeof envelope.data === "object" && envelope.data !== null ? envelope.data : data
  ) as Record<string, unknown>;

  const str = (key: string) =>
    typeof source[key] === "string" ? (source[key] as string) : undefined;
  const num = (key: string) =>
    typeof source[key] === "number" ? (source[key] as number) : undefined;

  return {
    accessToken: str("accessToken"),
    refreshToken: str("refreshToken"),
    expiresIn: num("expiresIn"),
    refreshExpiresIn: num("refreshExpiresIn"),
  };
}

/** Returns a copy of the body with every token field removed. */
export function stripSessionTokens(data: unknown): unknown {
  if (typeof data !== "object" || data === null) return data;

  const clone = structuredClone(data) as Record<string, unknown>;
  const target = (
    typeof clone["data"] === "object" && clone["data"] !== null ? clone["data"] : clone
  ) as Record<string, unknown>;

  for (const key of TOKEN_KEYS) delete target[key];
  return clone;
}

function cookieOptions(maxAge: number): CookieOptions {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  };
}

export function writeSessionCookies(
  store: CookieWriter,
  names: SessionCookieNames,
  tokens: SessionTokens,
): void {
  if (!tokens.accessToken) return;

  store.set(
    names.session,
    tokens.accessToken,
    cookieOptions(tokens.expiresIn ?? DEFAULT_ACCESS_MAX_AGE),
  );

  if (tokens.refreshToken) {
    store.set(
      names.refresh,
      tokens.refreshToken,
      cookieOptions(tokens.refreshExpiresIn ?? DEFAULT_REFRESH_MAX_AGE),
    );
  }
}

export function clearSessionCookies(store: CookieWriter, names: SessionCookieNames): void {
  store.delete(names.session);
  store.delete(names.refresh);
}
