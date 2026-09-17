import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";

import { SECONDARY_SERVICE_PROMOS } from "../data/home.content";
import type { ServicePromo } from "../types/marketing.types";

/** Side-by-side promotion of the travel and technology service lines. */
export function TravelItSection() {
  return (
    <Section tone="surface" aria-labelledby="support-services-heading">
      <SectionHeading
        id="support-services-heading"
        eyebrow="Beyond Trade"
        title="Travel and Technology, Coordinated by the Same Team"
        description="The services around your business, arranged with the same care as the products within it."
        align="center"
      />
      <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-2">
        {SECONDARY_SERVICE_PROMOS.map((promo) => (
          <ServicePromoCard key={promo.eyebrow} promo={promo} />
        ))}
      </div>
    </Section>
  );
}

function ServicePromoCard({ promo }: { promo: ServicePromo }) {
  return (
    <article className="reveal group flex flex-col overflow-hidden rounded-2xl border bg-white">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={promo.image.src}
          alt={promo.image.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="from-navy/60 absolute inset-0 bg-gradient-to-t to-transparent"
        />
        <p className="text-ink absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold tracking-wide uppercase">
          <span aria-hidden="true" className="bg-brand-red size-1.5 rounded-full" />
          {promo.eyebrow}
        </p>
      </div>
      <div className="flex flex-1 flex-col gap-6 p-6 sm:p-8">
        <div className="space-y-3">
          <h3 className="text-ink text-2xl font-bold">{promo.title}</h3>
          <p className="text-muted-foreground leading-relaxed">{promo.description}</p>
        </div>
        <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {promo.items.map((item) => (
            <li
              key={item}
              className="text-ink flex items-center gap-2.5 text-sm font-medium"
            >
              <Check
                aria-hidden="true"
                className="text-brand-blue size-4 shrink-0"
                strokeWidth={2.5}
              />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-2">
          <Button
            asChild
            size="xl"
            variant="outline"
            className="text-ink w-full sm:w-auto"
          >
            <Link href={promo.cta.href}>
              {promo.cta.label}
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
