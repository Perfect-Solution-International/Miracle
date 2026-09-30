import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";

import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";

import type { TravelPackageDetail } from "../../types/travel-package-detail.types";

/**
 * Clean left-content / right-image section showing:
 * - Left side: "What to Expect" clear, short experiential points
 * - Right side: Relevant high-quality travel image matching that specific package
 */
export function PackageOverviewSection({ detail }: { detail: TravelPackageDetail }) {
  const primaryImage = detail.secondaryImage ?? detail.image;

  return (
    <Section aria-labelledby="about-package-heading">
      <SectionHeading
        id="about-package-heading"
        eyebrow="Travel Experience"
        title="What to Expect"
        description={detail.about}
      />

      {/* Destinations route ribbon */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="text-muted-foreground text-xs font-bold uppercase tracking-wide mr-1">
          Route Highlights:
        </span>
        {detail.destinations.map((destination, index) => (
          <div key={destination} className="flex items-center gap-2">
            <span className="bg-brand-blue-light text-brand-blue rounded-full px-3.5 py-1 text-xs font-bold">
              {destination}
            </span>
            {index < detail.destinations.length - 1 ? (
              <ArrowRight aria-hidden="true" className="text-brand-blue/40 size-3.5" />
            ) : null}
          </div>
        ))}
      </div>

      {/* Left-Content / Right-Image Layout */}
      <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-center">
        {/* Left Side: "What to Expect" Points */}
        <div className="flex flex-col gap-4 lg:col-span-7">
          {detail.whatToExpect.map((item, index) => (
            <div
              key={item.title}
              className="group flex items-start gap-4 rounded-2xl public-card-clickable p-5"
            >
              <span className="bg-brand-blue text-white flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold mt-0.5">
                0{index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-ink text-base font-bold sm:text-lg">{item.title}</h3>
                  {item.badge ? (
                    <span className="bg-brand-blue-light text-brand-blue rounded-md px-2 py-0.5 text-[11px] font-bold">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: High-Quality Travel Media */}
        <div className="flex flex-col gap-4 lg:col-span-5">
          <div className="shadow-lift relative aspect-[4/3] w-full overflow-hidden rounded-3xl border-4 border-white">
            <Image
              src={detail.image.src}
              alt={detail.image.alt}
              fill
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover"
            />
            <div className="from-navy/70 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
              <span className="text-sm font-bold drop-shadow-sm flex items-center gap-1.5">
                <MapPin className="size-4 text-brand-blue-muted" />
                {detail.location}
              </span>
              <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-navy shadow-xs">
                {detail.duration.days} Days / {detail.duration.nights} Nights
              </span>
            </div>
          </div>

          {/* Secondary contextual image */}
          {primaryImage !== detail.image ? (
            <div className="shadow-soft relative aspect-[16/9] w-full overflow-hidden rounded-2xl border-2 border-white">
              <Image
                src={primaryImage.src}
                alt={primaryImage.alt}
                fill
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-cover"
              />
              <div className="from-navy/50 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 text-xs font-semibold text-white drop-shadow-sm">
                {primaryImage.alt}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  );
}

