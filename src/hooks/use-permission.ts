"use client";

import { useMemo } from "react";

import type { Permission } from "@/lib/permissions/permissions";
import type { Role } from "@/lib/permissions/roles";
import { useAuth } from "@/providers/auth-provider";

/** Imperative permission checks, for handlers and conditional props. */
export function usePermission() {
  const { ability } = useAuth();

  return useMemo(
    () => ({
      can: (permission: Permission) => ability.can(permission),
      canAny: (permissions: readonly Permission[]) => ability.canAny(permissions),
      canAll: (permissions: readonly Permission[]) => ability.canAll(permissions),
      hasRole: (role: Role) => ability.hasRole(role),
      portal: ability.portal,
      roles: ability.roles,
    }),
    [ability],
  );
}
