"use client";

import { Calendar, Compass, MapPin, Search, Users } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Eyebrow } from "@/components/common/eyebrow";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TRAVEL_TYPES = [
  { value: "all", label: "All Travel Types" },
  { value: "leisure", label: "Leisure & Holiday" },
  { value: "adventure", label: "Adventure & Wildlife" },
  { value: "cultural", label: "Cultural & Heritage" },
  { value: "luxury", label: "Luxury & Honeymoon" },
  { value: "family", label: "Family Tours" },
  { value: "business", label: "Business & MICE" },
] as const;

const TRAVELER_OPTIONS = [
  { value: "1", label: "1 Traveler" },
  { value: "2", label: "2 Travelers" },
  { value: "3-5", label: "3–5 Travelers" },
  { value: "6+", label: "6+ Travelers (Group)" },
] as const;

const DATE_OPTIONS = [
  { value: "anytime", label: "Flexible Dates" },
  { value: "this-month", label: "This Month" },
  { value: "next-month", label: "Next Month" },
  { value: "season-upcoming", label: "Upcoming Season" },
] as const;

export function TravelHero({
  onExplore,
}: {
  onExplore?: (query: { destination: string; travelType: string }) => void;
}) {
  const [destination, setDestination] = useState("");
  const [travelType, setTravelType] = useState("all");
  const [travelDate, setTravelDate] = useState("anytime");
  const [travelers, setTravelers] = useState("2");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (onExplore) {
      onExplore({ destination, travelType });
    } else {
      const packagesSection = document.getElementById("packages");
      if (packagesSection) {
        packagesSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  return (
    <section
      aria-labelledby="travel-hero-heading"
      className="relative isolate overflow-hidden border-b border-slate-200/70 bg-white"
    >
      {/* 1. Underlying Cinematic Hero Image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 md:bg-fixed"
        style={{
          backgroundImage: 'url("/images/travel/travel-hero-cinematic.png")',
        }}
      />

      {/* 2. Soft-White Overall Wash (lightens image without washing it out completely) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-white/35"
      />

      {/* 3. Soft-White Vignette & Edge Blend (softens left, right, and corners into the light page) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.5)_65%,rgba(255,255,255,0.92)_100%)]"
      />

      {/* 4. Vertical Smooth Melt (top navbar connection & bottom section seamless blend) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-white/90 via-transparent to-white/95"
      />

      {/* Content */}
      <div className="container-page relative z-10 flex flex-col items-center gap-5 pt-20 pb-12 text-center sm:pt-28 sm:pb-16 md:pt-36 md:pb-20">
        <Eyebrow
          tone="default"
          className="rounded-full border border-white/80 bg-white/95 px-4 py-1.5 font-extrabold text-navy shadow-sm backdrop-blur-md"
        >
          Miracle International Travel &amp; Tourism
        </Eyebrow>

        <h1
          id="travel-hero-heading"
          className="max-w-3xl text-4xl leading-[1.08] font-extrabold tracking-tight text-navy sm:text-5xl md:text-6xl"
        >
          Travel Beyond Boundaries
        </h1>

        <p className="max-w-2xl text-base leading-relaxed font-medium text-slate-700 sm:text-lg">
          Explore destinations, plan customized journeys, arrange flights, and get travel
          support with Miracle International.
        </p>

        {/* Professional Search / Explore Bar */}
        <form
          onSubmit={handleSubmit}
          className="shadow-lift mt-4 w-full max-w-5xl rounded-3xl border border-slate-200/90 bg-white p-2.5 sm:rounded-full sm:p-2 sm:pl-6"
        >
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:divide-x sm:divide-slate-200">
            {/* 1. Destination */}
            <div className="flex flex-1 items-center gap-3 px-3 py-2 text-left sm:py-1">
              <MapPin aria-hidden="true" className="text-brand-blue size-5 shrink-0" />
              <div className="min-w-0 flex-1">
                <span className="text-muted-foreground block text-[10px] font-extrabold tracking-wider uppercase">
                  Destination
                </span>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Where do you want to go?"
                  className="text-ink w-full bg-transparent text-sm font-semibold placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </div>

            {/* 2. Travel Type */}
            <div className="flex flex-1 items-center gap-3 px-3 py-2 text-left sm:py-1">
              <Compass aria-hidden="true" className="text-brand-blue size-5 shrink-0" />
              <div className="min-w-0 flex-1">
                <span className="text-muted-foreground block text-[10px] font-extrabold tracking-wider uppercase">
                  Travel Type
                </span>
                <Select value={travelType} onValueChange={setTravelType}>
                  <SelectTrigger className="text-ink h-7 border-0 p-0 text-sm font-semibold shadow-none focus:ring-0">
                    <SelectValue placeholder="All Travel Types" />
                  </SelectTrigger>
                  <SelectContent>
                    {TRAVEL_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 3. Travel Date */}
            <div className="flex flex-1 items-center gap-3 px-3 py-2 text-left sm:py-1">
              <Calendar aria-hidden="true" className="text-brand-blue size-5 shrink-0" />
              <div className="min-w-0 flex-1">
                <span className="text-muted-foreground block text-[10px] font-extrabold tracking-wider uppercase">
                  Travel Date
                </span>
                <Select value={travelDate} onValueChange={setTravelDate}>
                  <SelectTrigger className="text-ink h-7 border-0 p-0 text-sm font-semibold shadow-none focus:ring-0">
                    <SelectValue placeholder="Flexible Dates" />
                  </SelectTrigger>
                  <SelectContent>
                    {DATE_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 4. Number of Travelers */}
            <div className="flex flex-1 items-center gap-3 px-3 py-2 text-left sm:py-1">
              <Users aria-hidden="true" className="text-brand-blue size-5 shrink-0" />
              <div className="min-w-0 flex-1">
                <span className="text-muted-foreground block text-[10px] font-extrabold tracking-wider uppercase">
                  Travelers
                </span>
                <Select value={travelers} onValueChange={setTravelers}>
                  <SelectTrigger className="text-ink h-7 border-0 p-0 text-sm font-semibold shadow-none focus:ring-0">
                    <SelectValue placeholder="2 Travelers" />
                  </SelectTrigger>
                  <SelectContent>
                    {TRAVELER_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 5. Primary Explore Button */}
            <div className="pt-2 sm:p-1 sm:pt-1">
              <Button
                type="submit"
                size="lg"
                className="bg-brand-blue hover:bg-brand-blue-dark w-full rounded-2xl px-7 py-3 font-bold text-white shadow-md sm:w-auto sm:rounded-full"
              >
                <Search aria-hidden="true" className="size-4" />
                Explore
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
