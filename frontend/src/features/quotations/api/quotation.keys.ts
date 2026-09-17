import { QUERY_NAMESPACES } from "@/lib/query/query-keys";
import type { QuotationFilters } from "../types/quotation.types";

/**
 * Hierarchical query keys.
 *
 * The nesting makes invalidation precise: invalidating `lists()` refreshes every
 * filtered list without discarding cached detail views, while `all` clears the
 * whole feature. Filters are part of the key, so each filter combination is
 * cached separately.
 */
export const quotationKeys = {
  all: [QUERY_NAMESPACES.quotations] as const,
  lists: () => [...quotationKeys.all, "list"] as const,
  list: (filters: QuotationFilters) => [...quotationKeys.lists(), filters] as const,
  details: () => [...quotationKeys.all, "detail"] as const,
  detail: (id: string) => [...quotationKeys.details(), id] as const,
};
