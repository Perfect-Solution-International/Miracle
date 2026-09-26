"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { Section } from "@/components/common/section";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { TRAVEL_CLASS_OPTIONS } from "../data/flight-tickets.content";
import {
  flightRequestSchema,
  type FlightRequestFormInput,
  type FlightRequestInput,
} from "../schemas/flight-request.schema";

/** Red asterisk marking a required field. */
function RequiredMark() {
  return (
    <span aria-hidden="true" className="text-brand-red">
      *
    </span>
  );
}

/**
 * "Submit Flight Request" form. There is no backend intake endpoint for this
 * yet (same situation as `ContactForm` and `VisaRequestForm`), so submission
 * confirms receipt locally; wire this to a real mutation once the intake API
 * exists. This collects the customer's requirements only — it is not a
 * booking engine, and no flight is confirmed by submitting it.
 */
export interface FlightRequestFormProps {
  embedded?: boolean;
}

/**
 * "Submit Flight Request" form. There is no backend intake endpoint for this
 * yet (same situation as `ContactForm` and `VisaRequestForm`), so submission
 * confirms receipt locally; wire this to a real mutation once the intake API
 * exists. This collects the customer's requirements only — it is not a
 * booking engine, and no flight is confirmed by submitting it.
 */
export function FlightRequestForm({ embedded = false }: FlightRequestFormProps = {}) {
  const form = useForm<FlightRequestFormInput, unknown, FlightRequestInput>({
    resolver: zodResolver(flightRequestSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      tripType: "One Way",
      from: "",
      to: "",
      departureDate: "",
      returnDate: "",
      travelers: 1,
      travelClass: "Economy",
      additionalRequirements: "",
    },
  });

  const tripType = useWatch({ control: form.control, name: "tripType" });

  function onSubmit(_values: FlightRequestInput) {
    toast.success("Your flight request has been submitted successfully.", {
      description:
        "Our travel team will review your requirements and contact you with suitable flight options.",
    });
    form.reset();
  }

  const formCard = (
    <div
      id="flight-request-form"
      className="shadow-lift rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-10"
    >
      <div className="text-center sm:text-left">
        <p className="text-brand-blue text-xs font-bold uppercase tracking-widest">
          Request Flight Options
        </p>
        <h2
          id="flight-request-heading"
          className="text-ink mt-1.5 text-2xl font-extrabold tracking-tight sm:text-3xl"
        >
          Tell Us Your Flight Plan
        </h2>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          Share your travel requirements and our team will get back to you with suitable
          flight options.
        </p>
      </div>

      <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-8 space-y-8"
              noValidate
            >
              <div className="space-y-5">
                <p className="text-ink text-xs font-bold tracking-[0.14em] uppercase">
                  Customer Details
                </p>

                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Full Name <RequiredMark />
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
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
                          Email <RequiredMark />
                        </FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Phone Number <RequiredMark />
                      </FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="Your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-5 border-t pt-8">
                <p className="text-ink text-xs font-bold tracking-[0.14em] uppercase">
                  Flight Details
                </p>

                <FormField
                  control={form.control}
                  name="tripType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Trip Type <RequiredMark />
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="grid-flow-col justify-start gap-6"
                        >
                          <label className="text-ink flex items-center gap-2 text-sm font-medium">
                            <RadioGroupItem value="One Way" />
                            One Way
                          </label>
                          <label className="text-ink flex items-center gap-2 text-sm font-medium">
                            <RadioGroupItem value="Round Trip" />
                            Round Trip
                          </label>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="from"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          From <RequiredMark />
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Departure city or airport" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="to"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          To <RequiredMark />
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Destination city or airport" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="departureDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Departure Date <RequiredMark />
                        </FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="returnDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Return Date {tripType === "Round Trip" ? <RequiredMark /> : "(Optional)"}
                        </FormLabel>
                        <FormControl>
                          <Input type="date" disabled={tripType === "One Way"} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="travelers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Number of Travelers <RequiredMark />
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          inputMode="numeric"
                          name={field.name}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          onChange={field.onChange}
                          value={field.value == null ? "" : String(field.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-5 border-t pt-8">
                <p className="text-ink text-xs font-bold tracking-[0.14em] uppercase">
                  Travel Preference
                </p>

                <FormField
                  control={form.control}
                  name="travelClass"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Travel Class <RequiredMark />
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a travel class" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {TRAVEL_CLASS_OPTIONS.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-5 border-t pt-8">
                <p className="text-ink text-xs font-bold tracking-[0.14em] uppercase">
                  Additional Requirements
                </p>

                <FormField
                  control={form.control}
                  name="additionalRequirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Requirements</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="Tell us about any special requests, preferred airlines, baggage requirements or other travel preferences."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-3">
                <Button
                  type="submit"
                  variant="accent"
                  size="xl"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  Submit Flight Request
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </Button>
                <p className="text-muted-foreground text-center text-xs">
                  Your information will be used only to assist with your flight request.
                </p>
              </div>
            </form>
          </Form>
    </div>
  );

  if (embedded) {
    return formCard;
  }

  return (
    <Section
      id="flight-request-form"
      tone="surface"
      aria-labelledby="flight-request-heading"
      className="scroll-mt-24"
    >
      <div className="mx-auto max-w-2xl">{formCard}</div>
    </Section>
  );
}
