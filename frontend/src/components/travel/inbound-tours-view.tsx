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
      {/* Full-Screen Cinematic Inbound Hero Section with Professional Liquid Glass Elements */}
      <section
        aria-labelledby="inbound-hero-heading"
        className="relative isolate overflow-hidden bg-white border-b border-border/40"
      >
        {/* 1. Underlying Screen-Wide High-Definition Sri Lanka Hero Image */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 md:bg-fixed"
          style={{
            backgroundImage: 'url("/images/travel/inbound-hero-sigiriya.jpg")',
          }}
        />

        {/* 2. Balanced Soft-White Wash for optimal readability & vibrant colors */}
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
          {/* Pulsing Liquid Glass Inbound Category Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/90 bg-white/95 px-3.5 py-1 text-[11px] font-extrabold tracking-wider text-navy uppercase shadow-sm backdrop-blur-xl">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-600" />
            </span>
            <span>Inbound Tours • Sri Lanka Experience</span>
          </div>

          <h1
            id="inbound-hero-heading"
            className="text-navy text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] leading-[1.12] font-black tracking-tight max-w-3xl drop-shadow-xs"
          >
            Discover Sri Lanka: Ancient Heritage, Hill Country &amp; Coast
          </h1>

          <p className="max-w-xl text-xs sm:text-sm md:text-base leading-relaxed font-semibold text-slate-800 drop-shadow-xs">
            Experience the wonders of Sri Lanka with handpicked luxury stays, private chauffeured transport, and customized itineraries.
          </p>

          {/* Liquid Glass Highlights Badges Strip */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-0.5">
            {[
              { icon: ShieldCheck, title: "Verified Stays & Transport" },
              { icon: Headphones, title: "24/7 Dedicated Concierge" },
              { icon: Sparkles, title: "Customized Private Itineraries" },
              { icon: CheckCircle2, title: "Zero Booking Fees" },
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
              <a href="#inbound-packages">
                Explore Travel Packages
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

      {/* Inquiry Quick Banner (seamlessly connected without hard borders) */}
      <div className="bg-white py-4 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs bg-slate-50/70 border border-slate-200/80 rounded-2xl px-5 py-3 shadow-xs">
          <div className="flex items-center gap-2 text-navy dark:text-foreground font-medium">
            <Sparkles className="size-4 text-amber-500 shrink-0" />
            <span>Looking for a bespoke private tour? Send an inquiry and get a customized quote with zero obligation.</span>
          </div>
          <Button
            size="sm"
            onClick={() => setGeneralInquiryOpen(true)}
            className="bg-brand-blue hover:bg-brand-blue-dark text-white text-xs h-8 px-4 shrink-0 font-semibold gap-1.5 shadow-xs"
          >
            <Send className="size-3" />
            Send Custom Inquiry
          </Button>
        </div>
      </div>

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
