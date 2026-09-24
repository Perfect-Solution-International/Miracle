import {
  ArrowRight,
  Boxes,
  ChartColumn,
  CloudCog,
  Cloud as CloudIcon,
  ClipboardList,
  CodeXml,
  Compass,
  FlaskConical,
  Gauge,
  GitBranch,
  Handshake,
  LayoutGrid,
  Network,
  PenTool,
  Plug,
  RefreshCw,
  Rocket,
  ScanEye,
  SearchCheck,
  ShieldCheck,
  Smile,
  Sparkles,
  TrendingUp,
  Users,
  Wand2,
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

const TITLE = "Digital Solutions";
const DESCRIPTION =
  "Digital transformation, automation and integration services that modernise how your business runs, end to end.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.digitalSolutions,
  image: SITE_MEDIA.earthNight,
});

type IconItem = { title: string; description: string; icon: LucideIcon };

const solutions: IconItem[] = [
  {
    title: "Digital Transformation",
    description:
      "Move your business from manual, paper-based processes to connected digital systems.",
    icon: Sparkles,
  },
  {
    title: "Business Process Automation",
    description:
      "Automate approvals, notifications and repetitive tasks to save time across teams.",
    icon: Workflow,
  },
  {
    title: "Cloud Solutions",
    description:
      "Migrate and host your systems in the cloud for reliability, security and easy access.",
    icon: CloudIcon,
  },
  {
    title: "API & System Integration",
    description:
      "Connect your websites, software and third-party tools so data flows automatically.",
    icon: Plug,
  },
  {
    title: "Data & Analytics Solutions",
    description:
      "Turn raw business data into dashboards and reports that support real decisions.",
    icon: ChartColumn,
  },
  {
    title: "Digital Platforms",
    description:
      "Custom portals and platforms that bring customers, staff and partners together online.",
    icon: LayoutGrid,
  },
  {
    title: "Workflow Automation",
    description:
      "Design automated workflows that route tasks, approvals and updates without manual input.",
    icon: GitBranch,
  },
  {
    title: "Custom Digital Solutions",
    description:
      "A solution built specifically for a challenge that off-the-shelf tools cannot solve.",
    icon: Wand2,
  },
];

const transformationPoints: IconItem[] = [
  {
    title: "Process Digitalization",
    description: "Replace paper forms and manual records with structured digital workflows.",
    icon: RefreshCw,
  },
  {
    title: "System Modernization",
    description: "Upgrade outdated software to modern, faster and more secure platforms.",
    icon: CodeXml,
  },
  {
    title: "Cloud Adoption",
    description: "Move critical systems to the cloud for uptime, backups and remote access.",
    icon: CloudCog,
  },
  {
    title: "Business Automation",
    description: "Reduce manual effort by automating routine, repeatable operations.",
    icon: Workflow,
  },
  {
    title: "Data-Driven Operations",
    description: "Use live data and reporting to guide day-to-day business decisions.",
    icon: ChartColumn,
  },
  {
    title: "Connected Business Systems",
    description: "Link your website, software and business systems into one ecosystem.",
    icon: Network,
  },
];

const process = [
  {
    step: "01",
    icon: SearchCheck,
    title: "Business Discovery",
    description:
      "We learn how your business currently operates and where digital gaps exist.",
  },
  {
    step: "02",
    icon: Compass,
    title: "Digital Strategy",
    description:
      "Define a clear digital roadmap aligned with your business goals and priorities.",
  },
  {
    step: "03",
    icon: ClipboardList,
    title: "Solution Planning",
    description:
      "Plan the systems, integrations and tools needed to deliver the strategy.",
  },
  {
    step: "04",
    icon: PenTool,
    title: "Design & Development",
    description:
      "Design and build the solution with your workflows and users in mind.",
  },
  {
    step: "05",
    icon: FlaskConical,
    title: "Integration & Testing",
    description:
      "Connect systems and test thoroughly to confirm everything works together.",
  },
  {
    step: "06",
    icon: Rocket,
    title: "Deployment",
    description:
      "Launch the solution across your business with a smooth, supported rollout.",
  },
  {
    step: "07",
    icon: TrendingUp,
    title: "Continuous Improvement",
    description:
      "Monitor performance and refine the solution as your business evolves.",
  },
] satisfies (IconItem & { step: string })[];

