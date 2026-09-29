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
      className="relative isolate overflow-hidden bg-white border-b border-slate-200/70"
    >
      {/* 1. Underlying Screen-Wide Flight & Aircraft Hero Image */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105 blur-[2px] md:blur-[2.5px] md:bg-fixed"
        style={{
          backgroundImage: `url("${SITE_MEDIA.businessTravel.src}")`,
          backgroundPosition: "center 45%",
        }}
      />

      {/* 2. Soft-White Overall Wash (lightens image & removes harsh cut-off borders) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-white/30 pointer-events-none"
      />

      {/* 3. Soft-White Radial Vignette for centered reading focus */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.45)_65%,rgba(255,255,255,0.92)_100%)] pointer-events-none"
      />

      {/* 4. Top & Bottom Smooth Melt Gradients */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-white/85 via-transparent to-white/95 pointer-events-none"
      />

      {/* Foreground Content with Spacious Height & Crisp Typography */}
      <div className="container-page relative z-10 flex flex-col items-center gap-5 pt-16 pb-14 sm:pt-20 sm:pb-18 md:pt-28 md:pb-24 max-w-4xl mx-auto text-center">
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
          className="text-navy text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.1] font-extrabold tracking-tight max-w-3xl"
        >
          Your Journey Starts With the Right Flight
        </h1>

        {/* Hero Subtitle */}
        <p className="max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed font-medium text-slate-700">
          Tell us your travel requirements and let our expert ticketing coordinators find the best routes, premier airlines, and competitive fares for your journey.
        </p>

        {/* Flight Highlights Badges Strip */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
          {[
            { icon: Plane, title: "Multi-Airline Route Comparison" },
            { icon: Coins, title: "Competitive Airfare Rates" },
            { icon: Headphones, title: "24/7 Ticketing Support" },
            { icon: ShieldCheck, title: "Flexible Rebooking Care" },
          ].map((item, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/95 px-3.5 py-1.5 text-xs font-bold text-navy shadow-xs backdrop-blur-md transition-all hover:scale-105"
            >
              <item.icon className="size-3.5 text-brand-blue" />
              <span>{item.title}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-2 flex flex-col sm:flex-row items-center gap-3.5">
          <Button
            asChild
            size="lg"
            className="bg-brand-blue hover:bg-brand-blue-dark h-11 sm:h-12 rounded-full px-7 text-sm font-bold text-white shadow-lg shadow-brand-blue/20 transition-all hover:shadow-xl"
          >
            <a href="#flight-request-form">
              Request Flight Tickets
              <ArrowRight className="size-4 ml-2" />
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
    </section>
  );
}
