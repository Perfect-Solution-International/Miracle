import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { MediaFrame } from "@/components/common/media-frame";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";

import { COMPANY_INTRO_HIGHLIGHTS } from "../data/home.content";

export function CompanyIntroSection() {
  return (
    <Section aria-labelledby="intro-heading">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="reveal relative order-2 lg:order-1">
          <MediaFrame
            image={SITE_MEDIA.businessMeeting}
            aspect="aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]"
            className="w-full sm:w-4/5"
            sizes="(min-width: 1024px) 40vw, 80vw"
          />
          <MediaFrame
            image={SITE_MEDIA.warehouse}
            aspect="aspect-square"
            className="absolute -right-2 -bottom-10 hidden w-2/5 border-8 border-white sm:block lg:right-0"
            sizes="(min-width: 1024px) 20vw, 40vw"
          />
          <div
            aria-hidden="true"
            className="bg-brand-red absolute top-10 -left-3 h-24 w-1.5 rounded-full"
          />
        </div>

        <div className="order-1 flex flex-col gap-10 lg:order-2">
          <SectionHeading
            id="intro-heading"
            eyebrow="About Miracle International"
            title="One Partner for Your Business Requirements."
            description="Tell us what your business needs — a product, a supplier, a machine, a system, or an entire setup. Miracle International coordinates the solution, from sourcing and quotations through purchase, logistics, delivery, and the supporting services around them."
          />

          <ul className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {COMPANY_INTRO_HIGHLIGHTS.map(({ icon: Icon, title, description }) => (
              <li key={title} className="flex gap-4">
                <span className="border-brand-blue/15 text-brand-blue inline-flex size-11 shrink-0 items-center justify-center rounded-lg border">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <div className="space-y-1">
                  <h3 className="text-ink font-bold">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div>
            <Button asChild size="xl" variant="outline" className="text-ink">
              <Link href={ROUTES.public.about}>
                Discover Our Company
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
