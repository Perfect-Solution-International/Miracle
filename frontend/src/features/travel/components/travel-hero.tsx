"use client";

import { Calendar, Compass, MapPin, Search, Users } from "lucide-react";
import Image from "next/image";
import { useState, type FormEvent } from "react";

import { Eyebrow } from "@/components/common/eyebrow";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SITE_MEDIA } from "@/config/site-media";

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
      className="relative isolate overflow-hidden border-b bg-slate-50"
    >
      {/* Light, Bright, Clean Travel Background */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src={SITE_MEDIA.travelHeroBright.src}
          alt={SITE_MEDIA.travelHeroBright.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="from-white/92 via-white/82 to-white/96 absolute inset-0 bg-gradient-to-b" />
      </div>

      <div className="container-page flex flex-col items-center gap-5 py-12 text-center sm:py-16 md:py-20">
        <Breadcrumb items={[{ label: "Travel & Tourism" }]} />
        <Eyebrow tone="default">Miracle International Travel &amp; Tourism</Eyebrow>

        <h1
          id="travel-hero-heading"
          className="text-ink max-w-3xl text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl md:text-6xl"
        >
          Travel Beyond Boundaries
        </h1>

        <p className="text-muted-foreground max-w-2xl text-base leading-relaxed sm:text-lg">
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
                  className="text-ink placeholder:text-slate-400 w-full bg-transparent text-sm font-semibold focus:outline-none"
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
