import Image from "next/image";
import { ArrowRight, CheckCircle2, Factory, Globe2, Sparkles } from "lucide-react";

import { SITE_MEDIA } from "@/config/site-media";

const INDUSTRIES = [
  {
    title: "Industrial & Machinery",
    subtitle: "Custom Equipment & Production Lines",
    image: SITE_MEDIA.productCategories.machinery,
    badge: "Verified Sourcing",
  },
  {
    title: "Enterprise Technology",
    subtitle: "Custom ERPs, Web & POS Systems",
    image: SITE_MEDIA.technology,
    badge: "Engineered In-House",
  },
  {
    title: "Electrical & Components",
    subtitle: "Commercial Power & Electronics",
    image: SITE_MEDIA.productCategories.electrical,
    badge: "International Standards",
  },
  {
    title: "Construction & Raw Materials",
    subtitle: "Aggregates, Steel & Building Supplies",
    image: SITE_MEDIA.productCategories.construction,
    badge: "Bulk Logistics",
  },
  {
    title: "Garments & Textiles",
    subtitle: "Commercial Apparel & Uniforms",
    image: SITE_MEDIA.productCategories.clothing,
    badge: "Factory Direct",
  },
  {
    title: "Agricultural Commodities",
    subtitle: "Fresh Produce & Processed Goods",
    image: SITE_MEDIA.productCategories.agriculture,
    badge: "Cold-Chain Ready",
  },
];

export function IntakeIndustryGallery() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-50/70 py-16 lg:py-24 border-y border-border/50">
      <div className="container-page">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/5 px-4 py-1 text-xs font-bold uppercase tracking-wider text-brand-blue">
            <Sparkles className="size-3.5" />
            <span>Proven Sector Expertise</span>
          </div>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl md:text-5xl">
            Sourcing &amp; Solutions Across Major Industries
          </h2>

          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Whether your inquiry is for specialized high-tech machinery, enterprise
            cloud software, or bulk trade commodities, our network delivers.
          </p>
        </div>

        {/* 6 High-Quality Image Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind) => (
            <div
              key={ind.title}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:border-brand-blue hover:shadow-[0_12px_30px_rgba(15,23,42,0.14)]"
            >
              {/* Image with zoom effect */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <Image
                  src={ind.image.src}
                  alt={ind.image.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent"
                />

                {/* Top Badge */}
                <span className="absolute top-3 left-3 rounded-full border border-white/20 bg-white/90 px-3 py-1 text-[11px] font-bold text-navy backdrop-blur-md shadow-xs">
                  {ind.badge}
                </span>

                {/* Bottom Overlay Label */}
                <div className="absolute inset-x-4 bottom-4 text-white">
                  <h3 className="text-lg font-bold drop-shadow-sm">{ind.title}</h3>
                  <p className="mt-0.5 text-xs text-white/80">{ind.subtitle}</p>
                </div>
              </div>

              {/* Action row */}
              <div className="flex items-center justify-between p-4 bg-white">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                  <CheckCircle2 className="size-3.5 text-brand-blue" />
                  <span>Customizable specs</span>
                </div>
                <a
                  href="#intake-form"
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-blue group-hover:text-brand-red transition-colors"
                >
                  <span>Request quote</span>
                  <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
