import { ArrowRight, Globe2 } from "lucide-react";
import Link from "next/link";

import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

import { MARKET_DESTINATIONS, MARKET_HUB } from "../data/about.content";

/**
 * Illustrative trade-route map: an abstract dot-and-arc diagram rather than a
 * literal atlas, so no claim is made about exact market coverage or borders.
 */
function TradeRouteMap() {
  return (
    <div className="bg-brand-blue-light relative isolate overflow-hidden rounded-2xl p-6 sm:p-10">
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-40" />
      <svg viewBox="0 0 100 100" role="presentation" className="aspect-[16/10] w-full">
        {MARKET_DESTINATIONS.map((pin) => {
          const midX = (MARKET_HUB.x + pin.x) / 2;
          const midY = Math.min(MARKET_HUB.y, pin.y) - 18;
          return (
            <path
              key={pin.label}
              d={`M${MARKET_HUB.x},${MARKET_HUB.y} Q${midX},${midY} ${pin.x},${pin.y}`}
              fill="none"
              className="stroke-brand-blue/40"
              strokeWidth={0.4}
              strokeDasharray="1.6 1.6"
              strokeLinecap="round"
            />
          );
        })}

        <g>
          <circle
            cx={MARKET_HUB.x}
            cy={MARKET_HUB.y}
            r={2.2}
            className="fill-brand-red"
          />
          <circle
            cx={MARKET_HUB.x}
            cy={MARKET_HUB.y}
            r={4.5}
            className="fill-brand-red/15"
          />
        </g>
        {MARKET_DESTINATIONS.map((pin) => (
          <g key={pin.label}>
            <circle cx={pin.x} cy={pin.y} r={1.6} className="fill-brand-blue" />
            <circle cx={pin.x} cy={pin.y} r={3.2} className="fill-brand-blue/15" />
          </g>
        ))}
      </svg>

      <ul className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1.5">
        <li className="text-ink flex items-center gap-1.5 text-xs font-semibold">
          <span aria-hidden="true" className="bg-brand-red size-1.5 rounded-full" />
          {MARKET_HUB.label}
        </li>
        {MARKET_DESTINATIONS.map((pin) => (
          <li
            key={pin.label}
            className="text-ink flex items-center gap-1.5 text-xs font-semibold"
          >
            <span aria-hidden="true" className="bg-brand-blue size-1.5 rounded-full" />
            {pin.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function GlobalPresenceSection() {
  return (
    <Section tone="surface" aria-labelledby="global-presence-heading">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr_0.8fr] lg:items-center lg:gap-10">
        <div className="flex flex-col gap-6">
          <SectionHeading
            id="global-presence-heading"
            eyebrow="Our Global Presence"
            title="Connecting Markets Across the World"
            description="We work with trusted partners and suppliers in key markets including Asia, the Middle East, Europe and beyond."
          />
          <div>
            <Button asChild size="xl" variant="outline" className="text-ink bg-white">
              <Link href={ROUTES.public.globalSourcing}>
                Global Sourcing
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>

        <TradeRouteMap />

        <div className="shadow-soft flex flex-col gap-3 rounded-2xl border bg-white p-6">
          <span className="bg-brand-blue-light text-brand-blue inline-flex size-11 items-center justify-center rounded-full">
            <Globe2 aria-hidden="true" className="size-5" />
          </span>
          <h3 className="text-ink font-bold">Global Network Local Support</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            No matter where you are, we are here to support your business journey with
            international connections and local expertise.
          </p>
        </div>
      </div>
    </Section>
  );
}
