import { api } from "@/lib/api/client";
import { API_ROUTES } from "@/lib/api/endpoints";
import { normaliseQuery } from "@/lib/utilities/url-search-params";
import type { Paginated } from "@/types/api.types";
import type {
  Quotation,
  QuotationFilters,
  QuotationSummary,
} from "../types/quotation.types";
import type {
  CreateQuotationInput,
  RejectQuotationInput,
} from "../schemas/quotation.schema";

/**
 * Quotation transport. Components never call these directly; they go through the
 * feature hooks, which own caching and invalidation.
 */
export const quotationApi = {
  list: (filters: QuotationFilters, signal?: AbortSignal) =>
    api.get<Paginated<QuotationSummary>>(API_ROUTES.quotations.list, {
      params: normaliseQuery(filters),
      signal,
    }),

  detail: (id: string, signal?: AbortSignal) =>
    api.get<Quotation>(API_ROUTES.quotations.detail(id), { signal }),

  create: (input: CreateQuotationInput) =>
    api.post<Quotation>(API_ROUTES.quotations.create, input),

  approve: (id: string) => api.post<Quotation>(API_ROUTES.quotations.approve(id)),

  reject: (id: string, input: RejectQuotationInput) =>
    api.post<Quotation>(API_ROUTES.quotations.reject(id), input),
};
