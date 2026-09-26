import { ArrowRight, Check, Compass, Globe2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Eyebrow } from "@/components/common/eyebrow";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";

const INBOUND_EXAMPLES = [
  "Sri Lankan destinations",
  "Cultural experiences",
  "Pristine beaches",
  "Wildlife & safari tours",
  "Hill country adventure",
  "Hotels & accommodation",
  "Customized Sri Lanka tours",
] as const;

const OUTBOUND_EXAMPLES = [
  "International holidays",
  "Family vacation trips",
  "Honeymoon travel",
  "Business & corporate travel",
  "Customized international tours",
  "Flight arrangements",
  "Visa & documentation support",
] as const;

/** Inbound Travel section dedicated to international visitors visiting Sri Lanka. */
export function InboundTravelSection() {
  return (
    <section
      id="inbound"
      aria-labelledby="inbound-heading"
      className="scroll-mt-24 border-b bg-white py-12 lg:py-16"
    >
      <div className="container-page">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Sri Lanka Travel Image */}
          <div className="relative aspect-[16/10] max-h-72 w-full overflow-hidden rounded-3xl border shadow-soft sm:max-h-80">
            <Image
              src={SITE_MEDIA.travelDestinations.sigiriya.src}
              alt={SITE_MEDIA.travelDestinations.sigiriya.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="from-navy/60 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
            <span className="bg-brand-blue absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold text-white shadow-sm">
              <Compass aria-hidden="true" className="size-3.5" />
              Visiting Sri Lanka
            </span>
          </div>

          {/* Inbound Content */}
          <div className="flex flex-col items-start">
            <Eyebrow tone="default">International Visitors</Eyebrow>
            <h2
              id="inbound-heading"
              className="text-ink mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl"
            >
              Inbound Travel
            </h2>
            <p className="text-muted-foreground mt-3 text-base leading-relaxed">
              Dedicated tourism solutions for <strong>international visitors traveling to Sri Lanka</strong>.
              From UNESCO World Heritage sites and misty tea plantations to golden beaches and wildlife
              safaris, experience the best of the island with end-to-end local coordination.
            </p>

            <ul className="mt-5 grid w-full gap-2 sm:grid-cols-2">
              {INBOUND_EXAMPLES.map((item) => (
                <li key={item} className="text-ink flex items-start gap-2 text-sm font-semibold">
                  <Check
                    aria-hidden="true"
                    className="text-brand-blue mt-0.5 size-4 shrink-0"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7">
              <Button asChild size="lg">
                <Link href={ROUTES.public.inboundTravel}>
                  Explore Inbound Tours
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Outbound Travel section dedicated to Sri Lankan customers traveling internationally. */
export function OutboundTravelSection() {
  return (
    <section
      id="outbound"
      aria-labelledby="outbound-heading"
      className="scroll-mt-24 border-b bg-surface py-12 lg:py-16"
    >
      <div className="container-page">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Outbound Content (Desktop Order 1) */}
          <div className="order-2 flex flex-col items-start lg:order-1">
            <Eyebrow tone="default">Traveling Abroad</Eyebrow>
            <h2
              id="outbound-heading"
              className="text-ink mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl"
            >
              Outbound Travel
            </h2>
            <p className="text-muted-foreground mt-3 text-base leading-relaxed">
              Tailored outbound journeys for <strong>Sri Lankan customers traveling to international destinations</strong>.
              Whether organizing a family vacation, a romantic honeymoon, or corporate overseas travel,
              our specialists take care of flight bookings, visa documentation, and hotel arrangements.
            </p>

            <ul className="mt-5 grid w-full gap-2 sm:grid-cols-2">
              {OUTBOUND_EXAMPLES.map((item) => (
                <li key={item} className="text-ink flex items-start gap-2 text-sm font-semibold">
                  <Check
                    aria-hidden="true"
                    className="text-brand-blue mt-0.5 size-4 shrink-0"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7">
              <Button asChild size="lg" variant="outline">
                <Link href={ROUTES.public.outboundTravel}>
                  Explore Outbound Tours
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>

          {/* International Travel Image (Desktop Order 2) */}
          <div className="order-1 relative aspect-[16/10] max-h-72 w-full overflow-hidden rounded-3xl border shadow-soft sm:max-h-80 lg:order-2">
            <Image
              src={SITE_MEDIA.travelDestinations.dubai.src}
              alt={SITE_MEDIA.travelDestinations.dubai.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="from-navy/60 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
            <span className="bg-brand-blue-dark absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold text-white shadow-sm">
              <Globe2 aria-hidden="true" className="size-3.5" />
              Global Destinations
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Legacy combined export for backwards compatibility */
export function InboundOutboundSection() {
  return (
    <>
      <InboundTravelSection />
      <OutboundTravelSection />
    </>
  );
}
