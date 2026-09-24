import Image from "next/image";

import { Breadcrumb } from "@/components/common/breadcrumb";
import { SITE_MEDIA } from "@/config/site-media";

/**
 * About page hero: a full-bleed port photograph washed out on the left so the
 * breadcrumb and heading stay legible, with the brand line floating over the
 * clearer photo on the right.
 */
export function AboutHero() {
  return (
    <section aria-labelledby="about-heading" className="relative isolate border-b">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src={SITE_MEDIA.heroPort.src}
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-white/10" />
      </div>

      <div className="container-page grid gap-6 py-14 lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-10 lg:py-20">
        <div className="flex flex-col gap-4">
          <Breadcrumb items={[{ label: "About Us" }]} />
          <h1
            id="about-heading"
            className="text-ink max-w-xl text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl"
          >
            About Miracle International
          </h1>
          <span aria-hidden="true" className="bg-brand-red h-1 w-14 rounded-full" />
          <p className="text-muted-foreground max-w-md text-base leading-relaxed sm:text-lg">
            Connecting businesses with global opportunities through trusted sourcing,
            trading and business solutions.
          </p>
        </div>

        <div className="flex flex-col items-start gap-2 lg:items-end lg:text-right">
          <span aria-hidden="true" className="bg-brand-red h-0.5 w-8 rounded-full" />
          <p className="text-ink max-w-xs text-xl leading-snug font-bold text-pretty">
            &ldquo;Bridging Markets. Building Opportunities.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
