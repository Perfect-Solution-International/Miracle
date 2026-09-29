import { createStatusHelpers, type StatusMap } from "./status.types";

export const PAYMENT_STATUSES = [
  "pending",
  "partially_paid",
  "paid",
  "overdue",
  "refunded",
  "failed",
] as const;

export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

const MAP: StatusMap<PaymentStatus> = {
  pending: {
    value: "pending",
    label: "Pending",
    variant: "pending",
    transitionsTo: ["partially_paid", "paid", "overdue", "failed"],
    requiredPermission: "payments.manage",
  },
  partially_paid: {
    value: "partially_paid",
    label: "Partially Paid",
    variant: "warning",
    transitionsTo: ["paid", "overdue"],
    requiredPermission: "payments.manage",
  },
  paid: {
    value: "paid",
    label: "Paid",
    variant: "success",
    transitionsTo: ["refunded"],
    requiredPermission: "payments.manage",
  },
  overdue: {
    value: "overdue",
    label: "Overdue",
    variant: "danger",
    transitionsTo: ["partially_paid", "paid"],
    requiredPermission: "payments.manage",
  },
  refunded: {
    value: "refunded",
    label: "Refunded",
    variant: "neutral",
    terminal: true,
  },
  failed: {
    value: "failed",
    label: "Failed",
    variant: "danger",
    terminal: true,
  },
};

export const paymentStatus = createStatusHelpers(MAP);
export const PAYMENT_STATUS_MAP = MAP;
