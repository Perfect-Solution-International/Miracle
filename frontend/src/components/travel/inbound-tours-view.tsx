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
        className="relative isolate overflow-hidden bg-white border-b border-slate-200/70"
      >
        {/* 1. Underlying Screen-Wide Hero Image - Bottom Focused & Clearly Visible */}
        <div
          aria-hidden="true"
          className="absolute -inset-4 bg-cover bg-no-repeat transition-transform duration-1000 scale-105 blur-[2.5px]"
          style={{
            backgroundImage: 'url("/images/travel/inbound-hero.jpg")',
            backgroundPosition: "center 80%",
          }}
        />

        {/* 2. Subtle Light Wash (reduced whiteness so the scenic image colors shine through) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-white/18 pointer-events-none"
        />

        {/* 3. Soft Radial Vignette for optimal central readability */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.28)_65%,rgba(255,255,255,0.85)_100%)] pointer-events-none"
        />

        {/* 4. Top & Bottom Smooth Melt Gradients */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-white/75 via-transparent to-white/90 pointer-events-none"
        />

        {/* Foreground Content with Taller, More Spacious Height */}
        <div className="container-page relative z-10 flex flex-col items-center gap-5 pt-16 pb-14 sm:pt-20 sm:pb-18 md:pt-28 md:pb-24 max-w-4xl mx-auto text-center">
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
            className="text-navy text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.1] font-extrabold tracking-tight max-w-3xl"
          >
            Discover Sri Lanka: Ancient Heritage, Hill Country &amp; Coast
          </h1>

          <p className="max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed font-medium text-slate-700">
            Experience the wonders of Sri Lanka with handpicked luxury stays, private chauffeured transport, and customized itineraries.
          </p>

          {/* Liquid Glass Highlights Badges Strip */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
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
          <div className="mt-2 flex flex-col sm:flex-row items-center gap-3.5">
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
