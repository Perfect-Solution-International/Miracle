"use client";

import { Menu } from "lucide-react";
import { useState, type ReactNode } from "react";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { Portal } from "@/lib/permissions/roles";

/**
 * Shared chrome for authenticated portals with a clean, pure white and subtle soft-glass design.
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
    <div className="bg-white min-h-svh text-slate-900 selection:bg-brand-blue-light selection:text-brand-blue">
      {/* Fixed Desktop Sidebar with crisp white background & soft border */}
      <aside className="bg-white hidden border-r border-slate-200/80 lg:fixed lg:inset-y-0 lg:left-0 lg:block lg:w-64 z-20 shadow-[1px_0_4px_rgba(0,0,0,0.02)]">
        <AppSidebar portal={portal} />
      </aside>

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col min-h-svh">
        <DashboardHeader
          mobileNavTrigger={
            <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-slate-700 hover:bg-slate-100/80 rounded-xl"
                  aria-label="Open navigation menu"
                >
                  <Menu className="size-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0 bg-white border-r border-slate-200/80">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <div onClick={() => setMobileNavOpen(false)}>
                  <AppSidebar portal={portal} />
                </div>
              </SheetContent>
            </Sheet>
          }
        />

        <main id="main-content" className="flex-1 bg-[#FFFFFF] p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
