import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { MediaFrame } from "@/components/common/media-frame";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";

import { BUSINESS_PATHWAY, type PathwayStage } from "../data/business-pathway";

/**
 * Structured pathway from idea to operation. Numbered stages connect along a
 * rail on large screens and stack as a vertical journey on small screens.
 */
export function BusinessPathwaySection({
  stages = BUSINESS_PATHWAY,
}: {
  stages?: readonly PathwayStage[];
}) {
  return (
    <Section tone="surface" aria-labelledby="pathway-heading">
      <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-16">
        <SectionHeading
          id="pathway-heading"
          eyebrow="Business Solutions"
          title="From Business Idea to Operation"
          description="Whether you are an entrepreneur starting out or an established business expanding, we coordinate the consultants, suppliers, machinery, and technology involved — as one managed journey."
          className="lg:col-span-6"
        >
          <div className="pt-4">
            <Button asChild variant="accent" size="xl">
              <Link href={ROUTES.public.businessSolutions}>
                Start a Business
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </SectionHeading>
        <MediaFrame
          image={SITE_MEDIA.manufacturing}
          aspect="aspect-[16/9]"
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="reveal lg:col-span-6"
        />
      </div>

      <ol className="relative mt-20 grid gap-x-5 gap-y-12 md:grid-cols-2 lg:mt-24 lg:grid-cols-5">
        <span
          aria-hidden="true"
          className="bg-brand-blue/20 absolute top-0 right-0 left-0 hidden h-px lg:block"
        />
        {stages.map((stage, index) => (
          <li
            key={stage.title}
            className="reveal group hover:border-brand-blue/30 hover:shadow-soft relative flex flex-col rounded-2xl border bg-white p-6 transition-all duration-300"
          >
            <span className="text-brand-blue group-hover:bg-brand-blue group-hover:border-brand-blue bg-brand-blue-light shadow-soft relative -mt-12 mb-5 inline-flex size-12 items-center justify-center rounded-full border-2 border-white text-base font-extrabold transition-colors duration-300 group-hover:text-white">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-ink text-lg leading-snug font-bold">{stage.title}</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              {stage.description}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2 pt-1">
              {stage.deliverables.map((item) => (
                <li
                  key={item}
                  className="bg-surface text-ink/80 rounded-full px-2.5 py-1 text-xs font-semibold"
                >
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
