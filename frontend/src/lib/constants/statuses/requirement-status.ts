import { createStatusHelpers, type StatusMap } from "./status.types";

export const REQUIREMENT_STATUSES = [
  "draft",
  "submitted",
  "under_review",
  "sourcing",
  "quoted",
  "fulfilled",
  "cancelled",
] as const;

export type RequirementStatus = (typeof REQUIREMENT_STATUSES)[number];

const MAP: StatusMap<RequirementStatus> = {
  draft: {
    value: "draft",
    label: "Draft",
    variant: "neutral",
    transitionsTo: ["submitted", "cancelled"],
    requiredPermission: "requirements.create",
  },
  submitted: {
    value: "submitted",
    label: "Submitted",
    variant: "info",
    transitionsTo: ["under_review", "cancelled"],
    requiredPermission: "requirements.manage",
  },
  under_review: {
    value: "under_review",
    label: "Under Review",
    variant: "pending",
    transitionsTo: ["sourcing", "cancelled"],
    requiredPermission: "requirements.manage",
  },
  sourcing: {
    value: "sourcing",
    label: "Sourcing",
    variant: "pending",
    transitionsTo: ["quoted", "cancelled"],
    requiredPermission: "sourcing.manage",
  },
  quoted: {
    value: "quoted",
    label: "Quoted",
    variant: "success",
    transitionsTo: ["fulfilled", "cancelled"],
    requiredPermission: "quotations.manage",
  },
  fulfilled: {
    value: "fulfilled",
    label: "Fulfilled",
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

export const requirementStatus = createStatusHelpers(MAP);
export const REQUIREMENT_STATUS_MAP = MAP;
