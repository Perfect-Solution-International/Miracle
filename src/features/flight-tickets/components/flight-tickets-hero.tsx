import { ArrowRight, Coins, Headphones, Plane, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";

/**
 * Full-Screen Cinematic Flight Tickets Hero Section with Clean White Tourism Styling.
 * Spreads the aircraft visual across the entire hero background with a soft-white wash overlay
 * for seamless integration without harsh cut-off edges.
 */
export function FlightTicketsHero() {
  return (
    <section
      aria-labelledby="flight-hero-heading"
      className="relative isolate overflow-hidden bg-white border-b border-slate-200/70 min-h-[580px] lg:min-h-[660px] flex items-center"
    >
      {/* 1. Underlying Screen-Wide Flight & Aircraft Hero Image - Seamless High-Definition Photograph */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-no-repeat transition-transform duration-1000"
        style={{
          backgroundImage: 'url("/images/travel/flight-hero.jpg")',
          backgroundPosition: "right center",
        }}
      />

      {/* 2. Soft-White Gradient on Left Area (for crystal-clear readability over natural light) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent lg:from-white/95 lg:via-white/55 lg:to-transparent pointer-events-none"
      />

      {/* 3. Bottom Melt to Next Section */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"
      />

      {/* Foreground Content with Left-Aligned Spacious Typography */}
      <div className="container-page relative z-10 w-full py-16 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-12 items-center">
          <div className="flex flex-col items-start gap-5 max-w-2xl lg:col-span-7 xl:col-span-6">
            {/* Live Flight Assistance Category Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/95 px-4 py-1.5 text-xs font-extrabold tracking-wider text-navy uppercase shadow-sm backdrop-blur-md">
              <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-brand-blue" />
              </span>
              <span>Flight Assistance • Domestic &amp; International Flights</span>
            </div>

            {/* Hero Title */}
            <h1
              id="flight-hero-heading"
              className="text-navy text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.1] font-extrabold tracking-tight"
            >
              Your Journey Starts With the Right Flight
            </h1>

            {/* Hero Subtitle */}
            <p className="max-w-xl text-sm sm:text-base md:text-lg leading-relaxed font-medium text-slate-700">
              Tell us your travel requirements and let our expert ticketing coordinators find the best routes, premier airlines, and competitive fares for your journey.
            </p>

            {/* Action Buttons */}
            <div className="mt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Button
                asChild
                size="lg"
                className="bg-brand-blue hover:bg-brand-blue-dark h-11 sm:h-12 rounded-full px-7 text-sm font-bold text-white shadow-lg shadow-brand-blue/20 transition-all hover:shadow-xl"
              >
                <a href="#flight-request-form">
                  Request Flight Tickets
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 sm:h-12 rounded-full border-white/90 bg-white/95 px-7 text-sm font-bold text-navy shadow-sm backdrop-blur-md hover:bg-white"
              >
                <Link href={ROUTES.public.travelTourism}>
                  All Travel &amp; Tours
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
