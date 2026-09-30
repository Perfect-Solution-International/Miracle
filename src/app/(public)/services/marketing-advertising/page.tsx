import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Check,
  Compass,
  Crosshair,
  FileText,
  Globe2,
  Mail,
  Megaphone,
  MessageCircle,
  MousePointer2,
  Palette,
  Search,
  Share2,
  Sparkles,
  Target,
} from "lucide-react";

import { CtaBanner } from "@/components/common/cta-banner";
import { Eyebrow } from "@/components/common/eyebrow";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";

export const metadata: Metadata = {
  title: "Marketing & Advertising Services",
  description:
    "Build your brand presence and reach the right audience with practical marketing and advertising solutions.",
};

const strengths = [
  ["Brand visibility", "Make your business easier to recognize.", Megaphone],
  ["Audience targeting", "Focus on the people who matter most.", Target],
  ["Campaign planning", "Bring messages and timing together.", Compass],
  ["Digital promotion", "Show up across relevant online channels.", MousePointer2],
  ["Creative coordination", "Keep every touchpoint consistent.", Palette],
  ["Ongoing support", "Adapt as your priorities change.", MessageCircle],
] as const;

const capabilities = [
  {
    title: "Digital Marketing",
    description:
      "Connect your goals to a practical digital plan, from channel selection to coordinated promotion.",
    icon: BarChart3,
    featured: true,
  },
  {
    title: "Social Media Marketing",
    description:
      "Build a consistent presence and create conversations with the audiences you want to reach.",
    icon: Share2,
    featured: true,
  },
  {
    title: "Brand Development",
    description:
      "Clarify your positioning, voice and presentation across customer touchpoints.",
    icon: Sparkles,
    featured: false,
  },
  {
    title: "Advertising Campaigns",
    description:
      "Coordinate messages, creative and placements around a clear campaign objective.",
    icon: Megaphone,
    featured: false,
  },
  {
    title: "Content & Creative Support",
    description:
      "Shape useful content and creative materials that carry your message clearly.",
    icon: FileText,
    featured: false,
  },
  {
    title: "Marketing Strategy",
    description: "Set direction based on your business, audience and available channels.",
    icon: Crosshair,
    featured: false,
  },
] as const;

const strategy = [
  ["Audience Understanding", "Identify who your business needs to reach."],
  ["Brand Positioning", "Build a clearer and more consistent market identity."],
  ["Campaign Planning", "Coordinate the message, timing and channels."],
  ["Continuous Improvement", "Review activity and refine the next steps."],
] as const;

const channels = [
  ["Social Media", "Build visibility and dialogue.", Share2],
  ["Search", "Be present when people look.", Search],
  ["Digital Advertising", "Support focused campaigns.", MousePointer2],
  ["Content", "Communicate your value clearly.", FileText],
  ["Email", "Stay connected with audiences.", Mail],
  ["Web Campaigns", "Bring digital touchpoints together.", Globe2],
] as const;

const steps = [
  ["Discover", "Understand the business, goals, audience and current position."],
  ["Plan", "Define the message, channels and campaign direction."],
  ["Execute", "Coordinate content, creative, promotion and campaign activity."],
  ["Review", "Assess performance and refine future marketing activity."],
] as const;

const values = [
  [
    "Business-first approach",
    "Recommendations start with what your business needs to achieve.",
  ],
  [
    "End-to-end support",
    "Planning, creative and promotion can work as one coordinated effort.",
  ],
  [
    "Cross-service expertise",
    "Marketing can connect with Miracle International’s wider business services.",
  ],
  [
    "Transparent communication",
    "Stay informed as priorities, activity and next steps take shape.",
  ],
] as const;

const outcomes = [
  "Stronger brand visibility",
  "More consistent messaging",
  "Better campaign coordination",
  "Improved digital presence",
  "Clearer marketing direction",
  "Scalable marketing support",
] as const;

