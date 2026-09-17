import type { Permission } from "./permissions";
import { resolvePermissions, resolvePortal, type Portal, type Role } from "./roles";

/**
 * A pure, dependency-free view of what the current user may do.
 *
 * Deliberately free of React and Next imports so the same object can be built on
 * the server (in the DAL) and in the browser (in the auth provider), keeping one
 * implementation of the rules.
 */
export interface AbilitySubject {
  readonly roles: readonly Role[];
  /** Optional overrides granted directly to a user by the backend. */
  readonly extraPermissions?: readonly Permission[];
}

export interface Ability {
  readonly roles: readonly Role[];
  readonly portal: Portal;
  readonly permissions: ReadonlySet<Permission>;
  /** True when the user holds the given permission. */
  can(permission: Permission): boolean;
  /** True when the user holds every listed permission. */
  canAll(permissions: readonly Permission[]): boolean;
  /** True when the user holds at least one listed permission. */
  canAny(permissions: readonly Permission[]): boolean;
  hasRole(role: Role): boolean;
}

export function createAbility(subject: AbilitySubject | null): Ability {
  const roles = subject?.roles ?? (["guest"] as const);
  const permissions = new Set(resolvePermissions(roles));

  for (const extra of subject?.extraPermissions ?? []) {
    permissions.add(extra);
  }

  return {
    roles,
    portal: resolvePortal(roles),
    permissions,
    can: (permission) => permissions.has(permission),
    canAll: (required) => required.every((p) => permissions.has(p)),
    canAny: (required) =>
      required.length === 0 || required.some((p) => permissions.has(p)),
    hasRole: (role) => roles.includes(role),
  };
}

/** Ability for an unauthenticated visitor. */
export const guestAbility: Ability = createAbility(null);
