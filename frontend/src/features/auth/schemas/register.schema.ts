import { z } from "zod";

import {
  emailSchema,
  passwordSchema,
  phoneSchema,
  requiredString,
} from "@/lib/validation/common.schema";

/** Account types a visitor may self-register as. Staff roles are assigned internally. */
export const REGISTRABLE_ACCOUNT_TYPES = [
  "customer",
  "business_owner",
  "entrepreneur",
  "investor",
  "supplier",
] as const;

export const registerSchema = z
  .object({
    firstName: requiredString("First name", 80),
    lastName: requiredString("Last name", 80),
    email: emailSchema,
    phone: phoneSchema,
    companyName: z.string().trim().max(160).optional(),
    accountType: z.enum(REGISTRABLE_ACCOUNT_TYPES),
    country: requiredString("Country", 80),
    password: passwordSchema,
    confirmPassword: z.string(),
    // `z.boolean().refine(...)` rather than `z.literal(true)`: a checkbox's
    // form state must be able to start `false`, and a plain boolean keeps
    // that legal at the type level while still rejecting `false` on submit.
    acceptTerms: z.boolean().refine((value) => value === true, {
      message: "You must accept the terms to continue",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine(
    (data) =>
      // Suppliers and business owners trade as a company, so the name is required.
      !["supplier", "business_owner"].includes(data.accountType) ||
      (data.companyName?.length ?? 0) > 0,
    { message: "Company name is required for this account type", path: ["companyName"] },
  );

export type RegisterInput = z.infer<typeof registerSchema>;
