import { Check } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import type { SiteImage } from "@/config/site-media";

const HIGHLIGHTS: Record<string, readonly string[]> = {
  "Website Development": [
    "Responsive Design",
    "Performance Focus",
    "Business-Focused UX",
    "Scalable Development",
  ],
  "Software Development": [
    "Custom Applications",
    "Workflow Solutions",
    "System Integration",
    "Scalable Architecture",
  ],
  "POS System Development": [
    "Sales Management",
    "Inventory Tracking",
    "Reporting",
    "Business Operations",
  ],
  "Business Management Systems": [
    "Centralized Operations",
    "Data Visibility",
    "Process Coordination",
    "Scalable Management",
  ],
  "Digital Solutions": [
    "Digital Workflows",
    "Connected Tools",
    "Customer Experience",
    "Process Improvement",
  ],
  "IT Consulting": [
    "Requirement Assessment",
    "Technology Planning",
    "Solution Guidance",
    "Implementation Advice",
  ],
  "Business Automation": [
    "Workflow Automation",
    "Reduced Manual Tasks",
    "Connected Processes",
    "Operational Efficiency",
  ],
};

export function ItDetailHero({
  title,
  description,
  image,
  children,
}: {
  title: string;
  description: string;
  image: SiteImage;
  children: ReactNode;
  eyebrow?: string;
  breadcrumbs?: readonly { label: string; href?: string }[];
}) {
  return (
    <section aria-labelledby="it-detail-heading" className="relative isolate overflow-hidden bg-white">
      <Image
        src={image.src}
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.78)_70%,rgba(255,255,255,0.20)_100%)] md:bg-[linear-gradient(to_right,rgba(255,255,255,0.99)_0%,rgba(255,255,255,0.97)_34%,rgba(255,255,255,0.78)_52%,rgba(255,255,255,0.28)_72%,rgba(255,255,255,0.02)_100%)]"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />

      <div className="container-page relative z-10 flex min-h-[620px] items-center py-16 sm:py-20 lg:min-h-[680px] lg:py-24">
        <div className="w-full max-w-2xl md:max-w-[60%] lg:max-w-[53%] xl:max-w-[49%]">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-brand-blue/20 bg-white px-4 py-1.5 text-brand-blue shadow-xs">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-blue" />
            </span>
            <span className="text-xs font-bold tracking-widest uppercase">{title}</span>
          </div>
          <h1
            id="it-detail-heading"
            className="text-navy mt-5 max-w-2xl text-4xl leading-[1.09] font-extrabold tracking-tight sm:text-5xl md:text-[2.75rem] lg:text-[3.4rem]"
          >
            {title}
          </h1>
          <p className="text-slate-700 mt-6 max-w-xl text-lg leading-relaxed">{description}</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Service highlights">
            {HIGHLIGHTS[title]?.map((highlight) => (
              <li
                key={highlight}
                className="text-navy inline-flex items-center gap-2 rounded-full border border-brand-blue/15 bg-white/95 px-3 py-1.5 text-xs font-semibold shadow-xs"
              >
                <Check aria-hidden="true" className="size-3.5 text-brand-blue" />
                {highlight}
              </li>
            ))}
          </ul>
          <div className="mt-8 [&>div]:flex-wrap">{children}</div>
        </div>
      </div>
    </section>
  );
}
