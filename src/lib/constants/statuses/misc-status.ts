import { createStatusHelpers, type StatusMap } from "./status.types";

/* Bookings ================================================================= */

export const BOOKING_STATUSES = [
  "enquiry",
  "pending",
  "confirmed",
  "completed",
  "cancelled",
] as const;
export type BookingStatus = (typeof BOOKING_STATUSES)[number];

const BOOKING_MAP: StatusMap<BookingStatus> = {
  enquiry: {
    value: "enquiry",
    label: "Enquiry",
    variant: "neutral",
    transitionsTo: ["pending", "cancelled"],
  },
  pending: {
    value: "pending",
    label: "Pending",
    variant: "pending",
    transitionsTo: ["confirmed", "cancelled"],
    requiredPermission: "bookings.manage",
  },
  confirmed: {
    value: "confirmed",
    label: "Confirmed",
    variant: "info",
    transitionsTo: ["completed", "cancelled"],
    requiredPermission: "bookings.manage",
  },
  completed: {
    value: "completed",
    label: "Completed",
    variant: "success",
    terminal: true,
  },
  cancelled: {
    value: "cancelled",
    label: "Cancelled",
    variant: "danger",
    terminal: true,
  },
};
export const bookingStatus = createStatusHelpers(BOOKING_MAP);

/* Documents ================================================================ */

export const DOCUMENT_STATUSES = [
  "uploading",
  "pending_review",
  "verified",
  "rejected",
  "expired",
] as const;
export type DocumentStatus = (typeof DOCUMENT_STATUSES)[number];

const DOCUMENT_MAP: StatusMap<DocumentStatus> = {
  uploading: { value: "uploading", label: "Uploading", variant: "neutral" },
  pending_review: {
    value: "pending_review",
    label: "Pending Review",
    variant: "pending",
    transitionsTo: ["verified", "rejected"],
    requiredPermission: "documents.manage",
  },
  verified: {
    value: "verified",
    label: "Verified",
    variant: "success",
    transitionsTo: ["expired"],
  },
  rejected: {
    value: "rejected",
    label: "Rejected",
    variant: "danger",
    terminal: true,
  },
  expired: {
    value: "expired",
    label: "Expired",
    variant: "warning",
    terminal: true,
  },
};
export const documentStatus = createStatusHelpers(DOCUMENT_MAP);

/* Supplier verification ==================================================== */

export const SUPPLIER_VERIFICATION_STATUSES = [
  "unverified",
  "pending",
  "verified",
  "suspended",
  "rejected",
] as const;
export type SupplierVerificationStatus = (typeof SUPPLIER_VERIFICATION_STATUSES)[number];

const SUPPLIER_MAP: StatusMap<SupplierVerificationStatus> = {
  unverified: {
    value: "unverified",
    label: "Unverified",
    variant: "neutral",
    transitionsTo: ["pending"],
  },
  pending: {
    value: "pending",
    label: "Pending Verification",
    variant: "pending",
    transitionsTo: ["verified", "rejected"],
    requiredPermission: "suppliers.verify",
  },
  verified: {
    value: "verified",
    label: "Verified",
    variant: "success",
    transitionsTo: ["suspended"],
    requiredPermission: "suppliers.verify",
  },
  suspended: {
    value: "suspended",
    label: "Suspended",
    variant: "warning",
    transitionsTo: ["verified"],
    requiredPermission: "suppliers.verify",
  },
  rejected: {
    value: "rejected",
    label: "Rejected",
    variant: "danger",
    terminal: true,
  },
};
export const supplierVerificationStatus = createStatusHelpers(SUPPLIER_MAP);

/* Support tickets ========================================================== */

export const SUPPORT_TICKET_STATUSES = [
  "open",
  "in_progress",
  "waiting_customer",
  "resolved",
  "closed",
] as const;
export type SupportTicketStatus = (typeof SUPPORT_TICKET_STATUSES)[number];

const SUPPORT_MAP: StatusMap<SupportTicketStatus> = {
  open: {
    value: "open",
    label: "Open",
    variant: "info",
    transitionsTo: ["in_progress", "closed"],
    requiredPermission: "support.manage",
  },
  in_progress: {
    value: "in_progress",
    label: "In Progress",
    variant: "pending",
    transitionsTo: ["waiting_customer", "resolved"],
    requiredPermission: "support.manage",
  },
  waiting_customer: {
    value: "waiting_customer",
    label: "Waiting on Customer",
    variant: "warning",
    transitionsTo: ["in_progress", "resolved"],
  },
  resolved: {
    value: "resolved",
    label: "Resolved",
    variant: "success",
    transitionsTo: ["closed"],
  },
  closed: {
    value: "closed",
    label: "Closed",
    variant: "neutral",
    terminal: true,
  },
};
export const supportTicketStatus = createStatusHelpers(SUPPORT_MAP);

/* Visa requests ============================================================ */

export const VISA_REQUEST_STATUSES = [
  "draft",
  "submitted",
  "processing",
  "approved",
  "rejected",
  "cancelled",
] as const;
export type VisaRequestStatus = (typeof VISA_REQUEST_STATUSES)[number];

const VISA_MAP: StatusMap<VisaRequestStatus> = {
  draft: {
    value: "draft",
    label: "Draft",
    variant: "neutral",
    transitionsTo: ["submitted", "cancelled"],
  },
  submitted: {
    value: "submitted",
    label: "Submitted",
    variant: "info",
    transitionsTo: ["processing", "cancelled"],
    requiredPermission: "visa.manage",
  },
  processing: {
    value: "processing",
    label: "Processing",
    variant: "pending",
    transitionsTo: ["approved", "rejected"],
    requiredPermission: "visa.manage",
  },
  approved: {
    value: "approved",
    label: "Approved",
    variant: "success",
    terminal: true,
  },
  rejected: {
    value: "rejected",
    label: "Rejected",
    variant: "danger",
    terminal: true,
  },
  cancelled: {
    value: "cancelled",
    label: "Cancelled",
    variant: "neutral",
    terminal: true,
  },
};
export const visaRequestStatus = createStatusHelpers(VISA_MAP);
