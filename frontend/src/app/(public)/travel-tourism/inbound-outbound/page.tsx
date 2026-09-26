import {
  Car,
  Globe2,
  Headphones,
  MapPin,
  Plane,
  Stamp,
} from "lucide-react";
import type { Metadata } from "next";

import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";
import {
  TravelPackagesSection,
  TravelSubpageHero,
  TRAVEL_PACKAGE_DETAILS,
} from "@/features/travel";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Inbound & Outbound Travel Packages";
const DESCRIPTION =
  "Explore curated inbound Sri Lanka tours and outbound international holiday packages with Miracle International.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.inboundOutbound,
  image: SITE_MEDIA.travelHeroInboundOutbound,
});

const TRAVEL_SERVICE_DETAILS = [
  {
    icon: MapPin,
    title: "Handcrafted Sri Lanka Itineraries",
    description:
      "Explore ancient heritage in Sigiriya & Kandy, scenic hill country tea estates in Nuwara Eliya & Ella, and southern pristine beaches.",
  },
  {
    icon: Globe2,
    title: "International Holiday Packages",
    description:
      "Seamless vacations to Dubai, Maldives, Singapore, Malaysia, Thailand, and Europe with hotels, transfers, and sightseeing included.",
  },
  {
    icon: Car,
    title: "Chauffeured Private Transport",
    description:
      "Air-conditioned luxury sedans, vans, and coaches driven by experienced English-speaking tourist chauffeurs with airport meet-and-greet.",
  },
  {
    icon: Plane,
    title: "Flight Routing & Ticketing",
    description:
      "Convenient airline connections, optimal departure schedules, and multi-airline fare comparisons across all cabin classes.",
  },
  {
    icon: Stamp,
    title: "Visa Support & Processing",
    description:
      "Comprehensive assistance for Sri Lanka ETA entry visas and international tourist visa documentation and submissions.",
  },
  {
    icon: Headphones,
    title: "24/7 Dedicated Travel Care",
    description:
      "Continuous on-ground support, responsive trip coordinators, and dedicated assistance throughout every stage of your journey.",
  },
] as const;

export default function Page() {
  return (
    <>
      {/* 1. Hero Section */}
      <TravelSubpageHero
        breadcrumbs={[
          { label: "Travel & Tourism", href: ROUTES.public.travelTourism },
          { label: "Inbound & Outbound" },
        ]}
        categoryLabel="Inbound & Outbound Travel"
        title="Explore Sri Lanka & Travel Beyond"
        description="Discover unforgettable journeys in Sri Lanka or explore international destinations with travel options designed around your needs."
        image={SITE_MEDIA.travelHeroInboundOutbound}
        primary={{ label: "Explore Travel Packages", href: "#packages" }}
      />

      {/* 2. Travel Packages directly after Hero */}
      <TravelPackagesSection packages={TRAVEL_PACKAGE_DETAILS} showTabs={false} />

      {/* 3. Details & Services Section after Packages */}
      <Section className="bg-slate-50/60 py-16 sm:py-20" aria-labelledby="travel-details-heading">
        <SectionHeading
          id="travel-details-heading"
          align="center"
          eyebrow="Complete Travel Solutions"
          title="Everything Arranged for an Effortless Journey"
          description="From private island tours in Sri Lanka to worldwide holiday escapes, Miracle International handles every travel detail with care and precision."
        />

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TRAVEL_SERVICE_DETAILS.map(({ icon: Icon, title, description }) => (
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
