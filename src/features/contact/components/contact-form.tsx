"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Lock, Send } from "lucide-react";
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

import { CONTACT_SUBJECTS } from "../data/contact.content";
import {
  contactMessageSchema,
  type ContactMessageInput,
} from "../schemas/contact-message.schema";

/**
 * General contact form. There is no backend endpoint for this lead yet, so
 * submission simply confirms receipt; wire this to a real mutation once the
 * intake API exists.
 */
export function ContactForm() {
  const form = useForm<ContactMessageInput>({
    resolver: zodResolver(contactMessageSchema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" },
  });

  function onSubmit(values: ContactMessageInput) {
    toast.success(`Thanks, ${values.name}!`, {
      description: "Our team will get back to you shortly.",
    });
    form.reset();
  }

  return (
    <div id="contact-form" className="shadow-lift rounded-3xl border bg-white p-6 sm:p-8">
      <Eyebrow>Send Us a Message</Eyebrow>
      <h2 className="text-ink mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
        Tell Us What You Need
      </h2>
      <p className="text-muted-foreground mt-1 text-sm">
        Fill out the form below and our team will get back to you shortly.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-6 space-y-5"
          noValidate
        >
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
                    <Input placeholder="Enter your name" {...field} />
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
                    <Input type="email" placeholder="Enter your email" {...field} />
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
                    <Input type="tel" placeholder="Enter your phone number" {...field} />
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
                  <Select onValueChange={field.onChange} value={field.value}>
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
                    placeholder="Tell us about your requirements..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size="xl"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            <Send data-icon="inline-start" aria-hidden="true" />
            Send Message
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
