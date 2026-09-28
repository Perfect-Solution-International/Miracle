import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Clock,
  Code2,
  Cpu,
  Factory,
  Globe2,
  Headphones,
  Package,
  Plane,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Breadcrumb } from "@/components/common/breadcrumb";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";
import { cn } from "@/lib/utils";

export const CATEGORY_CARDS = [
  {
    id: "sourcing",
    title: "Global Sourcing & Trade",
    description: "Machinery, raw materials, wholesale goods & international supply chain.",
    image: SITE_MEDIA.portAerial,
    icon: Globe2,
    badge: "50+ Countries",
  },
  {
    id: "it",
    title: "IT & Software Engineering",
    description: "Custom ERPs, POS systems, web & mobile applications, and automation.",
    image: SITE_MEDIA.technology,
    icon: Code2,
    badge: "Enterprise Ready",
  },
  {
    id: "machinery",
    title: "Machinery & Equipment",
    description: "Industrial equipment, production lines, and commercial tools.",
    image: SITE_MEDIA.manufacturing,
    icon: Factory,
    badge: "Certified Quality",
  },
  {
    id: "travel",
    title: "Travel & Tourism Support",
    description: "Bespoke Sri Lanka tours, outbound journeys, flight ticketing & visa handling.",
    image: SITE_MEDIA.businessTravel,
    icon: Plane,
    badge: "End-to-End Care",
  },
];

export function TellUsWhatYouNeedHero() {
  return (
    <section
      aria-labelledby="tell-us-heading"
      className="relative isolate overflow-hidden border-b border-border/40 bg-white/70 backdrop-blur-md pt-8 pb-16 lg:pb-24"
    >
      {/* Liquid Ambient Glow Mesh */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -z-10 -translate-x-1/2 h-[520px] w-full max-w-7xl rounded-full bg-gradient-to-tr from-brand-blue/15 via-indigo-500/10 to-brand-red/12 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 -z-10 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />

      <div className="container-page">
        {/* Breadcrumb & Pulsing Status Badge */}
        <div className="flex flex-col items-center text-center">
          <Breadcrumb items={[{ label: "Tell Us What You Need" }]} className="mb-5" />

          <div className="inline-flex items-center gap-2.5 rounded-full border border-brand-blue/20 bg-brand-blue/5 px-4 py-1.5 backdrop-blur-md shadow-xs">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-blue" />
            </span>
            <span className="text-xs font-bold tracking-widest text-brand-blue uppercase">
              Global Procurement &amp; Solutions Hub
            </span>
          </div>

          <h1
            id="tell-us-heading"
            className="mt-6 max-w-4xl text-4xl leading-[1.06] font-extrabold tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-[4rem]"
          >
            Your Requirements.{" "}
            <span className="bg-gradient-to-r from-brand-blue via-indigo-600 to-brand-blue bg-clip-text text-transparent">
              Engineered From A to Z.
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Tell us what products, enterprise software, industrial machinery, or travel
            services you require. Our specialists coordinate verified solutions, transparent
            pricing, and flawless execution.
          </p>

          {/* SLA Trust Badges */}
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {[
              { icon: Clock, text: "24-Hour Guaranteed Quote" },
              { icon: ShieldCheck, text: "Verified Quality Compliance" },
              { icon: Headphones, text: "Dedicated Project Advisor" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 rounded-full border border-brand-blue/15 bg-white/90 px-4 py-1.5 text-xs font-bold text-navy shadow-xs backdrop-blur-sm"
              >
                <Icon className="size-3.5 text-brand-blue" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          {/* Quick Anchor CTA */}
          <div className="mt-8 flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center justify-center gap-3.5">
            <Button
              asChild
              variant="accent"
              size="xl"
              className="shadow-xl shadow-brand-red/20 font-bold"
            >
              <a href="#intake-form">
                Fill Intake Form <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="outline" size="xl" className="bg-white/80">
              <Link href={ROUTES.public.contact}>Speak to an Advisor</Link>
            </Button>
          </div>
        </div>

        {/* ─── 4 Visual Category Selector Cards with Real Images ─── */}
        <div className="mt-14 lg:mt-20">
          <div className="mb-6 flex flex-col items-center text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
              Select Your Area of Interest
            </span>
            <p className="mt-1 text-sm text-muted-foreground">
              Choose a category below to explore specific capabilities or jump straight into the form.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORY_CARDS.map((cat) => {
              const Icon = cat.icon;
              return (
                <a
                  key={cat.id}
                  href="#intake-form"
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-blue/40 hover:shadow-2xl"
                >
                  {/* Image Container with Gradient Overlay */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <Image
                      src={cat.image.src}
                      alt={cat.image.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent"
                    />
                    {/* Badge */}
                    <span className="absolute top-3 right-3 rounded-full border border-white/30 bg-navy/70 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-md">
                      {cat.badge}
                    </span>
                    {/* Floating Icon */}
                    <div className="absolute bottom-3 left-3 flex size-9 items-center justify-center rounded-xl bg-white/95 text-brand-blue shadow-md backdrop-blur-sm">
                      <Icon className="size-5" />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-base font-bold text-ink transition-colors group-hover:text-brand-blue">
                      {cat.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {cat.description}
                    </p>
                    <div className="mt-auto pt-4 flex items-center gap-1.5 text-xs font-bold text-brand-blue">
                      <span>Select category</span>
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
