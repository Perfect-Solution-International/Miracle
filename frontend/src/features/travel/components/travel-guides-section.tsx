import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";

import { TRAVEL_GUIDE_CARDS } from "../data/travel-guides.content";

/** "Travel Guides & Inspiration" — quick links into existing pages and
 * sections rather than a content hub that doesn't exist yet. */
export function TravelGuidesSection() {
  return (
    <Section aria-labelledby="travel-guides-heading">
      <SectionHeading
        id="travel-guides-heading"
        align="center"
        eyebrow="Before You Go"
        title="Travel Guides & Inspiration"
      />

      <ul className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
        {TRAVEL_GUIDE_CARDS.map(({ icon: Icon, title, description, href }) => (
          <li key={title} className="shadow-soft rounded-2xl border bg-white p-6">
            <span className="bg-brand-blue-light text-brand-blue inline-flex size-11 items-center justify-center rounded-xl">
              <Icon aria-hidden="true" className="size-5" />
            </span>
            <p className="text-ink mt-4 text-base font-bold">{title}</p>
            <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
              {description}
            </p>
            <Link
              href={href}
              className="text-brand-blue hover:text-brand-blue-dark group/link mt-4 inline-flex items-center gap-1.5 text-sm font-semibold"
            >
              Learn More
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover/link:translate-x-1"
              />
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
