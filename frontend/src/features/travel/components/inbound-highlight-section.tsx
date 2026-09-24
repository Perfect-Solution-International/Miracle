import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Eyebrow } from "@/components/common/eyebrow";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";

/**
 * "Inbound Travel (Sri Lanka)" — a full-bleed photo banner, the most visually
 * prominent sub-service section since Sri Lanka tourism is the main focus.
 */
export function InboundHighlightSection() {
  return (
    <section
      id="inbound"
      aria-labelledby="inbound-heading"
      className="relative isolate overflow-hidden border-y scroll-mt-24"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src={SITE_MEDIA.travelCategoryCards.inbound.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="bg-brand-blue-dark/65 absolute inset-0" />
      </div>

      <div className="container-page flex flex-col items-start gap-5 py-16 text-left md:py-20">
        <Eyebrow tone="inverse">Sri Lanka Tourism</Eyebrow>
        <h2
          id="inbound-heading"
          className="max-w-xl text-3xl leading-[1.1] font-bold text-white sm:text-4xl lg:text-[2.75rem]"
        >
          Inbound Travel (Sri Lanka)
        </h2>
        <p className="max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
          Discover Sri Lanka through carefully planned journeys, local experiences and flexible
          travel solutions.
        </p>

        <Button asChild variant="accent" size="xl" className="mt-2">
          <Link href={ROUTES.public.inboundTravel}>
            Explore Sri Lanka Tours
            <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
