import { z } from "zod";

/**
 * Public "Tell Us What You Need" lead form. Distinct from
 * `createRequirementSchema` (the structured sourcing requirement captured
 * inside the authenticated customer portal) — this one is a general intake
 * form open to anyone, with no backend endpoint yet. See `RequirementInquiryForm`.
 */
export const requirementInquirySchema = z
  .object({
    context: z.enum(["general", "business", "it"]),
    fullName: z.string().trim().min(2, "Enter your full name."),
    companyName: z.string().trim().optional(),
    email: z.string().trim().email("Enter a valid email address."),
    phone: z.string().trim().min(6, "Enter a valid phone number."),
    whatsapp: z.string().trim().optional(),
    location: z.string().trim().optional(),
    requirementType: z.string().min(1, "Select a service area."),
    subject: z.string().trim().max(160).optional(),
    details: z
      .string()
      .trim()
      .min(20, "Tell us a little more about what you need (at least 20 characters)."),
    timeline: z.string().optional(),
    budgetRange: z.string().optional(),
    agreeToTerms: z.boolean().refine((value) => value === true, {
      message: "You must agree before submitting your request.",
    }),
  })
  .superRefine((values, refinement) => {
    if (values.context !== "general") return;
    if (!values.subject || values.subject.length < 3)
      refinement.addIssue({
        code: "custom",
        path: ["subject"],
        message: "Add a short subject.",
      });
    if (!values.timeline)
      refinement.addIssue({
        code: "custom",
        path: ["timeline"],
        message: "Select your preferred timeline.",
      });
  });

export type RequirementInquiryInput = z.infer<typeof requirementInquirySchema>;
