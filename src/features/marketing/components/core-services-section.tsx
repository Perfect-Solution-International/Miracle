import { ArrowRight, MessageSquarePlus } from "lucide-react";
import Link from "next/link";

import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { ArrowLink } from "@/components/common/arrow-link";
import { ROUTES } from "@/config/routes";

import { CORE_SERVICES } from "../data/core-services";
import { ServiceCard } from "./service-card";

/**
 * Bento-style services grid: one large featured tile, compact tiles around it,
 * and a closing prompt tile for requirements that do not fit a category.
 */
export function CoreServicesSection() {
  const [featured, ...rest] = CORE_SERVICES;

  return (
    <Section tone="surface" aria-labelledby="services-heading">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          id="services-heading"
          eyebrow="What We Do"
          title="Solutions Built Around Your Business"
          description="Trade, growth, and support services that work together, so one requirement can draw on everything it needs."
        />
        <ArrowLink href={ROUTES.public.services} className="shrink-0">
          View all services
        </ArrowLink>
      </div>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5">
        {featured ? (
          <li className="reveal sm:col-span-2 lg:row-span-2">
            <ServiceCard service={featured} className="h-full" />
          </li>
        ) : null}
        {rest.map((service) => (
          <li key={service.id} className="reveal">
            <ServiceCard service={service} className="h-full" />
          </li>
        ))}
        <li className="reveal">
          <Link
            href={ROUTES.public.tellUsWhatYouNeed}
            className="group border-brand-blue/30 hover:border-brand-blue hover:bg-brand-blue flex h-full min-h-48 flex-col justify-between gap-6 rounded-2xl border border-dashed p-6 transition-colors duration-300"
          >
            <MessageSquarePlus
              aria-hidden="true"
              className="text-brand-blue size-6 transition-colors group-hover:text-white"
            />
            <span className="space-y-2">
              <span className="text-ink block text-lg font-bold transition-colors group-hover:text-white">
                Need something else?
              </span>
              <span className="text-brand-blue inline-flex items-center gap-1.5 text-sm font-semibold transition-colors group-hover:text-white">
                Tell us your requirement
                <ArrowRight aria-hidden="true" className="size-4" />
              </span>
            </span>
          </Link>
        </li>
      </ul>
    </Section>
  );
}