const benefits: IconItem[] = [
  {
    title: "Increased Efficiency",
    description: "Streamlined systems help your team accomplish more in less time.",
    icon: Gauge,
  },
  {
    title: "Reduced Manual Work",
    description: "Automation removes repetitive, error-prone manual tasks.",
    icon: Workflow,
  },
  {
    title: "Lower Operational Costs",
    description: "Fewer inefficiencies and less rework reduce day-to-day costs.",
    icon: TrendingUp,
  },
  {
    title: "Better Customer Experience",
    description: "Faster, more consistent service across every customer touchpoint.",
    icon: Smile,
  },
  {
    title: "Real-Time Business Insights",
    description: "Live dashboards give you an accurate view of the business at any moment.",
    icon: ScanEye,
  },
  {
    title: "Improved Collaboration",
    description: "Shared systems keep teams aligned and working from the same information.",
    icon: Users,
  },
  {
    title: "Secure & Scalable Systems",
    description: "Solutions built to stay secure and grow as your business grows.",
    icon: ShieldCheck,
  },
  {
    title: "Faster Business Growth",
    description: "Modern systems remove the operational friction that slows growth down.",
    icon: Rocket,
  },
];

const integrations = [
  "Websites",
  "Business Systems",
  "APIs",
  "Cloud Services",
  "Databases",
  "Third-Party Platforms",
];

const whyChooseUs: IconItem[] = [
  {
    title: "Tailored Solutions",
    description: "Every solution is designed around your specific business, not a generic template.",
    icon: Wand2,
  },
  {
    title: "Modern Technologies",
    description: "We build with current, proven technology chosen to fit your project.",
    icon: CodeXml,
  },
  {
    title: "Scalable Architecture",
    description: "Systems designed to handle more users, data and complexity over time.",
    icon: LayoutGrid,
  },
  {
    title: "Security-Focused Development",
    description: "Security is built in from the start, not added on afterward.",
    icon: ShieldCheck,
  },
  {
    title: "Reliable Support",
    description: "Ongoing support keeps your systems running smoothly after launch.",
    icon: Handshake,
  },
  {
    title: "Business-Focused Approach",
    description: "Every recommendation is judged by the value it brings to your business.",
    icon: TrendingUp,
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
        image={SITE_MEDIA.earthNight}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="accent" size="xl">
            <Link href={ROUTES.public.tellUsWhatYouNeed}>
              Transform Your Business
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="xl" className="text-ink">
            <Link href={ROUTES.public.contact}>Talk to Our Team</Link>
          </Button>
        </div>
      </PageHero>

      {/* Our Digital Solutions */}
      <Section id="solutions" aria-labelledby="solutions-heading">
        <SectionHeading
          id="solutions-heading"
          eyebrow="What We Offer"
          title="Our Digital Solutions"
          description="A complete set of services to modernise how your business operates."
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

      {/* Digital transformation */}
      <Section tone="surface" aria-labelledby="transformation-heading">
        <SectionHeading
          id="transformation-heading"
          eyebrow="Digital Transformation"
          title="Replacing Manual Work With Modern Systems"
          description="Miracle International helps businesses move away from manual, outdated processes toward connected, digital-first operations."
          align="center"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {transformationPoints.map((point) => (
            <FeatureCard
              key={point.title}
              icon={point.icon}
              title={point.title}
              description={point.description}
              className="reveal"
            />
          ))}
        </div>
      </Section>

      {/* How we work */}
      <Section tone="navy" aria-labelledby="process-heading">
        <SectionHeading
          id="process-heading"
          eyebrow="How We Work"
          title="Our Digital Solutions Process"
          description="A structured, seven-step approach from first discovery to continuous improvement."
          align="center"
          tone="inverse"
        />
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
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

      {/* Business benefits */}
      <Section aria-labelledby="benefits-heading">
        <SectionHeading
          id="benefits-heading"
          eyebrow="Why It Matters"
          title="Business Benefits"
          description="Digital solutions designed to deliver measurable operational value."
          align="center"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-4">
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

      {/* Technology & integration */}
      <Section tone="surface" aria-labelledby="integration-heading">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          <SectionHeading
            id="integration-heading"
            eyebrow="Technology & Integration"
            title="Everything Connected, Nothing Isolated"
            description="Our solutions are built to integrate with the systems you already use, so information moves between them without manual re-entry."
          />
          <ul className="reveal grid grid-cols-2 gap-4">
            {integrations.map((item) => (
              <li
                key={item}
                className="bg-card text-ink flex items-center gap-3 rounded-xl border p-5 text-sm font-semibold"
              >
                <span className="bg-brand-blue-light text-brand-blue inline-flex size-7 shrink-0 items-center justify-center rounded-full">
                  <Boxes aria-hidden="true" className="size-4" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Why choose us */}
      <Section aria-labelledby="why-heading">
        <SectionHeading
          id="why-heading"
          eyebrow="Why Choose Us"
          title="Why Choose Miracle International"
          description="A digital partner focused on measurable business outcomes, not just technology for its own sake."
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
        title="Ready to Transform Your Business Digitally?"
        description="Tell us about your operations and our team will recommend the right digital solution and roadmap."
        primary={{
          label: "Tell Us What You Need",
          href: ROUTES.public.tellUsWhatYouNeed,
        }}
        secondary={{ label: "Contact Us", href: ROUTES.public.contact }}
      />
    </>
  );
}
