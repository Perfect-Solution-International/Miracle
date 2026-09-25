"use client";

import Image from "next/image";
import {
  ArrowRight,
  Check,
  ChevronDown,
  FileUp,
  Globe2,
  PackageCheck,
  Search,
  Ship,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SITE_MEDIA } from "@/config/site-media";
import { cn } from "@/lib/utils";

const COUNTRY_CODES = `AF AX AL DZ AS AD AO AI AQ AG AR AM AW AU AT AZ BS BH BD BB BY BE BZ BJ BM BT BO BQ BA BW BV BR IO BN BG BF BI CV KH CM CA KY CF TD CL CN CX CC CO KM CG CD CK CR CI HR CU CW CY CZ DK DJ DM DO EC EG SV GQ ER EE SZ ET FK FO FJ FI FR GF PF TF GA GM GE DE GH GI GR GL GD GP GU GT GG GN GW GY HT HM VA HN HK HU IS IN ID IR IQ IE IM IL IT JM JP JE JO KZ KE KI KP KR KW KG LA LV LB LS LR LY LI LT LU MO MG MW MY MV ML MT MH MQ MR MU YT MX FM MD MC MN ME MS MA MZ MM NA NR NP NL NC NZ NI NE NG NU NF MK MP NO OM PK PW PS PA PG PY PE PH PN PL PT PR QA RE RO RU RW BL SH KN LC MF PM VC WS SM ST SA SN RS SC SL SG SX SK SI SJ SB SO ZA GS SS ES LK SD SR SE CH SY TW TJ TZ TH TL TG TK TO TT TN TR TM TC TV UG UA AE GB US UM UY UZ VU VE VN VG VI WF EH YE ZM ZW`.split(" ");
const COUNTRIES = COUNTRY_CODES.map((code) => ({
  code,
  name: new Intl.DisplayNames(["en"], { type: "region" }).of(code) ?? code,
})).sort((a, b) => a.name.localeCompare(b.name));

const SERVICES = [
  ["Product Sourcing", "Find the right products and suppliers for your market."],
  ["Supplier & Buyer Coordination", "Keep international partners aligned from first contact to delivery."],
  ["Bulk Product Requests", "Plan larger orders with clear, practical support."],
  ["Documentation Guidance", "Navigate the paperwork required for cross-border trade."],
  ["Shipping & Logistics", "Coordinate freight options and the movement of your goods."],
  ["Customs & Delivery", "Make the final mile simpler with hands-on coordination."],
  ["Door-to-Door Support", "Connect the journey from supplier to your chosen destination."],
  ["International Trade Assistance", "Get a knowledgeable partner for your next market move."],
] as const;

const PROCESS = ["Requirement", "Sourcing", "Coordination", "Documentation", "Delivery"] as const;

type RequestType = "import" | "export";
type FormState = {
  fromCountry: string;
  toCountry: string;
  fullName: string;
  contactNumber: string;
  whatsappNumber: string;
  email: string;
  productDescription: string;
  specifications: string;
  additionalRequirements: string;
  confirmation: boolean;
};

const INITIAL_FORM: FormState = {
  fromCountry: "",
  toCountry: "Sri Lanka",
  fullName: "",
  contactNumber: "",
  whatsappNumber: "",
  email: "",
  productDescription: "",
  specifications: "",
  additionalRequirements: "",
  confirmation: false,
};

