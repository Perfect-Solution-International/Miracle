"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  createContext,
  use,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { ROUTES } from "@/config/routes";
import {
  getTestAdminUserDto,
  isTestAdminAuthenticated,
} from "@/lib/auth/dev-admin-auth";
import { onAuthEvent } from "@/lib/api/auth-events";
import { createAbility, type Ability } from "@/lib/permissions/ability";
import type { CurrentUserDto } from "@/server/dal/current-user";

/**
 * Client-side auth context.
 *
 * Receives a *promise* rather than a resolved user, so the root layout never
 * awaits `cookies()` and public routes stay statically prerenderable. React's
 * `use()` unwraps it here, suspending only this subtree.
 *
 * `ability` drives UI affordances only. Enforcement is the DAL's and the Rust
 * API's responsibility.
 */
export interface AuthContextValue {
  user: CurrentUserDto | null;
  ability: Ability;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  userPromise,
  children,
}: Readonly<{
  userPromise: Promise<CurrentUserDto | null>;
  children: ReactNode;
}>) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = use(userPromise);

  const [devAdminUser, setDevAdminUser] = useState<CurrentUserDto | null>(() => {
    if (typeof window !== "undefined" && isTestAdminAuthenticated()) {
      return getTestAdminUserDto();
    }
    return null;
  });

  useEffect(() => {
    const handleAuthChange = () => {
      if (isTestAdminAuthenticated()) {
        setDevAdminUser(getTestAdminUserDto());
      } else {
        setDevAdminUser(null);
      }
    };

    window.addEventListener("dev-admin-auth-change", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);
    return () => {
      window.removeEventListener("dev-admin-auth-change", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  const activeUser = user ?? devAdminUser;

  const value = useMemo<AuthContextValue>(() => {
    const ability = activeUser
      ? createAbility({ roles: activeUser.roles, extraPermissions: activeUser.permissions })
      : createAbility(null);

    return { user: activeUser, ability, isAuthenticated: Boolean(activeUser) };
  }, [activeUser]);

  const handleExpiry = useCallback(() => {
    // Drop cached data belonging to the expired session before redirecting.
    queryClient.clear();
    router.replace(`${ROUTES.auth.login}?reason=session-expired`);
  }, [queryClient, router]);

  useEffect(() => {
    return onAuthEvent((event) => {
      if (event === "session-expired") handleExpiry();
      if (event === "session-refreshed") router.refresh();
    });
  }, [handleExpiry, router]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within <AuthProvider>");
  }
  return context;
}
