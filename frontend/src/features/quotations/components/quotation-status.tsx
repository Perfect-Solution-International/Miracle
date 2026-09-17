import { StatusBadge } from "@/components/data-display/status-badge";
import {
  quotationStatus,
  type QuotationStatus,
} from "@/lib/constants/statuses/quotation-status";

/**
 * Thin wrapper that resolves a quotation status to its label and variant, so no
 * caller repeats the mapping or hardcodes a status string.
 */
export function QuotationStatusBadge({
  status,
  className,
}: {
  status: QuotationStatus;
  className?: string;
}) {
  return (
    <StatusBadge
      label={quotationStatus.label(status)}
      variant={quotationStatus.variant(status)}
      className={className}
    />
  );
}
