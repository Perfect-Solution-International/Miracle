"use client";

import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  Calendar,
  CalendarDays,
  Car,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  FileText,
  Globe2,
  Headphones,
  Info,
  MapPin,
  Mail,
  MessageSquare,
  Palmtree,
  Phone,
  Plane,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Stamp,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Breadcrumb } from "@/components/common/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PublicTravelInquiryModal } from "@/components/travel/public-travel-inquiry-modal";
import { CustomizeTripModal } from "@/features/travel/components/customize-trip-section";
import { PackageReviewsSection } from "./package-reviews-section";
import { ROUTES } from "@/config/routes";
import { getStoredPackages } from "@/lib/storage/travel-store";
import type { TravelPackage } from "@/components/admin-travel/types";

import { getPackageCoverImage } from "@/lib/travel/package-image-helper";

export function AdminPackageDetailPage({ pkg }: { pkg: TravelPackage }) {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [customizeOpen, setCustomizeOpen] = useState(false);

  const isInbound = pkg.travelType === "Inbound";
  const coverImage = getPackageCoverImage(pkg);

  // Price formatting
  const formattedPrice =
    pkg.price != null
      ? `${pkg.currency === "LKR" ? "LKR" : "USD"} ${pkg.price.toLocaleString()}`
      : null;

  return (
    <>
      {/* Top Hero Section */}
      <section className="bg-white border-b border-slate-100">
        <div className="container-page pt-6 pb-8 md:pt-8 md:pb-10">
          {/* Breadcrumb Navigation */}
          <Breadcrumb
            items={[
              { label: "Travel & Tourism", href: ROUTES.public.travelTourism },
              {
                label: isInbound ? "Inbound Tours" : "Outbound Tours",
                href: isInbound ? ROUTES.public.inboundTravel : ROUTES.public.outboundTravel,
              },
              { label: pkg.name },
            ]}
          />

          {/* Hero Banner with Cover Image */}
          <div className="relative mt-6 aspect-[16/8] sm:aspect-[21/9] lg:aspect-[24/9] overflow-hidden rounded-3xl shadow-sm bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverImage}
              alt={pkg.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />

            {/* Badges on Hero */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap items-center gap-2">
              <Badge
                className={
                  isInbound
                    ? "bg-emerald-600 text-white font-bold text-xs px-3 py-1 shadow-sm"
                    : "bg-blue-600 text-white font-bold text-xs px-3 py-1 shadow-sm"
                }
              >
                {isInbound ? "Sri Lanka Inbound Tour" : "International Outbound Tour"}
              </Badge>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-white text-xs font-semibold">
                <Clock className="size-3.5 text-sky-300" />
                {pkg.duration}
              </span>
            </div>

            {/* Hero Overlay Content */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 text-white">
              <p className="text-xs sm:text-sm font-semibold flex items-center gap-1.5 text-sky-200 mb-1.5 drop-shadow-sm">
                <MapPin className="size-4 shrink-0" />
                <span>
                  {pkg.destination}
                  {pkg.country ? ` (${pkg.country})` : ""}
                </span>
              </p>
              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white drop-shadow-md max-w-4xl">
                {pkg.name}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area - 2-Column Desktop Layout */}
      <section className="bg-white py-10 lg:py-14">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* ── LEFT COLUMN: Tour Information & Details (8 Cols) ── */}
            <div className="lg:col-span-8 space-y-10">

              {/* 1. Quick Stats Header Strip */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-soft flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-brand-blue-light text-brand-blue shrink-0">
                    <Clock className="size-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                      Duration
                    </span>
                    <span className="text-sm font-bold text-ink">{pkg.duration}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-brand-blue-light text-brand-blue shrink-0">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                      Destination
                    </span>
                    <span className="text-sm font-bold text-ink">{pkg.destination}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-brand-blue-light text-brand-blue shrink-0">
                    <Compass className="size-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                      Travel Type
                    </span>
                    <span className="text-sm font-bold text-ink">{pkg.travelType}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shrink-0">
                    <ShieldCheck className="size-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                      Inquiry Desk
                    </span>
                    <span className="text-sm font-bold text-emerald-700">No Booking Fee</span>
                  </div>
                </div>
              </div>

              {/* 2. Package Overview */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-soft space-y-4">
                <div className="flex items-center gap-2 text-brand-blue">
                  <FileText className="size-5" />
                  <h2 className="text-xs font-bold uppercase tracking-wider">Package Overview</h2>
                </div>
                <h3 className="font-heading text-2xl font-extrabold text-ink">
                  About This Itinerary
                </h3>
                {pkg.shortDescription ? (
                  <p className="text-sm sm:text-base text-ink font-medium leading-relaxed bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                    {pkg.shortDescription}
                  </p>
                ) : null}
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                  {pkg.description || "No full description provided for this package."}
                </p>
              </div>

              {/* 3. Package Highlights */}
              {pkg.highlights && pkg.highlights.length > 0 ? (
                <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-soft space-y-6">
                  <div className="flex items-center gap-2 text-brand-blue">
                    <Sparkles className="size-5 text-amber-500" />
                    <h2 className="text-xs font-bold uppercase tracking-wider">Tour Highlights</h2>
                  </div>
                  <h3 className="font-heading text-2xl font-extrabold text-ink">
                    What Makes This Tour Special
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {pkg.highlights.map((hl, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 transition-all hover:border-brand-blue/40 shadow-xs hover:shadow-soft"
                      >
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white text-xs font-bold mt-0.5 shadow-xs">
                          {i + 1}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-ink leading-relaxed">
                          {typeof hl === "string" ? hl : hl.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* 4. Day-by-Day Itinerary */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-soft space-y-6">
                <div className="flex items-center gap-2 text-brand-blue">
                  <Calendar className="size-5" />
                  <h2 className="text-xs font-bold uppercase tracking-wider">Tour Itinerary</h2>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h3 className="font-heading text-2xl font-extrabold text-ink">
                    Day-by-Day Journey Plan
                  </h3>
                  <Badge variant="outline" className="text-xs font-semibold self-start sm:self-auto bg-white">
                    {pkg.duration}
                  </Badge>
                </div>

                {pkg.itinerary && pkg.itinerary.length > 0 ? (
                  <div className="relative pl-6 sm:pl-8 border-l-2 border-brand-blue/20 space-y-8 mt-6">
                    {pkg.itinerary.map((item, idx) => (
                      <div key={idx} className="relative group">
                        {/* Timeline Node */}
                        <span className="absolute -left-[31px] sm:-left-[39px] top-0 flex size-7 items-center justify-center rounded-full bg-brand-blue text-white text-xs font-bold shadow-sm">
                          {item.day}
                        </span>

                        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 transition-all group-hover:border-brand-blue/30 shadow-xs group-hover:shadow-soft">
                          <span className="text-[11px] font-bold text-brand-blue uppercase tracking-wider block">
                            Day {String(item.day).padStart(2, "0")}
                          </span>
                          <h4 className="text-base sm:text-lg font-bold text-ink mt-0.5">
                            {item.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                            {item.description}
                          </p>
                          {item.image ? (
                            <div className="mt-3 aspect-[16/9] max-h-48 overflow-hidden rounded-xl bg-slate-100 border border-slate-100">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={item.image}
                                alt={item.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center space-y-2">
                    <Info className="size-6 text-brand-blue mx-auto" />
                    <p className="text-sm font-semibold text-ink">
                      Itinerary details will be provided upon inquiry.
                    </p>
                    <p className="text-xs text-muted-foreground max-w-md mx-auto">
                      Our travel consultants tailor daily activities and stops to your flight schedule, group size, and personal preferences.
                    </p>
                  </div>
                )}
              </div>

              {/* 5. What's Included */}
              {pkg.includedItems && pkg.includedItems.length > 0 ? (
                <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-soft space-y-6">
                  <div className="flex items-center gap-2 text-brand-blue">
                    <CheckCircle2 className="size-5 text-emerald-600" />
                    <h2 className="text-xs font-bold uppercase tracking-wider">Package Inclusions</h2>
                  </div>
                  <h3 className="font-heading text-2xl font-extrabold text-ink">
                    What&apos;s Included in This Package
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {pkg.includedItems.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-white px-4 py-3 shadow-xs"
                      >
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
                          <Check className="size-3.5 stroke-[2.5]" />
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-ink">{item}</span>
                      </div>
                    ))}
                  </div>

                  {pkg.includedServices ? (
                    <div className="mt-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-ink">Included Services:</strong> {pkg.includedServices}
                    </div>
                  ) : null}

                  {/* Accommodation & Transport Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {pkg.accommodation ? (
                      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 space-y-2 shadow-xs">
                        <div className="flex items-center gap-2 text-brand-blue">
                          <BedDouble className="size-4.5" />
                          <span className="text-xs font-bold uppercase tracking-wider">Accommodation</span>
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-ink">{pkg.accommodation}</p>
                      </div>
                    ) : null}

                    {pkg.transportation ? (
                      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 space-y-2 shadow-xs">
                        <div className="flex items-center gap-2 text-brand-blue">
                          <Car className="size-4.5" />
                          <span className="text-xs font-bold uppercase tracking-wider">Transportation</span>
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-ink">{pkg.transportation}</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {/* Photo Gallery */}
              {pkg.images && pkg.images.length > 0 ? (
                <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-soft space-y-6">
                  <div className="flex items-center gap-2 text-brand-blue">
                    <Palmtree className="size-5" />
                    <h2 className="text-xs font-bold uppercase tracking-wider">Photo Gallery</h2>
                  </div>
                  <h3 className="font-heading text-2xl font-extrabold text-ink">
                    Visual Impressions
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                    {pkg.images.map((src, i) => (
                      <div
                        key={i}
                        className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white border border-slate-100 group/img shadow-xs"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={src}
                          alt={`${pkg.name} photo ${i + 1}`}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* 9. Interactive Customer Reviews */}
              <PackageReviewsSection
                packageSlug={pkg.slug || pkg.id}
                packageName={pkg.name}
              />

            </div>

            {/* ── RIGHT COLUMN: Sticky Package Summary Card (4 Cols) ── */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
              <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-lift space-y-6">
                
                {/* Price Display */}
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                    Starting Quote
                  </span>
                  {formattedPrice ? (
                    <div className="mt-1">
                      <span className="font-heading text-3xl sm:text-4xl font-extrabold text-navy dark:text-foreground">
                        {formattedPrice}
                      </span>
                      <span className="text-xs text-muted-foreground block mt-0.5">
                        Per person based on twin sharing
                      </span>
                    </div>
                  ) : (
                    <div className="mt-1">
                      <span className="font-heading text-2xl font-extrabold text-brand-blue">
                        Price on Request
                      </span>
                      <span className="text-xs text-muted-foreground block mt-0.5">
                        Submit inquiry for custom quotation
                      </span>
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-100 pt-5 space-y-2.5">
                  <Button
                    size="lg"
                    onClick={() => setInquiryOpen(true)}
                    className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white font-bold h-12 rounded-xl text-sm gap-2 shadow-sm"
                    id="pkg-primary-send-inquiry-btn"
                  >
                    <Send className="size-4" />
                    Send Travel Inquiry
                  </Button>
                  {isInbound ? (
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => setCustomizeOpen(true)}
                      className="w-full border-brand-blue/30 text-brand-blue hover:bg-brand-blue/5 font-bold h-11 rounded-xl text-xs gap-2"
                      id="pkg-customize-trip-btn"
                    >
                      <SlidersHorizontal className="size-4" />
                      Customize This Trip
                    </Button>
                  ) : null}
                </div>

                {/* Key Summary List */}
                <div className="border-t border-slate-100 pt-5 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Travel Type:</span>
                    <span className="font-bold text-ink">{pkg.travelType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-bold text-ink">{pkg.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Destination:</span>
                    <span className="font-bold text-ink truncate max-w-[180px]">{pkg.destination}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Inclusions:</span>
                    <span className="font-bold text-emerald-700">
                      {pkg.includedItems?.length || 4} Services Included
                    </span>
                  </div>
                </div>

                {/* Direct Consultation Box */}
                <div className="rounded-2xl bg-white border border-slate-200/80 p-4 space-y-2 text-xs shadow-xs">
                  <div className="flex items-center gap-2 text-brand-blue font-bold">
                    <Headphones className="size-4" />
                    <span>Need Immediate Assistance?</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-[11px]">
                    Speak directly with a Miracle International travel coordinator for custom plans and quotes.
                  </p>
                  <div className="pt-1 flex flex-col gap-1 text-[11px] font-semibold text-ink">
                    <span className="flex items-center gap-1.5">
                      <Phone className="size-3 text-brand-blue" />
                      +94 77 123 4567
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Mail className="size-3 text-brand-blue" />
                      travel@miracleinternational.com
                    </span>
                  </div>
                </div>

                {/* Back to Listing */}
                <div className="pt-2 text-center">
                  <Link
                    href={isInbound ? ROUTES.public.inboundTravel : ROUTES.public.outboundTravel}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-blue hover:underline"
                  >
                    <ArrowLeft className="size-3" />
                    Back to {isInbound ? "Inbound Tours" : "Outbound Tours"}
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── RELATED PACKAGES SECTION ── */}
      <RelatedAdminPackages pkg={pkg} />

      {/* Mobile Sticky Floating CTA Bar */}
      <div className="sticky bottom-0 z-30 border-t bg-white/95 px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] backdrop-blur-md sm:hidden flex items-center gap-2">
        {isInbound ? (
          <Button
            size="lg"
            variant="outline"
            className="flex-1 border-brand-blue/30 text-brand-blue font-bold text-xs h-11 gap-1.5 rounded-xl shadow-xs"
            onClick={() => setCustomizeOpen(true)}
          >
            <SlidersHorizontal className="size-3.5" />
            Customize Trip
          </Button>
        ) : null}
        <Button
          size="lg"
          className="flex-1 bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs h-11 gap-1.5 rounded-xl shadow-md"
          onClick={() => setInquiryOpen(true)}
        >
          <Send className="size-3.5" />
          Inquiry Now
        </Button>
      </div>

      {/* Unified Spacious Travel Inquiry Modal */}
      <PublicTravelInquiryModal
        open={inquiryOpen}
        onOpenChange={setInquiryOpen}
        defaultPackage={pkg}
        defaultInquiryType={isInbound ? "Inbound Tour" : "Outbound Tour"}
      />

      {/* Customization Modal */}
      <CustomizeTripModal
        open={customizeOpen}
        onClose={() => setCustomizeOpen(false)}
        packageDetail={pkg}
        mode="customize"
      />
    </>
  );
}

/** Related admin-store packages of the same travel type. */
function RelatedAdminPackages({ pkg }: { pkg: TravelPackage }) {
  const [related, setRelated] = useState<TravelPackage[]>([]);

  useEffect(() => {
    const all = getStoredPackages();
    const filtered = all
      .filter(
        (p) =>
          p.travelType === pkg.travelType &&
          p.id !== pkg.id &&
          p.status === "Active",
      )
      .slice(0, 3);
    setRelated(filtered);
  }, [pkg.id, pkg.travelType]);

  if (related.length === 0) return null;

  const sectionTitle =
    pkg.travelType === "Inbound"
      ? "More Inbound Packages"
      : "More Outbound Packages";

  const sectionEyebrow =
    pkg.travelType === "Inbound" ? "Sri Lanka Tours" : "International Holidays";

  const allHref =
    pkg.travelType === "Inbound"
      ? ROUTES.public.inboundTravel
      : ROUTES.public.outboundTravel;

  return (
    <section
      aria-labelledby="related-admin-packages-heading"
      className="border-t border-slate-100 bg-white py-12 lg:py-16"
    >
      <div className="container-page">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-brand-blue text-xs font-bold uppercase tracking-wider">
              {sectionEyebrow}
            </p>
            <h2
              id="related-admin-packages-heading"
              className="text-ink mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl"
            >
              {sectionTitle}
            </h2>
          </div>
          <Link
            href={allHref}
            className="text-brand-blue hover:text-brand-blue-dark inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold transition-colors"
          >
            View All {pkg.travelType === "Inbound" ? "Inbound" : "Outbound"} Packages
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((relPkg) => {
            const cover = getPackageCoverImage(relPkg);

            const href = relPkg.slug
              ? ROUTES.public.travelPackage(relPkg.slug)
              : allHref;

            return (
              <div
                key={relPkg.id}
                className="group/card flex flex-col rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-soft hover:shadow-lift transition-all hover:border-brand-blue/40"
              >
                <Link
                  href={href}
                  className="flex flex-1 flex-col focus-visible:outline-none"
                  aria-label={`View details for ${relPkg.name}`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cover}
                      alt={relPkg.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                    />
                    <div className="from-black/60 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
                    
                    <span className="text-ink absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-0.5 text-[11px] font-bold shadow-xs">
                      <Clock className="text-brand-blue size-3" />
                      {relPkg.duration}
                    </span>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-xs font-semibold flex items-center gap-1.5 drop-shadow-sm truncate">
                        <MapPin className="size-3.5 text-sky-300 shrink-0" />
                        <span>{relPkg.destination}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <h3 className="text-ink text-base font-bold leading-snug group-hover/card:text-brand-blue transition-colors line-clamp-1">
                      {relPkg.name}
                    </h3>
                    {relPkg.shortDescription ? (
                      <p className="text-muted-foreground line-clamp-2 text-xs leading-relaxed">
                        {relPkg.shortDescription}
                      </p>
                    ) : null}

                    <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-100">
                      <div>
                        {relPkg.price != null ? (
                          <div>
                            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                              Starting From
                            </span>
                            <span className="text-sm font-extrabold text-ink">
                              {relPkg.currency === "LKR" ? "LKR" : "USD"}{" "}
                              {relPkg.price.toLocaleString()}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs font-semibold text-brand-blue">
                            Price on Request
                          </span>
                        )}
                      </div>
                      <span className="text-brand-blue text-xs font-bold inline-flex items-center gap-1 group-hover/card:underline">
                        View Package
                        <ArrowRight className="size-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
