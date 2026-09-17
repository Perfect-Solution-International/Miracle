import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";

import { ApiError } from "./api-error";
import { emitAuthEvent } from "./auth-events";
import { API_ROUTES } from "./endpoints";

/**
 * Refresh-token handling.
 *
 * The refresh cookie is HTTP-only, so the browser cannot read or rotate it; it
 * simply calls the BFF refresh route, which performs the rotation against the
 * Rust API and re-issues cookies.
 *
 * Concurrent 401s share a single in-flight refresh. Without this, ten parallel
 * dashboard queries would fire ten refreshes and rotate the token out from under
 * each other.
 */
type RetriableConfig = InternalAxiosRequestConfig & { _retried?: boolean };

let refreshInFlight: Promise<void> | null = null;

async function refreshSession(instance: AxiosInstance): Promise<void> {
  refreshInFlight ??= instance
    .post(API_ROUTES.auth.refresh)
    .then(() => {
      emitAuthEvent("session-refreshed");
    })
    .finally(() => {
      refreshInFlight = null;
    });

  return refreshInFlight;
}

export function attachAuthInterceptors(instance: AxiosInstance): void {
  instance.interceptors.response.use(
    (response) => response,
    async (error: unknown) => {
      // The client's first interceptor already normalised this.
      if (!(error instanceof ApiError)) return Promise.reject(error);

      const config = (error as ApiError & { config?: RetriableConfig }).config;

      if (!error.isUnauthenticated || !config || config._retried) {
        if (error.isUnauthenticated) emitAuthEvent("session-expired");
        return Promise.reject(error);
      }

      // Never attempt to refresh the refresh call itself.
      if (config.url?.includes(API_ROUTES.auth.refresh)) {
        emitAuthEvent("session-expired");
        return Promise.reject(error);
      }

      config._retried = true;

      try {
        await refreshSession(instance);
        return await instance.request(config);
      } catch {
        emitAuthEvent("session-expired");
        return Promise.reject(error);
      }
    },
  );
}

/** Kept for symmetry with request-side concerns such as tracing headers. */
export function attachRequestId(
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig {
  return config;
}

export type { AxiosError };
