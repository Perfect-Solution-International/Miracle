"use client";

import { ArrowRight, Compass, Globe } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

export function TravelHero() {
  return (
    <section
      aria-labelledby="travel-hero-heading"
      className="relative isolate flex min-h-[580px] items-center overflow-hidden border-b border-slate-200/80 bg-white lg:min-h-[660px]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: 'url("/images/travel/travel-hero-cinematic.png")',
          backgroundPosition: "right center",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent max-sm:via-white/95 max-sm:to-white/65 lg:from-white/95 lg:via-white/70 lg:to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent"
      />
      <div className="container-page relative z-10 w-full py-16 sm:py-20 lg:py-24">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-slate-200/90 bg-white/95 px-4 py-1.5 text-xs font-semibold text-slate-800 shadow-2xs">
            <span
              aria-hidden="true"
              className="size-2 rounded-full bg-blue-600 ring-4 ring-blue-100"
            />
            <span>Miracle International Travel &amp; Tourism</span>
          </div>

          <h1
            id="travel-hero-heading"
            className="text-3xl leading-[1.08] font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[3.25rem] xl:text-[3.75rem]"
          >
            Travel Beyond{" "}
            <span className="bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Boundaries
            </span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Explore destinations, plan customized journeys, arrange flights, and get
            travel support with Miracle International.
          </p>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row">
            <Button
              size="xl"
              asChild
              className="group inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg"
            >
              <Link
                href={ROUTES.public.inboundTravel}
                className="flex items-center justify-center gap-2.5"
              >
                <Compass className="size-5 transition-transform group-hover:rotate-45" />
                <span>Inbound Tours</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              size="xl"
              variant="outline"
              asChild
              className="group inline-flex items-center justify-center rounded-xl border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-800 shadow-2xs transition-all hover:-translate-y-0.5 hover:bg-white"
            >
              <Link
                href={ROUTES.public.outboundTravel}
                className="flex items-center justify-center gap-2.5"
              >
                <Globe className="size-5 text-blue-600 transition-transform group-hover:scale-110" />
                <span>Outbound Tours</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
