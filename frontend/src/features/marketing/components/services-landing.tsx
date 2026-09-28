"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Check,
  FileUp,
  Globe2,
  Handshake,
  Megaphone,
  Ship,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SITE_MEDIA } from "@/config/site-media";
import { ROUTES } from "@/config/routes";

const SERVICES = [
  {
    number: "01",
    title: "Trading",
    summary: "Connect with products, suppliers and buyers through local and international trading solutions.",
    highlights: ["Local & International Trading", "Supplier & Buyer Matching", "Wholesale & Bulk Supply"],
    href: ROUTES.public.servicesTrading,
    label: "View Trading",
    icon: Globe2,
    image: SITE_MEDIA.services.trading,
  },
  {
    number: "02",
    title: "Franchise",
    summary: "Explore franchise opportunities and receive support for franchise selection, setup and business growth.",
    highlights: ["Franchise Opportunities", "Franchise Setup Support", "Product Supply", "Franchise Support"],
    href: ROUTES.public.servicesFranchise,
    label: "View Franchise",
    icon: Handshake,
    image: SITE_MEDIA.services.franchise,
  },
  {
    number: "03",
    title: "Import & Export",
    summary: "Move products across international markets with sourcing, supplier coordination, shipping and documentation support.",
    highlights: ["Import Requests", "Export Requests", "Global Sourcing", "Shipping Support"],
    href: ROUTES.public.servicesImportExport,
    label: "View Import & Export",
    icon: Ship,
    image: SITE_MEDIA.services.importExport,
  },
  {
    number: "04",
    title: "Investment Opportunities",
    summary: "Explore business opportunities, investment projects and business ideas with practical guidance and professional coordination.",
    highlights: ["Investment Opportunities", "Business Opportunities", "Investment Projects", "Investment Support"],
    href: ROUTES.public.servicesInvestment,
    label: "Explore Investment",
    icon: TrendingUp,
    image: SITE_MEDIA.services.investment,
  },
  {
    number: "05",
    title: "Marketing & Advertising",
    summary: "Build your brand presence and reach the right audience through practical marketing, digital promotion and advertising solutions.",
    highlights: ["Digital Marketing", "Social Media Marketing", "Brand Promotion", "Advertising Solutions"],
    href: ROUTES.public.servicesMarketingAdvertising,
    label: "View Marketing",
    icon: Megaphone,
    image: SITE_MEDIA.services.marketing,
  },
] as const;

const WHY_US = [
  ["Global Business Connections", "Connect with international markets, suppliers, buyers and business opportunities.", Globe2],
  ["Practical Business Support", "Get support based on your specific business requirements.", Handshake],
  ["Multiple Business Solutions", "Access trading, sourcing, franchise, investment and marketing services in one platform.", BarChart3],
  ["Customer-Focused Approach", "Tell us what you need and we help coordinate the relevant solution.", Users],
] as const;

