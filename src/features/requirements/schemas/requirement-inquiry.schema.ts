import { z } from "zod";

import {
  emailSchema,
  optionalString,
  phoneSchema,
  requiredString,
} from "@/lib/validation/common.schema";

const isSingleLine = (value: string | undefined) =>
  !value || !/[\p{Cc}\u2028\u2029]/u.test(value);
const isMessage = (value: string | undefined) =>
  !value || !/\p{Cc}/u.test(value.replace(/[\t\r\n]/g, ""));
const optionalLine = (max: number) =>
  optionalString(max).refine(isSingleLine, "Enter this value on one line.");

/**
 * Public "Tell Us What You Need" lead form schema.
 */
export const requirementInquirySchema = z.object({
  context: optionalLine(60),
  fullName: requiredString("Full name", 120).refine(
    isSingleLine,
    "Enter your name on one line.",
  ),
  email: emailSchema,
  phone: phoneSchema,
  whatsappNumber: optionalLine(60),
  requirementType: requiredString("Type of requirement", 120).refine(
    isSingleLine,
    "Select a valid requirement type.",
  ),
  whatDoYouNeed: requiredString("What do you need", 4000).refine(
    isMessage,
    "Remove unsupported characters from your requirement.",
  ),
  country: optionalLine(120),
  timeline: optionalLine(120),
  budgetRange: optionalLine(120),
  additionalRequirements: optionalString(4000).refine(
    isMessage,
    "Remove unsupported characters from your notes.",
  ),
  agreeToTerms: z.boolean().refine((value) => value === true, {
    message: "You must confirm before submitting your requirement.",
  }),
});

export type RequirementInquiryFormInput = z.input<typeof requirementInquirySchema>;
export type RequirementInquiryInput = z.output<typeof requirementInquirySchema>;
