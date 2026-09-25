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
import { CtaBanner } from "@/components/common/cta-banner";
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
type Service = IconItem & { image: SiteImage; href: string };

const services: readonly Service[] = [
  {
    title: "Start a Business",
    description:
      "Move from an early idea to practical business preparation. We help you examine the opportunity, clarify priorities and shape a more organized path toward launch.",
    icon: Lightbulb,
    image: SITE_MEDIA.businessSolutions.startBusiness,
    href: ROUTES.public.businessStart,
  },
  {
    title: "Business Consultation",
    description:
      "Work through a business challenge or opportunity with focused, practical advice. Consultation helps turn an uncertain situation into priorities and next steps your team can act on.",
    icon: Handshake,
    image: SITE_MEDIA.businessSolutions.businessConsultation,
    href: ROUTES.public.businessConsultation,
  },
  {
    title: "Business Planning",
    description:
      "A useful business plan connects the market opportunity to the work needed to deliver it. We bring goals, operations and resources into a coherent direction.",
    icon: ClipboardList,
    image: SITE_MEDIA.businessSolutions.businessPlanning,
    href: ROUTES.public.businessPlanning,
  },
  {
    title: "Business Setup Support",
    description:
      "Turning a plan into operations takes coordination. We help connect requirements, people, suppliers and systems so the business can move toward launch with more confidence.",
    icon: Settings2,
    image: SITE_MEDIA.businessSolutions.businessSetup,
    href: ROUTES.public.businessSetup,
  },
  {
    title: "Business Expansion",
    description:
      "Growth creates new demands on capacity, systems and relationships. We help assess what needs to become stronger before you move into a new market, capability or opportunity.",
    icon: TrendingUp,
    image: SITE_MEDIA.businessSolutions.businessExpansion,
    href: ROUTES.public.businessExpansion,
  },
  {
    title: "Machinery & Equipment",
    description:
      "The right machinery starts with the operation it needs to serve. We help define requirements, compare suitable options and coordinate sourcing and implementation considerations.",
    icon: Package,
    image: SITE_MEDIA.businessSolutions.machineryEquipment,
    href: ROUTES.public.businessMachinery,
  },
  {
    title: "Business Technology",
    description:
      "Technology has the most value when it improves how people work. We help connect business needs to useful systems, clearer information and more efficient workflows.",
    icon: CodeXml,
    image: SITE_MEDIA.businessSolutions.businessTechnology,
    href: ROUTES.public.businessTechnology,
  },
  {
    title: "Business Support",
    description:
      "Business needs do not stop at launch. We provide practical assistance as operations change, questions arise and new opportunities call for a fresh response.",
    icon: Headphones,
    image: SITE_MEDIA.businessSolutions.businessSupport,
    href: ROUTES.public.businessSupport,
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

export default function Page() {
  return (
    <main>
      <section
        aria-labelledby="business-solutions-hero-heading"
        className="relative isolate overflow-hidden border-b bg-white/50"
      >
        <div aria-hidden="true" className="bg-grid absolute inset-0 -z-20 opacity-40" />
        <div
          aria-hidden="true"
          className="bg-brand-blue/10 absolute -top-32 right-0 -z-10 size-[34rem] rounded-full blur-3xl"
        />
        <div className="container-page grid gap-10 py-12 md:py-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16 lg:py-20">
          <div className="max-w-2xl">
            <Breadcrumb items={[{ label: TITLE }]} />
            <div className="mt-6">
              <Eyebrow>Business Solutions</Eyebrow>
            </div>
            <h1
              id="business-solutions-hero-heading"
              className="text-ink mt-5 max-w-3xl text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl"
            >
              Build Smarter. <span className="text-brand-blue">Grow Stronger.</span>
            </h1>
            <p className="text-muted-foreground mt-5 max-w-xl text-base leading-relaxed sm:text-lg">
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
              <Button asChild variant="outline" size="xl">
                <a href="#solutions">Explore Our Solutions</a>
              </Button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-2xl pb-8 sm:pl-8">
            <div className="shadow-lift relative aspect-[4/3] overflow-hidden rounded-3xl border border-white">
              <Image
                src={SITE_MEDIA.businessSolutions.hero.src}
                alt={SITE_MEDIA.businessSolutions.hero.alt}
                fill
                preload
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="from-navy/35 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
              />
            </div>
            <div className="shadow-lift absolute right-4 bottom-0 left-4 flex items-center justify-between rounded-2xl border bg-white px-5 py-4 sm:right-0 sm:left-0">
              <span className="text-ink text-sm font-bold">Idea</span>
              <ArrowRight aria-hidden="true" className="text-brand-blue/50 size-4" />
              <span className="text-ink text-sm font-bold">Plan</span>
              <ArrowRight aria-hidden="true" className="text-brand-blue/50 size-4" />
              <span className="text-brand-blue text-sm font-bold">Growth</span>
            </div>
          </div>
        </div>
      </section>

      <Section
        aria-labelledby="business-overview-heading"
        containerClassName="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16"
      >
        <SectionHeading
          id="business-overview-heading"
          eyebrow="About Business Solutions"
          title="Practical Support for Every Stage of Business"
          description="Miracle International supports businesses from initial planning and setup through sourcing, technology, operations and growth. We connect the right services around the challenge in front of you."
        />
        <div className="relative pb-8">
          <div className="shadow-lift relative aspect-[3/2] overflow-hidden rounded-3xl border border-white">
            <Image
              src={SITE_MEDIA.businessSolutions.overview.src}
              alt={SITE_MEDIA.businessSolutions.overview.alt}
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="from-navy/25 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
            />
          </div>
          <div className="shadow-soft relative mx-4 -mt-8 grid overflow-hidden rounded-2xl border bg-white sm:grid-cols-2">
            {overviewValues.map(({ title, description, icon: Icon }, index) => (
              <div
                key={title}
                className={cn(
                  "flex gap-3 p-4",
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
        </div>
      </Section>

      <Section
        id="solutions"
        aria-labelledby="business-services-heading"
        className="bg-brand-blue-light/25 scroll-mt-24"
      >
        <SectionHeading
          id="business-services-heading"
          align="center"
          eyebrow="Explore Business Solutions"
          title="Find the Support for Your Next Move"
          description="Eight connected services support the business journey from the first idea through daily operations and expansion."
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {services.map((service, index) => (
            <li
              key={service.title}
              className="group/card shadow-soft hover:shadow-lift flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition-shadow"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={service.image.src}
                  alt={service.image.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 motion-safe:group-hover/card:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="from-navy/60 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
                />
                <span className="absolute top-4 left-4 text-xs font-bold tracking-[0.16em] text-white/85">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-brand-blue shadow-soft absolute right-4 bottom-4 flex size-11 items-center justify-center rounded-xl bg-white/95">
                  <service.icon aria-hidden="true" className="size-5" />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-ink text-lg font-bold">{service.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="group/link text-brand-blue hover:text-brand-blue-dark mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold"
                >
                  Learn More
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover/link:translate-x-1"
                  />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="journey" tone="navy" aria-labelledby="business-journey-heading">
        <div
          aria-hidden="true"
          className="bg-grid-inverse absolute inset-0 -z-20 opacity-75"
        />
        <SectionHeading
          id="business-journey-heading"
          eyebrow="The Business Journey"
          title="A Clearer Path From Idea to Expansion"
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
            </li>
          ))}
        </ol>
      </Section>

      <Section
        aria-labelledby="business-advantages-heading"
        containerClassName="grid gap-12 lg:grid-cols-[0.82fr_0.9fr_0.82fr] lg:items-center lg:gap-10"
      >
        <div>
          <SectionHeading
            id="business-advantages-heading"
            eyebrow="Why Miracle International"
            title="A Partner Built Around Your Progress"
            description="We connect practical guidance, people, sourcing and technology around the wider needs of a business."
          />
          <Button asChild variant="outline" size="xl" className="mt-7">
            <Link href={ROUTES.public.contact}>
              Talk to Our Team
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <div className="shadow-lift relative aspect-[4/5] overflow-hidden rounded-3xl">
          <Image
            src={SITE_MEDIA.businessSolutions.partnership.src}
            alt={SITE_MEDIA.businessSolutions.partnership.alt}
            fill
            sizes="(min-width: 1024px) 32vw, 90vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="from-navy/35 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
          />
        </div>
        <ul className="border-brand-blue/15 border-t">
          {advantages.map(({ title, description, icon: Icon }) => (
            <li key={title} className="border-brand-blue/15 flex gap-4 border-b py-4">
              <span className="bg-brand-blue-light text-brand-blue flex size-10 shrink-0 items-center justify-center rounded-full">
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
      </Section>

      <Section
        aria-labelledby="business-outcomes-heading"
        className="bg-brand-blue-light/25"
      >
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            id="business-outcomes-heading"
            eyebrow="Business Outcomes"
            title="What Stronger Business Support Can Help You Achieve"
            description="The aim is a business that is easier to plan, coordinate, operate and prepare for its next stage."
          />
          <ul className="grid gap-x-8 sm:grid-cols-2">
            {businessOutcomes.map((title) => (
              <li
                key={title}
                className="border-brand-blue/15 flex items-center gap-4 border-b py-5"
              >
                <span className="text-brand-blue shadow-soft flex size-9 shrink-0 items-center justify-center rounded-lg bg-white">
                  <Check aria-hidden="true" className="size-4" />
                </span>
                <span className="text-ink text-sm font-semibold sm:text-base">
                  {title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBanner
        eyebrow="Ready to Move Forward?"
        title="Let's Turn Your Business Plans Into Practical Progress"
        description="Tell us where your business is today and what you want to achieve next. Our team will help identify the most practical way forward."
        primary={{ label: "Talk to Our Team", href: ROUTES.public.contact }}
        secondary={{
          label: "Request a Consultation",
          href: ROUTES.public.tellUsWhatYouNeed,
        }}
        headingId="business-cta-heading"
      />
    </main>
  );
}
