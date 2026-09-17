import { z } from "zod";

import { emailSchema } from "@/lib/validation/common.schema";

/**
 * Login is deliberately lenient on the password field: enforcing complexity here
 * would reject valid legacy passwords and hint at the password policy. Strength
 * rules belong on registration and reset.
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().default(false),
});

/** `rememberMe` has a default, so the typed input and parsed output differ. */
export type LoginFormInput = z.input<typeof loginSchema>;
export type LoginInput = z.output<typeof loginSchema>;
