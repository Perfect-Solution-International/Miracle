import { Building, Handshake, TrendingUp, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { ArrowLink } from "@/components/common/arrow-link";
import { FeatureCard } from "@/components/common/feature-card";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTES } from "@/config/routes";

import { getFeaturedOpportunities } from "../api/opportunity.service";
import type { Opportunity, OpportunityType } from "../types/opportunity.types";
import { OpportunityCard } from "./opportunity-card";

const OPPORTUNITY_CATEGORIES: readonly {
  type: OpportunityType;
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    type: "investment",
    icon: TrendingUp,
    title: "Investment Opportunities",
    description:
      "Evaluate ventures seeking capital, with structured due diligence support.",
  },
  {
    type: "franchise",
    icon: Handshake,
    title: "Franchise Opportunities",
    description: "Acquire or expand a franchise with guidance on setup and supply.",
  },
  {
    type: "business",
    icon: Building,
    title: "Business Opportunities",
    description: "Explore established businesses and partnership openings.",
  },
];

function SectionFrame({ children }: { children: ReactNode }) {
  return (
    <Section aria-labelledby="opportunities-heading">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          id="opportunities-heading"
          eyebrow="Featured Opportunities"
          title="Investment, Franchise & Business Opportunities"
          description="Opportunities are presented for evaluation only. Every opportunity is subject to independent due diligence, and no returns are guaranteed."
        />
        <ArrowLink href={ROUTES.public.investmentFranchise} className="shrink-0">
          View all opportunities
        </ArrowLink>
      </div>
      <div className="mt-12 lg:mt-14">{children}</div>
    </Section>
  );
}

function OpportunityGrid({ opportunities }: { opportunities: readonly Opportunity[] }) {
  return (
    <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {opportunities.map((opportunity) => (
        <li key={opportunity.id} className="reveal">
          <OpportunityCard opportunity={opportunity} />
        </li>
      ))}
    </ul>
  );
}

/**
 * Async Server Component. Shows featured listings from the service, and falls
 * back to the three opportunity categories when none are published, so the
 * section never shows invented listings to real visitors.
 */
export async function FeaturedOpportunitiesSection() {
  const opportunities = await getFeaturedOpportunities();

  return (
    <SectionFrame>
      {opportunities.length > 0 ? (
        <OpportunityGrid opportunities={opportunities} />
      ) : (
        <ul className="grid gap-5 md:grid-cols-3">
          {OPPORTUNITY_CATEGORIES.map((category) => (
            <li key={category.type}>
              <FeatureCard
                icon={category.icon}
                title={category.title}
                description={category.description}
                href={ROUTES.public.investmentFranchise}
              />
            </li>
          ))}
        </ul>
      )}
    </SectionFrame>
  );
}

/** Suspense fallback with the same footprint as the loaded section. */
export function FeaturedOpportunitiesSkeleton() {
  return (
    <SectionFrame>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
        {Array.from({ length: 3 }, (_, index) => (
          <Skeleton key={index} className="h-80 rounded-2xl" />
        ))}
      </div>
    </SectionFrame>
  );
}
