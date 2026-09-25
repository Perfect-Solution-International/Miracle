import {
  ArrowRight,
  Bot,
  Cloud,
  Code2,
  Compass,
  Crosshair,
  Database,
  Gauge,
  Globe2,
  Headphones,
  Layers3,
  Lightbulb,
  MonitorCog,
  Network,
  Palette,
  Rocket,
  SearchCheck,
  ShieldCheck,
  Smartphone,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Breadcrumb } from "@/components/common/breadcrumb";
import { CtaBanner } from "@/components/common/cta-banner";
import { Eyebrow } from "@/components/common/eyebrow";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA, type SiteImage } from "@/config/site-media";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "IT Solutions";

const DESCRIPTION =
  "Technology that fits the way your business works, from high-performing websites to connected systems and intelligent automation.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.itSolutions,
  image: SITE_MEDIA.earthNight,
});

type IconItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const services: (IconItem & {
  href: string;
  image: SiteImage;
})[] = [
  {
    title: "Website Development",
    description:
      "Fast, credible websites designed to turn attention into opportunity.",
    icon: Globe2,
    href: ROUTES.public.websiteDevelopment,
    image: SITE_MEDIA.itSolutions.websiteDevelopment,
  },
  {
    title: "Software Development",
    description:
      "Custom applications shaped around your workflows, data and ambitions.",
    icon: Code2,
    href: ROUTES.public.softwareDevelopment,
    image: SITE_MEDIA.itSolutions.softwareDevelopment,
  },
  {
    title: "POS System Development",
    description:
      "Reliable sales, stock and reporting systems for busy businesses.",
    icon: MonitorCog,
    href: ROUTES.public.posSystemDevelopment,
    image: SITE_MEDIA.itSolutions.posSystem,
  },
  {
    title: "Business Management Systems",
    description:
      "One connected platform for operations, people, inventory and insight.",
    icon: Network,
    href: ROUTES.public.businessManagementSystems,
    image: SITE_MEDIA.itSolutions.businessManagementSystems,
  },
  {
    title: "Digital Solutions",
    description:
      "Connected digital tools that replace friction with momentum.",
    icon: Layers3,
    href: ROUTES.public.digitalSolutions,
    image: SITE_MEDIA.itSolutions.digitalSolutions,
  },
  {
    title: "IT Consulting",
    description:
      "Clear, practical technology advice aligned with your business goals.",
    icon: Compass,
    href: ROUTES.public.itConsulting,
    image: SITE_MEDIA.itSolutions.itConsulting,
  },
  {
    title: "Business Automation",
    description:
      "Thoughtful automation that gives your team time back every day.",
    icon: Bot,
    href: ROUTES.public.businessAutomation,
    image: SITE_MEDIA.itSolutions.businessAutomation,
  },
];

const reasons: IconItem[] = [
  {
    title: "Tailored Solutions",
    description:
      "Every recommendation starts with your business, customers and real operating context.",
    icon: Lightbulb,
  },
  {
    title: "Modern Technologies",
    description:
      "We use proven, current tools that support performance today and change tomorrow.",
    icon: Code2,
  },
  {
    title: "Secure Development",
    description:
      "Security, access control and dependable data practices are considered from day one.",
    icon: ShieldCheck,
  },
  {
    title: "Scalable Systems",
    description:
      "Architecture that can grow with your users, locations, data and ambitions.",
    icon: Gauge,
  },
  {
    title: "Reliable Support",
    description:
      "A responsive partner for improvements, maintenance and the questions after launch.",
    icon: Headphones,
  },
  {
    title: "Business-Focused Approach",
    description:
      "Technology choices are measured by the value they create for your team and customers.",
    icon: Crosshair,
  },
];

const capabilities = [
  {
    label: "Web platforms",
    icon: Globe2,
  },
  {
    label: "Business software",
    icon: Code2,
  },
  {
    label: "Cloud infrastructure",
    icon: Cloud,
  },
  {
    label: "Data & integrations",
    icon: Database,
  },
  {
    label: "Mobile experiences",
    icon: Smartphone,
  },
  {
    label: "Intelligent workflows",
    icon: Workflow,
  },
];

const process = [
  {
    step: "01",
    title: "Discovery",
    description: "Understand the business, users and opportunity.",
    icon: SearchCheck,
  },
  {
    step: "02",
    title: "Planning",
    description: "Define the right scope, priorities and route forward.",
    icon: Compass,
  },
  {
    step: "03",
    title: "Design",
    description: "Shape a clear experience around real people and tasks.",
    icon: Palette,
  },
  {
    step: "04",
    title: "Development",
    description: "Build the solution in focused, reviewable stages.",
    icon: Code2,
  },
  {
    step: "05",
    title: "Testing",
    description: "Check quality, security and performance before launch.",
    icon: ShieldCheck,
  },
  {
    step: "06",
    title: "Deployment",
    description: "Launch with a smooth, supported transition into use.",
    icon: Rocket,
  },
  {
    step: "07",
    title: "Support",
    description: "Keep improving the solution as your business evolves.",
    icon: Headphones,
  },
] satisfies (IconItem & { step: string })[];