function CountryPicker({ label, value, onChange, required = true }: { label: string; value: string; onChange: (value: string) => void; required?: boolean }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const selected = COUNTRIES.find((country) => country.name === value);
  const matches = useMemo(() => COUNTRIES.filter((country) => country.name.toLowerCase().includes(query.toLowerCase())).slice(0, 80), [query]);

  return (
    <div className="relative">
      <label className="text-ink mb-2 block text-sm font-semibold">{label} {required && <span className="text-brand-red">*</span>}</label>
      <button type="button" onClick={() => setOpen((current) => !current)} className="border-input bg-background text-ink flex h-11 w-full items-center justify-between rounded-lg border px-3 text-left text-sm">
        <span className={cn(!selected && "text-muted-foreground")}>{selected?.name ?? "Select a country"}</span><ChevronDown className="text-muted-foreground size-4" />
      </button>
      {open && <div className="bg-popover ring-foreground/10 absolute top-full z-30 mt-2 w-full overflow-hidden rounded-xl p-2 shadow-xl ring-1">
        <div className="relative"><Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" /><Input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search all countries" className="pl-9" /></div>
        <div className="mt-2 max-h-52 overflow-y-auto">{matches.map((country) => <button type="button" key={country.code} onClick={() => { onChange(country.name); setOpen(false); setQuery(""); }} className="text-ink hover:bg-brand-blue-light w-full rounded-lg px-3 py-2 text-left text-sm">{country.name}</button>)}{matches.length === 0 && <p className="text-muted-foreground p-3 text-sm">No countries found.</p>}</div>
      </div>}
    </div>
  );
}

function RequestModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [requestType, setRequestType] = useState<RequestType>("import");
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
    if (!form.fromCountry || !form.toCountry || !form.fullName || !form.contactNumber || !form.email || !form.productDescription || !form.confirmation) {
      setError("Please complete the required fields and confirm your information.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  function close() {
    setSubmitted(false);
    setError("");
    setForm(INITIAL_FORM);
    setFiles([]);
    onClose();
  }

  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/55 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="request-modal-title">
    <div className="bg-popover text-popover-foreground relative flex max-h-[min(900px,calc(100vh-2rem))] w-full max-w-3xl flex-col overflow-hidden rounded-2xl shadow-2xl">
      <button type="button" onClick={close} aria-label="Close request form" className="text-muted-foreground hover:bg-muted hover:text-ink absolute top-5 right-5 z-10 inline-flex size-9 items-center justify-center rounded-full"><X className="size-5" /></button>
      {submitted ? <div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-16 text-center sm:px-14"><span className="bg-brand-blue-light text-brand-blue inline-flex size-16 items-center justify-center rounded-full"><Check className="size-8" /></span><h2 id="request-modal-title" className="text-ink mt-7 text-3xl font-extrabold tracking-tight">Request Submitted Successfully</h2><p className="text-muted-foreground mt-4 max-w-md leading-relaxed">Thank you. Our team will review your requirement and contact you shortly.</p><Button size="lg" onClick={close} className="mt-8">Done</Button></div> : <>
        <div className="border-b px-6 py-6 pr-16 sm:px-8"><p className="text-brand-red text-xs font-bold tracking-[0.18em] uppercase">Miracle International</p><h2 id="request-modal-title" className="text-ink mt-2 text-2xl font-extrabold sm:text-3xl">Import / Export Request</h2><p className="text-muted-foreground mt-2 max-w-xl text-sm leading-relaxed">Tell us what you need. Our team will review your requirement and contact you with the next steps.</p></div>
  <form onSubmit={submit} className="overflow-y-auto px-6 py-6 sm:px-8" noValidate>
          <div className="bg-brand-blue-light grid grid-cols-2 gap-1 rounded-xl p-1"><button type="button" onClick={() => setRequestType("import")} className={cn("rounded-lg px-3 py-2.5 text-sm font-bold", requestType === "import" ? "bg-brand-blue text-white shadow" : "text-brand-blue-dark")}>Import</button><button type="button" onClick={() => setRequestType("export")} className={cn("rounded-lg px-3 py-2.5 text-sm font-bold", requestType === "export" ? "bg-brand-blue text-white shadow" : "text-brand-blue-dark")}>Export</button></div>
          <fieldset className="mt-7"><legend className="text-ink text-lg font-bold">{requestType === "import" ? "Import Route" : "Export Route"}</legend><div className="mt-4 grid gap-4 sm:grid-cols-2"><CountryPicker label={requestType === "import" ? "Import From Country" : "Export From Country"} value={form.fromCountry} onChange={(value) => update("fromCountry", value)} /><CountryPicker label={requestType === "import" ? "Import To Country" : "Export To Country"} value={form.toCountry} onChange={(value) => update("toCountry", value)} /></div></fieldset>
          <fieldset className="mt-7"><legend className="text-ink text-lg font-bold">Contact Information</legend><div className="mt-4 grid gap-4 sm:grid-cols-2"><label className="text-ink text-sm font-semibold">Full Name *<Input value={form.fullName} onChange={(event) => update("fullName", event.target.value)} placeholder="Your full name" className="mt-2" /></label><label className="text-ink text-sm font-semibold">Contact Number *<Input value={form.contactNumber} onChange={(event) => update("contactNumber", event.target.value)} placeholder="Your phone number" className="mt-2" /></label><label className="text-ink text-sm font-semibold">WhatsApp Number <span className="text-muted-foreground font-normal">(Optional)</span><Input value={form.whatsappNumber} onChange={(event) => update("whatsappNumber", event.target.value)} placeholder="Your WhatsApp number" className="mt-2" /></label><label className="text-ink text-sm font-semibold">Email Address *<Input type="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="you@example.com" className="mt-2" /></label></div></fieldset>
          <fieldset className="mt-7"><legend className="text-ink text-lg font-bold">Product Information</legend><div className="mt-4 grid gap-4"><label className="text-ink text-sm font-semibold">Product Name / Description *<Textarea value={form.productDescription} onChange={(event) => update("productDescription", event.target.value)} placeholder="What product are you looking for?" className="mt-2" rows={3} /></label><label className="text-ink text-sm font-semibold">Product Requirements / Specifications <span className="text-muted-foreground font-normal">(Optional)</span><Textarea value={form.specifications} onChange={(event) => update("specifications", event.target.value)} placeholder="Sizes, materials, standards or other details" className="mt-2" rows={3} /></label></div></fieldset>
          <label className="text-ink mt-7 block text-sm font-semibold">Tell us anything else about your import/export requirement <span className="text-muted-foreground font-normal">(Optional)</span><Textarea value={form.additionalRequirements} onChange={(event) => update("additionalRequirements", event.target.value)} placeholder="Anything else we should know?" className="mt-2" rows={4} /></label>
          <div className="border-input bg-surface mt-7 rounded-xl border border-dashed p-4"><label className="text-ink flex cursor-pointer items-center gap-3 text-sm font-semibold"><FileUp className="text-brand-blue size-5" /><span>Upload Product Images / Specifications / Documents <span className="text-muted-foreground font-normal">(Optional)</span><Input type="file" multiple onChange={(event) => setFiles(Array.from(event.target.files ?? []))} className="mt-2 block h-auto cursor-pointer border-0 p-0 text-xs shadow-none" /></span></label>{files.length > 0 && <p className="text-muted-foreground mt-2 text-xs">{files.length} file{files.length === 1 ? "" : "s"} selected</p>}</div>
          <label className="text-ink mt-6 flex items-start gap-3 text-sm"><input type="checkbox" checked={form.confirmation} onChange={(event) => update("confirmation", event.target.checked)} className="accent-brand-blue mt-0.5 size-4" /> <span>I confirm that the information provided is accurate. <span className="text-brand-red">*</span></span></label>
          {error && <p className="text-brand-red mt-4 text-sm font-semibold" role="alert">{error}</p>}
          <Button type="submit" size="xl" className="mt-6 w-full">Submit Request <ArrowRight data-icon="inline-end" /></Button>
        </form>
      </>}
    </div>
  </div>;
}

