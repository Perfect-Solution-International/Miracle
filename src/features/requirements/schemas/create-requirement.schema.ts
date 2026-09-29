import { z } from "zod";

import {
  currencyCodeSchema,
  isoDateSchema,
  positiveAmountSchema,
  positiveIntSchema,
  requiredString,
} from "@/lib/validation/common.schema";

/**
 * Schema for the public "tell us what you need" form and the customer portal's
 * requirement creation. Kept independent of any component so it can be reused by
 * both, and by tests, without importing UI.
 */
export const createRequirementSchema = z.object({
  title: requiredString("Title", 160),
  description: requiredString("Description", 5000),
  category: requiredString("Category", 80),
  quantity: positiveIntSchema,
  unit: requiredString("Unit", 20),
  targetCurrency: currencyCodeSchema,
  targetUnitPrice: positiveAmountSchema.optional(),
  destinationCountry: requiredString("Destination country", 80),
  requiredBy: isoDateSchema.optional(),
  attachmentIds: z.array(z.string()).max(10, "At most 10 attachments").default([]),
});

/**
 * Two types, because `.default()` makes the parsed output differ from the form
 * input: `attachmentIds` is optional while typing and guaranteed after parsing.
 * Forms are typed with `Input`, submit handlers receive `Output`.
 */
export type CreateRequirementFormInput = z.input<typeof createRequirementSchema>;
export type CreateRequirementInput = z.output<typeof createRequirementSchema>;
