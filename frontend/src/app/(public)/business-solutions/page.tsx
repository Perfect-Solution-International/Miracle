import {
  ArrowRight,
  Building2,
  ChartColumn,
  Check,
  ClipboardList,
  CodeXml,
  Compass,
  Globe2,
  Handshake,
  Headphones,
  Lightbulb,
  Network,
  Package,
  Rocket,
  Settings2,
  ShieldCheck,
  TrendingUp,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Breadcrumb } from "@/components/common/breadcrumb";
import { Eyebrow } from "@/components/common/eyebrow";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA, type SiteImage } from "@/config/site-media";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";

const TITLE = "Business Solutions";
const DESCRIPTION =
  "From business planning and setup to expansion, technology and ongoing support, we help turn ideas into sustainable businesses.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.businessSolutions,
  image: SITE_MEDIA.businessSolutions.hero,
});

type IconItem = { title: string; description: string; icon: LucideIcon };
type Service = {
  id: string;
  title: string;
  short: string;
  heading: string;
  description: string;
  icon: LucideIcon;
  image: SiteImage;
  href: string;
  capabilities: readonly string[];
  flow: readonly string[];
  outcomes: readonly string[];
};

const services = [
  {
    id: "start-a-business",
    title: "Start a Business",
    short: "Give an early idea a practical direction.",
    heading: "Turn an Idea Into a Clear Business Direction",
    description:
      "Move from an early idea to practical business preparation. We help you examine the opportunity, clarify priorities and shape a more organized path toward launch.",
    icon: Lightbulb,
    image: SITE_MEDIA.businessSolutions.startBusiness,
    href: ROUTES.public.businessStart,
    capabilities: [
      "Idea Clarification",
      "Opportunity Assessment",
      "Market Direction",
      "Business Structure Planning",
      "Resource Planning",
      "Launch Preparation",
    ],
    flow: ["Idea", "Validate", "Plan", "Prepare", "Start"],
    outcomes: [
      "Clearer early decisions",
      "Better preparation",
      "A more organized setup path",
    ],
  },
  {
    id: "business-consultation",
    title: "Business Consultation",
    short: "Make the next decision with clearer guidance.",
    heading: "Better Decisions Start With Clearer Guidance",
    description:
      "Work through a business challenge or opportunity with focused, practical advice. Consultation helps turn an uncertain situation into priorities and next steps your team can act on.",
    icon: Handshake,
    image: SITE_MEDIA.businessSolutions.businessConsultation,
    href: ROUTES.public.businessConsultation,
    capabilities: [
      "Business Assessment",
      "Decision Support",
      "Opportunity Review",
      "Operational Guidance",
      "Growth Direction",
      "Practical Recommendations",
    ],
    flow: ["Challenge", "Insight", "Recommendation", "Action"],
    outcomes: ["Clearer decisions", "Stronger priorities", "Practical next steps"],
  },
  {
    id: "business-planning",
    title: "Business Planning",
    short: "Connect goals, resources and execution.",
    heading: "Build a Plan That Can Move Into Action",
    description:
      "A useful business plan connects the market opportunity to the work needed to deliver it. We bring goals, operations and resources into a coherent direction.",
    icon: ClipboardList,
    image: SITE_MEDIA.businessSolutions.businessPlanning,
    href: ROUTES.public.businessPlanning,
    capabilities: [
      "Business Goals",
      "Market Direction",
      "Operational Planning",
      "Resource Planning",
      "Business Structure",
      "Growth Roadmap",
    ],
    flow: ["Vision", "Strategy", "Resources", "Operations", "Growth"],
    outcomes: ["A clearer direction", "Aligned priorities", "A practical roadmap"],
  },
  {
    id: "business-setup",
    title: "Business Setup Support",
    short: "Put the practical pieces in place.",
    heading: "From Planning to Practical Business Setup",
    description:
      "Turning a plan into operations takes coordination. We help connect requirements, people, suppliers and systems so the business can move toward launch with more confidence.",
    icon: Settings2,
    image: SITE_MEDIA.businessSolutions.businessSetup,
    href: ROUTES.public.businessSetup,
    capabilities: [
      "Setup Coordination",
      "Supplier Support",
      "Resource Preparation",
      "Operational Requirements",
      "Technology Setup",
      "Workflow Readiness",
      "Launch Support",
    ],
    flow: ["Plan", "Resources", "Suppliers", "Systems", "Operations", "Launch"],
    outcomes: [
      "Better coordination",
      "Clearer requirements",
      "Improved launch readiness",
    ],
  },
  {
    id: "business-expansion",
    title: "Business Expansion",
    short: "Prepare the operation for its next stage.",
    heading: "Prepare Your Business for the Next Stage of Growth",
    description:
      "Growth creates new demands on capacity, systems and relationships. We help assess what needs to become stronger before you move into a new market, capability or opportunity.",
    icon: TrendingUp,
    image: SITE_MEDIA.businessSolutions.businessExpansion,
    href: ROUTES.public.businessExpansion,
    capabilities: [
      "Growth Assessment",
      "Capacity Planning",
      "Supplier Expansion",
      "New Market Preparation",
      "Technology Scaling",
      "Operational Improvement",
      "Strategic Support",
    ],
    flow: ["Current Business", "Strengthen", "Scale", "Expand", "New Opportunities"],
    outcomes: [
      "Better growth readiness",
      "Stronger capacity",
      "Clearer expansion direction",
    ],
  },
  {
    id: "machinery-equipment",
    title: "Machinery & Equipment",
    short: "Find equipment around real requirements.",
    heading: "The Right Equipment for Real Business Needs",
    description:
      "The right machinery starts with the operation it needs to serve. We help define requirements, compare suitable options and coordinate sourcing and implementation considerations.",
    icon: Package,
    image: SITE_MEDIA.businessSolutions.machineryEquipment,
    href: ROUTES.public.businessMachinery,
    capabilities: [
      "Equipment Requirement Assessment",
      "Supplier Sourcing",
      "Machinery Selection",
      "Commercial Equipment Support",
      "Product Comparison",
      "Procurement Coordination",
      "Implementation Support",
    ],
    flow: ["Requirement", "Identify", "Source", "Evaluate", "Coordinate", "Implement"],
    outcomes: [
      "More suitable choices",
      "Better sourcing coordination",
      "Practical implementation planning",
    ],
  },
  {
    id: "business-technology",
    title: "Business Technology",
    short: "Connect systems to everyday work.",
    heading: "Use Technology to Run Your Business Better",
    description:
      "Technology has the most value when it improves how people work. We help connect business needs to useful systems, clearer information and more efficient workflows.",
    icon: CodeXml,
    image: SITE_MEDIA.businessSolutions.businessTechnology,
    href: ROUTES.public.businessTechnology,
    capabilities: [
      "Digital Business Systems",
      "Workflow Improvement",
      "Management Tools",
      "Reporting Visibility",
      "Business Automation",
      "Connected Operations",
      "Technology Planning",
    ],
    flow: ["People", "Processes", "Technology", "Data"],
    outcomes: ["Clearer visibility", "Connected operations", "Less manual work"],
  },
  {
    id: "business-support",
    title: "Business Support",
    short: "Keep moving after the first milestone.",
    heading: "Support That Continues as Your Business Evolves",
    description:
      "Business needs do not stop at launch. We provide practical assistance as operations change, questions arise and new opportunities call for a fresh response.",
    icon: Headphones,
    image: SITE_MEDIA.businessSolutions.businessSupport,
    href: ROUTES.public.businessSupport,
    capabilities: [
      "Ongoing Business Guidance",
      "Operational Support",
      "Supplier Coordination",
      "Business Problem Solving",
      "Technology Support",
      "Growth Support",
      "Changing Business Needs",
    ],
    flow: ["Launch", "Operate", "Improve", "Grow", "Adapt"],
    outcomes: ["Continuity of support", "More coordinated responses", "Room to adapt"],
  },
] as const satisfies readonly Service[];

