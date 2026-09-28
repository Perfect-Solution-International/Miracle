import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { Breadcrumb, type BreadcrumbItem } from "@/components/common/breadcrumb";
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
  const trail: readonly BreadcrumbItem[] = breadcrumbs ?? [
    { label: "Travel & Tourism", href: ROUTES.public.travelTourism },
    { label: categoryLabel },
  ];

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
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 -z-10 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />

      <div className="container-page">
        <div className="mb-6">
          <Breadcrumb items={trail} />
        </div>

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
                <Button asChild variant="outline" size="xl" className="bg-white/80">
                  <Link href={secondary.href}>{secondary.label}</Link>
                </Button>
              ) : (
                <Button asChild variant="outline" size="xl" className="bg-white/80">
                  <Link href={ROUTES.public.travelTourism}>Explore All Packages</Link>
                </Button>
              )}
            </div>
          </div>

          {/* Right Column: Crisp High-Resolution Framed Visual Card */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            {/* Glowing Backdrop */}
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-brand-blue/25 via-indigo-500/15 to-brand-red/20 blur-2xl opacity-75"
            />

            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border-4 border-white bg-slate-100 shadow-2xl sm:aspect-[1.25]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 95vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent"
              />

              {/* Floating Verified Badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-2xl border border-white/25 bg-white/95 px-4 py-2.5 shadow-lg backdrop-blur-md">
                <span className="flex size-7 items-center justify-center rounded-full bg-brand-blue text-white shadow-xs">
                  <ShieldCheck className="size-4" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-xs font-bold text-navy">Miracle Verified Experience</span>
                  <span className="text-[10px] text-muted-foreground">Certified Quality &amp; Care</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