const PROCESS = [
  ["01", "Tell Us What You Need", "Share your business requirement with our team."],
  ["02", "Understand Your Requirement", "We review your needs and identify the relevant service or solution."],
  ["03", "Explore Available Options", "We help you explore suitable products, suppliers, opportunities or business solutions."],
  ["04", "Coordinate the Solution", "Our team supports the next steps and coordinates the relevant process."],
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

  function update(field: keyof FormState, value: string | boolean) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.fullName || !form.email || !form.contactNumber || !form.service || !form.requirement || !form.confirmation) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/35 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="requirement-modal-title">
      <div className="bg-popover text-popover-foreground relative flex max-h-[calc(100vh-2rem)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl shadow-2xl">
        <button type="button" onClick={close} aria-label="Close requirement form" className="text-muted-foreground hover:bg-muted hover:text-ink absolute top-5 right-5 z-10 inline-flex size-9 items-center justify-center rounded-full"><X className="size-5" /></button>
        {submitted ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-16 text-center sm:px-14"><span className="bg-brand-blue-light text-brand-blue inline-flex size-16 items-center justify-center rounded-full"><Check className="size-8" /></span><h2 id="requirement-modal-title" className="text-ink mt-7 text-3xl font-extrabold tracking-tight">Request Submitted Successfully</h2><p className="text-muted-foreground mt-4 max-w-md leading-relaxed">Thank you for contacting Miracle International. Our team will review your requirement and contact you with the relevant information.</p><Button size="lg" onClick={close} className="mt-8">Done</Button></div>
        ) : (
          <>
            <div className="border-b px-6 py-6 pr-16 sm:px-8"><p className="text-brand-red text-xs font-bold tracking-[0.18em] uppercase">Miracle International</p><h2 id="requirement-modal-title" className="text-ink mt-2 text-2xl font-extrabold sm:text-3xl">Tell Us What You Need</h2><p className="text-muted-foreground mt-2 text-sm leading-relaxed">Share your requirement and we will help identify the relevant business solution.</p></div>
            <form onSubmit={submit} className="overflow-y-auto px-6 py-6 sm:px-8" noValidate><div className="grid gap-4 sm:grid-cols-2"><label className="text-ink text-sm font-semibold">Full Name *<Input value={form.fullName} onChange={(event) => update("fullName", event.target.value)} placeholder="Your full name" className="mt-2" /></label><label className="text-ink text-sm font-semibold">Email Address *<Input type="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="you@example.com" className="mt-2" /></label><label className="text-ink text-sm font-semibold">Contact Number *<Input value={form.contactNumber} onChange={(event) => update("contactNumber", event.target.value)} placeholder="Your phone number" className="mt-2" /></label><label className="text-ink text-sm font-semibold">WhatsApp Number <span className="text-muted-foreground font-normal">(Optional)</span><Input value={form.whatsappNumber} onChange={(event) => update("whatsappNumber", event.target.value)} placeholder="Your WhatsApp number" className="mt-2" /></label><label className="text-ink text-sm font-semibold sm:col-span-2">What Service Do You Need? *<select value={form.service} onChange={(event) => update("service", event.target.value)} className="border-input bg-background text-ink mt-2 flex h-11 w-full rounded-lg border px-3 text-sm"><option value="">Select a service</option>{["Trading", "Franchise", "Import & Export", "Investment Opportunities", "Marketing & Advertising", "Other"].map((option) => <option key={option}>{option}</option>)}</select></label><label className="text-ink text-sm font-semibold sm:col-span-2">Tell Us About Your Requirement *<Textarea value={form.requirement} onChange={(event) => update("requirement", event.target.value)} placeholder="Tell us what you need" className="mt-2" rows={4} /></label><label className="text-ink text-sm font-semibold">Preferred Country / Location<Input value={form.location} onChange={(event) => update("location", event.target.value)} placeholder="Country or city" className="mt-2" /></label><label className="text-ink text-sm font-semibold">Additional Information<Textarea value={form.additionalInformation} onChange={(event) => update("additionalInformation", event.target.value)} placeholder="Anything else we should know?" className="mt-2" rows={2} /></label></div><div className="border-input bg-surface mt-6 rounded-xl border border-dashed p-4"><label className="text-ink flex cursor-pointer items-center gap-3 text-sm font-semibold"><FileUp className="text-brand-blue size-5" /><span>Upload Document <span className="text-muted-foreground font-normal">(Optional)</span><Input type="file" multiple onChange={(event) => setFiles(Array.from(event.target.files ?? []))} className="mt-2 block h-auto border-0 p-0 text-xs shadow-none" /></span></label>{files.length > 0 && <p className="text-muted-foreground mt-2 text-xs">{files.length} file{files.length === 1 ? "" : "s"} selected</p>}</div><label className="text-ink mt-6 flex items-start gap-3 text-sm"><input type="checkbox" checked={form.confirmation} onChange={(event) => update("confirmation", event.target.checked)} className="accent-brand-blue mt-0.5 size-4" /><span>I confirm that the information provided is accurate. <span className="text-brand-red">*</span></span></label>{error && <p className="text-brand-red mt-4 text-sm font-semibold" role="alert">{error}</p>}<Button type="submit" size="xl" className="mt-6 w-full">Submit Request <ArrowRight data-icon="inline-end" /></Button></form>
          </>
        )}
      </div>
    </div>
  );
}

