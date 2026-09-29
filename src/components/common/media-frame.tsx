import Image from "next/image";

import type { SiteImage } from "@/config/site-media";
import { cn } from "@/lib/utils";

/**
 * Responsive photo in a fixed aspect-ratio frame.
 *
 * `sizes` must describe the rendered width at each breakpoint so the browser
 * downloads an appropriately sized file; the default suits a half-width column.
 */
export function MediaFrame({
  image,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  aspect = "aspect-[4/3]",
  preload = false,
  overlay = false,
  className,
  imageClassName,
}: {
  image: SiteImage;
  sizes?: string;
  aspect?: string;
  /** Above-the-fold hero images only: preloads for LCP. */
  preload?: boolean;
  /** Adds a navy gradient so overlaid content stays legible. */
  overlay?: boolean;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <div
      className={cn("bg-surface relative overflow-hidden rounded-2xl", aspect, className)}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        preload={preload}
        className={cn("object-cover", imageClassName)}
      />
      {overlay ? (
        <div
          aria-hidden="true"
          className="from-navy/85 via-navy/25 absolute inset-0 bg-gradient-to-t to-transparent"
        />
      ) : null}
    </div>
  );
}
