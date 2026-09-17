import { ArrowUpRight, Briefcase, MapPin } from "lucide-react";
import Link from "next/link";

import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";

import { OPPORTUNITY_TYPE_LABELS, type Opportunity } from "../types/opportunity.types";

export function OpportunityCard({
  opportunity,
  className,
}: {
  opportunity: Opportunity;
  className?: string;
}) {
  // Detail pages arrive with the opportunities API; until then, link to the
  // listing anchored by slug.
  const href = `${ROUTES.public.investmentFranchise}#${opportunity.slug}`;

  return (
    <article
      className={cn(
        "group hover:border-brand-blue/30 hover:shadow-soft has-[a:focus-visible]:ring-ring relative flex h-full flex-col rounded-2xl border bg-white p-6 transition-all duration-300 has-[a:focus-visible]:ring-2 sm:p-7",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="bg-brand-blue-light text-brand-blue-dark rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase">
          {OPPORTUNITY_TYPE_LABELS[opportunity.type]}
        </span>
        {opportunity.isSample ? (
          <span className="rounded-full border border-dashed px-3 py-1 text-xs font-semibold text-amber-700">
            Sample listing
          </span>
        ) : null}
        <ArrowUpRight
          aria-hidden="true"
          className="text-muted-foreground group-hover:text-brand-red ml-auto size-5 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>

      <h3 className="text-ink mt-6 text-xl leading-snug font-bold">
        <Link href={href} className="outline-none after:absolute after:inset-0">
          {opportunity.title}
        </Link>
      </h3>
      <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
        {opportunity.summary}
      </p>

      <dl className="mt-auto grid gap-2 border-t pt-5 text-sm">
        <div className="flex items-center gap-2">
          <dt className="sr-only">Sector</dt>
          <Briefcase aria-hidden="true" className="text-brand-blue size-4" />
          <dd className="text-ink font-medium">{opportunity.sector}</dd>
        </div>
        <div className="flex items-center gap-2">
          <dt className="sr-only">Location</dt>
          <MapPin aria-hidden="true" className="text-brand-blue size-4" />
          <dd className="text-ink font-medium">{opportunity.location}</dd>
        </div>
        <div className="flex items-center justify-between gap-2 pt-1">
          <dt className="text-muted-foreground">Investment</dt>
          <dd className="text-ink font-bold">{opportunity.investmentLabel}</dd>
        </div>
      </dl>
    </article>
  );
}
