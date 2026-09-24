import {
  Check,
  CircleGauge,
  ClipboardList,
  Cloud,
  CodeXml,
  Compass,
  DollarSign,
  FileSearch,
  Gauge,
  Handshake as HandshakeIcon,
  Layers3,
  Lightbulb,
  LifeBuoy,
  Lock,
  PenTool,
  Plug,
  Puzzle,
  RefreshCcw,
  Rocket,
  Scale,
  Server,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingDown,
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

const TITLE = "IT Consulting";
const DESCRIPTION =
  "Independent, business-focused IT consulting that helps you choose the right technology, fix what's holding you back and plan for growth.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.itConsulting,
  image: SITE_MEDIA.handshake,
});

type IconItem = { title: string; description: string; icon: LucideIcon };

const services: IconItem[] = [
  {
    title: "IT Strategy & Planning",
    description: "A technology roadmap aligned with your business goals and budget.",
    icon: Compass,
  },
  {
    title: "Technology Assessment",
    description: "An honest review of your current systems, tools and technical debt.",
    icon: FileSearch,
  },
  {
    title: "Digital Transformation Consulting",
    description: "Guidance on moving from manual processes to modern digital systems.",
    icon: Sparkles,
  },
  {
    title: "Software & System Consulting",
    description: "Advice on building, buying or upgrading the software your business runs on.",
    icon: CodeXml,
  },
  {
    title: "IT Infrastructure Consulting",
    description: "Recommendations on servers, networks and infrastructure that fit your scale.",
    icon: Server,
  },
  {
    title: "Cloud Consulting",
    description: "Guidance on cloud migration, cost control and choosing the right provider.",
    icon: Cloud,
  },
  {
    title: "Cybersecurity Consulting",
    description: "Identify security gaps and put practical safeguards around your data.",
    icon: ShieldCheck,
  },
  {
    title: "Business Process & Automation Consulting",
    description: "Find manual bottlenecks and design automated workflows to replace them.",
    icon: Workflow,
  },
];

const helpAreas: IconItem[] = [
  {
    title: "Identifying Technology Gaps",
    description: "Spot where outdated or missing tools are slowing your business down.",
    icon: Target,
  },
  {
    title: "Selecting the Right Software & Technologies",
    description: "Cut through vendor noise to choose tools that actually fit your needs.",
    icon: Puzzle,
  },
  {
    title: "Improving Existing IT Systems",
    description: "Get more value out of the systems you already have before replacing them.",
    icon: RefreshCcw,
  },
  {
    title: "Reducing Unnecessary IT Costs",
    description: "Find licences, tools and infrastructure you're paying for but don't need.",
    icon: TrendingDown,
  },
  {
    title: "Automating Business Processes",
    description: "Replace repetitive manual work with reliable, automated workflows.",
    icon: Workflow,
  },
  {
    title: "Planning Scalable Technology Solutions",
    description: "Make technology choices today that won't need replacing as you grow.",
    icon: Layers3,
  },
];

const consultingProcess = [
  {
    step: "01",
    icon: HandshakeIcon,
    title: "Discovery & Consultation",
    description: "An initial conversation to understand your business, goals and pain points.",
  },
  {
    step: "02",
    icon: FileSearch,
    title: "Current System Assessment",
    description: "A structured review of your existing software, infrastructure and processes.",
  },
  {
    step: "03",
    icon: ClipboardList,
    title: "Requirements Analysis",
    description: "Define what the business actually needs, separate from what it currently has.",
  },
  {
    step: "04",
    icon: Lightbulb,
    title: "IT Strategy & Recommendations",
    description: "A clear set of recommendations, priorities and a supporting technology plan.",
  },
  {
    step: "05",
    icon: PenTool,
    title: "Solution Planning",
    description: "Turn recommendations into a practical plan with scope, cost and timeline.",
  },
  {
    step: "06",
    icon: Rocket,
    title: "Implementation Support",
    description: "Hands-on support while the recommended solutions are built and deployed.",
  },
  {
    step: "07",
    icon: TrendingUp,
    title: "Continuous Optimization",
    description: "Ongoing review to keep your technology aligned as the business changes.",
  },
];

const assessmentAreas: { title: string; icon: LucideIcon }[] = [
  { title: "Performance", icon: Gauge },
  { title: "Security", icon: Lock },
  { title: "Scalability", icon: Scale },
  { title: "Reliability", icon: ShieldAlert },
  { title: "Integration", icon: Plug },
  { title: "Cost Efficiency", icon: DollarSign },
];

const benefits: string[] = [
  "Better Technology Decisions",
  "Reduced IT Costs",
  "Improved Efficiency",
  "Increased Security",
  "Scalable IT Infrastructure",
  "Reduced Technology Risks",
  "Improved Productivity",
  "Long-Term Technology Planning",
];

