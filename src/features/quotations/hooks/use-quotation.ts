"use client";

import { useQuery } from "@tanstack/react-query";

import { quotationApi } from "../api/quotation.api";
import { quotationKeys } from "../api/quotation.keys";

export function useQuotation(id: string | undefined) {
  return useQuery({
    queryKey: quotationKeys.detail(id ?? ""),
    queryFn: ({ signal }) => quotationApi.detail(id as string, signal),
    // Skip the request entirely until an id is available.
    enabled: Boolean(id),
  });
}
