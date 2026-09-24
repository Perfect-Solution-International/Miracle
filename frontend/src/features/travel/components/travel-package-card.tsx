import { ArrowRight, Calendar, Check, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

import type { TravelPackageDetail } from "../types/travel-package-detail.types";

/** Premium package card for the "Featured Travel Packages" grid. */
export function TravelPackageCard({ pkg }: { pkg: TravelPackageDetail }) {
  return (
    <li className="shadow-soft group/card flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition-shadow hover:shadow-lift">
      <div className="relative h-52 overflow-hidden">
        <Image
          src={pkg.image.src}
          alt={pkg.image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover/card:scale-105"
        />
        <div className="from-navy/70 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />

        {pkg.popular ? (
          <span className="bg-brand-red absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-white">
            <Star aria-hidden="true" className="size-3.5" />
            Popular
          </span>
        ) : null}
        <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-ink">
          <Calendar aria-hidden="true" className="text-brand-blue size-3.5" />
          {pkg.duration.days}D / {pkg.duration.nights}N
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase">
          <MapPin aria-hidden="true" className="size-3.5" />
          {pkg.location}
        </div>

        <p className="text-ink text-lg font-bold">{pkg.title}</p>
        <p className="text-muted-foreground text-sm leading-relaxed">{pkg.tagline}</p>

        <ul className="space-y-1.5">
          {pkg.highlights.slice(0, 3).map((highlight) => (
            <li key={highlight} className="flex items-start gap-2 text-sm">
              <Check aria-hidden="true" className="text-brand-blue mt-0.5 size-4 shrink-0" />
              <span className="text-ink/80">{highlight}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-4 pt-3">
          <p className="text-ink text-base font-extrabold">{pkg.startingPrice}</p>
          <Button asChild className="w-full">
            <Link href={ROUTES.public.travelPackage(pkg.slug)}>
              View Package
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </li>
  );
}
