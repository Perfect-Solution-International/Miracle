import { ArrowRight, Check, ChevronRight, Network } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Breadcrumb } from "@/components/common/breadcrumb";
import { CtaBanner } from "@/components/common/cta-banner";
import { Eyebrow } from "@/components/common/eyebrow";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";

import {
  BUSINESS_DETAILS,
  type BusinessDetail,
  type BusinessDetailKey,
} from "../data/business-detail";

function BusinessHero({ detail }: { detail: BusinessDetail }) {
  const dark = detail.heroDark;
  return (
    <Section
      spacing="none"
      tone={dark ? "navy" : "default"}
      aria-labelledby="business-detail-heading"
      className={dark ? undefined : "bg-brand-blue-light/40"}
      containerClassName="grid gap-10 py-12 md:py-16 lg:grid-cols-[1fr_0.96fr] lg:items-center lg:gap-16 lg:py-20"
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10 opacity-65",
          dark ? "bg-grid-inverse" : "bg-grid",
        )}
      />
      <div className="max-w-2xl">
        <Breadcrumb
          tone={dark ? "inverse" : "default"}
          items={[
            { label: "Business Solutions", href: ROUTES.public.businessSolutions },
            { label: detail.title },
          ]}
        />
        <div className="mt-9">
          <Eyebrow tone={dark ? "inverse" : "default"}>{detail.title}</Eyebrow>
        </div>
        <h1
          id="business-detail-heading"
          className={cn(
            "mt-5 max-w-2xl text-4xl leading-[1.09] font-bold tracking-tight sm:text-5xl lg:text-[3.5rem]",
            dark ? "text-white" : "text-ink",
          )}
        >
          {detail.headline}
        </h1>
        <p
          className={cn(
            "mt-6 max-w-xl text-lg leading-relaxed font-medium",
            dark ? "text-white/90" : "text-ink",
          )}
        >
          {detail.lead}
        </p>
        <p
          className={cn(
            "mt-4 max-w-xl leading-relaxed",
            dark ? "text-white/70" : "text-muted-foreground",
          )}
        >
          {detail.introduction}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="accent" size="xl">
            <Link href={detail.cta.href}>
              {detail.cta.label} <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant={dark ? "outline-inverse" : "outline"} size="xl">
            <Link href={ROUTES.public.businessSolutions}>Explore Business Solutions</Link>
          </Button>
        </div>
      </div>
      <div className="relative mx-auto w-full max-w-xl pb-12 pl-4 sm:pl-8">
        <div
          aria-hidden="true"
          className={cn(
            "bg-brand-blue absolute top-5 h-[72%] w-[72%] rounded-[1.75rem]",
            detail.reverseFeature ? "right-0" : "left-0",
          )}
        />
        <div className="shadow-soft relative mx-3 aspect-[1.18] overflow-hidden rounded-[1.5rem] border-4 border-white">
          <Image
            src={detail.image.src}
            alt={detail.image.alt}
            fill
            preload
            sizes="(min-width: 1280px) 550px, (min-width: 1024px) 45vw, 90vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="from-navy/40 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
          />
        </div>
        <div
          className={cn(
            "shadow-soft absolute bottom-0 w-[42%] overflow-hidden rounded-2xl border-4 border-white bg-white",
            detail.reverseFeature ? "left-0" : "right-0",
          )}
        >
          <div className="relative aspect-[1.35]">
            <Image
              src={detail.insetImage.src}
              alt={detail.insetImage.alt}
              fill
              sizes="(min-width: 1024px) 230px, 40vw"
              className="object-cover"
            />
          </div>
        </div>
        <div
          className={cn(
            "border-border/70 shadow-soft absolute bottom-10 max-w-[56%] rounded-xl border bg-white px-4 py-3",
            detail.reverseFeature ? "right-0" : "left-0",
          )}
        >
          <span
            aria-hidden="true"
            className="bg-brand-red mr-2 inline-block size-2 rounded-full"
          />
          <span className="text-brand-blue-dark text-xs font-bold sm:text-sm">
            {detail.heroLabel}
          </span>
        </div>
      </div>
    </Section>
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
                "group hover:border-brand-blue/30 border-border/80 shadow-soft relative flex min-h-48 flex-col rounded-2xl border bg-white p-6 transition-all duration-200 motion-safe:hover:-translate-y-1",
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
  const light = detail.lightProcess;
  return (
    <Section
      tone={light ? "default" : "navy"}
      aria-labelledby="process-heading"
      className={light ? "bg-brand-blue-light/30" : undefined}
    >
      {!light ? (
        <div aria-hidden="true" className="bg-grid-inverse absolute inset-0 -z-10" />
      ) : null}
      <SectionHeading
        id="process-heading"
        eyebrow="Our Process"
        title={`How ${detail.title} Moves Forward`}
        description="A clear sequence keeps the work focused, while leaving room to adapt to your business."
        tone={light ? "default" : "inverse"}
      />
      <ol
        className={cn(
          "relative mt-12 grid gap-7 border-l pl-7 lg:mt-14 lg:gap-5 lg:border-t lg:border-l-0 lg:pl-0",
          detail.process.length === 6 ? "lg:grid-cols-6" : "lg:grid-cols-5",
          light ? "border-brand-blue/25" : "border-white/25",
        )}
      >
        {detail.process.map(({ title, description, icon: Icon }, index) => (
          <li key={title} className="relative flex gap-4 lg:flex-col lg:gap-4 lg:pt-8">
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-5 -left-[2.05rem] z-10 size-2.5 rounded-full ring-4 lg:-top-[0.35rem] lg:left-0",
                light ? "ring-brand-blue-light" : "ring-navy",
                index === 0 ? "bg-brand-red" : "bg-brand-blue-muted",
              )}
            />
            <span
              className={cn(
                "hidden text-5xl leading-none font-bold lg:block",
                light ? "text-brand-blue/25" : "text-brand-blue-muted/30",
              )}
            >
              0{index + 1}
            </span>
            <span
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-xl border",
                light
                  ? "border-brand-blue/15 text-brand-blue bg-white"
                  : "text-brand-blue-muted border-white/20 bg-white/5",
              )}
            >
              <Icon aria-hidden="true" className="size-5" />
            </span>
            <div>
              <span
                className={cn(
                  "text-xs font-bold tracking-[0.16em] lg:hidden",
                  light ? "text-brand-blue" : "text-brand-blue-muted",
                )}
              >
                0{index + 1}
              </span>
              <h3 className={cn("font-bold", light ? "text-ink" : "text-white")}>
                {title}
              </h3>
              <p
                className={cn(
                  "mt-2 text-sm leading-relaxed",
                  light ? "text-muted-foreground" : "text-white/65",
                )}
              >
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
              className="group hover:border-brand-blue/30 hover:shadow-lift border-border/80 shadow-soft flex items-center gap-4 rounded-2xl border bg-white p-4 transition-all duration-200 motion-safe:hover:-translate-y-1"
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
