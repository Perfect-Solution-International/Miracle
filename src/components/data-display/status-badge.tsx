import { Badge } from "@/components/ui/badge";
import type { StatusVariant } from "@/lib/constants/statuses/status.types";
import { cn } from "@/lib/utils";

/**
 * Renders a workflow status. Callers pass a label and variant resolved from the
 * status definitions, so no component hardcodes status strings or colours.
 *
 * Colour is paired with text in every case, so status is never conveyed by
 * colour alone.
 */
const VARIANT_CLASSES: Record<StatusVariant, string> = {
  neutral: "bg-muted text-muted-foreground border-transparent",
  info: "bg-blue-100 text-blue-800 border-transparent dark:bg-blue-950 dark:text-blue-200",
  pending:
    "bg-amber-100 text-amber-900 border-transparent dark:bg-amber-950 dark:text-amber-200",
  success:
    "bg-emerald-100 text-emerald-900 border-transparent dark:bg-emerald-950 dark:text-emerald-200",
  warning:
    "bg-orange-100 text-orange-900 border-transparent dark:bg-orange-950 dark:text-orange-200",
  danger: "bg-red-100 text-red-900 border-transparent dark:bg-red-950 dark:text-red-200",
};

export function StatusBadge({
  label,
  variant = "neutral",
  className,
}: {
  label: string;
  variant?: StatusVariant;
  className?: string;
}) {
  return (
    <Badge className={cn(VARIANT_CLASSES[variant], "font-medium", className)}>
      {label}
    </Badge>
  );
}
