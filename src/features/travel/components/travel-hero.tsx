"use client";

import { ArrowRight, Compass, Globe } from "lucide-react";
import Link from "next/link";

import { Eyebrow } from "@/components/common/eyebrow";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

export function TravelHero() {
  return (
    <section
      aria-labelledby="travel-hero-heading"
      className="relative isolate overflow-hidden border-b border-slate-200/70 bg-white"
    >
      {/* 1. Underlying Cinematic Hero Image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 md:bg-fixed"
        style={{
          backgroundImage: 'url("/images/travel/travel-hero-cinematic.png")',
        }}
      />

      {/* 2. Soft-White Overall Wash (lightens image without washing it out completely) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-white/35"
      />

      {/* 3. Soft-White Vignette & Edge Blend (softens left, right, and corners into the light page) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.5)_65%,rgba(255,255,255,0.92)_100%)]"
      />

      {/* 4. Vertical Smooth Melt (top navbar connection & bottom section seamless blend) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-white/90 via-transparent to-white/95"
      />

      {/* Content */}
      <div className="container-page relative z-10 flex flex-col items-center gap-5 pt-20 pb-12 text-center sm:pt-28 sm:pb-16 md:pt-36 md:pb-20">
        <Eyebrow
          tone="default"
          className="rounded-full border border-white/80 bg-white/95 px-4 py-1.5 font-extrabold text-navy shadow-sm backdrop-blur-md"
        >
          Miracle International Travel &amp; Tourism
        </Eyebrow>

        <h1
          id="travel-hero-heading"
          className="max-w-3xl text-4xl leading-[1.08] font-extrabold tracking-tight text-navy sm:text-5xl md:text-6xl"
        >
          Travel Beyond Boundaries
        </h1>

        <p className="max-w-2xl text-base leading-relaxed font-medium text-slate-700 sm:text-lg">
          Explore destinations, plan customized journeys, arrange flights, and get travel
          support with Miracle International.
        </p>

        {/* Dedicated Inbound & Outbound Tour Buttons */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          <Button
            size="xl"
            asChild
            className="w-full sm:w-auto min-w-[210px] rounded-full bg-brand-blue hover:bg-brand-blue-dark text-white font-bold shadow-lift group text-base py-6 px-8 transition-all hover:scale-105"
          >
            <Link href={ROUTES.public.inboundTravel} className="flex items-center justify-center gap-2.5">
              <Compass className="size-5 transition-transform group-hover:rotate-45" />
              <span>Inbound Tours</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

          <Button
            size="xl"
            variant="outline"
            asChild
            className="w-full sm:w-auto min-w-[210px] rounded-full border-2 border-slate-300 bg-white hover:bg-slate-50 text-navy font-bold shadow-soft hover:shadow-lift group text-base py-6 px-8 transition-all hover:scale-105"
          >
            <Link href={ROUTES.public.outboundTravel} className="flex items-center justify-center gap-2.5">
              <Globe className="size-5 text-brand-blue transition-transform group-hover:scale-110" />
              <span>Outbound Tours</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

