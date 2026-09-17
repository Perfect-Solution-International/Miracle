import { QUERY_NAMESPACES } from "@/lib/query/query-keys";
import type { OrderFilters } from "../types/order.types";

export const orderKeys = {
  all: [QUERY_NAMESPACES.orders] as const,
  lists: () => [...orderKeys.all, "list"] as const,
  list: (filters: OrderFilters) => [...orderKeys.lists(), filters] as const,
  details: () => [...orderKeys.all, "detail"] as const,
  detail: (id: string) => [...orderKeys.details(), id] as const,
  tracking: (id: string) => [...orderKeys.detail(id), "tracking"] as const,
};
