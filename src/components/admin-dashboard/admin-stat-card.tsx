import type { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface AdminStatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  hint?: string;
  change?: string;
  isPositive?: boolean;
  highlight?: boolean;
  accentColor?: "blue" | "red" | "navy" | "default" | "emerald" | "amber";
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
        "group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-2xs backdrop-blur-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue/40 hover:shadow-soft",
        highlight && "border-red-200/90 bg-red-50/20",
        className,
      )}
    >
      {/* Subtle top indicator highlight */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-1 transition-opacity",
          highlight
            ? "bg-brand-red opacity-100"
            : accentColor === "blue"
              ? "bg-blue-600 opacity-0 group-hover:opacity-100"
              : accentColor === "emerald"
                ? "bg-emerald-500 opacity-0 group-hover:opacity-100"
                : accentColor === "amber"
                  ? "bg-amber-500 opacity-0 group-hover:opacity-100"
                  : "bg-blue-600 opacity-0 group-hover:opacity-100",
        )}
      />

      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1.5">
          <p className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
            {label}
          </p>
          <div className="flex items-baseline gap-2">
            <span
              className={cn(
                "text-2xl sm:text-3xl font-extrabold tracking-tight text-navy",
                highlight && "text-brand-red",
              )}
            >
              {value}
            </span>
            {change ? (
              <span
                className={cn(
                  "text-xs font-semibold px-2 py-0.5 rounded-full",
                  isPositive
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                    : "bg-slate-100 text-slate-600",
                )}
              >
                {change}
              </span>
            ) : null}
          </div>
        </div>

        <div
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-xl transition-all duration-200 shadow-2xs",
            highlight
              ? "bg-red-50 text-brand-red border border-red-100"
              : accentColor === "emerald"
                ? "bg-emerald-50 text-emerald-600 border border-emerald-100/80"
                : accentColor === "amber"
                  ? "bg-amber-50 text-amber-600 border border-amber-100/80"
                  : "bg-blue-50 text-blue-600 border border-blue-100/80",
          )}
        >
          <Icon className="size-5" aria-hidden="true" />
        </div>
      </div>

      {hint ? (
        <div className="mt-3.5 flex items-center gap-1.5 border-t border-slate-100 pt-2.5">
          {highlight ? (
            <span className="size-1.5 rounded-full bg-brand-red animate-pulse" />
          ) : (
            <span className="size-1.5 rounded-full bg-blue-500/80" />
          )}
          <p className="text-xs text-slate-500 font-medium">
            {hint}
          </p>
        </div>
      ) : null}
    </Card>
  );
}
