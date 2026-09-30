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
    <section aria-labelledby="it-detail-heading" className="public-hero">
      <Image
        src={image.src}
        alt=""
        fill
        preload
        sizes="100vw"
        className="public-hero-media object-cover"
      />
      <div
        aria-hidden="true"
        className="public-hero-haze"
      />
      <div aria-hidden="true" className="public-hero-fade" />

      <div className="container-page public-hero-content">
        <div className="public-hero-copy md:max-w-[60%] lg:max-w-[53%] xl:max-w-[49%]">
          <div className="public-hero-badge text-brand-blue">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-blue" />
            </span>
            <span className="text-xs font-bold tracking-widest uppercase">{title}</span>
          </div>
          <h1
            id="it-detail-heading"
            className="public-hero-title"
          >
            {title}
          </h1>
          <p className="public-hero-description">{description}</p>
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
          <div className="public-hero-actions [&>div]:flex-wrap">{children}</div>
        </div>
      </div>
    </section>
  );
}
