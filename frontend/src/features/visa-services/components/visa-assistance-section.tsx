import {
  Briefcase,
  CheckCircle2,
  Clock,
  Globe2,
  GraduationCap,
  Plane,
} from "lucide-react";
import { Suspense } from "react";

import { Section } from "@/components/common/section";

import { VisaRequestForm } from "./visa-request-form";

const VISA_CATEGORIES = [
  {
    icon: Globe2,
    title: "Tourist & Visit Visas",
    description:
      "Assistance for Sri Lanka ETA, Dubai, Singapore, Schengen Europe, UK, USA, Thailand, Malaysia, and Maldives.",
  },
  {
    icon: Briefcase,
    title: "Business & Commercial Visas",
    description:
      "Documentation support for corporate conferences, trade missions, investor visits, and business delegations.",
  },
  {
    icon: Plane,
    title: "Transit & Layover Visas",
    description:
      "Quick processing advice for flight layovers, transit zones, and short connecting stops.",
  },
  {
    icon: GraduationCap,
    title: "Student & Training Visas",
    description:
      "Advisory on academic entry clearances, student documentation, and embassy appointment scheduling.",
  },
] as const;

const SERVICE_PILLARS = [
  "Comprehensive passport and document specification audit",
  "Application form verification to avoid costly rejections",
  "Embassy & VFS biometric appointment scheduling",
  "Tailored travel insurance and flight reservation advice",
] as const;

/**
 * Balanced two-column Visa Assistance section:
 * Left side: Category details, assistance scope, and trust points.
 * Right side: Embedded Visa Request Form.
 */
export function VisaAssistanceSection() {
  return (
    <Section className="bg-slate-50/60 py-14 sm:py-20" aria-labelledby="visa-assistance-heading">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-start">
        {/* Left Column: Details & Guidance */}
        <div className="flex flex-col gap-8 lg:col-span-5">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-blue/15 bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-blue shadow-2xs">
              <span className="size-2 rounded-full bg-brand-blue" aria-hidden="true" />
              Visa & Consular Desk
            </span>
            <h2
              id="visa-assistance-heading"
              className="text-ink text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl"
            >
              Visa Guidance Tailored to Your Destination
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Navigating international visa requirements can be intricate. Miracle International provides structured document auditing, embassy submission guidance, and personalized support to ensure your application is accurate and stress-free.
            </p>
          </div>

          {/* Visa Categories */}
          <div className="space-y-3.5">
            <p className="text-ink text-xs font-bold uppercase tracking-[0.14em]">
              Supported Visa Categories
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {VISA_CATEGORIES.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="shadow-2xs hover:shadow-soft group flex items-start gap-3.5 rounded-xl border border-slate-200/80 bg-white p-4 transition-all"
                >
                  <div className="bg-brand-blue-light/70 text-brand-blue flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors group-hover:bg-brand-blue group-hover:text-white">
                    <Icon aria-hidden="true" className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-ink text-sm font-bold">{title}</h3>
                    <p className="text-muted-foreground mt-0.5 text-xs leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Checklist & Support Pillars */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
            <p className="text-brand-blue text-xs font-bold uppercase tracking-widest">
              Our Assistance Scope
            </p>
            <ul className="mt-4 space-y-3">
              {SERVICE_PILLARS.map((pillar) => (
                <li key={pillar} className="flex items-start gap-3">
                  <CheckCircle2 aria-hidden="true" className="text-brand-blue mt-0.5 size-4.5 shrink-0" />
                  <span className="text-ink text-xs sm:text-sm font-medium leading-relaxed">{pillar}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 border-t border-slate-100 pt-4 flex items-center gap-3 text-xs text-muted-foreground">
              <Clock aria-hidden="true" className="text-brand-blue size-4 shrink-0" />
              <span>Fast initial evaluation within 24 to 48 business hours.</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visa Request Form */}
        <div className="lg:col-span-7">
          <Suspense fallback={null}>
            <VisaRequestForm embedded />
          </Suspense>
        </div>
      </div>
    </Section>
  );
}
