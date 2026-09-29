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
      {/* Full-Screen Cinematic Outbound Hero Section with Professional Liquid Glass Elements */}
      <section
        aria-labelledby="outbound-hero-heading"
        className="relative isolate overflow-hidden bg-white border-b border-border/40"
      >
        {/* 1. Underlying Screen-Wide High-Definition Maldives Ocean Panorama Hero Image */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 md:bg-fixed"
          style={{
            backgroundImage: 'url("/images/travel/outbound-hero-maldives.jpg")',
          }}
        />

        {/* 2. Balanced Soft-White Wash for optimal readability & rich colors */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-white/30 pointer-events-none"
        />

        {/* 3. Soft Radial Vignette Edge Blend (smooth natural gradient into light margins) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.45)_65%,rgba(255,255,255,0.92)_100%)] pointer-events-none"
        />

        {/* 4. Top Soft Navbar Fade */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/90 via-white/40 to-transparent pointer-events-none"
        />

        {/* 5. Generous Bottom Melt Layer */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none"
        />

        {/* Foreground Content with Compact Height */}
        <div className="container-page relative z-10 flex flex-col items-center gap-3.5 pt-10 pb-10 text-center sm:pt-14 sm:pb-12 md:pt-16 md:pb-14 max-w-4xl mx-auto">
          {/* Pulsing Liquid Glass Outbound Category Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/90 bg-white/95 px-3.5 py-1 text-[11px] font-extrabold tracking-wider text-navy uppercase shadow-sm backdrop-blur-xl">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-blue" />
            </span>
            <span>Outbound Tours • Worldwide Holidays</span>
          </div>

          <h1
            id="outbound-hero-heading"
            className="text-navy text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] leading-[1.12] font-black tracking-tight max-w-3xl drop-shadow-xs"
          >
            Explore the World: Premium International Holidays
          </h1>

          <p className="max-w-xl text-xs sm:text-sm md:text-base leading-relaxed font-semibold text-slate-800 drop-shadow-xs">
            Seamless international vacations for Sri Lankan travelers. We handle flight bookings, visa assistance, verified luxury resort stays, and guided worldwide excursions.
          </p>

          {/* Liquid Glass Highlights Badges Strip */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-0.5">
            {[
              { icon: Plane, title: "Flights & Visa Assistance" },
              { icon: Hotel, title: "Verified 5-Star Resorts" },
              { icon: Headphones, title: "24/7 Dedicated Trip Care" },
              { icon: ShieldCheck, title: "All-Inclusive Options" },
            ].map((item, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/90 bg-white/95 px-3 py-1 text-[11px] font-bold text-navy shadow-xs backdrop-blur-xl transition-all hover:scale-105"
              >
                <item.icon className="size-3 text-brand-blue" />
                <span>{item.title}</span>
              </div>
            ))}
          </div>

          {/* Liquid Glass Action Buttons */}
          <div className="mt-1.5 flex flex-col sm:flex-row items-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-brand-blue hover:bg-brand-blue-dark h-10 sm:h-11 rounded-full px-6 text-xs sm:text-sm font-bold text-white shadow-lg shadow-brand-blue/20 transition-all hover:shadow-xl"
            >
              <a href="#outbound-packages">
                View Outbound Packages
                <ArrowRight className="size-3.5 ml-1.5" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-10 sm:h-11 rounded-full border-white/90 bg-white/95 px-6 text-xs sm:text-sm font-bold text-navy shadow-sm backdrop-blur-xl hover:bg-white"
            >
              <Link href={ROUTES.public.travelTourism}>
                All Travel &amp; Tours
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Inquiry Quick Banner on White (seamlessly connected) */}
      <div className="bg-white py-4 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs bg-slate-50/70 border border-slate-200/80 rounded-2xl px-5 py-3 shadow-xs">
          <div className="flex items-center gap-2 text-navy dark:text-foreground font-medium">
            <Sparkles className="size-4 text-amber-500 shrink-0" />
            <span>Planning an international trip with family or friends? Submit an inquiry for customized packages and airfares.</span>
          </div>
          <Button
            size="sm"
            onClick={() => setGeneralInquiryOpen(true)}
            className="bg-brand-blue hover:bg-brand-blue-dark text-white text-xs h-8 px-4 shrink-0 font-semibold gap-1.5 shadow-xs"
          >
            <Send className="size-3" />
            Send Outbound Inquiry
          </Button>
        </div>
      </div>

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

