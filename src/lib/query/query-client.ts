import { QueryClient, type DefaultOptions } from "@tanstack/react-query";

import { ApiError } from "@/lib/api/api-error";

/**
 * Shared TanStack Query configuration.
 *
 * Retry policy is error-aware: 4xx responses are deterministic and retrying them
 * only delays the error the user needs to see, so only transient failures retry.
 */
const defaultOptions: DefaultOptions = {
  queries: {
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      if (error instanceof ApiError) {
        if (!error.isRetryable) return false;
        return failureCount < 2;
      }
      return failureCount < 1;
    },
  },
  mutations: {
    // Mutations are not idempotent by default; never retry them automatically.
    retry: false,
  },
};

export function createQueryClient(): QueryClient {
  return new QueryClient({ defaultOptions });
}

/**
 * Browser-side singleton. On the server a fresh client is created per request so
 * one user's cache can never leak into another's response.
 */
let browserQueryClient: QueryClient | undefined;

export function getQueryClient(): QueryClient {
  if (typeof window === "undefined") return createQueryClient();
  browserQueryClient ??= createQueryClient();
  return browserQueryClient;
}
