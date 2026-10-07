import {
  ArrowRight,
  Briefcase,
  Code2,
  FileCheck2,
  Globe2,
  Handshake,
  Headphones,
  Layers3,
  Megaphone,
  MessageSquarePlus,
  Package,
  Plane,
  Search,
  SearchCheck,
  ShieldCheck,
  SlidersHorizontal,
  Stamp,
  Store,
  TrendingUp,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "How It Works";
const DESCRIPTION =
  "A simple and transparent process to help you find the right business, sourcing, travel, and service solutions.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.howItWorks,
  image: SITE_MEDIA.aboutHero,
});

/** 6 Core Steps */
const STEPS = [
  {
    step: "01",
    title: "Tell Us What You Need",
    description:
      "Customers share their requirement, business idea, travel plan, sourcing need, or service request.",
    icon: MessageSquarePlus,
  },
  {
    step: "02",
    title: "We Understand Your Requirement",
    description:
      "Our team reviews the information and identifies the most suitable way to support the request.",
    icon: SearchCheck,
  },
  {
    step: "03",
    title: "Explore Suitable Options",
    description:
      "We research, coordinate, and present relevant options based on the customer's requirements.",
    icon: SlidersHorizontal,
  },
  {
    step: "04",
    title: "Review & Discuss",
    description:
      "The customer reviews the available options and discusses any changes or additional requirements with our team.",
    icon: Handshake,
  },
  {
    step: "05",
    title: "Confirm Your Solution",
    description:
      "Once the details are agreed, we coordinate the next steps required for the selected service or solution.",
    icon: FileCheck2,
  },
  {
    step: "06",
    title: "Ongoing Support",
    description:
      "We continue to coordinate and support the customer throughout the relevant process.",
    icon: Headphones,
  },
] as const;

/** Core Areas Supported by Miracle International */
const SERVICE_AREAS = [
  {
    title: "Import & Export",
    description: "International cargo, documentation, clearance, and cross-border freight coordination.",
    href: ROUTES.public.servicesImportExport,
    icon: Globe2,
  },
  {
    title: "Wholesale & Products",
    description: "Bulk sourcing across industrial machinery, commercial equipment, electronics, and materials.",
    href: ROUTES.public.wholesaleProducts,
    icon: Package,
  },
  {
    title: "Trading",
    description: "Connecting verified international suppliers and buyers with negotiated trade terms.",
    href: ROUTES.public.servicesTrading,
    icon: Warehouse,
  },
  {
    title: "Travel & Tourism",
    description: "Curated Sri Lanka inbound packages, outbound holiday itineraries, and custom tours.",
    href: ROUTES.public.travelTourism,
    icon: Plane,
  },
  {
    title: "Visa Services",
    description: "Structured document auditing, embassy checklist guidance, and appointment scheduling support.",
    href: ROUTES.public.visaServices,
    icon: Stamp,
  },
  {
    title: "Business Solutions",
    description: "Advisory, planning, business registration, setup guidance, and strategic growth support.",
    href: ROUTES.public.businessSolutions,
    icon: Briefcase,
  },
  {
    title: "Franchise Opportunities",
    description: "Turnkey franchise models, brand licensing, and operational launch assistance.",
    href: ROUTES.public.servicesFranchise,
    icon: Store,
  },
  {
    title: "Investment Opportunities",
    description: "Vetted business ventures, partnership structures, and commercial growth opportunities.",
    href: ROUTES.public.servicesInvestment,
    icon: TrendingUp,
  },
  {
    title: "Marketing & Advertising",
    description: "Brand positioning, multi-channel promotional campaigns, and targeted digital strategy.",
    href: ROUTES.public.servicesMarketingAdvertising,
    icon: Megaphone,
  },
  {
    title: "IT Solutions",
    description: "Modern websites, custom software development, POS systems, and workflow automation.",
    href: ROUTES.public.itSolutions,
    icon: Code2,
  },
] as const;

/** Client Benefits / Strategic Advantages */
const ADVANTAGES = [
  {
    title: "End-to-End Coordination",
    description: "We handle the complexity across suppliers, logistics, and legal compliance so you can focus on your core business.",
    icon: Layers3,
  },
  {
    title: "Verified Global Network",
    description: "Access our established network of trusted suppliers, manufacturers, and trade partners worldwide.",
    icon: Globe2,
  },
  {
    title: "Transparent Communication",
    description: "Clear updates, precise timelines, and dedicated account managers ensuring you are always informed.",
    icon: MessageSquarePlus,
  },
  {
    title: "Tailored Solutions",
    description: "Every requirement is assessed individually to provide the most efficient and cost-effective outcome.",
    icon: SlidersHorizontal,
  },
] as const;

