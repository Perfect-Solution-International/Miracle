"use client";

import Image from "next/image";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Globe2,
  Handshake,
  MapPin,
  Package,
  Ship,
  ShoppingBag,
  Store,
  Truck,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

import { Breadcrumb, type BreadcrumbItem } from "@/components/common/breadcrumb";
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

const STEPS = [
  ["Tell Us What You Need", "Share your product, supplier, buyer or trading requirement."],
  ["We Explore Options", "Our team identifies suitable products, suppliers or buyers."],
  ["We Coordinate", "We help coordinate the trading process and requirements."],
  ["Complete the Trade", "Orders, documentation, logistics and delivery are coordinated as required."],
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/25 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="trading-request-title">
      <div className="bg-popover relative flex max-h-[min(900px,calc(100vh-2rem))] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/70 shadow-2xl">
        <button type="button" onClick={close} aria-label="Close trading request" className="text-muted-foreground hover:bg-muted hover:text-ink absolute top-5 right-5 z-10 inline-flex size-9 items-center justify-center rounded-full transition-colors">
          <X className="size-5" />
        </button>
        {submitted ? (
          <div className="flex min-h-[430px] flex-col items-center justify-center px-6 py-16 text-center sm:px-14">
            <span className="bg-brand-blue-light text-brand-blue inline-flex size-16 items-center justify-center rounded-full"><Check className="size-8" /></span>
            <h2 id="trading-request-title" className="text-ink mt-7 text-3xl font-extrabold tracking-tight">Request Submitted Successfully</h2>
            <p className="text-muted-foreground mt-4 max-w-md leading-relaxed">Our team will review your requirement and contact you shortly.</p>
            <Button size="lg" onClick={close} className="mt-8">Done</Button>
          </div>
        ) : (
          <>
            <div className="border-b px-6 py-6 pr-16 sm:px-8">
              <p className="text-brand-red text-xs font-bold tracking-[0.18em] uppercase">Miracle International</p>
              <h2 id="trading-request-title" className="text-ink mt-2 text-2xl font-extrabold sm:text-3xl">Trading Request</h2>
              <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-relaxed">Tell us what you need and our team will help you explore the right trading solution.</p>
            </div>
            <form onSubmit={submit} className="overflow-y-auto px-6 py-6 sm:px-8" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full Name" required value={form.fullName} onChange={(value) => update("fullName", value)} placeholder="Your full name" />
                <Field label="Email Address" required type="email" value={form.email} onChange={(value) => update("email", value)} placeholder="you@example.com" />
                <Field label="Contact Number" required type="tel" value={form.contactNumber} onChange={(value) => update("contactNumber", value)} placeholder="Your phone number" />
                <Field label="WhatsApp Number" optional value={form.whatsappNumber} onChange={(value) => update("whatsappNumber", value)} placeholder="Your WhatsApp number" />
              </div>
              <fieldset className="mt-6">
                <legend className="text-ink text-sm font-semibold">What Are You Looking For? <span className="text-brand-red">*</span></legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {["Product", "Supplier", "Buyer", "Wholesale Supply", "Bulk Order", "Commercial Product Supply", "Other"].map((option) => (
                    <label key={option} className={cn("border-input hover:border-brand-blue flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition-colors", form.requestType === option && "border-brand-blue bg-brand-blue-light text-brand-blue-dark")}>
                      <input type="radio" name="requestType" value={option} checked={form.requestType === option} onChange={(event) => update("requestType", event.target.value)} className="accent-brand-blue" />
                      {option}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="text-ink text-sm font-semibold sm:col-span-2">Product / Business Requirement <span className="text-brand-red">*</span><Textarea value={form.requirement} onChange={(event) => update("requirement", event.target.value)} placeholder="Describe the product, supplier, buyer or opportunity" className="mt-2" rows={4} /></label>
                <Field label="Country" optional value={form.country} onChange={(value) => update("country", value)} placeholder="Country or market" />
                <label className="text-ink text-sm font-semibold sm:col-span-2">Additional Requirements <span className="text-muted-foreground font-normal">(Optional)</span><Textarea value={form.additionalRequirements} onChange={(event) => update("additionalRequirements", event.target.value)} placeholder="Anything else we should know?" className="mt-2" rows={3} /></label>
              </div>
              <label className="border-input bg-surface mt-6 block cursor-pointer rounded-xl border border-dashed p-4 text-sm font-semibold text-ink">Optional Document Upload <span className="text-muted-foreground font-normal">(Optional)</span><Input type="file" multiple className="mt-2 block h-auto cursor-pointer border-0 p-0 text-xs shadow-none" /></label>
              <label className="text-ink mt-6 flex items-start gap-3 text-sm"><input type="checkbox" checked={form.confirmed} onChange={(event) => update("confirmed", event.target.checked)} className="accent-brand-blue mt-0.5 size-4" /><span>I confirm that the information provided is accurate. <span className="text-brand-red">*</span></span></label>
              {error && <p className="text-brand-red mt-4 text-sm font-semibold" role="alert">{error}</p>}
              <Button type="submit" size="xl" className="mt-6 w-full">Submit Trading Request <ArrowRight data-icon="inline-end" /></Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", required = false, optional = false }: { label: string; value: string; onChange: (value: string) => void; placeholder: string; type?: string; required?: boolean; optional?: boolean }) {
  return <label className="text-ink text-sm font-semibold">{label} {required && <span className="text-brand-red">*</span>}{optional && <span className="text-muted-foreground font-normal">(Optional)</span>}<Input type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="mt-2" /></label>;
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
        <section className="overflow-hidden bg-[linear-gradient(120deg,#f8fbff_0%,#ffffff_55%,#f0f6ff_100%)]">
          <div className="container-page grid gap-12 py-16 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:py-24">
            <div className="max-w-2xl">
              <Breadcrumb items={breadcrumbs} />
              <p className="mt-8 text-brand-red text-sm font-bold tracking-[0.18em] uppercase">A clearer way to trade</p>
              <h1 className="text-ink mt-5 max-w-2xl text-5xl leading-[1.02] font-extrabold tracking-tight sm:text-6xl">Trading Solutions for Local &amp; Global Markets</h1>
              <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed sm:text-xl">Connect with suppliers, buyers and products through simple and reliable trading solutions designed for businesses of all sizes.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button size="xl" onClick={() => setIsFormOpen(true)}>Start a Trading Request <ArrowRight data-icon="inline-end" /></Button><Button size="xl" variant="outline" asChild><a href="#services">Explore Trading Services</a></Button></div>
            </div>
            <div className="relative min-h-[360px] overflow-hidden rounded-3xl border border-blue-100 bg-white p-3 shadow-xl shadow-blue-100/60 sm:min-h-[430px]">
              <Image src={SITE_MEDIA.warehouse.src} alt={SITE_MEDIA.warehouse.alt} fill priority sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
              <div className="absolute inset-x-5 bottom-5 flex items-center justify-between rounded-2xl border border-white/70 bg-white/90 p-4 shadow-lg backdrop-blur-sm"><span className="flex items-center gap-2 text-sm font-bold text-brand-blue-dark"><Globe2 className="size-5" /> Local to global connections</span><Ship className="size-6 text-brand-red" /></div>
            </div>
          </div>
        </section>

        <section className="section-y bg-white" aria-labelledby="looking-heading"><div className="container-page"><div className="mx-auto max-w-2xl text-center"><p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">Start with your goal</p><h2 id="looking-heading" className="text-ink mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">What Are You Looking For?</h2><p className="text-muted-foreground mt-4 text-lg">Choose what you need and explore the right trading solution.</p></div><div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{LOOKING_FOR.map(({ title, description, icon: Icon }) => <button key={title} type="button" onClick={() => setIsFormOpen(true)} className="group border-input hover:border-brand-blue hover:shadow-lift rounded-2xl border bg-white p-6 text-left transition-all"><span className="bg-brand-blue-light text-brand-blue group-hover:bg-brand-blue group-hover:text-white inline-flex size-12 items-center justify-center rounded-xl transition-colors"><Icon className="size-6 transition-transform group-hover:scale-110" /></span><h3 className="text-ink mt-7 text-lg font-bold">{title}</h3><p className="text-muted-foreground mt-2 min-h-12 text-sm leading-relaxed">{description}</p><span className="text-brand-blue mt-5 inline-flex items-center gap-1 text-sm font-bold">Start here <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" /></span></button>)}</div></div></section>

        <section id="services" className="section-y scroll-mt-20 bg-surface" aria-labelledby="services-heading"><div className="container-page"><div className="max-w-2xl"><p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">Flexible support</p><h2 id="services-heading" className="text-ink mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">Our Trading Services</h2><p className="text-muted-foreground mt-4 text-lg">Flexible trading solutions for individuals, businesses and commercial requirements.</p></div><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{SERVICES.map(([title, description, Icon]) => <article key={title} className="border-input rounded-2xl border bg-white p-6 shadow-sm"><Icon className="text-brand-blue size-6" /><h3 className="text-ink mt-6 font-bold">{title}</h3><p className="text-muted-foreground mt-2 text-sm leading-relaxed">{description}</p></article>)}</div></div></section>

        <section className="section-y bg-white" aria-labelledby="process-heading"><div className="container-page"><div className="mx-auto max-w-2xl text-center"><p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">Simple from start to finish</p><h2 id="process-heading" className="text-ink mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">How It Works</h2></div><div className="relative mt-14 grid gap-8 md:grid-cols-4 md:gap-5">{STEPS.map(([title, description], index) => <div key={title} className="relative text-center md:px-3"><div className="bg-brand-blue text-white relative z-10 mx-auto flex size-12 items-center justify-center rounded-full text-sm font-bold shadow-lg shadow-blue-200">0{index + 1}</div><h3 className="text-ink mt-5 font-bold">{title}</h3><p className="text-muted-foreground mt-2 text-sm leading-relaxed">{description}</p>{index < STEPS.length - 1 && <span aria-hidden="true" className="bg-brand-blue/25 absolute top-6 left-[calc(50%+32px)] hidden h-px w-[calc(100%-64px)] md:block" />}</div>)}</div></div></section>

        <section className="section-y bg-[#f5f9ff]" aria-labelledby="global-heading"><div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"><div><p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">One connected view</p><h2 id="global-heading" className="text-ink mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">Connecting Businesses Beyond Borders</h2><p className="text-muted-foreground mt-5 max-w-md leading-relaxed">From a local requirement to an international opportunity, we help bring the right people, products and markets together.</p><div className="mt-7 flex flex-wrap gap-2">{["Suppliers", "Buyers", "Products", "Markets", "International Trade"].map((label) => <span key={label} className="border-brand-blue/15 bg-white text-brand-blue-dark inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold"><MapPin className="size-3.5" />{label}</span>)}</div></div><div className="relative min-h-[300px] overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm"><div className="absolute inset-0 opacity-70 [background-image:radial-gradient(#bed4f2_1px,transparent_1px)] [background-size:18px_18px]" /><svg aria-hidden="true" viewBox="0 0 800 360" className="absolute inset-0 h-full w-full"><path d="M110 160 C270 35 460 50 680 175" fill="none" stroke="#2f75c9" strokeDasharray="8 10" strokeWidth="2" /><path d="M120 210 C300 310 520 280 700 125" fill="none" stroke="#d74b4b" strokeOpacity=".45" strokeWidth="2" /><path d="M220 100 C350 190 490 170 610 245" fill="none" stroke="#2f75c9" strokeOpacity=".5" strokeWidth="2" /></svg>{MAP_MARKERS.map(([label, left, top]) => <div key={label} className="absolute" style={{ left, top }}><span className="bg-brand-blue block size-3 rounded-full border-2 border-white shadow-md" /><span className="text-brand-blue-dark mt-1 block -translate-x-1/4 text-xs font-bold">{label}</span></div>)}<div className="absolute right-5 bottom-5 rounded-xl bg-white/90 px-3 py-2 text-xs font-bold text-brand-blue-dark shadow-sm"><Users className="mr-1 inline size-3.5" />Connected trade network</div></div></div></section>

        <section className="section-y bg-brand-blue-light"><div className="container-page flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center"><div><p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">Let&apos;s find the right path</p><h2 className="text-ink mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">Looking for a Product, Supplier or Buyer?</h2><p className="text-muted-foreground mt-4 max-w-2xl text-lg">Tell us what you need and our team will help you explore the right trading solution.</p></div><Button size="xl" onClick={() => setIsFormOpen(true)}>Start Trading Request <ArrowRight data-icon="inline-end" /></Button></div></section>
      </main>
      <TradingRequestModal open={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  );
}