import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import type { BreadcrumbItem } from "@/components/common/breadcrumb";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import type { SiteImage } from "@/config/site-media";
import { cn } from "@/lib/utils";

export interface TravelSubpageAction {
  label: string;
  href: string;
  icon?: LucideIcon;
}

export interface TravelSubpageHeroProps {
  categoryLabel: string;
  title: string;
  description: string;
  image: SiteImage;
  primary: TravelSubpageAction;
  secondary?: TravelSubpageAction;
  breadcrumbs?: readonly BreadcrumbItem[];
  highlights?: readonly string[];
}

/**
 * Premium Two-Column Liquid Hero for Travel & Tourism Subpages
 * Left: Breadcrumb, pulsing category pill, bold typography, CTA actions, and travel trust badges.
 * Right: Crisp, high-resolution framed visual card with 3D glass border, ambient glow, and verified badge.
 */
export function TravelSubpageHero({
  categoryLabel,
  title,
  description,
  image,
  primary,
  secondary,
  breadcrumbs,
  highlights,
}: TravelSubpageHeroProps) {
  const travelHighlights = highlights ?? [
    "Verified Stays & Transport",
    "24/7 Dedicated Concierge",
    "Flexible Customization",
  ];

  return (
    <section
      aria-labelledby="travel-subpage-hero-heading"
      className="relative isolate overflow-hidden border-b border-border/40 bg-white/80 backdrop-blur-md pt-6 pb-12 sm:pb-16 lg:pb-20"
    >
      {/* Liquid Ambient Glow Mesh */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -z-10 -translate-x-1/2 h-[480px] w-full max-w-6xl rounded-full bg-gradient-to-tr from-brand-blue/15 via-indigo-500/10 to-brand-red/10 blur-[120px]"
      />

      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          {/* Left Column: Copy & Actions */}
          <div className="flex flex-col items-start gap-5">
            {/* Pulsing Live Category badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-brand-blue/20 bg-brand-blue/5 px-4 py-1.5 backdrop-blur-md shadow-xs">
              <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-brand-blue" />
              </span>
              <span className="text-xs font-bold tracking-widest text-brand-blue uppercase">
                {categoryLabel}
              </span>
            </div>

            {/* Strong page-specific heading */}
            <h1
              id="travel-subpage-hero-heading"
              className="text-ink text-3xl leading-[1.08] font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-[3.25rem]"
            >
              {title}
            </h1>

            {/* Short professional description */}
            <p className="text-muted-foreground text-base leading-relaxed sm:text-lg lg:text-xl text-pretty">
              {description}
            </p>

            {/* Highlights Strip */}
            <div className="mt-1 flex flex-wrap items-center gap-3">
              {travelHighlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-1.5 rounded-full border border-brand-blue/15 bg-white/90 px-3.5 py-1 text-xs font-bold text-navy shadow-xs backdrop-blur-sm"
                >
                  <CheckCircle2 className="size-3.5 text-brand-blue" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="mt-4 flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center gap-3 sm:gap-4">
              <Button
                asChild
                variant="accent"
                size="xl"
                className="h-12 rounded-xl px-7 text-base font-bold shadow-xl shadow-brand-red/20 transition-all hover:shadow-2xl sm:h-13 sm:px-8"
              >
                <Link href={primary.href}>
                  {primary.label}
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </Link>
              </Button>

              {secondary ? (
                <Button
                  asChild
                  variant="secondary-hero"
                  size="xl"
                >
                  <Link href={secondary.href}>{secondary.label}</Link>
                </Button>
              ) : (
                <Button
                  asChild
                  variant="secondary-hero"
                  size="xl"
                >
                  <Link href={ROUTES.public.travelTourism}>Explore All Packages</Link>
                </Button>
              )}
            </div>
          </div>

          {/* Right Column: Liquid Glass Framed Hero Showcase Card */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            {/* Outer Liquid Glass Frame */}
            <div className="relative mx-auto rounded-[2.5rem] p-3 sm:p-4 bg-gradient-to-b from-white/95 via-white/70 to-white/90 backdrop-blur-2xl border border-white shadow-[0_25px_60px_-15px_rgba(8,112,184,0.18)] ring-1 ring-black/5">
              <div className="relative aspect-[16/11] sm:aspect-[1.25] overflow-hidden rounded-[2rem] bg-slate-100 group shadow-inner">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 95vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Specular Liquid Glass Sheen */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 pointer-events-none"
                />

                {/* Soft Light Vignette */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none"
                />

                {/* Floating Liquid Glass Badge (Top Right) */}
                <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 rounded-full border border-white/60 bg-white/85 px-3.5 py-1.5 text-xs font-extrabold text-navy shadow-lg backdrop-blur-xl">
                  <Sparkles className="size-3.5 text-amber-500 fill-amber-500" />
                  <span>Curated Premium Travel</span>
                </div>

                {/* Floating Liquid Glass Review Card (Bottom Left) */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 sm:right-auto flex items-center gap-3 rounded-2xl border border-white/70 bg-white/95 p-3 shadow-xl backdrop-blur-2xl">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-indigo-600 text-white shadow-sm shrink-0">
                    <ShieldCheck className="size-5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-black text-navy">Miracle Verified Experience</span>
                    <span className="text-[11px] font-semibold text-slate-600">
                      100% Certified Quality &amp; Dedicated Care
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
