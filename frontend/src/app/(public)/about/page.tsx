import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  ClipboardList,
  Compass,
  Eye,
  Handshake,
  Headphones,
  Layers3,
  Lightbulb,
  Network,
  Plane,
  SearchCheck,
  Settings2,
  ShieldCheck,
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
import { SITE_MEDIA } from "@/config/site-media";
import { GlobalPresenceSection, MISSION_VISION_VALUES } from "@/features/about";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";

const TITLE = "About Us";
const DESCRIPTION =
  "Connecting businesses with global opportunities through trusted sourcing, trading and business solutions.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.about,
  image: SITE_MEDIA.businessMeeting,
});

type IconItem = { title: string; description: string; icon: LucideIcon };

const companyAreas = [
  {
    title: "Services",
    description:
      "Sourcing, trading, import and export, investment, franchise and marketing support.",
    href: ROUTES.public.services,
    icon: Layers3,
  },
  {
    title: "Business Solutions",
    description:
      "Practical guidance for planning, setup, equipment, technology, growth and support.",
    href: ROUTES.public.businessSolutions,
    icon: BriefcaseBusiness,
  },
  {
    title: "Travel & Tourism",
    description:
      "Inbound and outbound travel, visa guidance, flight tickets and work visa support.",
    href: ROUTES.public.travelTourism,
    icon: Plane,
  },
  {
    title: "IT Solutions",
    description:
      "Websites, software, POS, management systems, digital solutions and automation.",
    href: ROUTES.public.itSolutions,
    icon: Settings2,
  },
] as const;

const process: (IconItem & { step: string })[] = [
  {
    step: "01",
    title: "Understand",
    description: "Start with the requirement, priorities and practical context.",
    icon: SearchCheck,
  },
  {
    step: "02",
    title: "Plan",
    description: "Clarify the right direction, scope and next steps.",
    icon: ClipboardList,
  },
  {
    step: "03",
    title: "Coordinate",
    description: "Connect the suppliers, services and people the work requires.",
    icon: Network,
  },
  {
    step: "04",
    title: "Deliver",
    description: "Keep the work organized through completion or delivery.",
    icon: Check,
  },
  {
    step: "05",
    title: "Support",
    description: "Stay available as questions and new requirements arise.",
    icon: Headphones,
  },
];

const reasons: IconItem[] = [
  {
    title: "One Point of Contact",
    description: "A single team coordinates the suppliers, services and steps involved.",
    icon: Handshake,
  },
  {
    title: "Practical Approach",
    description: "Recommendations begin with the real requirement and operating context.",
    icon: Compass,
  },
  {
    title: "Connected Services",
    description: "Trade, business, travel and technology support work together.",
    icon: Network,
  },
  {
    title: "Clear Communication",
    description: "Requirements, quotations and next steps remain visible.",
    icon: Eye,
  },
  {
    title: "Long-Term Assistance",
    description: "Support continues beyond the first milestone or delivery.",
    icon: ShieldCheck,
  },
];

