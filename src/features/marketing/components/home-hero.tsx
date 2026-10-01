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
      className="public-hero"
    >
      {/* 1. Full-Bleed Wide Panoramic Hero Image */}
      <div
        aria-hidden="true"
        className="public-hero-media bg-cover bg-no-repeat"
        style={{
          backgroundImage: 'url("/images/home/home-hero-bg.jpg")',
          backgroundPosition: "right center",
        }}
      />

      {/* 2. Soft-White Gradient on Left Area (ensures crisp, 100% legibility on all viewports) */}
      <div
        aria-hidden="true"
        className="public-hero-haze"
      />

      {/* 3. Bottom Melt to Next Section */}
      <div
        aria-hidden="true"
        className="public-hero-fade"
      />

      {/* 4. Left-Aligned Content Container */}
      <div className="container-page public-hero-content">
        <div className="grid lg:grid-cols-12 items-center">
          <div className="public-hero-copy flex flex-col items-start gap-6 lg:col-span-7 xl:col-span-6">
            <Eyebrow>Global Trade • Sourcing • Business Solutions</Eyebrow>

            <h1
              id="home-hero-heading"
              className="public-hero-title mt-0"
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

            <p className="public-hero-description mt-0 text-pretty">
              Miracle International connects businesses with products, suppliers, logistics,
              technology, and professional services across international markets.
            </p>

            <div className="public-hero-actions mt-0">
              <Button asChild variant="accent" size="xl" className="shadow-md">
                <Link href={ROUTES.public.tellUsWhatYouNeed}>
                  Tell Us What You Need
                </Link>
              </Button>
              <Button
                asChild
                size="xl"
                variant="secondary-hero"
                className="shadow-xs"
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
