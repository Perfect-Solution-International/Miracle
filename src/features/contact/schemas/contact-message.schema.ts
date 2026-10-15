import { z } from "zod";

const singleLine = (message: string) =>
  z
    .string()
    .trim()
    .regex(/^[^\p{Cc}\u2028\u2029]*$/u, message);

export const contactMessageSchema = z.object({
  name: singleLine("Enter your name on one line.")
    .min(2, "Enter your name.")
    .max(100, "Use at most 100 characters."),
  email: singleLine("Enter a valid email address.")
    .email("Enter a valid email address.")
    .max(254, "Use at most 254 characters."),
  phone: singleLine("Enter a valid phone number.")
    .max(40, "Use at most 40 characters.")
    .optional(),
  subject: singleLine("Enter a subject on one line.")
    .min(1, "Select a subject.")
    .max(120, "Use at most 120 characters."),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more about your requirement.")
    .max(5000, "Use at most 5,000 characters.")
    .refine(
      (value) => !/\p{Cc}/u.test(value.replace(/[\t\n\r]/g, "")),
      "Remove unsupported characters from your message.",
    ),
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;