export default function Page() {
  const mission = MISSION_VISION_VALUES.find((item) => item.id === "mission");
  const vision = MISSION_VISION_VALUES.find((item) => item.id === "vision");
  const values = MISSION_VISION_VALUES.find((item) => item.title === "Our Values");

  return (
    <main>
      <section
        aria-labelledby="about-hero-heading"
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
              <Eyebrow>About Miracle International</Eyebrow>
            </div>
            <h1
              id="about-hero-heading"
              className="text-ink mt-5 max-w-3xl text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl"
            >
              Built to Connect Business,{" "}
              <span className="text-brand-blue">Opportunity and Growth</span>
            </h1>
            <p className="text-muted-foreground mt-5 max-w-xl text-base leading-relaxed sm:text-lg">
              Miracle International connects businesses with international opportunities
              through sourcing, trading and practical business solutions.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="accent" size="xl">
                <Link href={ROUTES.public.services}>
                  Explore Our Services
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link href={ROUTES.public.contact}>Contact Our Team</Link>
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-2xl pb-8 sm:pl-8">
            <div className="shadow-lift relative aspect-[4/3] overflow-hidden rounded-3xl border border-white">
              <Image
                src={SITE_MEDIA.businessMeeting.src}
                alt={SITE_MEDIA.businessMeeting.alt}
                fill
                preload
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="from-navy/40 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
              />
              <p className="absolute right-6 bottom-6 left-6 max-w-sm text-xl leading-snug font-bold text-white">
                Bridging markets. Building opportunities.
              </p>
            </div>
            <div className="shadow-lift absolute right-4 bottom-0 left-4 flex items-center justify-between rounded-2xl border bg-white px-5 py-4 sm:right-0 sm:left-0">
              <span className="text-ink text-sm font-bold">Global Connections</span>
              <ArrowRight aria-hidden="true" className="text-brand-blue/50 size-4" />
              <span className="text-brand-blue text-sm font-bold">Local Support</span>
            </div>
          </div>
        </div>
      </section>

      <Section
        id="company"
        aria-labelledby="who-we-are-heading"
        className="scroll-mt-24"
        containerClassName="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16"
      >
        <div>
          <SectionHeading
            id="who-we-are-heading"
            eyebrow="Who We Are"
            title="A Trusted Partner for Global Business"
            description="Miracle International is a diversified global trade and business solutions company committed to connecting businesses with international opportunities."
          />
          <div className="text-muted-foreground mt-6 space-y-4 text-base leading-relaxed">
            <p>
              We specialize in import and export, product sourcing, wholesale trading,
              business consultation, investment support, travel and tourism services and
              IT solutions through a single, reliable platform.
            </p>
            <p>
              Our purpose is to simplify international business and provide connected
              support, helping clients source, trade, invest and grow with confidence.
            </p>
          </div>
        </div>
        <div className="shadow-lift relative aspect-[3/2] overflow-hidden rounded-3xl border border-white">
          <Image
            src={SITE_MEDIA.handshake.src}
            alt={SITE_MEDIA.handshake.alt}
            fill
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="from-navy/45 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
          />
          <div className="bg-navy/80 absolute right-5 bottom-5 left-5 rounded-2xl border border-white/20 p-5 text-white backdrop-blur-sm sm:left-auto sm:max-w-xs">
            <p className="text-brand-blue-muted text-xs font-bold tracking-[0.16em] uppercase">
              One Connected Platform
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/80">
              Trade, business, travel and technology support brought together around the
              requirement.
            </p>
          </div>
        </div>
      </Section>

      <Section
        aria-labelledby="purpose-heading"
        className="bg-brand-blue-light/25"
        containerClassName="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16"
      >
        <div className="shadow-lift relative aspect-[4/5] max-h-[36rem] overflow-hidden rounded-3xl border border-white">
          <Image
            src={SITE_MEDIA.cityTowers.src}
            alt={SITE_MEDIA.cityTowers.alt}
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="from-navy/65 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
          />
          <div className="absolute right-6 bottom-6 left-6 text-white">
            <p className="text-brand-blue-muted text-xs font-bold tracking-[0.16em] uppercase">
              Our Purpose
            </p>
            <p className="mt-2 max-w-sm text-xl leading-snug font-bold">
              Reliable solutions built around trust, innovation and customer success.
            </p>
          </div>
        </div>

        <div>
          <SectionHeading
            id="purpose-heading"
            eyebrow="Vision, Mission & Values"
            title="A Clear Purpose Behind Every Connection"
            description="Our direction is grounded in the company mission, vision and values already guiding our work."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[mission, vision].map((item) => {
              if (!item) return null;
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="shadow-soft rounded-2xl border bg-white p-6"
                >
                  <span className="bg-brand-blue-light text-brand-blue flex size-11 items-center justify-center rounded-xl">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="text-ink mt-5 text-lg font-bold">{item.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
          {values?.bullets ? (
            <div className="shadow-soft mt-4 rounded-2xl border bg-white p-6">
              <div className="flex items-center gap-3">
                <span className="bg-brand-blue-light text-brand-blue flex size-11 items-center justify-center rounded-xl">
                  <Lightbulb aria-hidden="true" className="size-5" />
                </span>
                <h3 className="text-ink text-lg font-bold">Our Values</h3>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {values.bullets.map((value) => (
                  <li
                    key={value}
                    className="border-brand-blue/15 bg-brand-blue-light/50 text-brand-blue-dark rounded-full border px-4 py-2 text-sm font-semibold"
                  >
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </Section>

      <Section
        id="services"
        aria-labelledby="company-areas-heading"
        className="scroll-mt-24"
      >
        <SectionHeading
          id="company-areas-heading"
          align="center"
          eyebrow="What We Do"
          title="Connected Expertise Across the Business Journey"
          description="Our major service areas work independently or together, depending on what the requirement needs."
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {companyAreas.map(({ title, description, href, icon: Icon }) => (
            <li key={title}>
              <Link
                href={href}
                className="group shadow-soft hover:border-brand-blue/30 hover:shadow-lift flex h-full flex-col rounded-2xl border bg-white p-6 transition-all hover:-translate-y-1"
              >
                <span className="bg-brand-blue-light text-brand-blue group-hover:bg-brand-blue flex size-11 items-center justify-center rounded-xl transition-colors group-hover:text-white">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="text-ink mt-5 text-lg font-bold">{title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {description}
                </p>
                <span className="text-brand-blue mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold">
                  Explore
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="how-we-work" tone="navy" aria-labelledby="company-process-heading">
        <div
          aria-hidden="true"
          className="bg-grid-inverse absolute inset-0 -z-20 opacity-75"
        />
        <SectionHeading
          id="company-process-heading"
          eyebrow="How We Work"
          title="A Clear, Coordinated Way Forward"
          description="One connected process keeps requirements, decisions and delivery moving in the same direction."
          tone="inverse"
        />
        <ol className="border-brand-blue-muted/35 relative mt-12 grid gap-7 border-l pl-7 lg:mt-16 lg:grid-cols-5 lg:gap-6 lg:border-t lg:border-l-0 lg:pl-0">
          {process.map(({ step, title, description, icon: Icon }, index) => (
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
        id="why-choose-us"
        aria-labelledby="why-choose-heading"
        className="scroll-mt-24"
        containerClassName="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16"
      >
        <div>
          <SectionHeading
            id="why-choose-heading"
            eyebrow="Why Choose Miracle International"
            title="Support Designed Around the Wider Requirement"
            description="Complex business needs rarely sit inside one category. Our role is to keep the moving parts connected and the next step clear."
          />
          <Button asChild variant="outline" size="xl" className="mt-7">
            <Link href={ROUTES.public.contact}>
              Talk to Our Team
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <ul className="border-brand-blue/15 border-t">
          {reasons.map(({ title, description, icon: Icon }) => (
            <li key={title} className="border-brand-blue/15 flex gap-4 border-b py-5">
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

      <GlobalPresenceSection />

      <CtaBanner
        eyebrow="Start a Conversation"
        title="Let's Talk About What Your Business Needs Next"
        description="Share the opportunity, requirement or challenge in front of you. Our team will help identify the most practical next step."
        primary={{ label: "Contact Us", href: ROUTES.public.contact }}
        secondary={{ label: "Explore Our Services", href: ROUTES.public.services }}
        headingId="about-cta-heading"
      />
    </main>
  );
}
