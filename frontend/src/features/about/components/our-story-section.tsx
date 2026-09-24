import { MediaFrame } from "@/components/common/media-frame";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { SITE_MEDIA } from "@/config/site-media";
import { cn } from "@/lib/utils";

import { COMPANY_TIMELINE } from "../data/about.content";

export function OurStorySection() {
  return (
    <Section tone="surface" aria-labelledby="our-story-heading">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1fr_0.85fr] lg:items-start lg:gap-10">
        <div className="relative">
          <MediaFrame
            image={SITE_MEDIA.cityTowers}
            aspect="aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5]"
            sizes="(min-width: 1024px) 25vw, 80vw"
            overlay
          />
          <p className="absolute bottom-6 left-6 max-w-[85%] text-lg leading-snug font-bold text-white">
            Global Solutions
            <br />
            Real Opportunities
            <span
              aria-hidden="true"
              className="bg-brand-red mt-2 block h-0.5 w-10 rounded-full"
            />
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <SectionHeading
            id="our-story-heading"
            eyebrow="Our Story"
            title="From Local Roots to Global Reach"
          />
          <p className="text-muted-foreground leading-relaxed">
            Miracle International was founded with a simple vision — to make global trade
            and business opportunities accessible to every business. What started as a
            sourcing and trading initiative has grown into a comprehensive platform
            supporting businesses across multiple industries and continents.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Today, we work with trusted partners, suppliers and clients worldwide, helping
            them achieve their goals through reliable solutions and personalized support.
          </p>
          <div>
            <Button asChild size="xl" variant="outline" className="text-ink">
              <a href="#our-journey">Our Journey</a>
            </Button>
          </div>
        </div>

        <ol id="our-journey" className="flex flex-col gap-8 border-l pl-6">
          {COMPANY_TIMELINE.map((milestone) => (
            <li key={milestone.year} className="relative">
              <span
                aria-hidden="true"
                className={cn(
                  "ring-surface absolute top-1 -left-[1.65rem] size-3 rounded-full ring-4",
                  milestone.current ? "bg-brand-red" : "bg-brand-blue",
                )}
              />
              <p
                className={cn(
                  "text-xs font-extrabold tracking-wide uppercase",
                  milestone.current ? "text-brand-red" : "text-muted-foreground",
                )}
              >
                {milestone.year}
              </p>
              <h3 className="text-ink mt-1 font-bold">{milestone.title}</h3>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                {milestone.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
