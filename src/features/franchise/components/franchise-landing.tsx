"use client";

import Image from "next/image";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  FileUp,
  Handshake,
  Lightbulb,
  MapPin,
  PackageCheck,
  Sparkles,
  Store,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

import type { BreadcrumbItem } from "@/components/common/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SITE_MEDIA } from "@/config/site-media";

const SUPPORT_OPTIONS = [
  ["01", "Find a Franchise", "Explore franchise business opportunities that match your interests and goals.", SearchIcon],
  ["02", "Start a Franchise", "Get guidance and support to plan and set up your franchise business.", Store],
  ["03", "Product & Supply Support", "Source products, equipment and supplies required for your franchise.", PackageCheck],
  ["04", "Grow Your Franchise", "Get ongoing support for supply, distribution and business operations.", TrendingIcon],
] as const;

const OPPORTUNITIES = [
  ["Food & Beverage", "Explore opportunities around food service, products and hospitality.", SITE_MEDIA.franchise.foodBeverage],
  ["Retail", "Build a customer-facing business with practical retail support.", SITE_MEDIA.franchise.retail],
  ["Education", "Consider learning, training and education-focused business models.", SITE_MEDIA.franchise.education],
  ["Services", "Explore service businesses built around useful customer solutions.", SITE_MEDIA.franchise.services],
  ["Technology", "Discover technology-led concepts for modern business needs.", SITE_MEDIA.franchise.technology],
  ["Other Business Opportunities", "Tell us what kind of opportunity you are looking for.", SITE_MEDIA.franchise.otherOpportunities],
] as const;

const JOURNEY = [
  ["01", "Choose Your Opportunity", "Explore and identify a franchise business model that matches your goals."],
  ["02", "Review Requirements", "Understand the business, location, investment and operational requirements."],
  ["03", "Business Planning", "Plan your business setup, location and initial requirements."],
  ["04", "Franchise Setup", "Coordinate the setup, equipment, products and other business requirements."],
  ["05", "Launch Your Business", "Prepare your franchise for opening and starting operations."],
  ["06", "Ongoing Support", "Continue receiving support for products, supply, distribution and business needs."],
] as const;

const REQUIREMENTS = [
  ["Initial Investment", "Plan the funds needed for your selected opportunity.", CircleDollarSign],
  ["Suitable Business Location", "Identify a location that fits the business model.", MapPin],
  ["Business Registration", "Prepare the registrations and permissions needed to operate.", ClipboardCheck],
  ["Required Equipment", "Arrange equipment and materials for your setup.", PackageCheck],
  ["Staff / Manpower", "Plan the people and roles needed for daily operations.", Users],
  ["Franchise Agreement", "Review the agreement and responsibilities clearly.", Handshake],
  ["Product & Supply Requirements", "Plan reliable products, materials and replenishment.", Store],
  ["Operational Requirements", "Prepare the systems and routines that support the business.", BriefcaseBusiness],
] as const;

const SETUP_SUPPORT = [
  "Business Selection",
  "Location & Setup Guidance",
  "Equipment & Product Sourcing",
  "Business Setup Assistance",
  "Launch Preparation",
  "Ongoing Business Support",
] as const;

const SUPPLY_FLOW = ["Product Sourcing", "Bulk Supply", "Import / Procurement", "Distribution", "Franchise Outlet"] as const;
const ONGOING_SUPPORT = [
  ["Product Supply", "Keep the products and materials your business needs moving."],
  ["Distribution Support", "Coordinate delivery and replenishment across your operations."],
  ["Business Guidance", "Get practical input as your franchise develops."],
  ["Operational Support", "Access help with the day-to-day needs of your business."],
] as const;

function SearchIcon() {
  return <Lightbulb aria-hidden="true" />;
}

function TrendingIcon() {
  return <ArrowRight aria-hidden="true" />;
}

type FormState = {
  fullName: string;
  email: string;
  contactNumber: string;
  whatsappNumber: string;
  interest: string;
  businessType: string;
  location: string;
  experience: string;
  requirements: string;
  confirmation: boolean;
};

