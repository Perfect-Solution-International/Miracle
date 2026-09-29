import Image from "next/image";

import type { SiteImage } from "@/config/site-media";

/**
 * Compact hero banner with a subtle soft blur on the high-quality travel image,
 * without any text or heading, designed for the Inbound & Outbound travel pages.
 */
export function CompactBlurredHero({
  image,
}: {
  image: SiteImage;
}) {
  return (
    <section
      aria-label="Travel Destinations Banner"
      className="relative isolate w-full overflow-hidden border-b bg-slate-100"
    >
      <div className="relative h-44 w-full overflow-hidden sm:h-52 md:h-60 lg:h-64">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="scale-105 object-cover object-center blur-[2px]"
        />
        {/* Soft, light gradient overlay to keep it bright and professional */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/20" />
      </div>
    </section>
  );
}
