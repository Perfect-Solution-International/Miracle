import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Breadcrumb } from "@/components/common/breadcrumb";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";

/** Full-bleed cinematic hero with a subtle overlay so the copy stays readable. */
export function VisaHero() {
  return (
    <section
      aria-labelledby="visa-hero-heading"
      className="relative isolate overflow-hidden border-b"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src={SITE_MEDIA.travelCategoryCards.customized.src}
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        <div className="bg-brand-blue-dark/60 absolute inset-0" />
        <div className="from-brand-blue-dark/75 absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t to-transparent" />
      </div>

      <div className="container-page flex flex-col items-center gap-6 py-16 text-center md:py-24">
        <Breadcrumb
          tone="inverse"
          items={[
            { label: "Travel & Tourism", href: ROUTES.public.travelTourism },
            { label: "Visa Services" },
          ]}
        />
        <h1
          id="visa-hero-heading"
          className="max-w-2xl text-4xl leading-[1.08] font-extrabold tracking-tight text-white sm:text-5xl"
        >
          Visa Assistance Made Simple
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
          Tell us about your travel plans and our team will guide you through the visa
          process.
        </p>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="accent" size="xl">
            <Link href="#visa-request-form">
              Request Visa Assistance
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="outline-inverse" size="xl">
            <Link href="#visa-types">View Visa Types</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
