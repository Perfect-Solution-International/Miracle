import { ChevronDown } from "lucide-react";
import Image from "next/image";

import { SITE_MEDIA } from "@/config/site-media";

import { TRADE_HIGHLIGHTS } from "../data/import-export.content";
import { ImportExportRequestForm } from "./import-export-request-form";

/**
 * Import & Export landing hero: a full-bleed port photograph behind the brand
 * copy, with the request form floating in front as the page's one action.
 */
export function ImportExportHero() {
  return (
    <section
      aria-labelledby="import-export-heading"
      className="relative isolate border-b"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src={SITE_MEDIA.heroPort.src}
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white/90" />
      </div>

      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1fr_minmax(360px,460px)_1fr] lg:items-center lg:gap-8 lg:py-24">
        <div className="hidden flex-col gap-7 lg:flex">
          <span aria-hidden="true" className="bg-brand-red h-0.5 w-8 rounded-full" />
          <h1
            id="import-export-heading"
            className="text-brand-blue-muted text-4xl leading-[1.05] font-extrabold tracking-tight uppercase xl:text-[2.75rem]"
          >
            Connecting Markets Creating Opportunities
          </h1>
          <p className="text-muted-foreground max-w-xs text-base leading-relaxed">
            Trusted trade solutions for a more connected world.
          </p>

          <ul className="mt-4 flex flex-col gap-5">
            {TRADE_HIGHLIGHTS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="bg-brand-blue-light text-brand-blue inline-flex size-10 shrink-0 items-center justify-center rounded-full">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <span className="text-ink text-sm font-bold tracking-wide uppercase">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <ImportExportRequestForm className="mx-auto w-full max-w-md" />

        <div className="hidden flex-col items-end gap-16 text-right lg:flex">
          <div className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="bg-brand-red mt-1.5 h-0.5 w-8 rounded-full"
            />
            <p className="text-brand-blue-muted text-lg leading-tight font-extrabold uppercase">
              Global Sourcing
              <br />
              Global Growth
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="bg-brand-red mt-1.5 h-0.5 w-8 rounded-full"
            />
            <p className="text-brand-blue-muted text-lg leading-tight font-extrabold uppercase">
              A Brighter Tomorrow
              <br />
              Through Trade
            </p>
          </div>
        </div>
      </div>

      <div className="relative flex justify-center border-t border-black/5 py-4">
        <span
          aria-hidden="true"
          className="border-input text-muted-foreground flex size-10 items-center justify-center rounded-full border bg-white"
        >
          <ChevronDown className="size-4" />
        </span>
      </div>
    </section>
  );
}
