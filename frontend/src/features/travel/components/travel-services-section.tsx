import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";

import { TRAVEL_SERVICE_CARDS } from "../data/travel.content";

/** "Travel Services" — the five core services, each linking to its own page. */
export function TravelServicesSection() {
  return (
    <Section id="services" aria-labelledby="travel-services-heading" className="scroll-mt-24">
      <SectionHeading
        id="travel-services-heading"
        align="center"
        eyebrow="Explore Travel & Tourism"
        title="Travel & Tourism Services"
      />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-5">
        {TRAVEL_SERVICE_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <li
              key={card.title}
              className="group/card shadow-soft flex flex-col gap-4 rounded-2xl border bg-white p-6 transition-shadow hover:shadow-lift"
            >
              <span className="bg-brand-blue-light text-brand-blue group-hover/card:bg-brand-blue inline-flex size-11 items-center justify-center rounded-xl transition-colors group-hover/card:text-white">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <div className="flex-1 space-y-1.5">
                <p className="text-ink text-base font-bold">{card.title}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
              <Link
                href={card.href}
                className="text-brand-blue hover:text-brand-blue-dark group/link inline-flex items-center gap-1.5 text-sm font-semibold"
              >
                {card.cta}
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover/link:translate-x-1"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
