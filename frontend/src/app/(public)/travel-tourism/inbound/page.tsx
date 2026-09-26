import {
  Car,
  Compass,
  Headphones,
  Hotel,
  MapPin,
  Plane,
} from "lucide-react";
import type { Metadata } from "next";

import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";
import {
  filterTravelPackages,
  TravelPackagesSection,
  TravelSubpageHero,
  TRAVEL_PACKAGE_DETAILS,
} from "@/features/travel";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Inbound Travel (Sri Lanka)";
const DESCRIPTION =
  "Discover Sri Lanka with customized tours, local experiences and complete travel support.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.inboundTravel,
  image: SITE_MEDIA.travelCategoryCards.inbound,
});

const INBOUND_SERVICES = [
  {
    icon: MapPin,
    title: "Customized Sri Lanka Itineraries",
    description:
      "Handcrafted tour plans covering ancient Sigiriya, Kandy heritage, Nuwara Eliya tea hills, and scenic southern beaches.",
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
      "Smooth on-arrival reception at Bandaranaike International Airport (BIA) with private direct transfers to your hotel.",
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

export default function Page() {
  const packages = filterTravelPackages(TRAVEL_PACKAGE_DETAILS, { region: "sri-lanka" });

  return (
    <>
      <TravelSubpageHero
        breadcrumbs={[
          { label: "Travel & Tourism", href: ROUTES.public.travelTourism },
          { label: "Inbound Travel" },
        ]}
        categoryLabel="Inbound Travel"
        title="Explore Sri Lanka & Travel Beyond"
        description="Discover unforgettable journeys in Sri Lanka or explore international destinations with travel options designed around your needs."
        image={SITE_MEDIA.inboundHero}
        primary={{ label: "Explore Travel Packages", href: "#packages" }}
      />

      {/* 1. Travel Packages directly after Hero */}
      <TravelPackagesSection packages={packages} isFiltered showTabs={false} />

      {/* 2. Inbound Services & Details after Packages */}
      <Section className="bg-slate-50/60 py-16 sm:py-20" aria-labelledby="inbound-features-heading">
        <SectionHeading
          id="inbound-features-heading"
          align="center"
          eyebrow="Sri Lanka Travel Services"
          title="Everything Arranged for an Effortless Holiday"
          description="From the moment you touch down to your final departure, Miracle International manages every logistical detail so you can immerse yourself in the wonders of Sri Lanka."
        />

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INBOUND_SERVICES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="shadow-soft hover:shadow-lift group flex flex-col items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 transition-all"
            >
              <div className="bg-brand-blue-light/70 text-brand-blue flex size-12 items-center justify-center rounded-xl transition-colors group-hover:bg-brand-blue group-hover:text-white">
                <Icon aria-hidden="true" className="size-6" />
              </div>
              <h3 className="text-ink text-lg font-bold">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
