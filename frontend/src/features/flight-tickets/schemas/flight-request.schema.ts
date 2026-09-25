import { z } from "zod";

import { emailSchema, phoneSchema, requiredString } from "@/lib/validation/common.schema";

/**
 * Flight Request form. This collects the customer's travel requirements for
 * the Miracle International team to review — it is not a booking engine, so
 * there is no backend intake endpoint yet (same situation as `ContactForm`
 * and `VisaRequestForm`); wire this to a real mutation once the intake API
 * exists.
 */
export const flightRequestSchema = z
  .object({
    fullName: requiredString("Full name", 120),
    email: emailSchema,
    phone: phoneSchema,
    tripType: z.enum(["One Way", "Round Trip"]),
    from: requiredString("Departure location", 120),
    to: requiredString("Destination", 120),
    departureDate: requiredString("Departure date", 10),
    returnDate: z.string().trim().optional(),
    travelers: z.coerce.number().int("Must be a whole number").min(1, "At least 1 traveller"),
    travelClass: z.enum(["Economy", "Business", "First Class"]),
    additionalRequirements: z.string().trim().max(2000).optional(),
  })
  .superRefine((values, ctx) => {
    if (values.tripType === "Round Trip" && !values.returnDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Return date is required for round-trip travel",
        path: ["returnDate"],
      });
    }
  });

export type FlightRequestFormInput = z.input<typeof flightRequestSchema>;
export type FlightRequestInput = z.output<typeof flightRequestSchema>;
