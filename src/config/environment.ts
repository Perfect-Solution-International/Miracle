import { z } from "zod";

/**
 * Environment validation.
 *
 * Two separate schemas enforce the client/server boundary:
 * - `clientSchema` holds only `NEXT_PUBLIC_*` values. These are inlined into the
 *   browser bundle at build time and must never contain secrets.
 * - `serverSchema` holds server-only values. Reading these from a Client Component
 *   throws, which is the intended failure mode.
 *
 * Next.js statically replaces `process.env.NEXT_PUBLIC_*`, so each client variable
 * must be referenced by its full literal name. Destructuring `process.env` breaks it.
 */

const clientSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_APP_ENV: z
    .enum(["development", "staging", "production"])
    .default("development"),
  NEXT_PUBLIC_API_BASE_PATH: z.string().startsWith("/").default("/api/v1"),
  NEXT_PUBLIC_DEFAULT_CURRENCY: z.string().length(3).default("USD"),
  NEXT_PUBLIC_DEFAULT_LOCALE: z.string().min(2).default("en"),
});

const serverSchema = z.object({
  /** Origin of the Rust backend. Never exposed to the browser: the BFF route
   *  handlers in `src/app/api` are the only callers. */
  RUST_API_URL: z.string().url().default("http://localhost:8080"),
  RUST_API_TIMEOUT_MS: z.coerce.number().int().positive().default(15_000),
  SESSION_COOKIE_NAME: z.string().min(1).default("mi_session"),
  REFRESH_COOKIE_NAME: z.string().min(1).default("mi_refresh"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

function formatIssues(error: z.ZodError): string {
  return error.issues
    .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
    .join("\n");
}

function parseClientEnv() {
  const parsed = clientSchema.safeParse({
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
    NEXT_PUBLIC_API_BASE_PATH: process.env.NEXT_PUBLIC_API_BASE_PATH,
    NEXT_PUBLIC_DEFAULT_CURRENCY: process.env.NEXT_PUBLIC_DEFAULT_CURRENCY,
    NEXT_PUBLIC_DEFAULT_LOCALE: process.env.NEXT_PUBLIC_DEFAULT_LOCALE,
  });

  if (!parsed.success) {
    throw new Error(
      `Invalid public environment variables:\n${formatIssues(parsed.error)}`,
    );
  }
  return parsed.data;
}

export const clientEnv = parseClientEnv();

export type ClientEnv = z.infer<typeof clientSchema>;
export type ServerEnv = z.infer<typeof serverSchema>;

let cachedServerEnv: ServerEnv | undefined;

/**
 * Server-only environment accessor. Lazy so that importing this module from a
 * Client Component (for `clientEnv`) does not attempt to validate server keys.
 */
export function getServerEnv(): ServerEnv {
  if (typeof window !== "undefined") {
    throw new Error("getServerEnv() was called in the browser.");
  }
  if (cachedServerEnv) return cachedServerEnv;

  const parsed = serverSchema.safeParse({
    RUST_API_URL: process.env.RUST_API_URL,
    RUST_API_TIMEOUT_MS: process.env.RUST_API_TIMEOUT_MS,
    SESSION_COOKIE_NAME: process.env.SESSION_COOKIE_NAME,
    REFRESH_COOKIE_NAME: process.env.REFRESH_COOKIE_NAME,
    NODE_ENV: process.env.NODE_ENV,
  });

  if (!parsed.success) {
    throw new Error(
      `Invalid server environment variables:\n${formatIssues(parsed.error)}`,
    );
  }

  cachedServerEnv = parsed.data;
  return cachedServerEnv;
}

export const isProduction = clientEnv.NEXT_PUBLIC_APP_ENV === "production";
export const isDevelopment = clientEnv.NEXT_PUBLIC_APP_ENV === "development";
