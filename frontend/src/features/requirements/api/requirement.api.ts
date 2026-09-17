import { api } from "@/lib/api/client";
import { API_ROUTES } from "@/lib/api/endpoints";
import { normaliseQuery } from "@/lib/utilities/url-search-params";
import type { Paginated } from "@/types/api.types";
import type {
  Requirement,
  RequirementFilters,
  RequirementSummary,
} from "../types/requirement.types";
import type { CreateRequirementInput } from "../schemas/create-requirement.schema";

export const requirementApi = {
  list: (filters: RequirementFilters, signal?: AbortSignal) =>
    api.get<Paginated<RequirementSummary>>(API_ROUTES.requirements.list, {
      params: normaliseQuery(filters),
      signal,
    }),

  detail: (id: string, signal?: AbortSignal) =>
    api.get<Requirement>(API_ROUTES.requirements.detail(id), { signal }),

  create: (input: CreateRequirementInput) =>
    api.post<Requirement>(API_ROUTES.requirements.create, input),

  submit: (id: string) => api.post<Requirement>(API_ROUTES.requirements.submit(id)),

  cancel: (id: string, reason: string) =>
    api.post<Requirement>(API_ROUTES.requirements.cancel(id), { reason }),
};
