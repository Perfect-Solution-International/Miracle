import { z } from "zod";

export const contactMessageSchema = z.object({
  name: z.string().trim().min(2, "Enter your name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().optional(),
  subject: z.string().min(1, "Select a subject."),
  message: z.string().trim().min(10, "Tell us a little more about your requirement."),
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;
