import Image from "next/image";

import { Breadcrumb } from "@/components/common/breadcrumb";
import { Eyebrow } from "@/components/common/eyebrow";
import { SITE_MEDIA } from "@/config/site-media";

/**
 * Contact page hero: a full-bleed port photograph washed out on the left so
 * the heading stays legible, with the brand line floating over the clearer
 * photo on the right.
 */
export function ContactHero() {
  return (
    <section aria-labelledby="contact-heading" className="relative isolate border-b">
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
          <Breadcrumb items={[{ label: "Contact Us" }]} />
          <Eyebrow>Get in Touch</Eyebrow>
          <h1
            id="contact-heading"
            className="text-ink text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl"
          >
            Contact <span className="text-brand-blue">Us</span>
          </h1>
          <p className="text-muted-foreground max-w-md text-base leading-relaxed sm:text-lg">
            We are here to help. Reach out to us for inquiries, quotations or any business
            requirements. Our team will get back to you as soon as possible.
          </p>
        </div>

        <div className="flex flex-col items-start gap-2 lg:items-end lg:text-right">
          <span aria-hidden="true" className="bg-brand-red h-0.5 w-8 rounded-full" />
          <p className="text-ink max-w-xs text-xl leading-snug font-bold text-pretty">
            &ldquo;Connecting Businesses Worldwide.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
