import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

import type { BreadcrumbItem } from "@/components/common/breadcrumb";
import { CtaBanner } from "@/components/common/cta-banner";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import type { SiteImage } from "@/config/site-media";
import { cn } from "@/lib/utils";

export interface SubpageFeature {
  title: string;
  description: string;
  icon?: LucideIcon;
  badge?: string;
}

export interface SubpageStat {
  label: string;
  value: string;
  helper?: string;
}

export interface SubpageTemplateProps {
  title: string;
  description: string;
  badgeText?: string;
  breadcrumbs?: readonly BreadcrumbItem[];
  image?: SiteImage;
  stats?: readonly SubpageStat[];
  features?: readonly SubpageFeature[];
  featuresHeading?: {
    eyebrow?: string;
    title: string;
    description?: string;
  };
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  ctaBannerProps?: {
    title?: string;
    description?: string;
    primaryLabel?: string;
    primaryHref?: string;
  };
  children?: ReactNode;
  className?: string;
}

/**
 * Universal Subpage Template for Miracle International
 * Provides a standardized, high-converting, modern liquid glassmorphic layout
 * across all inner pages and service subpages.
 */
export function SubpageTemplate({
  title,
  description,
  badgeText = "Miracle International",
  breadcrumbs,
  image,
  stats,
  features,
  featuresHeading,
  primaryAction,
  secondaryAction,
  ctaBannerProps,
  children,
  className,
}: SubpageTemplateProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {/* ─── Hero Section with Liquid Ambient Mesh Glow ─── */}
      <section className="relative isolate overflow-hidden border-b border-border/40 bg-white/80 backdrop-blur-md pt-6 pb-12 sm:pb-16 lg:pb-20">
        {/* Liquid Mesh Gradients */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 -z-10 -translate-x-1/2 h-[480px] w-full max-w-6xl rounded-full bg-gradient-to-tr from-brand-blue/15 via-indigo-500/10 to-brand-red/10 blur-[120px]"
        />

        <div className="container-page">
          <div
            className={cn(
              "grid gap-10",
              image ? "lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14" : "max-w-4xl",
            )}
          >
            {/* Left Content */}
            <div className="flex flex-col items-start gap-5">
              {/* Pulsing Live Badge Pill */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-brand-blue/20 bg-brand-blue/5 px-4 py-1.5 backdrop-blur-md shadow-xs">
                <span className="relative flex size-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-brand-blue" />
                </span>
                <span className="text-xs font-bold tracking-widest text-brand-blue uppercase">
                  {badgeText}
                </span>
              </div>

              <h1 className="text-ink text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl lg:text-[3.5rem]">
                {title}
              </h1>

              <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
                {description}
              </p>

              {/* Action Buttons */}
              {(primaryAction || secondaryAction) && (
                <div className="mt-2 flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center gap-3.5">
                  {primaryAction && (
                    <Button asChild variant="accent" size="xl" className="shadow-lg shadow-brand-blue/20">
                      <Link href={primaryAction.href}>
                        {primaryAction.label} <ArrowRight data-icon="inline-end" aria-hidden="true" />
                      </Link>
                    </Button>
                  )}
                  {secondaryAction && (
                    <Button
                      asChild
                      variant="secondary-hero"
                      size="xl"
                    >
                      <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
                    </Button>
                  )}
                </div>
              )}

              {/* Stats Bar */}
              {stats && stats.length > 0 && (
                <div className="mt-6 grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
                  {stats.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-2xl public-card p-4 backdrop-blur-sm"
                    >
                      <div className="text-2xl font-black text-navy">{s.value}</div>
                      <div className="text-xs font-bold text-ink/80">{s.label}</div>
                      {s.helper && (
                        <div className="text-[11px] text-muted-foreground">{s.helper}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Visual Image */}
            {image && (
              <div className="relative mx-auto w-full max-w-lg">
                <div
                  aria-hidden="true"
                  className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-brand-blue/20 to-brand-red/15 blur-2xl opacity-75"
                />
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border-4 border-white bg-slate-100 shadow-2xl sm:aspect-[1.25]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-navy/35 via-transparent to-transparent"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── Main Content Slot ─── */}
      {children}

      {/* ─── Features Grid Section (Optional) ─── */}
      {features && features.length > 0 && (
        <Section tone="surface">
          {featuresHeading && (
            <div className="mb-10 text-center">
              {featuresHeading.eyebrow && (
                <p className="text-xs font-bold uppercase tracking-widest text-brand-blue">
                  {featuresHeading.eyebrow}
                </p>
              )}
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                {featuresHeading.title}
              </h2>
              {featuresHeading.description && (
                <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                  {featuresHeading.description}
                </p>
              )}
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feat) => {
              const Icon = feat.icon || CheckCircle2;
              return (
                <div
                  key={feat.title}
                  className="group relative flex flex-col rounded-2xl public-card-clickable p-6"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-brand-blue-light text-brand-blue transition-colors group-hover:bg-brand-blue group-hover:text-white">
                      <Icon className="size-6" />
                    </div>
                    {feat.badge && (
                      <span className="rounded-full bg-brand-blue/10 px-2.5 py-0.5 text-xs font-semibold text-brand-blue">
                        {feat.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-ink group-hover:text-brand-blue transition-colors">
                    {feat.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Section>
      )}

      {/* ─── Standardized Bottom CTA Banner ─── */}
      <CtaBanner
        title={ctaBannerProps?.title || "Ready to Get Started with Miracle?"}
        description={
          ctaBannerProps?.description ||
          "Speak directly with our dedicated advisors or submit your custom project requirements for a prompt response."
        }
        primary={{
          label: ctaBannerProps?.primaryLabel || "Tell Us What You Need",
          href: ctaBannerProps?.primaryHref || ROUTES.public.tellUsWhatYouNeed,
        }}
        secondary={{
          label: "Contact Advisors",
          href: ROUTES.public.contact,
        }}
      />
    </div>
  );
}
