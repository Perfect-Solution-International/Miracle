import {
  ArrowRight,
  ChartColumn,
  Check,
  Clock,
  Gauge,
  Package,
  Plug,
  Puzzle,
  Rocket,
  SearchCheck,
  Settings2,
  ShieldCheck,
  Target,
  TrendingUp,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CtaBanner } from "@/components/common/cta-banner";
import { FeatureCard } from "@/components/common/feature-card";
import { PageHero } from "@/components/common/page-hero";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Business Automation";
const DESCRIPTION =
  "Automate the repetitive parts of your business so your team can spend time on work that actually grows it.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.businessAutomation,
  image: SITE_MEDIA.manufacturing,
});

type IconItem = { title: string; description: string; icon: LucideIcon };

const overviewPoints = [
  "Fewer manual, repetitive tasks",
  "Fewer errors in day-to-day work",
  "Faster turnaround on routine processes",
  "Clear visibility into what's happening",
];

const services: IconItem[] = [
  {
    title: "Workflow Automation",
    description: "Automate approvals, notifications and handoffs between teams.",
    icon: Workflow,
  },
  {
    title: "Process Automation",
    description: "Turn multi-step manual processes into a single automated flow.",
    icon: Settings2,
  },
  {
    title: "Sales & CRM Automation",
    description: "Automate lead follow-up, reminders and pipeline updates.",
    icon: Target,
  },
  {
    title: "Inventory Automation",
    description: "Automatic stock updates, reorder alerts and purchase tracking.",
    icon: Package,
  },
  {
    title: "Reporting Automation",
    description: "Scheduled reports and dashboards, generated without manual work.",
    icon: ChartColumn,
  },
  {
    title: "System Integration",
    description: "Connect the tools you already use so data moves between them on its own.",
    icon: Plug,
  },
];

const benefits: IconItem[] = [
  {
    title: "Time Saved",
    description: "Hours of manual work replaced by automated, repeatable steps.",
    icon: Clock,
  },
  {
    title: "Fewer Errors",
    description: "Automated steps remove the mistakes manual data entry causes.",
    icon: Check,
  },
  {
    title: "Higher Productivity",
    description: "Your team focuses on work that needs judgement, not repetition.",
    icon: Gauge,
  },
  {
    title: "Better Oversight",
    description: "Clear, consistent records of what happened and when.",
    icon: ShieldCheck,
  },
  {
    title: "Business Growth",
    description: "Operations that scale without scaling manual effort.",
    icon: TrendingUp,
  },
];

const process = [
  {
    step: "01",
    icon: SearchCheck,
    title: "Identify the Process",
    description: "We find the repetitive tasks costing your team the most time.",
  },
  {
    step: "02",
    icon: Puzzle,
    title: "Design the Automation",
    description: "Map out the steps and tools needed to automate it reliably.",
  },
  {
    step: "03",
    icon: Rocket,
    title: "Build & Launch",
    description: "Implement, test and roll out the automation into your daily workflow.",
  },
];

const whyChooseUs: IconItem[] = [
  {
    title: "Practical, Not Complicated",
    description: "Automation built to fit how your team already works.",
    icon: Puzzle,
  },
  {
    title: "Fast to Implement",
    description: "Focused automations that deliver value quickly, not lengthy projects.",
    icon: Rocket,
  },
  {
    title: "Ongoing Support",
    description: "We stay involved to refine and extend automations as you grow.",
    icon: ShieldCheck,
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="IT Solutions"
        title={TITLE}
        description={DESCRIPTION}
        breadcrumbs={[
          { label: "IT Solutions", href: ROUTES.public.itSolutions },
          { label: TITLE },
        ]}
        image={SITE_MEDIA.manufacturing}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="accent" size="xl">
            <Link href={ROUTES.public.tellUsWhatYouNeed}>
              Automate Your Business
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="xl" className="text-ink">
            <a href="#services">Explore Services</a>
          </Button>
        </div>
      </PageHero>

      {/* Overview */}
      <Section aria-labelledby="overview-heading">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          <SectionHeading
            id="overview-heading"
            eyebrow="Overview"
            title="Let Automation Handle the Repetitive Work"
            description="Manual, repetitive tasks slow teams down and leave room for mistakes. We automate the processes behind sales, inventory, reporting and daily operations, so your systems do the routine work and your team focuses on the rest."
          />
          <ul className="reveal grid gap-4 sm:grid-cols-2">
            {overviewPoints.map((point) => (
              <li
                key={point}
                className="bg-card text-ink flex items-start gap-3 rounded-xl border p-5 text-sm font-semibold"
              >
                <span className="bg-brand-blue-light text-brand-blue inline-flex size-7 shrink-0 items-center justify-center rounded-full">
                  <Check aria-hidden="true" className="size-4" strokeWidth={2.5} />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Services */}
      <Section id="services" tone="surface" aria-labelledby="services-heading">
        <SectionHeading
          id="services-heading"
          eyebrow="What We Automate"
          title="Our Automation Services"
          description="From a single workflow to connected automation across the business."
          align="center"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {services.map((service) => (
            <FeatureCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              className="reveal"
            />
          ))}
        </div>
      </Section>

      {/* Key benefits */}
      <Section aria-labelledby="benefits-heading">
        <SectionHeading
          id="benefits-heading"
          eyebrow="Key Benefits"
          title="What Automation Gives Your Business"
          align="center"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-5">
          {benefits.map((benefit) => (
            <FeatureCard
              key={benefit.title}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              className="reveal"
            />
          ))}
        </div>
      </Section>

      {/* Simple process */}
      <Section tone="navy" aria-labelledby="process-heading">
        <SectionHeading
          id="process-heading"
          eyebrow="How It Works"
          title="A Simple, Three-Step Process"
          align="center"
          tone="inverse"
        />
        <ol className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-3">
          {process.map((item) => (
            <li
              key={item.step}
              className="reveal rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06]"
            >
              <div className="flex items-center justify-between">
                <span className="text-brand-blue-muted inline-flex size-11 items-center justify-center rounded-lg bg-white/10">
                  <item.icon aria-hidden="true" className="size-5" />
                </span>
                <span className="text-3xl font-extrabold text-white/20">{item.step}</span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Why choose us */}
      <Section aria-labelledby="why-heading">
        <SectionHeading
          id="why-heading"
          eyebrow="Why Choose Us"
          title="Why Businesses Choose Us for Automation"
          align="center"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-3 lg:mt-16">
          {whyChooseUs.map((reason) => (
            <FeatureCard
              key={reason.title}
              icon={reason.icon}
              title={reason.title}
              description={reason.description}
              className="reveal"
            />
          ))}
        </div>
      </Section>

      <CtaBanner
        eyebrow="Ready to Save Time?"
        title="Automate Your Business Today"
        description="Tell us what's taking too much manual effort and our team will recommend the right automation."
        primary={{
          label: "Tell Us What You Need",
          href: ROUTES.public.tellUsWhatYouNeed,
        }}
        secondary={{ label: "Contact Us", href: ROUTES.public.contact }}
      />
    </>
  );
}
