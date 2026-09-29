import { formatCurrency, type FormatCurrencyOptions } from "@/lib/formatting/currency";
import type { CurrencyCode, Money } from "@/types/common.types";
import { cn } from "@/lib/utils";

/**
 * Displays a monetary amount. Every value carries its own currency code, so the
 * component works unchanged when the platform adds currencies.
 */
export function CurrencyDisplay({
  amountMinor,
  currency,
  className,
  ...options
}: {
  amountMinor: number;
  currency: CurrencyCode;
  className?: string;
} & FormatCurrencyOptions) {
  return (
    <span className={cn("tabular-nums", className)}>
      {formatCurrency(amountMinor, currency, options)}
    </span>
  );
}

export function MoneyDisplay({
  money,
  className,
  ...options
}: { money: Money; className?: string } & FormatCurrencyOptions) {
  return (
    <CurrencyDisplay
      amountMinor={money.amountMinor}
      currency={money.currency}
      className={className}
      {...options}
    />
  );
}
