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

const TITLE = "Business Solutions";
const DESCRIPTION =
  "From business planning and setup to expansion, technology and ongoing support, we help turn ideas into sustainable businesses.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.businessSolutions,
  image: SITE_MEDIA.businessMeeting,
});

type IconItem = { title: string; description: string; icon: LucideIcon };

const solutions: (IconItem & { href: string; image: SiteImage })[] = [
  {
    title: "Start a Business",
    description: "Turn a promising idea into a clear, practical path to market.",
    icon: Lightbulb,
    href: ROUTES.public.tellUsWhatYouNeed,
    image: SITE_MEDIA.businessSolutions.startBusiness,
  },
  {
    title: "Business Consultation",
    description: "Make confident decisions with experienced, business-focused guidance.",
    icon: Handshake,
    href: ROUTES.public.itConsulting,
    image: SITE_MEDIA.handshake,
  },
  {
    title: "Business Planning",
    description: "Build a focused plan around your market, operations and growth goals.",
    icon: ClipboardList,
    href: ROUTES.public.tellUsWhatYouNeed,
    image: SITE_MEDIA.businessSolutions.businessPlanning,
  },
  {
    title: "Business Setup Support",
    description: "Get practical support through the details that turn plans into action.",
    icon: Settings2,
    href: ROUTES.public.contact,
    image: SITE_MEDIA.businessSolutions.businessSetup,
  },
  {
    title: "Business Expansion",
    description: "Find the people, systems and opportunities needed for the next stage.",
    icon: TrendingUp,
    href: ROUTES.public.tellUsWhatYouNeed,
    image: SITE_MEDIA.cityTowers,
  },
  {
    title: "Machinery & Equipment",
    description:
      "Source the equipment and operational tools that keep your business moving.",
    icon: Package,
    href: ROUTES.public.products,
    image: SITE_MEDIA.manufacturing,
  },
  {
    title: "Business Technology",
    description:
      "Use connected digital systems to improve operations, visibility and control.",
    icon: CodeXml,
    href: ROUTES.public.itSolutions,
    image: SITE_MEDIA.technology,
  },
  {
    title: "Business Support",
    description: "Keep momentum with a partner invested in your long-term progress.",
    icon: Headphones,
    href: ROUTES.public.contact,
    image: SITE_MEDIA.businessSolutions.businessSupport,
  },
];

const journey = [
  {
    step: "01",
    title: "Idea",
    description: "Clarify the opportunity and the problem worth solving.",
    icon: Lightbulb,
  },
  {
    step: "02",
    title: "Planning",
    description: "Shape the market, model, priorities and route forward.",
    icon: Compass,
  },
  {
    step: "03",
    title: "Setup",
    description: "Put the right structure, resources and systems in place.",
    icon: Building2,
  },
  {
    step: "04",
    title: "Launch",
    description: "Move into the market with focus and practical support.",
    icon: Rocket,
  },
  {
    step: "05",
    title: "Growth",
    description: "Improve the operation and build a stronger customer base.",
    icon: ChartColumn,
  },
  {
    step: "06",
    title: "Expansion",
    description: "Scale into new capabilities, markets and opportunities.",
    icon: Globe2,
  },
] satisfies (IconItem & { step: string })[];

const advantages: IconItem[] = [
  {
    title: "End-to-End Business Support",
    description: "One partner across planning, setup, operations and growth.",
    icon: Network,
  },
  {
    title: "Practical Business Guidance",
    description: "Clear recommendations grounded in your goals, resources and market.",
    icon: Compass,
  },
  {
    title: "Global Business Network",
    description:
      "Connections and opportunities that help ambitious businesses move further.",
    icon: Globe2,
  },
  {
    title: "Technology Integration",
    description: "Modern systems that make everyday work more visible and efficient.",
    icon: CodeXml,
  },
  {
    title: "Growth-Focused Solutions",
    description: "Every step is designed to create momentum, not unnecessary complexity.",
    icon: TrendingUp,
  },
  {
    title: "Long-Term Support",
    description: "A dependable relationship that continues after the first milestone.",
    icon: ShieldCheck,
  },
];

const outcomes = [
  "Streamlined operations",
  "Better management visibility",
  "Connected teams and systems",
  "More room for sustainable growth",
];

