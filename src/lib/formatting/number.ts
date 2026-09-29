import { clientEnv } from "@/config/environment";

export function formatNumber(
  value: number,
  options: Intl.NumberFormatOptions = {},
  locale: string = clientEnv.NEXT_PUBLIC_DEFAULT_LOCALE,
): string {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function formatPercent(
  fraction: number,
  locale: string = clientEnv.NEXT_PUBLIC_DEFAULT_LOCALE,
): string {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 1,
  }).format(fraction);
}

/** Human-readable byte size for the file uploader. */
export function formatFileSize(bytes: number): string {
  if (bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"] as const;
  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );
  const value = bytes / 1024 ** exponent;
  return `${value.toFixed(exponent === 0 ? 0 : 1)} ${units[exponent]}`;
}
