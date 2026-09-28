"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";

import { ROUTES } from "@/config/routes";
import { isTestAdminAuthenticated } from "@/lib/auth/dev-admin-auth";
import { useAuth } from "@/providers/auth-provider";

export function AdminAuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const hasTestAdmin = isTestAdminAuthenticated();
    const isAuthed = isAuthenticated || Boolean(user) || hasTestAdmin;

    if (!isAuthed) {
      router.replace(`${ROUTES.auth.login}?redirectTo=/admin`);
    } else {
      setIsAllowed(true);
    }
  }, [isAuthenticated, user, router]);

  // Keep children mounted if authed or if allowed
  if (!isAllowed && !isAuthenticated && !isTestAdminAuthenticated()) {
    return null;
  }

  return <>{children}</>;
}
