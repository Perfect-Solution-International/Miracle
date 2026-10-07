import Image from "next/image";
import Link from "next/link";

import { APP_CONFIG } from "@/config/app";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";

/**
 * Logo files live in `public/brand/`. The `inverse` file is the light-on-dark
 * version for navy surfaces. Drop in the approved artwork under the same file
 * names and every usage updates.
 */
const LOGO_SOURCES = {
  default: "/brand/logo-rbg.png",
  inverse: "/brand/logo-rbg.png",
} as const;

export function BrandLogo({
  variant = "default",
  className,
  imageClassName,
  preload = false,
}: {
  variant?: keyof typeof LOGO_SOURCES;
  className?: string;
  imageClassName?: string;
  /** Only the header logo, which is above the fold on every page. */
  preload?: boolean;
}) {
  return (
    <Link
      href={ROUTES.public.home}
      className={cn("inline-flex shrink-0 items-center rounded-md", className)}
    >
      <Image
        src={LOGO_SOURCES[variant]}
        alt={`${APP_CONFIG.name} home`}
        width={220}
        height={56}
        priority={preload}
        className={cn("h-10 w-auto sm:h-12 object-contain", imageClassName)}
      />
    </Link>
  );
}
