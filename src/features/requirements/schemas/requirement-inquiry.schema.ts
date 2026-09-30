import { z } from "zod";

/**
 * Public "Tell Us What You Need" lead form. Distinct from
 * `createRequirementSchema` (the structured sourcing requirement captured
 * inside the authenticated customer portal) — this one is a general intake
 * form open to anyone, with no backend endpoint yet. See `RequirementInquiryForm`.
 */
export const requirementInquirySchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().min(6, "Please enter a valid contact number."),
  whatsappNumber: z.string().trim().optional(),
  requirementType: z.string().min(1, "Please select a requirement type."),
  whatDoYouNeed: z.string().trim().min(3, "Please tell us what you need."),
  country: z.string().trim().optional(),
  timeline: z.string().trim().optional(),
  budgetRange: z.string().trim().optional(),
  additionalRequirements: z.string().trim().optional(),
  agreeToTerms: z.boolean().refine((value) => value === true, {
    message: "You must confirm before submitting your requirement.",
  }),
});


export type RequirementInquiryInput = z.infer<typeof requirementInquirySchema>;
