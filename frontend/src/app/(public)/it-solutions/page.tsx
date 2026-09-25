import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Check,
  Code2,
  Compass,
  Eye,
  Gauge,
  Globe2,
  Handshake,
  Headphones,
  Layers3,
  Lightbulb,
  MonitorCog,
  Network,
  SearchCheck,
  Settings2,
  Sparkles,
  Target,
  Workflow,
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
import { cn } from "@/lib/utils";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "IT Solutions";
const DESCRIPTION =
  "Modern IT solutions designed to streamline operations, improve efficiency and support long-term growth.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.itSolutions,
  image: SITE_MEDIA.itSolutions.hero,
});

type IconItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const heroValues: IconItem[] = [
  {
    title: "Practical Solutions",
    description: "For real business needs",
    icon: Target,
  },
  {
    title: "End-to-End Support",
    description: "From planning to implementation",
    icon: Workflow,
  },
  {
    title: "Long-Term Partnership",
    description: "With ongoing assistance",
    icon: Handshake,
  },
];

const overviewBenefits: IconItem[] = [
  {
    title: "Business-Focused Technology",
    description: "Technology decisions shaped around real operating goals.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Custom Solutions",
    description: "Systems designed for your workflows and priorities.",
    icon: Settings2,
  },
  {
    title: "Reliable Support & Maintenance",
    description: "Practical assistance through launch and ongoing use.",
    icon: Headphones,
  },
  {
    title: "Scalable for Future Growth",
    description: "A stronger foundation for changing business needs.",
    icon: ChartNoAxesCombined,
  },
];

const services: (IconItem & { href: string; image: SiteImage })[] = [
  {
    title: "Website Development",
    description:
      "Modern websites built around credibility, performance and business goals.",
    icon: Globe2,
    href: ROUTES.public.websiteDevelopment,
    image: SITE_MEDIA.itSolutions.websiteDevelopment,
  },
  {
    title: "Software Development",
    description:
      "Custom software designed for real workflows, users and operational needs.",
    icon: Code2,
    href: ROUTES.public.softwareDevelopment,
    image: SITE_MEDIA.itSolutions.softwareDevelopment,
  },
  {
    title: "POS Systems",
    description:
      "Reliable sales, stock and reporting systems for everyday business operations.",
    icon: MonitorCog,
    href: ROUTES.public.posSystemDevelopment,
    image: SITE_MEDIA.itSolutions.posSystem,
  },
  {
    title: "Business Management Systems",
    description:
      "Connected systems that bring operations, people and information together.",
    icon: Network,
    href: ROUTES.public.businessManagementSystems,
    image: SITE_MEDIA.itSolutions.businessManagementSystems,
  },
  {
    title: "Digital Solutions",
    description:
      "Practical digital tools that make work easier and customer experiences stronger.",
    icon: Layers3,
    href: ROUTES.public.digitalSolutions,
    image: SITE_MEDIA.itSolutions.digitalSolutions,
  },
  {
    title: "IT Consulting",
    description: "Clear technology guidance aligned with your business priorities.",
    icon: Compass,
    href: ROUTES.public.itConsulting,
    image: SITE_MEDIA.itSolutions.itConsulting,
  },
  {
    title: "Business Automation",
    description: "Smarter workflows that reduce repetitive work and improve consistency.",
    icon: Bot,
    href: ROUTES.public.businessAutomation,
    image: SITE_MEDIA.itSolutions.businessAutomation,
  },
];

const process: IconItem[] = [
  {
    title: "Understand Your Needs",
    description: "Learn how your business works and where technology can help.",
    icon: SearchCheck,
  },
  {
    title: "Plan the Solution",
    description: "Define the right scope, priorities and practical direction.",
    icon: Compass,
  },
  {
    title: "Design & Develop",
    description: "Shape and build the solution in focused, reviewable stages.",
    icon: Code2,
  },
  {
    title: "Implement",
    description: "Introduce the system with a clear and supported transition.",
    icon: Settings2,
  },
  {
    title: "Support & Improve",
    description: "Keep the solution useful as your business and needs evolve.",
    icon: Headphones,
  },
];

