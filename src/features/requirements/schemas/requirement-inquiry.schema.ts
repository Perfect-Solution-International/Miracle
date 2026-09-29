import { z } from "zod";

/**
 * Public "Tell Us What You Need" lead form. Distinct from
 * `createRequirementSchema` (the structured sourcing requirement captured
 * inside the authenticated customer portal) — this one is a general intake
 * form open to anyone, with no backend endpoint yet. See `RequirementInquiryForm`.
 */
export const requirementInquirySchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name."),
  companyName: z.string().trim().optional(),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().min(6, "Enter a valid phone number."),
  requirementType: z.string().min(1, "Select a category."),
  subject: z.string().trim().min(3, "Add a short subject.").max(160),
  details: z
    .string()
    .trim()
    .min(20, "Tell us a little more about what you need (at least 20 characters)."),
  timeline: z.string().min(1, "Select your preferred timeline."),
  budgetRange: z.string().optional(),
  agreeToTerms: z.boolean().refine((value) => value === true, {
    message: "You must agree before submitting your request.",
  }),
});

export type RequirementInquiryInput = z.infer<typeof requirementInquirySchema>;