export default function Page() {
  return (
    <>
      <section
        aria-labelledby="business-solutions-hero-heading"
        className="relative isolate overflow-hidden border-b"
      >
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image
            src={SITE_MEDIA.businessMeeting.src}
            alt=""
            fill
            preload
            sizes="100vw"
            className="object-cover"
          />
          <div className="bg-brand-blue-dark/65 absolute inset-0" />
          <div className="from-brand-blue-dark/85 absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t to-transparent" />
        </div>

        <div className="container-page flex flex-col items-center gap-6 py-16 text-center md:py-20">
          <Breadcrumb items={[{ label: TITLE }]} tone="inverse" />
          <span className="border-brand-blue-muted/40 bg-white/10 text-brand-blue-muted inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold tracking-[0.18em] uppercase backdrop-blur-sm">
            <Building2 aria-hidden="true" className="size-3.5" />
            Business Solutions
          </span>
          <h1
            id="business-solutions-hero-heading"
            className="max-w-3xl text-4xl leading-[1.08] font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Build Smarter. Grow Stronger.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
            {DESCRIPTION}
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="accent" size="xl">
              <Link href={ROUTES.public.tellUsWhatYouNeed}>
                Start Your Business Journey
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline-inverse" size="xl">
              <a href="#solutions">Explore Our Solutions</a>
            </Button>
          </div>
        </div>
      </section>

      <Section
        id="solutions"
        tone="surface"
        spacing="compact"
        aria-labelledby="solutions-heading"
      >
        <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-60" />
        <div
          aria-hidden="true"
          className="bg-brand-blue-light/60 absolute -top-24 -right-16 -z-10 size-[28rem] rounded-full blur-3xl"
        />
        <div
          aria-hidden="true"
          className="bg-brand-blue/10 absolute -bottom-32 -left-24 -z-10 size-[26rem] rounded-full blur-3xl"
        />

        <SectionHeading
          id="solutions-heading"
          eyebrow="What We Do"
          title="Practical Support for Every Stage of Business"
          description="Whether you are starting out, improving an established operation or preparing to expand, we bring the right expertise and resources together."
          align="center"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {solutions.map((solution) => (
            <article
              key={solution.title}
              className="group bg-card hover:border-brand-blue/30 hover:shadow-lift relative flex flex-col overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={solution.image.src}
                  alt={solution.image.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="from-navy/50 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
                />
                <span className="bg-white/95 text-brand-blue shadow-soft absolute bottom-3 left-3 inline-flex size-11 items-center justify-center rounded-lg backdrop-blur">
                  <solution.icon aria-hidden="true" className="size-5" />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-ink text-lg font-bold">
                  <Link href={solution.href} className="after:absolute after:inset-0">
                    {solution.title}
                  </Link>
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {solution.description}
                </p>
                <span className="text-brand-blue mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold">
                  Learn More
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="journey" tone="navy" aria-labelledby="journey-heading">
        <div className="bg-grid-inverse absolute inset-0 -z-10 opacity-70" />
        <SectionHeading
          id="journey-heading"
          eyebrow="The Business Journey"
          title="A Clearer Path From Idea to Expansion"
          description="The right support at the right moment turns uncertainty into practical progress."
          align="center"
          tone="inverse"
        />
        <ol className="relative mt-12 grid gap-8 md:grid-cols-2 lg:mt-16 lg:grid-cols-6 lg:gap-4">
          <span
            aria-hidden="true"
            className="bg-brand-blue-muted/35 absolute top-6 right-[7%] left-[7%] hidden h-px lg:block"
          />
          {journey.map((item) => (
            <li
              key={item.step}
              className="reveal relative flex gap-4 lg:flex-col lg:items-center lg:gap-4 lg:text-center"
            >
              <span className="bg-navy border-brand-blue-muted text-brand-blue-muted relative z-10 inline-flex size-12 shrink-0 items-center justify-center rounded-full border-2">
                <item.icon aria-hidden="true" className="size-5" />
              </span>
              <div>
                <span className="text-brand-blue-muted text-xs font-bold tracking-[0.18em] uppercase">
                  {item.step}
                </span>
                <h3 className="mt-1 font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section aria-labelledby="advantages-heading">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-20">
          <SectionHeading
            id="advantages-heading"
            eyebrow="Why Miracle International"
            title="A Partner Built Around Your Progress"
            description="We combine practical business support with the relationships, resources and technology needed to build for the long term."
          />
          <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {advantages.map((advantage) => (
              <li key={advantage.title} className="reveal flex gap-4">
                <span className="bg-brand-blue-light text-brand-blue inline-flex size-10 shrink-0 items-center justify-center rounded-full">
                  <advantage.icon aria-hidden="true" className="size-5" />
                </span>
                <div className="space-y-1.5">
                  <h3 className="text-ink font-bold">{advantage.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="surface" aria-labelledby="technology-heading">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
          <div className="bg-navy relative overflow-hidden rounded-2xl p-8 sm:p-12">
            <div
              aria-hidden="true"
              className="bg-grid-inverse absolute inset-0 opacity-70"
            />
            <div className="relative space-y-6">
              <Eyebrow tone="inverse">Business + Technology</Eyebrow>
              <h2
                id="technology-heading"
                className="text-3xl leading-tight font-bold text-white sm:text-4xl"
              >
                Better systems. Better decisions. Better growth.
              </h2>
              <p className="leading-relaxed text-white/70">
                The strongest businesses connect their plans to the way work actually
                happens. We combine business understanding with modern technology to
                streamline operations, improve management visibility and create capacity
                for growth.
              </p>
              <Button asChild variant="outline-inverse" size="lg">
                <Link href={ROUTES.public.itSolutions}>
                  Explore IT Solutions
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {outcomes.map((outcome) => (
              <div
                key={outcome}
                className="bg-card flex items-start gap-3 rounded-xl border p-5"
              >
                <span className="bg-brand-blue-light text-brand-blue inline-flex size-7 shrink-0 items-center justify-center rounded-full">
                  <Check aria-hidden="true" className="size-4" strokeWidth={2.5} />
                </span>
                <span className="text-ink text-sm font-bold">{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <CtaBanner
        eyebrow="Your Next Chapter Starts Here"
        title="Ready to Turn Your Business Idea Into Reality?"
        description="Bring us your idea, challenge or next milestone. Our team will help you identify the most practical way forward."
        primary={{ label: "Talk to Our Team", href: ROUTES.public.contact }}
        secondary={{
          label: "Request a Consultation",
          href: ROUTES.public.tellUsWhatYouNeed,
        }}
      />
    </>
  );
}
