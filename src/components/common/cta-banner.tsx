import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";
import { ServiceRequirementDialog } from "@/features/requirements/components/service-requirement-dialog";
import type { ServiceContext } from "@/features/requirements/data/service-requirement-options";

export interface CtaAction {
  label: string;
  href: string;
}

/**
 * Shared white CTA banner for public pages.
 */
export function CtaBanner({
  eyebrow,
  title,
  description,
  primary,
  secondary,
  headingId = "cta-heading",
  className,
  tone = "default",
  serviceContext,
  defaultService,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  primary: CtaAction;
  secondary?: CtaAction;
  headingId?: string;
  className?: string;
  tone?: "default" | "light";
  serviceContext?: ServiceContext;
  defaultService?: string;
}) {
  const light = tone === "light";
  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        "bg-white py-14 md:py-20",
        className,
      )}
    >
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-12 shadow-soft sm:px-12 md:py-16 lg:px-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-4">
              {eyebrow ? (
                <span className="bg-brand-blue-light text-brand-blue inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold tracking-wider uppercase">
                  <Sparkles className="size-3.5" />
                  {eyebrow}
                </span>
              ) : null}
              <h2
                id={headingId}
                className="text-ink text-2xl leading-tight font-extrabold tracking-tight sm:text-3xl lg:text-4xl"
              >
                {title}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                {description}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              {serviceContext ? (
                <ServiceRequirementDialog
                  context={serviceContext}
                  defaultService={defaultService}
                  trigger={
                    <Button variant="accent" size="xl" className="shadow-lift">
                      {primary.label}
                      <ArrowRight data-icon="inline-end" aria-hidden="true" />
                    </Button>
                  }
                />
              ) : (
                <Button asChild variant="accent" size="xl" className="shadow-lift">
                  <Link href={primary.href}>
                    {primary.label}
                    <ArrowRight data-icon="inline-end" aria-hidden="true" />
                  </Link>
                </Button>
              )}
              {secondary ? (
                serviceContext && secondary.href === ROUTES.public.tellUsWhatYouNeed ? (
                  <ServiceRequirementDialog
                    context={serviceContext}
                    defaultService={defaultService}
                    trigger={
                      <Button variant={light ? "secondary-hero" : "outline-inverse"} size="xl">
                        {secondary.label}
                      </Button>
                    }
                  />
                ) : (
                  <Button
                    asChild
                    variant={light ? "secondary-hero" : "outline-inverse"}
                    size="xl"
                  >
                    <Link href={secondary.href}>{secondary.label}</Link>
                  </Button>
                )
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
