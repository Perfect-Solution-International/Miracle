import type { OrderStatus } from "@/lib/constants/statuses/order-status";
import type { PaymentStatus } from "@/lib/constants/statuses/payment-status";
import type { CurrencyCode, IsoDateTime } from "@/types/common.types";
import type { ListQuery } from "@/types/pagination.types";

export interface OrderLineItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPriceMinor: number;
  totalMinor: number;
}

export interface OrderTrackingEvent {
  id: string;
  status: OrderStatus;
  location?: string;
  note?: string;
  occurredAt: IsoDateTime;
}

export interface Order {
  id: string;
  reference: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  customerId: string;
  customerName: string;
  supplierId?: string;
  supplierName?: string;
  quotationId?: string;
  currency: CurrencyCode;
  totalMinor: number;
  lineItems: OrderLineItem[];
  incoterm?: string;
  originCountry?: string;
  destinationCountry?: string;
  expectedDelivery?: IsoDateTime;
  trackingEvents: OrderTrackingEvent[];
  createdAt: IsoDateTime;
  updatedAt: IsoDateTime;
}

export type OrderSummary = Omit<Order, "lineItems" | "trackingEvents">;

export interface OrderFilters extends ListQuery {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  customerId?: string;
  supplierId?: string;
}
