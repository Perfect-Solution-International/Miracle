import { formatDate, formatRelativeTime, type DateStyle } from "@/lib/formatting/date";
import type { IsoDateTime } from "@/types/common.types";

/**
 * Renders a timestamp inside `<time>` with a machine-readable `dateTime`, and
 * puts the absolute value in the tooltip when showing relative time.
 */
export function DateDisplay({
  value,
  style = "medium",
  relative = false,
  className,
}: {
  value: IsoDateTime | Date | null | undefined;
  style?: DateStyle;
  relative?: boolean;
  className?: string;
}) {
  if (!value) return <span className={className}>-</span>;

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return <span className={className}>-</span>;

  const absolute = formatDate(date, style);

  return (
    <time dateTime={date.toISOString()} title={absolute} className={className}>
      {relative ? formatRelativeTime(date) : absolute}
    </time>
  );
}
