import {
  quotationStatus,
  type QuotationStatus,
} from "@/lib/constants/statuses/quotation-status";
import type { Ability } from "@/lib/permissions/ability";
import { majorToMinor } from "@/lib/formatting/currency";
import type { CurrencyCode } from "@/types/common.types";
import type { QuotationLineItemInput } from "../schemas/quotation.schema";

/** Totals computed client-side for live preview. The backend remains authoritative. */
export function calculateTotals(
  lineItems: readonly QuotationLineItemInput[],
  currency: CurrencyCode,
  taxAmount = 0,
  shippingAmount = 0,
) {
  const subtotalMinor = lineItems.reduce(
    (sum, item) => sum + majorToMinor(item.unitPrice, currency) * item.quantity,
    0,
  );
  const taxMinor = majorToMinor(taxAmount, currency);
  const shippingMinor = majorToMinor(shippingAmount, currency);

  return {
    subtotalMinor,
    taxMinor,
    shippingMinor,
    totalMinor: subtotalMinor + taxMinor + shippingMinor,
  };
}

/**
 * Whether the current user may act on a quotation in its present state.
 * Combines the status transition rules with the user's permissions, so the two
 * are never checked inconsistently across components.
 */
export function canApprove(status: QuotationStatus, ability: Ability): boolean {
  return (
    quotationStatus.canTransition(status, "approved") && ability.can("quotations.approve")
  );
}

export function canReject(status: QuotationStatus, ability: Ability): boolean {
  return (
    quotationStatus.canTransition(status, "rejected") && ability.can("quotations.approve")
  );
}

export function canEdit(status: QuotationStatus, ability: Ability): boolean {
  return status === "draft" && ability.canAny(["quotations.create", "quotations.manage"]);
}

export function isExpiringSoon(validUntil: string | undefined, days = 3): boolean {
  if (!validUntil) return false;
  const expiry = new Date(validUntil).getTime();
  if (Number.isNaN(expiry)) return false;
  const threshold = Date.now() + days * 24 * 60 * 60 * 1000;
  return expiry > Date.now() && expiry <= threshold;
}
