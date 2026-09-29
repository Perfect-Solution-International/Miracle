"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
import { cn } from "@/lib/utils";

import {
  ACCOMMODATION_OPTIONS,
  INTEREST_OPTIONS,
  QUICK_PLANNER_TRAVEL_TYPES,
  TRANSPORTATION_OPTIONS,
  TRIP_BUDGET_OPTIONS,
} from "../data/trip-planner.content";
import {
  tripPlannerSchema,
  type TripPlannerFormInput,
  type TripPlannerInput,
} from "../schemas/trip-planner.schema";
import type { TravelPackageDetail } from "../types/travel-package-detail.types";

function mapPackageTypeToOption(travelType?: string): string {
  if (!travelType) return "";
  const match = QUICK_PLANNER_TRAVEL_TYPES.find(
    (t) => t.toLowerCase() === travelType.toLowerCase(),
  );
  return match ?? "Leisure";
}

function mapAccommodationPreference(title?: string): string {
  if (!title) return "";
  const lower = title.toLowerCase();
  if (lower.includes("5") || lower.includes("luxury")) return "Luxury (5-star)";
  if (lower.includes("3") || lower.includes("standard")) return "Standard (3-star)";
  return "Comfort (4-star)";
}

function mapInterestsFromPackage(pkg?: TravelPackageDetail | null): string[] {
  if (!pkg) return [];
  const type = pkg.travelType?.toLowerCase() || "";
  if (type === "adventure") return ["Adventure & Outdoor", "Sightseeing", "Wildlife & Nature"];
  if (type === "cultural") return ["Cultural & Heritage", "Sightseeing"];
  if (type === "honeymoon") return ["Beach & Relaxation", "Sightseeing"];
  if (type === "family") return ["Sightseeing", "Beach & Relaxation", "Cultural & Heritage"];
  return ["Sightseeing", "Beach & Relaxation"];
}

import type { TravelPackage } from "@/components/admin-travel/types";

export interface TripPlannerFormProps {
  className?: string;
  defaultDestination?: string;
  packageDetail?: TravelPackage | TravelPackageDetail | null;
  mode?: "book" | "customize";
  onSuccess?: () => void;
}

/**
 * "Make Your Trip, Your Way" customization & booking form.
 * Pre-fills package details accurately when opened from "Book This Package" or "Customize This Package".
 */
