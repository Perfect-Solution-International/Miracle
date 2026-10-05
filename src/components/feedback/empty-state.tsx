import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Shown when a list or table has no rows, distinct from an error. */
export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-xs px-6 py-12 text-center shadow-2xs",
        className,
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50/80 text-brand-blue border border-blue-100 shadow-2xs mb-1">
        <Icon className="size-6" aria-hidden="true" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-bold text-navy">{title}</h3>
        {description ? (
          <p className="text-slate-500 mx-auto max-w-sm text-xs leading-relaxed">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
