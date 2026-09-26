"use client";

import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronRight,
  CircleDollarSign,
  FileUp,
  Globe2,
  Handshake,
  Lightbulb,
  Network,
  Rocket,
  Target,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

import { Breadcrumb, type BreadcrumbItem } from "@/components/common/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SITE_MEDIA } from "@/config/site-media";

const SUPPORT_TYPES = [
  ["01", "Investment Opportunities", "Explore potential business and investment opportunities.", TrendingUp],
  ["02", "Business Opportunities", "Discover businesses and commercial opportunities that may match your interests.", BriefcaseBusiness],
  ["03", "Investment Projects", "Explore projects that require investment, partnership or business participation.", Target],
  ["04", "Business Ideas", "Explore practical business ideas for starting or expanding a business.", Lightbulb],
] as const;

const CATEGORIES = [
  ["Trading & Wholesale", Network],
  ["Retail & Distribution", Building2],
  ["Manufacturing", BriefcaseBusiness],
  ["Technology & IT", BarChart3],
  ["Travel & Tourism", Globe2],
  ["Food & Beverage", Rocket],
  ["Services", Users],
  ["Other Business Opportunities", Handshake],
] as const;

const BUSINESS_OPPORTUNITIES = [
  ["Start a New Business", "Turn a clear idea into a practical business direction.", Rocket],
  ["Expand an Existing Business", "Explore support for a new market, product or location.", TrendingUp],
  ["Business Partnership", "Find ways to connect with relevant business partners.", Handshake],
  ["Commercial Opportunities", "Consider opportunities that serve commercial needs.", Building2],
  ["Market Expansion", "Plan how your business could reach new markets.", Globe2],
  ["Product-Based Businesses", "Explore businesses built around products and supply.", BriefcaseBusiness],
] as const;

const BUSINESS_IDEAS = [
  ["Product-Based Business", "Build around products with clear customer demand."],
  ["Trading Business", "Connect products, suppliers and markets."],
  ["Wholesale Business", "Explore supply models for business customers."],
  ["Service Business", "Create value through practical services and expertise."],
  ["Online Business", "Consider digital-first ways to reach customers."],
  ["Tourism Business", "Explore opportunities connected to travel and hospitality."],
  ["Technology Business", "Consider solutions for changing business needs."],
  ["Local Market Opportunities", "Find ideas suited to your local market."],
] as const;

const SUPPORT_STEPS = [
  ["01", "Understand Your Goal", "Tell us what type of investment or business opportunity you are interested in."],
  ["02", "Explore Opportunities", "Identify relevant business opportunities, projects or ideas."],
  ["03", "Evaluate the Opportunity", "Review available business information, requirements and considerations."],
  ["04", "Business Guidance", "Receive practical guidance for the next steps."],
  ["05", "Connect & Coordinate", "Where applicable, connect relevant parties and coordinate the required business process."],
] as const;

const WHY_US = [
  ["Business Opportunity Guidance", "Make sense of possible directions and next steps.", Lightbulb],
  ["Market & Business Information", "Review useful context before moving forward.", BarChart3],
  ["Investment Requirement Support", "Share your goals and get help shaping your requirement.", CircleDollarSign],
  ["Business Connection & Coordination", "Connect relevant people and coordinate the process where applicable.", Handshake],
] as const;

type FormState = {
  fullName: string;
  email: string;
  contactNumber: string;
  whatsappNumber: string;
  interest: string;
  sector: string;
  location: string;
  range: string;
  experience: string;
  requirement: string;
  additionalInformation: string;
  confirmation: boolean;
};

const INITIAL_FORM: FormState = {
  fullName: "",
  email: "",
  contactNumber: "",
  whatsappNumber: "",
  interest: "",
  sector: "",
  location: "",
  range: "",
  experience: "",
  requirement: "",
  additionalInformation: "",
  confirmation: false,
};

