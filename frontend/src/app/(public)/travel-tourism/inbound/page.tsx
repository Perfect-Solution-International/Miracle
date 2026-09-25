import {
  BedDouble,
  Calendar,
  Car,
  MapPinned,
  Plane,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
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

const TITLE = "Inbound Travel (Sri Lanka)";
const DESCRIPTION =
  "Discover Sri Lanka with customized tours, local experiences and complete travel support.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.inboundTravel,
  image: SITE_MEDIA.travelCategoryCards.inbound,
});

interface InboundHighlight {
  icon: LucideIcon;
  label: string;
}

const INBOUND_HIGHLIGHTS: readonly InboundHighlight[] = [
  { icon: MapPinned, label: "Customized Sri Lankan tours" },
  { icon: Plane, label: "Airport transfers" },
  { icon: BedDouble, label: "Accommodation" },
  { icon: Car, label: "Vehicle arrangements" },
  { icon: Sparkles, label: "Local experiences" },
  { icon: Users, label: "Tour guides" },
  { icon: Calendar, label: "Flexible itineraries" },
];

export default function Page() {
  const packages = filterTravelPackages(TRAVEL_PACKAGE_DETAILS, { region: "sri-lanka" });

  return (
    <>
      <TravelSubpageHero
        breadcrumbLabel="Inbound Travel"
        title="Discover Sri Lanka With Us"
        description="Customized tours, local experiences and complete travel support for visitors discovering Sri Lanka."
        image={SITE_MEDIA.travelCategoryCards.inbound}
        primary={{ label: "Explore Sri Lanka Tours", href: `${ROUTES.public.travelTourism}#packages` }}
        secondary={{ label: "Build Your Own Trip", href: `${ROUTES.public.travelTourism}#customize-trip` }}
      />

      <Section aria-labelledby="inbound-what-heading">
        <SectionHeading
          id="inbound-what-heading"
          align="center"
          eyebrow="Inbound Travel"
          title="Experience Sri Lanka With Us"
          description="From the moment you land to the moment you depart, we take care of every detail of your Sri Lanka journey."
        />

        <ul className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {INBOUND_HIGHLIGHTS.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="shadow-soft flex flex-col items-center gap-3 rounded-2xl border bg-white p-6 text-center transition-shadow hover:shadow-lift"
            >
              <span className="bg-brand-blue-light text-brand-blue inline-flex size-11 items-center justify-center rounded-xl">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <p className="text-ink text-sm font-bold">{label}</p>
            </li>
          ))}
        </ul>
      </Section>

      <TravelPackagesSection packages={packages} isFiltered />

      <CtaBanner
        eyebrow="Start Planning"
        title="Ready to Discover Sri Lanka?"
        description="Choose a ready-made package or tell us what kind of journey you want, and we'll help you plan the rest."
        primary={{ label: "Explore Sri Lanka Tours", href: `${ROUTES.public.travelTourism}#packages` }}
        secondary={{ label: "Build Your Own Trip", href: `${ROUTES.public.travelTourism}#customize-trip` }}
      />
    </>
  );
}
