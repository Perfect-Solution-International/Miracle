"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { orderApi } from "../api/order.api";
import { orderKeys } from "../api/order.keys";
import type { OrderFilters } from "../types/order.types";

export function useOrders(filters: OrderFilters) {
  return useQuery({
    queryKey: orderKeys.list(filters),
    queryFn: ({ signal }) => orderApi.list(filters, signal),
    placeholderData: keepPreviousData,
  });
}
