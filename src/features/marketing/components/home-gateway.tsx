"use client";

import {
  ArrowRight,
  BarChart3,
  Bot,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock3,
  CodeXml,
  FileCheck2,
  FileUp,
  Globe2,
  Handshake,
  Layers3,
  Mail,
  MapPin,
  Megaphone,
  MonitorCog,
  Network,
  Phone,
  Plane,
  Rocket,
  ShieldCheck,
  Ship,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { APP_CONFIG } from "@/config/app";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";
import { cn } from "@/lib/utils";

/** 4 Core Pillars of Miracle International */
const CORE_PILLARS = [
  {
    id: "business-solutions",
    title: "Business Solutions",
    tagline: "Planning, setup, equipment & strategic expansion",
    description:
      "Comprehensive advisory and operational support to turn ideas into structured, high-performing enterprises.",
    icon: Briefcase,
    href: ROUTES.public.businessSolutions,
    badge: "Enterprise Growth",
    highlights: [
      "Start a Business & Registration",
      "Business Consultation & Strategy",
      "Machinery & Equipment Sourcing",
      "Setup Support & Market Expansion",
    ],
    gradient: "from-blue-600/10 via-indigo-600/5 to-transparent",
    accentColor: "text-blue-600",
  },
  {
    id: "it-solutions",
    title: "IT & Digital Solutions",
    tagline: "Websites, custom software, POS & enterprise systems",
    description:
      "Tailored digital engineering and automation tools built to modernize operations, scale workflows, and boost productivity.",
    icon: CodeXml,
    href: ROUTES.public.itSolutions,
    badge: "Technology & Engineering",
    highlights: [
      "Modern Website & Web App Dev",
      "Custom Software & Cloud Systems",
      "POS & Retail Management Systems",
      "Business Automation & IT Consulting",
    ],
    gradient: "from-indigo-600/10 via-purple-600/5 to-transparent",
    accentColor: "text-indigo-600",
  },
  {
    id: "travel-tourism",
    title: "Travel & Tourism",
    tagline: "Inbound Sri Lanka, outbound tours, visas & flights",
    description:
      "Full-spectrum travel coordination for international visitors exploring Sri Lanka and outbound travelers going abroad.",
    icon: Plane,
    href: ROUTES.public.travelTourism,
    badge: "Global Travel Desk",
    highlights: [
      "Sri Lanka Inbound Experiential Tours",
      "Outbound International Packages",
      "Worldwide Visa & Passport Support",
      "Flight Ticketing & Work Visa Guidance",
    ],
    gradient: "from-sky-600/10 via-blue-600/5 to-transparent",
    accentColor: "text-sky-600",
  },
  {
    id: "global-services",
    title: "Trade & Global Services",
    tagline: "Trading, franchise, import/export & investment",
    description:
      "Facilitating cross-border trade operations, turnkey franchise partnerships, and vetted investment structures.",
    icon: Globe2,
    href: ROUTES.public.services,
    badge: "Cross-Border Trade",
    highlights: [
      "International Trading Coordination",
      "Import & Export Documentation",
      "Franchise Brand Acquisition",
      "Strategic Investment Opportunities",
    ],
    gradient: "from-emerald-600/10 via-teal-600/5 to-transparent",
    accentColor: "text-emerald-600",
  },
] as const;

/** Why Work With Miracle International */
const VALUE_PILLARS = [
  {
    title: "One Central Strategic Partner",
    description:
      "No need to juggle multiple vendors. We handle business setup, technology, trade, and travel through a unified team.",
    icon: Handshake,
  },
  {
    title: "End-to-End Execution",
    description:
      "From initial requirement analysis and feasibility to complete deployment, ongoing logistics, and support.",
    icon: ShieldCheck,
  },
  {
    title: "Custom-Tailored Solutions",
    description:
      "Every project is structured precisely around your unique goals, budget parameters, and operational timelines.",
    icon: SlidersHorizontal,
  },
  {
    title: "Global Reach & Local Expertise",
    description:
      "International network across key trading hubs, paired with deep local market know-how and regulatory compliance.",
    icon: Globe2,
  },
] as const;

/** 5-Step Process Timeline */
const PROCESS_STEPS = [
  {
    step: "01",
    title: "Submit Your Requirement",
    description: "Share your business goal, project scope, travel dates, or technical needs with our team.",
  },
  {
    step: "02",
    title: "Expert Needs Analysis",
    description: "Our multidisciplinary specialists review feasibility, resource allocation, and practical options.",
  },
  {
    step: "03",
    title: "Tailored Proposal",
    description: "We prepare a structured, transparent roadmap, itinerary, or technical blueprint with clear timelines.",
  },
  {
    step: "04",
    title: "Review & Alignment",
    description: "Fine-tune details, adjust preferences, and align on deliverables with zero ambiguity.",
  },
  {
    step: "05",
    title: "Seamless Delivery",
    description: "Our team coordinates execution from start to finish, backed by dedicated ongoing support.",
  },
] as const;

type RequirementForm = {
  fullName: string;
  email: string;
  contact: string;
  whatsapp: string;
  category: string;
  details: string;
  country: string;
  additional: string;
};

const INITIAL_FORM: RequirementForm = {
  fullName: "",
  email: "",
  contact: "",
  whatsapp: "",
  category: "",
  details: "",
  country: "",
  additional: "",
};

function RequirementModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [fileCount, setFileCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, open]);

  if (!open) return null;

  const update = (field: keyof RequirementForm, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  const close = () => {
    setForm(INITIAL_FORM);
    setFileCount(0);
    setSubmitted(false);
    setError("");
    onClose();
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.fullName || !form.email || !form.contact || !form.category || !form.details) {
      setError("Please complete all required fields.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div
      className="bg-navy/50 fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="requirement-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="bg-popover text-popover-foreground relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl shadow-2xl border border-slate-200/80">
        <button
          type="button"
          onClick={close}
          aria-label="Close requirement form"
          className="text-muted-foreground hover:bg-slate-100 hover:text-ink absolute top-4 right-4 z-10 inline-flex size-9 items-center justify-center rounded-full transition-colors"
        >
          <X aria-hidden="true" className="size-5" />
        </button>

        {submitted ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-16 text-center">
            <span className="bg-brand-blue-light text-brand-blue inline-flex size-16 items-center justify-center rounded-2xl shadow-sm">
              <CheckCircle2 aria-hidden="true" className="size-8" />
            </span>
            <h2
              id="requirement-modal-title"
              className="text-ink mt-6 text-2xl font-extrabold sm:text-3xl"
            >
              Request Submitted Successfully
            </h2>
            <p className="text-muted-foreground mt-3 max-w-md text-sm leading-relaxed">
              Thank you, {form.fullName}. Our team has received your requirement and will contact
              you promptly with tailored options.
            </p>
            <Button size="lg" onClick={close} className="mt-7">
              Done
            </Button>
          </div>
        ) : (
          <>
            <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-brand-blue-light/20 px-6 py-5 pr-14 sm:px-8">
              <span className="bg-brand-blue-light text-brand-blue inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-bold uppercase tracking-wider">
                Miracle International Desk
              </span>
              <h2
                id="requirement-modal-title"
                className="text-ink mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl"
              >
                Tell Us What You Need
              </h2>
              <p className="text-muted-foreground mt-1 text-xs sm:text-sm leading-relaxed">
                Share your requirements and our specialists will coordinate the ideal solution.
              </p>
            </div>

            <form
              onSubmit={submit}
              className="overflow-y-auto px-6 py-6 sm:px-8 space-y-4"
              noValidate
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-ink block text-xs font-bold mb-1.5">
                    Full Name <span className="text-brand-red">*</span>
                  </label>
                  <Input
                    required
                    placeholder="Your name"
                    value={form.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-ink block text-xs font-bold mb-1.5">
                    Email Address <span className="text-brand-red">*</span>
                  </label>
                  <Input
                    required
                    type="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-ink block text-xs font-bold mb-1.5">
                    Contact Number <span className="text-brand-red">*</span>
                  </label>
                  <Input
                    required
                    type="tel"
                    placeholder="Phone with country code"
                    value={form.contact}
                    onChange={(e) => update("contact", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-ink block text-xs font-bold mb-1.5">
                    WhatsApp Number (Optional)
                  </label>
                  <Input
                    type="tel"
                    placeholder="WhatsApp number"
                    value={form.whatsapp}
                    onChange={(e) => update("whatsapp", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-ink block text-xs font-bold mb-1.5">
                  Requirement Category <span className="text-brand-red">*</span>
                </label>
                <select
                  required
                  value={form.category}
                  onChange={(e) => update("category", e.target.value)}
                  className="border-input bg-background text-ink flex h-10 w-full rounded-xl border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                >
                  <option value="">Select a category</option>
                  <option value="Business Solutions">Business Solutions (Start, Plan, Expand)</option>
                  <option value="IT & Digital Solutions">IT Solutions (Web, Software, POS, Automation)</option>
                  <option value="Travel & Tourism">Travel & Tourism (Inbound, Outbound, Visas, Flights)</option>
                  <option value="Trade & Sourcing">Trading & Cross-Border Services</option>
                  <option value="Investment & Franchise">Investment & Franchise Opportunities</option>
                  <option value="General Business Inquiry">General Business Inquiry</option>
                </select>
              </div>

              <div>
                <label className="text-ink block text-xs font-bold mb-1.5">
                  Requirement Details <span className="text-brand-red">*</span>
                </label>
                <Textarea
                  required
                  rows={3}
                  placeholder="Describe what you want to achieve, timelines, budget expectations, or specific preferences..."
                  value={form.details}
                  onChange={(e) => update("details", e.target.value)}
                />
              </div>

              <div>
                <label className="text-ink block text-xs font-bold mb-1.5">Country / Location</label>
                <Input
                  placeholder="e.g. Sri Lanka, UAE, United Kingdom"
                  value={form.country}
                  onChange={(e) => update("country", e.target.value)}
                />
              </div>

              <label className="border-input bg-slate-50/70 hover:bg-brand-blue-light/20 flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed p-3.5 text-xs font-semibold transition-colors">
                <FileUp aria-hidden="true" className="text-brand-blue size-5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-ink block">Attach Reference Document (Optional)</span>
                  <span className="text-muted-foreground block text-[11px] font-normal">
                    PDF, DOCX, or images up to 10MB
                  </span>
                  <Input
                    type="file"
                    multiple
                    onChange={(e) => setFileCount(e.target.files?.length ?? 0)}
                    className="hidden"
                  />
                  {fileCount > 0 ? (
                    <span className="text-brand-blue font-bold text-xs mt-1 block">
                      {fileCount} file{fileCount === 1 ? "" : "s"} selected
                    </span>
                  ) : null}
                </div>
              </label>

              {error ? (
                <p className="text-brand-red text-xs font-bold" role="alert">
                  {error}
                </p>
              ) : null}

              <Button type="submit" size="xl" className="w-full mt-2">
                Submit Requirement
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export function HomeGateway() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const openForm = () => setIsFormOpen(true);

  return (
    <div className="relative overflow-hidden">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION: Full-Bleed Wide Panoramic Hero
      ───────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="home-gateway-hero-heading"
        className="relative isolate overflow-hidden bg-white border-b border-slate-200/70 min-h-[580px] lg:min-h-[660px] flex items-center"
      >
        {/* 1. Underlying Screen-Wide Hero Background Image */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-no-repeat transition-transform duration-1000"
          style={{
            backgroundImage: 'url("/images/home/home-hero-bg.jpg")',
            backgroundPosition: "right center",
          }}
        />

        {/* 2. Soft-White Gradient on Left Area (ensures crisp, 100% legibility on all viewports) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent lg:from-white/95 lg:via-white/60 lg:to-transparent pointer-events-none"
        />

        {/* 3. Bottom Melt to Next Section */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"
        />

        {/* 4. Left-Aligned Content Container */}
        <div className="container-page relative z-10 w-full py-16 sm:py-20 lg:py-24">
          <div className="grid lg:grid-cols-12 items-center">
            {/* Left Content Column */}
            <div className="space-y-6 max-w-2xl lg:col-span-7 xl:col-span-6">
              {/* Badge with glowing pulse */}
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-white/90 px-3.5 py-1.5 text-xs font-bold text-navy shadow-xs backdrop-blur-md">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-blue opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-brand-blue" />
                </span>
                Integrated Global Business &amp; Travel Solutions
              </div>

              <h1
                id="home-gateway-hero-heading"
                className="text-ink text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-[1.08]"
              >
                One Trusted Partner For{" "}
                <span className="bg-gradient-to-r from-brand-blue via-indigo-600 to-navy bg-clip-text text-transparent">
                  Business, Tech &amp; Global Growth.
                </span>
              </h1>

              <p className="text-muted-foreground max-w-2xl text-base sm:text-lg leading-relaxed">
                Miracle International empowers enterprises and individuals through strategic{" "}
                <strong className="text-ink font-semibold">Business Solutions</strong>, cutting-edge{" "}
                <strong className="text-ink font-semibold">IT &amp; Software Engineering</strong>,{" "}
                premium <strong className="text-ink font-semibold">Travel &amp; Tourism</strong>, and{" "}
                reliable <strong className="text-ink font-semibold">Cross-Border Trade</strong>.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Button size="xl" onClick={openForm} className="shadow-lift gap-2 bg-brand-blue hover:bg-brand-blue-dark">
                  Inquiry Now
                </Button>
                <Button
                  size="xl"
                  variant="secondary-hero"
                  asChild
                  className="bg-white/90 backdrop-blur-sm border-slate-200 hover:bg-white shadow-xs"
                >
                  <Link href="#pillars">Explore Core Pillars</Link>
                </Button>
              </div>

              {/* Trust Indicators Strip */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {[
                  "Verified Corporate Advisory",
                  "Cross-Border Trade Network",
                  "Full-Stack IT Engineering",
                  "Licensed Global Travel Desk",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-xs font-bold text-ink shadow-2xs backdrop-blur-xs"
                  >
                    <CheckCircle2 className="size-3.5 text-brand-blue" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. CORE PILLARS: Interactive 4-Pillar Solutions Grid
      ───────────────────────────────────────────────────────────── */}
      <section id="pillars" className="section-y bg-white border-t border-slate-100 scroll-mt-20">
        <div className="container-page">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="bg-brand-blue-light text-brand-blue rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
              Our Core Architecture
            </span>
            <h2 className="text-ink text-3xl font-extrabold tracking-tight sm:text-4xl">
              Four Comprehensive Strategic Divisions
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Explore how Miracle International coordinates specialized capabilities across business, technology, tourism, and global trade.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CORE_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="group relative flex cursor-pointer flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-blue/40 hover:shadow-lift overflow-hidden has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring"
                >
                  <div
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute inset-0 bg-gradient-to-b opacity-0 transition-opacity duration-300 group-hover:opacity-100 -z-0",
                      pillar.gradient,
                    )}
                  />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="bg-brand-blue-light text-brand-blue inline-flex size-12 items-center justify-center rounded-2xl shadow-xs transition-transform group-hover:scale-110">
                        <Icon className="size-6" />
                      </span>
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-muted-foreground">
                        {pillar.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-ink text-xl font-bold group-hover:text-brand-blue transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-muted-foreground mt-2 text-xs sm:text-sm leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>

                    <ul className="space-y-2 pt-2 border-t border-slate-100">
                      {pillar.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-ink font-medium">
                          <CheckCircle2 className="size-3.5 text-brand-blue mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <Link
                      href={pillar.href}
                      className="text-brand-blue inline-flex items-center gap-1.5 text-xs font-bold transition-all group-hover:gap-2.5 outline-none after:absolute after:inset-0"
                    >
                      Explore {pillar.title}
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. IN-DEPTH SUMMARY: Business Solutions
      ───────────────────────────────────────────────────────────── */}
      <section className="section-y bg-white border-t border-slate-100">
        <div className="container-page grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-6 lg:col-span-6">
            <span className="bg-brand-blue-light text-brand-blue rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider">
              Business Solutions
            </span>
            <h2 className="text-ink text-3xl font-extrabold tracking-tight sm:text-4xl">
              Turn Business Visions Into Practical, Scalable Operations.
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Whether you are launching a new startup, structuring a business plan, sourcing machinery, or scaling into new territories, our business specialists guide you through every milestone.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { title: "Start a Business", desc: "Entity setup & registrations", href: ROUTES.public.businessStart },
                { title: "Business Consultation", desc: "Strategic feasibility & planning", href: ROUTES.public.businessConsultation },
                { title: "Business Planning", desc: "Financial & operational models", href: ROUTES.public.businessPlanning },
                { title: "Machinery & Equipment", desc: "Industrial sourcing & supply", href: ROUTES.public.businessMachinery },
                { title: "Setup Support", desc: "Turnkey operational launching", href: ROUTES.public.businessSetup },
                { title: "Business Expansion", desc: "Scaling and market entry", href: ROUTES.public.businessExpansion },
              ].map((sub) => (
                <Link
                  key={sub.title}
                  href={sub.href}
                  className="group rounded-xl border border-slate-200/80 bg-slate-50/50 p-3 transition-all hover:bg-brand-blue-light/30 hover:border-brand-blue/30"
                >
                  <p className="text-ink text-xs sm:text-sm font-bold group-hover:text-brand-blue transition-colors flex items-center justify-between">
                    {sub.title}
                    <ChevronRight className="size-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                  <p className="text-muted-foreground text-[11px] mt-0.5">{sub.desc}</p>
                </Link>
              ))}
            </div>

            <Button asChild size="lg" className="mt-4">
              <Link href={ROUTES.public.businessSolutions}>
                Explore All Business Solutions
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <div className="relative lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-slate-200 shadow-xl">
              <Image
                src={SITE_MEDIA.businessSolutions.partnership.src}
                alt={SITE_MEDIA.businessSolutions.partnership.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="from-navy/70 via-transparent to-transparent absolute inset-0 bg-gradient-to-t" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-blue-muted">
                  Strategic Advisory
                </span>
                <p className="text-lg font-bold mt-1">Structured Support at Every Growth Phase</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. IN-DEPTH SUMMARY: IT & Digital Solutions
      ───────────────────────────────────────────────────────────── */}
      <section className="section-y bg-white border-t border-slate-100">
        <div className="container-page grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="order-2 lg:order-1 relative lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-slate-200 shadow-xl">
              <Image
                src={SITE_MEDIA.itSolutions.overview.src}
                alt={SITE_MEDIA.itSolutions.overview.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="from-navy/70 via-transparent to-transparent absolute inset-0 bg-gradient-to-t" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-blue-muted">
                  Technology Engineering
                </span>
                <p className="text-lg font-bold mt-1">Modern Digital Systems for Real Workflows</p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-6 lg:col-span-6">
            <span className="bg-indigo-100 text-indigo-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider">
              IT &amp; Digital Solutions
            </span>
            <h2 className="text-ink text-3xl font-extrabold tracking-tight sm:text-4xl">
              Engineering Modern Software, Web &amp; Management Systems.
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              We build practical digital applications, websites, POS software, and workflow automation systems tailored to streamline business operations and boost customer engagement.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { title: "Website Development", desc: "Responsive, high-speed portals", href: ROUTES.public.websiteDevelopment },
                { title: "Software Development", desc: "Custom cloud & enterprise apps", href: ROUTES.public.softwareDevelopment },
                { title: "POS Systems", desc: "Point of sale & inventory software", href: ROUTES.public.posSystemDevelopment },
                { title: "Management Systems", desc: "Connected business ERP & BMS", href: ROUTES.public.businessManagementSystems },
                { title: "Digital Solutions", desc: "Modern digital tools & APIs", href: ROUTES.public.digitalSolutions },
                { title: "Business Automation", desc: "Workflow reduction & AI tools", href: ROUTES.public.businessAutomation },
              ].map((sub) => (
                <Link
                  key={sub.title}
                  href={sub.href}
                  className="group rounded-xl border border-slate-200/80 bg-white p-3 transition-all hover:bg-indigo-50/50 hover:border-indigo-300"
                >
                  <p className="text-ink text-xs sm:text-sm font-bold group-hover:text-indigo-600 transition-colors flex items-center justify-between">
                    {sub.title}
                    <ChevronRight className="size-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                  <p className="text-muted-foreground text-[11px] mt-0.5">{sub.desc}</p>
                </Link>
              ))}
            </div>

            <Button asChild size="lg" className="mt-4">
              <Link href={ROUTES.public.itSolutions}>
                Explore All IT Solutions
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. IN-DEPTH SUMMARY: Travel & Tourism
      ───────────────────────────────────────────────────────────── */}
      <section className="section-y bg-white border-t border-slate-100">
        <div className="container-page grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-6 lg:col-span-6">
            <span className="bg-sky-100 text-sky-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider">
              Travel &amp; Tourism Desk
            </span>
            <h2 className="text-ink text-3xl font-extrabold tracking-tight sm:text-4xl">
              Curated Inbound Sri Lanka &amp; International Outbound Journeys.
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Experience hand-crafted holiday itineraries, private luxury transport, certified guides, flight ticketing, and visa support for international visitors and outbound travelers alike.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { title: "Inbound Sri Lanka", desc: "Heritage, safari, beaches & hills", href: ROUTES.public.inboundTravel },
                { title: "Outbound Travel", desc: "Dubai, Maldives, Singapore & more", href: ROUTES.public.outboundTravel },
                { title: "Visa Assistance", desc: "Tourist & ETA documentation", href: ROUTES.public.visaServices },
                { title: "Flight Tickets", desc: "Competitive airline ticketing", href: ROUTES.public.flightTickets },
                { title: "Work Visa Support", desc: "Corporate & work permit advice", href: ROUTES.public.workVisa },
              ].map((sub) => (

                <Link
                  key={sub.title}
                  href={sub.href}
                  className="group rounded-xl border border-slate-200/80 bg-slate-50/50 p-3 transition-all hover:bg-sky-50/60 hover:border-sky-300"
                >
                  <p className="text-ink text-xs sm:text-sm font-bold group-hover:text-sky-700 transition-colors flex items-center justify-between">
                    {sub.title}
                    <ChevronRight className="size-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                  <p className="text-muted-foreground text-[11px] mt-0.5">{sub.desc}</p>
                </Link>
              ))}
            </div>

            <Button asChild size="lg" className="mt-4">
              <Link href={ROUTES.public.travelTourism}>
                Explore Travel Packages &amp; Services
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <div className="relative lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-slate-200 shadow-xl">
              <Image
                src={SITE_MEDIA.travelDestinations.sigiriya.src}
                alt={SITE_MEDIA.travelDestinations.sigiriya.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="from-navy/70 via-transparent to-transparent absolute inset-0 bg-gradient-to-t" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-blue-muted">
                  Curated Travel Experiences
                </span>
                <p className="text-lg font-bold mt-1">Authentic Destinations, Professional Concierge</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. IN-DEPTH SUMMARY: Global Trade, Franchise & Investment
      ───────────────────────────────────────────────────────────── */}
      <section className="section-y bg-white border-t border-slate-100">
        <div className="container-page space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="bg-emerald-100 text-emerald-700 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
              Cross-Border Commerce
            </span>
            <h2 className="text-ink text-3xl font-extrabold tracking-tight sm:text-4xl">
              Trade Operations, Franchise &amp; Strategic Ventures
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Unlock strategic market expansion through structured trading agreements, international import/export clearance, turnkey franchise setups, and verified investment opportunities.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Card 1: Investment & Franchise */}
            <div className="group rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-soft transition-all duration-300 hover:shadow-lift hover:border-emerald-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="bg-emerald-100 text-emerald-700 inline-flex size-11 items-center justify-center rounded-2xl shadow-xs">
                    <TrendingUp className="size-5.5" />
                  </span>
                  <div>
                    <span className="text-emerald-700 text-xs font-bold uppercase">Ventures</span>
                    <h3 className="text-ink text-xl font-bold">Investment &amp; Franchise Solutions</h3>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Evaluate vetted commercial opportunities, structured equity partnerships, and turnkey franchise business models with full setup guidance.
                </p>
                <ul className="space-y-2 pt-2 border-t border-slate-100 text-xs font-medium text-ink">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-emerald-600" />
                    <span>Commercial project assessment &amp; feasibility</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-emerald-600" />
                    <span>Turnkey franchise brand licensing &amp; setup</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-emerald-600" />
                    <span>Business expansion and partner structuring</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100 flex gap-3">
                <Button asChild variant="outline" size="default">
                  <Link href={ROUTES.public.servicesInvestment}>Investment</Link>
                </Button>
                <Button asChild variant="outline" size="default">
                  <Link href={ROUTES.public.servicesFranchise}>Franchise</Link>
                </Button>
              </div>
            </div>

            {/* Card 2: International Trading & Import/Export */}
            <div className="group rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-soft transition-all duration-300 hover:shadow-lift hover:border-emerald-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="bg-emerald-100 text-emerald-700 inline-flex size-11 items-center justify-center rounded-2xl shadow-xs">
                    <Ship className="size-5.5" />
                  </span>
                  <div>
                    <span className="text-emerald-700 text-xs font-bold uppercase">Global Trade</span>
                    <h3 className="text-ink text-xl font-bold">Trading, Import &amp; Export</h3>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Seamless cross-border trading contracts, custom clearance documentation, freight coordination, and market marketing solutions.
                </p>
                <ul className="space-y-2 pt-2 border-t border-slate-100 text-xs font-medium text-ink">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-emerald-600" />
                    <span>International buyer &amp; supplier contract mediation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-emerald-600" />
                    <span>Customs clearance &amp; compliance documentation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-emerald-600" />
                    <span>Brand marketing &amp; advertising visibility</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100 flex gap-3">
                <Button asChild variant="outline" size="default">
                  <Link href={ROUTES.public.servicesTrading}>Trading Services</Link>
                </Button>
                <Button asChild variant="outline" size="default">
                  <Link href={ROUTES.public.servicesImportExport}>Import &amp; Export</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. VALUE PROPOSITIONS: Why Work With Miracle International
      ───────────────────────────────────────────────────────────── */}
      <section className="section-y bg-white border-t border-slate-100">
        <div className="container-page">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="bg-brand-red/10 text-brand-red rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
              The Miracle Advantage
            </span>
            <h2 className="text-ink text-3xl font-extrabold tracking-tight sm:text-4xl">
              Why Partner With Miracle International?
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              We combine multi-sector capabilities under one roof so you experience seamless coordination without fragmented vendors.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUE_PILLARS.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="rounded-3xl border border-slate-200/80 bg-slate-50/50 p-6 shadow-xs hover:bg-white hover:border-brand-blue/30 hover:shadow-soft transition-all"
                >
                  <span className="bg-brand-blue text-white inline-flex size-11 items-center justify-center rounded-2xl shadow-xs">
                    <Icon className="size-5.5" />
                  </span>
                  <h3 className="text-ink text-lg font-bold mt-4">{val.title}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm mt-2 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. HOW IT WORKS: Executive 5-Step Process Timeline
      ───────────────────────────────────────────────────────────── */}
      <section className="section-y relative isolate overflow-hidden bg-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -left-40 -z-10 size-96 rounded-full bg-brand-blue/20 blur-[120px]"
        />

        <div className="container-page">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="bg-brand-blue-light text-brand-blue rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
              A Clear Path Forward
            </span>
            <h2 className="text-ink text-3xl font-extrabold tracking-tight sm:text-4xl">
              How We Work With You
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              A streamlined, transparent five-step process from your initial inquiry to final delivery.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-5">
            {PROCESS_STEPS.map((item, index) => (
              <div
                key={item.step}
                className="relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition-all hover:border-brand-blue/25 hover:shadow-lift"
              >
                <div>
                  <span className="text-brand-blue font-extrabold text-sm tracking-wider">
                    STEP {item.step}
                  </span>
                  <h3 className="text-ink text-base font-bold mt-2.5">{item.title}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mt-2">
                    {item.description}
                  </p>
                </div>
                {index < PROCESS_STEPS.length - 1 ? (
                  <div
                    aria-hidden="true"
                    className="text-brand-blue/60 hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20"
                  >
                    <ChevronRight className="size-5" />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          10. CONTACT STRIP & EXECUTIVE SUPPORT
      ───────────────────────────────────────────────────────────── */}
      <section className="section-y bg-white border-t border-slate-100">
        <div className="container-page grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="space-y-6 lg:col-span-7">
            <div>
              <span className="text-brand-red text-xs font-bold tracking-wider uppercase">
                Let&apos;s Connect
              </span>
              <h2 className="text-ink text-3xl font-extrabold tracking-tight sm:text-4xl mt-2">
                Ready to Discuss Your Next Step?
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base mt-2 leading-relaxed">
                Contact our client support desk directly or visit our office for a personalized consultation.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={`tel:${APP_CONFIG.support.phone.replace(/\s+/g, "")}`}
                className="group flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 transition-colors hover:bg-white hover:border-brand-blue/30"
              >
                <span className="bg-brand-blue-light text-brand-blue size-10 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="size-5" />
                </span>
                <div>
                  <span className="text-muted-foreground block text-[11px] font-semibold">Direct Phone</span>
                  <span className="text-ink text-sm font-bold group-hover:text-brand-blue transition-colors">
                    {APP_CONFIG.support.phone}
                  </span>
                </div>
              </a>

              <a
                href={`mailto:${APP_CONFIG.support.email}`}
                className="group flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 transition-colors hover:bg-white hover:border-brand-blue/30"
              >
                <span className="bg-brand-blue-light text-brand-blue size-10 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="size-5" />
                </span>
                <div>
                  <span className="text-muted-foreground block text-[11px] font-semibold">Email Inquiry</span>
                  <span className="text-ink text-sm font-bold group-hover:text-brand-blue transition-colors">
                    {APP_CONFIG.support.email}
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4">
                <span className="bg-brand-blue-light text-brand-blue size-10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="size-5" />
                </span>
                <div>
                  <span className="text-muted-foreground block text-[11px] font-semibold">Head Office</span>
                  <span className="text-ink text-sm font-bold">{APP_CONFIG.support.address}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4">
                <span className="bg-brand-blue-light text-brand-blue size-10 rounded-xl flex items-center justify-center shrink-0">
                  <Clock3 className="size-5" />
                </span>
                <div>
                  <span className="text-muted-foreground block text-[11px] font-semibold">Business Hours</span>
                  <span className="text-ink text-sm font-bold">{APP_CONFIG.support.hours}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="lg">
                <Link href={ROUTES.public.contact}>
                  Contact Support Desk
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" onClick={openForm}>
                Send Rapid Inquiry
              </Button>
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-slate-200 shadow-xl">
              <Image
                src={SITE_MEDIA.businessMeeting.src}
                alt={SITE_MEDIA.businessMeeting.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="from-navy/70 via-transparent to-transparent absolute inset-0 bg-gradient-to-t" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-blue-muted">
                  Client Collaboration
                </span>
                <p className="text-base sm:text-lg font-bold mt-1">Dedicated Professional Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirement Intake Modal */}
      <RequirementModal open={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
}
