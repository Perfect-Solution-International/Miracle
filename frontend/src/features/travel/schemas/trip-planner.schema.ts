import { z } from "zod";

import {
  emailSchema,
  isoDateSchema,
  phoneSchema,
  requiredString,
} from "@/lib/validation/common.schema";

/**
 * "Plan Your Trip" customization form, opened from the Travel & Tourism hero.
 * No backend endpoint exists for this yet (same situation as `ContactForm`
 * and `RequirementInquiryForm`), so submission confirms receipt locally.
 */
export const tripPlannerSchema = z
  .object({
    fullName: requiredString("Full name", 120),
    email: emailSchema,
    phone: phoneSchema,
    destination: requiredString("Destination", 120),
    startDate: isoDateSchema,
    endDate: isoDateSchema,
    travelers: z.coerce
      .number()
      .int("Must be a whole number")
      .min(1, "At least 1 traveller"),
    budgetRange: z.string().optional(),
    accommodation: z.string().min(1, "Select an accommodation preference"),
    transportation: z.string().min(1, "Select a transportation option"),
    travelType: z.string().optional(),
    interests: z.array(z.string()).default([]),
    specialRequirements: z.string().trim().max(2000).optional(),
  })
  .refine((values) => values.endDate >= values.startDate, {
    message: "End date must be on or after the start date",
    path: ["endDate"],
  });

/**
 * Two types, because `.default()` (interests) and `.coerce` (travelers) make
 * the parsed output differ from the form input: the form is typed with
 * `Input`, the submit handler receives `Output`.
 */
export type TripPlannerFormInput = z.input<typeof tripPlannerSchema>;
export type TripPlannerInput = z.output<typeof tripPlannerSchema>;
