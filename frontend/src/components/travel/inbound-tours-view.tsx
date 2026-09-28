"use client";

import {
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

const INBOUND_HERO_IMAGE = {
  src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80",
  alt: "Sigiriya ancient rock fortress rising above lush green forest in Sri Lanka",
};

export function InboundToursView() {
  const { inboundPackages } = useTravelStore();
  const [generalInquiryOpen, setGeneralInquiryOpen] = useState(false);

  return (
    <>
      <TravelSubpageHero
        breadcrumbs={[
          { label: "Travel & Tourism", href: ROUTES.public.travelTourism },
          { label: "Inbound Tours" },
        ]}
        categoryLabel="Inbound Tours (Sri Lanka)"
        title="Discover Sri Lanka: Ancient Heritage, Hill Country & Coast"
        description="Experience the wonders of Sri Lanka with handpicked luxury stays, private chauffeured transport, and customized itineraries. No booking fees or online payment required."
        image={INBOUND_HERO_IMAGE}
        primary={{ label: "Explore Travel Packages", href: "#inbound-packages" }}
      />

      {/* Inquiry Quick Banner */}
      <div className="bg-slate-50 border-b border-border/60 py-4 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-navy dark:text-foreground font-medium">
            <Sparkles className="size-4 text-amber-500 shrink-0" />
            <span>Looking for a bespoke private tour? Send an inquiry and get a customized quote with zero obligation.</span>
          </div>
          <Button
            size="sm"
            onClick={() => setGeneralInquiryOpen(true)}
            className="bg-brand-blue hover:bg-brand-blue-dark text-white text-xs h-8 px-4 shrink-0 font-semibold gap-1.5"
          >
            <Send className="size-3" />
            Send Custom Inquiry
          </Button>
        </div>
      </div>

      {/* Inbound Packages Grid */}
      <div id="inbound-packages" className="container-page scroll-mt-20">
        <PublicTravelPackageGrid
          packages={inboundPackages}
          filterType="Inbound"
          title="Sri Lanka Inbound Travel Packages"
          subtitle="Carefully crafted holiday itineraries designed for international travelers visiting Sri Lanka."
        />
      </div>

      {/* Inbound Services & Highlights */}
      <Section className="bg-slate-50/70 py-16 sm:py-20 border-t border-border/60" aria-labelledby="inbound-features-heading">
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
        defaultInquiryType="Inbound Tour"
        defaultDestination="Sri Lanka"
      />
    </>
  );
}
