import { Check } from "lucide-react";
import type { Metadata } from "next";

import { CtaBanner } from "@/components/common/cta-banner";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";
import { TravelSubpageHero } from "@/features/travel";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Flight Tickets";
const DESCRIPTION = "Find flight options for your domestic and international journeys.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.flightTickets,
  image: SITE_MEDIA.businessTravel,
});

const FLIGHT_HIGHLIGHTS: readonly string[] = [
  "One-way & round-trip bookings",
  "Multi-city itineraries",
  "Fare comparison across airlines",
  "Rebooking & cancellation support",
];

export default function Page() {
  return (
    <>
      <TravelSubpageHero
        breadcrumbLabel="Flight Tickets"
        title="Find Your Flight"
        description="Domestic and international flight options, compared across airlines to fit your schedule and budget."
        image={SITE_MEDIA.businessTravel}
        primary={{ label: "Request Flight Assistance", href: ROUTES.public.tellUsWhatYouNeed }}
        secondary={{ label: "Explore Sri Lanka Tours", href: `${ROUTES.public.travelTourism}#packages` }}
      />

      <Section aria-labelledby="flights-what-heading">
        <SectionHeading
          id="flights-what-heading"
          align="center"
          eyebrow="Flight Tickets"
          title="What We Arrange"
          description="Our travel desk compares routes and fares across airlines to find an itinerary that fits your schedule and budget."
        />

        <ul className="mx-auto mt-10 grid max-w-2xl gap-x-8 gap-y-3 sm:grid-cols-2">
          {FLIGHT_HIGHLIGHTS.map((highlight) => (
            <li key={highlight} className="text-ink flex items-center gap-2 text-sm font-medium">
              <Check aria-hidden="true" className="text-brand-blue size-4 shrink-0" strokeWidth={3} />
              {highlight}
            </li>
          ))}
        </ul>
      </Section>

      <CtaBanner
        eyebrow="Start Planning"
        title="Ready to Book Your Flight?"
        description="Tell us your travel dates and destination, and our team will find flight options that work for you."
        primary={{ label: "Request Flight Assistance", href: ROUTES.public.tellUsWhatYouNeed }}
      />
    </>
  );
}
