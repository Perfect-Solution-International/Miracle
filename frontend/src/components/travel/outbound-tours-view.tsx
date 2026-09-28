"use client";

import {
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
import { useState } from "react";

import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";
import { TravelSubpageHero } from "@/features/travel";
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

const OUTBOUND_HERO_IMAGE = {
  src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80",
  alt: "Downtown Dubai skyline with modern illuminated architecture",
};

export function OutboundToursView() {
  const { outboundPackages } = useTravelStore();
  const [generalInquiryOpen, setGeneralInquiryOpen] = useState(false);

  return (
    <>
      <TravelSubpageHero
        breadcrumbs={[
          { label: "Travel & Tourism", href: ROUTES.public.travelTourism },
          { label: "Outbound Tours" },
        ]}
        categoryLabel="Outbound Tours (International)"
        title="Explore the World: Premium International Holidays"
        description="Seamless international vacations for Sri Lankan travelers. We handle flight bookings, visa assistance, hotel reservations, and guided excursions."
        image={OUTBOUND_HERO_IMAGE}
        primary={{ label: "View International Packages", href: "#outbound-packages" }}
      />

      {/* Inquiry Quick Banner */}
      <div className="bg-slate-50 border-b border-border/60 py-4 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-navy dark:text-foreground font-medium">
            <Sparkles className="size-4 text-amber-500 shrink-0" />
            <span>Planning an international trip with family or friends? Submit an inquiry for customized packages and airfares.</span>
          </div>
          <Button
            size="sm"
            onClick={() => setGeneralInquiryOpen(true)}
            className="bg-brand-blue hover:bg-brand-blue-dark text-white text-xs h-8 px-4 shrink-0 font-semibold gap-1.5"
          >
            <Send className="size-3" />
            Send Outbound Inquiry
          </Button>
        </div>
      </div>

      {/* Outbound Packages Grid */}
      <div id="outbound-packages" className="container-page scroll-mt-20">
        <PublicTravelPackageGrid
          packages={outboundPackages}
          filterType="Outbound"
          title="International Holiday Packages"
          subtitle="Explore our featured destinations designed for Sri Lankan vacationers and leisure travelers."
        />
      </div>

      {/* Outbound Services & Highlights */}
      <Section className="bg-slate-50/70 py-16 sm:py-20 border-t border-border/60" aria-labelledby="outbound-features-heading">
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
              className="shadow-soft hover:shadow-lift group flex flex-col items-start gap-4 rounded-2xl border border-slate-200/80 bg-white dark:bg-card p-6 transition-all"
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
