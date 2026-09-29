import { describe, expect, it } from "vitest";

import { createAbility } from "@/lib/permissions/ability";
import { quotationStatus } from "@/lib/constants/statuses/quotation-status";
import { calculateTotals, canApprove, canEdit, canReject } from "./quotation.utils";

/**
 * The quotation workflow is the platform's core commercial flow, so the rules
 * governing who may act, and when, are asserted explicitly.
 */
describe("quotation status transitions", () => {
  it("allows only the documented path out of each state", () => {
    expect(quotationStatus.canTransition("draft", "sent")).toBe(true);
    expect(quotationStatus.canTransition("under_review", "approved")).toBe(true);
    expect(quotationStatus.canTransition("under_review", "rejected")).toBe(true);

    // A draft cannot jump straight to approved.
    expect(quotationStatus.canTransition("draft", "approved")).toBe(false);
  });

  it("treats rejected, expired, and converted as terminal", () => {
    expect(quotationStatus.isTerminal("rejected")).toBe(true);
    expect(quotationStatus.isTerminal("expired")).toBe(true);
    expect(quotationStatus.isTerminal("converted")).toBe(true);
    expect(quotationStatus.isTerminal("under_review")).toBe(false);
  });
});

describe("quotation permissions", () => {
  const customer = createAbility({ roles: ["customer"] });
  const supplier = createAbility({ roles: ["supplier"] });

  it("lets a customer approve a quotation awaiting their decision", () => {
    expect(canApprove("under_review", customer)).toBe(true);
    expect(canReject("under_review", customer)).toBe(true);
  });

  it("stops a supplier approving their own quotation", () => {
    expect(canApprove("under_review", supplier)).toBe(false);
    expect(canReject("under_review", supplier)).toBe(false);
  });

  it("refuses approval of a terminal quotation even with permission", () => {
    // Status and permission must both allow the action.
    expect(canApprove("rejected", customer)).toBe(false);
    expect(canApprove("converted", customer)).toBe(false);
  });

  it("permits editing only while a quotation is a draft", () => {
    expect(canEdit("draft", supplier)).toBe(true);
    expect(canEdit("sent", supplier)).toBe(false);
  });
});

describe("calculateTotals", () => {
  it("sums line items into minor units", () => {
    const totals = calculateTotals(
      [
        { description: "Widget", quantity: 10, unit: "units", unitPrice: 25.5 },
        { description: "Gadget", quantity: 2, unit: "units", unitPrice: 100 },
      ],
      "USD",
    );

    // (10 x 25.50) + (2 x 100.00) = 455.00
    expect(totals.subtotalMinor).toBe(45500);
    expect(totals.totalMinor).toBe(45500);
  });

  it("adds tax and shipping to the total", () => {
    const totals = calculateTotals(
      [{ description: "Widget", quantity: 1, unit: "units", unitPrice: 100 }],
      "USD",
      15,
      35.5,
    );

    expect(totals.subtotalMinor).toBe(10000);
    expect(totals.taxMinor).toBe(1500);
    expect(totals.shippingMinor).toBe(3550);
    expect(totals.totalMinor).toBe(15050);
  });

  it("returns zero for an empty quotation", () => {
    expect(calculateTotals([], "USD").totalMinor).toBe(0);
  });
});