export function TripPlannerForm({
  className,
  defaultDestination,
  packageDetail,
  mode = "customize",
  onSuccess,
}: TripPlannerFormProps) {
  const isBooking = mode === "book";

  const getComputedDefaults = (): TripPlannerFormInput => {
    if (packageDetail) {
      const isLegacyDetail = "destinations" in packageDetail;
      const title = isLegacyDetail ? packageDetail.title : packageDetail.name;
      const destinationText = isLegacyDetail
        ? packageDetail.destinations?.length > 0
          ? packageDetail.destinations.join(", ")
          : packageDetail.location
        : packageDetail.destination + (packageDetail.country ? `, ${packageDetail.country}` : "");

      const durationStr = isLegacyDetail
        ? `${packageDetail.duration.days} Days / ${packageDetail.duration.nights} Nights`
        : packageDetail.duration;

      const priceStr = isLegacyDetail
        ? packageDetail.startingPrice
        : packageDetail.price
        ? `${packageDetail.currency ?? "USD"} ${packageDetail.price.toLocaleString()}`
        : "Price on Request";

      const specialReq = isBooking
        ? `Package Booking Inquiry: ${title} (${durationStr}, ${destinationText}). Quote: ${priceStr}.`
        : `Customization based on: ${title} (${durationStr}, ${destinationText}).`;

      const locationStr = isLegacyDetail ? packageDetail.location : (packageDetail.country || packageDetail.destination);
      const isSriLanka = locationStr.toLowerCase().includes("sri lanka");

      const travelTypeStr = isLegacyDetail ? packageDetail.travelType : (packageDetail.travelType === "Inbound" ? "Cultural" : "Leisure");
      const accomStr = isLegacyDetail
        ? mapAccommodationPreference(packageDetail.accommodation?.title)
        : packageDetail.accommodation || "Comfort (4-star)";

      return {
        fullName: "",
        email: "",
        phone: "",
        startingLocation: isBooking ? (isSriLanka ? "International" : "Colombo, Sri Lanka") : "",
        destination: destinationText,
        startDate: "",
        endDate: "",
        travelers: 2,
        budgetRange: "$1,500 – $3,000",
        accommodation: accomStr,
        transportation: !isLegacyDetail && packageDetail.transportation ? packageDetail.transportation : "Private chauffeur",
        travelType: mapPackageTypeToOption(travelTypeStr),
        interests: isLegacyDetail ? mapInterestsFromPackage(packageDetail) : ["Sightseeing", "Cultural & Heritage"],
        specialRequirements: specialReq,
      };
    }

    return {
      fullName: "",
      email: "",
      phone: "",
      startingLocation: "",
      destination: defaultDestination ?? "",
      startDate: "",
      endDate: "",
      travelers: 1,
      budgetRange: "",
      accommodation: "",
      transportation: "",
      travelType: "",
      interests: [],
      specialRequirements: "",
    };
  };

  const form = useForm<TripPlannerFormInput, unknown, TripPlannerInput>({
    resolver: zodResolver(tripPlannerSchema),
    defaultValues: getComputedDefaults(),
  });

  useEffect(() => {
    form.reset(getComputedDefaults());
  }, [packageDetail, mode, defaultDestination]);

  function onSubmit(values: TripPlannerInput) {
    const pkgTitle = packageDetail
      ? "title" in packageDetail
        ? packageDetail.title
        : packageDetail.name
      : "";

    if (isBooking && packageDetail) {
      toast.success(`Booking request received, ${values.fullName}!`, {
        description: `We have received your booking inquiry for ${pkgTitle}. Our travel desk will contact you shortly to confirm dates and arrangements.`,
      });
    } else {
      toast.success(`Thanks, ${values.fullName}!`, {
        description: "Our travel desk will get back to you with a personalized itinerary and quotation.",
      });
    }
    form.reset();
    if (onSuccess) onSuccess();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-5", className)}
        noValidate
      >
        {/* Selected Package Banner */}
        {packageDetail ? (() => {
          const isLegacy = "destinations" in packageDetail;
          const pkgTitle = isLegacy ? packageDetail.title : packageDetail.name;
          const imgSrc = isLegacy
            ? packageDetail.image.src
            : (packageDetail.coverImage || packageDetail.images?.[0] || "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80");
          const durationLabel = isLegacy
            ? `${packageDetail.duration.days} Days / ${packageDetail.duration.nights} Nights`
            : packageDetail.duration;
          const priceLabel = isLegacy
            ? packageDetail.startingPrice
            : packageDetail.price != null
            ? `${packageDetail.currency ?? "USD"} ${packageDetail.price.toLocaleString()}`
            : "Price on Request";

          return (
            <div className="flex items-center gap-3.5 rounded-2xl border border-brand-blue/20 bg-brand-blue-light/40 p-3 sm:p-4 shadow-xs">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-xl border border-white shadow-xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgSrc}
                  alt={pkgTitle}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                      isBooking
                        ? "bg-brand-blue text-white"
                        : "bg-brand-red text-white",
                    )}
                  >
                    {isBooking ? "Package Booking Mode" : "Customizing Package"}
                  </span>
                  <span className="text-muted-foreground text-xs font-semibold">
                    {durationLabel}
                  </span>
                </div>
                <p className="text-ink truncate text-sm sm:text-base font-bold mt-1">
                  {pkgTitle}
                </p>
                <p className="text-brand-blue text-xs font-extrabold">{priceLabel}</p>
              </div>
            </div>
          );
        })() : null}

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
            name="startingLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Starting City / Country</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Colombo, London, Dubai" {...field} />
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
              <FormLabel>Destination(s)</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Sigiriya, Kandy, Galle" {...field} />
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
                <FormLabel>Preferred Start Date</FormLabel>
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
                <FormLabel>Preferred End Date</FormLabel>
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
          <FormField
            control={form.control}
            name="travelType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Travel Type (Optional)</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a travel type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {QUICK_PLANNER_TRAVEL_TYPES.map((option) => (
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

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="budgetRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estimated Budget per Person (Optional)</FormLabel>
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
              <FormLabel>Transportation Preference</FormLabel>
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
                <FormLabel>Activities &amp; Experiences (Optional)</FormLabel>
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
              <FormLabel>Special Requirements &amp; Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  rows={3}
                  placeholder="Dietary needs, preferred flight times, room arrangements, or custom requests..."
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
          ) : isBooking ? (
            <>
              <CheckCircle2 className="size-5" />
              Submit Booking Inquiry
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </>
          ) : (
            <>
              <Sparkles className="size-5" />
              Submit Customized Trip Request
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
