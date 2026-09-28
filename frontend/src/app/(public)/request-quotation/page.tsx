import type { Metadata } from "next";
import {
  Calculator,
  Clock,
  FileCheck,
  Headphones,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Breadcrumb } from "@/components/common/breadcrumb";
import { CtaBanner } from "@/components/common/cta-banner";
import { Section } from "@/components/common/section";
import { ROUTES } from "@/config/routes";
import {
  NeedHelpCard,
  RequirementInquiryForm,
  WhyShareCard,
} from "@/features/requirements";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Request an Official Quotation";
const DESCRIPTION =
  "Submit your specifications for products, enterprise IT engineering, or commercial solutions to receive an accurate, itemized quotation within 24 hours.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.requestQuotation,
});

export default function Page() {
  return (
    <div className="flex flex-col">
      {/* ─── Modern Liquid Hero ─── */}
      <section className="relative isolate overflow-hidden border-b border-border/40 bg-white/70 backdrop-blur-md pt-8 pb-14 lg:pb-18">
        {/* Ambient Glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 left-1/2 -z-10 -translate-x-1/2 h-96 w-full max-w-6xl rounded-full bg-gradient-to-tr from-brand-blue/15 via-indigo-500/10 to-brand-red/10 blur-[100px]"
        />
        <div
          aria-hidden="true"
          className="bg-grid absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]"
        />

        <div className="container-page flex flex-col items-center text-center">
          <Breadcrumb
            items={[{ label: "Quotations" }, { label: "Request a Quotation" }]}
            className="mb-6"
          />

          {/* Glowing Status Pill */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-brand-blue/20 bg-brand-blue/5 px-4 py-1.5 backdrop-blur-md shadow-xs">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-blue" />
            </span>
            <span className="text-xs font-bold tracking-widest text-brand-blue uppercase">
              24-Hour Guaranteed Turnaround
            </span>
          </div>

          <h1 className="mt-5 max-w-3xl text-4xl leading-[1.08] font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Request an Official{" "}
            <span className="bg-gradient-to-r from-brand-blue to-indigo-600 bg-clip-text text-transparent">
              Quotation
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Get transparent, competitive, and verified pricing tailored precisely to
            your volume, timeline, and technical specifications.
          </p>

          {/* Quick SLA Trust Badges */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: Clock, label: "24h Response Time" },
              { icon: FileCheck, label: "Detailed Itemization" },
              { icon: ShieldCheck, label: "Verified Suppliers" },
              { icon: Calculator, label: "No Hidden Costs" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-2xl border border-brand-blue/15 bg-white/90 px-4 py-2.5 text-xs font-bold text-navy shadow-xs backdrop-blur-sm"
              >
                <Icon className="size-4 text-brand-blue shrink-0" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Form + Sidebar Section ─── */}
      <Section tone="surface" className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
          <RequirementInquiryForm />

          <div className="flex flex-col gap-6">
            <WhyShareCard />
            <NeedHelpCard />
          </div>
        </div>
      </Section>

      {/* ─── Bottom CTA ─── */}
      <CtaBanner
        title="Need Immediate Assistance or Have a Custom Project?"
        description="Our senior international trade and technical project directors are available for direct consultations."
        primary={{
          label: "Contact Advisors",
          href: ROUTES.public.contact,
        }}
        secondary={{
          label: "Explore Business Solutions",
          href: ROUTES.public.businessSolutions,
        }}
      />
    </div>
  );
}
