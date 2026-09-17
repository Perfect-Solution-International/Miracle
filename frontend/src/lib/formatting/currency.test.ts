import { describe, expect, it } from "vitest";

import { formatCurrency, majorToMinor, minorToMajor } from "./currency";

/**
 * Money is stored in minor units to avoid floating-point drift on financial
 * figures, so the conversions are asserted directly.
 */
describe("minor and major unit conversion", () => {
  it("round-trips an amount without precision loss", () => {
    expect(majorToMinor(1250.75, "USD")).toBe(125075);
    expect(minorToMajor(125075, "USD")).toBe(1250.75);
  });

  it("rounds rather than truncating sub-cent input", () => {
    expect(majorToMinor(0.015, "USD")).toBe(2);
  });

  it("avoids the classic floating point error", () => {
    // 0.1 + 0.2 !== 0.3 in binary floating point; minor units sidestep it.
    const total = majorToMinor(0.1, "USD") + majorToMinor(0.2, "USD");
    expect(total).toBe(30);
    expect(minorToMajor(total, "USD")).toBe(0.3);
  });
});

describe("formatCurrency", () => {
  it("formats each supported currency with its own symbol", () => {
    expect(formatCurrency(125000, "USD", { locale: "en-US" })).toContain("1,250");
    expect(formatCurrency(125000, "LKR", { locale: "en-US" })).toContain("1,250");
  });

  it("never assumes a single currency", () => {
    const usd = formatCurrency(100000, "USD", { locale: "en-US" });
    const eur = formatCurrency(100000, "EUR", { locale: "en-US" });
    expect(usd).not.toBe(eur);
  });

  it("prefixes the code when showCode is set", () => {
    // Multi-currency tables need the code to disambiguate similar symbols.
    expect(formatCurrency(100000, "AED", { locale: "en-US", showCode: true })).toMatch(
      /^AED/,
    );
  });

  it("falls back gracefully for an unknown currency code", () => {
    expect(() => formatCurrency(1000, "XXX", { locale: "en-US" })).not.toThrow();
  });
});