export function ServicesLanding() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const openForm = () => setIsFormOpen(true);
  const quickLinks = SERVICES.map(({ title, href }) => ({ title, href }));

  return (
    <>
      <main>
        <section className="bg-brand-blue-light/45"><div className="container-page grid gap-10 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-24"><div className="max-w-2xl"><p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">One partner, many possibilities</p><h1 className="text-ink mt-5 text-5xl leading-[1.02] font-extrabold tracking-tight sm:text-6xl">Business Solutions Designed Around Your Needs</h1><p className="text-muted-foreground mt-7 max-w-xl text-lg leading-relaxed">Explore our business, trade, investment and marketing services designed to help individuals and businesses connect with opportunities, products, markets and professional solutions.</p><div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button size="xl" onClick={() => document.getElementById("main-services")?.scrollIntoView({ behavior: "smooth" })}>Explore Our Services <ArrowRight data-icon="inline-end" /></Button><Button size="xl" variant="outline" onClick={openForm}>Tell Us What You Need</Button></div></div><div className="relative min-h-[360px] overflow-hidden rounded-3xl border border-white bg-white p-3 shadow-soft sm:min-h-[460px]"><Image src={SITE_MEDIA.businessMeeting.src} alt={SITE_MEDIA.businessMeeting.alt} fill priority sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover" /><div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/70 bg-white/90 p-5 backdrop-blur-sm"><p className="text-brand-blue text-sm font-bold">Global trade. Practical support.</p><p className="text-ink mt-1 font-semibold">Solutions connected around your requirement.</p></div></div></div></section>

        <section className="section-y bg-white"><div className="container-page max-w-3xl text-center"><p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">What we do</p><h2 className="text-ink mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Our Services</h2><p className="text-muted-foreground mt-5 text-lg leading-relaxed">From international trading and product sourcing to franchise opportunities, investment support and marketing solutions, Miracle International provides practical services to support your business goals.</p></div></section>

        <section id="main-services" className="section-y bg-surface"><div className="container-page"><div className="max-w-2xl"><p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">Explore your options</p><h2 className="text-ink mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Main Services</h2><p className="text-muted-foreground mt-4 text-lg">Choose a dedicated service to learn more.</p></div><div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{SERVICES.map(({ number, title, summary, highlights, href, label, icon: Icon, image }) => <article key={title} className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-soft"><div className="relative aspect-[1.8] overflow-hidden"><Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /><span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-brand-red backdrop-blur-sm">{number}</span></div><div className="flex flex-1 flex-col p-6"><div className="flex items-center gap-3"><span className="bg-brand-blue-light text-brand-blue inline-flex size-10 items-center justify-center rounded-xl"><Icon className="size-5 transition-transform group-hover:scale-110" /></span><h3 className="text-ink text-xl font-bold">{title}</h3></div><p className="text-muted-foreground mt-4 text-sm leading-relaxed">{summary}</p><ul className="mt-5 space-y-2">{highlights.map((highlight) => <li key={highlight} className="text-ink flex items-center gap-2 text-sm"><Check className="text-brand-blue size-4" />{highlight}</li>)}</ul><Link href={href} className="text-brand-blue mt-auto inline-flex items-center gap-2 pt-7 text-sm font-bold">{label} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></Link></div></article>)}</div></div></section>

        <section className="section-y bg-white"><div className="container-page rounded-3xl border bg-brand-blue-light/35 px-6 py-10 sm:px-10"><div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"><div><p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">Find your route</p><h2 className="text-ink mt-3 text-2xl font-extrabold sm:text-3xl">Looking for a Specific Business Solution?</h2></div><div className="flex flex-wrap gap-2">{quickLinks.map(({ title, href }) => <Button key={title} variant="outline" size="sm" asChild><Link href={href}>{title}</Link></Button>)}</div></div></div></section>

        <section className="section-y bg-surface"><div className="container-page"><div className="max-w-2xl"><p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">Why Miracle International</p><h2 className="text-ink mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Built Around Your Requirement</h2></div><div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{WHY_US.map(([title, description, Icon]) => <article key={title} className="rounded-2xl border bg-white p-6"><Icon className="text-brand-blue size-7" /><h3 className="text-ink mt-7 font-bold">{title}</h3><p className="text-muted-foreground mt-2 text-sm leading-relaxed">{description}</p></article>)}</div></div></section>

        <section className="section-y bg-white"><div className="container-page"><div className="max-w-2xl"><p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">A clear next step</p><h2 className="text-ink mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">How We Work</h2></div><div className="relative mt-12 grid gap-8 md:grid-cols-4 md:gap-4 md:before:absolute md:before:top-5 md:before:left-[12%] md:before:right-[12%] md:before:h-px md:before:bg-brand-blue/25">{PROCESS.map(([number, title, description]) => <article key={number} className="relative text-center"><span className="bg-brand-blue text-white relative z-10 mx-auto inline-flex size-10 items-center justify-center rounded-full text-sm font-bold">{number}</span><h3 className="text-ink mt-5 font-bold">{title}</h3><p className="text-muted-foreground mt-2 text-sm leading-relaxed">{description}</p></article>)}</div></div></section>

        <section className="section-y bg-brand-blue-light/45"><div className="container-page rounded-3xl bg-white px-6 py-14 shadow-soft sm:px-12 lg:py-20"><p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">Start a conversation</p><h2 className="text-ink mt-4 max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">Have a Business Requirement?</h2><p className="text-muted-foreground mt-5 max-w-2xl text-lg leading-relaxed">Whether you are looking for a product, supplier, franchise opportunity, investment opportunity or marketing solution, tell us what you need.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button size="xl" onClick={openForm}>Tell Us What You Need <ArrowRight data-icon="inline-end" /></Button><Button size="xl" variant="outline" asChild><Link href={ROUTES.public.contact}>Contact Us</Link></Button></div></div></section>
      </main>
      <RequirementModal open={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  );
}