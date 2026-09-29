import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface AdminStatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  hint?: string;
  change?: string;
  isPositive?: boolean;
  highlight?: boolean;
  accentColor?: "blue" | "red" | "navy" | "default";
  className?: string;
}

export function AdminStatCard({
  label,
  value,
  icon: Icon,
  hint,
  change,
  isPositive,
  highlight,
  accentColor = "default",
  className,
}: AdminStatCardProps) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
        highlight
          ? "border-red-200/80 bg-red-50/20 dark:border-red-900/50 dark:bg-red-950/10"
          : "border-border/70 hover:border-border",
        className,
      )}
    >
      {/* Subtle top indicator line on hover or when highlighted */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-1 transition-opacity",
          highlight
            ? "bg-brand-red opacity-100"
            : accentColor === "blue"
              ? "bg-brand-blue opacity-0 group-hover:opacity-100"
              : "bg-navy-light opacity-0 group-hover:opacity-100",
        )}
      />

      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            {label}
          </p>
          <div className="flex items-baseline gap-2">
            <span
              className={cn(
                "font-heading text-3xl font-bold tracking-tight text-navy dark:text-foreground",
                highlight && "text-brand-red dark:text-red-400",
              )}
            >
              {value}
            </span>
            {change ? (
              <span
                className={cn(
                  "text-xs font-medium",
                  isPositive
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-muted-foreground",
                )}
              >
                {change}
              </span>
            ) : null}
          </div>
        </div>

        <div
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors",
            highlight
              ? "bg-red-100 text-brand-red dark:bg-red-950 dark:text-red-400"
              : "bg-brand-blue-light text-brand-blue dark:bg-brand-blue-dark/30 dark:text-brand-blue-muted",
          )}
        >
          <Icon className="size-5" aria-hidden="true" />
        </div>
      </div>

      {hint ? (
        <div className="mt-3 flex items-center gap-1.5 border-t border-border/40 pt-2.5">
          {highlight ? (
            <span className="size-1.5 rounded-full bg-brand-red animate-pulse" />
          ) : (
            <span className="size-1.5 rounded-full bg-brand-blue/60" />
          )}
          <p
            className={cn(
              "text-xs font-medium",
              highlight
                ? "text-brand-red font-semibold dark:text-red-300"
                : "text-muted-foreground",
            )}
          >
            {hint}
          </p>
        </div>
      ) : null}
    </Card>
  );
}
