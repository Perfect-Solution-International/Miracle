"use client";

import {
  ArrowRight,
  CheckCircle2,
  Compass,
  Globe2,
  Headphones,
  Hotel,
  Luggage,
  MapPin,
  Palmtree,
  Plane,
  Send,
  ShieldCheck,
  Sparkles,
  Ticket,
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

const OUTBOUND_SERVICES = [
  {
    icon: Globe2,
    title: "Worldwide Holiday Packages",
    description:
      "Curated international vacation packages for Dubai, Maldives, Singapore, Malaysia, Thailand, Europe, and beyond.",
  },
  {
    icon: Ticket,
    title: "Flight Tickets & Route Planning",
    description:
      "Competitive airfares on premier international airlines with optimized connection times and baggage allowances.",
  },
  {
    icon: ShieldCheck,
    title: "Tourist Visa Processing Support",
    description:
      "Complete documentation, appointment scheduling, and step-by-step guidance handled by our in-house visa desk.",
  },
  {
    icon: Hotel,
    title: "Verified International Hotels",
    description:
      "Central luxury accommodations and all-inclusive resort bookings with guaranteed confirmations.",
  },
  {
    icon: Luggage,
    title: "Guided Sightseeing & Excursions",
    description:
      "Pre-arranged skip-the-line entrance passes, desert safaris, island cruises, and private chauffeur tours.",
  },
  {
    icon: Headphones,
    title: "Dedicated Travel Consultant",
    description:
      "One-on-one assistance before and during your journey to ensure a worry-free overseas travel experience.",
  },
] as const;

export function OutboundToursView() {
  const { outboundPackages } = useTravelStore();
  const [generalInquiryOpen, setGeneralInquiryOpen] = useState(false);

  return (
    <>
      {/* Full-Screen Cinematic Outbound Hero Section with Clean White Tourism Styling */}
      <section
        aria-labelledby="outbound-hero-heading"
        className="relative isolate overflow-hidden bg-white border-b border-slate-200/70 min-h-[580px] lg:min-h-[660px] flex items-center"
      >
        {/* 1. Underlying Screen-Wide Hero Image - Seamless High-Definition Photograph */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-no-repeat transition-transform duration-1000"
          style={{
            backgroundImage: 'url("/images/travel/outbound-hero.jpg")',
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
              {/* Outbound Category Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/95 px-4 py-1.5 text-xs font-extrabold tracking-wider text-navy uppercase shadow-sm backdrop-blur-md">
                <span className="relative flex size-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-brand-blue" />
                </span>
                <span>Outbound Tours • Worldwide Holidays</span>
              </div>

              <h1
                id="outbound-hero-heading"
                className="text-navy text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.1] font-extrabold tracking-tight"
              >
                Explore the World: Premium International Holidays
              </h1>

              <p className="max-w-xl text-sm sm:text-base md:text-lg leading-relaxed font-medium text-slate-700">
                Seamless international vacations for Sri Lankan travelers. We handle flight bookings, visa assistance, verified luxury resort stays, and guided worldwide excursions.
              </p>

              {/* Liquid Glass Highlights Badges Strip */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                {[
                  { icon: Plane, title: "Flights & Visa Assistance" },
                  { icon: Hotel, title: "Verified 5-Star Resorts" },
                  { icon: Headphones, title: "24/7 Dedicated Trip Care" },
                  { icon: ShieldCheck, title: "All-Inclusive Options" },
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
                  <a href="#outbound-packages">
                    View Outbound Packages
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

      {/* Outbound Packages Grid on White */}
      <div className="bg-white">
        <div id="outbound-packages" className="container-page scroll-mt-20">
          <PublicTravelPackageGrid
            packages={outboundPackages}
            filterType="Outbound"
            title="International Holiday Packages"
            subtitle="Explore our featured destinations designed for Sri Lankan vacationers and leisure travelers."
          />
        </div>
      </div>

      {/* Outbound Services & Highlights on White */}
      <Section className="bg-white py-16 sm:py-20 border-t border-slate-100" aria-labelledby="outbound-features-heading">
        <SectionHeading
          id="outbound-features-heading"
          align="center"
          eyebrow="International Travel Services"
          title="Complete End-to-End Travel Coordination"
          description="From visa pre-approvals to transfers and private excursions, our team handles all arrangements so you can travel with complete peace of mind."
        />

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {OUTBOUND_SERVICES.map(({ icon: Icon, title, description }) => (
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
        defaultInquiryType="Outbound Tour"
        defaultDestination="Dubai / Maldives"
      />
    </>
  );
}

