import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getServerEnv } from "@/config/environment";
import { ApiError } from "@/lib/api/api-error";
import { API_ROUTES } from "@/lib/api/endpoints";
import { createAbility, type Ability } from "@/lib/permissions/ability";
import { isRole, type Role } from "@/lib/permissions/roles";
import { isPermission, type Permission } from "@/lib/permissions/permissions";
import { ROUTES } from "@/config/routes";
import { serverFetch } from "@/server/http/server-api-client";

/**
 * Data Access Layer.
 *
 * Next.js recommends centralising authorisation here rather than in layouts:
 * layouts do not re-render on navigation between their child routes, so a check
 * placed there is not re-run and cannot be relied upon.
 *
 * `cache()` memoises per render pass, so calling `getCurrentUser()` in a layout,
 * a page, and three components issues one backend request.
 */

export interface SessionUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: Role[];
  permissions: Permission[];
  emailVerified: boolean;
  avatarUrl?: string;
  companyName?: string;
}

interface RawUser {
  id?: unknown;
  email?: unknown;
  firstName?: unknown;
  lastName?: unknown;
  roles?: unknown;
  permissions?: unknown;
  emailVerified?: unknown;
  avatarUrl?: unknown;
  companyName?: unknown;
}

/** Validates the backend payload, discarding unknown roles and permissions. */
function toSessionUser(raw: RawUser): SessionUser | null {
  if (typeof raw.id !== "string" || typeof raw.email !== "string") return null;

  const roles = Array.isArray(raw.roles)
    ? raw.roles.filter((r): r is Role => typeof r === "string" && isRole(r))
    : [];

  const permissions = Array.isArray(raw.permissions)
    ? raw.permissions.filter(
        (p): p is Permission => typeof p === "string" && isPermission(p),
      )
    : [];

  return {
    id: raw.id,
    email: raw.email,
    firstName: typeof raw.firstName === "string" ? raw.firstName : "",
    lastName: typeof raw.lastName === "string" ? raw.lastName : "",
    roles,
    permissions,
    emailVerified: raw.emailVerified === true,
    avatarUrl: typeof raw.avatarUrl === "string" ? raw.avatarUrl : undefined,
    companyName: typeof raw.companyName === "string" ? raw.companyName : undefined,
  };
}

/**
 * Returns the current user, or `null` when there is no valid session.
 * Never redirects, so it is safe in shells that render for guests too.
 */
export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  const env = getServerEnv();
  const cookieStore = await cookies();

  if (!cookieStore.get(env.SESSION_COOKIE_NAME)?.value) return null;

  try {
    const raw = await serverFetch<RawUser>(API_ROUTES.auth.me);
    return toSessionUser(raw);
  } catch (error) {
    // An expired or revoked token is an ordinary signed-out state.
    if (error instanceof ApiError && (error.isUnauthenticated || error.isForbidden)) {
      return null;
    }
    throw error;
  }
});

/** The ability for the current request. Guest ability when signed out. */
export const getAbility = cache(async (): Promise<Ability> => {
  const user = await getCurrentUser();
  if (!user) return createAbility(null);
  return createAbility({ roles: user.roles, extraPermissions: user.permissions });
});

/**
 * Asserts an authenticated session, redirecting to login otherwise.
 * Call this in pages and Server Actions that require a signed-in user.
 */
export const verifySession = cache(async (): Promise<SessionUser> => {
  const user = await getCurrentUser();
  if (!user) redirect(ROUTES.auth.login);
  return user;
});
