"use client";

import type { ReactNode } from "react";

import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { NotificationMenu } from "@/components/navigation/notification-menu";
import { PortalSearch } from "@/components/navigation/portal-search";
import { UserMenu } from "@/components/navigation/user-menu";

/**
 * Top bar for the authenticated portals: navigation trigger, breadcrumbs, search,
 * and the account and notification menus.
 */
export function DashboardHeader({ mobileNavTrigger }: { mobileNavTrigger?: ReactNode }) {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-30 border-b backdrop-blur">
      <div className="flex h-14 items-center gap-3 px-4 md:px-6">
        {mobileNavTrigger}

        <div className="min-w-0 flex-1 flex items-center gap-4">
          <Breadcrumbs />
        </div>

        <div className="flex items-center gap-2">
          <PortalSearch />
          <div className="h-4 w-px bg-border hidden sm:block" />
          <NotificationMenu />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
