import { clientEnv } from "@/config/environment";
import type { IsoDateTime } from "@/types/common.types";

/**
 * Date formatting via `Intl`, so locale support arrives for free when i18n lands.
 * All inputs are ISO-8601 strings as returned by the Rust backend.
 */
export type DateStyle = "short" | "medium" | "long" | "date-time" | "time";

const STYLE_OPTIONS: Record<DateStyle, Intl.DateTimeFormatOptions> = {
  short: { dateStyle: "short" },
  medium: { dateStyle: "medium" },
  long: { dateStyle: "long" },
  "date-time": { dateStyle: "medium", timeStyle: "short" },
  time: { timeStyle: "short" },
};

export function formatDate(
  value: IsoDateTime | Date | null | undefined,
  style: DateStyle = "medium",
  locale: string = clientEnv.NEXT_PUBLIC_DEFAULT_LOCALE,
): string {
  if (!value) return "-";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat(locale, STYLE_OPTIONS[style]).format(date);
}

/** Relative time such as "3 days ago", for activity feeds and timelines. */
export function formatRelativeTime(
  value: IsoDateTime | Date | null | undefined,
  locale: string = clientEnv.NEXT_PUBLIC_DEFAULT_LOCALE,
): string {
  if (!value) return "-";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  const deltaSeconds = (date.getTime() - Date.now()) / 1000;
  const formatter = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  const divisions: readonly [number, Intl.RelativeTimeFormatUnit][] = [
    [60, "second"],
    [60, "minute"],
    [24, "hour"],
    [7, "day"],
    [4.34524, "week"],
    [12, "month"],
    [Number.POSITIVE_INFINITY, "year"],
  ];

  let duration = deltaSeconds;
  for (const [amount, unit] of divisions) {
    if (Math.abs(duration) < amount) {
      return formatter.format(Math.round(duration), unit);
    }
    duration /= amount;
  }
  return formatter.format(Math.round(duration), "year");
}

export function toIsoDate(value: Date): string {
  return value.toISOString().slice(0, 10);
}