const heroValues: IconItem[] = [
  {
    title: "Practical Guidance",
    description: "Support for real business decisions.",
    icon: Compass,
  },
  {
    title: "End-to-End Support",
    description: "From planning to implementation.",
    icon: Network,
  },
  {
    title: "Long-Term Partnership",
    description: "Support as your business grows.",
    icon: Handshake,
  },
];

const overviewValues: IconItem[] = [
  {
    title: "Business-First Thinking",
    description: "Start with your objectives and operating reality.",
    icon: Compass,
  },
  {
    title: "Practical Execution",
    description: "Connect advice to the work that follows.",
    icon: Settings2,
  },
  {
    title: "Connected Services",
    description: "Bring related needs together through one team.",
    icon: Network,
  },
  {
    title: "Scalable Support",
    description: "Adjust the approach as the business develops.",
    icon: TrendingUp,
  },
];

const journey: (IconItem & { step: string })[] = [
  { step: "01", title: "Idea", description: "Clarify the opportunity.", icon: Lightbulb },
  {
    step: "02",
    title: "Planning",
    description: "Set direction and priorities.",
    icon: Compass,
  },
  {
    step: "03",
    title: "Setup",
    description: "Coordinate essential resources.",
    icon: Building2,
  },
  { step: "04", title: "Launch", description: "Put the plan into motion.", icon: Rocket },
  {
    step: "05",
    title: "Growth",
    description: "Strengthen daily operations.",
    icon: ChartColumn,
  },
  {
    step: "06",
    title: "Expansion",
    description: "Prepare for what comes next.",
    icon: Globe2,
  },
];

const advantages: IconItem[] = [
  {
    title: "End-to-End Business Support",
    description: "Connect planning, setup, operations and growth.",
    icon: Network,
  },
  {
    title: "Practical Business Guidance",
    description: "Ground decisions in real requirements.",
    icon: Compass,
  },
  {
    title: "Cross-Service Expertise",
    description: "Bring sourcing, operations and other services together.",
    icon: UsersRound,
  },
  {
    title: "Technology Integration",
    description: "Use systems where they improve the work.",
    icon: CodeXml,
  },
  {
    title: "Growth-Focused Solutions",
    description: "Prepare the business for its next stage.",
    icon: TrendingUp,
  },
  {
    title: "Long-Term Support",
    description: "Stay connected beyond the first milestone.",
    icon: ShieldCheck,
  },
];

const ecosystem = [
  { title: "Planning", icon: ClipboardList, position: "top-2 left-2" },
  { title: "Consultation", icon: Handshake, position: "top-0 left-1/2 -translate-x-1/2" },
  { title: "Setup", icon: Building2, position: "top-2 right-2" },
  { title: "Suppliers", icon: Package, position: "top-1/2 left-0 -translate-y-1/2" },
  { title: "Technology", icon: CodeXml, position: "top-1/2 right-0 -translate-y-1/2" },
  { title: "Operations", icon: Settings2, position: "bottom-2 left-2" },
  { title: "Growth", icon: TrendingUp, position: "bottom-0 left-1/2 -translate-x-1/2" },
  { title: "Support", icon: Headphones, position: "right-2 bottom-2" },
] as const;

const businessOutcomes = [
  "Clearer Business Direction",
  "Better Organized Operations",
  "Stronger Supplier Coordination",
  "Improved Management Visibility",
  "Better Technology Integration",
  "More Scalable Processes",
  "Stronger Growth Preparation",
  "More Consistent Support",
] as const;

