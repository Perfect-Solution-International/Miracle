import { BedDouble, Globe2, Plane, Sparkles, Stamp, type LucideIcon } from "lucide-react";
import type { Metadata } from "next";

import { CtaBanner } from "@/components/common/cta-banner";
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

interface OutboundHighlight {
  icon: LucideIcon;
  label: string;
}

const OUTBOUND_HIGHLIGHTS: readonly OutboundHighlight[] = [
  { icon: Globe2, label: "International travel" },
  { icon: Plane, label: "Flight tickets" },
  { icon: Stamp, label: "Visa support" },
  { icon: BedDouble, label: "Accommodation" },
  { icon: Sparkles, label: "Customized trips" },
];

export default function Page() {
  const packages = filterTravelPackages(TRAVEL_PACKAGE_DETAILS, { region: "international" });

  return (
    <>
      <TravelSubpageHero
        breadcrumbLabel="Outbound Travel"
        title="Explore Beyond Sri Lanka"
        description="International travel, flight tickets, visa support and accommodation — arranged for you."
        image={SITE_MEDIA.travelCategoryCards.outbound}
        primary={{ label: "Tell Us What You Need", href: ROUTES.public.tellUsWhatYouNeed }}
        secondary={{ label: "Visa Assistance", href: ROUTES.public.visaServices }}
      />

      <Section aria-labelledby="outbound-what-heading">
        <SectionHeading
          id="outbound-what-heading"
          align="center"
          eyebrow="Outbound Travel"
          title="What We Arrange"
        />

        <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3 lg:mt-12 lg:grid-cols-5">
          {OUTBOUND_HIGHLIGHTS.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="shadow-soft flex flex-col items-center gap-2.5 rounded-2xl border bg-white p-5 text-center"
            >
              <span className="bg-brand-blue-light text-brand-blue inline-flex size-10 items-center justify-center rounded-full">
                <Icon aria-hidden="true" className="size-4.5" />
              </span>
              <p className="text-ink text-sm font-semibold">{label}</p>
            </li>
          ))}
        </ul>
      </Section>

      <TravelPackagesSection
        packages={packages}
        isFiltered
        eyebrow="Featured Packages"
        title="International Packages"
        description="Ready-made international itineraries — every one can be adjusted to fit your trip."
      />

      <CtaBanner
        eyebrow="Start Planning"
        title="Ready to Travel Beyond Sri Lanka?"
        description="Tell us where you want to go and our travel team will take care of flights, visas and the rest."
        primary={{ label: "Tell Us What You Need", href: ROUTES.public.tellUsWhatYouNeed }}
        secondary={{ label: "Visa Assistance", href: ROUTES.public.visaServices }}
      />
    </>
  );
}
