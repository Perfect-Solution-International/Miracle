"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FileUp,
  Globe2,
  Handshake,
  Megaphone,
  Ship,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

import { Breadcrumb } from "@/components/common/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";

const SERVICES = [
  {
    number: "01",
    title: "Trading Services",
    summary:
      "Connect with products, verified suppliers, and buyers through structured local and international trade agreements.",
    points: [
      "Local & International Trading",
      "Supplier & Buyer Matching",
      "Contract Mediation & Sourcing",
    ],
    href: ROUTES.public.servicesTrading,
    label: "Explore Trading",
    icon: Globe2,
    image: SITE_MEDIA.services.trading,
    featured: true,
  },
  {
    number: "02",
    title: "Franchise Solutions",
    summary:
      "Explore turnkey franchise models with end-to-end guidance for selection, legal setup, supply, and growth.",
    points: [
      "Franchise Brand Acquisition",
      "Operational Setup Support",
      "Supply Chain Coordination",
      "Business Development",
    ],
    href: ROUTES.public.servicesFranchise,
    label: "Explore Franchise",
    icon: Handshake,
    image: SITE_MEDIA.services.franchise,
    featured: false,
  },
  {
    number: "03",
    title: "Import & Export",
    summary:
      "Facilitating cross-border shipments with customs clearance, verified documentation, freight, and logistics support.",
    points: [
      "Import Clearance & Documentation",
      "Export Coordination",
      "Cross-Border Compliance",
      "Freight & Cargo Advisory",
    ],
    href: ROUTES.public.servicesImportExport,
    label: "Explore Import & Export",
    icon: Ship,
    image: SITE_MEDIA.services.importExport,
    featured: false,
  },
  {
    number: "04",
    title: "Investment Opportunities",
    summary:
      "Discover evaluated commercial projects, investment ventures, and strategic equity partnerships with full due diligence.",
    points: [
      "Vetted Investment Projects",
      "Commercial Feasibility Analysis",
      "Strategic Partner Structuring",
      "Ongoing Venture Monitoring",
    ],
    href: ROUTES.public.servicesInvestment,
    label: "Explore Investment",
    icon: TrendingUp,
    image: SITE_MEDIA.services.investment,
    featured: false,
  },
  {
    number: "05",
    title: "Marketing & Advertising",
    summary:
      "Build brand visibility, run targeted social campaigns, and reach international audiences with high-impact creative marketing.",
    points: [
      "Digital Marketing & Strategy",
      "Social Media Management",
      "Brand Positioning & PR",
      "Targeted Advertising Solutions",
    ],
    href: ROUTES.public.servicesMarketingAdvertising,
    label: "Explore Marketing",
    icon: Megaphone,
    image: SITE_MEDIA.services.marketing,
    featured: true,
  },
] as const;

const WHY_US = [
  {
    title: "Global Trade Connections",
    description:
      "Connect with international markets, verified suppliers, buyers, and cross-border commercial opportunities.",
    icon: Globe2,
  },
  {
    title: "Tailored Business Support",
    description:
      "Structured advisory and operations designed around your exact timeline, budget, and business scope.",
    icon: Handshake,
  },
  {
    title: "Integrated Service Platform",
    description:
      "Access trade, franchise, investment, marketing, IT, and travel support through one central team.",
    icon: BarChart3,
  },
  {
    title: "Client-Centric Execution",
    description:
      "Tell us your goal and our multidisciplinary specialists will handle coordination from start to completion.",
    icon: Users,
  },
] as const;

const PROCESS = [
  { step: "01", title: "Submit Requirement", description: "Share your business requirement with our team." },
  { step: "02", title: "Needs Assessment", description: "We analyze scope, feasibility, and the optimal solution." },
  { step: "03", title: "Options & Roadmap", description: "We present verified options, suppliers, or structured models." },
  { step: "04", title: "Coordinated Delivery", description: "Our team manages end-to-end execution and ongoing support." },
] as const;

type FormState = {
  fullName: string;
  email: string;
  contactNumber: string;
  whatsappNumber: string;
  service: string;
  requirement: string;
  location: string;
  additionalInformation: string;
  confirmation: boolean;
};

const INITIAL_FORM: FormState = {
  fullName: "",
  email: "",
  contactNumber: "",
  whatsappNumber: "",
  service: "",
  requirement: "",
  location: "",
  additionalInformation: "",
  confirmation: false,
};

function RequirementModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const update = (field: keyof FormState, value: string | boolean) =>
    setForm((current) => ({ ...current, [field]: value }));

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      !form.fullName ||
      !form.email ||
      !form.contactNumber ||
      !form.service ||
      !form.requirement ||
      !form.confirmation
    ) {
      setError("Please complete the required fields and confirm your information.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  function close() {
    setForm(INITIAL_FORM);
    setFiles([]);
    setSubmitted(false);
    setError("");
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/50 p-3 sm:p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="services-request-title"
    >
      <div className="bg-popover text-popover-foreground relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl shadow-2xl border border-slate-200/80">
        <button
          type="button"
          onClick={close}
          aria-label="Close requirement form"
          className="text-muted-foreground hover:bg-slate-100 hover:text-ink absolute top-5 right-5 z-10 inline-flex size-9 items-center justify-center rounded-full transition-colors"
        >
          <X className="size-5" />
        </button>

        {submitted ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-16 text-center sm:px-14">
            <span className="bg-brand-blue-light text-brand-blue inline-flex size-16 items-center justify-center rounded-2xl shadow-sm">
              <CheckCircle2 className="size-8" />
            </span>
            <h2 id="services-request-title" className="text-ink mt-6 text-2xl font-extrabold sm:text-3xl">
              Request Submitted Successfully
            </h2>
            <p className="text-muted-foreground mt-3 max-w-md text-sm leading-relaxed">
              Thank you for contacting Miracle International. Our team will review your requirement and reach out shortly with structured options.
            </p>
            <Button size="lg" onClick={close} className="mt-7">
              Done
            </Button>
          </div>
        ) : (
          <>
            <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-brand-blue-light/20 px-6 py-5 pr-14 sm:px-8">
              <span className="bg-brand-blue-light text-brand-blue inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="size-3" />
                Miracle Services Desk
              </span>
              <h2 id="services-request-title" className="text-ink mt-2 text-2xl font-extrabold sm:text-3xl">
                Tell Us What You Need
              </h2>
              <p className="text-muted-foreground mt-1 text-xs sm:text-sm leading-relaxed">
                Share your business requirements and we will coordinate the ideal solution.
              </p>
            </div>

            <form onSubmit={submit} className="overflow-y-auto px-6 py-6 sm:px-8 space-y-4" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-ink block text-xs font-bold mb-1.5">
                    Full Name <span className="text-brand-red">*</span>
                  </label>
                  <Input
                    placeholder="Your name"
                    value={form.fullName}
                    onChange={(event) => update("fullName", event.target.value)}
                  />
                </div>
                <div>
                  <label className="text-ink block text-xs font-bold mb-1.5">
                    Email Address <span className="text-brand-red">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={(event) => update("email", event.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-ink block text-xs font-bold mb-1.5">
                    Contact Number <span className="text-brand-red">*</span>
                  </label>
                  <Input
                    type="tel"
                    placeholder="Phone number"
                    value={form.contactNumber}
                    onChange={(event) => update("contactNumber", event.target.value)}
                  />
                </div>
                <div>
                  <label className="text-ink block text-xs font-bold mb-1.5">WhatsApp Number</label>
                  <Input
                    type="tel"
                    placeholder="WhatsApp number"
                    value={form.whatsappNumber}
                    onChange={(event) => update("whatsappNumber", event.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-ink block text-xs font-bold mb-1.5">
                  Service Area <span className="text-brand-red">*</span>
                </label>
                <select
                  value={form.service}
                  onChange={(event) => update("service", event.target.value)}
                  className="border-input bg-background text-ink flex h-10 w-full rounded-xl border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                >
                  <option value="">Select a service</option>
                  {[
                    "Trading Services",
                    "Franchise Solutions",
                    "Import & Export",
                    "Investment Opportunities",
                    "Marketing & Advertising",
                    "Other Business Service",
                  ].map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-ink block text-xs font-bold mb-1.5">
                  Requirement Details <span className="text-brand-red">*</span>
                </label>
                <Textarea
                  value={form.requirement}
                  onChange={(event) => update("requirement", event.target.value)}
                  rows={3}
                  placeholder="Describe your requirement, scope, budget, and targets..."
                />
              </div>

              <div>
                <label className="text-ink block text-xs font-bold mb-1.5">Target Location / Country</label>
                <Input
                  placeholder="e.g. Sri Lanka, UAE, Global"
                  value={form.location}
                  onChange={(event) => update("location", event.target.value)}
                />
              </div>

              <div className="border-input bg-slate-50/70 hover:bg-brand-blue-light/20 rounded-2xl border border-dashed p-3.5 text-xs font-semibold transition-colors">
                <label className="flex cursor-pointer items-center gap-3">
                  <FileUp className="text-brand-blue size-5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-ink block">Upload Reference Documents (Optional)</span>
                    <Input
                      type="file"
                      multiple
                      onChange={(event) => setFiles(Array.from(event.target.files ?? []))}
                      className="hidden"
                    />
                    {files.length > 0 ? (
                      <span className="text-brand-blue font-bold text-xs mt-1 block">
                        {files.length} file{files.length === 1 ? "" : "s"} selected
                      </span>
                    ) : (
                      <span className="text-muted-foreground block text-[11px] font-normal">
                        PDF, DOCX, or images up to 10MB
                      </span>
                    )}
                  </div>
                </label>
              </div>

              <label className="text-ink flex items-start gap-2.5 text-xs">
                <input
                  type="checkbox"
                  checked={form.confirmation}
                  onChange={(event) => update("confirmation", event.target.checked)}
                  className="accent-brand-blue mt-0.5 size-4 rounded"
                />
                <span>
                  I confirm that the information provided is accurate. <span className="text-brand-red">*</span>
                </span>
              </label>

              {error ? (
                <p className="text-brand-red text-xs font-bold" role="alert">
                  {error}
                </p>
              ) : null}

              <Button type="submit" size="xl" className="w-full mt-2">
                Submit Request
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export function ServicesOverview() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const openForm = () => setIsFormOpen(true);

  return (
    <>
      <main>
        {/* ── 1. Hero Section ── */}
        <section className="relative isolate overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/80 pt-8 pb-14 border-b border-slate-200/80 lg:pt-14 lg:pb-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-36 left-1/2 -z-10 h-[500px] w-[750px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-emerald-500/15 via-brand-blue/10 to-teal-500/10 blur-[100px]"
          />
          <div
            aria-hidden="true"
            className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_80%)] opacity-50"
          />

          <div className="container-page grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
            <div className="max-w-2xl space-y-5">
              <Breadcrumb items={[{ label: "Services" }]} />

              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-white/90 px-3.5 py-1.5 text-xs font-bold text-navy shadow-xs backdrop-blur-md">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-600 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-600" />
                </span>
                Cross-Border Services &amp; Trade Operations
              </div>

              <h1 className="text-ink text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Global Trade, Franchise &amp;{" "}
                <span className="bg-gradient-to-r from-emerald-600 via-brand-blue to-navy bg-clip-text text-transparent">
                  Business Services.
                </span>
              </h1>

              <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
                Explore our integrated trade, investment, franchise, and marketing capabilities designed to help businesses connect with international markets and professional solutions.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row pt-2">
                <Button
                  size="xl"
                  variant="accent"
                  className="shadow-lift"
                  onClick={() => document.getElementById("main-services")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Explore All Services
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </Button>
                <Button size="xl" variant="outline" onClick={openForm} className="bg-white/80 backdrop-blur-sm">
                  Tell Us What You Need
                </Button>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-2xl">
              <div className="shadow-2xl relative aspect-[4/3] overflow-hidden rounded-3xl border-4 border-white">
                <Image
                  src={SITE_MEDIA.services.hero.src}
                  alt={SITE_MEDIA.services.hero.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="from-navy/55 via-navy/10 to-transparent absolute inset-0 bg-gradient-to-t"
                />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="bg-white/20 backdrop-blur-md rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase inline-flex items-center gap-1.5 text-white mb-2">
                    <Globe2 className="size-3.5" />
                    Strategic Commerce
                  </span>
                  <p className="text-base sm:text-lg font-bold">
                    Coordinated Cross-Border Business Solutions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. Services Grid ── */}
        <section id="main-services" className="section-y bg-slate-50/70 scroll-mt-24 border-b border-slate-200/70">
          <div className="container-page space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="bg-brand-blue-light text-brand-blue rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
                Our Service Portfolio
              </span>
              <h2 className="text-ink text-3xl font-extrabold tracking-tight sm:text-4xl">
                Dedicated Business &amp; Trade Solutions
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Choose a specialized service to explore structured capabilities and connect with our team.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map(({ number, title, summary, points, href, label, icon: Icon, image, featured }) => (
                <article
                  key={title}
                  className="group flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-blue/40 hover:shadow-lift"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="from-navy/60 via-transparent to-transparent absolute inset-0 bg-gradient-to-t" />
                      <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-navy shadow-xs backdrop-blur-sm">
                        {number}
                      </span>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="bg-brand-blue-light text-brand-blue inline-flex size-11 items-center justify-center rounded-2xl shadow-xs transition-transform group-hover:scale-110">
                          <Icon className="size-5.5" />
                        </span>
                        <h3 className="text-ink text-xl font-bold group-hover:text-brand-blue transition-colors">
                          {title}
                        </h3>
                      </div>

                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                        {summary}
                      </p>

                      <ul className="space-y-2 pt-2 border-t border-slate-100">
                        {points.map((point) => (
                          <li key={point} className="text-ink flex items-center gap-2 text-xs font-medium">
                            <CheckCircle2 className="text-brand-blue size-3.5 shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-slate-100 mt-4">
                    <Link
                      href={href}
                      className="text-brand-blue inline-flex items-center gap-1.5 text-xs font-bold pt-4 transition-all group-hover:gap-2.5"
                    >
                      {label}
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. Why Miracle International ── */}
        <section className="section-y bg-white border-b border-slate-200/70">
          <div className="container-page">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="bg-brand-red/10 text-brand-red rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
                The Miracle Difference
              </span>
              <h2 className="text-ink text-3xl font-extrabold tracking-tight sm:text-4xl">
                Built Around Your Business Goals
              </h2>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {WHY_US.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="rounded-3xl border border-slate-200/80 bg-slate-50/50 p-6 shadow-xs hover:bg-white hover:border-brand-blue/30 hover:shadow-soft transition-all"
                  >
                    <span className="bg-brand-blue text-white inline-flex size-11 items-center justify-center rounded-2xl shadow-xs">
                      <Icon className="size-5.5" />
                    </span>
                    <h3 className="text-ink text-lg font-bold mt-4">{item.title}</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 4. Process ── */}
        <section className="section-y bg-slate-50/70">
          <div className="container-page">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="bg-brand-blue-light text-brand-blue rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
                A Clear Path Forward
              </span>
              <h2 className="text-ink text-3xl font-extrabold tracking-tight sm:text-4xl">
                How We Deliver Results
              </h2>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((item) => (
                <article
                  key={item.step}
                  className="relative rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs"
                >
                  <span className="bg-brand-blue text-white inline-flex size-8 items-center justify-center rounded-full text-xs font-bold shadow-xs">
                    {item.step}
                  </span>
                  <h3 className="text-ink text-base font-bold mt-3">{item.title}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. Action Card ── */}
        <section className="section-y bg-gradient-to-b from-slate-50 to-white">
          <div className="container-page">
            <div className="relative isolate overflow-hidden rounded-3xl border border-brand-blue/20 bg-gradient-to-r from-brand-blue-light/40 via-white to-brand-blue-light/30 p-8 sm:p-12 shadow-lift">
              <div className="grid items-center gap-8 lg:grid-cols-12">
                <div className="space-y-4 lg:col-span-8">
                  <span className="bg-brand-blue text-white rounded-full px-3 py-0.5 text-xs font-bold uppercase tracking-wider">
                    Start a Conversation
                  </span>
                  <h2 className="text-ink text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                    Have a Business Requirement in Mind?
                  </h2>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl">
                    Whether you are seeking trading mediation, a turnkey franchise model, import/export clearance, or strategic investment options, share your needs with our specialists.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row lg:flex-col lg:items-end justify-center gap-3 lg:col-span-4">
                  <Button size="xl" onClick={openForm} className="shadow-lift gap-2 w-full sm:w-auto">
                    <Sparkles className="size-4.5" />
                    Tell Us What You Need
                    <ArrowRight data-icon="inline-end" aria-hidden="true" />
                  </Button>
                  <Button size="lg" variant="outline" asChild className="bg-white/90">
                    <Link href={ROUTES.public.contact}>Talk to Our Advisors</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <RequirementModal open={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  );
}