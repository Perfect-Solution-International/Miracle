import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DateDisplay } from "@/components/data-display/date-display";
import type { IsoDateTime } from "@/types/common.types";
import { cn } from "@/lib/utils";

export interface ActivityEntry {
  id: string;
  actorName: string;
  actorInitials: string;
  action: string;
  target?: string;
  timestamp: IsoDateTime;
}

/** Audit trail of who changed what, shown on record detail pages. */
export function ActivityLog({
  entries,
  className,
}: {
  entries: readonly ActivityEntry[];
  className?: string;
}) {
  if (entries.length === 0) {
    return (
      <p className={cn("text-muted-foreground text-sm", className)}>
        No activity recorded yet.
      </p>
    );
  }

  return (
    <ul className={cn("space-y-4", className)}>
      {entries.map((entry) => (
        <li key={entry.id} className="flex gap-3">
          <Avatar className="size-8 shrink-0">
            <AvatarFallback className="text-xs">{entry.actorInitials}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 space-y-0.5">
            <p className="text-sm">
              <span className="font-medium">{entry.actorName}</span>{" "}
              <span className="text-muted-foreground">{entry.action}</span>
              {entry.target ? <span className="font-medium"> {entry.target}</span> : null}
            </p>
            <DateDisplay
              value={entry.timestamp}
              relative
              className="text-muted-foreground text-xs"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
