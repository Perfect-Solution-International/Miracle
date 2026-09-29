import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Eyebrow } from "./eyebrow";

export interface CtaAction {
  label: string;
  href: string;
}

/**
 * Modern Liquid Enterprise CTA Banner shared across public pages.
 */
export function CtaBanner({
  eyebrow,
  title,
  description,
  primary,
  secondary,
  headingId = "cta-heading",
  className,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  primary: CtaAction;
  secondary?: CtaAction;
  headingId?: string;
  className?: string;
}) {
  return (
    <section
      aria-labelledby={headingId}
      className={cn("bg-gradient-to-b from-slate-50/80 to-white py-14 md:py-20", className)}
    >
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-3xl border border-brand-blue/30 bg-gradient-to-br from-navy via-brand-blue-dark to-navy px-6 py-12 sm:px-12 md:py-16 lg:px-16 shadow-2xl">
          {/* Liquid Light Mesh Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 -z-10 size-96 rounded-full bg-brand-blue/30 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-24 -z-10 size-96 rounded-full bg-brand-red/20 blur-3xl"
          />

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-4">
              {eyebrow ? (
                <span className="bg-white/10 text-brand-blue-muted backdrop-blur-md rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
                  <Sparkles className="size-3.5" />
                  {eyebrow}
                </span>
              ) : null}
              <h2
                id={headingId}
                className="text-2xl sm:text-3xl lg:text-4xl leading-tight font-extrabold text-white tracking-tight"
              >
                {title}
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-white/80">
                {description}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              <Button asChild variant="accent" size="xl" className="shadow-lift">
                <Link href={primary.href}>
                  {primary.label}
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </Link>
              </Button>
              {secondary ? (
                <Button asChild variant="outline-inverse" size="xl" className="backdrop-blur-md">
                  <Link href={secondary.href}>{secondary.label}</Link>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
