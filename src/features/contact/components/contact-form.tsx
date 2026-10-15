"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Lock, Send } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Eyebrow } from "@/components/common/eyebrow";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { ContactSubmissionError, submitContact } from "../api/contact.api";
import { CONTACT_SUBJECTS } from "../data/contact.content";
import {
  contactMessageSchema,
  type ContactMessageInput,
} from "../schemas/contact-message.schema";

export function ContactForm() {
  const sending = useRef(false);
  const honeypot = useRef<HTMLInputElement>(null);
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(
    null,
  );
  const form = useForm<ContactMessageInput>({
    resolver: zodResolver(contactMessageSchema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" },
  });

  async function onSubmit(values: ContactMessageInput) {
    if (sending.current) return;
    setFeedback(null);
    sending.current = true;
    try {
      await submitContact(values, honeypot.current?.value ?? "");
      const message =
        "Your message has been accepted by our email service. Our team will get back to you shortly.";
      setFeedback({ success: true, message });
      toast.success(`Thanks, ${values.name}!`, { description: message });
      form.reset();
    } catch (error) {
      const message =
        error instanceof ContactSubmissionError
          ? error.message
          : "We cannot send your message right now. Please try again later.";
      if (error instanceof ContactSubmissionError) {
        for (const [key, value] of Object.entries(error.fieldErrors)) {
          form.setError(key as keyof ContactMessageInput, { message: value });
        }
      }
      setFeedback({ success: false, message });
    } finally {
      sending.current = false;
    }
  }

  return (
    <div
      id="contact-form"
      className="shadow-soft scroll-mt-24 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 lg:p-10"
    >
      <Eyebrow>Send Us a Message</Eyebrow>
      <h2 className="text-ink mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
        Tell Us What You Need
      </h2>
      <p className="text-muted-foreground mt-1 text-sm">
        Fill out the form below and our team will get back to you shortly.
      </p>

      <Form {...form}>
        <form
          onSubmit={(event) => {
            void form.handleSubmit(onSubmit)(event);
          }}
          className="mt-6 space-y-5"
          aria-busy={form.formState.isSubmitting}
          noValidate
        >
          <div className="hidden" aria-hidden="true">
            <label htmlFor="contact-website">Leave this field empty</label>
            <input
              ref={honeypot}
              id="contact-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              maxLength={200}
            />
          </div>
          <fieldset disabled={form.formState.isSubmitting} className="min-w-0 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Your Name <span className="text-brand-red">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name"
                        autoComplete="name"
                        required
                        maxLength={100}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email Address <span className="text-brand-red">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        autoComplete="email"
                        required
                        maxLength={254}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Enter your phone number"
                        autoComplete="tel"
                        maxLength={40}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Subject <span className="text-brand-red">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      required
                      disabled={form.formState.isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CONTACT_SUBJECTS.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Your Message <span className="text-brand-red">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      required
                      maxLength={5000}
                      placeholder="Tell us about your requirements..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>

          {!process.env.NEXT_PUBLIC_CONTACT_API_URL && (
            <p role="alert" className="text-destructive text-sm">
              The contact form is temporarily unavailable. Please contact us by email.
            </p>
          )}

          {feedback && (
            <p
              role={feedback.success ? "status" : "alert"}
              className={
                feedback.success ? "text-brand-blue text-sm" : "text-destructive text-sm"
              }
            >
              {feedback.message}
            </p>
          )}

          <Button
            type="submit"
            size="xl"
            className="w-full"
            disabled={
              form.formState.isSubmitting || !process.env.NEXT_PUBLIC_CONTACT_API_URL
            }
          >
            <Send data-icon="inline-start" aria-hidden="true" />
            {form.formState.isSubmitting ? "Sending..." : "Send Message"}
            <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </Button>

          <p className="text-muted-foreground flex items-center justify-center gap-1.5 text-xs">
            <Lock aria-hidden="true" className="size-3.5" />
            Your information is secure and will only be used to respond to your inquiry.
          </p>
        </form>
      </Form>
    </div>
  );
}
