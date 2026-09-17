import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ArrowLink } from "@/components/common/arrow-link";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";

import { SOURCING_MARKETS } from "../data/sourcing.content";
import { SourcingProcessTimeline } from "./sourcing-process-timeline";

/** Homepage sourcing feature on a navy band: markets, visual, and process. */
export function GlobalSourcingSection() {
  return (
    <Section tone="navy" aria-labelledby="sourcing-heading">
      <div aria-hidden="true" className="bg-grid-inverse absolute inset-0 -z-10" />

      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-10">
          <SectionHeading
            id="sourcing-heading"
            tone="inverse"
            eyebrow="Global Sourcing"
            title="Source Products From Global Markets"
            description="We work with international manufacturers and wholesalers to find the right product at the right terms, then manage the purchase and logistics so you receive exactly what you ordered."
          />

          <ul className="grid gap-3 sm:grid-cols-2">
            {SOURCING_MARKETS.map((market) => (
              <li
                key={market.name}
                className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-white/25"
              >
                <span
                  aria-hidden="true"
                  className="bg-brand-blue inline-flex size-11 shrink-0 items-center justify-center rounded-lg text-sm font-extrabold tracking-wider"
                >
                  {market.code}
                </span>
                <div>
                  <h3 className="font-bold text-white">{market.name}</h3>
                  <p className="text-sm text-white/60">{market.focus}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <Button asChild variant="accent" size="xl">
              <Link href={ROUTES.public.tellUsWhatYouNeed}>
                Start a Sourcing Request
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
            <ArrowLink href={ROUTES.public.globalSourcing} tone="inverse">
              Learn about sourcing
            </ArrowLink>
          </div>
        </div>

        <div className="reveal relative">
          <div className="relative aspect-square overflow-hidden rounded-full border border-white/10 sm:mx-auto sm:w-4/5 lg:w-full">
            <Image
              src={SITE_MEDIA.earthNight.src}
              alt={SITE_MEDIA.earthNight.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 80vw"
              className="object-cover"
            />
            {/* Feathers the photo edge into the navy background. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-full shadow-[inset_0_0_80px_40px_var(--navy)]"
            />
          </div>
          {/* Orbit rings evoke trade routes without resorting to a flat map. */}
          <div
            aria-hidden="true"
            className="absolute inset-[-6%] rounded-full border border-dashed border-white/10 sm:inset-x-[6%] lg:inset-[-6%]"
          />
          <span
            aria-hidden="true"
            className="bg-brand-red absolute top-[18%] right-[8%] size-3 rounded-full ring-8 ring-[rgb(223_32_33_/_0.2)]"
          />
          <span
            aria-hidden="true"
            className="bg-brand-blue-muted absolute bottom-[14%] left-[10%] size-2.5 rounded-full ring-8 ring-white/10"
          />
        </div>
      </div>

      <SourcingProcessTimeline className="mt-16 lg:mt-24" />
    </Section>
  );
}
