"use client";

import { Menu } from "lucide-react";
import { useState, type ReactNode } from "react";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { Portal } from "@/lib/permissions/roles";

/**
 * Shared chrome for every authenticated portal.
 *
 * Customer, supplier, staff, and admin all render this; only the `portal` prop
 * differs, which selects the navigation set. The sidebar is a fixed rail from
 * `lg` upward and a slide-over sheet below it.
 */
export function PortalShell({
  portal,
  children,
}: {
  portal: Portal;
  children: ReactNode;
}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="bg-background min-h-svh">
      <aside className="bg-card hidden border-r lg:fixed lg:inset-y-0 lg:left-0 lg:block lg:w-64">
        <AppSidebar portal={portal} />
      </aside>

      <div className="lg:pl-64">
        <DashboardHeader
          mobileNavTrigger={
            <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open navigation menu"
                >
                  <Menu aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                {/* Required for an accessible name on the dialog. */}
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <div onClick={() => setMobileNavOpen(false)}>
                  <AppSidebar portal={portal} />
                </div>
              </SheetContent>
            </Sheet>
          }
        />

        <main id="main-content" className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
