import { api } from "@/lib/api/client";
import { API_ROUTES } from "@/lib/api/endpoints";
import { normaliseQuery } from "@/lib/utilities/url-search-params";
import type { Paginated } from "@/types/api.types";
import type { OrderStatus } from "@/lib/constants/statuses/order-status";
import type {
  Order,
  OrderFilters,
  OrderSummary,
  OrderTrackingEvent,
} from "../types/order.types";

export const orderApi = {
  list: (filters: OrderFilters, signal?: AbortSignal) =>
    api.get<Paginated<OrderSummary>>(API_ROUTES.orders.list, {
      params: normaliseQuery(filters),
      signal,
    }),

  detail: (id: string, signal?: AbortSignal) =>
    api.get<Order>(API_ROUTES.orders.detail(id), { signal }),

  tracking: (id: string, signal?: AbortSignal) =>
    api.get<OrderTrackingEvent[]>(API_ROUTES.orders.tracking(id), { signal }),

  updateStatus: (id: string, status: OrderStatus, note?: string) =>
    api.patch<Order>(API_ROUTES.orders.updateStatus(id), { status, note }),
};
