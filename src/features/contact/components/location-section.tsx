import { ArrowRight, MapPin, Maximize2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { APP_CONFIG } from "@/config/app";
import { SITE_MEDIA } from "@/config/site-media";

const MAPS_QUERY = encodeURIComponent(APP_CONFIG.support.address);
const MAPS_SEARCH_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;
const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`;

/**
 * Illustrative map preview rather than an embedded, coordinate-pinned map:
 * the office address in `APP_CONFIG` is still a placeholder (see its TODO),
 * so this links out to a live Google Maps search instead of asserting exact
 * coordinates.
 */
function MapPreview() {
  return (
    <div className="relative isolate flex min-h-80 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-[#f1f7fc] shadow-[0_6px_20px_rgba(15,23,42,0.07)]">

      <Link
        href={MAPS_SEARCH_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open in Google Maps"
        className="text-muted-foreground hover:text-brand-blue absolute top-4 right-4 inline-flex size-9 items-center justify-center rounded-lg border bg-white transition-colors"
      >
        <Maximize2 aria-hidden="true" className="size-4" />
      </Link>

      <div className="flex flex-1 items-center justify-center">
        <span className="bg-brand-red/15 relative inline-flex size-14 items-center justify-center rounded-full">
          <span className="bg-brand-red inline-flex size-9 items-center justify-center rounded-full text-white">
            <MapPin aria-hidden="true" className="size-5" />
          </span>
        </span>
      </div>

      <div className="m-4 flex flex-col items-start gap-4 rounded-2xl public-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-ink font-bold">{APP_CONFIG.name}</p>
          <p className="text-muted-foreground text-sm">{APP_CONFIG.support.address}</p>
        </div>
        <Button asChild variant="outline" size="sm" className="shrink-0 bg-white">
          <Link href={MAPS_SEARCH_URL} target="_blank" rel="noopener noreferrer">
            View on Google Maps
            <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function OfficeInviteCard() {
  return (
    <div className="relative isolate min-h-80 overflow-hidden rounded-2xl public-card">
      <Image
        src={SITE_MEDIA.cityTowers.src}
        alt={SITE_MEDIA.cityTowers.alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-white/10"
      />
      <div className="relative flex h-full flex-col justify-end gap-3 p-8">
        <span aria-hidden="true" className="bg-brand-red h-0.5 w-8 rounded-full" />
        <p className="text-xs font-bold tracking-[0.16em] text-brand-blue uppercase">
          Visit Our Office
        </p>
        <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
          We Welcome You to Our Office
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Feel free to visit us at our headquarters in {APP_CONFIG.support.address}. Our
          team is happy to meet you and discuss how we can support your business needs.
        </p>
        <div>
          <Button asChild variant="outline" size="lg" className="bg-white">
            <Link href={MAPS_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
              Get Directions
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function LocationSection() {
  return (
    <Section spacing="compact" aria-label="Office location" className="bg-white">
      <div className="grid gap-6 lg:grid-cols-2">
        <MapPreview />
        <OfficeInviteCard />
      </div>
    </Section>
  );
}

