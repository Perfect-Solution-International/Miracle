import { clientEnv } from "@/config/environment";
import { getCurrencyDefinition } from "@/lib/constants/currencies";
import type { CurrencyCode, Money } from "@/types/common.types";

/**
 * Currency formatting.
 *
 * Amounts cross the wire in minor units (integer cents) to avoid floating-point
 * drift on financial figures, and are converted to major units only for display.
 */
export function minorToMajor(amountMinor: number, currency: CurrencyCode): number {
  const { decimals } = getCurrencyDefinition(currency);
  return amountMinor / 10 ** decimals;
}

export function majorToMinor(amountMajor: number, currency: CurrencyCode): number {
  const { decimals } = getCurrencyDefinition(currency);
  return Math.round(amountMajor * 10 ** decimals);
}

export interface FormatCurrencyOptions {
  locale?: string;
  /** Renders "USD 1,200" instead of "$1,200". Useful in multi-currency tables. */
  showCode?: boolean;
  /** Drops decimals for whole amounts, e.g. dashboard totals. */
  compact?: boolean;
}

export function formatCurrency(
  amountMinor: number,
  currency: CurrencyCode,
  options: FormatCurrencyOptions = {},
): string {
  const {
    locale = clientEnv.NEXT_PUBLIC_DEFAULT_LOCALE,
    showCode = false,
    compact = false,
  } = options;
  const definition = getCurrencyDefinition(currency);
  const value = minorToMajor(amountMinor, currency);

  const formatter = new Intl.NumberFormat(locale, {
    style: showCode ? "decimal" : "currency",
    currency,
    currencyDisplay: "symbol",
    minimumFractionDigits: compact ? 0 : definition.decimals,
    maximumFractionDigits: compact ? 0 : definition.decimals,
    notation: compact ? "compact" : "standard",
  });

  return showCode ? `${currency} ${formatter.format(value)}` : formatter.format(value);
}

export function formatMoney(money: Money, options?: FormatCurrencyOptions): string {
  return formatCurrency(money.amountMinor, money.currency, options);
}
