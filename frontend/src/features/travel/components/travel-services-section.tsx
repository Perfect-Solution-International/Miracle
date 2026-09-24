import { ArrowRight, Luggage, type LucideIcon } from "lucide-react";
import Link from "next/link";

import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";

import { TRAVEL_CATEGORIES } from "../data/travel.content";

interface ServiceCard {
  /** Anchor id this card owns, or `undefined` when it only links elsewhere. */
  id?: string;
  icon: LucideIcon;
  title: string;
  summary: string;
  href: string;
}

/** "Everything You Need for Your Journey" — every travel service as its own
 * card. Cards carry the anchor ids that nav and footer links target. */
export function TravelServicesSection() {
  const [visa, flights, workVisa, accommodation, guides, transport, businessTravel] =
    TRAVEL_CATEGORIES;

  const categoryCard = (category: (typeof TRAVEL_CATEGORIES)[number]): ServiceCard => ({
    // "business-travel" has its own dedicated section further down the page,
    // which owns that anchor id — this card only links to it.
    id: category.id === "business-travel" ? undefined : category.id,
    icon: category.icon,
    title: category.title,
    summary: category.summary,
    href: `#${category.id}`,
  });

  const cards: readonly ServiceCard[] = [visa, flights, workVisa, accommodation]
    .filter((category): category is NonNullable<typeof category> => Boolean(category))
    .map(categoryCard)
    .concat({
      icon: Luggage,
      title: "Travel Packages",
      summary: "Ready-made itineraries across Sri Lanka and popular international destinations.",
      href: "#packages",
    })
    .concat(
      [guides, transport, businessTravel]
        .filter((category): category is NonNullable<typeof category> => Boolean(category))
        .map(categoryCard),
    );

  return (
    <Section id="services" aria-labelledby="travel-services-heading" className="scroll-mt-24">
      <SectionHeading
        id="travel-services-heading"
        align="center"
        eyebrow="What We Arrange"
        title="Everything You Need for Your Journey"
      />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <li
              key={card.title}
              id={card.id}
              className="group/card shadow-soft scroll-mt-24 flex flex-col gap-4 rounded-2xl border bg-white p-6 transition-shadow hover:shadow-lift"
            >
              <span className="bg-brand-blue-light text-brand-blue group-hover/card:bg-brand-blue inline-flex size-11 items-center justify-center rounded-xl transition-colors group-hover/card:text-white">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <div className="flex-1 space-y-1.5">
                <p className="text-ink text-base font-bold">{card.title}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {card.summary}
                </p>
              </div>
              <Link
                href={card.href}
                className="text-brand-blue hover:text-brand-blue-dark group/link inline-flex items-center gap-1.5 text-sm font-semibold"
              >
                Explore
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
