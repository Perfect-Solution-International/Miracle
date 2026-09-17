"use client";

import { ArrowRight, LayoutDashboard } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PORTAL_HOME, ROUTES } from "@/config/routes";
import { useAuth } from "@/providers/auth-provider";

/** Login (or Dashboard when signed in) plus the primary conversion CTA. */
export function HeaderActions() {
  const { isAuthenticated, ability } = useAuth();

  return (
    <div className="flex items-center gap-2">
      {isAuthenticated ? (
        <Button
          asChild
          variant="ghost"
          size="lg"
          className="text-ink hidden font-semibold md:inline-flex"
        >
          <Link href={PORTAL_HOME[ability.portal]}>
            <LayoutDashboard data-icon="inline-start" aria-hidden="true" />
            Dashboard
          </Link>
        </Button>
      ) : (
        <Button
          asChild
          variant="ghost"
          size="lg"
          className="text-ink hidden px-3 font-semibold md:inline-flex"
        >
          <Link href={ROUTES.auth.login}>Login</Link>
        </Button>
      )}

      <Button
        asChild
        size="lg"
        className="hover:bg-brand-blue-dark hidden h-10 px-4 font-semibold sm:inline-flex"
      >
        <Link href={ROUTES.public.tellUsWhatYouNeed}>
          Tell Us What You Need
          <ArrowRight data-icon="inline-end" aria-hidden="true" />
        </Link>
      </Button>
    </div>
  );
}
