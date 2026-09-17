import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Eyebrow } from "./eyebrow";

export interface CtaAction {
  label: string;
  href: string;
}

/**
 * Closing call to action shared by every public page.
 *
 * Brand blue panel with the red accent reserved for the primary action, so the
 * single most important next step is unambiguous.
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
      className={cn("bg-background py-16 md:py-20", className)}
    >
      <div className="container-page">
        <div className="from-brand-blue to-brand-blue-dark relative isolate bg-gradient-to-br overflow-hidden rounded-3xl px-6 py-14 sm:px-12 md:py-20 lg:px-20">
          <div aria-hidden="true" className="bg-grid-inverse absolute inset-0 -z-10" />

          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-5">
              {eyebrow ? <Eyebrow tone="inverse">{eyebrow}</Eyebrow> : null}
              <h2
                id={headingId}
                className="text-3xl leading-tight font-bold text-white sm:text-4xl lg:text-5xl"
              >
                {title}
              </h2>
              <p className="text-base leading-relaxed text-white/75 sm:text-lg">
                {description}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              <Button asChild variant="accent" size="xl">
                <Link href={primary.href}>
                  {primary.label}
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </Link>
              </Button>
              {secondary ? (
                <Button asChild variant="outline-inverse" size="xl">
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