function ServiceLink({
  service,
  inverse = false,
}: {
  service: Service;
  inverse?: boolean;
}) {
  return (
    <Button asChild variant={inverse ? "outline-inverse" : "outline"} size="xl">
      <Link href={service.href}>
        Explore {service.title}
        <ArrowRight data-icon="inline-end" aria-hidden="true" />
      </Link>
    </Button>
  );
}

function CapabilityList({
  items,
  inverse = false,
}: {
  items: readonly string[];
  inverse?: boolean;
}) {
  return (
    <ul className="grid gap-x-5 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            "flex items-start gap-2 border-b py-3 text-sm font-semibold",
            inverse ? "border-white/10 text-white/85" : "border-brand-blue/10 text-ink",
          )}
        >
          <Check
            aria-hidden="true"
            className={cn(
              "mt-0.5 size-4 shrink-0",
              inverse ? "text-brand-blue-muted" : "text-brand-blue",
            )}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

function Flow({
  items,
  inverse = false,
  vertical = false,
}: {
  items: readonly string[];
  inverse?: boolean;
  vertical?: boolean;
}) {
  return (
    <ol
      className={cn(
        "grid gap-2",
        vertical ? "sm:grid-cols-1" : "sm:auto-cols-fr sm:grid-flow-col",
      )}
    >
      {items.map((item, index) => (
        <li
          key={item}
          className={cn(
            "flex min-w-0 items-center gap-2 rounded-xl border px-3 py-3 text-xs font-bold tracking-wide uppercase sm:text-[0.7rem]",
            inverse
              ? "border-white/15 bg-white/5 text-white"
              : "border-brand-blue/12 text-brand-blue-dark shadow-soft bg-white",
          )}
        >
          <span
            className={cn(
              "shrink-0 text-[0.65rem]",
              inverse ? "text-brand-blue-muted" : "text-brand-blue",
            )}
          >
            0{index + 1}
          </span>
          <span className="min-w-0">{item}</span>
          {index < items.length - 1 && (
            <ArrowRight
              aria-hidden="true"
              className={cn(
                "ml-auto size-3 shrink-0",
                vertical && "rotate-90",
                inverse ? "text-brand-blue-muted/70" : "text-brand-blue/55",
              )}
            />
          )}
        </li>
      ))}
    </ol>
  );
}

function Photo({
  image,
  sizes,
  className = "",
}: {
  image: SiteImage;
  sizes: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "shadow-lift relative overflow-hidden rounded-3xl border border-white/15",
        className,
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="from-navy/35 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
      />
    </div>
  );
}

function ServiceIntro({
  service,
  number,
  inverse = false,
}: {
  service: Service;
  number: number;
  inverse?: boolean;
}) {
  return (
    <div>
      <Eyebrow tone={inverse ? "inverse" : "default"}>
        0{number} / {service.title}
      </Eyebrow>
      <h2
        id={`${service.id}-heading`}
        className={cn(
          "mt-5 max-w-2xl text-3xl leading-tight font-bold tracking-tight sm:text-4xl lg:text-[2.75rem]",
          inverse ? "text-white" : "text-ink",
        )}
      >
        {service.heading}
      </h2>
      <p
        className={cn(
          "mt-5 max-w-xl text-base leading-relaxed",
          inverse ? "text-white/70" : "text-muted-foreground",
        )}
      >
        {service.description}
      </p>
    </div>
  );
}

