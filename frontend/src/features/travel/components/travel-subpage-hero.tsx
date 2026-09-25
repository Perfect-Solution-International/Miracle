import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { Breadcrumb } from "@/components/common/breadcrumb";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import type { SiteImage } from "@/config/site-media";

export interface TravelSubpageAction {
  label: string;
  href: string;
  icon?: LucideIcon;
}

/**
 * Shared hero for the single-service Travel & Tourism pages (Inbound,
 * Outbound, Flight Tickets, Work Visa) — same light, two-column treatment as
 * the main Travel & Tourism hero, scoped to one service.
 */
export function TravelSubpageHero({
  breadcrumbLabel,
  title,
  description,
  image,
  primary,
  secondary,
}: {
  breadcrumbLabel: string;
  title: string;
  description: string;
  image: SiteImage;
  primary: TravelSubpageAction;
  secondary?: TravelSubpageAction;
}) {
  return (
    <section
      aria-labelledby="travel-subpage-hero-heading"
      className="bg-surface relative isolate overflow-hidden border-b"
    >
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10" />

      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16 md:py-24">
        <div className="flex flex-col items-start gap-6 text-left">
          <Breadcrumb
            items={[
              { label: "Travel & Tourism", href: ROUTES.public.travelTourism },
              { label: breadcrumbLabel },
            ]}
          />
          <h1
            id="travel-subpage-hero-heading"
            className="font-serif text-ink max-w-xl text-4xl leading-[1.08] font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            {title}
          </h1>
          <p className="text-muted-foreground max-w-lg text-base leading-relaxed sm:text-lg">
            {description}
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="accent" size="xl">
              <Link href={primary.href}>
                {primary.label}
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
            {secondary ? (
              <Button asChild variant="outline" size="xl">
                <Link href={secondary.href}>{secondary.label}</Link>
              </Button>
            ) : null}
          </div>
        </div>

        <div className="group relative isolate aspect-[4/5] overflow-hidden rounded-3xl border shadow-lift lg:aspect-square">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            preload
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="from-navy/35 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
