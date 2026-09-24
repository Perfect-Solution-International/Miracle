"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { cn } from "@/lib/utils";

import {
  ACCOMMODATION_OPTIONS,
  INTEREST_OPTIONS,
  TRANSPORTATION_OPTIONS,
  TRIP_BUDGET_OPTIONS,
} from "../data/trip-planner.content";
import {
  tripPlannerSchema,
  type TripPlannerFormInput,
  type TripPlannerInput,
} from "../schemas/trip-planner.schema";

/**
 * "Plan Your Trip" customization form, opened from the hero's primary CTA.
 * There is no backend intake endpoint for this yet (same situation as
 * `ContactForm` and `RequirementInquiryForm`), so submission confirms
 * receipt locally; wire this to a real mutation once the intake API exists.
 */
export function TripPlannerDialog({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const form = useForm<TripPlannerFormInput, unknown, TripPlannerInput>({
    resolver: zodResolver(tripPlannerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      destination: "",
      startDate: "",
      endDate: "",
      travelers: 1,
      budgetRange: "",
      accommodation: "",
      transportation: "",
      interests: [],
      specialRequirements: "",
    },
  });

  function onSubmit(values: TripPlannerInput) {
    toast.success(`Thanks, ${values.fullName}!`, {
      description: "Our travel desk will get back to you with a personalized itinerary.",
    });
    form.reset();
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) form.reset();
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Plan Your Trip</DialogTitle>
          <DialogDescription>
            Tell us what you have in mind and our travel desk will put together a
            personalized itinerary.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
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
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="Your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="travelers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Travelers</FormLabel>
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

            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Sigiriya, Sri Lanka" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="budgetRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget (Optional)</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TRIP_BUDGET_OPTIONS.map((option) => (
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
              <FormField
                control={form.control}
                name="accommodation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Accommodation Preference</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a preference" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ACCOMMODATION_OPTIONS.map((option) => (
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

            <FormField
              control={form.control}
              name="transportation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transportation</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a transportation option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSPORTATION_OPTIONS.map((option) => (
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

            <FormField
              control={form.control}
              name="interests"
              render={({ field }) => {
                const selectedInterests: string[] = field.value ?? [];
                return (
                  <FormItem>
                    <FormLabel>Activities & Interests (Optional)</FormLabel>
                    <div className="flex flex-wrap gap-2">
                      {INTEREST_OPTIONS.map((interest) => {
                        const selected = selectedInterests.includes(interest);
                        return (
                          <button
                            key={interest}
                            type="button"
                            aria-pressed={selected}
                            onClick={() =>
                              field.onChange(
                                selected
                                  ? selectedInterests.filter((item) => item !== interest)
                                  : [...selectedInterests, interest],
                              )
                            }
                            className={cn(
                              "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                              selected
                                ? "bg-brand-blue border-brand-blue text-white"
                                : "border-input text-ink hover:border-brand-blue",
                            )}
                          >
                            {interest}
                          </button>
                        );
                      })}
                    </div>
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="specialRequirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Requirements (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder="Dietary needs, accessibility, celebrations, or anything else we should know..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant="accent"
              size="xl"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" aria-hidden="true" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Trip Request
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
