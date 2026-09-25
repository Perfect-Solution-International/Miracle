import { z } from "zod";

import {
  emailSchema,
  optionalString,
  phoneSchema,
  requiredString,
} from "@/lib/validation/common.schema";

/**
 * Visa Assistance Request form. There is no backend intake endpoint for this
 * yet (same situation as `ContactForm` and `RequirementInquiryForm`), so
 * submission confirms receipt locally; wire this to a real mutation once the
 * intake API exists.
 */
export const visaRequestSchema = z.object({
  fullName: requiredString("Full name", 120),
  email: emailSchema,
  phone: phoneSchema,
  countryOfResidence: optionalString(120),
  destinationCountry: requiredString("Destination country", 120),
  visaType: requiredString("Visa type", 60),
  travelDate: z.string().trim().optional(),
  travelers: z.coerce.number().int("Must be a whole number").min(1, "At least 1 traveller"),
  purpose: optionalString(500),
  additionalRequirements: z.string().trim().max(2000).optional(),
});

export type VisaRequestFormInput = z.input<typeof visaRequestSchema>;
export type VisaRequestInput = z.output<typeof visaRequestSchema>;
