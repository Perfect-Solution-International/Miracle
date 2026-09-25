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
import { SITE_MEDIA } from "@/config/site-media";
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

type IconItem = { title: string; description: string; icon: LucideIcon };

const services: (IconItem & { href: string })[] = [
  {
    title: "Website Development",
    description: "Fast, credible websites designed to turn attention into opportunity.",
    icon: Globe2,
    href: ROUTES.public.websiteDevelopment,
  },
  {
    title: "Software Development",
    description: "Custom applications shaped around your workflows, data and ambitions.",
    icon: Code2,
    href: ROUTES.public.softwareDevelopment,
  },
  {
    title: "POS System Development",
    description: "Reliable sales, stock and reporting systems for busy businesses.",
    icon: MonitorCog,
    href: ROUTES.public.posSystemDevelopment,
  },
  {
    title: "Business Management Systems",
    description: "One connected platform for operations, people, inventory and insight.",
    icon: Network,
    href: ROUTES.public.businessManagementSystems,
  },
  {
    title: "Digital Solutions",
    description: "Connected digital tools that replace friction with momentum.",
    icon: Layers3,
    href: ROUTES.public.digitalSolutions,
  },
  {
    title: "IT Consulting",
    description: "Clear, practical technology advice aligned with your business goals.",
    icon: Compass,
    href: ROUTES.public.itConsulting,
  },
  {
    title: "Business Automation",
    description: "Thoughtful automation that gives your team time back every day.",
    icon: Bot,
    href: ROUTES.public.businessAutomation,
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
  { label: "Web platforms", icon: Globe2 },
  { label: "Business software", icon: Code2 },
  { label: "Cloud infrastructure", icon: Cloud },
  { label: "Data & integrations", icon: Database },
  { label: "Mobile experiences", icon: Smartphone },
  { label: "Intelligent workflows", icon: Workflow },
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

export default function Page() {
  return (
    <>
      <section
        aria-labelledby="it-solutions-hero-heading"
        className="relative isolate overflow-hidden border-b"
      >
        <div aria-hidden="true" className="absolute inset-0 -z-10">
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
          <Breadcrumb items={[{ label: TITLE }]} tone="inverse" />
          <Eyebrow tone="inverse">Technology That Moves Business Forward</Eyebrow>
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
            <Button asChild variant="accent" size="xl">
              <Link href={ROUTES.public.tellUsWhatYouNeed}>
                Discuss Your Requirements
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline-inverse" size="xl">
              <a href="#services">Explore IT Services</a>
            </Button>
          </div>
        </div>
      </section>

      <Section id="services" aria-labelledby="services-heading" tone="surface">
        <SectionHeading
          id="services-heading"
          eyebrow="What We Do"
          title="One Technology Partner, Every Digital Need"
          description="Choose the specialist service you need today, or bring us the bigger picture. Our team connects the pieces into technology that works together."
          align="center"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.title}
              className="group bg-card hover:border-brand-blue/30 hover:shadow-lift relative flex min-h-64 flex-col rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1"
            >
              <span className="bg-brand-blue-light text-brand-blue group-hover:bg-brand-blue inline-flex size-11 items-center justify-center rounded-lg transition-colors duration-300 group-hover:text-white">
                <service.icon aria-hidden="true" className="size-5" />
              </span>
              <h3 className="text-ink mt-5 text-lg font-bold">
                <Link href={service.href} className="after:absolute after:inset-0">
                  {service.title}
                </Link>
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {service.description}
              </p>
              <span className="text-brand-blue mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold">
                Learn More{" "}
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-1"
                />
              </span>
            </article>
          ))}
        </div>
      </Section>

      <Section aria-labelledby="why-heading">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-20">
          <SectionHeading
            id="why-heading"
            eyebrow="Why Miracle International"
            title="Technology With a Business Mindset"
            description="The best solution is not always the biggest one. We bring clarity to complex decisions and build what creates a measurable difference."
          />
          <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {reasons.map((reason) => (
              <li key={reason.title} className="reveal flex gap-4">
                <span className="bg-brand-blue-light text-brand-blue inline-flex size-10 shrink-0 items-center justify-center rounded-full">
                  <reason.icon aria-hidden="true" className="size-5" />
                </span>
                <div className="space-y-1.5">
                  <h3 className="text-ink font-bold">{reason.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="navy" aria-labelledby="capabilities-heading">
        <div className="bg-grid-inverse absolute inset-0 -z-10 opacity-70" />
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
          <SectionHeading
            id="capabilities-heading"
            eyebrow="Capabilities"
            title="A Connected View of Your Technology"
            description="From the customer-facing experience to the systems behind it, we help you build a coherent digital foundation."
            tone="inverse"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {capabilities.map((capability, index) => (
              <div
                key={capability.label}
                className="reveal hover:border-brand-blue-muted/50 flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-5 transition-colors duration-300 hover:bg-white/[0.08]"
              >
                <span className="text-brand-blue-muted inline-flex size-10 items-center justify-center rounded-lg bg-white/10">
                  <capability.icon aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <span className="text-xs font-bold tracking-[0.16em] text-white/40">
                    0{index + 1}
                  </span>
                  <p className="mt-1 font-bold text-white">{capability.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section aria-labelledby="process-heading">
        <SectionHeading
          id="process-heading"
          eyebrow="How We Work"
          title="From First Conversation to Lasting Value"
          description="A clear process keeps the work focused, the decisions visible and the outcome connected to your goals."
          align="center"
        />
        <ol className="relative mt-12 grid gap-8 md:grid-cols-2 lg:mt-16 lg:grid-cols-7 lg:gap-4">
          <span
            aria-hidden="true"
            className="bg-brand-blue/20 absolute top-6 right-[7%] left-[7%] hidden h-px lg:block"
          />
          {process.map((item) => (
            <li
              key={item.step}
              className="reveal relative flex gap-4 lg:flex-col lg:items-center lg:gap-4 lg:text-center"
            >
              <span className="bg-background border-brand-blue text-brand-blue relative z-10 inline-flex size-12 shrink-0 items-center justify-center rounded-full border-2 shadow-sm">
                <item.icon aria-hidden="true" className="size-5" />
              </span>
              <div>
                <span className="text-brand-blue text-xs font-bold tracking-[0.18em] uppercase">
                  {item.step}
                </span>
                <h3 className="text-ink mt-1 font-bold">{item.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="surface" aria-labelledby="outcomes-heading">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-20">
          <SectionHeading
            id="outcomes-heading"
            eyebrow="Built for Progress"
            title="A Better Digital Foundation Starts Here"
            description="Whether you are starting from scratch or improving what already exists, we turn technical complexity into practical next steps."
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["01", "Clearer decisions"],
              ["02", "Faster operations"],
              ["03", "Stronger security"],
              ["04", "Room to grow"],
            ].map(([number, label]) => (
              <div key={number} className="bg-card rounded-xl border p-5">
                <span className="text-brand-blue text-2xl font-extrabold">{number}</span>
                <p className="text-ink mt-8 text-sm font-bold">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <CtaBanner
        eyebrow="Ready to Move Forward?"
        title="Let’s Find the Right IT Solution for Your Business"
        description="Tell us what you are trying to achieve, where things are getting stuck or what you want to build next. We will help you map the right way forward."
        primary={{
          label: "Tell Us What You Need",
          href: ROUTES.public.tellUsWhatYouNeed,
        }}
        secondary={{ label: "Contact Our Team", href: ROUTES.public.contact }}
      />
    </>
  );
}
