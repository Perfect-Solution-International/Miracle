import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

import { TRAVEL_PACKAGES } from "../data/travel.content";

/**
 * Illustrative package categories, not fixed bookable inventory — every card
 * leads to the inquiry form since there is no backend catalogue yet.
 */
export function TravelPackagesSection() {
  return (
    <Section
      id="packages"
      tone="surface"
      aria-labelledby="packages-heading"
      className="scroll-mt-24"
    >
      <SectionHeading
        id="packages-heading"
        align="center"
        eyebrow="Featured Travel Packages"
        title="Discover Our Popular Travel Options"
        description="Or tell us your dates, destinations and budget, and we'll create a package that fits."
      />

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
        {TRAVEL_PACKAGES.map(({ icon: Icon, image, title, description, cta }) => (
          <li
            key={title}
            className="shadow-soft flex h-full flex-col overflow-hidden rounded-2xl border bg-white"
          >
            <div className="relative h-40 overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="from-navy/60 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
              <span className="bg-brand-blue absolute bottom-3 left-3 inline-flex size-9 items-center justify-center rounded-full text-white">
                <Icon aria-hidden="true" className="size-4.5" />
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-4 p-6">
              <div className="flex-1 space-y-2">
                <p className="text-ink text-lg font-bold">{title}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {description}
                </p>
              </div>
              <Button asChild variant="outline" className="text-ink w-full">
                <Link href={ROUTES.public.tellUsWhatYouNeed}>
                  {cta}
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
