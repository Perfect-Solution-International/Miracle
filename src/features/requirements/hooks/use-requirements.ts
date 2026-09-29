"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { requirementApi } from "../api/requirement.api";
import { requirementKeys } from "../api/requirement.keys";
import type { RequirementFilters } from "../types/requirement.types";

export function useRequirements(filters: RequirementFilters) {
  return useQuery({
    queryKey: requirementKeys.list(filters),
    queryFn: ({ signal }) => requirementApi.list(filters, signal),
    placeholderData: keepPreviousData,
  });
}
