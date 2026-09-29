import { QUERY_NAMESPACES } from "@/lib/query/query-keys";
import type { RequirementFilters } from "../types/requirement.types";

export const requirementKeys = {
  all: [QUERY_NAMESPACES.requirements] as const,
  lists: () => [...requirementKeys.all, "list"] as const,
  list: (filters: RequirementFilters) => [...requirementKeys.lists(), filters] as const,
  details: () => [...requirementKeys.all, "detail"] as const,
  detail: (id: string) => [...requirementKeys.details(), id] as const,
};
