import { z } from "zod";

import {
  currencyCodeSchema,
  isoDateSchema,
  positiveAmountSchema,
  positiveIntSchema,
  requiredString,
  uuidSchema,
} from "@/lib/validation/common.schema";

/**
 * Amounts are captured in major units here because that is what people type,
 * and converted to minor units at the API boundary.
 */
const lineItemSchema = z.object({
  description: requiredString("Description", 500),
  quantity: positiveIntSchema,
  unit: requiredString("Unit", 20),
  unitPrice: positiveAmountSchema,
});

export const createQuotationSchema = z.object({
  customerId: uuidSchema,
  requirementId: uuidSchema.optional(),
  supplierId: uuidSchema.optional(),
  currency: currencyCodeSchema,
  incoterm: z.string().trim().max(20).optional(),
  leadTimeDays: z.coerce.number().int().nonnegative().max(365).optional(),
  validUntil: isoDateSchema.optional(),
  notes: z.string().trim().max(2000).optional(),
  lineItems: z
    .array(lineItemSchema)
    .min(1, "Add at least one line item")
    .max(200, "A quotation cannot exceed 200 line items"),
  taxAmount: positiveAmountSchema.default(0),
  shippingAmount: positiveAmountSchema.default(0),
});

export const rejectQuotationSchema = z.object({
  reason: requiredString("Reason", 1000),
});

export type CreateQuotationInput = z.infer<typeof createQuotationSchema>;
export type RejectQuotationInput = z.infer<typeof rejectQuotationSchema>;
export type QuotationLineItemInput = z.infer<typeof lineItemSchema>;
