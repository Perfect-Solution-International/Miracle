"use client";

import type { ReactNode } from "react";

import { useAuth } from "@/providers/auth-provider";
import type { Permission } from "./permissions";
import type { Role } from "./roles";

/**
 * UI authorisation helpers.
 *
 * These hide affordances the user cannot act on. They are a user-experience
 * feature, not a security boundary: anything rendered here still reaches the
 * browser bundle, so every protected action must also be checked in the DAL and
 * enforced by the Rust API.
 */
export interface CanProps {
  /** Single permission the user must hold. */
  permission?: Permission;
  /** User needs ANY of these. */
  anyOf?: readonly Permission[];
  /** User needs ALL of these. */
  allOf?: readonly Permission[];
  /** Restrict to specific roles, independent of permissions. */
  roles?: readonly Role[];
  /** Rendered when the check fails. Defaults to nothing. */
  fallback?: ReactNode;
  children: ReactNode;
}

export function Can({
  permission,
  anyOf,
  allOf,
  roles,
  fallback = null,
  children,
}: CanProps) {
  const { ability } = useAuth();

  const checks: boolean[] = [];
  if (permission) checks.push(ability.can(permission));
  if (anyOf) checks.push(ability.canAny(anyOf));
  if (allOf) checks.push(ability.canAll(allOf));
  if (roles) checks.push(roles.some((role) => ability.hasRole(role)));

  // With no criteria supplied, render children rather than silently hiding them.
  const allowed = checks.length === 0 || checks.every(Boolean);

  return <>{allowed ? children : fallback}</>;
}

/** Inverse of `<Can>`, for "upgrade your plan" style messaging. */
export function Cannot({ children, ...props }: Omit<CanProps, "fallback">) {
  return (
    <Can {...props} fallback={children}>
      {null}
    </Can>
  );
}