const whyChooseUs: IconItem[] = [
  {
    title: "Business-Focused Consulting",
    description: "Recommendations judged by business impact, not technology for its own sake.",
    icon: Target,
  },
  {
    title: "Tailored Recommendations",
    description: "Advice built around your business, budget and stage of growth.",
    icon: Puzzle,
  },
  {
    title: "Modern Technology Expertise",
    description: "Hands-on experience across current software, cloud and infrastructure.",
    icon: CodeXml,
  },
  {
    title: "Practical Solutions",
    description: "Recommendations you can actually implement, not just a lengthy report.",
    icon: CircleGauge,
  },
  {
    title: "Security & Scalability Focus",
    description: "Every recommendation is checked against security and future growth.",
    icon: ShieldCheck,
  },
  {
    title: "Ongoing Technical Support",
    description: "A consulting partner who stays involved after the recommendations are made.",
    icon: LifeBuoy,
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
        image={SITE_MEDIA.handshake}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="accent" size="xl">
            <Link href={ROUTES.public.tellUsWhatYouNeed}>Get Expert IT Advice</Link>
          </Button>
          <Button asChild variant="outline" size="xl" className="text-ink">
            <Link href={ROUTES.public.contact}>Talk to a Consultant</Link>
          </Button>
        </div>
      </PageHero>

      {/* Services */}
      <Section id="services" aria-labelledby="services-heading">
        <SectionHeading
          id="services-heading"
          eyebrow="What We Offer"
          title="Our IT Consulting Services"
          description="Independent advice across every layer of your technology stack."
          align="center"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-4">
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

      {/* How we help businesses — row list, distinct from the card grid above */}
      <Section tone="surface" aria-labelledby="help-heading">
        <SectionHeading
          id="help-heading"
          eyebrow="How We Help"
          title="How We Help Businesses"
          description="Practical outcomes from working with an IT consultant."
          align="center"
        />
        <div className="mt-12 grid gap-x-10 gap-y-3 lg:mt-16 lg:grid-cols-2">
          {helpAreas.map((area) => (
            <div
              key={area.title}
              className="reveal group flex items-start gap-4 rounded-xl border border-transparent p-4 transition-colors duration-300 hover:border-border hover:bg-card"
            >
              <span className="bg-brand-blue-light text-brand-blue mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-full">
                <area.icon aria-hidden="true" className="size-5" />
              </span>
              <div className="space-y-1">
                <h3 className="text-ink font-bold">{area.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {area.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Consulting process — connected timeline, distinct from other pages' numbered grids */}
      <Section tone="navy" aria-labelledby="process-heading">
        <SectionHeading
          id="process-heading"
          eyebrow="Our Process"
          title="Our Consulting Process"
          description="A structured, seven-step engagement from first conversation to ongoing optimisation."
          align="center"
          tone="inverse"
        />
        <ol className="relative mt-12 flex flex-col gap-8 lg:mt-16">
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[1.375rem] w-px bg-white/15 sm:left-6"
          />
          {consultingProcess.map((item) => (
            <li key={item.step} className="reveal relative flex gap-5 sm:gap-6">
              <span className="border-brand-blue-muted/40 bg-navy text-brand-blue-muted relative z-10 inline-flex size-11 shrink-0 items-center justify-center rounded-full border-2 sm:size-12">
                <item.icon aria-hidden="true" className="size-5" />
              </span>
              <div className="flex-1 space-y-1.5 pt-1">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-brand-blue-muted text-xs font-bold tracking-[0.18em] uppercase">
                    Step {item.step}
                  </span>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                </div>
                <p className="max-w-2xl text-sm leading-relaxed text-white/65">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* IT assessment — compact scorecard grid, distinct from the feature-card sections */}
      <Section aria-labelledby="assessment-heading">
        <SectionHeading
          id="assessment-heading"
          eyebrow="IT Assessment"
          title="We Review Your Systems Across Six Areas"
          description="Every engagement starts by measuring where your current setup stands."
          align="center"
        />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:mt-16 lg:grid-cols-6">
          {assessmentAreas.map((area) => (
            <div
              key={area.title}
              className="reveal border-brand-blue/20 bg-brand-blue-light/40 flex flex-col items-center gap-3 rounded-xl border p-6 text-center"
            >
              <span className="bg-brand-blue text-white inline-flex size-12 items-center justify-center rounded-full">
                <area.icon aria-hidden="true" className="size-5" />
              </span>
              <span className="text-ink text-sm font-bold">{area.title}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Business benefits — checklist, distinct from the feature-card sections */}
      <Section tone="surface" aria-labelledby="benefits-heading">
        <SectionHeading
          id="benefits-heading"
          eyebrow="Why It Matters"
          title="Business Benefits"
          description="What businesses gain from working with an IT consultant."
          align="center"
        />
        <ul className="mt-12 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <li
              key={benefit}
              className="reveal bg-card text-ink flex items-center gap-3 rounded-xl border p-5 text-sm font-semibold"
            >
              <span className="bg-brand-blue-light text-brand-blue inline-flex size-7 shrink-0 items-center justify-center rounded-full">
                <Check aria-hidden="true" className="size-4" strokeWidth={2.5} />
              </span>
              {benefit}
            </li>
          ))}
        </ul>
      </Section>

      {/* Why choose us */}
      <Section aria-labelledby="why-heading">
        <SectionHeading
          id="why-heading"
          eyebrow="Why Choose Us"
          title="Why Choose Miracle International"
          description="A consulting partner invested in your business outcomes, not just recommendations on paper."
          align="center"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
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
        eyebrow="Ready to Get Started?"
        title="Build a Smarter IT Strategy for Your Business"
        description="Book a consultation and our team will help you identify the right technology priorities for your business."
        primary={{
          label: "Get Expert IT Advice",
          href: ROUTES.public.tellUsWhatYouNeed,
        }}
        secondary={{ label: "Contact Us", href: ROUTES.public.contact }}
      />
    </>
  );
}
