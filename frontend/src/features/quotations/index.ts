/** Public surface of the quotations feature. */
export { QuotationTable } from "./components/quotation-table";
export { QuotationCard } from "./components/quotation-card";
export { QuotationStatusBadge } from "./components/quotation-status";
export { useQuotations } from "./hooks/use-quotations";
export { useQuotation } from "./hooks/use-quotation";
export {
  useCreateQuotation,
  useApproveQuotation,
  useRejectQuotation,
} from "./hooks/use-quotation-mutations";
export { quotationApi } from "./api/quotation.api";
export { quotationKeys } from "./api/quotation.keys";
export {
  createQuotationSchema,
  rejectQuotationSchema,
  type CreateQuotationInput,
  type RejectQuotationInput,
} from "./schemas/quotation.schema";
export { canApprove, canReject, canEdit, calculateTotals } from "./utils/quotation.utils";
export type {
  Quotation,
  QuotationSummary,
  QuotationFilters,
  QuotationLineItem,
} from "./types/quotation.types";
