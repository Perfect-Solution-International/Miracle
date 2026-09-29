import type { CurrencyCode } from "@/types/common.types";

export interface CurrencyDefinition {
  code: CurrencyCode;
  label: string;
  symbol: string;
  /** Digits after the decimal point. Drives minor-unit conversion. */
  decimals: number;
}

/**
 * Supported currencies. No value in the system is assumed to be LKR: every
 * amount carries its own code and is formatted against this table.
 */
export const CURRENCIES = {
  LKR: { code: "LKR", label: "Sri Lankan Rupee", symbol: "Rs", decimals: 2 },
  USD: { code: "USD", label: "US Dollar", symbol: "$", decimals: 2 },
  INR: { code: "INR", label: "Indian Rupee", symbol: "Rs", decimals: 2 },
  CNY: { code: "CNY", label: "Chinese Yuan", symbol: "Y", decimals: 2 },
  AED: { code: "AED", label: "UAE Dirham", symbol: "AED", decimals: 2 },
  EUR: { code: "EUR", label: "Euro", symbol: "E", decimals: 2 },
} as const satisfies Record<string, CurrencyDefinition>;

export type SupportedCurrency = keyof typeof CURRENCIES;

export function getCurrencyDefinition(code: CurrencyCode): CurrencyDefinition {
  return (
    CURRENCIES[code as SupportedCurrency] ?? {
      code,
      label: code,
      symbol: code,
      decimals: 2,
    }
  );
}
