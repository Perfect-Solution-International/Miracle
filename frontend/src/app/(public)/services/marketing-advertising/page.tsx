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

import { Breadcrumb } from "@/components/common/breadcrumb";
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
      <Section
        spacing="none"
        className="bg-brand-blue-light/40 bg-grid"
        containerClassName="grid gap-10 py-12 md:py-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-16 lg:py-20"
      >
        <div className="max-w-2xl">
          <Breadcrumb
            items={[
              { label: "Services", href: ROUTES.public.services },
              { label: "Marketing & Advertising" },
            ]}
          />
          <div className="mt-9">
            <Eyebrow>Marketing &amp; Advertising</Eyebrow>
            <h1 className="text-ink mt-5 max-w-xl text-4xl leading-[1.1] font-bold tracking-tight sm:text-5xl lg:text-[3.5rem]">
              Marketing &amp; Advertising Solutions
            </h1>
            <p className="text-ink mt-6 max-w-xl text-lg leading-relaxed font-medium">
              Build visibility, strengthen your brand, and connect with the right audience
              through coordinated marketing and advertising support.
            </p>
            <p className="text-muted-foreground mt-4 max-w-xl leading-relaxed">
              From shaping your message to planning campaigns and digital promotion, we
              help bring your marketing activity into focus around your business goals.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild variant="accent" size="xl">
                <Link href={ROUTES.public.contact}>
                  Discuss Your Marketing Needs{" "}
                  <ArrowRight aria-hidden="true" data-icon="inline-end" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link href={ROUTES.public.services}>Explore Services</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-xl pb-9 pl-4 sm:pl-8 lg:pb-12">
          <div
            className="bg-brand-blue absolute top-4 left-0 h-[78%] w-[75%] rounded-[2rem]"
            aria-hidden="true"
          />
          <div className="shadow-soft relative ml-3 aspect-[1.13] overflow-hidden rounded-[1.75rem] border-4 border-white sm:ml-5">
            <Image
              src={SITE_MEDIA.marketingAdvertising.hero.src}
              alt={SITE_MEDIA.marketingAdvertising.hero.alt}
              fill
              priority
              sizes="(min-width: 1280px) 540px, (min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
            <div
              className="from-navy/35 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>
          <div className="shadow-soft absolute right-0 bottom-0 w-[45%] overflow-hidden rounded-2xl border-4 border-white bg-white sm:w-[42%]">
            <div className="relative aspect-[1.35]">
              <Image
                src={SITE_MEDIA.marketingAdvertising.heroInset.src}
                alt={SITE_MEDIA.marketingAdvertising.heroInset.alt}
                fill
                sizes="(min-width: 1024px) 220px, 40vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="shadow-soft absolute bottom-9 left-0 max-w-[70%] rounded-xl border border-white/80 bg-white px-4 py-3 sm:bottom-12 sm:px-5">
            <span
              className="bg-brand-red mr-2 inline-block size-2 rounded-full"
              aria-hidden="true"
            />
            <span className="text-brand-blue-dark text-xs font-bold tracking-wide sm:text-sm">
              Strategy · Creative · Reach
            </span>
          </div>
        </div>
      </Section>

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

      <Section tone="navy" aria-labelledby="channels-heading">
        <div
          aria-hidden="true"
          className="bg-grid-inverse pointer-events-none absolute inset-0 -z-10"
        />
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            eyebrow="Channels"
            title="Reach Customers Across Multiple Touchpoints"
            description="The right mix depends on where your audience is and what you want them to do. We help the channels work together as one clear message."
            tone="inverse"
            id="channels-heading"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {channels.map(([title, description, Icon]) => (
              <div
                key={title}
                className="flex items-start gap-4 rounded-xl border border-white/15 bg-white/5 px-4 py-4"
              >
                <Icon
                  aria-hidden="true"
                  className="text-brand-blue-muted mt-0.5 size-5 shrink-0"
                />
                <div>
                  <h3 className="font-semibold text-white">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/65">
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
                className="text-brand-blue/25 text-5xl leading-none font-bold"
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
