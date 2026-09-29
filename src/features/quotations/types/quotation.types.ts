import type { QuotationStatus } from "@/lib/constants/statuses/quotation-status";
import type { CurrencyCode, IsoDateTime } from "@/types/common.types";
import type { ListQuery } from "@/types/pagination.types";

export interface QuotationLineItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  /** Minor units, in the quotation's currency. */
  unitPriceMinor: number;
  totalMinor: number;
}

export interface Quotation {
  id: string;
  reference: string;
  status: QuotationStatus;
  customerId: string;
  customerName: string;
  supplierId?: string;
  supplierName?: string;
  requirementId?: string;
  currency: CurrencyCode;
  subtotalMinor: number;
  taxMinor: number;
  shippingMinor: number;
  totalMinor: number;
  lineItems: QuotationLineItem[];
  incoterm?: string;
  leadTimeDays?: number;
  validUntil?: IsoDateTime;
  notes?: string;
  createdAt: IsoDateTime;
  updatedAt: IsoDateTime;
}

/** Trimmed shape returned by list endpoints, without line items. */
export type QuotationSummary = Omit<Quotation, "lineItems" | "notes">;

export interface QuotationFilters extends ListQuery {
  status?: QuotationStatus;
  customerId?: string;
  supplierId?: string;
  currency?: CurrencyCode;
  createdFrom?: string;
  createdTo?: string;
}
