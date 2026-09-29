import "server-only";

import { forbidden } from "next/navigation";

import type { Permission } from "@/lib/permissions/permissions";
import type { Role } from "@/lib/permissions/roles";
import { getAbility, verifySession, type SessionUser } from "./session";

/**
 * Server-side authorisation guards.
 *
 * `forbidden()` renders `app/forbidden.tsx` with a real 403 status. UI-level
 * checks (the `<Can>` component) only hide affordances; these functions, plus the
 * Rust API's own checks, are what actually enforce access.
 */

export async function requirePermission(permission: Permission): Promise<SessionUser> {
  const user = await verifySession();
  const ability = await getAbility();
  if (!ability.can(permission)) forbidden();
  return user;
}

export async function requireAnyPermission(
  permissions: readonly Permission[],
): Promise<SessionUser> {
  const user = await verifySession();
  const ability = await getAbility();
  if (!ability.canAny(permissions)) forbidden();
  return user;
}

export async function requireAllPermissions(
  permissions: readonly Permission[],
): Promise<SessionUser> {
  const user = await verifySession();
  const ability = await getAbility();
  if (!ability.canAll(permissions)) forbidden();
  return user;
}

export async function requireRole(...roles: readonly Role[]): Promise<SessionUser> {
  const user = await verifySession();
  if (!roles.some((role) => user.roles.includes(role))) forbidden();
  return user;
}
