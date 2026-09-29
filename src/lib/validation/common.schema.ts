import { z } from "zod";

/**
 * Primitives reused across feature schemas, so validation rules such as password
 * strength are defined once and stay consistent platform-wide.
 */
export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Enter a valid email address")
  .max(254)
  .transform((value) => value.trim().toLowerCase());

export const passwordSchema = z
  .string()
  .min(10, "Password must be at least 10 characters")
  .max(128, "Password must be at most 128 characters")
  .regex(/[a-z]/, "Include at least one lowercase letter")
  .regex(/[A-Z]/, "Include at least one uppercase letter")
  .regex(/[0-9]/, "Include at least one number");

/** Permissive on purpose: this is a global B2B platform, not a single country. */
export const phoneSchema = z
  .string()
  .min(7, "Enter a valid phone number")
  .max(20)
  .regex(/^[+]?[\d\s()-]+$/, "Enter a valid phone number");

export const requiredString = (label: string, max = 255) =>
  z.string().trim().min(1, `${label} is required`).max(max);

export const optionalString = (max = 255) =>
  z.string().trim().max(max).optional().or(z.literal(""));

export const uuidSchema = z.string().uuid("Invalid identifier");

export const currencyCodeSchema = z
  .string()
  .length(3, "Use a 3-letter currency code")
  .toUpperCase();

export const positiveIntSchema = z.coerce
  .number()
  .int("Must be a whole number")
  .positive("Must be greater than zero");

export const positiveAmountSchema = z.coerce
  .number()
  .nonnegative("Amount cannot be negative")
  .finite();

/** ISO date string, validated as a real calendar date. */
export const isoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Use the format YYYY-MM-DD")
  .refine((value) => !Number.isNaN(Date.parse(value)), "Enter a valid date");

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
  search: z.string().trim().optional(),
  sortBy: z.string().trim().optional(),
  sortDir: z.enum(["asc", "desc"]).optional(),
});
