"use client";

import Image from "next/image";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronRight,
  Globe2,
  Handshake,
  MapPin,
  Package,
  Ship,
  ShoppingBag,
  Sparkles,
  Store,
  Truck,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

import type { BreadcrumbItem } from "@/components/common/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SITE_MEDIA } from "@/config/site-media";
import { cn } from "@/lib/utils";

const LOOKING_FOR = [
  {
    title: "I Want to Buy",
    description: "Find products and suppliers for your business.",
    icon: ShoppingBag,
  },
  {
    title: "I Want to Sell",
    description: "Connect your products with potential buyers and markets.",
    icon: Store,
  },
  {
    title: "I Want to Trade Internationally",
    description: "Explore trading opportunities across international markets.",
    icon: Globe2,
  },
  {
    title: "I Need Bulk Supply",
    description: "Source products for wholesale and commercial requirements.",
    icon: Package,
  },
] as const;

const SERVICES = [
  ["Local Trading", "Source and trade products within Sri Lanka.", Store],
  ["International Trading", "Connect products and businesses across international markets.", Globe2],
  ["Product Trading", "Buy, sell and source a wide range of products.", Package],
  ["Wholesale Trading", "Wholesale sourcing and supply for business requirements.", ShoppingBag],
  ["Supplier & Buyer Matching", "Connect suitable suppliers with potential buyers.", Handshake],
  ["Bulk Orders", "Support large-volume product requirements.", Truck],
  ["Commercial Product Supply", "Supply products for businesses, projects and commercial needs.", BriefcaseBusiness],
] as const;


const MAP_MARKERS = [
  ["Suppliers", "18%", "27%"],
  ["Products", "42%", "53%"],
  ["Markets", "72%", "31%"],
  ["Buyers", "78%", "68%"],
] as const;

type RequestForm = {
  fullName: string;
  email: string;
  contactNumber: string;
  whatsappNumber: string;
  requestType: string;
  requirement: string;
  country: string;
  additionalRequirements: string;
  confirmed: boolean;
};

const INITIAL_FORM: RequestForm = {
  fullName: "",
  email: "",
  contactNumber: "",
  whatsappNumber: "",
  requestType: "",
  requirement: "",
  country: "",
  additionalRequirements: "",
  confirmed: false,
};

function TradingRequestModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState<RequestForm>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  function update(field: keyof RequestForm, value: string | boolean) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.fullName || !form.email || !form.contactNumber || !form.requestType || !form.requirement || !form.confirmed) {
      setError("Please complete the required fields and confirm your information.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  function close() {
    setForm(INITIAL_FORM);
    setSubmitted(false);
    setError("");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-labelledby="trading-request-title">
      <div className="bg-popover relative flex max-h-[min(900px,calc(100vh-2rem))] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-slate-200/80 shadow-2xl">
        <button type="button" onClick={close} aria-label="Close trading request" className="text-muted-foreground hover:bg-slate-100 hover:text-ink absolute top-5 right-5 z-10 inline-flex size-9 items-center justify-center rounded-full transition-colors">
          <X className="size-5" />
        </button>
        {submitted ? (
          <div className="flex min-h-[430px] flex-col items-center justify-center px-6 py-16 text-center sm:px-14">
            <span className="bg-blue-50 text-blue-600 inline-flex size-16 items-center justify-center rounded-2xl shadow-sm"><Check className="size-8" /></span>
            <h2 id="trading-request-title" className="text-slate-900 mt-7 text-3xl font-extrabold tracking-tight">Request Submitted Successfully</h2>
            <p className="text-slate-600 mt-4 max-w-md leading-relaxed text-sm">Our trade specialists will review your requirement and connect with you shortly.</p>
            <Button size="lg" onClick={close} className="mt-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl">Done</Button>
          </div>
        ) : (
          <>
            <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-blue-50/20 px-6 py-6 pr-16 sm:px-8">
              <span className="bg-blue-50 text-blue-700 border border-blue-200/60 inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-bold uppercase tracking-wider">
                Miracle Trading Desk
              </span>
              <h2 id="trading-request-title" className="text-slate-900 mt-2 text-2xl font-extrabold sm:text-3xl">Trading Request</h2>
              <p className="text-slate-600 mt-1 max-w-xl text-xs sm:text-sm leading-relaxed">Tell us what you need and our trade team will help coordinate the right commercial solution.</p>
            </div>
            <form onSubmit={submit} className="public-form-scrollbar overflow-y-auto px-6 py-6 sm:px-8" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full Name" required value={form.fullName} onChange={(value) => update("fullName", value)} placeholder="Your full name" />
                <Field label="Email Address" required type="email" value={form.email} onChange={(value) => update("email", value)} placeholder="you@example.com" />
                <Field label="Contact Number" required type="tel" value={form.contactNumber} onChange={(value) => update("contactNumber", value)} placeholder="Your phone number" />
                <Field label="WhatsApp Number" optional value={form.whatsappNumber} onChange={(value) => update("whatsappNumber", value)} placeholder="Your WhatsApp number" />
              </div>
              <fieldset className="mt-6">
                <legend className="text-slate-900 text-xs font-bold uppercase tracking-wider">What Are You Looking For? <span className="text-red-500">*</span></legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {["Product", "Supplier", "Buyer", "Wholesale Supply", "Bulk Order", "Commercial Product Supply", "Other"].map((option) => (
                    <label key={option} className={cn("border-slate-200 hover:border-blue-500 flex cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition-colors", form.requestType === option && "border-blue-600 bg-blue-50/50 text-blue-700 font-bold")}>
                      <input type="radio" name="requestType" value={option} checked={form.requestType === option} onChange={(event) => update("requestType", event.target.value)} className="accent-blue-600" />
                      {option}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="text-slate-900 text-xs font-bold uppercase tracking-wider sm:col-span-2">Product / Business Requirement <span className="text-red-500">*</span><Textarea value={form.requirement} onChange={(event) => update("requirement", event.target.value)} placeholder="Describe the product, supplier, buyer or opportunity..." className="mt-2 text-sm rounded-xl" rows={4} /></label>
                <Field label="Target Country / Market" optional value={form.country} onChange={(value) => update("country", value)} placeholder="e.g. Sri Lanka, UAE, Global" />
                <label className="text-slate-900 text-xs font-bold uppercase tracking-wider sm:col-span-2">Additional Requirements <span className="text-muted-foreground font-normal lowercase">(optional)</span><Textarea value={form.additionalRequirements} onChange={(event) => update("additionalRequirements", event.target.value)} placeholder="Volume specifications, delivery timeline, or compliance details..." className="mt-2 text-sm rounded-xl" rows={3} /></label>
              </div>
              <label className="border-slate-200 bg-slate-50/60 hover:bg-blue-50/30 mt-6 block cursor-pointer rounded-2xl border border-dashed p-4 text-xs font-semibold text-slate-800 transition-colors">Optional Document Upload <span className="text-muted-foreground font-normal">(specifications, catalogs, RFQs)</span><Input type="file" multiple className="mt-2 block h-auto cursor-pointer border-0 p-0 text-xs shadow-none" /></label>
              <label className="text-slate-700 mt-6 flex items-start gap-2.5 text-xs"><input type="checkbox" checked={form.confirmed} onChange={(event) => update("confirmed", event.target.checked)} className="accent-blue-600 mt-0.5 size-4 rounded" /><span>I confirm that the information provided is accurate. <span className="text-red-500">*</span></span></label>
              {error && <p className="text-red-600 mt-4 text-xs font-bold" role="alert">{error}</p>}
              <Button type="submit" size="xl" className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm">Submit Trading Request <ArrowRight className="size-4.5" /></Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", required = false, optional = false }: { label: string; value: string; onChange: (value: string) => void; placeholder: string; type?: string; required?: boolean; optional?: boolean }) {
  return <label className="text-slate-900 text-xs font-bold uppercase tracking-wider">{label} {required && <span className="text-red-500">*</span>}{optional && <span className="text-muted-foreground font-normal lowercase">(optional)</span>}<Input type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="mt-2 text-sm rounded-xl" /></label>;
}

export function TradingLanding({
  breadcrumbs = [{ label: "Trading Solutions" }],
}: {
  breadcrumbs?: readonly BreadcrumbItem[];
} = {}) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <main className="bg-white">
        {/* ── 1. Hero Section: Full-Width Panoramic Hero with Left Overlay ── */}
        <section className="public-hero">
          {/* Full-Bleed Panoramic Hero Image */}
          <div
            aria-hidden="true"
            className="public-hero-media bg-cover bg-no-repeat"
            style={{
              backgroundImage: 'url("/images/services/trading-hero.jpg")',
              backgroundPosition: "right center",
            }}
          />

          {/* Soft-White Gradient on Left Area */}
          <div
            aria-hidden="true"
            className="public-hero-haze"
          />

          {/* Bottom Gradient Fade */}
          <div
            aria-hidden="true"
            className="public-hero-fade"
          />

          {/* Left-Aligned Content Container */}
          <div className="container-page public-hero-content">
            <div className="public-hero-copy">
              <div className="public-hero-badge">
                <span className="size-2 rounded-full bg-blue-600 ring-4 ring-blue-100" />
                <span>Global Trade &amp; Commodity Sourcing</span>
              </div>

              <h1 className="public-hero-title">
                Smarter Trading.<br />
                For <span className="bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">Products, Suppliers</span><br />
                <span className="bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">&amp; Global Markets.</span>
              </h1>

              <p className="public-hero-description">
                Miracle International connects businesses, verified suppliers, and buyers through structured <strong className="font-semibold text-slate-900">Local &amp; International Trade</strong> agreements, verified <strong className="font-semibold text-slate-900">Product Sourcing</strong>, and end-to-end commercial fulfillment.
              </p>

              <div className="public-hero-actions">
                <Button
                  size="xl"
                  onClick={() => setIsFormOpen(true)}
                  variant="accent"
                  className="shadow-md"
                >
                  <span>Inquiry Now</span>
                </Button>
                <Button
                  size="xl"
                  variant="secondary-hero"
                  asChild
                >
                  <a href="#services">Explore Trading Services</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. What Are You Looking For? ── */}
        <section className="section-y bg-white border-b border-slate-200/70" aria-labelledby="looking-heading">
          <div className="container-page space-y-12">
            <div className="mx-auto max-w-2xl text-center space-y-3">
              <span className="bg-blue-50 text-blue-700 border border-blue-200/50 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
                Start With Your Goal
              </span>
              <h2 id="looking-heading" className="text-slate-900 text-3xl sm:text-4xl font-extrabold tracking-tight">
                What Are You Looking For?
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Choose your requirement and explore tailored trading pathways with our specialists.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {LOOKING_FOR.map(({ title, description, icon: Icon }) => (
                <button
                  key={title}
                  type="button"
                  onClick={() => setIsFormOpen(true)}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 text-left transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:border-brand-blue hover:shadow-[0_12px_30px_rgba(15,23,42,0.14)] cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <span className="bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white inline-flex size-12 items-center justify-center rounded-2xl shadow-xs transition-colors duration-300">
                      <Icon className="size-6 transition-transform group-hover:scale-110" />
                    </span>
                    <h3 className="text-slate-900 mt-6 text-lg font-bold group-hover:text-blue-600 transition-colors">
                      {title}
                    </h3>
                    <p className="text-slate-600 mt-2 text-xs sm:text-sm leading-relaxed">
                      {description}
                    </p>
                  </div>
                  <span className="text-blue-600 mt-6 inline-flex items-center gap-1.5 text-xs font-bold group-hover:gap-2.5 transition-all">
                    Start here <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. Our Trading Services ── */}
        <section id="services" className="section-y scroll-mt-20 bg-slate-50/50 border-b border-slate-200/70" aria-labelledby="services-heading">
          <div className="container-page space-y-12">
            <div className="max-w-2xl space-y-3">
              <span className="bg-blue-50 text-blue-700 border border-blue-200/50 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
                Flexible Support
              </span>
              <h2 id="services-heading" className="text-slate-900 text-3xl sm:text-4xl font-extrabold tracking-tight">
                Our Trading Capabilities
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Comprehensive trading solutions for commercial procurement, wholesale supply, and international market expansion.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map(([title, description, Icon]) => (
                <article
                  key={title as string}
                  className="rounded-2xl public-card-clickable p-6"
                >
                  <span className="bg-blue-50 text-blue-600 inline-flex size-11 items-center justify-center rounded-2xl shadow-2xs">
                    <Icon className="size-5.5" />
                  </span>
                  <h3 className="text-slate-900 mt-5 text-base font-bold">{title as string}</h3>
                  <p className="text-slate-600 mt-2 text-xs sm:text-sm leading-relaxed">{description as string}</p>
                </article>
              ))}
            </div>
          </div>
        </section>


        {/* ── 5. Connected Trade Network ── */}
        <section className="section-y bg-slate-50/50 border-b border-slate-200/70" aria-labelledby="global-heading">
          <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="space-y-4">
              <span className="bg-blue-50 text-blue-700 border border-blue-200/50 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
                One Connected Network
              </span>
              <h2 id="global-heading" className="text-slate-900 text-3xl sm:text-4xl font-extrabold tracking-tight">
                Connecting Businesses Beyond Borders
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                From a local supplier match to a complex cross-border procurement agreement, we bring verified stakeholders and markets together.
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                {["Suppliers", "Buyers", "Products", "Markets", "International Trade"].map((label) => (
                  <span key={label} className="border border-slate-200 bg-white text-slate-700 shadow-2xs inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold">
                    <MapPin className="size-3.5 text-blue-600" />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative min-h-[320px] overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-soft">
              <svg aria-hidden="true" viewBox="0 0 800 360" className="absolute inset-0 h-full w-full">
                <path d="M110 160 C270 35 460 50 680 175" fill="none" stroke="#2563eb" strokeDasharray="8 10" strokeWidth="2" />
                <path d="M120 210 C300 310 520 280 700 125" fill="none" stroke="#4f46e5" strokeOpacity=".35" strokeWidth="2" />
                <path d="M220 100 C350 190 490 170 610 245" fill="none" stroke="#2563eb" strokeOpacity=".4" strokeWidth="2" />
              </svg>
              {MAP_MARKERS.map(([label, left, top]) => (
                <div key={label} className="absolute" style={{ left, top }}>
                  <span className="bg-blue-600 block size-3 rounded-full border-2 border-white shadow-md" />
                  <span className="text-slate-800 mt-1 block -translate-x-1/4 text-xs font-bold">{label}</span>
                </div>
              ))}
              <div className="absolute right-5 bottom-5 rounded-2xl bg-white/95 px-4 py-2.5 text-xs font-bold text-slate-800 shadow-md border border-slate-100 backdrop-blur-sm">
                <Users className="mr-1.5 inline size-4 text-blue-600" />
                Connected Global Trade Desk
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. Bottom CTA Card ── */}
        <section className="section-y bg-white">
          <div className="container-page">
            <div className="relative isolate overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-soft">
              <div className="grid items-center gap-8 lg:grid-cols-12">
                <div className="space-y-4 lg:col-span-8">
                  <span className="bg-brand-blue-light text-brand-blue rounded-full px-3 py-0.5 text-xs font-bold uppercase tracking-wider">
                    Start Trading
                  </span>
                  <h2 className="text-slate-900 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                    Looking for a Product, Supplier or Buyer?
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                    Share your requirements with our trade specialists and let us coordinate the ideal sourcing, negotiation, and delivery solution.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row lg:flex-col lg:items-end justify-center gap-3 lg:col-span-4">
                  <Button
                    size="xl"
                    onClick={() => setIsFormOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm gap-2 w-full sm:w-auto"
                  >
                    <span>Start Trading Request</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <TradingRequestModal open={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  );
}
