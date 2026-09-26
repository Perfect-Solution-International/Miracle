import {
  CalendarCheck,
  Globe2,
  Hotel,
  Plane,
  ShieldCheck,
  Stamp,
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

const TITLE = "Outbound Travel";
const DESCRIPTION = "Plan your international journey with travel assistance tailored to your destination.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.outboundTravel,
  image: SITE_MEDIA.travelCategoryCards.outbound,
});

const OUTBOUND_SERVICES = [
  {
    icon: Globe2,
    title: "International Holiday Packages",
    description:
      "Handcrafted vacation packages to Dubai, Maldives, Singapore, Malaysia, Thailand, and European gateways.",
  },
  {
    icon: Plane,
    title: "Flight Routing & Ticketing",
    description:
      "Convenient airline connections, optimal departure timings, and competitive fares across all cabin classes.",
  },
  {
    icon: Stamp,
    title: "Tourist Visa Support",
    description:
      "Country-specific document preparation, appointment booking, and visa submission guidance.",
  },
  {
    icon: Hotel,
    title: "Global Hotel & Resort Reservations",
    description:
      "Carefully selected centrally located city hotels, family suites, and luxury overwater villas.",
  },
  {
    icon: CalendarCheck,
    title: "Customized Travel Itineraries",
    description:
      "Tailor your schedule with the right mix of guided cultural sightseeing and free leisure time.",
  },
  {
    icon: ShieldCheck,
    title: "Pre-Departure & Travel Assistance",
    description:
      "Airport briefing, transit regulations advice, and responsive coordinator support throughout your trip.",
  },
] as const;

export default function Page() {
  const packages = filterTravelPackages(TRAVEL_PACKAGE_DETAILS, { region: "international" });

  return (
    <>
      <TravelSubpageHero
        breadcrumbs={[
          { label: "Travel & Tourism", href: ROUTES.public.travelTourism },
          { label: "Outbound Travel" },
        ]}
        categoryLabel="Outbound Travel"
        title="Explore Sri Lanka & Travel Beyond"
        description="Discover unforgettable journeys in Sri Lanka or explore international destinations with travel options designed around your needs."
        image={SITE_MEDIA.travelHeroInboundOutbound}
        primary={{ label: "Explore Travel Packages", href: "#packages" }}
      />

      {/* 1. Travel Packages directly after Hero */}
      <TravelPackagesSection packages={packages} isFiltered showTabs={false} />

      {/* 2. Outbound Services & Details after Packages */}
      <Section className="bg-slate-50/60 py-16 sm:py-20" aria-labelledby="outbound-features-heading">
        <SectionHeading
          id="outbound-features-heading"
          align="center"
          eyebrow="International Travel Coordination"
          title="Seamless Holidays Beyond Sri Lanka"
          description="Whether you are traveling for a family holiday, a honeymoon escape, or leisure exploration, we arrange every element of your international journey."
        />

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {OUTBOUND_SERVICES.map(({ icon: Icon, title, description }) => (
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
