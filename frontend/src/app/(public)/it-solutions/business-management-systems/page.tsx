import {
  ArrowRight,
  Building2,
  ChartColumn,
  Check,
  ClipboardList,
  CodeXml,
  Contact,
  FlaskConical,
  Gauge,
  GraduationCap,
  KeyRound,
  LayoutGrid,
  Network,
  Package,
  PenTool,
  Rocket,
  Scale,
  SearchCheck,
  ShieldCheck,
  ShoppingCart,
  TrendingUp,
  UserCog,
  Users,
  Wallet,
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

const TITLE = "Business Management Systems";
const DESCRIPTION =
  "Custom business management systems that bring your operations, employees and data into one connected platform.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.businessManagementSystems,
  image: SITE_MEDIA.itSolutions.businessManagementSystemsHero,
});

type IconItem = { title: string; description: string; icon: LucideIcon };

const introPoints = [
  "One system for every department",
  "Automated, repeatable workflows",
  "Live visibility into daily operations",
  "Built to scale as your business grows",
];

const solutions: IconItem[] = [
  {
    title: "ERP Systems",
    description:
      "Connect finance, inventory, procurement and operations in a single enterprise platform.",
    icon: Network,
  },
  {
    title: "CRM Systems",
    description:
      "Track leads, deals and customer interactions to keep every relationship organised.",
    icon: Contact,
  },
  {
    title: "Inventory Management Systems",
    description:
      "Real-time stock levels, purchase orders and warehouse tracking across locations.",
    icon: Package,
  },
  {
    title: "HR & Employee Management Systems",
    description:
      "Manage staff records, attendance, leave and payroll from one dashboard.",
    icon: UserCog,
  },
  {
    title: "Accounting & Finance Systems",
    description:
      "Automate invoicing, expenses and financial reporting with accurate, audit-ready records.",
    icon: Wallet,
  },
  {
    title: "Sales & Order Management Systems",
    description:
      "Manage quotations, orders and fulfilment from a single, connected pipeline.",
    icon: ShoppingCart,
  },
  {
    title: "Customer Management Systems",
    description:
      "Centralise customer profiles, history and support requests for faster service.",
    icon: Users,
  },
  {
    title: "Custom Business Management Software",
    description:
      "A system designed entirely around your own processes when off-the-shelf tools fall short.",
    icon: CodeXml,
  },
];

const features: IconItem[] = [
  {
    title: "Centralized Business Data",
    description: "All departments work from the same accurate, up-to-date information.",
    icon: Network,
  },
  {
    title: "Real-Time Analytics & Reporting",
    description: "Dashboards and reports that show exactly how the business is performing.",
    icon: ChartColumn,
  },
  {
    title: "Workflow Automation",
    description: "Automate approvals, notifications and routine tasks across teams.",
    icon: Workflow,
  },
  {
    title: "Role-Based User Management",
    description: "Control exactly what each employee can see and do within the system.",
    icon: KeyRound,
  },
  {
    title: "Inventory & Sales Tracking",
    description: "Stock movements and sales activity tracked together in real time.",
    icon: Package,
  },
  {
    title: "Financial Management",
    description: "Invoicing, expenses and accounts kept accurate and easy to review.",
    icon: Wallet,
  },
  {
    title: "Secure Data Management",
    description: "Role-based access, encryption and backups keep business data protected.",
    icon: ShieldCheck,
  },
  {
    title: "Multi-Branch Support",
    description: "Manage multiple locations or branches from a single, unified system.",
    icon: Building2,
  },
];

