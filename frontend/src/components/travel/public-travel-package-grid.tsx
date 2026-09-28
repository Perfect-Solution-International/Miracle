"use client";

import {
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Palmtree,
  Send,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { TravelPackage, TravelType } from "@/components/admin-travel/types";
import { ROUTES } from "@/config/routes";
import { PublicTravelInquiryModal } from "./public-travel-inquiry-modal";

export interface PublicTravelPackageGridProps {
  packages: TravelPackage[];
  filterType?: TravelType;
  title?: string;
  subtitle?: string;
}

export function PublicTravelPackageGrid({
  packages,
  filterType,
  title,
  subtitle,
}: PublicTravelPackageGridProps) {
  const [selectedInquiryPackage, setSelectedInquiryPackage] = useState<TravelPackage | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  const filtered = filterType
    ? packages.filter((p) => p.travelType === filterType && p.status !== "Inactive")
    : packages.filter((p) => p.status !== "Inactive");

  const handleOpenInquiry = (pkg: TravelPackage, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedInquiryPackage(pkg);
    setInquiryModalOpen(true);
  };

  return (
    <section className="py-12 sm:py-16">
      {title ? (
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2">
          <Badge
            variant="outline"
            className="border-brand-blue/30 bg-brand-blue/5 text-brand-blue text-xs font-semibold px-3 py-1"
          >
            {filterType === "Inbound" ? "Sri Lanka Inbound Tours" : "International Holidays"}
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-foreground tracking-tight">
            {title}
          </h2>
          {subtitle ? (
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {subtitle}
            </p>
          ) : null}
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/80 bg-muted/20 p-12 text-center max-w-md mx-auto space-y-3">
          <div className="flex size-12 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue mx-auto">
            <Palmtree className="size-6" />
          </div>
          <h3 className="text-base font-bold text-navy dark:text-foreground">
            No Tour Packages Listed Yet
          </h3>
          <p className="text-xs text-muted-foreground">
            Our travel desk can design a customized itinerary tailored to your dates and preferences.
          </p>
          <Button
            onClick={() => {
              setSelectedInquiryPackage(null);
              setInquiryModalOpen(true);
            }}
            className="bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold text-xs gap-1.5 h-9"
          >
            <Send className="size-3.5" />
            Send Custom Travel Inquiry
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filtered.map((pkg) => {
            const cover =
              pkg.coverImage ||
              pkg.images?.[0] ||
              "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80";

            const detailHref = pkg.slug
              ? ROUTES.public.travelPackage(pkg.slug)
              : pkg.travelType === "Inbound"
              ? ROUTES.public.inboundTravel
              : ROUTES.public.outboundTravel;

            return (
              <div
                key={pkg.id}
                className="group flex flex-col rounded-2xl border border-border/80 bg-card overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 hover:border-brand-blue/40"
              >
                {/* Entire card is a link */}
                <Link
                  href={detailHref}
                  className="flex flex-1 flex-col focus-visible:outline-none"
                  aria-label={`View details for ${pkg.name}`}
                >
                  {/* Image Header */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cover}
                      alt={pkg.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <Badge
                        className={
                          pkg.travelType === "Inbound"
                            ? "bg-emerald-600/90 text-white text-[11px] font-bold"
                            : "bg-blue-600/90 text-white text-[11px] font-bold"
                        }
                      >
                        {pkg.travelType}
                      </Badge>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-0.5 text-white text-[11px] font-mono">
                        <Clock className="size-3" />
                        {pkg.duration}
                      </span>
                    </div>

                    {/* Bottom location on image */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-xs font-semibold flex items-center gap-1.5 drop-shadow-sm">
                        <MapPin className="size-3.5 text-sky-300 shrink-0" />
                        <span className="truncate">
                          {pkg.destination}
                          {pkg.country ? ` (${pkg.country})` : ""}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col space-y-3">
                    <h3 className="font-bold text-base text-navy dark:text-foreground line-clamp-1 group-hover:text-brand-blue transition-colors">
                      {pkg.name}
                    </h3>

                    {pkg.shortDescription ? (
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {pkg.shortDescription}
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {pkg.description}
                      </p>
                    )}

                    {/* Highlights preview */}
                    {pkg.highlights && pkg.highlights.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {pkg.highlights.slice(0, 2).map((hl, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 text-[11px] font-medium bg-muted/60 text-muted-foreground px-2 py-0.5 rounded-md"
                          >
                            <Star className="size-2.5 text-amber-500 fill-amber-500" />
                            <span className="truncate max-w-[130px]">{hl}</span>
                          </span>
                        ))}
                      </div>
                    ) : null}

                    {/* Price row */}
                    <div className="mt-auto pt-4 border-t border-border/60 flex items-center justify-between gap-2">
                      <div>
                        {pkg.price != null ? (
                          <div>
                            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                              Starting From
                            </span>
                            <span className="text-sm font-extrabold text-navy dark:text-foreground">
                              {pkg.currency === "LKR" ? "LKR" : "USD"}{" "}
                              {pkg.price.toLocaleString()}
                            </span>
                          </div>
                        ) : (
                          <div>
                            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                              Pricing
                            </span>
                            <span className="text-xs font-semibold text-brand-blue">
                              On Request
                            </span>
                          </div>
                        )}
                      </div>

                      <span className="text-brand-blue text-xs font-bold inline-flex items-center gap-1 group-hover:underline">
                        View Package
                        <ArrowRight className="size-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Send Inquiry – outside the Link to avoid nested <a> */}
                <div className="px-5 pb-5 pt-0">
                  <Button
                    size="sm"
                    className="w-full h-8 text-xs bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold shadow-xs gap-1.5"
                    onClick={(e) => handleOpenInquiry(pkg, e)}
                  >
                    <Send className="size-3" />
                    Send Inquiry
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Inquiry Form Modal */}
      <PublicTravelInquiryModal
        open={inquiryModalOpen}
        onOpenChange={setInquiryModalOpen}
        defaultPackage={selectedInquiryPackage}
        defaultInquiryType={filterType === "Outbound" ? "Outbound Tour" : "Inbound Tour"}
      />
    </section>
  );
}
