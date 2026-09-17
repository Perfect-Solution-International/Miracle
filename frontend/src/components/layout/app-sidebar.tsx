"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import {
  PORTAL_ICONS,
  PORTAL_LABELS,
  PORTAL_NAVIGATION,
  type NavItem,
  type NavSection,
} from "@/config/navigation";
import type { Ability } from "@/lib/permissions/ability";
import type { Portal } from "@/lib/permissions/roles";
import { useAuth } from "@/providers/auth-provider";
import { cn } from "@/lib/utils";

/**
 * The one sidebar used by the customer, supplier, staff, and admin portals.
 *
 * Items come from `config/navigation.ts` and are filtered by the current user's
 * ability, so a link is never shown for a page the user cannot open. Adding a
 * module means adding a config entry, not writing another sidebar.
 */
export function AppSidebar({ portal }: { portal: Portal }) {
  const pathname = usePathname();
  const { ability } = useAuth();

  const sections = useMemo(
    () => filterSections(PORTAL_NAVIGATION[portal], ability),
    [portal, ability],
  );

  const PortalIcon = PORTAL_ICONS[portal];

  return (
    <nav aria-label="Main navigation" className="flex h-full flex-col gap-6 p-4">
      <Link
        href="/"
        className="focus-visible:ring-ring flex items-center gap-2 rounded-md px-2 py-1 focus-visible:ring-2 focus-visible:outline-none"
      >
        <PortalIcon className="text-primary size-5" aria-hidden="true" />
        <span className="text-sm font-semibold">{PORTAL_LABELS[portal]}</span>
      </Link>

      <div className="flex-1 space-y-6 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.title} className="space-y-1">
            <h2 className="text-muted-foreground px-2 text-xs font-medium tracking-wide uppercase">
              {section.title}
            </h2>
            <ul className="space-y-0.5">
              {section.items.map((item) => (
                <li key={item.href}>
                  <SidebarLink item={item} isActive={isItemActive(item, pathname)} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}

function SidebarLink({ item, isActive }: { item: NavItem; isActive: boolean }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      // `aria-current` tells assistive technology which page is open, rather
      // than relying on the highlight colour alone.
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "focus-visible:ring-ring flex items-center gap-2.5 rounded-md px-2 py-2 text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none",
        isActive
          ? "bg-accent text-accent-foreground font-medium"
          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
      )}
    >
      <Icon className="size-4 shrink-0" aria-hidden="true" />
      <span className="truncate">{item.title}</span>
    </Link>
  );
}

/** Drops items and then empty sections the user has no permission for. */
function filterSections(sections: readonly NavSection[], ability: Ability): NavSection[] {
  return sections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => ability.canAny(item.permissions)),
    }))
    .filter((section) => section.items.length > 0);
}

function isItemActive(item: NavItem, pathname: string): boolean {
  if (pathname === item.href) return true;
  return item.matchNested === true && pathname.startsWith(`${item.href}/`);
}
