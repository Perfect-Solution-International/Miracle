import { createStatusHelpers, type StatusMap } from "./status.types";

export const QUOTATION_STATUSES = [
  "draft",
  "sent",
  "under_review",
  "approved",
  "rejected",
  "expired",
  "converted",
] as const;

export type QuotationStatus = (typeof QUOTATION_STATUSES)[number];

const MAP: StatusMap<QuotationStatus> = {
  draft: {
    value: "draft",
    label: "Draft",
    variant: "neutral",
    transitionsTo: ["sent"],
    requiredPermission: "quotations.create",
  },
  sent: {
    value: "sent",
    label: "Sent",
    variant: "info",
    transitionsTo: ["under_review", "expired"],
    requiredPermission: "quotations.manage",
  },
  under_review: {
    value: "under_review",
    label: "Under Review",
    variant: "pending",
    transitionsTo: ["approved", "rejected", "expired"],
    requiredPermission: "quotations.approve",
  },
  approved: {
    value: "approved",
    label: "Approved",
    variant: "success",
    transitionsTo: ["converted"],
    requiredPermission: "orders.create",
  },
  rejected: { value: "rejected", label: "Rejected", variant: "danger", terminal: true },
  expired: { value: "expired", label: "Expired", variant: "warning", terminal: true },
  converted: {
    value: "converted",
    label: "Converted to Order",
    variant: "success",
    terminal: true,
  },
};

export const quotationStatus = createStatusHelpers(MAP);
export const QUOTATION_STATUS_MAP = MAP;
