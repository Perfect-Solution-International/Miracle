"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { quotationApi } from "../api/quotation.api";
import { quotationKeys } from "../api/quotation.keys";
import type { QuotationFilters } from "../types/quotation.types";

/**
 * Paginated quotation list.
 *
 * `keepPreviousData` holds the current rows on screen while the next page loads,
 * so paging does not blank the table. The `signal` is forwarded so an abandoned
 * request is cancelled rather than resolving into a stale render.
 */
export function useQuotations(filters: QuotationFilters) {
  return useQuery({
    queryKey: quotationKeys.list(filters),
    queryFn: ({ signal }) => quotationApi.list(filters, signal),
    placeholderData: keepPreviousData,
  });
}
