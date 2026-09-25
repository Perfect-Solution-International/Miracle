"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Check,
  Clock3,
  FileUp,
  Globe2,
  Handshake,
  Laptop2,
  Mail,
  MapPin,
  Megaphone,
  PackageSearch,
  Phone,
  Plane,
  Ship,
  Store,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { APP_CONFIG } from "@/config/app";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA, type SiteImage } from "@/config/site-media";

const SHORTCUTS = [
  [
    "Services",
    "Explore our complete business service network.",
    Megaphone,
    ROUTES.public.services,
  ],
  [
    "Global Sourcing",
    "Find products and suppliers internationally.",
    Globe2,
    ROUTES.public.globalSourcing,
  ],
  [
    "Wholesale & Products",
    "Browse commercial products and supply options.",
    Store,
    ROUTES.public.wholesaleProducts,
  ],
  [
    "Business Solutions",
    "Practical support for starting and growing.",
    BarChart3,
    ROUTES.public.businessSolutions,
  ],
  [
    "Investment & Franchise",
    "Discover opportunities and business ideas.",
    TrendingUp,
    ROUTES.public.investmentFranchise,
  ],
  [
    "Travel & Tourism",
    "Plan business and leisure travel with confidence.",
    Plane,
    ROUTES.public.travelTourism,
  ],
  [
    "IT Solutions",
    "Build better digital tools for your business.",
    Laptop2,
    ROUTES.public.itSolutions,
  ],
  [
    "Contact Us",
    "Talk with our team about your next step.",
    Phone,
    ROUTES.public.contact,
  ],
] as const;

const SERVICES = [
  [
    "Trading",
    "Local and international trading, wholesale supply, bulk orders and supplier-buyer connections.",
    Globe2,
    ROUTES.public.servicesTrading,
  ],
  [
    "Franchise",
    "Franchise opportunities with support for setup, product supply and business development.",
    Handshake,
    ROUTES.public.servicesFranchise,
  ],
  [
    "Import & Export",
    "We coordinate sourcing, suppliers, shipping and the international trade process.",
    Ship,
    ROUTES.public.servicesImportExport,
  ],
  [
    "Investment Opportunities",
    "Explore business opportunities, investment projects and practical business ideas.",
    TrendingUp,
    ROUTES.public.servicesInvestment,
  ],
  [
    "Marketing & Advertising",
    "Digital marketing, social media, advertising and brand solutions for growing businesses.",
    Megaphone,
    ROUTES.public.servicesMarketingAdvertising,
  ],
] as const;

const OPPORTUNITIES = [
  {
    title: "Investment Opportunities",
    description:
      "Explore business opportunities, investment projects and business ideas.",
    image: SITE_MEDIA.services.investment,
    href: ROUTES.public.servicesInvestment,
    label: "Explore Investment",
  },
  {
    title: "Franchise Opportunities",
    description: "Explore franchise models with support for setup and development.",
    image: SITE_MEDIA.services.franchise,
    href: ROUTES.public.servicesFranchise,
    label: "Explore Franchise",
  },
] as const;

const WHY_US = [
  [
    "Global Connections",
    "Connect with international suppliers, businesses and opportunities.",
    Globe2,
  ],
  [
    "Multiple Solutions",
    "Access business, trade, travel and technology support in one place.",
    BarChart3,
  ],
  [
    "Customized Support",
    "Solutions are structured around your specific requirement.",
    PackageSearch,
  ],
  [
    "Professional Coordination",
    "We help coordinate the process from requirement to completion.",
    Handshake,
  ],
  [
    "Business Focused",
    "Designed to support individuals, entrepreneurs and businesses.",
    Users,
  ],
] as const;

