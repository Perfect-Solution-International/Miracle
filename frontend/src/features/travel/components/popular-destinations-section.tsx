import Image from "next/image";

import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";

import {
  INTERNATIONAL_DESTINATIONS,
  SRI_LANKA_DESTINATIONS,
  type TravelDestination,
} from "../data/travel-destinations.content";

function DestinationGrid({ destinations }: { destinations: readonly TravelDestination[] }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {destinations.map(({ name, image }) => (
        <li
          key={name}
          className="group/tile relative isolate flex aspect-[3/4] items-end overflow-hidden rounded-2xl"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 25vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover/tile:scale-105"
          />
          <div className="from-navy/85 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
          <p className="relative p-4 text-base font-bold text-white">{name}</p>
        </li>
      ))}
    </ul>
  );
}

/** "Popular Destinations" — Sri Lanka and international, as two large image grids. */
export function PopularDestinationsSection() {
  return (
    <Section id="destinations" tone="surface" aria-labelledby="destinations-heading" className="scroll-mt-24">
      <SectionHeading
        id="destinations-heading"
        align="center"
        eyebrow="Where to Go"
        title="Popular Destinations"
      />

      <div className="mt-12 space-y-10 lg:mt-16">
        <div className="space-y-5">
          <p className="text-ink text-sm font-bold tracking-[0.14em] uppercase">Sri Lanka</p>
          <DestinationGrid destinations={SRI_LANKA_DESTINATIONS} />
        </div>
        <div className="space-y-5">
          <p className="text-ink text-sm font-bold tracking-[0.14em] uppercase">International</p>
          <DestinationGrid destinations={INTERNATIONAL_DESTINATIONS} />
        </div>
      </div>
    </Section>
  );
}
