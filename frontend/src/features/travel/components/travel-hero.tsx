import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Eyebrow } from "@/components/common/eyebrow";
import { Button } from "@/components/ui/button";
import { SITE_MEDIA } from "@/config/site-media";

/** Full-bleed cinematic hero with the page's two primary actions. */
export function TravelHero() {
  return (
    <section
      aria-labelledby="travel-hero-heading"
      className="relative isolate overflow-hidden border-b"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src={SITE_MEDIA.businessTravel.src}
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        <div className="bg-brand-blue-dark/55 absolute inset-0" />
        <div className="from-brand-blue-dark/75 absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t to-transparent" />
      </div>

      <div className="container-page flex flex-col items-center gap-6 py-20 text-center md:py-28">
        <Eyebrow tone="inverse">Travel & Tourism</Eyebrow>
        <h1
          id="travel-hero-heading"
          className="max-w-3xl text-4xl leading-[1.08] font-extrabold tracking-tight text-white sm:text-5xl"
        >
          Your Journey, Our Expertise.
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
          Discover destinations, explore unforgettable experiences, and create a journey
          designed around your needs.
        </p>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="accent" size="xl">
            <Link href="#packages">
              Explore Travel Packages
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="outline-inverse" size="xl">
            <Link href="#customize-trip">Plan Your Trip</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