const buildProcess = [
  {
    step: "01",
    icon: SearchCheck,
    title: "Business Analysis",
    description:
      "We study your current operations to understand where the system needs to help most.",
  },
  {
    step: "02",
    icon: ClipboardList,
    title: "Requirements Planning",
    description:
      "Define scope, modules and priorities so the system matches how your team works.",
  },
  {
    step: "03",
    icon: PenTool,
    title: "System & UI/UX Design",
    description:
      "Design the system architecture and interfaces for a clear, easy user experience.",
  },
  {
    step: "04",
    icon: CodeXml,
    title: "Development",
    description:
      "Build each module with regular reviews, so you see working features throughout.",
  },
  {
    step: "05",
    icon: FlaskConical,
    title: "Testing & Integration",
    description:
      "Test functionality and connect the system with your existing tools and data.",
  },
  {
    step: "06",
    icon: Rocket,
    title: "Deployment",
    description:
      "Roll out the system across your business with data migrated and ready to use.",
  },
  {
    step: "07",
    icon: GraduationCap,
    title: "Training & Ongoing Support",
    description:
      "Train your team and provide continuing support, updates and improvements.",
  },
] satisfies (IconItem & { step: string })[];

const benefits: IconItem[] = [
  {
    title: "Reduced Manual Work",
    description: "Automation removes repetitive tasks so staff can focus on higher-value work.",
    icon: Workflow,
  },
  {
    title: "Improved Productivity",
    description: "Teams move faster with information and tools available in one place.",
    icon: Gauge,
  },
  {
    title: "Better Decision Making",
    description: "Accurate, real-time data supports faster and more confident decisions.",
    icon: TrendingUp,
  },
  {
    title: "Fewer Operational Errors",
    description: "Automated calculations and validation reduce costly manual mistakes.",
    icon: Check,
  },
  {
    title: "Centralized Management",
    description: "Oversee every department and branch from a single connected system.",
    icon: LayoutGrid,
  },
  {
    title: "Scalable Business Operations",
    description: "A system that grows with more users, branches and processes over time.",
    icon: Scale,
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
        image={SITE_MEDIA.itSolutions.businessManagementSystemsHero}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="accent" size="xl">
            <Link href={ROUTES.public.tellUsWhatYouNeed}>
              Transform the Way You Manage Your Business
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="xl" className="text-ink">
            <a href="#solutions">Explore Solutions</a>
          </Button>
        </div>
      </PageHero>

      {/* Introduction */}
      <Section aria-labelledby="overview-heading">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          <SectionHeading
            id="overview-heading"
            eyebrow="Overview"
            title="One System to Run Your Whole Business"
            description="As a business grows, spreadsheets and disconnected tools slow everything down. A custom business management system brings your operations, employees, inventory and finances together, automating routine work and giving you a clear, real-time view of the business."
          />
          <ul className="reveal grid gap-4 sm:grid-cols-2">
            {introPoints.map((point) => (
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

      {/* Business solutions we build */}
      <Section id="solutions" tone="surface" aria-labelledby="solutions-heading">
        <SectionHeading
          id="solutions-heading"
          eyebrow="What We Build"
          title="Business Solutions We Build"
          description="From a single module to a complete, connected management platform."
          align="center"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {solutions.map((solution) => (
            <FeatureCard
              key={solution.title}
              icon={solution.icon}
              title={solution.title}
              description={solution.description}
              className="reveal"
            />
          ))}
        </div>
      </Section>

      {/* Key features */}
      <Section aria-labelledby="features-heading">
        <SectionHeading
          id="features-heading"
          eyebrow="Key Features"
          title="Built for Complete Operational Control"
          description="Capabilities included as standard, so your system is ready to run the business from day one."
          align="center"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              className="reveal"
            />
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section tone="navy" aria-labelledby="process-heading">
        <SectionHeading
          id="process-heading"
          eyebrow="Our Process"
          title="How We Build Your System"
          description="A structured, seven-step process from first analysis to ongoing support."
          align="center"
          tone="inverse"
        />
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {buildProcess.map((item) => (
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

      {/* Benefits */}
      <Section aria-labelledby="benefits-heading">
        <SectionHeading
          id="benefits-heading"
          eyebrow="Why It Matters"
          title="Benefits for Your Business"
          description="Real operational gains, not just new software."
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
        eyebrow="Ready to Take Control?"
        title="Transform the Way You Manage Your Business"
        description="Tell us about your operations and our team will recommend the right system, modules and timeline."
        primary={{
          label: "Tell Us What You Need",
          href: ROUTES.public.tellUsWhatYouNeed,
        }}
        secondary={{ label: "Contact Us", href: ROUTES.public.contact }}
      />
    </>
  );
}