const outcomes = [
  {
    number: "01",
    label: "Clearer decisions",
    icon: Lightbulb,
  },
  {
    number: "02",
    label: "Faster operations",
    icon: Gauge,
  },
  {
    number: "03",
    label: "Stronger security",
    icon: ShieldCheck,
  },
  {
    number: "04",
    label: "Room to grow",
    icon: Rocket,
  },
] satisfies {
  number: string;
  label: string;
  icon: LucideIcon;
}[];

export default function Page() {
  return (
    <>
      {/* =========================
          HERO
      ========================== */}
      <section
        aria-labelledby="it-solutions-hero-heading"
        className="relative isolate overflow-hidden border-b"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
        >
          <Image
            src={SITE_MEDIA.earthNight.src}
            alt=""
            fill
            preload
            sizes="100vw"
            className="object-cover"
          />

          <div className="bg-brand-blue-dark/65 absolute inset-0" />

          <div className="from-brand-blue-dark/80 absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t to-transparent" />
        </div>

        <div className="container-page flex flex-col items-center gap-6 py-20 text-center md:py-28">
          <Breadcrumb
            items={[{ label: TITLE }]}
            tone="inverse"
          />

          <Eyebrow tone="inverse">
            Technology That Moves Business Forward
          </Eyebrow>

          <h1
            id="it-solutions-hero-heading"
            className="max-w-3xl text-4xl leading-[1.08] font-extrabold tracking-tight text-white sm:text-5xl"
          >
            {TITLE}
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            {DESCRIPTION}
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              variant="accent"
              size="xl"
            >
              <Link href={ROUTES.public.tellUsWhatYouNeed}>
                Discuss Your Requirements

                <ArrowRight
                  data-icon="inline-end"
                  aria-hidden="true"
                />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline-inverse"
              size="xl"
            >
              <a href="#services">
                Explore IT Services
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* =========================
          SERVICES
      ========================== */}
      <Section
        id="services"
        aria-labelledby="services-heading"
        tone="surface"
      >
        <SectionHeading
          id="services-heading"
          eyebrow="What We Do"
          title="One Technology Partner, Every Digital Need"
          description="Choose the specialist service you need today, or bring us the bigger picture. Our team connects the pieces into technology that works together."
          align="center"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-8">
          {services.map((service, index) => (
            <article
              key={service.title}
              className={`group bg-card hover:border-brand-blue/30 hover:shadow-lift relative flex flex-col overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-1 lg:col-span-2 ${
                index === 4 ? "lg:col-start-2" : ""
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={service.image.src}
                  alt={service.image.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div
                  aria-hidden="true"
                  className="from-navy/55 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
                />

                <span className="bg-white/95 text-brand-blue shadow-soft absolute bottom-3 left-3 inline-flex size-11 items-center justify-center rounded-lg backdrop-blur">
                  <service.icon
                    aria-hidden="true"
                    className="size-5"
                  />
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-ink text-lg font-bold">
                  <Link
                    href={service.href}
                    className="after:absolute after:inset-0"
                  >
                    {service.title}
                  </Link>
                </h3>

                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {service.description}
                </p>

                <span className="text-brand-blue mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold">
                  Learn More

                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* =========================
          WHY MIRACLE
      ========================== */}
      <Section aria-labelledby="why-heading">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          <div className="space-y-8">
            <SectionHeading
              id="why-heading"
              eyebrow="Why Miracle International"
              title="Technology With a Business Mindset"
              description="The best solution is not always the biggest one. We bring clarity to complex decisions and build what creates a measurable difference."
            />

            <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl border shadow-soft">
              <Image
                src={SITE_MEDIA.businessMeeting.src}
                alt={SITE_MEDIA.businessMeeting.alt}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />

              <div
                aria-hidden="true"
                className="from-navy/40 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
              />

              <div className="absolute right-5 bottom-5 left-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/90 px-4 py-2 text-xs font-bold text-slate-900 backdrop-blur">
                  <span className="bg-brand-blue size-2 rounded-full" />
                  Business-led technology decisions
                </div>
              </div>
            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {reasons.map((reason) => (
              <li
                key={reason.title}
                className="reveal group bg-card hover:border-brand-blue/25 hover:shadow-soft rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1"
              >
                <span className="bg-brand-blue-light text-brand-blue inline-flex size-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105">
                  <reason.icon
                    aria-hidden="true"
                    className="size-5"
                  />
                </span>

                <h3 className="text-ink mt-5 font-bold">
                  {reason.title}
                </h3>

                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {reason.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* =========================
          TECHNOLOGY ECOSYSTEM
      ========================== */}
      <Section
        tone="navy"
        aria-labelledby="capabilities-heading"
      >
        <div className="bg-grid-inverse absolute inset-0 -z-10 opacity-70" />

        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
          <SectionHeading
            id="capabilities-heading"
            eyebrow="Capabilities"
            title="A Connected View of Your Technology"
            description="From the customer-facing experience to the systems behind it, we help you build a coherent digital foundation."
            tone="inverse"
          />

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-6 lg:p-8">
            <div
              aria-hidden="true"
              className="absolute top-1/2 right-[12%] left-[12%] hidden h-px bg-white/10 lg:block"
            />

            <div
              aria-hidden="true"
              className="absolute top-[12%] bottom-[12%] left-1/2 hidden w-px bg-white/10 lg:block"
            />

            <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((capability, index) => (
                <div
                  key={capability.label}
                  className="reveal hover:border-brand-blue-muted/50 group relative flex min-h-32 flex-col justify-between rounded-2xl border border-white/10 bg-[#081a35]/95 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-[#0b2347]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-brand-blue-muted inline-flex size-11 items-center justify-center rounded-xl bg-white/10">
                      <capability.icon
                        aria-hidden="true"
                        className="size-5"
                      />
                    </span>

                    <span className="text-xs font-bold tracking-[0.16em] text-white/35">
                      0{index + 1}
                    </span>
                  </div>

                  <p className="mt-7 font-bold text-white">
                    {capability.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* =========================
          PROCESS TIMELINE
      ========================== */}
      <Section
        aria-labelledby="process-heading"
        tone="surface"
      >
        <SectionHeading
          id="process-heading"
          eyebrow="How We Work"
          title="From First Conversation to Lasting Value"
          description="A clear process keeps the work focused, the decisions visible and the outcome connected to your goals."
          align="center"
        />

        <div className="mx-auto mt-14 max-w-6xl lg:mt-16">
          <ol className="relative">
            {/* Vertical timeline */}
            <div
              aria-hidden="true"
              className="bg-brand-blue/25 absolute top-6 bottom-6 left-6 w-px md:left-1/2"
            />

            {process.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <li
                  key={item.step}
                  className="relative mb-6 grid grid-cols-[48px_1fr] gap-4 last:mb-0 md:grid-cols-[1fr_64px_1fr] md:items-center md:gap-6 lg:mb-8"
                >
                  {/* Card */}
                  <article
                    className={`col-start-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-[0_16px_40px_rgba(15,23,42,0.14)] md:row-start-1 ${
                      isLeft
                        ? "md:col-start-1"
                        : "md:col-start-3"
                    }`}
                  >
                    <div
                      className={`flex items-start gap-4 ${
                        isLeft
                          ? "md:flex-row-reverse md:text-right"
                          : ""
                      }`}
                    >
                      {/* Icon inside card */}
                      <span className="bg-brand-blue-light text-brand-blue inline-flex size-12 shrink-0 items-center justify-center rounded-xl">
                        <item.icon
                          aria-hidden="true"
                          className="size-5"
                        />
                      </span>

                      <div className="min-w-0 flex-1">
                        <span className="text-brand-blue text-[11px] font-bold tracking-[0.18em] uppercase">
                          Step {item.step}
                        </span>

                        <h3 className="text-ink mt-1 text-lg font-bold">
                          {item.title}
                        </h3>

                        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </article>

                  {/* Centre timeline marker */}
                  <span className="bg-white border-brand-blue relative z-10 col-start-1 row-start-1 inline-flex size-12 items-center justify-center rounded-full border-2 shadow-md md:col-start-2 md:size-14">
                    <span className="bg-brand-blue size-2.5 rounded-full" />
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </Section>

      {/* =========================
          DIGITAL FOUNDATION
      ========================== */}
      <Section
        tone="surface"
        aria-labelledby="outcomes-heading"
      >
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              id="outcomes-heading"
              eyebrow="Built for Progress"
              title="A Better Digital Foundation Starts Here"
              description="Whether you are starting from scratch or improving what already exists, we turn technical complexity into practical next steps."
            />

            <div className="group relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border shadow-soft">
              <Image
                src={SITE_MEDIA.technology.src}
                alt={SITE_MEDIA.technology.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />

              <div
                aria-hidden="true"
                className="from-brand-blue-dark/50 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {outcomes.map((outcome) => (
              <div
                key={outcome.number}
                className="group bg-white hover:border-brand-blue/30 rounded-2xl border border-slate-200 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="bg-brand-blue-light text-brand-blue inline-flex size-11 items-center justify-center rounded-xl">
                    <outcome.icon
                      aria-hidden="true"
                      className="size-5"
                    />
                  </span>

                  <span className="text-brand-blue/30 text-3xl font-extrabold">
                    {outcome.number}
                  </span>
                </div>

                <p className="text-ink mt-8 text-base font-bold">
                  {outcome.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* =========================
          CTA
      ========================== */}
      <CtaBanner
        eyebrow="Ready to Move Forward?"
        title="Let’s Find the Right IT Solution for Your Business"
        description="Tell us what you are trying to achieve, where things are getting stuck or what you want to build next. We will help you map the right way forward."
        primary={{
          label: "Tell Us What You Need",
          href: ROUTES.public.tellUsWhatYouNeed,
        }}
        secondary={{
          label: "Contact Our Team",
          href: ROUTES.public.contact,
        }}
      />
    </>
  );
}