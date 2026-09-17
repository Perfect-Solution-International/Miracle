"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { OrderStatus } from "@/lib/constants/statuses/order-status";
import { orderApi } from "../api/order.api";
import { orderKeys } from "../api/order.keys";

export function useOrder(id: string | undefined) {
  return useQuery({
    queryKey: orderKeys.detail(id ?? ""),
    queryFn: ({ signal }) => orderApi.detail(id as string, signal),
    enabled: Boolean(id),
  });
}

/** Status changes invalidate the detail, its tracking timeline, and the lists. */
export function useUpdateOrderStatus(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ status, note }: { status: OrderStatus; note?: string }) =>
      orderApi.updateStatus(id, status, note),
    onSuccess: (order) => {
      queryClient.setQueryData(orderKeys.detail(order.id), order);
      void queryClient.invalidateQueries({ queryKey: orderKeys.tracking(order.id) });
      void queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      toast.success(`Order ${order.reference} updated`);
    },
  });
}
