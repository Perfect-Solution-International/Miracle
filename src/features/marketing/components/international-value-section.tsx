import { ArrowLeftRight } from "lucide-react";

import { ArrowLink } from "@/components/common/arrow-link";
import { MediaFrame } from "@/components/common/media-frame";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";

import { INTERNATIONAL_VALUE_POINTS } from "../data/home.content";

export function InternationalValueSection() {
  return (
    <Section tone="surface" aria-labelledby="value-heading">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="reveal relative">
          <MediaFrame
            image={SITE_MEDIA.freightTruck}
            aspect="aspect-[4/3] lg:aspect-[4/5]"
            sizes="(min-width: 1024px) 45vw, 100vw"
            overlay
          />
          <div className="shadow-lift absolute inset-x-4 bottom-4 flex items-center justify-between gap-4 rounded-2xl bg-white p-4 sm:inset-x-6 sm:bottom-6 sm:p-5">
            <div>
              <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                From
              </p>
              <p className="text-ink font-bold">Sri Lanka</p>
            </div>
            <span className="bg-brand-blue inline-flex size-10 items-center justify-center rounded-full text-white">
              <ArrowLeftRight aria-hidden="true" className="size-4" />
            </span>
            <div className="text-right">
              <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                To
              </p>
              <p className="text-ink font-bold">Global Markets</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <SectionHeading
            id="value-heading"
            eyebrow="International Reach"
            title="Connecting Sri Lankan Businesses With Global Opportunities."
            description="We bridge the gap between local ambition and international supply, handling the coordination that makes cross-border business practical."
          />
          <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {INTERNATIONAL_VALUE_POINTS.map(({ icon: Icon, title, description }) => (
              <li key={title} className="border-brand-blue/15 flex gap-3 border-l-2 pl-4">
                <Icon
                  aria-hidden="true"
                  className="text-brand-blue mt-0.5 size-5 shrink-0"
                />
                <div>
                  <h3 className="text-ink font-bold">{title}</h3>
                  <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <ArrowLink href={ROUTES.public.globalSourcing}>
            How global sourcing works
          </ArrowLink>
        </div>
      </div>
    </Section>
  );
}
