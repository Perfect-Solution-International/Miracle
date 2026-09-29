import { createStatusHelpers, type StatusMap } from "./status.types";

export const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "processing",
  "in_production",
  "shipped",
  "in_transit",
  "customs_clearance",
  "delivered",
  "completed",
  "cancelled",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

const MAP: StatusMap<OrderStatus> = {
  pending: {
    value: "pending",
    label: "Pending",
    variant: "pending",
    transitionsTo: ["confirmed", "cancelled"],
    requiredPermission: "orders.manage",
  },
  confirmed: {
    value: "confirmed",
    label: "Confirmed",
    variant: "info",
    transitionsTo: ["processing", "cancelled"],
    requiredPermission: "orders.manage",
  },
  processing: {
    value: "processing",
    label: "Processing",
    variant: "info",
    transitionsTo: ["in_production", "shipped", "cancelled"],
    requiredPermission: "orders.manage",
  },
  in_production: {
    value: "in_production",
    label: "In Production",
    variant: "info",
    transitionsTo: ["shipped", "cancelled"],
    requiredPermission: "orders.manage",
  },
  shipped: {
    value: "shipped",
    label: "Shipped",
    variant: "info",
    transitionsTo: ["in_transit"],
    requiredPermission: "logistics.manage",
  },
  in_transit: {
    value: "in_transit",
    label: "In Transit",
    variant: "info",
    transitionsTo: ["customs_clearance", "delivered"],
    requiredPermission: "logistics.manage",
  },
  customs_clearance: {
    value: "customs_clearance",
    label: "Customs Clearance",
    variant: "warning",
    transitionsTo: ["delivered"],
    requiredPermission: "imports.manage",
  },
  delivered: {
    value: "delivered",
    label: "Delivered",
    variant: "success",
    transitionsTo: ["completed"],
    requiredPermission: "orders.manage",
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

export const orderStatus = createStatusHelpers(MAP);
export const ORDER_STATUS_MAP = MAP;
