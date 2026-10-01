import { ArrowRight, Check, ChevronRight, Network } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { CtaBanner } from "@/components/common/cta-banner";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { ServiceRequirementDialog } from "@/features/requirements";
import { cn } from "@/lib/utils";

import {
  BUSINESS_DETAILS,
  type BusinessDetail,
  type BusinessDetailKey,
} from "../data/business-detail";

function BusinessHero({ detail }: { detail: BusinessDetail }) {
  return (
    <section
      aria-labelledby="business-detail-heading"
      className="public-hero"
    >
      <Image
        src={detail.image.src}
        alt=""
        fill
        preload
        sizes="100vw"
        className="public-hero-media object-cover"
      />
      <div
        aria-hidden="true"
        className="public-hero-haze"
      />
      <div
        aria-hidden="true"
        className="public-hero-fade"
      />

      <div className="container-page public-hero-content">
        <div className="public-hero-copy md:max-w-[60%] lg:max-w-[53%] xl:max-w-[49%]">
          <div className="public-hero-badge text-brand-blue">
            <span className="relative flex size-2">
              <span className="bg-brand-blue absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
              <span className="bg-brand-blue relative inline-flex size-2 rounded-full" />
            </span>
            <span className="text-xs font-bold tracking-widest uppercase">
              {detail.title}
            </span>
          </div>
          <h1
            id="business-detail-heading"
            className="public-hero-title"
          >
            {detail.headline}
          </h1>
          <p className="public-hero-description font-semibold text-slate-700">
            {detail.lead}
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-700">
            {detail.introduction}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Service highlights">
            {detail.heroHighlights.map((highlight) => (
              <li
                key={highlight}
                className="text-navy border-brand-blue/15 inline-flex items-center gap-2 rounded-full border bg-white/95 px-3 py-1.5 text-xs font-semibold shadow-xs"
              >
                <Check aria-hidden="true" className="text-brand-blue size-3.5" />
                {highlight}
              </li>
            ))}
          </ul>
          <div className="public-hero-actions">
            <ServiceRequirementDialog
              context="business"
              defaultService={detail.title}
              trigger={
                <Button
                  variant="accent"
                  size="xl"
                  className="shadow-brand-blue/20 shadow-lg"
                >
                  {detail.cta.label}{" "}
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </Button>
              }
            />
            <Button asChild variant="secondary-hero" size="xl">
              <Link href={ROUTES.public.businessSolutions}>
                Explore Business Solutions
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function BusinessOverview({ detail }: { detail: BusinessDetail }) {
  return (
    <Section aria-labelledby="overview-heading" className="bg-background">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
        <SectionHeading
          id="overview-heading"
          eyebrow="Service Overview"
          title={`A Practical Approach to ${detail.title}`}
          description={detail.overview}
        />
        <div className="border-brand-blue/20 border-t">
          {detail.overviewPoints.map((point, index) => (
            <div
              key={point}
              className="border-brand-blue/20 flex items-center gap-5 border-b py-5"
            >
              <span className="text-brand-blue shrink-0 text-sm font-bold">
                0{index + 1}
              </span>
              <p className="text-ink font-semibold">{point}</p>
              <ArrowRight
                aria-hidden="true"
                className="text-brand-blue/40 ml-auto size-4 shrink-0"
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function BusinessCapabilities({ detail }: { detail: BusinessDetail }) {
  return (
    <Section aria-labelledby="capabilities-heading" className="bg-brand-blue-light/30">
      <SectionHeading
        id="capabilities-heading"
        eyebrow="What We Help With"
        title={`${detail.title} Capabilities`}
        description="Focused support across the decisions and practical work that move this service forward."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {detail.capabilities.map(({ title, description, icon: Icon }, index) => {
          const featured = detail.featuredLast
            ? index === detail.capabilities.length - 1
            : index === 0;
          return (
            <article
              key={title}
              className={cn(
                "group hover:border-brand-blue border-border/80 shadow-soft relative flex min-h-48 flex-col rounded-2xl border bg-white p-6 transition-all duration-200 motion-safe:hover:-translate-y-1",
                featured && "lg:col-span-2 lg:min-h-56 lg:p-8",
              )}
            >
              <div className="bg-brand-blue-light text-brand-blue flex size-11 items-center justify-center rounded-xl">
                <Icon aria-hidden="true" className="size-5" />
              </div>
              <div className="mt-auto pt-8">
                <h3
                  className={cn("text-ink font-bold", featured ? "text-xl" : "text-lg")}
                >
                  {title}
                </h3>
                <p className="text-muted-foreground mt-2 max-w-lg text-sm leading-relaxed">
                  {description}
                </p>
              </div>
              <ArrowRight
                aria-hidden="true"
                className="text-brand-blue absolute top-7 right-7 size-4 transition-transform motion-safe:group-hover:translate-x-1"
              />
            </article>
          );
        })}
      </div>
    </Section>
  );
}

function FeatureNodes({ feature }: { feature: BusinessDetail["feature"] }) {
  if (feature.kind === "system") {
    return (
      <div className="border-brand-blue/15 bg-brand-blue-light/40 rounded-2xl border p-5">
        <div className="bg-brand-blue mx-auto mb-4 flex max-w-52 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white">
          <Network aria-hidden="true" className="size-4" /> Your Business
        </div>
        <ol className="grid grid-cols-2 gap-2">
          {feature.nodes.map((node) => (
            <li
              key={node}
              className="border-brand-blue/10 text-ink flex items-center gap-2 rounded-lg border bg-white p-3 text-sm font-semibold"
            >
              <span className="bg-brand-red size-1.5 shrink-0 rounded-full" />
              {node}
            </li>
          ))}
        </ol>
      </div>
    );
  }
  if (feature.kind === "checklist") {
    return (
      <ol className="grid gap-2 sm:grid-cols-2">
        {feature.nodes.map((node, index) => (
          <li
            key={node}
            className="border-brand-blue/15 text-ink flex items-center gap-3 rounded-lg border bg-white p-3 text-sm font-semibold"
          >
            <span className="bg-brand-blue-light text-brand-blue flex size-7 shrink-0 items-center justify-center rounded-full">
              <Check aria-hidden="true" className="size-4" />
            </span>
            <span className="text-brand-blue/45 text-xs">0{index + 1}</span>
            {node}
          </li>
        ))}
      </ol>
    );
  }
  if (feature.kind === "roadmap") {
    return (
      <ol className="border-brand-blue/25 border-l pl-5">
        {feature.nodes.map((node, index) => (
          <li
            key={node}
            className="border-brand-blue/10 text-ink relative flex items-center gap-4 border-b py-3 last:border-0"
          >
            <span
              aria-hidden="true"
              className="bg-brand-red ring-background absolute top-5 -left-[1.45rem] size-2 rounded-full ring-4"
            />
            <span className="text-brand-blue/40 text-xl font-bold">0{index + 1}</span>
            <span className="font-semibold">{node}</span>
          </li>
        ))}
      </ol>
    );
  }
  return (
    <ol className="flex flex-wrap items-center gap-2">
      {feature.nodes.map((node, index) => (
        <li key={node} className="flex items-center gap-2">
          <span
            className={cn(
              "rounded-lg border px-3 py-2 text-xs font-bold sm:text-sm",
              index === 0
                ? "border-brand-blue bg-brand-blue text-white"
                : "border-brand-blue/15 text-ink bg-white",
            )}
          >
            {node}
          </span>
          {index < feature.nodes.length - 1 ? (
            <ChevronRight aria-hidden="true" className="text-brand-red size-4 shrink-0" />
          ) : null}
        </li>
      ))}
    </ol>
  );
}

function BusinessFeature({ detail }: { detail: BusinessDetail }) {
  return (
    <Section aria-labelledby="feature-heading" className="bg-background">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div
          className={cn(
            "shadow-soft relative aspect-[1.25] overflow-hidden rounded-3xl lg:aspect-[1.02]",
            detail.reverseFeature && "lg:order-2",
          )}
        >
          <Image
            src={detail.feature.image.src}
            alt={detail.feature.image.alt}
            fill
            sizes="(min-width: 1024px) 46vw, 90vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="bg-brand-blue absolute right-0 bottom-0 h-1.5 w-1/3"
          />
        </div>
        <div>
          <SectionHeading
            id="feature-heading"
            eyebrow={detail.feature.eyebrow}
            title={detail.feature.title}
            description={detail.feature.description}
          />
          <div className="mt-8">
            <FeatureNodes feature={detail.feature} />
          </div>
          {detail.feature.link ? (
            <Link
              href={detail.feature.link.href}
              className="text-brand-blue hover:text-brand-blue-dark mt-6 inline-flex items-center gap-2 text-sm font-bold"
            >
              {detail.feature.link.label}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          ) : null}
        </div>
      </div>
    </Section>
  );
}

function BusinessProcess({ detail }: { detail: BusinessDetail }) {
  return (
    <Section
      aria-labelledby="process-heading"
      className="bg-white"
    >
      <SectionHeading
        id="process-heading"
        eyebrow="Our Process"
        title={`How ${detail.title} Moves Forward`}
        description="A clear sequence keeps the work focused, while leaving room to adapt to your business."
      />
      <ol
        className={cn(
          "relative mt-12 grid gap-7 border-l pl-7 lg:mt-14 lg:gap-5 lg:border-t lg:border-l-0 lg:pl-0",
          detail.process.length === 6 ? "lg:grid-cols-6" : "lg:grid-cols-5",
          "border-brand-blue/25",
        )}
      >
        {detail.process.map(({ title, description, icon: Icon }, index) => (
          <li key={title} className="relative flex gap-4 lg:flex-col lg:gap-4 lg:pt-8">
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-5 -left-[2.05rem] z-10 size-2.5 rounded-full ring-4 lg:-top-[0.35rem] lg:left-0",
                "ring-brand-blue-light",
                index === 0 ? "bg-brand-red" : "bg-brand-blue",
              )}
            />
            <span
              className="hidden text-5xl leading-none font-bold text-[#5B7FAE] lg:block"
            >
              0{index + 1}
            </span>
            <span
              className="text-brand-blue bg-brand-blue-light flex size-10 shrink-0 items-center justify-center rounded-xl border border-brand-blue/15"
            >
              <Icon aria-hidden="true" className="size-5" />
            </span>
            <div>
              <span
                className="text-brand-blue text-xs font-bold tracking-[0.16em] lg:hidden"
              >
                0{index + 1}
              </span>
              <h3 className="text-ink font-bold">{title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function BusinessOutcomes({ detail }: { detail: BusinessDetail }) {
  return (
    <Section aria-labelledby="outcomes-heading" className="bg-background">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading
          id="outcomes-heading"
          eyebrow="Business Outcomes"
          title={`What ${detail.title} Can Help You Achieve`}
        />
        <ul className="grid gap-x-8 sm:grid-cols-2">
          {detail.outcomes.map((outcome) => (
            <li
              key={outcome}
              className="border-brand-blue/15 flex items-center gap-3 border-b py-4"
            >
              <span className="bg-brand-blue-light text-brand-blue flex size-8 shrink-0 items-center justify-center rounded-full">
                <Check aria-hidden="true" className="size-4" />
              </span>
              <span className="text-ink text-sm font-semibold">{outcome}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function WhyMiracle({ detail }: { detail: BusinessDetail }) {
  return (
    <Section aria-labelledby="why-heading" className="bg-brand-blue-light/30">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
        <SectionHeading
          id="why-heading"
          eyebrow="Why Miracle International"
          title="Business Support With a Broader Perspective"
          description={detail.why}
        />
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {detail.whyPoints.map((point, index) => (
            <div
              key={point}
              className="border-brand-blue/10 flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm"
            >
              <span className="text-brand-blue/30 text-2xl font-bold">0{index + 1}</span>
              <span className="text-ink text-sm font-semibold">{point}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function RelatedBusinessSolutions({ current }: { current: BusinessDetailKey }) {
  const detail = BUSINESS_DETAILS[current];
  return (
    <Section aria-labelledby="related-heading" className="bg-background">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          id="related-heading"
          eyebrow="Continue Exploring"
          title="Related Business Solutions"
        />
        <Link
          href={ROUTES.public.businessSolutions}
          className="text-brand-blue hover:text-brand-blue-dark inline-flex items-center gap-2 text-sm font-bold"
        >
          All Business Solutions <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {detail.related.map((key) => {
          const related = BUSINESS_DETAILS[key];
          return (
            <Link
              key={key}
              href={related.href}
              className="group hover:border-brand-blue hover:shadow-lift border-border/80 shadow-soft flex items-center gap-4 rounded-2xl border bg-white p-4 transition-all duration-200 motion-safe:hover:-translate-y-1"
            >
              <span className="relative size-16 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={related.image.src}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </span>
              <span className="min-w-0">
                <span className="text-ink block font-bold">{related.title}</span>
                <span className="text-muted-foreground mt-1 block text-xs leading-snug">
                  {related.lead}
                </span>
              </span>
              <ArrowRight
                aria-hidden="true"
                className="text-brand-blue ml-auto size-4 shrink-0 transition-transform motion-safe:group-hover:translate-x-1"
              />
            </Link>
          );
        })}
      </div>
    </Section>
  );
}

export function BusinessDetailPage({ service }: { service: BusinessDetailKey }) {
  const detail: BusinessDetail = BUSINESS_DETAILS[service];
  const process = <BusinessProcess detail={detail} />;
  const feature = <BusinessFeature detail={detail} />;
  return (
    <main>
      <BusinessHero detail={detail} />
      <BusinessOverview detail={detail} />
      <BusinessCapabilities detail={detail} />
      {detail.reverseFeature ? process : feature}
      {detail.reverseFeature ? feature : process}
      <BusinessOutcomes detail={detail} />
      <WhyMiracle detail={detail} />
      <RelatedBusinessSolutions current={service} />
      <CtaBanner
        tone={service === "start" ? "light" : "default"}
        serviceContext="business"
        defaultService={detail.title}
        eyebrow="Your Next Step"
        title={detail.cta.title}
        description={detail.cta.description}
        primary={{ label: detail.cta.label, href: detail.cta.href }}
        secondary={
          detail.cta.href === ROUTES.public.contact
            ? {
                label: "Explore Business Solutions",
                href: ROUTES.public.businessSolutions,
              }
            : { label: "Contact Us", href: ROUTES.public.contact }
        }
        headingId={`${service}-cta-heading`}
      />
    </main>
  );
}
