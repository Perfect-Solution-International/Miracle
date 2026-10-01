import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
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


export default function Page() {
  return (
    <main>
      {/* ── 1. Hero Section: Full-Width Panoramic Hero with Left Overlay ── */}
      <section className="relative isolate overflow-hidden bg-white border-b border-slate-200/80 min-h-[580px] lg:min-h-[660px] flex items-center">
        {/* Full-Bleed Panoramic Hero Image */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-no-repeat transition-transform duration-1000"
          style={{
            backgroundImage: 'url("/images/services/marketing-hero.jpg")',
            backgroundPosition: "right center",
          }}
        />

        {/* Soft-White Gradient on Left Area (ensures 100% crisp legibility on all devices) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent lg:from-white/95 lg:via-white/70 lg:to-transparent/10 pointer-events-none"
        />

        {/* Bottom Gradient Fade to Next Section */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"
        />

        {/* Left-Aligned Content Container */}
        <div className="container-page relative z-10 w-full py-16 sm:py-20 lg:py-24">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-slate-200/90 bg-white/95 px-4 py-1.5 text-xs font-semibold text-slate-800 shadow-2xs backdrop-blur-sm">
              <span className="size-2 rounded-full bg-blue-600 ring-4 ring-blue-100" />
              <span>Targeted Digital Marketing &amp; Brand Growth</span>
            </div>

            <h1 className="text-slate-900 text-3xl sm:text-4xl lg:text-[3.25rem] xl:text-[3.75rem] font-extrabold tracking-tight leading-[1.08]">
              High-Performance Marketing.<br />
              For <span className="bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">Brand Authority</span><br />
              <span className="bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">&amp; Global Reach.</span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
              Targeted digital campaigns, multi-channel marketing architecture, brand positioning, and strategic customer acquisition designed to scale your business across local and international markets.
            </p>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row">
              <Button asChild size="xl" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-6 py-3.5 shadow-md inline-flex items-center justify-center transition-all hover:shadow-lg hover:-translate-y-0.5">
                <Link href={ROUTES.public.contact}>
                  <span>Inquiry Now</span>
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline" className="bg-white/95 hover:bg-white text-slate-800 font-semibold border-slate-200/90 rounded-xl px-6 py-3.5 shadow-2xs inline-flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 backdrop-blur-xs">
                <Link href={ROUTES.public.services}>Explore Capabilities</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Section aria-labelledby="overview-heading" className="bg-white border-t border-slate-100">
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

      <Section aria-labelledby="capabilities-heading" className="bg-white border-t border-slate-100">
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

      <Section aria-labelledby="strategy-heading" className="bg-white border-t border-slate-100">
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

      <Section aria-labelledby="channels-heading" className="bg-white border-t border-slate-100">
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
                className="flex items-start gap-4 rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs"
              >
                <Icon
                  aria-hidden="true"
                  className="text-brand-blue mt-0.5 size-5 shrink-0"
                />
                <div>
                  <h3 className="font-semibold text-ink">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>


      <Section aria-labelledby="value-heading" className="bg-white border-t border-slate-100">
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

    </main>
  );
}