export default function Page() {
  const [
    start,
    consultation,
    planning,
    setup,
    expansion,
    machinery,
    technology,
    support,
  ] = services;

  return (
    <main>
      <section
        aria-labelledby="business-solutions-hero-heading"
        className="text-ink relative isolate overflow-hidden bg-white/50"
      >
        <div aria-hidden="true" className="bg-grid absolute inset-0 -z-20 opacity-45" />
        <div
          aria-hidden="true"
          className="bg-brand-blue/10 absolute -top-24 right-0 -z-10 size-[35rem] rounded-full blur-3xl"
        />
        <div className="container-page grid gap-12 pt-12 pb-10 md:pt-16 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-16 lg:pt-20 lg:pb-14">
          <div className="max-w-2xl">
            <Breadcrumb items={[{ label: TITLE }]} />
            <div className="mt-9">
              <Eyebrow>Business Solutions</Eyebrow>
            </div>
            <h1
              id="business-solutions-hero-heading"
              className="mt-5 text-4xl leading-[1.03] font-bold tracking-tight sm:text-5xl lg:text-[4.25rem]"
            >
              Build Smarter.
              <br />
              <span className="text-brand-blue">Grow Stronger.</span>
            </h1>
            <p className="text-muted-foreground mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
              Practical business support designed to help turn ideas, plans and
              opportunities into well-organized, scalable operations.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="accent" size="xl">
                <Link href={ROUTES.public.tellUsWhatYouNeed}>
                  Start Your Business Journey
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="xl"
                className="border-brand-blue/20 text-ink hover:border-brand-blue/50 hover:bg-brand-blue-light/50 bg-white/80"
              >
                <a href="#solutions">Explore Our Solutions</a>
              </Button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[42rem] px-2 pt-6 pb-16 sm:px-8 sm:pb-20">
            <div
              aria-hidden="true"
              className="bg-brand-blue/15 absolute inset-16 rounded-full blur-3xl"
            />
            <Photo
              image={SITE_MEDIA.businessSolutions.hero}
              sizes="(min-width: 1280px) 620px, (min-width: 1024px) 50vw, 90vw"
              className="border-brand-blue/10 ml-auto aspect-[1.16] w-[88%] shadow-[0_30px_80px_-30px_rgb(17_80_168_/_0.3)]"
            />
            <div className="shadow-lift absolute bottom-0 left-0 w-[43%] overflow-hidden rounded-2xl border-4 border-white sm:left-2">
              <div className="relative aspect-[1.35]">
                <Image
                  src={SITE_MEDIA.businessSolutions.heroInset.src}
                  alt={SITE_MEDIA.businessSolutions.heroInset.alt}
                  fill
                  sizes="(min-width: 1024px) 260px, 42vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="text-ink shadow-soft border-brand-blue/15 absolute right-0 bottom-8 rounded-xl border bg-white px-4 py-3 sm:right-3 sm:bottom-11 sm:px-5">
              <p className="text-brand-blue text-xs font-bold tracking-wide">FROM IDEA</p>
              <p className="mt-0.5 text-sm font-bold">TO GROWTH</p>
            </div>
            <div className="text-navy shadow-soft border-brand-blue/15 absolute top-0 left-0 rounded-xl border bg-white/95 px-4 py-3 text-xs font-bold tracking-wide sm:left-3">
              <span className="bg-brand-red mr-2 inline-block size-2 rounded-full" />
              PLAN · BUILD · EXPAND
            </div>
          </div>
        </div>
        <div className="border-brand-blue/10 border-y bg-white/75">
          <div className="container-page grid md:grid-cols-3">
            {heroValues.map(({ title, description, icon: Icon }, index) => (
              <div
                key={title}
                className={cn(
                  "flex items-center gap-4 py-5 md:px-6",
                  index > 0 && "border-brand-blue/10 border-t md:border-t-0 md:border-l",
                )}
              >
                <span className="text-brand-blue bg-brand-blue-light border-brand-blue/10 flex size-10 shrink-0 items-center justify-center rounded-xl border">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <p className="text-ink text-sm font-bold">{title}</p>
                  <p className="text-muted-foreground mt-0.5 text-xs">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section
        aria-labelledby="overview-heading"
        tone="default"
        containerClassName="grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:gap-20"
      >
        <div>
          <SectionHeading
            id="overview-heading"
            eyebrow="About Business Solutions"
            title={
              <>
                Practical Support
                <br />
                for Every Stage of Business
              </>
            }
            description="Miracle International supports businesses from initial planning and setup through sourcing, technology, operations and growth. We connect the right services around the challenge in front of you."
          />
          <p className="text-brand-blue border-brand-red mt-8 border-l-2 pl-5 text-2xl leading-snug font-semibold tracking-tight sm:text-3xl">
            Idea. <span className="text-ink">Plan.</span>
            <br />
            Action. <span className="text-ink">Growth.</span>
          </p>
        </div>
        <div className="relative pb-8 sm:pl-8">
          <Photo
            image={SITE_MEDIA.businessSolutions.overview}
            sizes="(min-width: 1024px) 50vw, 90vw"
            className="aspect-[1.55]"
          />
          <div className="border-border/75 shadow-lift relative -mt-10 ml-4 grid overflow-hidden rounded-2xl border bg-white sm:ml-0 sm:w-[92%] sm:grid-cols-2">
            {overviewValues.map(({ title, description, icon: Icon }, index) => (
              <div
                key={title}
                className={cn(
                  "flex gap-3 p-4 sm:p-5",
                  index % 2 === 1 && "sm:border-l",
                  index > 1 && "border-t",
                )}
              >
                <span className="bg-brand-blue-light text-brand-blue flex size-9 shrink-0 items-center justify-center rounded-lg">
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                <div>
                  <h3 className="text-ink text-sm font-bold">{title}</h3>
                  <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-brand-blue shadow-lift absolute top-5 right-0 hidden rounded-xl px-4 py-4 text-white sm:block">
            <Lightbulb aria-hidden="true" className="size-5" />
            <p className="mt-2 max-w-28 text-xs leading-relaxed font-bold">
              IDEA
              <br />
              PLAN
              <br />
              ACTION
              <br />
              GROWTH
            </p>
          </div>
        </div>
      </Section>
      <Section
        id="solutions"
        aria-labelledby="solutions-heading"
        className="bg-brand-blue-light/30 scroll-mt-24 py-14 md:py-16 xl:py-20"
      >
        <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-35" />
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="solutions-heading"
            eyebrow="Explore Business Solutions"
            title="Find the Support for Your Next Move"
            description="Use this index to explore a service below, then visit its dedicated page for a closer look."
          />
          <p className="border-brand-red text-brand-blue-dark max-w-xs border-l-2 pl-4 text-sm font-semibold">
            Eight connected services across the business journey.
          </p>
        </div>
        <nav
          aria-label="Business Solutions service sections"
          className="border-border/80 shadow-soft mt-10 grid overflow-hidden rounded-2xl border bg-white md:grid-cols-2 xl:grid-cols-4"
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group border-border/75 hover:bg-brand-blue-light/40 flex min-w-0 gap-3 border-b p-5 transition-colors xl:[&:not(:nth-child(4n))]:border-r md:[&:nth-child(odd)]:border-r xl:[&:nth-child(odd)]:border-r-0"
            >
              <span className="bg-brand-blue-light text-brand-blue flex size-10 shrink-0 items-center justify-center rounded-xl">
                <service.icon aria-hidden="true" className="size-5" />
              </span>
              <div className="min-w-0">
                <span className="text-brand-red text-[0.65rem] font-bold tracking-widest">
                  0{index + 1}
                </span>
                <h3 className="text-ink mt-0.5 text-sm font-bold">
                  <a href={`#${service.id}`} className="hover:text-brand-blue">
                    {service.title}
                  </a>
                </h3>
                <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                  {service.short}
                </p>
                <Link
                  href={service.href}
                  className="text-brand-blue mt-2 inline-flex items-center gap-1 text-xs font-bold hover:underline"
                >
                  Learn More
                  <ArrowRight aria-hidden="true" className="size-3" />
                </Link>
              </div>
            </div>
          ))}
        </nav>
      </Section>

      <Section
        id={start.id}
        aria-labelledby={`${start.id}-heading`}
        className="scroll-mt-24 py-14 md:py-16 xl:py-20"
      >
        <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:gap-16">
          <div>
            <ServiceIntro service={start} number={1} />
            <div className="mt-7">
              <ServiceLink service={start} />
            </div>
          </div>
          <div className="relative pb-9 sm:pr-10">
            <Photo
              image={start.image}
              sizes="(min-width: 1024px) 52vw, 90vw"
              className="aspect-[1.45]"
            />
            <div className="border-border/70 shadow-lift absolute right-0 bottom-0 left-8 rounded-xl border bg-white px-5 py-4 sm:left-auto sm:w-60">
              <p className="text-brand-blue text-xs font-bold tracking-widest">
                STRONGER START
              </p>
              <p className="text-ink mt-1 text-sm font-semibold">
                From first idea to launch preparation.
              </p>
            </div>
          </div>
        </div>
        <div className="border-brand-blue/12 mt-10 border-t pt-8">
          <p className="text-brand-blue mb-4 text-xs font-bold tracking-widest uppercase">
            The startup path
          </p>
          <Flow items={start.flow} />
        </div>
        <div className="mt-7 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <CapabilityList items={start.capabilities} />
          <div className="bg-brand-blue-light/45 border-brand-blue/10 rounded-2xl border p-5">
            <p className="text-brand-blue text-xs font-bold tracking-widest uppercase">
              Business value
            </p>
            <ul className="mt-3 space-y-2">
              {start.outcomes.map((item) => (
                <li key={item} className="text-ink flex gap-2 text-sm font-semibold">
                  <Check aria-hidden="true" className="text-brand-blue size-4 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section
        id={consultation.id}
        aria-labelledby={`${consultation.id}-heading`}
        className="bg-brand-blue-light/30 scroll-mt-24 py-14 md:py-16 xl:py-20"
      >
        <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-25" />
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div className="relative order-2 lg:order-1">
            <Photo
              image={consultation.image}
              sizes="(min-width: 1024px) 50vw, 90vw"
              className="aspect-[1.25]"
            />
            <div className="shadow-soft border-brand-blue/10 relative -mt-8 mr-6 ml-6 rounded-2xl border bg-white p-4 sm:mr-12 sm:ml-0">
              <p className="text-brand-blue text-xs font-bold tracking-widest uppercase">
                From challenge to action
              </p>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {consultation.flow.map((item, index) => (
                  <div key={item} className="min-w-0">
                    <span className="text-brand-red text-xs font-bold">0{index + 1}</span>
                    <p className="text-ink mt-1 text-xs font-bold break-words sm:text-sm">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <ServiceIntro service={consultation} number={2} />
            <div className="mt-6">
              <CapabilityList items={consultation.capabilities} />
            </div>
            <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
              The result is a clearer view of the decision, the tradeoffs and the work
              needed next.
            </p>
            <div className="mt-6">
              <ServiceLink service={consultation} />
            </div>
          </div>
        </div>
      </Section>

      <Section
        id={planning.id}
        aria-labelledby={`${planning.id}-heading`}
        className="scroll-mt-24 py-14 md:py-16 xl:py-20"
      >
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          <div>
            <ServiceIntro service={planning} number={3} />
            <div className="mt-6">
              <CapabilityList items={planning.capabilities} />
            </div>
            <div className="mt-7">
              <ServiceLink service={planning} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-[0.68fr_1.32fr] sm:items-stretch">
            <div className="bg-navy rounded-2xl p-5 text-white sm:py-7">
              <p className="text-brand-blue-muted text-xs font-bold tracking-widest uppercase">
                The planning roadmap
              </p>
              <ol className="border-brand-blue-muted/30 mt-6 space-y-5 border-l pl-4">
                {planning.flow.map((item, index) => (
                  <li key={item} className="relative text-sm font-bold">
                    <span
                      className={cn(
                        "absolute top-1 -left-[1.35rem] size-2 rounded-full",
                        index === 0 ? "bg-brand-red" : "bg-brand-blue-muted",
                      )}
                    />
                    <span className="text-brand-blue-muted mr-2 text-xs">
                      0{index + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
            <Photo
              image={planning.image}
              sizes="(min-width: 1024px) 36vw, (min-width: 640px) 60vw, 90vw"
              className="aspect-[1.25] min-h-72 sm:aspect-auto"
            />
          </div>
        </div>
      </Section>

      <Section
        id={setup.id}
        tone="navy"
        aria-labelledby={`${setup.id}-heading`}
        className="scroll-mt-24 py-14 md:py-16 xl:py-20"
      >
        <div
          aria-hidden="true"
          className="bg-grid-inverse absolute inset-0 -z-20 opacity-65"
        />
        <div
          aria-hidden="true"
          className="bg-brand-blue/20 absolute -right-32 bottom-0 -z-10 size-96 rounded-full blur-3xl"
        />
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div className="relative">
            <Photo
              image={setup.image}
              sizes="(min-width: 1024px) 50vw, 90vw"
              className="aspect-[1.4]"
            />
            <div className="border-navy-light shadow-lift bg-navy/90 absolute right-5 bottom-5 left-5 rounded-xl border p-4 backdrop-blur-sm sm:right-auto sm:w-64">
              <p className="text-brand-blue-muted text-xs font-bold tracking-widest">
                FROM PLAN TO OPERATIONS
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                Coordinate the pieces that make a launch possible.
              </p>
            </div>
          </div>
          <div>
            <ServiceIntro service={setup} number={4} inverse />
            <div className="mt-6">
              <CapabilityList items={setup.capabilities} inverse />
            </div>
            <div className="mt-7">
              <ServiceLink service={setup} inverse />
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-8">
          <p className="text-brand-blue-muted mb-4 text-xs font-bold tracking-widest uppercase">
            Connected setup flow
          </p>
          <Flow items={setup.flow} inverse />
        </div>
      </Section>

      <Section
        id={expansion.id}
        aria-labelledby={`${expansion.id}-heading`}
        className="scroll-mt-24 py-14 md:py-16 xl:py-20"
      >
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-end lg:gap-16">
          <div>
            <ServiceIntro service={expansion} number={5} />
            <div className="mt-7">
              <ServiceLink service={expansion} />
            </div>
          </div>
          <div className="relative">
            <Photo
              image={expansion.image}
              sizes="(min-width: 1024px) 52vw, 90vw"
              className="aspect-[1.8]"
            />
            <div className="shadow-soft absolute right-4 bottom-4 left-4 rounded-xl border border-white/70 bg-white/95 px-4 py-3 sm:left-auto sm:w-52">
              <p className="text-brand-blue text-xs font-bold tracking-widest">
                GROWTH READINESS
              </p>
              <p className="text-ink mt-1 text-sm font-semibold">
                Strengthen before you scale.
              </p>
            </div>
          </div>
        </div>
        <div className="border-brand-blue/12 mt-10 grid gap-8 border-t pt-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-brand-blue mb-3 text-xs font-bold tracking-widest uppercase">
              Areas of support
            </p>
            <CapabilityList items={expansion.capabilities} />
          </div>
          <div className="bg-brand-blue-light/40 border-brand-blue/10 rounded-2xl border p-5 sm:p-6">
            <p className="text-brand-blue mb-4 text-xs font-bold tracking-widest uppercase">
              The growth pathway
            </p>
            <Flow items={expansion.flow} vertical />
            <p className="text-muted-foreground mt-4 text-sm">
              Prepare capacity, systems and relationships for the opportunities ahead.
            </p>
          </div>
        </div>
      </Section>

      <Section
        id={machinery.id}
        aria-labelledby={`${machinery.id}-heading`}
        className="bg-brand-blue-light/30 scroll-mt-24 py-14 md:py-16 xl:py-20"
      >
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <ServiceIntro service={machinery} number={6} />
            <div className="mt-6">
              <CapabilityList items={machinery.capabilities} />
            </div>
            <div className="mt-7">
              <ServiceLink service={machinery} />
            </div>
          </div>
          <div className="relative pb-8 sm:pl-8">
            <Photo
              image={machinery.image}
              sizes="(min-width: 1024px) 50vw, 90vw"
              className="aspect-[1.15]"
            />
            <div className="shadow-lift border-brand-blue/10 relative -mt-8 mr-8 ml-0 flex items-center gap-3 rounded-xl border bg-white p-4 sm:mr-16 sm:-ml-8">
              <span className="bg-brand-blue-light text-brand-blue flex size-10 shrink-0 items-center justify-center rounded-lg">
                <Package aria-hidden="true" className="size-5" />
              </span>
              <div>
                <p className="text-ink text-sm font-bold">Requirement-led sourcing</p>
                <p className="text-muted-foreground text-xs">
                  Choose around the work the equipment must do.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <p className="text-brand-blue mb-4 text-xs font-bold tracking-widest uppercase">
            From requirement to implementation
          </p>
          <Flow items={machinery.flow} />
        </div>
      </Section>

      <Section
        id={technology.id}
        tone="navy"
        aria-labelledby={`${technology.id}-heading`}
        className="scroll-mt-24 py-14 md:py-16 xl:py-20"
      >
        <div
          aria-hidden="true"
          className="bg-grid-inverse absolute inset-0 -z-20 opacity-70"
        />
        <div
          aria-hidden="true"
          className="bg-brand-blue/20 absolute top-10 right-1/4 -z-10 size-96 rounded-full blur-3xl"
        />
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-16">
          <div>
            <ServiceIntro service={technology} number={7} inverse />
            <div className="mt-6">
              <CapabilityList items={technology.capabilities} inverse />
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ServiceLink service={technology} inverse />
              <Button asChild variant="outline-inverse" size="xl">
                <Link href={ROUTES.public.itSolutions}>
                  Explore IT Solutions
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-2xl px-2 pt-4 pb-8 sm:px-10 sm:py-10">
            <Photo
              image={technology.image}
              sizes="(min-width: 1024px) 48vw, 90vw"
              className="aspect-[1.22]"
            />
            <div className="shadow-lift bg-brand-blue/20 relative -mt-10 mr-3 ml-3 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/20 sm:mr-0 sm:ml-0">
              {technology.flow.map((item, index) => (
                <div
                  key={item}
                  className="bg-navy-light flex items-center gap-3 p-4 sm:p-5"
                >
                  <span className="text-brand-blue-muted text-xs font-bold">
                    0{index + 1}
                  </span>
                  <span className="text-sm font-bold text-white">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="border-brand-blue-muted/40 mt-6 max-w-2xl border-l pl-4 text-sm leading-relaxed text-white/60">
          Better connected people, processes, technology and information can make everyday
          work easier to manage.
        </p>
      </Section>

      <Section
        id={support.id}
        aria-labelledby={`${support.id}-heading`}
        className="scroll-mt-24 py-14 md:py-16 xl:py-20"
      >
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div className="relative order-2 lg:order-1">
            <Photo
              image={support.image}
              sizes="(min-width: 1024px) 50vw, 90vw"
              className="aspect-[1.3]"
            />
            <div className="bg-brand-blue shadow-lift absolute right-4 bottom-4 rounded-xl px-4 py-3 text-white sm:right-8 sm:bottom-8">
              <p className="text-xs font-bold tracking-widest">BEYOND LAUNCH</p>
              <p className="mt-1 text-sm font-semibold">Support for what comes next.</p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <ServiceIntro service={support} number={8} />
            <div className="mt-6">
              <CapabilityList items={support.capabilities} />
            </div>
            <div className="mt-7">
              <ServiceLink service={support} />
            </div>
          </div>
        </div>
        <div className="border-brand-blue/12 mt-10 border-t pt-8">
          <p className="text-brand-blue mb-4 text-xs font-bold tracking-widest uppercase">
            A continuing business lifecycle
          </p>
          <Flow items={support.flow} />
        </div>
      </Section>

      <Section
        id="journey"
        tone="navy"
        aria-labelledby="journey-heading"
        className="py-14 md:py-16 xl:py-20"
      >
        <div
          aria-hidden="true"
          className="bg-grid-inverse absolute inset-0 -z-20 opacity-75"
        />
        <div
          aria-hidden="true"
          className="bg-brand-blue/20 absolute -right-24 -bottom-40 -z-10 size-96 rounded-full blur-3xl"
        />
        <SectionHeading
          id="journey-heading"
          eyebrow="The Business Journey"
          title={
            <>
              A Clearer Path
              <br />
              From Idea to Expansion
            </>
          }
          description="The right support at the right moment helps turn uncertainty into practical progress."
          tone="inverse"
        />
        <ol className="border-brand-blue-muted/35 relative mt-12 grid gap-7 border-l pl-7 lg:mt-16 lg:grid-cols-6 lg:gap-5 lg:border-t lg:border-l-0 lg:pl-0">
          {journey.map(({ step, title, description, icon: Icon }, index) => (
            <li key={step} className="relative flex gap-4 lg:flex-col lg:gap-5 lg:pt-8">
              <span
                aria-hidden="true"
                className={cn(
                  "ring-navy absolute top-5 -left-[2.05rem] z-10 size-2.5 rounded-full ring-4 lg:-top-[0.35rem] lg:left-0",
                  index === 0 ? "bg-brand-red" : "bg-brand-blue-muted",
                )}
              />
              <span className="text-brand-blue-muted/25 hidden text-5xl leading-none font-bold lg:block">
                {step}
              </span>
              <span className="text-brand-blue-muted flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <div>
                <span className="text-brand-blue-muted text-xs font-bold tracking-widest lg:hidden">
                  {step}
                </span>
                <h3 className="font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {description}
                </p>
              </div>
              {index < journey.length - 1 && (
                <ArrowRight
                  aria-hidden="true"
                  className="text-brand-blue-muted/45 absolute top-16 -right-3 hidden size-4 lg:block"
                />
              )}
            </li>
          ))}
        </ol>
      </Section>

      <Section aria-labelledby="advantages-heading" className="py-14 md:py-16 xl:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.78fr_0.9fr_0.82fr] lg:items-center lg:gap-10">
          <div>
            <SectionHeading
              id="advantages-heading"
              eyebrow="Why Miracle International"
              title={
                <>
                  A Partner Built
                  <br />
                  Around Your Progress
                </>
              }
              description="We connect practical guidance, people, sourcing and technology around the wider needs of a business, from its first decisions to its next opportunity."
            />
            <Button asChild variant="outline" size="xl" className="mt-7">
              <Link href={ROUTES.public.contact}>
                Talk to Our Team
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <div className="relative mx-auto w-full max-w-md pb-10">
            <Photo
              image={SITE_MEDIA.businessSolutions.partnership}
              sizes="(min-width: 1024px) 32vw, 80vw"
              className="aspect-[0.9]"
            />
            <div className="border-border/70 shadow-lift absolute right-4 bottom-0 left-4 rounded-2xl border bg-white p-4">
              <div className="text-brand-blue-dark flex items-center justify-between gap-2 text-center text-xs font-bold sm:text-sm">
                <span>People</span>
                <span className="bg-brand-red size-1.5 rounded-full" />
                <span>Plans</span>
                <span className="bg-brand-red size-1.5 rounded-full" />
                <span>Progress</span>
              </div>
            </div>
          </div>
          <ul className="border-brand-blue/15 border-t">
            {advantages.map(({ title, description, icon: Icon }) => (
              <li
                key={title}
                className="group border-brand-blue/15 hover:border-brand-blue/40 flex gap-4 border-b py-4 transition-colors"
              >
                <span className="bg-brand-blue-light text-brand-blue group-hover:bg-brand-blue-muted flex size-10 shrink-0 items-center justify-center rounded-full transition-colors">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <h3 className="text-ink font-bold">{title}</h3>
                  <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section
        aria-labelledby="ecosystem-heading"
        className="bg-brand-blue-light/35 py-14 md:py-16 xl:py-20"
      >
        <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-35" />
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              id="ecosystem-heading"
              eyebrow="Connected Business Support"
              title={
                <>
                  One Business.
                  <br />
                  Connected Solutions.
                </>
              }
              description="A business rarely has one isolated need. Planning, suppliers, technology and operations influence each other, so the support should connect too."
            />
            <p className="border-brand-red text-brand-blue-dark mt-7 border-l-2 pl-4 text-sm font-semibold">
              One coordinated view of the work ahead.
            </p>
          </div>
          <div className="relative">
            <div className="lg:hidden">
              <div className="bg-brand-blue shadow-soft flex items-center gap-3 rounded-xl px-5 py-4 text-white">
                <Building2 aria-hidden="true" className="size-5" />
                <span className="text-sm font-bold tracking-wide">YOUR BUSINESS</span>
              </div>
              <ol className="border-brand-blue/25 ml-5 border-l pl-5">
                {ecosystem.map(({ title, icon: Icon }) => (
                  <li
                    key={title}
                    className="border-brand-blue/15 relative flex items-center gap-3 border-b py-3 last:border-b-0"
                  >
                    <span
                      aria-hidden="true"
                      className="bg-brand-blue absolute top-1/2 -left-[1.58rem] size-2 -translate-y-1/2 rounded-full"
                    />
                    <span className="bg-brand-blue-light text-brand-blue flex size-9 items-center justify-center rounded-lg">
                      <Icon aria-hidden="true" className="size-4" />
                    </span>
                    <span className="text-ink text-sm font-bold">{title}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="relative hidden h-[27rem] lg:block">
              <div
                aria-hidden="true"
                className="bg-brand-blue/15 absolute inset-[20%] rounded-full blur-3xl"
              />
              <div
                aria-hidden="true"
                className="border-brand-blue/20 absolute inset-[13%_17%] rounded-full border"
              />
              <div
                aria-hidden="true"
                className="bg-brand-blue/20 absolute top-1/2 right-[12%] left-[12%] h-px"
              />
              <div
                aria-hidden="true"
                className="bg-brand-blue/20 absolute top-[12%] bottom-[12%] left-1/2 w-px"
              />
              {ecosystem.map(({ title, icon: Icon, position }) => (
                <div
                  key={title}
                  className={cn(
                    "border-border/70 shadow-soft absolute z-10 flex w-40 items-center gap-2 rounded-full border bg-white px-3 py-3 xl:w-44",
                    position,
                  )}
                >
                  <span className="bg-brand-blue-light text-brand-blue flex size-8 shrink-0 items-center justify-center rounded-full">
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  <span className="text-ink text-xs font-bold xl:text-sm">{title}</span>
                </div>
              ))}
              <div className="bg-brand-blue shadow-lift absolute top-1/2 left-1/2 z-20 flex size-40 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-4 border-white text-center text-white">
                <Building2 aria-hidden="true" className="size-7" />
                <span className="mt-2 text-sm font-bold tracking-wide">
                  YOUR
                  <br />
                  BUSINESS
                </span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section aria-labelledby="outcomes-heading" className="py-14 md:py-16 xl:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <SectionHeading
            id="outcomes-heading"
            eyebrow="Business Outcomes"
            title={
              <>
                What Stronger Business Support
                <br />
                Can Help You Achieve
              </>
            }
            description="The aim is a business that is easier to plan, coordinate, operate and prepare for its next stage."
          />
          <ul className="grid gap-x-8 sm:grid-cols-2">
            {businessOutcomes.map((title) => (
              <li
                key={title}
                className="group border-brand-blue/15 flex items-center gap-4 border-b py-5"
              >
                <span className="bg-brand-blue-light text-brand-blue group-hover:bg-brand-blue-muted flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors">
                  <Check aria-hidden="true" className="size-4" />
                </span>
                <span className="text-ink text-sm font-semibold sm:text-base">
                  {title}
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="text-brand-blue/40 ml-auto size-4 shrink-0"
                />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <section aria-labelledby="business-cta-heading" className="pt-4 pb-16 md:pb-20">
        <div className="container-page">
          <div className="from-brand-blue to-brand-blue-dark shadow-lift relative isolate overflow-hidden rounded-3xl bg-gradient-to-br text-white">
            <div aria-hidden="true" className="bg-grid-inverse absolute inset-0 -z-20" />
            <div
              aria-hidden="true"
              className="bg-brand-blue-muted/20 absolute -bottom-32 left-1/3 -z-10 size-96 rounded-full blur-3xl"
            />
            <div
              aria-hidden="true"
              className="bg-brand-red absolute top-0 left-10 h-1 w-24 rounded-b-full"
            />
            <div className="grid lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
              <div className="px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
                <Eyebrow tone="inverse">Ready to Move Forward?</Eyebrow>
                <h2
                  id="business-cta-heading"
                  className="mt-5 max-w-xl text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl"
                >
                  Let&apos;s Turn Your Business
                  <br />
                  Plans Into Practical Progress
                </h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                  Tell us where your business is today and what you want to achieve next.
                  Our team will help identify the most practical way forward.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild variant="accent" size="xl">
                    <Link href={ROUTES.public.contact}>
                      Talk to Our Team
                      <ArrowRight data-icon="inline-end" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline-inverse" size="xl">
                    <Link href={ROUTES.public.tellUsWhatYouNeed}>
                      Request a Consultation
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative min-h-72 overflow-hidden border-t border-white/10 lg:min-h-full lg:border-t-0 lg:border-l">
                <Image
                  src={SITE_MEDIA.businessSolutions.cta.src}
                  alt={SITE_MEDIA.businessSolutions.cta.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="from-brand-blue-dark/70 via-brand-blue-dark/10 absolute inset-0 bg-gradient-to-r to-transparent"
                />
                <div className="text-ink shadow-lift absolute right-5 bottom-5 left-5 rounded-2xl border border-white/70 bg-white p-5 sm:right-8 sm:bottom-8 sm:left-auto sm:w-64">
                  <p className="text-brand-blue text-sm font-bold">YOUR GOALS</p>
                  <p className="mt-1 text-sm font-bold">OUR SUPPORT</p>
                  <p className="mt-1 flex items-center gap-2 text-sm font-bold">
                    <span className="bg-brand-red size-2 rounded-full" />
                    PRACTICAL PROGRESS
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
