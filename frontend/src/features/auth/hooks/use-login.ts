"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

import { PORTAL_HOME, ROUTES } from "@/config/routes";
import { resolvePortal } from "@/lib/permissions/roles";
import { authApi } from "../api/auth.api";
import type { LoginInput } from "../schemas/login.schema";

/**
 * Login mutation.
 *
 * On success it routes the user to the portal matching their highest-privilege
 * role, unless a `redirectTo` was captured by the proxy when it bounced them
 * away from a protected page.
 */
export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  return useMutation({
    mutationFn: (input: LoginInput) => authApi.login(input),
    onSuccess: (result) => {
      // Cached data from any previous session must not survive a new sign-in.
      queryClient.clear();

      const requested = searchParams.get("redirectTo");
      const fallback = result.redirectTo ?? PORTAL_HOME[resolvePortal(result.user.roles)];

      // Only allow internal paths, so a crafted `redirectTo` cannot send the
      // user to an external site after login.
      const destination =
        requested && requested.startsWith("/") && !requested.startsWith("//")
          ? requested
          : fallback;

      router.replace(destination || ROUTES.public.home);
      // Re-run server components so the session-aware shell reflects the new user.
      router.refresh();
    },
  });
}
