import Image from "next/image";

import { Section } from "@/components/common/section";

import type { TravelPackageDetail } from "../../types/travel-package-detail.types";

/** Image gallery beneath the hero cover photo. Renders nothing when a package
 * has no extra gallery photos. */
export function PackageGallerySection({ detail }: { detail: TravelPackageDetail }) {
  if (detail.gallery.length === 0) return null;

  return (
    <Section aria-labelledby="gallery-heading">
      <h2 id="gallery-heading" className="sr-only">
        Photo Gallery
      </h2>

      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {detail.gallery.map((photo, index) => (
          <li
            key={photo.src}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl first:col-span-2 first:row-span-2 first:aspect-square lg:first:aspect-[4/3]"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover"
              preload={index === 0}
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
