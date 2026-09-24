import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";

import { TRAVEL_CATEGORY_CARDS } from "../data/travel.content";

/** Visually rich category grid — broader trip types than the service list,
 * each image tile linking to a matching package filter or page section. */
export function TravelCategoriesSection() {
  return (
    <Section aria-labelledby="travel-categories-heading">
      <SectionHeading
        id="travel-categories-heading"
        align="center"
        eyebrow="Travel Categories"
        title="Find Your Kind of Trip"
      />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
        {TRAVEL_CATEGORY_CARDS.map(({ id, icon: Icon, image, title, description, href }) => (
          <li key={id}>
            <Link
              href={href}
              className="group/card relative isolate flex h-56 flex-col justify-end overflow-hidden rounded-2xl border"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover/card:scale-105"
              />
              <div className="from-navy/90 absolute inset-0 bg-gradient-to-t via-navy/20 to-transparent" />
              <div className="relative flex flex-col gap-1.5 p-5">
                <span className="bg-white/15 text-white ring-white/25 inline-flex size-9 items-center justify-center rounded-full ring-1 backdrop-blur-sm">
                  <Icon aria-hidden="true" className="size-4.5" />
                </span>
                <p className="text-lg font-bold text-white">{title}</p>
                <p className="line-clamp-2 text-sm leading-snug text-white/75">
                  {description}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
