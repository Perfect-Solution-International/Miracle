"use client";

import { ArrowRight, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@/config/routes";
import { TRAVEL_PACKAGE_DETAILS } from "@/features/travel/data/travel-package-details.content";

import type { TravelPackageDetail } from "../../types/travel-package-detail.types";

/**
 * "More [Inbound|Outbound] Packages" section at the bottom of a package detail page.
 *
 * Filtering rules:
 * - Must share the same `travelDirection` as the current package.
 * - Must not be the current package itself.
 * - Shows up to 3 related packages.
 */
export function PackageRelatedSection({ detail }: { detail: TravelPackageDetail }) {
  const related = TRAVEL_PACKAGE_DETAILS.filter(
    (pkg) =>
      pkg.travelDirection === detail.travelDirection &&
      pkg.slug !== detail.slug,
  ).slice(0, 3);

  if (related.length === 0) return null;

  const sectionTitle =
    detail.travelDirection === "Inbound"
      ? "More Sri Lanka Inbound Packages"
      : "More International Outbound Packages";

  return (
    <section
      aria-labelledby="related-packages-heading"
      className="border-t bg-slate-50/70 py-12 lg:py-16"
    >
      <div className="container-page">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-brand-blue text-xs font-bold uppercase tracking-wider">
              {detail.travelDirection === "Inbound" ? "Sri Lanka Tours" : "International Holidays"}
            </p>
            <h2
              id="related-packages-heading"
              className="text-ink mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl"
            >
              {sectionTitle}
            </h2>
          </div>
          <Link
            href={
              detail.travelDirection === "Inbound"
                ? ROUTES.public.inboundTravel
                : ROUTES.public.outboundTravel
            }
            className="text-brand-blue hover:text-brand-blue-dark inline-flex items-center gap-1.5 text-sm font-bold transition-colors"
          >
            View All Packages
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((pkg) => (
            <li
              key={pkg.slug}
              className="group/card shadow-soft flex flex-col overflow-hidden rounded-2xl border bg-white transition-shadow hover:shadow-lift"
            >
              <Link
                href={ROUTES.public.travelPackage(pkg.slug)}
                className="flex flex-1 flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-2xl"
                aria-label={`View details for ${pkg.title}`}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden rounded-t-2xl">
                  <Image
                    src={pkg.image.src}
                    alt={pkg.image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                  />
                  <div className="from-navy/60 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
                  <span className="text-ink absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-0.5 text-xs font-bold shadow-sm">
                    <Calendar aria-hidden="true" className="text-brand-blue size-3.5" />
                    {pkg.duration.days}D / {pkg.duration.nights}N
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide">
                    <MapPin aria-hidden="true" className="text-brand-blue size-3.5" />
                    {pkg.location}
                  </div>
                  <h3 className="text-ink text-base font-bold leading-snug sm:text-lg">
                    {pkg.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                    {pkg.tagline}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <p className="text-ink text-sm font-extrabold">{pkg.startingPrice}</p>
                    <span className="text-brand-blue text-xs font-bold group-hover/card:underline">
                      View Package →
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
