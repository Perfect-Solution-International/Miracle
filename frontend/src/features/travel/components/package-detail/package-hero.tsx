import { ArrowRight, CalendarDays, MapPin, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Breadcrumb } from "@/components/common/breadcrumb";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

import type { TravelPackageDetail } from "../../types/travel-package-detail.types";

/**
 * Package detail banner: full-bleed photo, breadcrumb, then a card carrying
 * the title, at-a-glance badges and the two funnel actions. Both actions lead
 * to the shared inquiry form — there is no per-package booking flow yet.
 */
export function PackageHero({ detail }: { detail: TravelPackageDetail }) {
  return (
    <section className="bg-surface border-b">
      <div className="container-page pt-8 pb-10 md:pt-10 md:pb-14">
        <div className="relative aspect-[16/7] overflow-hidden rounded-3xl">
          <Image
            src={detail.image.src}
            alt={detail.image.alt}
            fill
            preload
            sizes="(min-width: 1024px) 1100px, 100vw"
            className="object-cover"
          />
          <div className="from-navy/70 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
        </div>

        <Breadcrumb
          className="mt-6"
          items={[
            { label: "Travel & Tourism", href: ROUTES.public.travelTourism },
            { label: "Packages", href: `${ROUTES.public.travelTourism}#packages` },
            { label: detail.title },
          ]}
        />

        <div className="shadow-lift mt-6 flex flex-col gap-6 rounded-3xl border bg-white p-6 sm:p-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {detail.popular ? (
                <span className="bg-brand-red/10 text-brand-red inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold">
                  <Star aria-hidden="true" className="size-3.5" />
                  Popular Package
                </span>
              ) : null}
              <span className="bg-surface text-muted-foreground inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold">
                <MapPin aria-hidden="true" className="size-3.5" />
                {detail.location}
              </span>
              <span className="bg-surface text-muted-foreground inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold">
                <Users aria-hidden="true" className="size-3.5" />
                {detail.travelers}
              </span>
            </div>

            <div>
              <h1 className="text-ink text-3xl leading-tight font-extrabold sm:text-4xl">
                {detail.title}
              </h1>
              <p className="text-muted-foreground mt-1 max-w-xl text-base leading-relaxed">
                {detail.tagline}
              </p>
            </div>

            <span className="text-ink inline-flex w-fit items-center gap-1.5 text-sm font-semibold">
              <CalendarDays aria-hidden="true" className="text-brand-blue size-4" />
              {detail.duration.days} Days / {detail.duration.nights} Nights
            </span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
            <Button asChild variant="accent" size="xl">
              <Link href={ROUTES.public.tellUsWhatYouNeed}>
                Request This Package
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link href={ROUTES.public.tellUsWhatYouNeed}>Customize Package</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
