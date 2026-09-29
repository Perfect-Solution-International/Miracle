import {
  ArrowRight,
  Bot,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock3,
  FileCheck2,
  Globe2,
  Handshake,
  Lightbulb,
  Lock,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CtaBanner } from "@/components/common/cta-banner";
import { Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "How It Works";
const DESCRIPTION =
  "A streamlined, transparent 5-step process from your initial requirement to end-to-end coordinated execution.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.howItWorks,
});

const DETAILED_STEPS = [
  {
    step: "01",
    title: "Submit Your Requirement",
    tagline: "Tell us what you need in plain terms",
    description:
      "Share your business goal, project scope, travel dates, or technical needs through our online intake form, direct call, or email. Attach any reference materials or specifications.",
    icon: ClipboardList,
    points: [
      "No complex forms required",
      "Flexible requirement intake",
      "Direct document attachment support",
    ],
  },
  {
    step: "02",
    title: "Needs Assessment & Feasibility",
    tagline: "Multidisciplinary specialist review",
    description:
      "Our business advisors, engineers, or travel coordinators analyze your requirements, verify feasibility, and determine the optimal resources, timeline, and cost model.",
    icon: Search,
    points: [
      "Market and operational validation",
      "Resource & technology evaluation",
      "Transparent timeline projection",
    ],
  },
  {
    step: "03",
    title: "Customized Strategy & Proposal",
    tagline: "Clear deliverables and transparent quotation",
    description:
      "We prepare a tailored proposal, detailed itinerary, or technical roadmap detailing the deliverables, milestone schedules, and all-inclusive transparent pricing.",
    icon: FileCheck2,
    points: [
      "Zero hidden fees or unexpected costs",
      "Clear milestone breakdown",
      "Customized around your budget",
    ],
  },
  {
    step: "04",
    title: "Alignment & Finalization",
    tagline: "Fine-tune details before kickoff",
    description:
      "Review the proposal with your dedicated coordinator. We adjust options, finalize dates or architecture, and confirm all arrangements with mutual sign-off.",
    icon: Handshake,
    points: [
      "Interactive consultation & revisions",
      "Agreed service level parameters",
      "Direct point-of-contact assigned",
    ],
  },
  {
    step: "05",
    title: "Coordinated Execution & Support",
    tagline: "Seamless delivery from start to finish",
    description:
      "Our team manages the entire execution—whether running cross-border trade, software deployment, business setup, or personalized travel concierge—with ongoing support.",
    icon: ShieldCheck,
    points: [
      "Real-time milestone updates",
      "End-to-end quality assurance",
      "Ongoing advisory and maintenance",
    ],
  },
] as const;

const ADVANTAGES = [
  {
    title: "One Central Point of Contact",
    description: "Work with a dedicated coordinator who aligns all specialists behind your goal.",
    icon: Users,
  },
  {
    title: "Transparent & Accountable",
    description: "Full visibility on progress, costs, and deliverables at every stage.",
    icon: Lock,
  },
  {
    title: "Agile & Adaptive",
    description: "Easily adjust priorities and scope as your business conditions evolve.",
    icon: Lightbulb,
  },
  {
    title: "Guaranteed Confidentiality",
    description: "Your business models, concepts, and data are treated with strict confidentiality.",
    icon: ShieldCheck,
  },
] as const;

export default function Page() {
  return (
    <main>
      {/* ── 1. Liquid Mesh Hero ── */}
      <section
        aria-labelledby="how-it-works-hero-heading"
        className="relative isolate overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/80 pt-8 pb-14 border-b border-slate-200/80 lg:pt-14 lg:pb-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-36 left-1/2 -z-10 h-[500px] w-[750px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-brand-blue/15 via-indigo-500/10 to-brand-red/10 blur-[100px]"
        />

        <div className="container-page max-w-4xl text-center space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-white/90 px-3.5 py-1.5 text-xs font-bold text-navy shadow-xs backdrop-blur-md">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-blue opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-blue" />
            </span>
            Transparent 5-Step Delivery Framework
          </div>

          <h1
            id="how-it-works-hero-heading"
            className="text-ink text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
          >
            A Clear, Structured Path From{" "}
            <span className="bg-gradient-to-r from-brand-blue via-indigo-600 to-navy bg-clip-text text-transparent">
              Requirement to Results.
            </span>
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Discover how Miracle International transforms ideas and complex operational needs into seamless, coordinated outcomes.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <Button asChild variant="accent" size="xl" className="shadow-lift">
              <Link href={ROUTES.public.tellUsWhatYouNeed}>
                Tell Us What You Need
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              variant="secondary-hero"
              size="xl"
            >
              <a href="#steps">Explore the 5 Steps</a>
            </Button>
          </div>
        </div>
      </section>

      {/* ── 2. Detailed 5-Step Process Breakdown ── */}
      <section id="steps" className="section-y bg-slate-50/70 border-b border-slate-200/70 scroll-mt-20">
        <div className="container-page space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="bg-brand-blue-light text-brand-blue rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
              Step-by-Step Roadmap
            </span>
            <h2 className="text-ink text-3xl font-extrabold tracking-tight sm:text-4xl">
              How We Work With You
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Every project follows our structured 5-stage lifecycle to ensure predictability and flawless execution.
            </p>
          </div>

          <div className="mt-12 space-y-6">
            {DETAILED_STEPS.map((stepItem) => {
              const Icon = stepItem.icon;
              return (
                <div
                  key={stepItem.step}
                  className="group rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-soft transition-all duration-300 hover:shadow-lift hover:border-brand-blue/40"
                >
                  <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
                    <div className="flex items-center gap-4 lg:col-span-4">
                      <span className="bg-brand-blue text-white inline-flex size-14 shrink-0 items-center justify-center rounded-2xl text-lg font-extrabold shadow-sm">
                        {stepItem.step}
                      </span>
                      <div>
                        <span className="text-brand-blue text-xs font-bold uppercase tracking-wider">
                          Phase {stepItem.step}
                        </span>
                        <h3 className="text-ink text-xl font-bold group-hover:text-brand-blue transition-colors">
                          {stepItem.title}
                        </h3>
                        <p className="text-muted-foreground text-xs mt-0.5">{stepItem.tagline}</p>
                      </div>
                    </div>

                    <div className="lg:col-span-5">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {stepItem.description}
                      </p>
                    </div>

                    <div className="lg:col-span-3 border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6">
                      <ul className="space-y-1.5 text-xs font-medium text-ink">
                        {stepItem.points.map((p) => (
                          <li key={p} className="flex items-center gap-2">
                            <CheckCircle2 className="size-3.5 text-brand-blue shrink-0" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. Strategic Advantages ── */}
      <section className="section-y bg-white border-b border-slate-200/70">
        <div className="container-page">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="bg-brand-red/10 text-brand-red rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
              Client Benefits
            </span>
            <h2 className="text-ink text-3xl font-extrabold tracking-tight sm:text-4xl">
              Why Our Process Works Better
            </h2>
          </div>

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
        </div>
      </section>

      {/* ── 4. CTA Banner ── */}
      <CtaBanner
        eyebrow="Start Your Journey"
        title="Ready To Turn Your Plan Into Action?"
        description="Submit your requirement today and our specialists will coordinate the next practical step with you."
        primary={{
          label: "Submit Your Requirement",
          href: ROUTES.public.tellUsWhatYouNeed,
        }}
        secondary={{
          label: "Contact Our Advisors",
          href: ROUTES.public.contact,
        }}
      />
    </main>
  );
}