const reasons: IconItem[] = [
  {
    title: "Business-First Approach",
    description: "Solutions designed around your goals",
    icon: Target,
  },
  {
    title: "End-to-End Expertise",
    description: "From planning to ongoing support",
    icon: Workflow,
  },
  {
    title: "Reliable & Transparent",
    description: "Clear communication at every step",
    icon: Eye,
  },
  {
    title: "Long-Term Partnership",
    description: "We grow with your business",
    icon: Handshake,
  },
];

const impactBenefits = [
  {
    title: "Streamlined Operations",
    icon: Gauge,
    position: "left-3 top-3 sm:-left-6 sm:top-10",
  },
  {
    title: "Better Management Visibility",
    icon: Eye,
    position: "right-3 top-3 sm:-right-6 sm:top-16",
  },
  {
    title: "Connected Teams & Systems",
    icon: Network,
    position: "bottom-3 left-3 sm:-left-6 sm:bottom-12",
  },
  {
    title: "More Room for Sustainable Growth",
    icon: ChartNoAxesCombined,
    position: "right-3 bottom-3 sm:-right-6 sm:bottom-9",
  },
] as const;

const businessBenefits = [
  { title: "More efficient operations", icon: Gauge },
  { title: "Improved data visibility", icon: Eye },
  { title: "Better customer experience", icon: Sparkles },
  { title: "Connected systems and teams", icon: Network },
  { title: "Reduced manual work", icon: Bot },
  { title: "A stronger foundation for growth", icon: ChartNoAxesCombined },
] as const;

