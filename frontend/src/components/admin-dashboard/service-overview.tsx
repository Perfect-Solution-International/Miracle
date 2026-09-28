import {
  Briefcase,
  Building2,
  FileCheck2,
  Globe2,
  Landmark,
  Plane,
  Receipt,
  Ship,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ServiceOverviewItem, ServiceType } from "./types";

interface ServiceOverviewProps {
  items: ServiceOverviewItem[];
  selectedService?: string;
  onSelectService?: (service: ServiceType | "ALL") => void;
}

const SERVICE_ICONS: Record<ServiceType, LucideIcon> = {
  Travel: Plane,
  "Flight Tickets": Receipt,
  "Work Visa": FileCheck2,
  "Visa & Passport": Globe2,
  "Import & Export": Ship,
  Trading: TrendingUp,
  "Business Solutions": Briefcase,
  Investment: Landmark,
  Franchise: Building2,
};

export function ServiceOverview({
  items,
  selectedService = "ALL",
  onSelectService,
}: ServiceOverviewProps) {
  const totalAllRequests = items.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <Card className="rounded-xl border-border/70 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="text-base font-bold text-navy dark:text-foreground">
            Service Request Overview
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Distribution across 9 operational service domains ({totalAllRequests} total requests)
          </p>
        </div>

        {onSelectService && selectedService !== "ALL" ? (
          <button
            type="button"
            onClick={() => onSelectService("ALL")}
            className="text-xs font-semibold text-brand-blue hover:underline"
          >
            Clear filter
          </button>
        ) : null}
      </CardHeader>

      <CardContent className="pt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
          {items.map((item) => {
            const Icon = SERVICE_ICONS[item.service] || Plane;
            const isSelected = selectedService === item.service;

            return (
              <div
                key={item.service}
                onClick={() => onSelectService?.(isSelected ? "ALL" : item.service)}
                className={cn(
                  "group relative rounded-xl border p-3.5 transition-all duration-200 cursor-pointer",
                  isSelected
                    ? "border-brand-blue bg-brand-blue-light/50 dark:bg-brand-blue/20 ring-1 ring-brand-blue"
                    : "border-border/60 bg-card hover:border-brand-blue/40 hover:bg-muted/30",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-7 items-center justify-center rounded-md bg-brand-blue-light text-brand-blue dark:bg-brand-blue/30 dark:text-brand-blue-muted">
                      <Icon className="size-3.5" />
                    </div>
                    <span className="text-xs font-bold text-navy dark:text-foreground">
                      {item.service}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="font-heading text-sm font-bold text-navy dark:text-foreground">
                      {item.count}
                    </span>
                    <span className="ml-1 text-[11px] text-muted-foreground">
                      ({item.percentage}%)
                    </span>
                  </div>
                </div>

                {/* Progress bar visual */}
                <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-brand-blue transition-all duration-500"
                    style={{ width: `${Math.min(item.percentage * 3, 100)}%` }}
                  />
                </div>

                {/* Sub-counts */}
                <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>
                    <strong className="text-red-600 dark:text-red-400 font-semibold">
                      {item.pendingCount}
                    </strong>{" "}
                    pending
                  </span>
                  <span>
                    <strong className="text-amber-600 dark:text-amber-400 font-semibold">
                      {item.reviewingCount}
                    </strong>{" "}
                    review
                  </span>
                  <span>
                    <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      {item.activeCount}
                    </strong>{" "}
                    active
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
