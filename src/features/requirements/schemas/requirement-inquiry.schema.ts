import { z } from "zod";

import {
  emailSchema,
  optionalString,
  phoneSchema,
  requiredString,
} from "@/lib/validation/common.schema";

/**
 * Public "Tell Us What You Need" lead form schema.
 */
export const requirementInquirySchema = z.object({
  context: optionalString(60),
  fullName: requiredString("Full name", 120),
  email: emailSchema,
  phone: phoneSchema,
  whatsappNumber: optionalString(60),
  requirementType: requiredString("Type of requirement", 120),
  whatDoYouNeed: requiredString("What do you need", 4000),
  country: optionalString(120),
  timeline: optionalString(120),
  budgetRange: optionalString(120),
  additionalRequirements: optionalString(4000),
  agreeToTerms: z.boolean().refine((value) => value === true, {
    message: "You must confirm before submitting your requirement.",
  }),
});

export type RequirementInquiryFormInput = z.input<typeof requirementInquirySchema>;
export type RequirementInquiryInput = z.output<typeof requirementInquirySchema>;
