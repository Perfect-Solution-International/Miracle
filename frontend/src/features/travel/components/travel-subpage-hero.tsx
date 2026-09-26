import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { Breadcrumb, type BreadcrumbItem } from "@/components/common/breadcrumb";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import type { SiteImage } from "@/config/site-media";

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
  breadcrumbs?: readonly BreadcrumbItem[];
}

/**
 * Clean, modern two-column Hero Section for Miracle International Travel & Tourism pages.
 * Left: Breadcrumb, category label, strong heading, short description, one primary CTA button.
 * Right: High-quality, realistic image with rounded corners, subtle shadow, and soft fade/gradient blending.
 */
export function TravelSubpageHero({
  categoryLabel,
  title,
  description,
  image,
  primary,
  breadcrumbs,
}: TravelSubpageHeroProps) {
  const trail: readonly BreadcrumbItem[] = breadcrumbs ?? [
    { label: "Travel & Tourism", href: ROUTES.public.travelTourism },
    { label: categoryLabel },
  ];
  return (
    <section
      aria-labelledby="travel-subpage-hero-heading"
      className="relative isolate min-h-[420px] overflow-hidden border-b border-slate-100 bg-white sm:min-h-[460px] md:min-h-[480px] lg:flex lg:items-center"
    >
      {/* Right-side high-resolution image with seamless gradient melt */}
      <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-full overflow-hidden lg:w-[60%]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover object-center lg:object-[center_right]"
        />

        {/* 1. Left-to-right gradient melt: melts smoothly into white canvas on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent sm:via-white/75 lg:from-white lg:via-white/45 lg:to-transparent" />

        {/* 2. Extra soft white feathering on the left edge for flawless blend with copy */}
        <div className="absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-white to-transparent lg:block" />

        {/* 3. Top edge melt */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent sm:h-20" />

        {/* 4. Bottom edge melt */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent sm:h-24" />
      </div>

      <div className="container-page py-14 sm:py-18 md:py-22 lg:py-24">
        <div className="flex max-w-xl flex-col items-start gap-4 text-left sm:gap-5 lg:max-w-2xl">
          <Breadcrumb items={trail} />

          {/* Small category label */}
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/15 bg-white/95 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-blue shadow-xs backdrop-blur-sm">
            <span className="size-2 rounded-full bg-brand-blue" aria-hidden="true" />
            {categoryLabel}
          </div>

          {/* Strong page-specific heading */}
          <h1
            id="travel-subpage-hero-heading"
            className="text-ink text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.12]"
          >
            {title}
          </h1>

          {/* Short professional description */}
          <p className="text-muted-foreground max-w-xl text-base leading-relaxed sm:text-lg lg:text-xl">
            {description}
          </p>

          {/* One primary CTA button */}
          <div className="mt-2 flex items-center gap-4">
            <Button
              asChild
              variant="accent"
              size="xl"
              className="h-12 rounded-xl px-7 text-base font-bold shadow-md transition-all hover:shadow-lg sm:h-13 sm:px-8"
            >
              <Link href={primary.href}>
                {primary.label}
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