const INITIAL_FORM: FormState = {
  fullName: "",
  email: "",
  contactNumber: "",
  whatsappNumber: "",
  interest: "",
  businessType: "",
  location: "",
  experience: "",
  requirements: "",
  confirmation: false,
};

function SupportModal({
  open,
  onClose,
  initialBusinessType,
  initialInterest,
}: {
  open: boolean;
  onClose: () => void;
  initialBusinessType?: string;
  initialInterest?: string;
}) {
  const [form, setForm] = useState<FormState>(() => ({
    ...INITIAL_FORM,
    businessType: initialBusinessType || "",
    interest: initialInterest || (initialBusinessType ? "Franchise Opportunity" : ""),
  }));
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  function update(field: keyof FormState, value: string | boolean) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.fullName || !form.email || !form.contactNumber || !form.interest || !form.requirements || !form.confirmation) {
      setError("Please complete the required fields and confirm your information.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  function close() {
    setForm(INITIAL_FORM);
    setFiles([]);
    setError("");
    setSubmitted(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/35 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="franchise-modal-title">
      <div className="bg-popover text-popover-foreground relative flex max-h-[calc(100vh-2rem)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl shadow-2xl">
        <button type="button" onClick={close} aria-label="Close franchise support form" className="text-muted-foreground hover:bg-muted hover:text-ink absolute top-5 right-5 z-10 inline-flex size-9 items-center justify-center rounded-full">
          <X className="size-5" />
        </button>
        {submitted ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-16 text-center sm:px-14">
            <span className="bg-brand-blue-light text-brand-blue inline-flex size-16 items-center justify-center rounded-full"><Check className="size-8" /></span>
            <h2 id="franchise-modal-title" className="text-ink mt-7 text-3xl font-extrabold tracking-tight">Request Submitted Successfully</h2>
            <p className="text-muted-foreground mt-4 max-w-md leading-relaxed">Our team will review your requirement and contact you shortly.</p>
            <Button size="lg" onClick={close} className="mt-8">Done</Button>
          </div>
        ) : (
          <>
            <div className="border-b px-6 py-6 pr-16 sm:px-8">
              <p className="text-brand-red text-xs font-bold tracking-[0.18em] uppercase">Miracle International</p>
              <h2 id="franchise-modal-title" className="text-ink mt-2 text-2xl font-extrabold sm:text-3xl">Franchise Support Request</h2>
              <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-relaxed">Tell us about your goals and our team will help you explore the next steps.</p>
            </div>
            <form onSubmit={submit} className="public-form-scrollbar overflow-y-auto px-6 py-6 sm:px-8" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-ink text-sm font-semibold">Full Name *<Input value={form.fullName} onChange={(event) => update("fullName", event.target.value)} placeholder="Your full name" className="mt-2" /></label>
                <label className="text-ink text-sm font-semibold">Email Address *<Input type="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="you@example.com" className="mt-2" /></label>
                <label className="text-ink text-sm font-semibold">Contact Number *<Input value={form.contactNumber} onChange={(event) => update("contactNumber", event.target.value)} placeholder="Your phone number" className="mt-2" /></label>
                <label className="text-ink text-sm font-semibold">WhatsApp Number <span className="text-muted-foreground font-normal">(Optional)</span><Input value={form.whatsappNumber} onChange={(event) => update("whatsappNumber", event.target.value)} placeholder="Your WhatsApp number" className="mt-2" /></label>
                <label className="text-ink text-sm font-semibold sm:col-span-2">What Are You Interested In? *<select value={form.interest} onChange={(event) => update("interest", event.target.value)} className="border-input bg-background text-ink mt-2 flex h-11 w-full rounded-lg border px-3 text-sm"><option value="">Select support type</option>{["Franchise Opportunity", "Franchise Setup", "Franchise Business Model", "Product Supply", "Franchise Distribution", "Ongoing Franchise Support", "Other"].map((option) => <option key={option}>{option}</option>)}</select></label>
                <label className="text-ink text-sm font-semibold">Preferred Business Type<Input value={form.businessType} onChange={(event) => update("businessType", event.target.value)} placeholder="e.g. retail, food, services" className="mt-2" /></label>
                <label className="text-ink text-sm font-semibold">Preferred Location / Country<Input value={form.location} onChange={(event) => update("location", event.target.value)} placeholder="City or country" className="mt-2" /></label>
                <label className="text-ink text-sm font-semibold sm:col-span-2">Business Experience <Input value={form.experience} onChange={(event) => update("experience", event.target.value)} placeholder="Tell us briefly about your experience" className="mt-2" /></label>
              </div>
              <div className="border-input bg-surface mt-6 rounded-xl border border-dashed p-4"><label className="text-ink flex cursor-pointer items-center gap-3 text-sm font-semibold"><FileUp className="text-brand-blue size-5" /><span>Optional Document Upload <Input type="file" multiple onChange={(event) => setFiles(Array.from(event.target.files ?? []))} className="mt-2 block h-auto border-0 p-0 text-xs shadow-none" /></span></label>{files.length > 0 && <p className="text-muted-foreground mt-2 text-xs">{files.length} file{files.length === 1 ? "" : "s"} selected</p>}</div>
              <label className="text-ink mt-6 flex items-start gap-3 text-sm"><input type="checkbox" checked={form.confirmation} onChange={(event) => update("confirmation", event.target.checked)} className="accent-brand-blue mt-0.5 size-4" /><span>I confirm that the information provided is accurate. <span className="text-brand-red">*</span></span></label>
              {error && <p className="text-brand-red mt-4 text-sm font-semibold" role="alert">{error}</p>}
              <Button type="submit" size="xl" className="mt-6 w-full">Submit Franchise Request <ArrowRight data-icon="inline-end" /></Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export function FranchiseLanding({
  breadcrumbs = [{ label: "Franchise Opportunities" }],
}: {
  breadcrumbs?: readonly BreadcrumbItem[];
} = {}) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<string | undefined>(undefined);

  const openOpportunity = (opportunityTitle: string) => {
    setSelectedOpportunity(opportunityTitle);
    setIsFormOpen(true);
  };

  const openForm = () => {
    setSelectedOpportunity(undefined);
    setIsFormOpen(true);
  };

  return (
    <>
      <main>
        {/* ── 1. Hero Section: Full-Width Panoramic Hero with Left Overlay ── */}
        <section className="relative isolate overflow-hidden bg-white border-b border-slate-200/80 min-h-[580px] lg:min-h-[660px] flex items-center">
          {/* Full-Bleed Panoramic Hero Image */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-no-repeat transition-transform duration-1000"
            style={{
              backgroundImage: 'url("/images/services/franchise-hero.jpg")',
              backgroundPosition: "right center",
            }}
          />

          {/* Soft-White Gradient on Left Area */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent lg:from-white/95 lg:via-white/70 lg:to-transparent/10 pointer-events-none"
          />

          {/* Bottom Gradient Fade */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"
          />

          {/* Left-Aligned Content Container */}
          <div className="container-page relative z-10 w-full py-16 sm:py-20 lg:py-24">
            <div className="max-w-2xl space-y-6">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-slate-200/90 bg-white/95 px-4 py-1.5 text-xs font-semibold text-slate-800 shadow-2xs backdrop-blur-sm">
                <span className="size-2 rounded-full bg-blue-600 ring-4 ring-blue-100" />
                <span>Turnkey Franchise &amp; Business Expansion</span>
              </div>

              <h1 className="text-slate-900 text-3xl sm:text-4xl lg:text-[3.25rem] xl:text-[3.75rem] font-extrabold tracking-tight leading-[1.08]">
                Turnkey Solutions.<br />
                For <span className="bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">Franchise Brands</span><br />
                <span className="bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">&amp; Rapid Expansion.</span>
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
                Miracle International provides end-to-end franchise acquisition, retail rollout structuring, supply chain integration, and turnkey operational launch for aspiring business owners and global brand networks.
              </p>

              <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                <Button
                  size="xl"
                  onClick={openForm}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-6 py-3.5 shadow-md inline-flex items-center justify-center transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  <span>Inquiry Now</span>
                </Button>
                <Button
                  size="xl"
                  variant="outline"
                  className="bg-white/95 hover:bg-white text-slate-800 font-semibold border-slate-200/90 rounded-xl px-6 py-3.5 shadow-2xs inline-flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 backdrop-blur-xs"
                  onClick={openForm}
                >
                  Explore Franchise Models
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="section-y bg-white"><div className="container-page grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"><div className="relative min-h-[280px] overflow-hidden rounded-3xl"><Image src={SITE_MEDIA.franchise.journey.src} alt={SITE_MEDIA.franchise.journey.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" /></div><div className="max-w-xl"><p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">A clearer way forward</p><h2 className="text-ink mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Your Franchise Journey Starts Here</h2><p className="text-muted-foreground mt-5 text-lg leading-relaxed">Whether you are looking to start a new franchise business, expand an existing business or need support with franchise operations, Miracle International helps you navigate the process with practical business solutions.</p></div></div></section>

        <section className="section-y bg-surface"><div className="container-page"><div className="max-w-2xl"><p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">Choose your next step</p><h2 className="text-ink mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">How Can We Help You?</h2><p className="text-muted-foreground mt-4 text-lg">Choose the type of franchise support you need.</p></div><div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{SUPPORT_OPTIONS.map(([number, title, description, Icon]) => <button type="button" key={title} onClick={openForm} className="group text-left"><article className="h-full rounded-2xl public-card-clickable p-6"><div className="flex items-center justify-between"><span className="text-brand-red text-sm font-bold">{number}</span><Icon className="text-brand-blue size-7 transition-transform group-hover:scale-110" /></div><h3 className="text-ink mt-10 text-xl font-bold">{title}</h3><p className="text-muted-foreground mt-3 text-sm leading-relaxed">{description}</p><span className="text-brand-blue mt-6 inline-flex items-center gap-2 text-sm font-bold">Explore support <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" /></span></article></button>)}</div></div></section>

        <section className="section-y bg-white">
          <div className="container-page">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">Explore by industry</p>
                <h2 className="text-ink mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Franchise Opportunities</h2>
                <p className="text-muted-foreground mt-4 text-lg">Explore business opportunities across different industries.</p>
              </div>
              <button type="button" onClick={openForm} className="text-brand-blue inline-flex items-center gap-2 text-sm font-bold hover:underline">
                Looking for something specific? <ArrowRight className="size-4" />
              </button>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {OPPORTUNITIES.map(([title, description, image]) => (
                <article
                  key={title}
                  onClick={() => openOpportunity(title)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openOpportunity(title);
                    }
                  }}
                  className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:border-brand-blue hover:shadow-[0_12px_30px_rgba(15,23,42,0.14)] flex flex-col"
                  aria-label={`Apply for ${title} franchise opportunity`}
                >
                  <div className="relative aspect-[1.65] overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-ink text-lg font-bold group-hover:text-brand-blue transition-colors">{title}</h3>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{description}</p>
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-brand-blue inline-flex items-center gap-1.5 text-sm font-bold group-hover:underline">
                        Apply Now
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </span>
                      <span className="text-xs font-semibold text-muted-foreground">Franchise Model</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-y bg-white border-t border-slate-100"><div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"><div className="relative min-h-[470px] overflow-hidden rounded-3xl"><Image src={SITE_MEDIA.franchise.opening.src} alt={SITE_MEDIA.franchise.opening.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" /></div><div><p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">A simple customer journey</p><h2 className="text-ink mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">From Idea to Opening Day</h2><p className="text-muted-foreground mt-4 text-lg leading-relaxed">We support you through every important stage of starting your franchise business.</p><div className="relative mt-9 space-y-6 before:absolute before:top-3 before:bottom-3 before:left-[17px] before:w-px before:bg-brand-blue/25">{JOURNEY.map(([number, title, description]) => <div key={number} className="relative flex gap-5"><span className="bg-brand-blue text-white relative z-10 inline-flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold">{number}</span><div><h3 className="text-ink font-bold">{title}</h3><p className="text-muted-foreground mt-1 text-sm leading-relaxed">{description}</p></div></div>)}</div></div></div></section>

        <section className="section-y bg-white"><div className="container-page"><div className="max-w-2xl"><p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">Prepare with confidence</p><h2 className="text-ink mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">What Do You Need to Start?</h2></div><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{REQUIREMENTS.map(([title, description, Icon]) => <article key={title} className="rounded-2xl public-card p-5"><Icon className="text-brand-blue size-6" /><h3 className="text-ink mt-5 text-sm font-bold">{title}</h3><p className="text-muted-foreground mt-2 text-sm leading-relaxed">{description}</p></article>)}</div><p className="text-muted-foreground mt-7 text-sm">Requirements may vary depending on the selected franchise opportunity.</p></div></section>

        <section className="section-y bg-surface"><div className="container-page grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"><div><p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">Hands-on coordination</p><h2 className="text-ink mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Complete Franchise Setup Support</h2><p className="text-muted-foreground mt-5 max-w-xl text-lg leading-relaxed">Miracle International can coordinate relevant business, sourcing and setup requirements so you can move from planning to opening with a clearer path.</p><div className="mt-9 grid gap-3 sm:grid-cols-2">{SETUP_SUPPORT.map((item) => <div key={item} className="flex items-center gap-3 rounded-2xl public-card p-4"><Check className="text-brand-blue size-5 shrink-0" /><span className="text-ink text-sm font-semibold">{item}</span></div>)}</div></div><div className="relative min-h-[390px] overflow-hidden rounded-3xl"><Image src={SITE_MEDIA.distributionCentre.src} alt={SITE_MEDIA.distributionCentre.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" /></div></div></section>

        <section className="section-y bg-white"><div className="container-page"><div className="max-w-2xl"><p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">Connected to our trading network</p><h2 className="text-ink mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Reliable Product Supply for Your Franchise</h2><p className="text-muted-foreground mt-4 text-lg leading-relaxed">Get the products, materials, equipment and commercial supplies required to operate your franchise.</p></div><div className="mt-12 grid gap-3 sm:grid-cols-5">{SUPPLY_FLOW.map((step, index) => <div key={step} className="relative flex items-center gap-3 rounded-2xl public-card p-4 sm:block sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none"><span className="bg-brand-blue-light text-brand-blue inline-flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold">0{index + 1}</span><p className="text-ink text-sm font-bold sm:mt-4">{step}</p>{index < SUPPLY_FLOW.length - 1 && <ArrowRight className="text-brand-blue absolute top-1/2 -right-4 hidden size-5 -translate-y-1/2 sm:block" />}</div>)}</div></div></section>

        <section className="section-y bg-surface"><div className="container-page"><div className="max-w-2xl"><p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">After the launch</p><h2 className="text-ink mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Support Beyond Setup</h2></div><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{ONGOING_SUPPORT.map(([title, description]) => <article key={title} className="rounded-2xl public-card p-6"><Building2 className="text-brand-blue size-7" /><h3 className="text-ink mt-7 font-bold">{title}</h3><p className="text-muted-foreground mt-2 text-sm leading-relaxed">{description}</p></article>)}</div></div></section>

        <section className="section-y bg-white"><div className="container-page relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-14 shadow-soft sm:px-12 lg:py-20"><div className="relative max-w-2xl"><p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">Your next move</p><h2 className="text-ink mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Ready to Explore a Franchise Opportunity?</h2><p className="text-muted-foreground mt-5 max-w-xl text-lg leading-relaxed">Tell us about your goals and requirements, and our team will help you explore the next steps.</p><Button size="xl" onClick={openForm} className="mt-8">Get Franchise Support <ArrowRight data-icon="inline-end" /></Button></div></div></section>
      </main>
      <SupportModal
        key={selectedOpportunity || "general"}
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        initialBusinessType={selectedOpportunity}
        initialInterest={selectedOpportunity ? "Franchise Opportunity" : undefined}
      />
    </>
  );
}
