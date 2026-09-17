"use client";

import { useQuery } from "@tanstack/react-query";

import { authApi } from "../api/auth.api";
import { authKeys } from "../api/auth.keys";

/**
 * Client-side fetch of the current user.
 *
 * Most components should read `useAuth()` instead, which is populated from the
 * server with no extra request. This exists for client-only flows that need to
 * re-check the session, such as after email verification.
 */
export function useCurrentUser(enabled = true) {
  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: () => authApi.currentUser(),
    enabled,
    staleTime: 5 * 60_000,
    retry: false,
  });
}
