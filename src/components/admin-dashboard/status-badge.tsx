import { cn } from "@/lib/utils";
import type { RequestStatus } from "./types";

const STATUS_CONFIG: Record<
  RequestStatus,
  { bg: string; text: string; dot: string; border: string }
> = {
  Pending: {
    bg: "bg-red-50 dark:bg-red-950/40",
    text: "text-red-700 dark:text-red-300",
    dot: "bg-red-500",
    border: "border-red-200 dark:border-red-900/60",
  },
  Reviewing: {
    bg: "bg-amber-50 dark:bg-amber-950/40",
    text: "text-amber-800 dark:text-amber-300",
    dot: "bg-amber-500",
    border: "border-amber-200 dark:border-amber-900/60",
  },
  Confirmed: {
    bg: "bg-blue-50 dark:bg-blue-950/40",
    text: "text-blue-700 dark:text-blue-300",
    dot: "bg-blue-600",
    border: "border-blue-200 dark:border-blue-900/60",
  },
  Completed: {
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    text: "text-emerald-700 dark:text-emerald-300",
    dot: "bg-emerald-500",
    border: "border-emerald-200 dark:border-emerald-900/60",
  },
  Rescheduled: {
    bg: "bg-purple-50 dark:bg-purple-950/40",
    text: "text-purple-700 dark:text-purple-300",
    dot: "bg-purple-500",
    border: "border-purple-200 dark:border-purple-900/60",
  },
  Cancelled: {
    bg: "bg-slate-100 dark:bg-slate-800",
    text: "text-slate-700 dark:text-slate-300",
    dot: "bg-slate-400",
    border: "border-slate-200 dark:border-slate-700",
  },
};

export function AdminStatusBadge({
  status,
  className,
}: {
  status: RequestStatus;
  className?: string;
}) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.Pending;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-tight transition-colors",
        config.bg,
        config.text,
        config.border,
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", config.dot)} aria-hidden="true" />
      {status}
    </span>
  );
}
