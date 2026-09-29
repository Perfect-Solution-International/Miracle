"use client";

import {
  ArrowRight,
  Bed,
  Calendar,
  Car,
  Check,
  Compass,
  FileCheck,
  Globe2,
  MapPin,
  ShieldCheck,
  Users,
  X,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";

import type { TravelPackageDetail } from "../types/travel-package-detail.types";

export interface PackageDetailModalProps {
  pkg: TravelPackageDetail | null;
  open: boolean;
  onClose: () => void;
  onCustomize?: (pkg: TravelPackageDetail) => void;
  onBook?: (pkg: TravelPackageDetail) => void;
}

export function PackageDetailModal({
  pkg,
  open,
  onClose,
  onCustomize,
  onBook,
}: PackageDetailModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open || !pkg) return null;

  const isInbound = pkg.location.toLowerCase().includes("sri lanka");
  const primaryImage = pkg.secondaryImage ?? pkg.image;

  return (
    <div
      className="bg-navy/45 fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="package-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="bg-popover text-popover-foreground relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl shadow-2xl border border-slate-200/80">
        {/* ── Modal Header / Title Bar ── */}
        <div className="relative border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-brand-blue-light/20 px-6 py-5 pr-14 sm:px-8 sm:py-6">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close package details"
            className="text-muted-foreground hover:bg-slate-100 hover:text-ink absolute top-5 right-5 z-10 inline-flex size-9 items-center justify-center rounded-full transition-colors"
          >
            <X aria-hidden="true" className="size-5" />
          </button>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider",
                isInbound
                  ? "bg-brand-blue-light text-brand-blue border border-brand-blue/20"
                  : "bg-brand-red/10 text-brand-red border border-brand-red/20",
              )}
            >
              <Globe2 aria-hidden="true" className="size-3.5" />
              {isInbound ? "Inbound Sri Lanka" : "Outbound International"}
            </span>

            <span className="bg-slate-100 text-ink inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold">
              <MapPin aria-hidden="true" className="text-brand-blue size-3.5" />
              {pkg.location}
            </span>

            <span className="bg-slate-100 text-ink inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold">
              <Calendar aria-hidden="true" className="text-brand-blue size-3.5" />
              {pkg.duration.days} Days / {pkg.duration.nights} Nights
            </span>

            <span className="bg-slate-100 text-ink inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold">
              <Users aria-hidden="true" className="text-brand-blue size-3.5" />
              {pkg.travelers}
            </span>
          </div>

          {/* Title & Introduction */}
          <div className="mt-3">
            <h2
              id="package-modal-title"
              className="text-ink text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl"
            >
              {pkg.title}
            </h2>
            <p className="text-muted-foreground mt-2 max-w-3xl text-sm leading-relaxed sm:text-base">
              {pkg.about}
            </p>
          </div>
        </div>

        {/* ── Scrollable Modal Body ── */}
        <div className="overflow-y-auto px-6 py-6 sm:px-8 space-y-8">
          {/* ── 1. Included Services & Features Bar ── */}
          <div>
            <div className="flex items-center gap-2 mb-3.5">
              <span className="size-2 rounded-full bg-brand-blue" aria-hidden="true" />
              <h3 className="text-ink text-xs font-bold uppercase tracking-wider">
                What Is Included in This Package
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {pkg.included.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2.5 rounded-xl border border-slate-200/90 bg-white p-3 text-sm transition-colors hover:border-brand-blue/30 shadow-xs"
                >
                  <span className="bg-brand-blue text-white mt-0.5 inline-flex size-4.5 shrink-0 items-center justify-center rounded-full">
                    <Check aria-hidden="true" className="size-3 stroke-[3]" />
                  </span>
                  <span className="text-ink font-semibold leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── 2. Clean Left-Content / Right-Image Layout: "What to Expect" ── */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              {/* Left Column (What to Expect Details) */}
              <div className="flex flex-col gap-4 lg:col-span-7">
                <div>
                  <p className="text-brand-red text-xs font-bold tracking-wider uppercase">
                    Travel Experience
                  </p>
                  <h3 className="text-ink mt-1 text-xl font-bold sm:text-2xl">
                    What to Expect
                  </h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Key highlights, activities, and experiences carefully coordinated for you.
                  </p>
                </div>

                <div className="space-y-3.5 mt-2">
                  {pkg.whatToExpect.map((item, index) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-3.5 rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-xs"
                    >
                      <span className="bg-brand-blue text-white flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold mt-0.5">
                        0{index + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-ink text-sm font-bold">{item.title}</h4>
                          {item.badge ? (
                            <span className="bg-brand-blue-light text-brand-blue rounded-md px-1.5 py-0.5 text-[10px] font-bold">
                              {item.badge}
                            </span>
                          ) : null}
                        </div>
                        <p className="text-muted-foreground mt-1 text-xs sm:text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column (High-Quality Travel Media matching this package) */}
              <div className="flex flex-col gap-3.5 lg:col-span-5">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-200 shadow-md">
                  <Image
                    src={pkg.image.src}
                    alt={pkg.image.alt}
                    fill
                    sizes="(min-width: 1024px) 400px, 100vw"
                    className="object-cover"
                  />
                  <div className="from-navy/70 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <span className="text-xs font-bold drop-shadow-sm flex items-center gap-1.5">
                      <MapPin className="size-3.5 text-brand-blue-muted" />
                      {pkg.location}
                    </span>
                    <span className="rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-bold text-navy shadow-xs">
                      {pkg.duration.days} Days Tour
                    </span>
                  </div>
                </div>

                {/* Secondary contextual image */}
                {primaryImage !== pkg.image ? (
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-slate-200 shadow-xs">
                    <Image
                      src={primaryImage.src}
                      alt={primaryImage.alt}
                      fill
                      sizes="(min-width: 1024px) 400px, 100vw"
                      className="object-cover"
                    />
                    <div className="from-navy/50 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-2.5 text-[11px] font-semibold text-white drop-shadow-sm">
                      {primaryImage.alt}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* ── 3. Practical Information & Logistics ── */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Accommodation & Transport */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-4.5 flex flex-col gap-2 shadow-xs">
              <div className="flex items-center gap-2 text-brand-blue">
                <Bed className="size-4.5" />
                <h4 className="text-ink text-sm font-bold">Accommodation &amp; Stays</h4>
              </div>
              <p className="text-ink text-xs font-semibold">{pkg.accommodation.title}</p>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {pkg.accommodation.note}
              </p>
            </div>

            {/* Transportation */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-4.5 flex flex-col gap-2 shadow-xs">
              <div className="flex items-center gap-2 text-brand-blue">
                <Car className="size-4.5" />
                <h4 className="text-ink text-sm font-bold">Dedicated Transportation</h4>
              </div>
              <p className="text-ink text-xs font-semibold">{pkg.transportation.title}</p>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {pkg.transportation.note}
              </p>
            </div>

            {/* Visa & Travel Support */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-4.5 flex flex-col gap-2 sm:col-span-2 lg:col-span-1 shadow-xs">
              <div className="flex items-center gap-2 text-brand-blue">
                <FileCheck className="size-4.5" />
                <h4 className="text-ink text-sm font-bold">Visa &amp; Entry Support</h4>
              </div>
              <p className="text-ink text-xs font-semibold">
                {isInbound ? "Sri Lanka ETA Assistance" : "Destination Visa Guidance"}
              </p>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {pkg.visaInformation[0] ??
                  "Our team provides verified documentation and step-by-step guidance."}
              </p>
            </div>
          </div>

          {/* Destinations covered tag strip */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
            <span className="text-muted-foreground text-xs font-bold uppercase">
              Destinations Covered:
            </span>
            {pkg.destinations.map((dest) => (
              <span
                key={dest}
                className="bg-white border border-slate-200/80 text-ink rounded-lg px-2.5 py-1 text-xs font-medium"
              >
                {dest}
              </span>
            ))}
          </div>
        </div>

        {/* ── Modal Footer Bar ── */}
        <div className="border-t border-slate-100 bg-white px-6 py-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-muted-foreground block text-xs">Starting Quote</span>
            <span className="text-ink text-lg font-extrabold">{pkg.startingPrice}</span>
            <span className="text-muted-foreground ml-1.5 text-xs">
              · Final quotation customized to your party size
            </span>
          </div>

          <div className="flex flex-wrap w-full sm:w-auto items-center gap-2.5">
            <Button
              variant="outline"
              size="default"
              className="flex-1 sm:flex-initial"
              asChild
            >
              <Link href={ROUTES.public.travelPackage(pkg.slug)} onClick={onClose}>
                Full Page
                <ExternalLink className="size-3.5 ml-1.5" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="default"
              className="flex-1 sm:flex-initial"
              onClick={() => {
                onClose();
                if (onCustomize) {
                  onCustomize(pkg);
                } else {
                  window.location.href = `${ROUTES.public.travelTourism}#customize-trip`;
                }
              }}
            >
              Customize Trip
            </Button>

            <Button
              variant="accent"
              size="default"
              className="w-full sm:w-auto"
              onClick={() => {
                onClose();
                if (onBook) {
                  onBook(pkg);
                } else if (onCustomize) {
                  onCustomize(pkg);
                } else {
                  window.location.href = `${ROUTES.public.travelTourism}#customize-trip`;
                }
              }}
            >
              Send Inquiry
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
