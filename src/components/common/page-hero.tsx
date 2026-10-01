import type { ReactNode } from "react";
import Image from "next/image";

import type { SiteImage } from "@/config/site-media";
import { cn } from "@/lib/utils";

import type { BreadcrumbItem } from "./breadcrumb";
import { Eyebrow } from "./eyebrow";
import { MediaFrame } from "./media-frame";

export interface PageHeroStat {
  label: string;
  value: string;
}

/**
 * Modern Liquid Hero for inner public pages: breadcrumb, pulsing status badge, the page's only `h1`,
 * optional liquid ambient glow, quick stats, and modern media presentation.
 */
export function PageHero({
  title,
  description,
  eyebrow,
  badgeText,
  breadcrumbs,
  image,
  stats,
  children,
  className,
}: {
  title: string;
  description: string;
  eyebrow?: string;
  badgeText?: string;
  breadcrumbs?: readonly BreadcrumbItem[];
  image?: SiteImage;
  stats?: readonly PageHeroStat[];
  /** CTA row or other supporting content under the description. */
  children?: ReactNode;
  className?: string;
}) {
  const pillLabel = badgeText || eyebrow || "Miracle International";

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden border-b border-border/40 bg-white/70 backdrop-blur-md",
        className,
      )}
    >
      {/* Liquid Ambient Glow Mesh */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 -translate-x-1/2 h-96 w-full max-w-6xl rounded-full bg-gradient-to-tr from-brand-blue/15 via-indigo-500/10 to-brand-red/10 blur-[100px]"
      />

      <div
        className={cn(
          "container-page grid gap-10 py-12 md:py-16 lg:py-20",
          image && "lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16",
        )}
      >
        <div className="flex flex-col items-start gap-6">
          {/* Glowing Status Pill */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-brand-blue/20 bg-brand-blue/5 px-4 py-1.5 backdrop-blur-md shadow-xs">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-blue" />
            </span>
            <span className="text-xs font-bold tracking-widest text-brand-blue uppercase">
              {pillLabel}
            </span>
          </div>

          <h1 className="text-ink text-3xl leading-[1.1] font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-[3.5rem]">
            {title}
          </h1>

          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed text-pretty">
            {description}
          </p>

          {children}

          {/* Quick Metrics Bar (if provided) */}
          {stats && stats.length > 0 ? (
            <div className="mt-4 grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl public-card p-3.5 backdrop-blur-sm"
                >
                  <div className="text-xl font-extrabold text-navy sm:text-2xl">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {image ? (
          <div className="relative mx-auto w-full max-w-xl">
            {/* Glowing Backdrop */}
            <div
              aria-hidden="true"
              className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-brand-blue/20 to-brand-red/10 blur-xl opacity-70"
            />
            <div className="relative overflow-hidden rounded-3xl border-4 border-white bg-white shadow-2xl">
              <MediaFrame
                image={image}
                preload
                aspect="aspect-[4/3] lg:aspect-[5/4]"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
