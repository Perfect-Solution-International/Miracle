"use client";

import {
  ArrowRight,
  Car,
  CheckCircle2,
  Compass,
  Headphones,
  Hotel,
  MapPin,
  Palmtree,
  Plane,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { useTravelStore } from "@/lib/storage/travel-store";
import { PublicTravelPackageGrid } from "./public-travel-package-grid";
import { PublicTravelInquiryModal } from "./public-travel-inquiry-modal";

const INBOUND_SERVICES = [
  {
    icon: MapPin,
    title: "Tailored Sri Lanka Itineraries",
    description:
      "Handcrafted tour plans covering Sigiriya, Kandy heritage, Nuwara Eliya tea hills, Yala safaris, and golden southern beaches.",
  },
  {
    icon: Car,
    title: "Chauffeured Private Transport",
    description:
      "Dedicated air-conditioned luxury sedans, vans, and coaches driven by experienced English-speaking tourist chauffeurs.",
  },
  {
    icon: Hotel,
    title: "Handpicked Boutique Stays",
    description:
      "Verified reservations at 4-star and 5-star hotels, colonial tea bungalows, and ocean-facing luxury resorts.",
  },
  {
    icon: Plane,
    title: "Airport Transfers & Meet & Greet",
    description:
      "Smooth on-arrival reception at Bandaranaike International Airport (BIA) with private direct transfers to your destination.",
  },
  {
    icon: Compass,
    title: "Certified Tourist Guides",
    description:
      "Licensed national and site guides sharing authentic island stories, wildlife sightings, and cultural heritage.",
  },
  {
    icon: Headphones,
    title: "24/7 Dedicated Trip Care",
    description:
      "Continuous on-ground support and direct coordinator access throughout your journey across Sri Lanka.",
  },
] as const;

export function InboundToursView() {
  const { inboundPackages } = useTravelStore();
  const [generalInquiryOpen, setGeneralInquiryOpen] = useState(false);

  return (
    <>
      {/* Full-Screen Cinematic Inbound Hero Section with Clean White Tourism Styling */}
      <section
        aria-labelledby="inbound-hero-heading"
        className="relative isolate overflow-hidden bg-white border-b border-slate-200/70 min-h-[580px] lg:min-h-[660px] flex items-center"
      >
        {/* 1. Underlying Screen-Wide Hero Image - Seamless High-Definition Photograph */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-no-repeat transition-transform duration-1000"
          style={{
            backgroundImage: 'url("/images/travel/inbound-hero.jpg")',
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
              {/* Inbound Category Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/95 px-4 py-1.5 text-xs font-extrabold tracking-wider text-navy uppercase shadow-sm backdrop-blur-md">
                <span className="relative flex size-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-600" />
                </span>
                <span>Inbound Tours • Sri Lanka Experience</span>
              </div>

              <h1
                id="inbound-hero-heading"
                className="text-navy text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.1] font-extrabold tracking-tight"
              >
                Discover Sri Lanka: Ancient Heritage, Hill Country &amp; Coast
              </h1>

              <p className="max-w-xl text-sm sm:text-base md:text-lg leading-relaxed font-medium text-slate-700">
                Experience the wonders of Sri Lanka with handpicked luxury stays, private chauffeured transport, and customized itineraries designed for international travelers.
              </p>

              {/* Liquid Glass Highlights Badges Strip */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                {[
                  { icon: ShieldCheck, title: "Verified Stays & Transport" },
                  { icon: Headphones, title: "24/7 Dedicated Concierge" },
                  { icon: Sparkles, title: "Customized Private Itineraries" },
                  { icon: CheckCircle2, title: "Zero Booking Fees" },
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
              <div className="mt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Button
                  asChild
                  size="lg"
                  className="bg-brand-blue hover:bg-brand-blue-dark h-11 sm:h-12 rounded-full px-7 text-sm font-bold text-white shadow-lg shadow-brand-blue/20 transition-all hover:shadow-xl"
                >
                  <a href="#inbound-packages">
                    Explore Travel Packages
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
          </div>
        </div>
      </section>

      {/* Inbound Packages Grid */}
      <div className="bg-white">
        <div id="inbound-packages" className="container-page scroll-mt-20">
          <PublicTravelPackageGrid
            packages={inboundPackages}
            filterType="Inbound"
            title="Sri Lanka Inbound Travel Packages"
            subtitle="Carefully crafted holiday itineraries designed for international travelers visiting Sri Lanka."
          />
        </div>
      </div>

      {/* Inbound Services & Highlights */}
      <Section className="bg-white py-16 sm:py-20 border-t border-slate-100" aria-labelledby="inbound-features-heading">
        <SectionHeading
          id="inbound-features-heading"
          align="center"
          eyebrow="Sri Lanka Travel Services"
          title="Everything Arranged for an Effortless Holiday"
          description="From airport reception to your final departure, Miracle International manages every logistical detail so you can immerse yourself in Sri Lanka."
        />

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INBOUND_SERVICES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="shadow-soft hover:shadow-lift group flex flex-col items-start gap-4 rounded-2xl border border-slate-200/80 bg-white hover:bg-slate-50/50 dark:bg-card p-6 transition-all"
            >
              <div className="bg-brand-blue-light/70 text-brand-blue flex size-12 items-center justify-center rounded-xl transition-colors group-hover:bg-brand-blue group-hover:text-white">
                <Icon aria-hidden="true" className="size-6" />
              </div>
              <h3 className="text-navy dark:text-foreground text-base font-bold">{title}</h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* General Inquiry Modal */}
      <PublicTravelInquiryModal
        open={generalInquiryOpen}
        onOpenChange={setGeneralInquiryOpen}
        defaultInquiryType="Inbound Tour"
        defaultDestination="Sri Lanka"
      />
    </>
  );
}
