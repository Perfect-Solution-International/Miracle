import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";

import { TRAVEL_TYPES } from "../data/travel.content";

/** "Choose Your Travel Type": inbound vs. outbound entry point. */
export function TravelTypeSection() {
  return (
    <Section tone="surface" aria-labelledby="travel-type-heading">
      <SectionHeading
        id="travel-type-heading"
        align="center"
        eyebrow="Where Are You Headed?"
        title="Choose Your Travel Type"
      />

      <ul className="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-2 lg:mt-16">
        {TRAVEL_TYPES.map(({ icon: Icon, title, subtitle, description }) => (
          <li
            key={title}
            className="shadow-soft flex flex-col items-center gap-3 rounded-2xl border bg-white p-8 text-center"
          >
            <span className="bg-brand-blue-light text-brand-blue inline-flex size-14 items-center justify-center rounded-full">
              <Icon aria-hidden="true" className="size-7" />
            </span>
            <p className="text-muted-foreground text-xs font-bold tracking-[0.14em] uppercase">
              {title}
            </p>
            <p className="text-ink text-xl font-extrabold">{subtitle}</p>
            <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
            <Link
              href="#packages"
              className="text-brand-blue hover:text-brand-blue-dark group/link mt-2 inline-flex items-center gap-1.5 text-sm font-semibold"
            >
              Explore
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