const PROCESS = [
  ["01", "Tell Us What You Need", "Submit your requirement."],
  ["02", "We Understand", "Our team reviews your needs."],
  [
    "03",
    "We Find the Right Options",
    "We identify suitable products, suppliers, services or opportunities.",
  ],
  ["04", "You Review", "Review the available options and requirements."],
  ["05", "We Coordinate", "We help coordinate the next steps."],
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

function SectionIntro({
  eyebrow,
  title,
  description,
  inverse = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  inverse?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <p
        className={`${inverse ? "text-brand-blue-muted" : "text-brand-red"} text-xs font-bold tracking-[0.18em] uppercase`}
      >
        {eyebrow}
      </p>
      <h2
        className={`${inverse ? "text-white" : "text-ink"} mt-3 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl lg:text-5xl`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`${inverse ? "text-white/70" : "text-muted-foreground"} mt-4 max-w-2xl text-base leading-relaxed sm:text-lg`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

function ArrowLabel({ children }: { children: string }) {
  return (
    <span className="text-brand-blue inline-flex items-center gap-2 text-sm font-bold">
      {children}
      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform group-hover:translate-x-1"
      />
    </span>
  );
}

function MediaSection({
  title,
  description,
  image,
  href,
  label,
  points,
  reverse = false,
}: {
  title: string;
  description: string;
  image: SiteImage;
  href: string;
  label: string;
  points: readonly string[];
  reverse?: boolean;
}) {
  return (
    <section className="section-y bg-white">
      <div
        className={`container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
      >
        <div className="shadow-soft relative aspect-[4/3] overflow-hidden rounded-3xl">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
        <div>
          <p className="text-brand-red text-xs font-bold tracking-[0.18em] uppercase">
            Explore more
          </p>
          <h2 className="text-ink mt-3 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
            {description}
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {points.map((point) => (
              <li
                key={point}
                className="text-ink flex items-center gap-2 text-sm font-medium"
              >
                <Check aria-hidden="true" className="text-brand-blue size-4 shrink-0" />
                {point}
              </li>
            ))}
          </ul>
          <Button asChild size="lg" variant="outline" className="mt-7">
            <Link href={href}>
              {label}
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

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
    if (
      !form.fullName ||
      !form.email ||
      !form.contact ||
      !form.category ||
      !form.details
    ) {
      setError("Please complete the required fields.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div
      className="bg-navy/40 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="requirement-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="bg-popover text-popover-foreground relative flex max-h-[calc(100vh-2rem)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl shadow-2xl">
        <button
          type="button"
          onClick={close}
          aria-label="Close requirement form"
          className="text-muted-foreground hover:bg-muted hover:text-ink absolute top-4 right-4 z-10 inline-flex size-9 items-center justify-center rounded-full"
        >
          <X aria-hidden="true" className="size-5" />
        </button>
        {submitted ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-16 text-center">
            <span className="bg-brand-blue-light text-brand-blue inline-flex size-16 items-center justify-center rounded-full">
              <Check aria-hidden="true" className="size-8" />
            </span>
            <h2
              id="requirement-modal-title"
              className="text-ink mt-6 text-2xl font-extrabold sm:text-3xl"
            >
              Request Submitted Successfully
            </h2>
            <p className="text-muted-foreground mt-3 max-w-md leading-relaxed">
              Thank you. Our team will review your requirement and contact you shortly.
            </p>
            <Button size="lg" onClick={close} className="mt-7">
              Done
            </Button>
          </div>
        ) : (
          <>
            <div className="border-b px-6 py-6 pr-16 sm:px-8">
              <p className="text-brand-red text-xs font-bold tracking-[0.18em] uppercase">
                Miracle International
              </p>
              <h2
                id="requirement-modal-title"
                className="text-ink mt-2 text-2xl font-extrabold sm:text-3xl"
              >
                Tell Us What You Need
              </h2>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                Share your requirement and our team will help you find the right solution.
              </p>
            </div>
            <form
              onSubmit={submit}
              className="overflow-y-auto px-6 py-6 sm:px-8"
              noValidate
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full Name *">
                  <Input
                    required
                    value={form.fullName}
                    onChange={(event) => update("fullName", event.target.value)}
                  />
                </Field>
                <Field label="Email *">
                  <Input
                    required
                    type="email"
                    value={form.email}
                    onChange={(event) => update("email", event.target.value)}
                  />
                </Field>
                <Field label="Contact Number *">
                  <Input
                    required
                    type="tel"
                    value={form.contact}
                    onChange={(event) => update("contact", event.target.value)}
                  />
                </Field>
                <Field label="WhatsApp Number">
                  <Input
                    type="tel"
                    value={form.whatsapp}
                    onChange={(event) => update("whatsapp", event.target.value)}
                  />
                </Field>
                <Field label="Requirement Category *" full>
                  <select
                    required
                    value={form.category}
                    onChange={(event) => update("category", event.target.value)}
                    className="border-input bg-background text-ink mt-2 flex h-11 w-full rounded-lg border px-3 text-sm"
                  >
                    <option value="">Select a category</option>
                    {[
                      "Trading",
                      "Global Sourcing",
                      "Wholesale & Products",
                      "Business Solutions",
                      "Travel & Tourism",
                      "IT Solutions",
                      "Investment & Franchise",
                      "Other",
                    ].map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Requirement Details *" full>
                  <Textarea
                    required
                    rows={4}
                    value={form.details}
                    onChange={(event) => update("details", event.target.value)}
                  />
                </Field>
                <Field label="Country">
                  <Input
                    value={form.country}
                    onChange={(event) => update("country", event.target.value)}
                  />
                </Field>
                <Field label="Additional Requirements">
                  <Textarea
                    rows={2}
                    value={form.additional}
                    onChange={(event) => update("additional", event.target.value)}
                  />
                </Field>
              </div>
              <label className="border-input bg-surface mt-5 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed p-4 text-sm font-semibold">
                <FileUp aria-hidden="true" className="text-brand-blue size-5" />
                <span>
                  Optional Document Upload
                  <Input
                    type="file"
                    multiple
                    onChange={(event) => setFileCount(event.target.files?.length ?? 0)}
                    className="mt-2 block h-auto border-0 p-0 text-xs shadow-none"
                  />
                  {fileCount > 0 ? (
                    <small className="text-muted-foreground block font-normal">
                      {fileCount} file{fileCount === 1 ? "" : "s"} selected
                    </small>
                  ) : null}
                </span>
              </label>
              {error ? (
                <p className="text-brand-red mt-4 text-sm font-semibold" role="alert">
                  {error}
                </p>
              ) : null}
              <Button type="submit" size="xl" className="mt-6 w-full">
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

function Field({
  label,
  full = false,
  children,
}: {
  label: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={`text-ink text-sm font-semibold ${full ? "sm:col-span-2" : ""}`}>
      {label}
      {children}
    </label>
  );
}

export function HomeGateway() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const openForm = () => setIsFormOpen(true);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-white">
        <div
          aria-hidden="true"
          className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top_left,black_20%,transparent_70%)]"
        />
        <div className="container-page grid items-center gap-10 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-brand-red text-xs font-bold tracking-[0.18em] uppercase">
              Global trade • sourcing • solutions
            </p>
            <h1 className="text-ink mt-4 text-4xl leading-[1.04] font-extrabold tracking-tight sm:text-6xl">
              Global Business Solutions. One Trusted Partner.
            </h1>
            <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed sm:text-xl">
              Connecting people and businesses with global opportunities, products,
              services and practical solutions.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="xl" onClick={openForm}>
                Tell Us What You Need
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link href="#solutions">Explore Our Solutions</Link>
              </Button>
            </div>
          </div>
          <div className="shadow-lift relative aspect-[4/3] overflow-hidden rounded-3xl border-8 border-white lg:aspect-[5/4]">
            <Image
              src={SITE_MEDIA.investment.partnership.src}
              alt={SITE_MEDIA.investment.partnership.alt}
              fill
              priority
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="object-cover"
            />
            <span className="text-ink shadow-soft absolute top-5 left-5 rounded-full bg-white/95 px-4 py-2 text-xs font-bold">
              <Globe2 aria-hidden="true" className="text-brand-blue mr-2 inline size-4" />
              Connected worldwide
            </span>
          </div>
        </div>
      </section>

      <section id="solutions" className="section-y bg-surface">
        <div className="container-page">
          <SectionIntro
            eyebrow="Start anywhere"
            title="Explore Our Solutions"
            description="Everything you need to connect, source, trade, grow and move forward."
          />
          <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SHORTCUTS.map(([title, description, Icon, href]) => (
              <Link
                key={title}
                href={href}
                className="group hover:border-brand-blue/40 hover:shadow-soft rounded-2xl border bg-white p-5 transition-all hover:-translate-y-1"
              >
                <Icon
                  aria-hidden="true"
                  className="text-brand-blue size-6 transition-transform group-hover:scale-110"
                />
                <h3 className="text-ink mt-5 font-bold">{title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {description}
                </p>
                <span className="mt-5">
                  <ArrowLabel>Explore</ArrowLabel>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionIntro
              eyebrow="About Miracle International"
              title="Connecting Needs With Global Possibilities"
              description="Miracle International provides integrated business, trade, sourcing, investment, travel and technology solutions designed around the needs of individuals and businesses."
            />
            <p className="text-muted-foreground mt-4 max-w-xl leading-relaxed">
              Our approach is simple: understand what you need, connect you with the right
              opportunities and coordinate the solution from start to finish.
            </p>
            <Button asChild size="lg" variant="outline" className="mt-7">
              <Link href={ROUTES.public.about}>
                Discover Our Story
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <div className="shadow-soft relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src={SITE_MEDIA.handshake.src}
              alt={SITE_MEDIA.handshake.alt}
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionIntro
            eyebrow="What we do"
            title="Our Main Services"
            description="Core services designed to help you trade, grow, invest and build new opportunities."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-12">
            {SERVICES.map(([title, description, Icon, href], index) => (
              <article
                key={title}
                className={`group hover:border-brand-blue/40 hover:shadow-soft flex min-h-56 flex-col rounded-2xl border bg-white p-6 transition-all hover:-translate-y-1 ${index === 0 ? "lg:bg-brand-blue lg:col-span-6 lg:min-h-72 lg:text-white" : index < 3 ? "lg:col-span-3" : "lg:col-span-6"}`}
              >
                <Icon
                  aria-hidden="true"
                  className={`size-7 transition-transform group-hover:scale-110 ${index === 0 ? "text-brand-blue-muted" : "text-brand-blue"}`}
                />
                <h3
                  className={`mt-6 text-xl font-bold ${index === 0 ? "text-white" : "text-ink"}`}
                >
                  {title}
                </h3>
                <p
                  className={`mt-3 text-sm leading-relaxed ${index === 0 ? "text-white/75" : "text-muted-foreground"}`}
                >
                  {description}
                </p>
                <Link
                  href={href}
                  className={`mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold ${index === 0 ? "text-white" : "text-brand-blue"}`}
                >
                  Explore {title}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <MediaSection
        title="Need Something? We Can Help You Find It."
        description="Tell us what product or business requirement you have. We help identify suitable suppliers and sourcing opportunities from international markets."
        image={SITE_MEDIA.services.trading}
        href={ROUTES.public.globalSourcing}
        label="Explore Global Sourcing"
        points={[
          "Product Sourcing",
          "Supplier Search",
          "Supplier Verification",
          "Bulk Purchasing",
        ]}
      />
      <MediaSection
        title="Wholesale & Products"
        description="Access commercial products and wholesale supply solutions for businesses, organizations and bulk buyers."
        image={SITE_MEDIA.warehouse}
        href={ROUTES.public.wholesaleProducts}
        label="Explore Wholesale & Products"
        points={[
          "Wholesale Products",
          "Bulk Orders",
          "Commercial Supply",
          "Business Products",
        ]}
        reverse
      />
      <MediaSection
        title="Build. Develop. Expand."
        description="Practical business solutions to help you start, improve, develop and expand your business."
        image={SITE_MEDIA.services.introduction}
        href={ROUTES.public.businessSolutions}
        label="Explore Business Solutions"
        points={[
          "Business Setup",
          "Business Development",
          "Business Consulting",
          "Market Expansion",
          "Business Support",
        ]}
      />

      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionIntro
            eyebrow="Opportunities to explore"
            title="Explore New Business Opportunities"
            description="Discover investment and franchise opportunities with practical information and professional support."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {OPPORTUNITIES.map(({ title, description, image, href, label }) => (
              <article
                key={title}
                className="overflow-hidden rounded-2xl border bg-white"
              >
                <div className="relative aspect-[2.1] overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-ink text-2xl font-bold">{title}</h3>
                  <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                    {description}
                  </p>
                  <Button asChild variant="outline" size="lg" className="mt-6">
                    <Link href={href}>
                      {label}
                      <ArrowRight data-icon="inline-end" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <MediaSection
        title="Travel Beyond Boundaries"
        description="From customized journeys to flights, visa support and travel assistance, explore travel solutions designed around your needs."
        image={SITE_MEDIA.businessTravel}
        href={ROUTES.public.travelTourism}
        label="Explore Travel & Tourism"
        points={[
          "Inbound Travel",
          "Outbound Travel",
          "Customized Trips",
          "Flight Tickets",
          "Visa & Passport",
          "Work Visa Support",
        ]}
        reverse
      />
      <MediaSection
        title="Technology That Supports Your Business"
        description="Build your digital presence with practical technology and IT solutions for modern businesses."
        image={SITE_MEDIA.technology}
        href={ROUTES.public.itSolutions}
        label="Explore IT Solutions"
        points={[
          "Website Development",
          "Web Applications",
          "Business Systems",
          "Digital Solutions",
          "IT Consulting",
        ]}
      />

      <section className="section-y bg-white">
        <div className="container-page">
          <SectionIntro
            eyebrow="Why Miracle International"
            title="Why Work With Miracle International?"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {WHY_US.map(([title, description, Icon]) => (
              <article key={title} className="rounded-2xl border bg-white p-5">
                <Icon aria-hidden="true" className="text-brand-blue size-6" />
                <h3 className="text-ink mt-5 text-sm font-bold">{title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-navy relative isolate overflow-hidden text-white">
        <div aria-hidden="true" className="bg-grid-inverse absolute inset-0 -z-10" />
        <div className="container-page">
          <SectionIntro
            eyebrow="A clear path forward"
            title="How It Works"
            description="A simple process from your first requirement to the next practical step."
            inverse
          />
          <div className="mt-12 grid gap-8 md:grid-cols-5">
            {PROCESS.map(([number, title, description], index) => (
              <div key={number} className="relative">
                <span className="text-brand-blue-muted text-sm font-bold">{number}</span>
                <h3 className="mt-3 text-lg font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  {description}
                </p>
                {index < PROCESS.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="bg-brand-blue-muted/40 absolute top-2 left-9 hidden h-px w-[calc(100%-2rem)] md:block"
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-brand-blue-light/55">
        <div className="container-page">
          <div className="shadow-soft rounded-3xl bg-white px-6 py-12 sm:px-12 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:py-16">
            <div>
              <p className="text-brand-red text-xs font-bold tracking-[0.18em] uppercase">
                Start a conversation
              </p>
              <h2 className="text-ink mt-3 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
                Have a Requirement? Let’s Find the Right Solution.
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">
                Whether you need a product, supplier, business solution, travel service,
                investment opportunity or technology service, tell us what you need.
              </p>
            </div>
            <Button size="xl" onClick={openForm} className="mt-7 shrink-0 lg:mt-0">
              Tell Us What You Need
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <SectionIntro
              eyebrow="Let’s connect"
              title="Ready to Talk Through Your Next Step?"
              description="Have a question or need assistance? Our team is ready to help."
            />
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <a
                href={`tel:${APP_CONFIG.support.phone.replace(/\s+/g, "")}`}
                className="text-ink flex items-center gap-3 text-sm font-semibold"
              >
                <Phone className="text-brand-blue size-5" />
                {APP_CONFIG.support.phone}
              </a>
              <a
                href={`mailto:${APP_CONFIG.support.email}`}
                className="text-ink flex items-center gap-3 text-sm font-semibold"
              >
                <Mail className="text-brand-blue size-5" />
                {APP_CONFIG.support.email}
              </a>
              <span className="text-ink flex items-center gap-3 text-sm font-semibold">
                <MapPin className="text-brand-blue size-5" />
                {APP_CONFIG.support.address}
              </span>
              <span className="text-ink flex items-center gap-3 text-sm font-semibold">
                <Clock3 className="text-brand-blue size-5" />
                {APP_CONFIG.support.hours}
              </span>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={ROUTES.public.contact}>
                  Contact Us
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" onClick={openForm}>
                Send an Inquiry
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src={SITE_MEDIA.businessMeeting.src}
              alt={SITE_MEDIA.businessMeeting.alt}
              fill
              sizes="(min-width: 1024px) 32vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <RequirementModal open={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  );
}
