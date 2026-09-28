"use client";

import { ArrowRight, CalendarDays, Compass, MapPin, SlidersHorizontal, Star, Users } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Breadcrumb } from "@/components/common/breadcrumb";
import { Button } from "@/components/ui/button";
import { PublicTravelInquiryModal } from "@/components/travel/public-travel-inquiry-modal";
import { ROUTES } from "@/config/routes";

import type { TravelPackageDetail } from "../../types/travel-package-detail.types";

/**
 * Package detail banner: full-bleed photo, breadcrumb, package overview card,
 * and a "Send Inquiry" CTA that opens the existing travel inquiry modal
 * pre-filled with this package's info. No customer login required.
 */
export function PackageHero({ detail }: { detail: TravelPackageDetail }) {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  // Map the static TravelPackageDetail into the shape the inquiry modal expects
  const inquiryPackage = {
    id: detail.slug,
    slug: detail.slug,
    name: detail.title,
    travelType: detail.travelDirection,
    destination: detail.location,
    country: detail.location,
    duration: `${detail.duration.days} Days / ${detail.duration.nights} Nights`,
    price: null,
    currency: (detail.travelDirection === "Inbound" ? "USD" : "USD") as "USD" | "LKR",
    shortDescription: detail.tagline,
    description: detail.about,
    highlights: detail.highlights as string[],
    includedItems: detail.included as string[],
    images: [detail.image.src],
    coverImage: detail.image.src,
    status: "Active" as const,
    createdAt: "",
  };

  return (
    <>
      <section className="bg-surface border-b">
        <div className="container-page pt-8 pb-10 md:pt-10 md:pb-14">
          {/* Hero Image */}
          <div className="relative aspect-[16/7] overflow-hidden rounded-3xl shadow-sm">
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
              {
                label:
                  detail.travelDirection === "Inbound" ? "Inbound Tours" : "Outbound Tours",
                href:
                  detail.travelDirection === "Inbound"
                    ? ROUTES.public.inboundTravel
                    : ROUTES.public.outboundTravel,
              },
              { label: detail.title },
            ]}
          />

          {/* Package Summary Card */}
          <div className="shadow-lift mt-6 flex flex-col gap-6 rounded-3xl border bg-white p-6 sm:p-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-4">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                {detail.popular ? (
                  <span className="bg-brand-red/10 text-brand-red inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold">
                    <Star aria-hidden="true" className="size-3.5" />
                    Popular Package
                  </span>
                ) : null}
                <span className="bg-slate-100 text-ink inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold">
                  <Compass aria-hidden="true" className="text-brand-blue size-3.5" />
                  {detail.travelDirection} Tour
                </span>
                <span className="bg-slate-100 text-ink inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold">
                  <MapPin aria-hidden="true" className="text-brand-blue size-3.5" />
                  {detail.location}
                </span>
                <span className="bg-slate-100 text-ink inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold">
                  <Users aria-hidden="true" className="text-brand-blue size-3.5" />
                  {detail.travelers}
                </span>
              </div>

              {/* Title & tagline */}
              <div>
                <h1 className="text-ink text-3xl leading-tight font-extrabold sm:text-4xl">
                  {detail.title}
                </h1>
                <p className="text-muted-foreground mt-1 max-w-xl text-base leading-relaxed">
                  {detail.tagline}
                </p>
              </div>

              {/* Duration & price */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
                <span className="text-ink inline-flex w-fit items-center gap-1.5 text-sm font-semibold">
                  <CalendarDays aria-hidden="true" className="text-brand-blue size-4" />
                  {detail.duration.days} Days / {detail.duration.nights} Nights
                </span>
                <span className="text-brand-blue text-base font-extrabold">
                  {detail.startingPrice}
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              <Button
                variant="accent"
                size="xl"
                onClick={() => setInquiryOpen(true)}
                className="gap-2"
                id="hero-send-inquiry-btn"
              >
                Send Inquiry
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Button>
              <Button
                variant="outline"
                size="xl"
                onClick={() => setInquiryOpen(true)}
                className="gap-2"
                id="hero-customize-btn"
              >
                <SlidersHorizontal aria-hidden="true" className="size-4" />
                Customize This Package
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Modal – pre-filled with package data */}
      <PublicTravelInquiryModal
        open={inquiryOpen}
        onOpenChange={setInquiryOpen}
        defaultPackage={inquiryPackage}
        defaultInquiryType={detail.travelDirection === "Inbound" ? "Inbound Tour" : "Outbound Tour"}
      />
    </>
  );
}
