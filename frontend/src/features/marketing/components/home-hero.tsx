import { ArrowRight, Check, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Eyebrow } from "@/components/common/eyebrow";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";
import { cn } from "@/lib/utils";

import { HERO_INDICATORS, HERO_PROGRESS_PREVIEW } from "../data/home.content";

/**
 * Homepage hero: asymmetric layout with the message on the left and a large
 * port photograph on the right. The overlapping card illustrates the
 * requirement-to-quotation flow rather than quoting any metric.
 */
export function HomeHero() {
  return (
    <section
      aria-labelledby="home-hero-heading"
      className="relative isolate overflow-hidden bg-white"
    >
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top_left,black_20%,transparent_70%)]"
      />

      <div className="container-page grid items-center gap-12 pt-10 pb-16 md:pt-14 lg:grid-cols-12 lg:gap-10 lg:pt-16 lg:pb-24">
        <div className="flex flex-col gap-7 lg:col-span-6 xl:col-span-6">
          <Eyebrow>Global Trade • Sourcing • Business Solutions</Eyebrow>

          <h1
            id="home-hero-heading"
            className="text-ink text-[2.6rem] leading-[1.04] font-extrabold tracking-[-0.03em] sm:text-6xl lg:text-[3.5rem] xl:text-[4.1rem]"
          >
            Everything Your Business Needs,{" "}
            <span className="text-brand-blue relative">
              Connected Globally.
              <span
                aria-hidden="true"
                className="bg-brand-red absolute -bottom-1 left-0 h-1 w-16 rounded-full sm:-bottom-2 sm:w-24"
              />
            </span>
          </h1>

          <p className="text-muted-foreground max-w-xl text-lg leading-relaxed text-pretty sm:text-xl">
            Miracle International connects businesses with products, suppliers, logistics,
            technology, and professional services across international markets.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="xl" className="hover:bg-brand-blue-dark">
              <Link href={ROUTES.public.tellUsWhatYouNeed}>
                Tell Us What You Need
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline" className="text-ink">
              <Link href={ROUTES.public.services}>Explore Our Services</Link>
            </Button>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-3 pt-2">
            {HERO_INDICATORS.map((indicator) => (
              <li
                key={indicator}
                className="text-ink flex items-center gap-2 text-sm font-semibold"
              >
                <span className="bg-brand-blue-light text-brand-blue inline-flex size-5 items-center justify-center rounded-full">
                  <Check aria-hidden="true" className="size-3" strokeWidth={3} />
                </span>
                {indicator}
              </li>
            ))}
          </ul>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative lg:col-span-6 lg:pl-6 xl:pl-10">
      {/* Offset brand block behind the photo. */}
      <div
        aria-hidden="true"
        className="bg-brand-blue absolute top-10 -right-4 bottom-10 left-16 -z-10 hidden rounded-3xl sm:block lg:-right-8"
      />

      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl sm:mr-6 lg:aspect-[4/5] xl:aspect-[5/6]">
        <Image
          src={SITE_MEDIA.heroPort.src}
          alt={SITE_MEDIA.heroPort.alt}
          fill
          preload
          sizes="(min-width: 1280px) 600px, (min-width: 1024px) 48vw, 100vw"
          className="hero-drift object-cover"
        />
        <div
          aria-hidden="true"
          className="from-navy/70 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
        />

        <p className="text-ink shadow-soft absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-2 text-xs font-bold backdrop-blur sm:top-6 sm:left-6">
          <MapPin aria-hidden="true" className="text-brand-red size-3.5" />
          China · India · UAE · Worldwide
        </p>
      </div>

      <div className="shadow-lift relative mx-4 -mt-16 rounded-2xl border bg-white p-5 sm:absolute sm:bottom-8 sm:-left-2 sm:mx-0 sm:mt-0 sm:w-80 lg:-left-6">
        <p className="text-muted-foreground text-[0.7rem] font-bold tracking-[0.16em] uppercase">
          Your requirement
        </p>
        <p className="text-ink mt-1 font-bold">Industrial machinery sourcing</p>
        <ol className="mt-4 space-y-3">
          {HERO_PROGRESS_PREVIEW.map((step) => {
            const Icon = step.icon;
            const current = step.state === "current";
            return (
              <li key={step.label} className="flex items-center gap-3 text-sm">
                <span
                  className={cn(
                    "inline-flex size-7 items-center justify-center rounded-full",
                    current
                      ? "bg-brand-red/10 text-brand-red"
                      : "bg-brand-blue-light text-brand-blue",
                  )}
                >
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                <span
                  className={cn(
                    "font-medium",
                    current ? "text-ink" : "text-muted-foreground",
                  )}
                >
                  {step.label}
                </span>
                {current ? (
                  <span className="bg-brand-red ml-auto size-2 animate-pulse rounded-full motion-reduce:animate-none" />
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