export default function Page() {
  return (
    <main className="bg-white">
      {/* ── 1. Hero Section ── */}
      <section
        aria-labelledby="how-it-works-hero-heading"
        className="relative isolate overflow-hidden bg-white border-b border-slate-200/80 min-h-[500px] lg:min-h-[560px] flex items-center"
      >
        {/* Full-Bleed Background Image */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-no-repeat transition-transform duration-1000"
          style={{
            backgroundImage: `url("${SITE_MEDIA.aboutHero.src}")`,
            backgroundPosition: "right center",
          }}
        />

        {/* Soft-White Gradient on Left Area */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent lg:from-white/95 lg:via-white/70 lg:to-transparent/20 pointer-events-none"
        />

        {/* Bottom Gradient Fade */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"
        />

        <div className="container-page relative z-10 w-full py-16 sm:py-20 lg:py-24">
          <div className="max-w-2xl space-y-5">
            <p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">
              How It Works
            </p>

            <h1
              id="how-it-works-hero-heading"
              className="text-navy text-4xl leading-[1.1] font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
            >
              How It Works
            </h1>

            <p className="max-w-xl text-base leading-relaxed font-medium text-slate-700 sm:text-lg">
              A simple and transparent process to help you find the right business, sourcing, travel, and service solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5 pt-3">
              <Button asChild size="xl" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-7 shadow-md">
                <Link href={ROUTES.public.tellUsWhatYouNeed}>
                  Tell Us What You Need
                  <ArrowRight data-icon="inline-end" aria-hidden="true" className="size-4.5" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline" className="bg-white/90 hover:bg-white text-slate-800 font-semibold border-slate-300 rounded-xl px-7 shadow-2xs">
                <Link href={ROUTES.public.services}>Explore Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Detailed 6-Step Process Breakdown ── */}
      <Section
        id="steps"
        aria-labelledby="how-it-works-steps-heading"
        className="scroll-mt-20 bg-slate-50/70"
      >
        <SectionHeading
          id="how-it-works-steps-heading"
          align="center"
          eyebrow="Step-by-Step Roadmap"
          title="How We Work With You"
          description="Every project follows our structured 6-stage lifecycle to ensure predictability and flawless execution."
        />

        <div className="mt-10 space-y-6">
          {STEPS.map((stepItem) => {
            const Icon = stepItem.icon;
            return (
              <div
                key={stepItem.step}
                className="group rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-soft transition-all duration-300 hover:shadow-lift hover:border-brand-blue/40"
              >
                <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
                  <div className="flex items-center gap-4 lg:col-span-5">
                    <span className="bg-brand-blue text-white inline-flex size-14 shrink-0 items-center justify-center rounded-2xl text-lg font-extrabold shadow-sm">
                      {stepItem.step}
                    </span>
                    <div>
                      <span className="text-brand-blue text-xs font-bold uppercase tracking-wider">
                        Phase {stepItem.step}
                      </span>
                      <h3 className="text-ink text-xl font-bold group-hover:text-brand-blue transition-colors flex items-center gap-2 mt-1">
                        <Icon className="size-5" />
                        {stepItem.title}
                      </h3>
                    </div>
                  </div>

                  <div className="lg:col-span-7 lg:pl-6 lg:border-l border-slate-100">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {stepItem.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ── 3. Strategic Advantages ── */}
      <Section aria-labelledby="how-it-works-advantages-heading">
        <SectionHeading
          id="how-it-works-advantages-heading"
          align="center"
          eyebrow="Client Benefits"
          title="Why Our Process Works Better"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ADVANTAGES.map((adv) => {
            const Icon = adv.icon;
            return (
              <div
                key={adv.title}
                className="rounded-3xl border border-slate-200/80 bg-slate-50/50 p-6 shadow-xs hover:bg-white hover:border-brand-blue/30 hover:shadow-soft transition-all"
              >
                <span className="bg-brand-blue text-white inline-flex size-11 items-center justify-center rounded-2xl shadow-xs">
                  <Icon className="size-5.5" />
                </span>
                <h3 className="text-ink text-lg font-bold mt-4">{adv.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm mt-2 leading-relaxed">
                  {adv.description}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ── 4. Simple CTA Section ── */}
      <section className="section-y bg-slate-50/70">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-12 lg:p-16 text-center shadow-soft max-w-4xl mx-auto">
            <p className="text-brand-red text-xs font-bold tracking-[0.18em] uppercase">
              Get in touch
            </p>
            <h2 className="text-ink mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Have a Requirement in Mind?
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-base sm:text-lg leading-relaxed font-medium">
              Tell us what you need and our team will help you identify the right next step.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Button asChild size="xl" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-7 shadow-md">
                <Link href={ROUTES.public.tellUsWhatYouNeed}>
                  Tell Us What You Need
                  <ArrowRight data-icon="inline-end" aria-hidden="true" className="size-4" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline" className="bg-white hover:bg-slate-50 text-slate-800 font-semibold border-slate-300 rounded-xl px-7 shadow-2xs">
                <Link href={ROUTES.public.services}>Explore Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

