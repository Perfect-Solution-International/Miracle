import { StatusBadge } from "@/components/data-display/status-badge";
import { orderStatus, type OrderStatus } from "@/lib/constants/statuses/order-status";

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <StatusBadge
      label={orderStatus.label(status)}
      variant={orderStatus.variant(status)}
    />
  );
}