export default function Page() {
  return (
    <main>
      <section
        aria-labelledby="it-solutions-hero-heading"
        className="text-ink relative isolate overflow-hidden bg-white/50"
      >
        <div aria-hidden="true" className="bg-grid absolute inset-0 -z-20 opacity-45" />
        <div
          aria-hidden="true"
          className="bg-brand-blue/10 absolute -top-36 right-[5%] -z-20 size-[32rem] rounded-full blur-3xl"
        />
        <div
          aria-hidden="true"
          className="via-brand-blue/20 absolute bottom-0 left-[12%] -z-20 h-px w-2/3 bg-gradient-to-r from-transparent to-transparent"
        />

        <div className="container-page grid gap-12 pt-12 pb-10 md:pt-16 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-16 lg:pt-20 lg:pb-14">
          <div className="max-w-2xl">
            <Breadcrumb items={[{ label: TITLE }]} />
            <div className="mt-9">
              <Eyebrow>IT Solutions</Eyebrow>
            </div>
            <h1
              id="it-solutions-hero-heading"
              className="mt-5 text-4xl leading-[1.03] font-bold tracking-tight sm:text-5xl lg:text-[4rem]"
            >
              Technology
              <br />
              That Moves
              <br />
              <span className="text-brand-blue">Your Business Forward</span>
            </h1>
            <p className="text-muted-foreground mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
              {DESCRIPTION}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="accent" size="xl">
                <a href="#services">
                  Explore Our IT Solutions
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="xl"
                className="border-brand-blue/20 text-ink hover:border-brand-blue/50 hover:bg-brand-blue-light/50 bg-white/80"
              >
                <Link href={ROUTES.public.contact}>Talk to Our Team</Link>
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[42rem] px-2 pt-5 pb-16 sm:px-8 sm:pb-20">
            <div
              aria-hidden="true"
              className="bg-brand-blue/15 absolute inset-14 rounded-full blur-3xl"
            />
            <div className="bg-brand-blue-light border-brand-blue/10 relative ml-auto aspect-[1.16] w-[88%] overflow-hidden rounded-[1.75rem] border shadow-[0_30px_80px_-30px_rgb(17_80_168_/_0.3)]">
              <Image
                src={SITE_MEDIA.itSolutions.hero.src}
                alt={SITE_MEDIA.itSolutions.hero.alt}
                fill
                preload
                sizes="(min-width: 1280px) 620px, (min-width: 1024px) 50vw, 90vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="from-navy/40 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
              />
            </div>
            <div className="shadow-lift absolute bottom-0 left-0 w-[43%] overflow-hidden rounded-2xl border-4 border-white bg-white sm:left-2">
              <div className="relative aspect-[1.35]">
                <Image
                  src={SITE_MEDIA.itSolutions.heroInset.src}
                  alt={SITE_MEDIA.itSolutions.heroInset.alt}
                  fill
                  sizes="(min-width: 1024px) 260px, 42vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="text-ink shadow-soft border-brand-blue/15 absolute right-0 bottom-8 rounded-xl border bg-white px-4 py-3 sm:right-3 sm:bottom-11 sm:px-5">
              <p className="text-brand-blue text-xs font-bold sm:text-sm">
                Modern Technology
              </p>
              <p className="mt-0.5 text-xs font-semibold sm:text-sm">Real Results</p>
            </div>
            <div className="text-navy shadow-soft border-brand-blue/15 absolute top-0 left-0 rounded-xl border bg-white/95 px-4 py-3 text-xs font-bold tracking-wide sm:left-3 sm:text-sm">
              <span className="bg-brand-red mr-2 inline-block size-2 rounded-full" />
              Build · Automate · Scale
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
            eyebrow="About Our IT Solutions"
            title="Digital Solutions for a More Efficient, Connected Business"
            description="We design practical, scalable technology around the way your business works. From customer-facing experiences to the systems behind daily operations, every solution starts with a clear business need."
          />
          <Button asChild variant="outline" size="xl" className="mt-7">
            <a href="#how-we-work">
              Learn More About Our Approach
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </a>
          </Button>
        </div>

        <div className="relative pb-8 sm:pl-8">
          <div className="shadow-soft relative aspect-[1.55] overflow-hidden rounded-3xl border border-white bg-white">
            <Image
              src={SITE_MEDIA.itSolutions.overview.src}
              alt={SITE_MEDIA.itSolutions.overview.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 90vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="from-navy/20 absolute inset-0 bg-gradient-to-r via-transparent to-transparent"
            />
          </div>
          <div className="border-border/75 shadow-lift relative -mt-10 ml-4 grid overflow-hidden rounded-2xl border bg-white sm:ml-0 sm:w-[92%] sm:grid-cols-2">
            {overviewBenefits.map(({ title, description, icon: Icon }, index) => (
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
            <p className="mt-2 max-w-32 text-xs leading-relaxed font-semibold">
              Technology with a clear business purpose
            </p>
          </div>
        </div>
      </Section>

      <Section
        id="services"
        aria-labelledby="services-heading"
        className="bg-brand-blue-light/30"
      >
        <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-35" />
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="services-heading"
            eyebrow="Our Services"
            title="Comprehensive IT Solutions to Support Your Business"
            description="Choose a specialist service or bring us the wider challenge. Our team connects the right technology around your requirement."
          />
          <p className="border-brand-red text-brand-blue-dark max-w-xs border-l-2 pl-4 text-sm leading-relaxed font-semibold">
            Seven focused services. One connected technology partner.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-5">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="group border-border/80 shadow-soft hover:border-brand-blue/30 hover:shadow-lift relative flex w-full min-w-0 flex-none flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-300 motion-safe:hover:-translate-y-1 md:w-[calc(50%-0.625rem)] xl:w-[calc(25%-0.9375rem)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={service.image.src}
                  alt={service.image.alt}
                  fill
                  sizes="(min-width: 1280px) 300px, (min-width: 768px) 50vw, 90vw"
                  className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.035]"
                />
                <div
                  aria-hidden="true"
                  className="from-navy/60 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
                />
                <span className="text-brand-blue shadow-soft absolute right-4 bottom-4 flex size-11 items-center justify-center rounded-xl border border-white/60 bg-white/95">
                  <service.icon aria-hidden="true" className="size-5" />
                </span>
                <span className="absolute top-4 left-4 text-xs font-bold tracking-[0.16em] text-white/80">
                  0{index + 1}
                </span>
              </div>
              <div className="flex min-h-56 flex-1 flex-col p-5">
                <h3 className="text-ink text-lg font-bold">
                  <Link href={service.href} className="after:absolute after:inset-0">
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
                    className="size-4 transition-transform motion-safe:group-hover:translate-x-1"
                  />
                </span>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="how-we-work" tone="navy" aria-labelledby="process-heading">
        <div
          aria-hidden="true"
          className="bg-grid-inverse absolute inset-0 -z-20 opacity-75"
        />
        <div
          aria-hidden="true"
          className="bg-brand-blue/20 absolute -right-28 bottom-0 -z-10 size-96 rounded-full blur-3xl"
        />
        <div className="grid gap-8 lg:grid-cols-[0.68fr_1.32fr] lg:items-end lg:gap-16">
          <SectionHeading
            id="process-heading"
            eyebrow="How We Work"
            title={
              <>
                A Clear Process
                <br />
                From Idea to Implementation
              </>
            }
            description="A focused process keeps the decisions visible, the solution practical and the work connected to your goals."
            tone="inverse"
          />
          <p className="max-w-lg border-l border-white/20 pl-5 text-sm leading-relaxed text-white/55">
            Each stage builds on the one before it, with clear communication and room to
            refine the direction as we learn.
          </p>
        </div>

        <ol className="border-brand-blue-muted/30 relative mt-12 grid gap-8 border-l pl-7 lg:mt-16 lg:grid-cols-5 lg:gap-5 lg:border-t lg:border-l-0 lg:pl-0">
          {process.map(({ title, description, icon: Icon }, index) => (
            <li key={title} className="relative flex gap-4 lg:flex-col lg:gap-5 lg:pt-8">
              <span
                aria-hidden="true"
                className={cn(
                  "ring-navy absolute top-5 -left-[2.05rem] z-10 size-2.5 rounded-full ring-4 lg:-top-[0.35rem] lg:left-0",
                  index === 0 ? "bg-brand-red" : "bg-brand-blue-muted",
                )}
              />
              <span className="text-brand-blue-muted/25 hidden text-5xl leading-none font-bold lg:block">
                0{index + 1}
              </span>
              <span className="text-brand-blue-muted flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <div>
                <span className="text-brand-blue-muted text-xs font-bold tracking-[0.16em] lg:hidden">
                  0{index + 1}
                </span>
                <h3 className="font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {description}
                </p>
              </div>
              {index < process.length - 1 ? (
                <ArrowRight
                  aria-hidden="true"
                  className="text-brand-blue-muted/45 absolute top-16 -right-3 hidden size-4 lg:block"
                />
              ) : null}
            </li>
          ))}
        </ol>
      </Section>

      <Section aria-labelledby="why-heading" tone="default">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_0.9fr_0.8fr] lg:items-center lg:gap-10">
          <div>
            <SectionHeading
              id="why-heading"
              eyebrow="Why Choose Miracle International"
              title={
                <>
                  More Than Technology.
                  <br />A Partner for Your Growth.
                </>
              }
              description="We connect technology decisions to the wider business, helping you choose and build solutions that are useful today and adaptable tomorrow."
            />
            <Button asChild variant="outline" size="xl" className="mt-7">
              <Link href={ROUTES.public.contact}>
                Talk to Our Team
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <div className="relative mx-auto w-full max-w-md pb-10">
            <div className="shadow-lift relative aspect-[0.9] overflow-hidden rounded-3xl">
              <Image
                src={SITE_MEDIA.itSolutions.partnership.src}
                alt={SITE_MEDIA.itSolutions.partnership.alt}
                fill
                sizes="(min-width: 1024px) 32vw, 80vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="from-navy/45 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
              />
            </div>
            <div className="border-border/70 shadow-lift absolute right-4 bottom-0 left-4 rounded-2xl border bg-white p-4">
              <div className="text-brand-blue-dark flex items-center justify-between gap-2 text-center text-xs font-bold sm:text-sm">
                <span>Technology</span>
                <span className="bg-brand-red size-1.5 rounded-full" />
                <span>People</span>
                <span className="bg-brand-red size-1.5 rounded-full" />
                <span>Better Business</span>
              </div>
            </div>
          </div>

          <ul className="border-brand-blue/15 border-t">
            {reasons.map(({ title, description, icon: Icon }) => (
              <li
                key={title}
                className="group border-brand-blue/15 hover:border-brand-blue/40 flex gap-4 border-b py-5 transition-colors"
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

      <Section tone="navy" aria-labelledby="impact-heading">
        <div
          aria-hidden="true"
          className="bg-grid-inverse absolute inset-0 -z-20 opacity-65"
        />
        <div
          aria-hidden="true"
          className="bg-brand-blue/20 absolute top-1/4 left-1/2 -z-10 size-[34rem] -translate-x-1/2 rounded-full blur-3xl"
        />
        <div className="grid gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-20">
          <div>
            <SectionHeading
              id="impact-heading"
              eyebrow="Business Impact"
              title={
                <>
                  Better Systems.
                  <br />
                  Better Decisions.
                  <br />
                  Better Growth.
                </>
              }
              description="Connected technology helps teams work with less friction, gives management a clearer view of the business and creates a stronger foundation for sustainable growth."
              tone="inverse"
            />
            <Button asChild variant="outline-inverse" size="xl" className="mt-7">
              <a href="#services">
                Explore IT Solutions
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </a>
            </Button>
          </div>

          <div className="relative mx-auto w-full max-w-2xl px-2 py-4 sm:px-10 sm:py-14">
            <div className="relative aspect-[1.5] overflow-hidden rounded-3xl border border-white/15 shadow-2xl">
              <Image
                src={SITE_MEDIA.itSolutions.impact.src}
                alt={SITE_MEDIA.itSolutions.impact.alt}
                fill
                sizes="(min-width: 1024px) 54vw, 90vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="from-navy/45 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
              />
            </div>
            {impactBenefits.map(({ title, icon: Icon, position }) => (
              <div
                key={title}
                className={cn(
                  "text-ink shadow-lift absolute flex max-w-[46%] items-center gap-2 rounded-xl border border-white/70 bg-white px-3 py-3 sm:max-w-52 sm:gap-3 sm:px-4",
                  position,
                )}
              >
                <span className="bg-brand-blue-light text-brand-blue flex size-8 shrink-0 items-center justify-center rounded-lg">
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                <span className="text-[0.7rem] leading-snug font-bold sm:text-xs">
                  {title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section aria-labelledby="benefits-heading" tone="default">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <SectionHeading
            id="benefits-heading"
            eyebrow="What You Can Achieve"
            title={
              <>
                Real Benefits
                <br />
                for Your Business
              </>
            }
            description="The value of technology is visible in clearer work, better information and a business that is easier to manage and grow."
          />
          <ul className="grid gap-x-8 sm:grid-cols-2">
            {businessBenefits.map(({ title, icon: Icon }) => (
              <li
                key={title}
                className="group border-brand-blue/15 flex items-center gap-4 border-b py-5"
              >
                <span className="bg-brand-blue-light text-brand-blue group-hover:bg-brand-blue-muted flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors">
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                <span className="text-ink text-sm font-semibold sm:text-base">
                  {title}
                </span>
                <Check aria-hidden="true" className="text-brand-blue/45 ml-auto size-4" />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <section aria-labelledby="it-cta-heading" className="pt-4 pb-16 md:pb-20">
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
                <Eyebrow tone="inverse">Ready to Get Started?</Eyebrow>
                <h2
                  id="it-cta-heading"
                  className="mt-5 max-w-xl text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl"
                >
                  Let&apos;s Build the Right
                  <br />
                  IT Solution for Your Business
                </h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                  Tell us what you want to achieve and our team will help you find the
                  most practical and effective way forward.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild variant="accent" size="xl">
                    <Link href={ROUTES.public.contact}>
                      Discuss Your IT Needs
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
                  src={SITE_MEDIA.itSolutions.cta.src}
                  alt={SITE_MEDIA.itSolutions.cta.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="from-brand-blue-dark/70 via-brand-blue-dark/10 absolute inset-0 bg-gradient-to-r to-transparent"
                />
                <div className="text-ink shadow-lift absolute right-5 bottom-5 left-5 rounded-2xl border border-white/70 bg-white p-5 sm:right-8 sm:bottom-8 sm:left-auto sm:w-64">
                  <p className="text-brand-blue text-sm font-bold">Your Ideas</p>
                  <p className="mt-1 text-sm font-bold">Our Technology</p>
                  <p className="mt-1 flex items-center gap-2 text-sm font-bold">
                    <span className="bg-brand-red size-2 rounded-full" />
                    Real Solutions
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