function RequestModal({ open, onClose }: { open: boolean; onClose: () => void }) {
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
    if (!form.fullName || !form.email || !form.contactNumber || !form.interest || !form.requirement || !form.confirmation) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/35 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="investment-modal-title">
      <div className="bg-popover text-popover-foreground relative flex max-h-[calc(100vh-2rem)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl shadow-2xl">
        <button type="button" onClick={close} aria-label="Close investment request form" className="text-muted-foreground hover:bg-muted hover:text-ink absolute top-5 right-5 z-10 inline-flex size-9 items-center justify-center rounded-full"><X className="size-5" /></button>
        {submitted ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-16 text-center sm:px-14">
            <span className="bg-brand-blue-light text-brand-blue inline-flex size-16 items-center justify-center rounded-full"><Check className="size-8" /></span>
            <h2 id="investment-modal-title" className="text-ink mt-7 text-3xl font-extrabold tracking-tight">Request Submitted Successfully</h2>
            <p className="text-muted-foreground mt-4 max-w-md leading-relaxed">Our team will review your requirement and contact you regarding the next steps.</p>
            <Button size="lg" onClick={close} className="mt-8">Done</Button>
          </div>
        ) : (
          <>
            <div className="border-b px-6 py-6 pr-16 sm:px-8"><p className="text-brand-red text-xs font-bold tracking-[0.18em] uppercase">Miracle International</p><h2 id="investment-modal-title" className="text-ink mt-2 text-2xl font-extrabold sm:text-3xl">Investment Requirement</h2><p className="text-muted-foreground mt-2 max-w-xl text-sm leading-relaxed">Tell us about your investment interests or business requirements.</p></div>
            <form onSubmit={submit} className="overflow-y-auto px-6 py-6 sm:px-8" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-ink text-sm font-semibold">Full Name *<Input value={form.fullName} onChange={(event) => update("fullName", event.target.value)} placeholder="Your full name" className="mt-2" /></label>
                <label className="text-ink text-sm font-semibold">Email Address *<Input type="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="you@example.com" className="mt-2" /></label>
                <label className="text-ink text-sm font-semibold">Contact Number *<Input value={form.contactNumber} onChange={(event) => update("contactNumber", event.target.value)} placeholder="Your phone number" className="mt-2" /></label>
                <label className="text-ink text-sm font-semibold">WhatsApp Number <span className="text-muted-foreground font-normal">(Optional)</span><Input value={form.whatsappNumber} onChange={(event) => update("whatsappNumber", event.target.value)} placeholder="Your WhatsApp number" className="mt-2" /></label>
                <label className="text-ink text-sm font-semibold sm:col-span-2">What Are You Interested In? *<select value={form.interest} onChange={(event) => update("interest", event.target.value)} className="border-input bg-background text-ink mt-2 flex h-11 w-full rounded-lg border px-3 text-sm"><option value="">Select an interest</option>{["Investment Opportunity", "Business Opportunity", "Investment Project", "Business Idea", "Business Partnership", "Other"].map((option) => <option key={option}>{option}</option>)}</select></label>
                <label className="text-ink text-sm font-semibold">Preferred Business Sector<Input value={form.sector} onChange={(event) => update("sector", event.target.value)} placeholder="e.g. technology, trading" className="mt-2" /></label>
                <label className="text-ink text-sm font-semibold">Preferred Location / Country<Input value={form.location} onChange={(event) => update("location", event.target.value)} placeholder="City or country" className="mt-2" /></label>
                <label className="text-ink text-sm font-semibold">Estimated Investment Range<Input value={form.range} onChange={(event) => update("range", event.target.value)} placeholder="Optional range and currency" className="mt-2" /></label>
                <label className="text-ink text-sm font-semibold">Investment Experience<Input value={form.experience} onChange={(event) => update("experience", event.target.value)} placeholder="Briefly describe your experience" className="mt-2" /></label>
                <label className="text-ink text-sm font-semibold sm:col-span-2">Tell Us About Your Requirement *<Textarea value={form.requirement} onChange={(event) => update("requirement", event.target.value)} placeholder="Tell us what you are looking for" className="mt-2" rows={4} /></label>
                <label className="text-ink text-sm font-semibold sm:col-span-2">Additional Information <Textarea value={form.additionalInformation} onChange={(event) => update("additionalInformation", event.target.value)} placeholder="Anything else we should know?" className="mt-2" rows={3} /></label>
              </div>
              <div className="border-input bg-surface mt-6 rounded-xl border border-dashed p-4"><label className="text-ink flex cursor-pointer items-center gap-3 text-sm font-semibold"><FileUp className="text-brand-blue size-5" /><span>Optional Document Upload<Input type="file" multiple onChange={(event) => setFiles(Array.from(event.target.files ?? []))} className="mt-2 block h-auto border-0 p-0 text-xs shadow-none" /></span></label>{files.length > 0 && <p className="text-muted-foreground mt-2 text-xs">{files.length} file{files.length === 1 ? "" : "s"} selected</p>}</div>
              <label className="text-ink mt-6 flex items-start gap-3 text-sm"><input type="checkbox" checked={form.confirmation} onChange={(event) => update("confirmation", event.target.checked)} className="accent-brand-blue mt-0.5 size-4" /><span>I confirm that the information provided is accurate. <span className="text-brand-red">*</span></span></label>
              {error && <p className="text-brand-red mt-4 text-sm font-semibold" role="alert">{error}</p>}
              <Button type="submit" size="xl" className="mt-6 w-full">Submit Investment Request <ArrowRight data-icon="inline-end" /></Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export function InvestmentLanding({
  breadcrumbs = [{ label: "Investment Opportunities" }],
}: {
  breadcrumbs?: readonly BreadcrumbItem[];
} = {}) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const openForm = () => setIsFormOpen(true);

  return (
    <>
      <main>
        <section className="bg-brand-blue-light/45">
          <div className="container-page grid gap-10 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-24">
            <div className="max-w-2xl">
              <Breadcrumb items={breadcrumbs} />
              <p className="mt-8 text-brand-red text-sm font-bold tracking-[0.18em] uppercase">Practical investment support</p>
              <h1 className="text-ink mt-5 text-5xl leading-[1.02] font-extrabold tracking-tight sm:text-6xl">Investment Opportunities That Create Possibilities</h1><p className="text-muted-foreground mt-7 max-w-xl text-lg leading-relaxed">Explore business opportunities, investment projects and practical business ideas with professional support from Miracle International.</p><div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button size="xl" onClick={openForm}>Explore Investment Opportunities <ArrowRight data-icon="inline-end" /></Button><Button size="xl" variant="outline" onClick={openForm}>Submit Your Investment Requirement</Button></div></div><div className="relative min-h-[360px] overflow-hidden rounded-3xl border border-white bg-white p-3 shadow-soft sm:min-h-[470px]"><Image src={SITE_MEDIA.investment.hero.src} alt={SITE_MEDIA.investment.hero.alt} fill priority sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover" /><div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/70 bg-white/90 p-5 backdrop-blur-sm"><p className="text-brand-blue text-sm font-bold">Ideas become clearer with the right support</p><p className="text-ink mt-1 font-semibold">Explore, evaluate and coordinate the next step.</p></div></div></div></section>

        <section className="section-y bg-white"><div className="container-page grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"><div className="relative min-h-[300px] overflow-hidden rounded-3xl"><Image src={SITE_MEDIA.investment.partnership.src} alt={SITE_MEDIA.investment.partnership.alt} fill sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover" /></div><div className="max-w-xl"><p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">A clearer path forward</p><h2 className="text-ink mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Explore New Business &amp; Investment Possibilities</h2><p className="text-muted-foreground mt-5 text-lg leading-relaxed">Whether you are looking for an investment opportunity, exploring a new business idea, or seeking support for an existing project, Miracle International helps connect opportunities with practical business solutions.</p><Button variant="outline" size="lg" onClick={openForm} className="mt-7">Explore Opportunities <ArrowRight data-icon="inline-end" /></Button></div></div></section>

        <section className="section-y bg-surface"><div className="container-page"><div className="max-w-2xl"><p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">Start with your goal</p><h2 className="text-ink mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">What Are You Looking For?</h2><p className="text-muted-foreground mt-4 text-lg">Choose the type of investment support you need.</p></div><div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{SUPPORT_TYPES.map(([number, title, description, Icon]) => <button type="button" key={title} onClick={openForm} className="group text-left"><article className="hover:border-brand-blue/40 hover:shadow-soft h-full rounded-2xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1"><div className="flex items-center justify-between"><span className="text-brand-red text-sm font-bold">{number}</span><Icon className="text-brand-blue size-7 transition-transform group-hover:scale-110" /></div><h3 className="text-ink mt-10 text-xl font-bold">{title}</h3><p className="text-muted-foreground mt-3 text-sm leading-relaxed">{description}</p><span className="text-brand-blue mt-6 inline-flex items-center gap-2 text-sm font-bold">Explore <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" /></span></article></button>)}</div></div></section>

        <section className="section-y bg-white"><div className="container-page grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center"><div className="relative min-h-[470px] overflow-hidden rounded-3xl"><Image src={SITE_MEDIA.investment.analysis.src} alt={SITE_MEDIA.investment.analysis.alt} fill sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover" /></div><div><p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">Explore by sector</p><h2 className="text-ink mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Investment Opportunities</h2><p className="text-muted-foreground mt-4 text-lg leading-relaxed">Explore opportunities across different business sectors.</p><div className="mt-8 grid gap-3 sm:grid-cols-2">{CATEGORIES.map(([title, Icon]) => <button type="button" onClick={openForm} key={title} className="hover:border-brand-blue/40 flex items-center gap-3 rounded-xl border bg-white p-4 text-left transition-colors"><Icon className="text-brand-blue size-5 shrink-0" /><span className="text-ink text-sm font-semibold">{title}</span><ChevronRight className="text-muted-foreground ml-auto size-4" /></button>)}</div><Button size="lg" onClick={openForm} className="mt-8">Explore Opportunities <ArrowRight data-icon="inline-end" /></Button></div></div></section>

        <section className="section-y bg-brand-blue-light/35"><div className="container-page grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"><div><p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">Ideas with potential</p><h2 className="text-ink mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Business Opportunities</h2><p className="text-muted-foreground mt-4 max-w-xl text-lg leading-relaxed">Explore opportunities to start, expand or participate in different types of businesses.</p><div className="mt-9 grid gap-3 sm:grid-cols-2">{BUSINESS_OPPORTUNITIES.map(([title, description, Icon]) => <article key={title} className="rounded-xl border bg-white p-4"><Icon className="text-brand-blue size-5" /><h3 className="text-ink mt-4 text-sm font-bold">{title}</h3><p className="text-muted-foreground mt-2 text-xs leading-relaxed">{description}</p></article>)}</div></div><div className="relative min-h-[440px] overflow-hidden rounded-3xl"><Image src={SITE_MEDIA.investment.planning.src} alt={SITE_MEDIA.investment.planning.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" /></div></div></section>

        <section className="section-y bg-white"><div className="container-page"><div className="max-w-2xl"><p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">No invented listings</p><h2 className="text-ink mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Investment Projects</h2><p className="text-muted-foreground mt-4 text-lg leading-relaxed">Explore projects that may require investment, business participation or strategic support.</p></div><div className="mt-10 rounded-3xl border border-dashed bg-surface px-6 py-14 text-center sm:px-12"><CircleDollarSign className="text-brand-blue mx-auto size-10" /><h3 className="text-ink mt-5 text-2xl font-bold">No Investment Projects Available</h3><p className="text-muted-foreground mx-auto mt-3 max-w-lg">New opportunities will be added as they become available.</p><Button size="lg" onClick={openForm} className="mt-7">Submit Your Investment Requirement <ArrowRight data-icon="inline-end" /></Button></div></div></section>

        <section className="section-y bg-surface"><div className="container-page"><div className="max-w-2xl"><p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">Think beyond the obvious</p><h2 className="text-ink mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Business Ideas</h2><p className="text-muted-foreground mt-4 text-lg leading-relaxed">Explore practical business concepts and identify opportunities that may suit your interests, resources and market.</p></div><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{BUSINESS_IDEAS.map(([title, description]) => <article key={title} className="rounded-2xl border bg-white p-5"><Lightbulb className="text-brand-blue size-6" /><h3 className="text-ink mt-5 text-sm font-bold">{title}</h3><p className="text-muted-foreground mt-2 text-sm leading-relaxed">{description}</p></article>)}</div></div></section>

        <section className="section-y bg-white"><div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"><div className="relative min-h-[430px] overflow-hidden rounded-3xl"><Image src={SITE_MEDIA.investment.growth.src} alt={SITE_MEDIA.investment.growth.alt} fill sizes="(min-width: 1024px) 44vw, 100vw" className="object-cover" /></div><div><p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">A practical process</p><h2 className="text-ink mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Investment Support From Idea to Opportunity</h2><div className="relative mt-9 space-y-6 before:absolute before:top-3 before:bottom-3 before:left-[17px] before:w-px before:bg-brand-blue/25">{SUPPORT_STEPS.map(([number, title, description]) => <div key={number} className="relative flex gap-5"><span className="bg-brand-blue text-white relative z-10 inline-flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold">{number}</span><div><h3 className="text-ink font-bold">{title}</h3><p className="text-muted-foreground mt-1 text-sm leading-relaxed">{description}</p></div></div>)}</div></div></div></section>

        <section className="section-y bg-surface"><div className="container-page"><div className="max-w-2xl"><p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">Clarity for your next decision</p><h2 className="text-ink mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Practical Support for Your Investment Journey</h2></div><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{WHY_US.map(([title, description, Icon]) => <article key={title} className="rounded-2xl border bg-white p-6"><Icon className="text-brand-blue size-7" /><h3 className="text-ink mt-7 font-bold">{title}</h3><p className="text-muted-foreground mt-2 text-sm leading-relaxed">{description}</p></article>)}</div></div></section>

        <section className="section-y bg-brand-blue-light/45"><div className="container-page relative overflow-hidden rounded-3xl bg-white px-6 py-14 shadow-soft sm:px-12 lg:py-20"><Image src={SITE_MEDIA.investment.hero.src} alt="" fill sizes="100vw" className="object-cover opacity-10" /><div className="relative max-w-2xl"><p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">Your next possibility</p><h2 className="text-ink mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Have an Investment Idea or Requirement?</h2><p className="text-muted-foreground mt-5 max-w-xl text-lg leading-relaxed">Tell us what you are looking for and our team will help you explore the available business and investment possibilities.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button size="xl" onClick={openForm}>Submit Investment Requirement <ArrowRight data-icon="inline-end" /></Button><Button size="xl" variant="outline" onClick={openForm}>Explore Opportunities</Button></div></div></div></section>
      </main>
      <RequestModal open={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  );
}