"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

import { PORTAL_HOME, ROUTES } from "@/config/routes";
import {
  isTestAdminCredentials,
  setTestAdminAuthState,
} from "@/lib/auth/dev-admin-auth";
import { PERMISSIONS } from "@/lib/permissions/permissions";
import { resolvePortal } from "@/lib/permissions/roles";
import { authApi } from "../api/auth.api";
import type { LoginInput } from "../schemas/login.schema";
import type { LoginResult } from "../types/auth.types";

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
    mutationFn: async (input: LoginInput): Promise<LoginResult> => {
      if (isTestAdminCredentials(input.email, input.password)) {
        // Save temporary admin authentication state in localStorage & set session cookie
        setTestAdminAuthState();

        return {
          user: {
            id: "temp-admin-id",
            email: "admin@miracleinternational.com",
            firstName: "Admin",
            lastName: "Administrator",
            roles: ["super_admin", "admin"],
            permissions: [...PERMISSIONS],
            emailVerified: true,
            companyName: "Miracle International",
          },
          redirectTo: "/admin",
        };
      }

      return authApi.login(input);
    },
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
