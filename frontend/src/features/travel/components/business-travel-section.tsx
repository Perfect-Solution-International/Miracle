import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

import { TRAVEL_CATEGORIES } from "../data/travel.content";

/** Dedicated section for the "business-travel" category — the fullest
 * treatment on the page, since corporate trips need the most coordination. */
export function BusinessTravelSection() {
  const businessTravel = TRAVEL_CATEGORIES.find(
    (category) => category.id === "business-travel",
  );
  if (!businessTravel) return null;

  return (
    <Section
      id="business-travel"
      tone="navy"
      aria-labelledby="business-travel-heading"
      className="scroll-mt-24"
    >
      <div aria-hidden="true" className="bg-grid-inverse absolute inset-0 -z-10" />

      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <SectionHeading
          id="business-travel-heading"
          align="center"
          tone="inverse"
          eyebrow="For Corporate Trips"
          title="Business Travel"
          description="Professional travel solutions for meetings, conferences and corporate trips."
        />

        <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {businessTravel.highlights.map((highlight) => (
            <li
              key={highlight.label}
              id={highlight.id}
              className="flex scroll-mt-24 items-center gap-2 text-sm font-medium text-white"
            >
              <Check
                aria-hidden="true"
                className="text-brand-blue-muted size-4 shrink-0"
                strokeWidth={3}
              />
              {highlight.label}
            </li>
          ))}
        </ul>

        <Button asChild variant="accent" size="xl">
          <Link href={ROUTES.public.tellUsWhatYouNeed}>
            Plan Business Travel
            <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
