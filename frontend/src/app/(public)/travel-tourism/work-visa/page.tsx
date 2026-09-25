import { ArrowRight, BriefcaseBusiness, Check, CheckCircle2, ClipboardCheck, FileSearch, MessageCircle, Send, BellRing } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Breadcrumb } from "@/components/common/breadcrumb";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";
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

const PROCESS_STEPS = [
  { icon: Send, title: "Request Submitted" },
  { icon: FileSearch, title: "Document Review" },
  { icon: MessageCircle, title: "Consultation" },
  { icon: ClipboardCheck, title: "Visa Guidance" },
  { icon: BriefcaseBusiness, title: "Application Support" },
  { icon: BellRing, title: "Status Updates" },
] as const;

export default function Page() {
  return (
    <>
      <section className="bg-navy relative isolate overflow-hidden text-white">
        <div aria-hidden="true" className="bg-grid-inverse absolute inset-0 -z-10 opacity-60" />
        <div className="container-page grid items-center gap-12 py-14 md:grid-cols-[1fr_0.9fr] md:py-20 lg:gap-20 lg:py-24">
          <div>
            <Breadcrumb tone="inverse" items={[{ label: "Travel & Tourism", href: ROUTES.public.travelTourism }, { label: "Work Visa Support" }]} />
            <p className="text-brand-blue-muted mt-10 text-xs font-bold tracking-[0.18em] uppercase">International mobility support</p>
            <h1 className="mt-4 max-w-xl text-4xl leading-[1.05] font-extrabold sm:text-5xl lg:text-6xl">Work Visa Support</h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">Get professional assistance with your work visa journey, documentation, and employment-related requirements.</p>
            <Button asChild variant="accent" size="xl" className="mt-8"><Link href="#work-visa-request">Apply for Work Visa Support<ArrowRight data-icon="inline-end" aria-hidden="true" /></Link></Button>
          </div>
          <div className="relative min-h-72 overflow-hidden rounded-2xl border border-white/15 shadow-2xl md:min-h-[26rem]">
            <Image src={SITE_MEDIA.travelCategoryCards.customized.src} alt="International professional travelling for work" fill priority sizes="(max-width: 768px) 100vw, 45vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue-dark/70 via-transparent to-brand-red/20" />
            <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-xl border border-white/15 bg-navy/80 px-4 py-3 backdrop-blur-sm"><BriefcaseBusiness aria-hidden="true" className="text-brand-blue-muted size-5" /><span className="text-sm font-semibold">Guidance for your next opportunity</span></div>
          </div>
        </div>
      </section>

      <WorkVisaSupportForm />

      <section className="bg-white px-5 py-16 sm:px-8 md:py-20" aria-labelledby="work-visa-process-heading">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center"><p className="text-brand-blue text-xs font-bold tracking-[0.16em] uppercase">A clear path forward</p><h2 id="work-visa-process-heading" className="text-ink mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">From request to readiness</h2></div>
          <ol className="mx-auto mt-12 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-6">
            {PROCESS_STEPS.map(({ icon: Icon, title }, index) => <li key={title} className="relative text-center lg:text-left"><div className="bg-brand-blue-light text-brand-blue mx-auto flex size-12 items-center justify-center rounded-xl lg:mx-0"><Icon aria-hidden="true" className="size-5" /></div><p className="text-ink mt-4 text-sm font-bold">{title}</p>{index < PROCESS_STEPS.length - 1 ? <span aria-hidden="true" className="bg-brand-blue-muted absolute top-6 left-[calc(50%+2.5rem)] hidden h-px w-[calc(100%-1rem)] lg:block" /> : null}</li>)}
          </ol>
        </div>
      </section>
    </>
  );
}
