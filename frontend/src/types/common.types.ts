/** ISO-8601 timestamp string as returned by the Rust backend. */
export type IsoDateTime = string;

/** ISO-4217 currency code, e.g. "USD". */
export type CurrencyCode = string;

/** A monetary amount. Minor units avoid floating point drift. */
export interface Money {
  /** Amount in the currency's minor unit (cents, paisa, fils). */
  amountMinor: number;
  currency: CurrencyCode;
}

export interface Identifiable {
  id: string;
}

export interface Timestamped {
  createdAt: IsoDateTime;
  updatedAt: IsoDateTime;
}

/** Narrows an unknown value to a record without resorting to `any`. */
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
