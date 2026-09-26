import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";

import { TRAVEL_SERVICE_CARDS, type TravelServiceCard } from "../data/travel.content";

export function TravelServicesSection({
  onOpenCustomize,
}: {
  onOpenCustomize?: () => void;
}) {
  return (
    <Section
      id="services"
      tone="surface"
      aria-labelledby="travel-services-heading"
      className="scroll-mt-24 py-12 lg:py-16"
    >
      <SectionHeading
        id="travel-services-heading"
        align="center"
        eyebrow="Explore Solutions"
        title="Travel & Tourism Services"
      />

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TRAVEL_SERVICE_CARDS.map((card: TravelServiceCard) => {
          const Icon = card.icon;
          const isCustomize = card.title === "Customized Trips";

          return (
            <li
              key={card.title}
              className="group/card shadow-soft hover:shadow-lift flex flex-col rounded-2xl border bg-white p-6 transition-all"
            >
              <div className="bg-brand-blue-light text-brand-blue group-hover/card:bg-brand-blue inline-flex size-12 items-center justify-center rounded-xl transition-colors group-hover/card:text-white">
                <Icon aria-hidden="true" className="size-6" />
              </div>

              <div className="mt-4 flex-1">
                <h3 className="text-ink text-lg font-bold">{card.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-5 border-t border-slate-100 pt-4">
                {isCustomize && onOpenCustomize ? (
                  <button
                    type="button"
                    onClick={onOpenCustomize}
                    className="text-brand-blue hover:text-brand-blue-dark group/link inline-flex items-center gap-1.5 text-sm font-bold"
                  >
                    {card.cta}
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform group-hover/link:translate-x-1"
                    />
                  </button>
                ) : (
                  <Link
                    href={card.href}
                    className="text-brand-blue hover:text-brand-blue-dark group/link inline-flex items-center gap-1.5 text-sm font-bold"
                  >
                    {card.cta}
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform group-hover/link:translate-x-1"
                    />
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
