"use client";

import {
  ArrowRight,
  Calendar,
  Clock,
  Compass,
  MapPin,
  Send,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { PublicTravelInquiryModal } from "@/components/travel/public-travel-inquiry-modal";
import type { TravelPackage } from "@/components/admin-travel/types";

export function TravelPackageCard({
  pkg,
  onCustomize,
}: {
  pkg: TravelPackage;
  onCustomize?: (pkg: TravelPackage) => void;
}) {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  const slug = pkg.slug || pkg.id;
  const name = pkg.name;
  const coverImage =
    pkg.coverImage ||
    pkg.images?.[0] ||
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80";
  const durationStr = pkg.duration;
  const destinationStr = pkg.destination + (pkg.country ? ` (${pkg.country})` : "");
  const descriptionStr = pkg.shortDescription || pkg.description;
  const highlights = pkg.highlights || [];

  const priceFormatted =
    pkg.price != null
      ? `${pkg.currency === "LKR" ? "LKR" : "USD"} ${pkg.price.toLocaleString()}`
      : "Price on Request";

  const isInbound = pkg.travelType === "Inbound";
  const detailUrl = ROUTES.public.travelPackage(slug);

  const handleSendInquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onCustomize) {
      onCustomize(pkg);
    } else {
      setInquiryOpen(true);
    }
  };

  return (
    <>
      <li className="shadow-soft hover:shadow-lift group/card flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white transition-all hover:border-brand-blue/40">
        <Link
          href={detailUrl}
          className="flex flex-1 flex-col focus-visible:outline-none"
          aria-label={`View details for ${name}`}
        >
          {/* Cover Image Header */}
          <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverImage}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
            />
            <div className="from-black/65 via-transparent to-transparent absolute inset-0 bg-gradient-to-t" />

            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
              <Badge
                className={
                  isInbound
                    ? "bg-emerald-600 text-white font-bold text-[11px]"
                    : "bg-blue-600 text-white font-bold text-[11px]"
                }
              >
                {isInbound ? "Inbound" : "Outbound"}
              </Badge>
            </div>

            <span className="text-ink absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-0.5 text-[11px] font-bold shadow-xs">
              <Clock className="text-brand-blue size-3" />
              {durationStr}
            </span>

            <div className="absolute bottom-3 left-3 right-3 text-white">
              <p className="text-xs font-semibold flex items-center gap-1.5 drop-shadow-sm truncate">
                <MapPin className="size-3.5 text-sky-300 shrink-0" />
                <span>{destinationStr}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2.5 p-5">
            <h3 className="text-ink text-base font-bold leading-snug group-hover/card:text-brand-blue transition-colors line-clamp-1">
              {name}
            </h3>
            {descriptionStr ? (
              <p className="text-muted-foreground line-clamp-2 text-xs leading-relaxed">
                {descriptionStr}
              </p>
            ) : null}

            {highlights.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {highlights.slice(0, 2).map((hl, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md truncate max-w-[130px]"
                  >
                    <Star className="size-2.5 text-amber-500 fill-amber-500 shrink-0" />
                    <span className="truncate">{hl}</span>
                  </span>
                ))}
              </div>
            ) : null}

            <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-100">
              <div>
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                  Starting Quote
                </span>
                <span className="text-sm font-extrabold text-ink">
                  {priceFormatted}
                </span>
              </div>
              <span className="text-brand-blue text-xs font-bold inline-flex items-center gap-1 group-hover/card:underline">
                View Package
                <ArrowRight className="size-3.5" />
              </span>
            </div>
          </div>
        </Link>

        {/* Send Inquiry CTA */}
        <div className="px-5 pb-5 pt-0">
          <Button
            size="sm"
            onClick={handleSendInquiry}
            className="w-full h-8 text-xs bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold shadow-xs gap-1.5"
          >
            <Send className="size-3" />
            Send Inquiry
          </Button>
        </div>
      </li>

      <PublicTravelInquiryModal
        open={inquiryOpen}
        onOpenChange={setInquiryOpen}
        defaultPackage={pkg}
        defaultInquiryType={isInbound ? "Inbound Tour" : "Outbound Tour"}
      />
    </>
  );
}
