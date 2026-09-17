import type { ReactNode } from "react";

import type { SiteImage } from "@/config/site-media";
import { cn } from "@/lib/utils";

import { Breadcrumb, type BreadcrumbItem } from "./breadcrumb";
import { Eyebrow } from "./eyebrow";
import { MediaFrame } from "./media-frame";

/**
 * Hero for inner public pages: breadcrumb, eyebrow, the page's only `h1`, and an
 * optional image. The homepage has its own, larger hero.
 */
export function PageHero({
  title,
  description,
  eyebrow,
  breadcrumbs,
  image,
  children,
  className,
}: {
  title: string;
  description: string;
  eyebrow?: string;
  breadcrumbs: readonly BreadcrumbItem[];
  image?: SiteImage;
  /** CTA row or other supporting content under the description. */
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn("bg-surface relative isolate overflow-hidden border-b", className)}
    >
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />
      <div
        className={cn(
          "container-page grid gap-10 py-12 md:py-16 lg:py-20",
          image && "lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16",
        )}
      >
        <div className="flex flex-col gap-6">
          <Breadcrumb items={breadcrumbs} />
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h1 className="text-ink text-4xl leading-[1.08] font-extrabold sm:text-5xl lg:text-[3.5rem]">
            {title}
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed text-pretty">
            {description}
          </p>
          {children}
        </div>
        {image ? (
          <MediaFrame
            image={image}
            preload
            aspect="aspect-[4/3] lg:aspect-[5/4]"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="shadow-lift"
          />
        ) : null}
      </div>
    </section>
  );
}
