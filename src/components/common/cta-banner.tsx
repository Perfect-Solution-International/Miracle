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
  serviceContext?: ServiceContext;
  defaultService?: string;
}) {
  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        "bg-gradient-to-b from-slate-50/80 to-white py-14 md:py-20",
        className,
      )}
    >
      <div className="container-page">
        <div className="border-brand-blue/30 from-navy via-brand-blue-dark to-navy relative isolate overflow-hidden rounded-3xl border bg-gradient-to-br px-6 py-12 shadow-2xl sm:px-12 md:py-16 lg:px-16">
          {/* Liquid Light Mesh Glow */}
          <div
            aria-hidden="true"
            className="bg-brand-blue/30 pointer-events-none absolute -top-24 -right-24 -z-10 size-96 rounded-full blur-3xl"
          />
          <div
            aria-hidden="true"
            className="bg-brand-red/20 pointer-events-none absolute -bottom-24 -left-24 -z-10 size-96 rounded-full blur-3xl"
          />

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-4">
              {eyebrow ? (
                <span className="text-brand-blue-muted inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold tracking-wider uppercase backdrop-blur-md">
                  <Sparkles className="size-3.5" />
                  {eyebrow}
                </span>
              ) : null}
              <h2
                id={headingId}
                className="text-2xl leading-tight font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl"
              >
                {title}
              </h2>
              <p className="text-sm leading-relaxed text-white/80 sm:text-base">
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
                      <Button variant="outline-inverse" size="xl">
                        {secondary.label}
                      </Button>
                    }
                  />
                ) : (
                  <Button
                    asChild
                    variant="outline-inverse"
                    size="xl"
                    className="backdrop-blur-md"
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
