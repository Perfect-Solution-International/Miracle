import { ArrowRight, Calendar, Check, Compass, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

import type { TravelPackageDetail } from "../types/travel-package-detail.types";

/**
 * Package card for the "Explore Our Travel Packages" grid with compact,
 * balanced image dimensions and clear travel metadata.
 */
export function TravelPackageCard({
  pkg,
  onCustomize,
}: {
  pkg: TravelPackageDetail;
  onCustomize?: (pkg: TravelPackageDetail) => void;
}) {
  return (
    <li className="shadow-soft group/card flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition-shadow hover:shadow-lift">
      {/* Compact Image Header */}
      <div className="relative h-44 overflow-hidden sm:h-48">
        <Image
          src={pkg.image.src}
          alt={pkg.image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover/card:scale-105"
        />
        <div className="from-navy/70 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {pkg.popular ? (
            <span className="bg-brand-red inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold text-white shadow-sm">
              <Star aria-hidden="true" className="size-3" />
              Popular
            </span>
          ) : null}
          <span className="bg-white/90 text-brand-blue inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold uppercase shadow-sm">
            <Compass aria-hidden="true" className="size-3" />
            {pkg.travelType}
          </span>
        </div>

        <span className="text-ink absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-0.5 text-xs font-bold shadow-sm">
          <Calendar aria-hidden="true" className="text-brand-blue size-3.5" />
          {pkg.duration.days}D / {pkg.duration.nights}N
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase">
          <MapPin aria-hidden="true" className="text-brand-blue size-3.5" />
          {pkg.location}
        </div>

        <h3 className="text-ink text-lg font-bold sm:text-xl">{pkg.title}</h3>
        <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
          {pkg.tagline}
        </p>

        <ul className="mt-1 space-y-1.5">
          {pkg.highlights.slice(0, 3).map((highlight) => (
            <li key={highlight} className="flex items-start gap-2 text-sm">
              <Check aria-hidden="true" className="text-brand-blue mt-0.5 size-4 shrink-0" />
              <span className="text-ink/80 line-clamp-1">{highlight}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-3 pt-3">
          <p className="text-ink text-base font-extrabold">{pkg.startingPrice}</p>
          <div className="flex gap-2.5">
            <Button asChild className="flex-1" size="default">
              <Link href={ROUTES.public.travelPackage(pkg.slug)}>
                View Package
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
            {onCustomize ? (
              <Button
                type="button"
                variant="outline"
                size="default"
                className="flex-1"
                onClick={() => onCustomize(pkg)}
              >
                Customize
              </Button>
            ) : (
              <Button asChild variant="outline" size="default" className="flex-1">
                <Link href={`${ROUTES.public.travelTourism}#customize-trip`}>Customize</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
