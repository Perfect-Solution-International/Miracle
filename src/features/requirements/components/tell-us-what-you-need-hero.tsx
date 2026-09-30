import Link from "next/link";

import { Eyebrow } from "@/components/common/eyebrow";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

/**
 * Tell Us What You Need Hero: Wide panoramic background photography showcasing global trade,
 * international sourcing, and executive coordination on the right, with a clean natural-light surface
 * on the left hosting the headline, value proposition, and call-to-action buttons.
 */
export function TellUsWhatYouNeedHero() {
  return (
    <section
      aria-labelledby="tell-us-heading"
      className="relative isolate overflow-hidden bg-white border-b border-slate-200/70 min-h-[580px] lg:min-h-[660px] flex items-center"
    >
      {/* 1. Full-Bleed Wide Panoramic Hero Image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-no-repeat transition-transform duration-1000"
        style={{
          backgroundImage: 'url("/images/global-business-services-hero-v2.png")',
          backgroundPosition: "right center",
        }}
      />

      {/* 2. Soft-White Gradient on Left Area (ensures crisp, 100% legibility on all viewports) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/20 lg:from-white/95 lg:via-white/60 lg:to-transparent pointer-events-none"
      />

      {/* 3. Bottom Melt to Next Section */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"
      />

      {/* 4. Left-Aligned Content Container */}
      <div className="container-page relative z-10 w-full py-16 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-12 items-center">
          <div className="flex flex-col gap-6 max-w-2xl lg:col-span-7 xl:col-span-6">
            <Eyebrow>TELL US WHAT YOU NEED</Eyebrow>

hiruneth
          {/* Quick Anchor CTA */}
          <div className="mt-8 flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center justify-center gap-3.5">
            <Button
              asChild
              variant="accent"
              size="xl"
                className="shadow-xl shadow-brand-blue/20 font-bold"
            >
              <a href="#intake-form">
                Fill Intake Form <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </a>
            </Button>
            <Button
              asChild
              variant="secondary-hero"
              size="xl"
              className="font-bold"

            <h1
              id="tell-us-heading"
              className="text-ink text-[2.5rem] leading-[1.05] font-extrabold tracking-[-0.03em] sm:text-5xl lg:text-[3.35rem] xl:text-[3.85rem]"
develop
            >
              Tell Us What{" "}
              <span className="text-brand-blue relative inline-block">
                You Need
                <span
                  aria-hidden="true"
                  className="bg-brand-red absolute -bottom-1 left-0 h-1 w-16 rounded-full sm:-bottom-2 sm:w-24"
                />
              </span>
            </h1>

            <p className="text-muted-foreground max-w-xl text-base leading-relaxed text-pretty sm:text-lg lg:text-xl font-medium">
              Have a specific requirement, business idea, product need, or travel request? Tell us what you’re looking for and our team will help you find the right solution.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row pt-1">
              <Button asChild size="xl" className="hover:bg-brand-blue-dark shadow-md">
                <a href="#requirement-form">
                  Submit Your Requirement
                </a>
              </Button>
              <Button
                asChild
                size="xl"
                variant="secondary-hero"
                className="bg-white/90 backdrop-blur-sm border-slate-200 hover:bg-white shadow-xs"
              >
                <Link href={ROUTES.public.services}>
                  Explore Our Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

