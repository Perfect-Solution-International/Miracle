import { ArrowRight, CheckCircle2, FileCheck, Headphones, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";

/**
 * Full-Screen Cinematic Visa Services Hero Section with Clean White Tourism Styling.
 * Spreads the visual across the entire hero background with a soft-white wash overlay.
 */
export function VisaHero() {
  return (
    <section
      aria-labelledby="visa-hero-heading"
      className="relative isolate overflow-hidden bg-white border-b border-slate-200/70"
    >
      {/* 1. Underlying Screen-Wide Visa & Travel Hero Image */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105 blur-[2px] md:blur-[2.5px] md:bg-fixed"
        style={{
          backgroundImage: `url("${SITE_MEDIA.travelCategoryCards.customized.src}")`,
          backgroundPosition: "center 50%",
        }}
      />

      {/* 2. Soft-White Overall Wash */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-white/30 pointer-events-none"
      />

      {/* 3. Soft-White Radial Vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.45)_65%,rgba(255,255,255,0.92)_100%)] pointer-events-none"
      />

      {/* 4. Top & Bottom Smooth Melt Gradients */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-white/85 via-transparent to-white/95 pointer-events-none"
      />

      {/* Foreground Content with Spacious Height */}
      <div className="container-page relative z-10 flex flex-col items-center gap-5 pt-16 pb-14 sm:pt-20 sm:pb-18 md:pt-28 md:pb-24 max-w-4xl mx-auto text-center">
        {/* Category Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/95 px-4 py-1.5 text-xs font-extrabold tracking-wider text-navy uppercase shadow-sm backdrop-blur-md">
          <span className="relative flex size-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-brand-blue" />
          </span>
          <span>Visa &amp; Consular Services • Worldwide Support</span>
        </div>

        {/* Hero Heading */}
        <h1
          id="visa-hero-heading"
          className="text-navy text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.1] font-extrabold tracking-tight max-w-3xl"
        >
          Visa Assistance Made Simple &amp; Reliable
        </h1>

        {/* Hero Subtitle */}
        <p className="max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed font-medium text-slate-700">
          Tell us about your destination and travel plans. Miracle International assists with document verification, embassy submissions, and step-by-step guidance.
        </p>

        {/* Badges Strip */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
          {[
            { icon: FileCheck, title: "Document Verification & Review" },
            { icon: ShieldCheck, title: "Embassy Checklist Guidance" },
            { icon: Headphones, title: "Dedicated Visa Desk Care" },
            { icon: Sparkles, title: "Fast-Track Form Assistance" },
          ].map((item, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/95 px-3.5 py-1.5 text-xs font-bold text-navy shadow-xs backdrop-blur-md transition-all hover:scale-105"
            >
              <item.icon className="size-3.5 text-brand-blue" />
              <span>{item.title}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-2 flex flex-col sm:flex-row items-center gap-3.5">
          <Button
            asChild
            size="lg"
            className="bg-brand-blue hover:bg-brand-blue-dark h-11 sm:h-12 rounded-full px-7 text-sm font-bold text-white shadow-lg shadow-brand-blue/20 transition-all hover:shadow-xl"
          >
            <a href="#visa-request-form">
              Request Visa Assistance
              <ArrowRight className="size-4 ml-2" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-11 sm:h-12 rounded-full border-white/90 bg-white/95 px-7 text-sm font-bold text-navy shadow-sm backdrop-blur-md hover:bg-white"
          >
            <Link href={ROUTES.public.travelTourism}>
              All Travel &amp; Tours
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
