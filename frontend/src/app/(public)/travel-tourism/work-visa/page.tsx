import {
  BellRing,
  Briefcase,
  BriefcaseBusiness,
  ClipboardCheck,
  FileCheck,
  FileSearch,
  HeartPulse,
  HelpCircle,
  MessageCircle,
  Plane,
  Send,
  ShieldCheck,
  Stamp,
} from "lucide-react";
import type { Metadata } from "next";

import { Section } from "@/components/common/section";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";
import { TravelSubpageHero } from "@/features/travel";
import { WorkVisaSupportForm } from "@/features/visa-services";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Work Visa Support";
const DESCRIPTION = "Get professional assistance with your work visa journey, documentation, and employment-related requirements.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.workVisa,
  image: SITE_MEDIA.travelCategoryCards.customized,
});

const WORK_VISA_PILLARS = [
  {
    icon: FileCheck,
    title: "Document Verification & Auditing",
    description:
      "Thorough review of academic transcripts, trade qualifications, and employment contracts against destination requirements.",
  },
  {
    icon: Stamp,
    title: "Ministry & Consular Attestation",
    description:
      "Step-by-step guidance on Foreign Affairs, notary, and embassy attestation protocols for official paperwork.",
  },
  {
    icon: ShieldCheck,
    title: "Country-Specific Embassy Checklists",
    description:
      "Clear requirement guidelines for Middle East (UAE, Qatar, Saudi Arabia), Asia-Pacific, and European destinations.",
  },
  {
    icon: Briefcase,
    title: "Employment Paperwork Review",
    description:
      "Assistance in organizing employment offer letters, sponsor letters, and ministry labor quota certificates.",
  },
  {
    icon: HeartPulse,
    title: "Medical & Biometrics Guidance",
    description:
      "Navigating authorized panel medical centers, GAMCA/Wafid health screening, and VFS/biometric appointments.",
  },
  {
    icon: Plane,
    title: "Relocation & Pre-Departure Briefing",
    description:
      "Assistance with flight ticketing, overseas insurance, and practical arrival guidelines so you start smoothly.",
  },
] as const;

const PROCESS_STEPS = [
  { icon: Send, title: "Request Submitted" },
  { icon: FileSearch, title: "Document Review" },
  { icon: MessageCircle, title: "Consultation" },
  { icon: ClipboardCheck, title: "Visa Guidance" },
  { icon: BriefcaseBusiness, title: "Application Support" },
  { icon: BellRing, title: "Status Updates" },
] as const;

const FAQS = [
  {
    q: "What is Miracle International's role in the work visa process?",
    a: "We act as your professional document preparation, advisory, and travel logistics partner. We help you review, format, and attest your documents correctly according to official embassy rules. We do not recruit or guarantee visa approval, which remains the sole prerogative of the respective government authorities.",
  },
  {
    q: "Which destinations do you support?",
    a: "We provide documentation guidance for popular employment destinations including the UAE, Qatar, Saudi Arabia, Kuwait, Oman, as well as selected European and East Asian work permit documentation.",
  },
  {
    q: "How early should I begin document preparation?",
    a: "We recommend commencing your document verification and attestation process 4 to 8 weeks prior to your target deployment, allowing ample time for ministry seals and consulate approvals.",
  },
] as const;

export default function Page() {
  return (
    <>
      <TravelSubpageHero
        breadcrumbs={[
          { label: "Travel & Tourism", href: ROUTES.public.travelTourism },
          { label: "Work Visa" },
        ]}
        categoryLabel="Work Visa Services"
        title="Take the Next Step Toward Working Abroad"
        description="Get practical support with your work visa process and prepare your travel documentation based on your destination and requirements."
        image={SITE_MEDIA.workVisaHero}
        primary={{ label: "Request Visa Support", href: "#work-visa-request" }}
      />

      {/* Balanced Two-Column Section: Left = Guidance Details, Right = Request Form */}
      <Section className="bg-slate-50/60 py-14 sm:py-20" aria-labelledby="work-visa-pillars-heading">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Left Column: Guidance Details & Pillars */}
          <div className="flex flex-col gap-8 lg:col-span-5">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-blue/15 bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-blue shadow-2xs">
                <span className="size-2 rounded-full bg-brand-blue" aria-hidden="true" />
                Work Visa Advisory
              </span>
              <h2
                id="work-visa-pillars-heading"
                className="text-ink text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl"
              >
                How We Support Your International Move
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Navigating international work visa paperwork can be intricate. We provide structured, step-by-step guidance to ensure your documentation meets all destination standards.
              </p>
            </div>

            {/* 6 Key Pillars */}
            <div className="space-y-3.5">
              <p className="text-ink text-xs font-bold uppercase tracking-[0.14em]">
                Key Support Areas
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {WORK_VISA_PILLARS.map(({ icon: Icon, title, description }) => (
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

            {/* Compliance Note */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs text-xs text-muted-foreground leading-relaxed">
              <span className="text-ink font-bold block mb-1">Advisory &amp; Logistics Scope</span>
              Miracle International acts as your document preparation and travel logistics partner. We assist with authentications and clearances according to official government standards.
            </div>
          </div>

          {/* Right Column: Work Visa Support Form */}
          <div className="lg:col-span-7">
            <WorkVisaSupportForm embedded />
          </div>
        </div>
      </Section>

      {/* 6-Step Process */}
      <section className="bg-white px-5 py-16 sm:px-8 md:py-20" aria-labelledby="work-visa-process-heading">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-brand-blue text-xs font-bold tracking-[0.16em] uppercase">A clear path forward</p>
            <h2 id="work-visa-process-heading" className="text-ink mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              From request to readiness
            </h2>
          </div>
          <ol className="mx-auto mt-12 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-6">
            {PROCESS_STEPS.map(({ icon: Icon, title }, index) => (
              <li key={title} className="relative text-center lg:text-left">
                <div className="bg-brand-blue-light text-brand-blue mx-auto flex size-12 items-center justify-center rounded-xl lg:mx-0">
                  <Icon aria-hidden="true" className="size-5" />
                </div>
                <p className="text-ink mt-4 text-sm font-bold">{title}</p>
                {index < PROCESS_STEPS.length - 1 ? (
                  <span aria-hidden="true" className="bg-brand-blue-muted absolute top-6 left-[calc(50%+2.5rem)] hidden h-px w-[calc(100%-1rem)] lg:block" />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Helpful Advisory & FAQs */}
      <Section className="bg-slate-50/70 border-t border-slate-200/80 py-16 sm:py-20" aria-labelledby="work-visa-faq-heading">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-brand-blue text-xs font-bold uppercase tracking-widest">Helpful Information</p>
            <h2 id="work-visa-faq-heading" className="text-ink mt-2 text-2xl font-extrabold sm:text-3xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft">
                <div className="flex items-start gap-3">
                  <HelpCircle aria-hidden="true" className="text-brand-blue size-5 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-ink text-base font-bold">{q}</h3>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
