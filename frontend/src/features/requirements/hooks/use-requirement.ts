"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { requirementApi } from "../api/requirement.api";
import { requirementKeys } from "../api/requirement.keys";
import type { CreateRequirementInput } from "../schemas/create-requirement.schema";

export function useRequirement(id: string | undefined) {
  return useQuery({
    queryKey: requirementKeys.detail(id ?? ""),
    queryFn: ({ signal }) => requirementApi.detail(id as string, signal),
    enabled: Boolean(id),
  });
}

export function useCreateRequirement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateRequirementInput) => requirementApi.create(input),
    onSuccess: (requirement) => {
      queryClient.setQueryData(requirementKeys.detail(requirement.id), requirement);
      void queryClient.invalidateQueries({ queryKey: requirementKeys.lists() });
      toast.success("Requirement submitted");
    },
  });
}

export function useSubmitRequirement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => requirementApi.submit(id),
    onSuccess: (requirement) => {
      queryClient.setQueryData(requirementKeys.detail(requirement.id), requirement);
      void queryClient.invalidateQueries({ queryKey: requirementKeys.lists() });
      toast.success(`Requirement ${requirement.reference} submitted for sourcing`);
    },
  });
}
