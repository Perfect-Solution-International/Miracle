"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { BrandLogo } from "@/components/common/brand-logo";
import {
  PORTAL_NAVIGATION,
  type NavItem,
  type NavSection,
} from "@/config/navigation";
import { ROUTES } from "@/config/routes";
import { api } from "@/lib/api/client";
import { API_ROUTES } from "@/lib/api/endpoints";
import { clearTestAdminAuthState } from "@/lib/auth/dev-admin-auth";
import type { Ability } from "@/lib/permissions/ability";
import type { Portal } from "@/lib/permissions/roles";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";

/**
 * Filter sections according to permissions.
 */
function filterSections(sections: readonly NavSection[] | undefined, ability: Ability): NavSection[] {
  if (!sections) return [];
  return sections
    .map((section) => ({
      ...section,
      items: section.items.filter(
        (item) => item.permissions.length === 0 || item.permissions.some((p) => ability.can(p))
      ),
    }))
    .filter((section) => section.items.length > 0);
}

function isItemActive(item: NavItem, pathname: string): boolean {
  if (pathname === item.href) return true;
  if (item.matchNested && pathname.startsWith(`${item.href}/`)) return true;
  return false;
}

export function AppSidebar({ portal }: { portal: Portal }) {
  const pathname = usePathname();
  const router = useRouter();
  const { ability } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const sections = useMemo(
    () => filterSections(PORTAL_NAVIGATION[portal], ability),
    [portal, ability],
  );

  async function handleSignOut() {
    setIsSigningOut(true);
    try {
      clearTestAdminAuthState();
      await api.post(API_ROUTES.auth.logout).catch(() => {});
    } finally {
      router.replace(ROUTES.auth.login);
      router.refresh();
    }
  }

  return (
    <nav aria-label="Main navigation" className="flex h-full flex-col justify-between bg-white p-4">
      <div className="space-y-6">
        {/* Brand Logo Header */}
        <div className="flex items-center px-2 pt-2 pb-1 border-b border-slate-100">
          <BrandLogo
            className="focus-visible:ring-ring rounded-lg focus-visible:ring-2 focus-visible:outline-none"
            imageClassName="h-8.5 w-auto max-w-[170px]"
          />
        </div>

        {/* Navigation Sections */}
        <div className="space-y-6 overflow-y-auto pr-1">
          {sections.map((section, idx) => (
            <div key={section.title || `sec-${idx}`} className="space-y-1.5">
              {section.title ? (
                <h2 className="px-3 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                  {section.title}
                </h2>
              ) : null}
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <SidebarLink item={item} isActive={isItemActive(item, pathname)} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Sign Out Button */}
      <div className="border-t border-slate-100 pt-3">
        <button
          type="button"
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-red-50 hover:text-red-600 focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:outline-none disabled:opacity-50"
        >
          <LogOut className="size-4 shrink-0 text-slate-400 transition-colors group-hover:text-red-600" aria-hidden="true" />
          <span className="truncate">{isSigningOut ? "Signing out..." : "Sign out"}</span>
        </button>
      </div>
    </nav>
  );
}

function SidebarLink({ item, isActive }: { item: NavItem; isActive: boolean }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:outline-none",
        isActive
          ? "bg-blue-50 text-blue-600 font-semibold shadow-2xs shadow-blue-500/10 border-l-3 border-blue-600"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
      )}
    >
      <Icon
        className={cn(
          "size-4.5 shrink-0 transition-colors",
          isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
        )}
        aria-hidden="true"
      />
      <span className="truncate">{item.title}</span>
    </Link>
  );
}
