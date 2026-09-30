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
      aria-labelledby="travel-services-heading"
      className="bg-white scroll-mt-24 py-12 lg:py-16 border-t border-slate-100"
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

          const cardBody = (
            <>
              <div className="bg-brand-blue-light text-brand-blue group-hover/card:bg-brand-blue inline-flex size-12 items-center justify-center rounded-xl transition-colors group-hover/card:text-white">
                <Icon aria-hidden="true" className="size-6" />
              </div>

              <div className="mt-4 flex-1">
                <h3 className="text-ink group-hover/card:text-brand-blue text-lg font-bold transition-colors">
                  {card.title}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-5 border-t border-slate-100 pt-4">
                <span className="text-brand-blue group-hover/card:text-brand-blue-dark inline-flex items-center gap-1.5 text-sm font-bold">
                  {card.cta}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover/card:translate-x-1"
                  />
                </span>
              </div>
            </>
          );

          return (
            <li key={card.title} className="h-full">
              {isCustomize && onOpenCustomize ? (
                <button
                  type="button"
                  onClick={onOpenCustomize}
                  className="group/card shadow-soft hover:shadow-lift hover:border-brand-blue/50 flex h-full w-full flex-col rounded-2xl border border-slate-200/90 bg-white p-6 text-left transition-all cursor-pointer"
                >
                  {cardBody}
                </button>
              ) : (
                <Link
                  href={card.href}
                  className="group/card shadow-soft hover:shadow-lift hover:border-brand-blue/50 flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white p-6 transition-all cursor-pointer"
                >
                  {cardBody}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
