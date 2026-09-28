"use client";

import {
  Compass,
  Globe2,
  Inbox,
  Package,
  Palmtree,
  Plane,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { useTravelStore } from "@/lib/storage/travel-store";
import { cn } from "@/lib/utils";

interface AdminTravelNavHeaderProps {
  onAddPackage?: () => void;
  addPackageLabel?: string;
}

export function AdminTravelNavHeader({
  onAddPackage,
  addPackageLabel = "+ Add Package",
}: AdminTravelNavHeaderProps) {
  const pathname = usePathname();
  const { packages, inboundPackages, outboundPackages, inquiries } = useTravelStore();

  const newInquiriesCount = inquiries.filter((i) => i.status === "New").length;

  const NAV_ITEMS = [
    {
      label: "Inbound Tours",
      href: "/admin/travel/inbound",
      icon: Palmtree,
      count: inboundPackages.length,
      badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",
      description: "Sri Lanka Itineraries",
    },
    {
      label: "Outbound Tours",
      href: "/admin/travel/outbound",
      icon: Globe2,
      count: outboundPackages.length,
      badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300",
      description: "International Packages",
    },
    {
      label: "All Packages",
      href: "/admin/travel/packages",
      icon: Package,
      count: packages.length,
      badgeColor: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
      description: "Full Catalogue",
    },
    {
      label: "Travel Inquiries",
      href: "/admin/travel/inquiries",
      icon: Inbox,
      count: inquiries.length,
      newCount: newInquiriesCount,
      badgeColor: "bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300",
      description: "Customer Requests & Replies",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl font-bold tracking-tight text-navy dark:text-foreground">
              Travel Management
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-brand-blue border border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900">
              <Compass className="size-3.5" />
              Inquiry-Based Desk
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage inbound and outbound tour packages, review traveler inquiries, and communicate directly with customers.
          </p>
        </div>

        {onAddPackage ? (
          <Button
            onClick={onAddPackage}
            className="bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-semibold gap-1.5 shadow-sm h-9 self-start sm:self-auto"
          >
            <Plus className="size-4" />
            {addPackageLabel}
          </Button>
        ) : null}
      </div>

      {/* Subcategory Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border/60 pb-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (pathname === "/admin/travel" && item.href === "/admin/travel/inbound");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all border",
                isActive
                  ? "bg-card text-brand-blue border-brand-blue/30 shadow-xs font-semibold"
                  : "bg-muted/30 text-muted-foreground border-transparent hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className={cn("size-4", isActive ? "text-brand-blue" : "text-muted-foreground")} />
              <span>{item.label}</span>
              <span className={cn("px-1.5 py-0.2 rounded-full text-[10px] font-bold", item.badgeColor)}>
                {item.count}
              </span>
              {item.newCount && item.newCount > 0 ? (
                <span className="bg-brand-red text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full animate-pulse">
                  {item.newCount} New
                </span>
              ) : null}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
