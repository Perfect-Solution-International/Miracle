import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Consistent page title block. `actions` holds the primary buttons, which
 * callers typically wrap in `<Can>` so they appear only when permitted.
 */
export function PageHeader({
  title,
  description,
  actions,
  className,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between border-b border-slate-100 pb-5",
        className,
      )}
    >
      <div className="space-y-1">
        <h1 className="font-heading text-2xl font-bold tracking-tight text-navy">{title}</h1>
        {description ? (
          <p className="text-slate-500 max-w-2xl text-xs">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </div>
  );
}
