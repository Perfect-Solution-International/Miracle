"use client";

import type { ReactNode } from "react";

import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { NotificationMenu } from "@/components/navigation/notification-menu";
import { UserMenu } from "@/components/navigation/user-menu";

/**
 * Top bar for authenticated portals: clean white background with subtle liquid-glass blur,
 * breadcrumbs navigation, notification menu, and admin user menu.
 */
export function DashboardHeader({ mobileNavTrigger }: { mobileNavTrigger?: ReactNode }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 min-w-0">
          {mobileNavTrigger}
          <Breadcrumbs />
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <NotificationMenu />
          <div className="h-6 w-px bg-slate-200/80 mx-1 hidden sm:block" aria-hidden="true" />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