export function ImportExportLanding() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return <>
    <main>
      <section className="relative isolate overflow-hidden bg-navy text-white"><div className="absolute inset-0 -z-10 opacity-35"><Image src={SITE_MEDIA.heroPort.src} alt={SITE_MEDIA.heroPort.alt} fill priority sizes="100vw" className="object-cover" /></div><div className="absolute inset-0 -z-10 bg-[linear-gradient(110deg,#07162ef2_20%,#0b3b80cc_58%,#07162e99)]" /><div className="container-page grid gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28"><div className="max-w-2xl"><p className="text-brand-red mb-5 text-sm font-bold tracking-[0.18em] uppercase">Global trade, made practical</p><h1 className="max-w-xl text-5xl leading-[0.98] font-extrabold tracking-tight sm:text-6xl lg:text-7xl">Import &amp; Export Solutions</h1><p className="mt-7 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl">Source products globally, import what you need, or connect your products with international markets through Miracle International.</p><div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button size="xl" onClick={() => setIsFormOpen(true)}>Start Your Import / Export Request <ArrowRight data-icon="inline-end" /></Button><Button size="xl" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white hover:text-brand-blue" asChild><a href="#services">Explore Our Services</a></Button></div></div><div className="relative min-h-[320px] overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-sm sm:min-h-[390px]"><div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,#4f86d355,transparent_35%)]" /><div className="relative flex h-full flex-col justify-between"><div className="flex items-center justify-between text-sm font-semibold text-white/70"><span className="flex items-center gap-2"><Globe2 className="size-4" /> International network</span><span className="text-brand-red">01 / 05</span></div><div className="mt-10 flex items-end justify-between gap-5"><div><p className="text-4xl font-extrabold">Markets</p><p className="mt-1 text-white/65">Connected with clarity</p></div><Ship className="text-brand-red size-20 stroke-[1.2]" aria-hidden="true" /></div><div className="mt-8 grid grid-cols-3 gap-2 text-center text-xs text-white/60">{["Source", "Move", "Grow"].map((label, index) => <div key={label} className="rounded-xl border border-white/15 bg-white/10 px-2 py-3"><span className="text-white">0{index + 1}</span><br />{label}</div>)}</div></div></div></div></section>
      <section className="section-y bg-white"><div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start"><div><p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">A clear path forward</p><h2 className="text-ink mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Import &amp; Export Made Simple</h2></div><div className="grid gap-6 sm:grid-cols-2"><div className="border-brand-blue border-l-2 pl-6"><PackageCheck className="text-brand-blue size-7" /><h3 className="text-ink mt-5 text-xl font-bold">Need something from abroad?</h3><p className="text-muted-foreground mt-3 leading-relaxed">Tell us what you need and our team can help source, arrange and coordinate the import process.</p></div><div className="border-brand-red border-l-2 pl-6"><Globe2 className="text-brand-red size-7" /><h3 className="text-ink mt-5 text-xl font-bold">Ready to reach new markets?</h3><p className="text-muted-foreground mt-3 leading-relaxed">Share your product and destination market, and we can assist with the export process.</p></div></div></div></section>
      <section id="services" className="section-y bg-surface"><div className="container-page"><div className="max-w-2xl"><p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">Practical support at every step</p><h2 className="text-ink mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">What We Can Help With</h2></div><div className="mt-12 grid gap-px overflow-hidden rounded-3xl border bg-border sm:grid-cols-2 lg:grid-cols-4">{SERVICES.map(([title, description]) => <article key={title} className="bg-white p-6 transition-colors hover:bg-brand-blue-light"><Globe2 className="text-brand-blue size-6" /><h3 className="text-ink mt-8 font-bold">{title}</h3><p className="text-muted-foreground mt-2 text-sm leading-relaxed">{description}</p></article>)}</div></div></section>
      <section className="section-y bg-navy text-white"><div className="container-page grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center"><div><p className="text-brand-red text-sm font-bold tracking-[0.18em] uppercase">From requirement to result</p><h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Tell Us What You Need</h2><p className="mt-5 max-w-md leading-relaxed text-white/70">Whether you want to import a product into Sri Lanka or export a product to another country, submit your requirement and we will guide you through the next steps.</p><Button size="xl" className="mt-8" onClick={() => setIsFormOpen(true)}>Submit Import / Export Request <ArrowRight data-icon="inline-end" /></Button></div><div className="grid gap-3 sm:grid-cols-5">{PROCESS.map((step, index) => <div key={step} className="relative border-t border-white/20 pt-4 sm:border-t-0 sm:border-l sm:pl-4"><span className="text-brand-red text-sm font-bold">0{index + 1}</span><p className="mt-2 font-semibold">{step}</p>{index < PROCESS.length - 1 && <ArrowRight className="text-brand-red absolute top-1/2 -right-5 hidden size-4 -translate-y-1/2 sm:block" />}</div>)}</div></div></section>
    </main>
    <RequestModal open={isFormOpen} onClose={() => setIsFormOpen(false)} />
  </>;
}
