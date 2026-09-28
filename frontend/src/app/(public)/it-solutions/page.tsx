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

import { CtaBanner } from "@/components/common/cta-banner";
import { Eyebrow } from "@/components/common/eyebrow";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA, type SiteImage } from "@/config/site-media";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";

import landingStyles from "../landing-surfaces.module.css";
import { AnimatedCircuitBackground } from "./animated-circuit-background";
import circuitStyles from "./animated-circuit-background.module.css";

const TITLE = "IT Solutions";
const DESCRIPTION =
  "Modern IT solutions designed to streamline operations, improve efficiency and support long-term growth.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.itSolutions,
  image: SITE_MEDIA.itSolutions.hero,
});

type IconItem = { title: string; description: string; icon: LucideIcon };
type Service = IconItem & { href: string; image: SiteImage };

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

const services: readonly Service[] = [
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

const process: (IconItem & { step: string })[] = [
  {
    step: "01",
    title: "Understand",
    description: "Learn how your business works and where technology can help.",
    icon: SearchCheck,
  },
  {
    step: "02",
    title: "Plan",
    description: "Define the right scope, priorities and practical direction.",
    icon: Compass,
  },
  {
    step: "03",
    title: "Design",
    description: "Shape the experience, workflows and technical foundation.",
    icon: Lightbulb,
  },
  {
    step: "04",
    title: "Build",
    description: "Develop the solution in focused, reviewable stages.",
    icon: Code2,
  },
  {
    step: "05",
    title: "Implement",
    description: "Introduce the system with a clear, supported transition.",
    icon: Settings2,
  },
  {
    step: "06",
    title: "Support",
    description: "Keep the solution useful as your business evolves.",
    icon: Headphones,
  },
];

const reasons: IconItem[] = [
  {
    title: "Business-First Approach",
    description: "Solutions designed around your goals.",
    icon: Target,
  },
  {
    title: "End-to-End Expertise",
    description: "From planning to ongoing support.",
    icon: Workflow,
  },
  {
    title: "Reliable & Transparent",
    description: "Clear communication at every step.",
    icon: Eye,
  },
  {
    title: "Long-Term Partnership",
    description: "Technology that can grow with your business.",
    icon: Handshake,
  },
];

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
    <main className={`${landingStyles.page} ${landingStyles.solutionPage}`}>
      <AnimatedCircuitBackground />
      <section
        aria-labelledby="it-solutions-hero-heading"
        className={`relative isolate overflow-hidden border-b border-slate-200/80 ${landingStyles.travelHero}`}
      >
        <div className="container-page flex flex-col items-center gap-5 pt-20 pb-16 text-center sm:pt-28 sm:pb-20 md:pt-36 md:pb-24">
          <Eyebrow className="rounded-full border border-white/80 bg-white/95 px-4 py-1.5 font-extrabold text-navy shadow-sm backdrop-blur-md">
            Technology Engineering &amp; Digital Solutions
          </Eyebrow>

          <h1
            id="it-solutions-hero-heading"
            className="text-ink max-w-3xl text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl md:text-6xl"
          >
            Technology That Moves{" "}
            <span className="via-brand-blue to-navy bg-gradient-to-r from-indigo-600 bg-clip-text text-transparent">
              Your Business Forward.
            </span>
          </h1>

          <p className="max-w-2xl text-base leading-relaxed font-medium text-slate-800 sm:text-lg [text-shadow:_0_1px_10px_rgba(255,255,255,0.9),_0_0_2px_rgba(255,255,255,0.8)]">
            {DESCRIPTION}
          </p>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button asChild variant="accent" size="xl" className="shadow-lift">
              <a href="#services">
                Explore Our IT Solutions
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="outline" size="xl" className="bg-white">
              <Link href={ROUTES.public.contact}>Talk to Our Tech Team</Link>
            </Button>
          </div>
        </div>
      </section>

      <Section
        aria-labelledby="it-overview-heading"
        containerClassName="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12"
      >
        <div>
          <SectionHeading
            id="it-overview-heading"
            eyebrow="About Our IT Solutions"
            title="Digital Solutions for a More Efficient, Connected Business"
            description="We design practical, scalable technology around the way your business works. From customer-facing experiences to the systems behind daily operations, every solution starts with a clear business need."
          />
          <Button asChild variant="outline" size="xl" className="mt-5">
            <a href="#how-we-work">
              Learn More About Our Approach
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </a>
          </Button>
        </div>
        <div className="relative">
          <div className="shadow-lift relative aspect-[3/2] overflow-hidden rounded-3xl border border-white">
            <Image
              src={SITE_MEDIA.itSolutions.overview.src}
              alt={SITE_MEDIA.itSolutions.overview.alt}
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="from-navy/25 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
            />
          </div>
          <div
            className={cn(
              "shadow-soft relative mx-4 -mt-8 grid overflow-hidden rounded-2xl border sm:grid-cols-2",
              circuitStyles.solidCard,
            )}
          >
            {overviewBenefits.map(({ title, description, icon: Icon }, index) => (
              <div
                key={title}
                className={cn(
                  "flex gap-3 p-3.5",
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
        id="services"
        aria-labelledby="it-services-heading"
        className="scroll-mt-24"
      >
        <SectionHeading
          id="it-services-heading"
          align="center"
          eyebrow="Our Services"
          title="Comprehensive IT Solutions to Support Your Business"
          description="Choose a specialist service or bring us the wider challenge. Our team connects the right technology around your requirement."
        />
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3">
          {services.map((service, index) => (
            <li
              key={service.title}
              className={cn(
                "group/card shadow-soft hover:shadow-lift flex h-full flex-col overflow-hidden rounded-2xl border transition-shadow",
                circuitStyles.solidCard,
                circuitStyles.serviceCard,
              )}
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

      <Section
        id="how-we-work"
        aria-labelledby="it-process-heading"
        className={landingStyles.lightProcess}
      >
        <SectionHeading
          id="it-process-heading"
          eyebrow="How We Work"
          title="A Clear Process From Idea to Implementation"
          description="A focused process keeps decisions visible, the solution practical and the work connected to your goals."
        />
        <ol className="border-brand-blue-muted/35 relative mt-8 grid gap-6 border-l pl-6 lg:mt-10 lg:grid-cols-6 lg:gap-4 lg:border-t lg:border-l-0 lg:pl-0">
          {process.map(({ step, title, description, icon: Icon }, index) => (
            <li key={step} className="relative flex gap-3.5 lg:flex-col lg:gap-3.5 lg:pt-5">
              <span
                aria-hidden="true"
                className={cn(
                  "ring-navy absolute top-4 -left-[1.8rem] z-10 size-2.5 rounded-full ring-4 lg:-top-[0.35rem] lg:left-0",
                  index === 0 ? "bg-brand-red" : "bg-brand-blue-muted",
                )}
              />
              <span className="text-brand-blue-muted/25 hidden text-4xl leading-none font-bold lg:block">
                {step}
              </span>
              <span className="text-brand-blue-muted flex size-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-xs">
                <Icon aria-hidden="true" className="size-4.5" />
              </span>
              <div>
                <span className="text-brand-blue-muted text-xs font-bold tracking-widest lg:hidden">
                  {step}
                </span>
                <h3 className="font-bold text-white text-base">{title}</h3>
                <p className="mt-1 text-xs sm:text-sm leading-relaxed text-white/60">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        aria-labelledby="it-why-heading"
        containerClassName="grid gap-8 lg:grid-cols-[0.85fr_0.9fr_0.85fr] lg:items-center lg:gap-8"
      >
        <div>
          <SectionHeading
            id="it-why-heading"
            eyebrow="Why Choose Miracle International"
            title="More Than Technology. A Partner for Your Growth."
            description="We connect technology decisions to the wider business, helping you choose and build solutions that are useful today and adaptable tomorrow."
          />
          <Button asChild variant="outline" size="xl" className="mt-5">
            <Link href={ROUTES.public.contact}>
              Talk to Our Team
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <div className="shadow-lift relative aspect-[4/4.2] overflow-hidden rounded-3xl">
          <Image
            src={SITE_MEDIA.itSolutions.partnership.src}
            alt={SITE_MEDIA.itSolutions.partnership.alt}
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
          {reasons.map(({ title, description, icon: Icon }) => (
            <li key={title} className="border-brand-blue/15 flex gap-3.5 border-b py-3">
              <span className="bg-brand-blue-light text-brand-blue flex size-9 shrink-0 items-center justify-center rounded-full">
                <Icon aria-hidden="true" className="size-4.5" />
              </span>
              <div>
                <h3 className="text-ink font-bold text-sm sm:text-base">{title}</h3>
                <p className="text-muted-foreground mt-0.5 text-xs sm:text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        aria-labelledby="it-benefits-heading"
        containerClassName="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12"
      >
        <div>
          <SectionHeading
            id="it-benefits-heading"
            eyebrow="Business Impact"
            title="Better Systems. Better Decisions. Better Growth."
            description="Connected technology helps teams work with less friction, gives management a clearer view and creates a stronger foundation for sustainable growth."
          />
          <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
            {businessBenefits.map(({ title, icon: Icon }) => (
              <li
                key={title}
                className="border-brand-blue/15 flex items-center gap-3.5 border-b py-3 sm:py-3.5"
              >
                <span className="text-brand-blue shadow-soft flex size-8 shrink-0 items-center justify-center rounded-lg bg-white">
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                <span className="text-ink text-sm font-semibold sm:text-base">{title}</span>
                <Check aria-hidden="true" className="text-brand-blue/45 ml-auto size-4" />
              </li>
            ))}
          </ul>
        </div>
        <div className="shadow-lift relative aspect-[3/2] overflow-hidden rounded-3xl border border-white">
          <Image
            src={SITE_MEDIA.itSolutions.impact.src}
            alt={SITE_MEDIA.itSolutions.impact.alt}
            fill
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="from-navy/35 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
          />
        </div>
      </Section>

      <CtaBanner
        className={landingStyles.ctaSection}
        eyebrow="Ready to Get Started?"
        title="Let's Build the Right IT Solution for Your Business"
        description="Tell us what you want to achieve and our team will help you find the most practical and effective way forward."
        primary={{ label: "Discuss Your IT Needs", href: ROUTES.public.contact }}
        secondary={{
          label: "Request a Consultation",
          href: ROUTES.public.tellUsWhatYouNeed,
        }}
        headingId="it-cta-heading"
      />
    </main>
  );
}
