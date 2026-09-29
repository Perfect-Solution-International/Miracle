import type { ReactNode } from "react";

import { DateDisplay } from "@/components/data-display/date-display";
import type { IsoDateTime } from "@/types/common.types";
import { cn } from "@/lib/utils";

export interface TimelineEntry {
  id: string;
  title: string;
  description?: string;
  timestamp: IsoDateTime;
  icon?: ReactNode;
  /** Highlights the current step, e.g. the live shipment stage. */
  current?: boolean;
}

/**
 * Ordered event history, used for order tracking, quotation history, and
 * document audit trails. An ordered list, so the sequence is conveyed
 * structurally rather than only by the connecting line.
 */
export function Timeline({
  entries,
  className,
}: {
  entries: readonly TimelineEntry[];
  className?: string;
}) {
  return (
    <ol className={cn("relative space-y-6 border-l pl-6", className)}>
      {entries.map((entry) => (
        <li key={entry.id} className="relative">
          <span
            className={cn(
              "absolute -left-[1.6875rem] flex size-3 items-center justify-center rounded-full ring-4",
              entry.current
                ? "bg-primary ring-background"
                : "bg-muted-foreground/40 ring-background",
            )}
            aria-hidden="true"
          />
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              {entry.icon}
              <p className="text-sm font-medium">{entry.title}</p>
              {entry.current ? (
                <span className="text-primary text-xs font-medium">Current</span>
              ) : null}
            </div>
            {entry.description ? (
              <p className="text-muted-foreground text-sm">{entry.description}</p>
            ) : null}
            <DateDisplay
              value={entry.timestamp}
              style="date-time"
              className="text-muted-foreground text-xs"
            />
          </div>
        </li>
      ))}
    </ol>
  );
}
