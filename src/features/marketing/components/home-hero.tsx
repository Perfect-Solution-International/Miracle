import Link from "next/link";

import { Eyebrow } from "@/components/common/eyebrow";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

/**
 * Homepage Hero: Wide cinematic background photography showcasing global trade & enterprise
 * on the right, with a clean natural-light white surface on the left hosting the headline,
 * value proposition, and call-to-action buttons.
 */
export function HomeHero() {
  return (
    <section
      aria-labelledby="home-hero-heading"
      className="relative isolate overflow-hidden bg-white border-b border-slate-200/70 min-h-[580px] lg:min-h-[660px] flex items-center"
    >
      {/* 1. Full-Bleed Wide Panoramic Hero Image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-no-repeat transition-transform duration-1000"
        style={{
          backgroundImage: 'url("/images/home/home-hero-bg.jpg")',
          backgroundPosition: "right center",
        }}
      />

      {/* 2. Soft-White Gradient on Left Area (ensures crisp, 100% legibility on all viewports) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent lg:from-white/95 lg:via-white/55 lg:to-transparent pointer-events-none"
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
            <Eyebrow>Global Trade • Sourcing • Business Solutions</Eyebrow>

            <h1
              id="home-hero-heading"
              className="text-ink text-[2.5rem] leading-[1.05] font-extrabold tracking-[-0.03em] sm:text-5xl lg:text-[3.35rem] xl:text-[3.85rem]"
            >
              Everything Your Business Needs,{" "}
              <span className="text-brand-blue relative inline-block">
                Connected Globally.
                <span
                  aria-hidden="true"
                  className="bg-brand-red absolute -bottom-1 left-0 h-1 w-16 rounded-full sm:-bottom-2 sm:w-24"
                />
              </span>
            </h1>

            <p className="text-muted-foreground max-w-xl text-base leading-relaxed text-pretty sm:text-lg lg:text-xl font-medium">
              Miracle International connects businesses with products, suppliers, logistics,
              technology, and professional services across international markets.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row pt-1">
              <Button asChild size="xl" className="hover:bg-brand-blue-dark shadow-md">
                <Link href={ROUTES.public.tellUsWhatYouNeed}>
                  Tell Us What You Need
                </Link>
              </Button>
              <Button
                asChild
                size="xl"
                variant="secondary-hero"
                className="bg-white/90 backdrop-blur-sm border-slate-200 hover:bg-white shadow-xs"
              >
                <Link href={ROUTES.public.services}>Explore Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
