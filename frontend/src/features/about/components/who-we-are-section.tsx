import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { MediaFrame } from "@/components/common/media-frame";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";

import { MISSION_VISION_VALUES } from "../data/about.content";

export function WhoWeAreSection() {
  return (
    <Section aria-labelledby="who-we-are-heading">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.85fr_1fr] lg:items-center lg:gap-10">
        <div className="flex flex-col gap-6">
          <SectionHeading
            id="who-we-are-heading"
            eyebrow="Who We Are"
            title="A Trusted Partner for Global Business"
          />
          <p className="text-muted-foreground leading-relaxed">
            Miracle International is a diversified global trade and business solutions
            company, committed to connecting businesses with international opportunities.
            We specialize in import and export, product sourcing, wholesale trading,
            business consultation, investment support, travel and tourism services, IT
            solutions and more — all through a single, reliable platform.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Our mission is to simplify international business and provide end-to-end
            support, helping our clients source, trade, invest and grow with confidence.
          </p>
          <div>
            <Button asChild size="xl" className="hover:bg-brand-blue-dark">
              <Link href={ROUTES.public.services}>
                Our Services
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative">
          <MediaFrame
            image={SITE_MEDIA.businessMeeting}
            aspect="aspect-[4/5] sm:aspect-square lg:aspect-[4/5]"
            sizes="(min-width: 1024px) 25vw, 80vw"
            overlay
          />
          <p className="absolute bottom-6 left-6 max-w-[80%] text-lg leading-snug font-bold text-white">
            Global Business
            <br />
            Stronger Together
            <span
              aria-hidden="true"
              className="mt-2 block h-0.5 w-10 rounded-full bg-white"
            />
          </p>
        </div>

        <div className="divide-border divide-y rounded-2xl border p-2 sm:p-3">
          {MISSION_VISION_VALUES.map(({ icon: Icon, title, description, bullets }) => (
            <div key={title} className="flex gap-4 p-4">
              <span className="bg-brand-blue-light text-brand-blue inline-flex size-11 shrink-0 items-center justify-center rounded-lg">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <div className="space-y-1.5">
                <h3 className="text-ink font-bold">{title}</h3>
                {description ? (
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {description}
                  </p>
                ) : null}
                {bullets ? (
                  <ul className="text-muted-foreground grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                    {bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-1.5">
                        <span
                          aria-hidden="true"
                          className="bg-brand-blue size-1 shrink-0 rounded-full"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
