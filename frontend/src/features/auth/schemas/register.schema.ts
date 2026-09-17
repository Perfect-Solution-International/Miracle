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
    acceptTerms: z.literal(true, {
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