export default function Page() {
  return (
    <main>
      <section className="relative isolate overflow-hidden border-b border-slate-200/80 bg-[linear-gradient(135deg,#ffffff_0%,#f8fafc_50%,#eff6ff_100%)] py-14 lg:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-0 -z-10 h-96 w-96 rounded-full bg-brand-blue/5 blur-3xl"
        />

        <div className="container-page grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue-light/50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-blue">
              <span className="bg-brand-red size-1.5 rounded-full" />
              MARKETING &amp; ADVERTISING
            </div>

            <h1 className="text-ink text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Build Visibility.{" "}
              <span className="bg-gradient-to-r from-navy via-brand-blue to-emerald-600 bg-clip-text text-transparent">
                Reach Global Audiences.
              </span>
            </h1>

            <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
              Targeted digital campaigns, brand positioning, and strategic promotion designed to connect your business with high-value customers.
            </p>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button asChild variant="accent" size="xl" className="shadow-lift">
                <Link href={ROUTES.public.contact}>
                  Discuss Your Needs{" "}
                  <ArrowRight aria-hidden="true" data-icon="inline-end" />
                </Link>
              </Button>
              <Button asChild variant="secondary-hero" size="xl">
                <Link href={ROUTES.public.services}>Explore Capabilities</Link>
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-2.5 shadow-xl shadow-slate-200/60 transition-transform duration-500 hover:scale-[1.01]">
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                <Image
                  src="/images/services/marketing-hero.jpg"
                  alt="Creative marketing directors reviewing multi-channel campaigns on digital displays"
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="from-navy/30 via-transparent to-transparent absolute inset-0 bg-gradient-to-t" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section aria-labelledby="overview-heading" className="bg-white">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Service Overview"
              title="Marketing Support Built Around Your Business"
              id="overview-heading"
            />
            <p className="text-muted-foreground mt-6 max-w-xl leading-relaxed">
              Every business has a different offer, audience and stage of growth. We bring
              the right marketing disciplines together to help you communicate clearly and
              stay visible where it counts.
            </p>
            <p className="text-muted-foreground mt-4 max-w-xl leading-relaxed">
              Our support can cover a specific campaign or a broader ongoing marketing
              direction, shaped around your priorities.
            </p>
          </div>
          <div className="grid gap-x-8 sm:grid-cols-2">
            {strengths.map(([title, description, Icon]) => (
              <div
                key={title}
                className="border-border flex gap-4 border-b py-4 first:pt-0 sm:first:pt-4"
              >
                <Icon
                  aria-hidden="true"
                  className="text-brand-blue mt-0.5 size-5 shrink-0"
                />
                <div>
                  <h3 className="text-ink font-semibold">{title}</h3>
                  <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section aria-labelledby="capabilities-heading" className="bg-brand-blue-light/35">
        <SectionHeading
          eyebrow="What We Do"
          title="Marketing & Advertising Capabilities"
          description="Connected support across the areas that shape a strong market presence."
          id="capabilities-heading"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {capabilities.map(({ title, description, icon: Icon, featured }) => (
            <article
              key={title}
              className={`group border-border/80 shadow-soft relative flex min-h-56 flex-col rounded-2xl border bg-white p-6 transition-transform duration-200 hover:-translate-y-1 ${featured ? "lg:col-span-2 lg:min-h-64 lg:p-8" : ""}`}
            >
              <div className="bg-brand-blue-light text-brand-blue flex size-11 items-center justify-center rounded-xl">
                <Icon aria-hidden="true" className="size-5" />
              </div>
              <div className="mt-auto pt-9">
                <h3 className={`text-ink font-bold ${featured ? "text-xl" : "text-lg"}`}>
                  {title}
                </h3>
                <p className="text-muted-foreground mt-2 max-w-md text-sm leading-relaxed">
                  {description}
                </p>
              </div>
              <ArrowRight
                aria-hidden="true"
                className="text-brand-blue absolute top-7 right-7 size-4 transition-transform group-hover:translate-x-1"
              />
            </article>
          ))}
        </div>
      </Section>

      <Section aria-labelledby="strategy-heading" className="bg-white">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="shadow-soft relative aspect-[1.2] overflow-hidden rounded-3xl lg:aspect-[0.98]">
            <Image
              src={SITE_MEDIA.marketingAdvertising.strategy.src}
              alt={SITE_MEDIA.marketingAdvertising.strategy.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
            <div
              className="bg-brand-blue absolute right-0 bottom-0 h-2 w-1/3"
              aria-hidden="true"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Strategy First"
              title="Build a Stronger Market Presence"
              description="Good marketing begins with a clear view of your goals, audience and position. We use that understanding to shape the message, select channels and coordinate execution."
              id="strategy-heading"
            />
            <div className="border-border mt-7 border-t">
              {strategy.map(([title, description], index) => (
                <div key={title} className="border-border flex gap-5 border-b py-4">
                  <span className="text-brand-blue shrink-0 text-sm font-bold">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-ink font-semibold">{title}</h3>
                    <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-white" aria-labelledby="channels-heading">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            eyebrow="Channels"
            title="Reach Customers Across Multiple Touchpoints"
            description="The right mix depends on where your audience is and what you want them to do. We help the channels work together as one clear message."
            id="channels-heading"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {channels.map(([title, description, Icon]) => (
              <div
                key={title}
                className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm"
              >
                <Icon
                  aria-hidden="true"
                  className="text-brand-blue mt-0.5 size-5 shrink-0"
                />
                <div>
                  <h3 className="text-ink font-semibold">{title}</h3>
                  <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section aria-labelledby="process-heading" className="bg-white">
        <SectionHeading
          eyebrow="Our Process"
          title="A Clear Path From Strategy to Execution"
          description="A considered sequence keeps the work focused and gives each activity a purpose."
          id="process-heading"
        />
        <ol className="border-brand-blue/25 mt-11 grid gap-8 border-l pl-6 md:grid-cols-4 md:gap-6 md:border-t md:border-l-0 md:pl-0">
          {steps.map(([title, description], index) => (
            <li key={title} className="relative md:pt-7">
              <span
                className="bg-brand-red absolute top-2 -left-[1.79rem] size-2.5 rounded-full ring-4 ring-white md:-top-[0.35rem] md:left-0"
                aria-hidden="true"
              />
              <span
                className="text-[#5B7FAE] text-5xl leading-none font-bold"
                aria-hidden="true"
              >
                0{index + 1}
              </span>
              <h3 className="text-ink mt-3 text-lg font-bold">{title}</h3>
              <p className="text-muted-foreground mt-2 max-w-xs text-sm leading-relaxed">
                {description}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section aria-labelledby="value-heading" className="bg-brand-blue-light/30">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-20">
          <div className="shadow-soft relative aspect-[1.05] overflow-hidden rounded-3xl">
            <Image
              src={SITE_MEDIA.marketingAdvertising.value.src}
              alt={SITE_MEDIA.marketingAdvertising.value.alt}
              fill
              sizes="(min-width: 1024px) 42vw, 90vw"
              className="object-cover"
            />
            <div
              className="bg-brand-blue absolute right-0 bottom-0 h-2 w-1/3"
              aria-hidden="true"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Why Miracle International"
              title="Marketing With a Broader Business Perspective"
              description="Marketing works best when it reflects the realities of the business behind it. Our wider services give us a practical view of how companies build, trade and grow, so marketing support can connect to the bigger picture."
              id="value-heading"
            />
            <div className="mt-7 grid gap-x-8 sm:grid-cols-2">
              {values.map(([title, description]) => (
                <div key={title} className="border-brand-blue/15 border-t py-4">
                  <Check aria-hidden="true" className="text-brand-blue mb-3 size-5" />
                  <h3 className="text-ink font-semibold">{title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section aria-labelledby="outcomes-heading" className="bg-white">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            eyebrow="Service Outcomes"
            title="What This Service Helps You Achieve"
            id="outcomes-heading"
          />
          <div className="grid gap-x-8 sm:grid-cols-2">
            {outcomes.map((outcome) => (
              <div
                key={outcome}
                className="border-border flex items-center gap-3 border-b py-4"
              >
                <span className="bg-brand-blue-light text-brand-blue flex size-8 shrink-0 items-center justify-center rounded-full">
                  <Check aria-hidden="true" className="size-4" />
                </span>
                <span className="text-ink text-sm font-semibold">{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <CtaBanner
        eyebrow="Let’s Talk"
        title="Ready to Strengthen Your Market Presence?"
        description="Tell us what you want to achieve and our team will help shape the right marketing approach."
        primary={{ label: "Discuss Your Marketing Needs", href: ROUTES.public.contact }}
        secondary={{ label: "Contact Us", href: ROUTES.public.contact }}
      />
    </main>
  );
}
