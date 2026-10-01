import {
  ArrowRight,
  Briefcase,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Compass,
  FileCheck2,
  Globe2,
  Handshake,
  Headphones,
  HelpCircle,
  Layers3,
  Lightbulb,
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

      {/* ── 2. Main 6-Step Process Section ── */}
      <section className="section-y bg-slate-50/60 border-b border-slate-200/80">
        <div className="container-page space-y-12">
          <div className="max-w-2xl">
            <p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">
              Step-by-step guidance
            </p>
            <h2 className="text-ink mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Our 6-Step Process
            </h2>
            <p className="text-muted-foreground mt-3 text-base sm:text-lg leading-relaxed">
              We work collaboratively with you from your initial inquiry through to complete solution delivery.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {STEPS.map(({ step, title, description, icon: Icon }) => (
              <div
                key={step}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-7 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-soft"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="bg-brand-blue text-white inline-flex size-11 items-center justify-center rounded-xl text-sm font-extrabold shadow-2xs">
                      {step}
                    </span>
                    <div className="bg-brand-blue-light/60 text-brand-blue flex size-10 items-center justify-center rounded-xl transition-colors group-hover:bg-brand-blue group-hover:text-white">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                  </div>

                  <h3 className="text-ink mt-6 text-xl font-bold transition-colors group-hover:text-brand-blue">
                    {title}
                  </h3>

                  <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                    {description}
                  </p>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-4 flex items-center gap-2 text-xs font-semibold text-brand-blue">
                  <CheckCircle2 className="size-4 shrink-0 text-brand-blue" />
                  <span>Step {step} in our collaboration</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. How We Help Section ── */}
      <section className="section-y bg-white border-b border-slate-200/80">
        <div className="container-page space-y-12">
          <div className="max-w-2xl">
            <p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">
              Areas of support
            </p>
            <h2 className="text-ink mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              How We Help
            </h2>
            <p className="text-muted-foreground mt-3 text-base sm:text-lg leading-relaxed">
              Miracle International provides dedicated support across multiple specialized services and commercial sectors.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {SERVICE_AREAS.map(({ title, description, href, icon: Icon }) => (
              <Link
                key={title}
                href={href}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-soft"
              >
                <div>
                  <div className="bg-brand-blue-light/70 text-brand-blue flex size-11 items-center justify-center rounded-xl transition-colors group-hover:bg-brand-blue group-hover:text-white">
                    <Icon className="size-5.5" aria-hidden="true" />
                  </div>
                  <h3 className="text-ink mt-5 text-base font-bold transition-colors group-hover:text-brand-blue">
                    {title}
                  </h3>
                  <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
                    {description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-brand-blue">
                  <span>Learn more</span>
                  <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
