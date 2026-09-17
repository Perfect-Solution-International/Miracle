"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { orderKeys } from "@/features/orders";
import { quotationApi } from "../api/quotation.api";
import { quotationKeys } from "../api/quotation.keys";
import type {
  CreateQuotationInput,
  RejectQuotationInput,
} from "../schemas/quotation.schema";

/**
 * Quotation mutations.
 *
 * Invalidation is targeted rather than global: a status change updates that
 * quotation's detail entry and the lists that may now order or filter it
 * differently, and leaves every other feature's cache untouched.
 */
export function useCreateQuotation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateQuotationInput) => quotationApi.create(input),
    onSuccess: (quotation) => {
      // Seed the detail cache so navigating to the new record is instant.
      queryClient.setQueryData(quotationKeys.detail(quotation.id), quotation);
      void queryClient.invalidateQueries({ queryKey: quotationKeys.lists() });
      toast.success(`Quotation ${quotation.reference} created`);
    },
  });
}

export function useApproveQuotation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => quotationApi.approve(id),
    onSuccess: (quotation) => {
      queryClient.setQueryData(quotationKeys.detail(quotation.id), quotation);
      void queryClient.invalidateQueries({ queryKey: quotationKeys.lists() });
      // An approved quotation can become an order, so order lists may change too.
      void queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      toast.success(`Quotation ${quotation.reference} approved`);
    },
  });
}

export function useRejectQuotation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: RejectQuotationInput }) =>
      quotationApi.reject(id, input),
    onSuccess: (quotation) => {
      queryClient.setQueryData(quotationKeys.detail(quotation.id), quotation);
      void queryClient.invalidateQueries({ queryKey: quotationKeys.lists() });
      toast.success(`Quotation ${quotation.reference} rejected`);
    },
  });
}
