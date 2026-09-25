import {
  ArrowRight,
  Boxes,
  Check,
  Clock,
  Cloud,
  CodeXml,
  Cpu,
  Database,
  Gauge,
  Headphones,
  LayoutDashboard,
  Layers,
  Plug,
  Server,
  ShieldCheck,
  Smartphone,
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

const TITLE = "Software Development";
const DESCRIPTION =
  "Custom software built around the way your business works, from internal systems and business applications to integrations and automation.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.softwareDevelopment,
  image: SITE_MEDIA.itSolutions.softwareDevelopmentHero,
});

const overviewPoints = [
  "Built for your exact workflows",
  "Scalable as your business grows",
  "Secure handling of business data",
  "Ongoing support after launch",
];

const services: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Custom Business Software",
    description:
      "Applications designed around your processes instead of forcing your team to adapt to off-the-shelf tools.",
    icon: CodeXml,
  },
  {
    title: "Management Systems",
    description:
      "Inventory, HR, customer and operations systems that bring daily activity into one place.",
    icon: LayoutDashboard,
  },
  {
    title: "Web Applications",
    description:
      "Secure browser-based software your team and customers can reach from any device.",
    icon: Layers,
  },
  {
    title: "Mobile Applications",
    description:
      "Android and iOS apps that extend your services to customers and staff on the move.",
    icon: Smartphone,
  },
  {
    title: "System Integration",
    description:
      "Connect accounting, payment, POS and third-party platforms so data flows without re-entry.",
    icon: Plug,
  },
  {
    title: "Process Automation",
    description:
      "Automate approvals, reports and repetitive tasks to save time and reduce errors.",
    icon: Workflow,
  },
];

const developmentProcess = [
  {
    step: "01",
    title: "Discovery & Requirements",
    description:
      "We study your business, users and goals to define exactly what the software must do.",
  },
  {
    step: "02",
    title: "Planning & Architecture",
    description:
      "A clear scope, timeline and technical design, agreed with you before development starts.",
  },
  {
    step: "03",
    title: "UI/UX Design",
    description:
      "Simple, practical interfaces designed so your team can adopt the system quickly.",
  },
  {
    step: "04",
    title: "Development",
    description:
      "Built in stages with regular progress reviews, so you see working software early.",
  },
  {
    step: "05",
    title: "Testing & Quality Assurance",
    description:
      "Functional, performance and security testing to make sure everything works as expected.",
  },
  {
    step: "06",
    title: "Deployment & Support",
    description:
      "Launch, user training and ongoing maintenance to keep your system running smoothly.",
  },
];

const technologies: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Frontend",
    description: "React, Next.js and TypeScript for fast, modern interfaces.",
    icon: Layers,
  },
  {
    title: "Backend & APIs",
    description: "Node.js, Laravel and REST APIs for reliable business logic.",
    icon: Server,
  },
  {
    title: "Databases",
    description: "PostgreSQL, MySQL and MongoDB for secure, structured data.",
    icon: Database,
  },
  {
    title: "Cloud & Hosting",
    description: "AWS, Azure and managed hosting with backups and monitoring.",
    icon: Cloud,
  },
  {
    title: "Mobile",
    description: "Cross-platform apps with Flutter and React Native.",
    icon: Smartphone,
  },
  {
    title: "Integrations",
    description: "Payment gateways, SMS, email, accounting and ERP connections.",
    icon: Boxes,
  },
];

const benefits: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Higher Productivity",
    description: "Less manual work means your team can focus on what grows the business.",
    icon: TrendingUp,
  },
  {
    title: "Faster Operations",
    description: "Real-time information and automated tasks speed up daily decisions.",
    icon: Gauge,
  },
  {
    title: "Secure & Reliable",
    description: "Role-based access, backups and secure coding practices protect your data.",
    icon: ShieldCheck,
  },
  {
    title: "Scalable Solutions",
    description: "Software designed to grow with more users, branches and features.",
    icon: Cpu,
  },
  {
    title: "Time Savings",
    description: "Reports and routine processes that once took hours run in minutes.",
    icon: Clock,
  },
  {
    title: "Dedicated Support",
    description: "A team that stays with you for updates, improvements and help.",
    icon: Headphones,
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
        image={SITE_MEDIA.itSolutions.softwareDevelopmentHero}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="accent" size="xl">
            <Link href={ROUTES.public.tellUsWhatYouNeed}>
              Start Your Project
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
            title="Software That Fits Your Business"
            description="Every business runs differently. We design and build software around your processes, so your team works faster, your data stays organised, and your systems are ready to grow with you."
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

      {/* Key services */}
      <Section id="services" tone="surface" aria-labelledby="services-heading">
        <SectionHeading
          id="services-heading"
          eyebrow="What We Build"
          title="Our Software Development Services"
          description="From a single application to a complete business platform."
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

      {/* Development process */}
      <Section aria-labelledby="process-heading">
        <SectionHeading
          id="process-heading"
          eyebrow="How We Work"
          title="Our Development Process"
          description="A clear, step-by-step approach from your first idea to a working system."
          align="center"
        />
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {developmentProcess.map((process) => (
            <li
              key={process.step}
              className="reveal bg-card hover:border-brand-blue/30 hover:shadow-soft rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1"
            >
              <span className="text-brand-blue text-3xl font-extrabold">{process.step}</span>
              <h3 className="text-ink mt-4 text-lg font-bold">{process.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {process.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Technologies */}
      <Section tone="navy" aria-labelledby="technologies-heading">
        <SectionHeading
          id="technologies-heading"
          eyebrow="Technologies"
          title="Modern Technologies and Solutions"
          description="We choose proven tools that suit your project, budget and long-term plans."
          align="center"
          tone="inverse"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {technologies.map((tech) => (
            <FeatureCard
              key={tech.title}
              icon={tech.icon}
              title={tech.title}
              description={tech.description}
              tone="inverse"
              className="reveal"
            />
          ))}
        </div>
      </Section>

      {/* Benefits */}
      <Section aria-labelledby="benefits-heading">
        <SectionHeading
          id="benefits-heading"
          eyebrow="Why It Matters"
          title="Benefits of Custom Software"
          description="Technology that works for your business, not the other way around."
          align="center"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
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

      <CtaBanner
        eyebrow="Ready to Get Started?"
        title="Let's Build the Software Your Business Needs"
        description="Share your idea or requirement and our team will recommend the right solution, timeline and cost."
        primary={{
          label: "Tell Us What You Need",
          href: ROUTES.public.tellUsWhatYouNeed,
        }}
        secondary={{ label: "Contact Us", href: ROUTES.public.contact }}
      />
    </>
  );
}
