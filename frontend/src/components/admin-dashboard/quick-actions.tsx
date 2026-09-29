import {
  ArrowLeftRight,
  ClipboardList,
  Plane,
  PlusCircle,
  Ship,
  Users,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/config/routes";

import type { ServiceType } from "./types";

interface QuickActionsProps {
  onAddTravelPackage: () => void;
  onFilterService?: (service: ServiceType | "ALL") => void;
}

export function QuickActions({
  onAddTravelPackage,
  onFilterService,
}: QuickActionsProps) {
  const actions = [
    {
      id: "add-package",
      label: "Add Travel Package",
      description: "Create new itinerary package",
      icon: PlusCircle,
      isButton: true,
      onClick: onAddTravelPackage,
      badge: "Action",
      highlight: true,
    },
    {
      id: "view-bookings",
      label: "View Bookings",
      description: "Manage travel bookings",
      icon: Plane,
      href: ROUTES.admin.travel,
      badge: "Travel Desk",
    },
    {
      id: "view-requirements",
      label: "View Requirements",
      description: "Procurement & inquiries",
      icon: ClipboardList,
      href: ROUTES.admin.requirements,
      badge: "Inquiries",
    },
    {
      id: "view-import-export",
      label: "View Import & Export",
      description: "Customs & shipping logistics",
      icon: Ship,
      href: ROUTES.admin.imports,
      badge: "Trade",
    },
    {
      id: "view-trading",
      label: "View Trading Requests",
      description: "Quotations & sourcing pipeline",
      icon: ArrowLeftRight,
      href: ROUTES.admin.quotations,
      badge: "Sourcing",
    },
    {
      id: "view-customers",
      label: "View Customers",
      description: "Client directory & profiles",
      icon: Users,
      href: ROUTES.admin.customers,
      badge: "Directory",
    },
  ];

  return (
    <Card className="rounded-xl border-border/70 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="space-y-0.5">
          <CardTitle className="text-base font-bold text-navy dark:text-foreground">
            Quick Actions
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Frequently accessed administrative shortcuts
          </p>
        </div>
      </CardHeader>
      <CardContent className="pt-1">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {actions.map((action) => {
            const Icon = action.icon;

            if (action.isButton) {
              return (
                <button
                  key={action.id}
                  type="button"
                  onClick={action.onClick}
                  className="group flex flex-col items-start justify-between rounded-xl border border-brand-blue/30 bg-brand-blue/5 p-3.5 text-left transition-all duration-200 hover:border-brand-blue hover:bg-brand-blue/10 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:outline-none dark:bg-brand-blue/10 dark:hover:bg-brand-blue/20"
                >
                  <div className="flex w-full items-center justify-between">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-brand-blue text-white shadow-xs">
                      <Icon className="size-4" />
                    </div>
                    <span className="rounded-full bg-brand-blue/20 px-2 py-0.5 text-[10px] font-semibold text-brand-blue dark:text-brand-blue-muted">
                      {action.badge}
                    </span>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs font-bold text-navy dark:text-foreground group-hover:text-brand-blue">
                      {action.label}
                    </p>
                    <p className="text-[11px] text-muted-foreground line-clamp-1">
                      {action.description}
                    </p>
                  </div>
                </button>
              );
            }

            return (
              <Link
                key={action.id}
                href={action.href!}
                className="group flex flex-col items-start justify-between rounded-xl border border-border/70 bg-card p-3.5 text-left transition-all duration-200 hover:border-brand-blue/50 hover:bg-muted/40 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:outline-none"
              >
                <div className="flex w-full items-center justify-between">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-muted text-foreground transition-colors group-hover:bg-brand-blue-light group-hover:text-brand-blue dark:group-hover:bg-brand-blue/20">
                    <Icon className="size-4" />
                  </div>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {action.badge}
                  </span>
                </div>
                <div className="mt-3">
                  <p className="text-xs font-bold text-navy dark:text-foreground group-hover:text-brand-blue">
                    {action.label}
                  </p>
                  <p className="text-[11px] text-muted-foreground line-clamp-1">
                    {action.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
