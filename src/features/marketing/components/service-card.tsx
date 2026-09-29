import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import type { ServiceSummary } from "../types/marketing.types";

/**
 * Service tile. Featured services render as a large photographic tile; the
 * rest are compact bordered cards. The title link is stretched so the whole
 * tile is one tab stop.
 */
export function ServiceCard({
  service,
  className,
}: {
  service: ServiceSummary;
  className?: string;
}) {
  const { icon: Icon, title, description, href, image, featured } = service;

  if (featured && image) {
    return (
      <article
        className={cn(
          "group bg-navy has-[a:focus-visible]:ring-ring relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-2xl p-7 text-white has-[a:focus-visible]:ring-2 sm:p-9",
          className,
        )}
      >
        <Image
          src={image.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="-z-20 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="from-navy via-navy/75 to-navy/10 absolute inset-0 -z-10 bg-gradient-to-t"
        />
        <span className="bg-brand-red absolute top-7 left-7 inline-flex h-7 items-center rounded-full px-3 text-[0.7rem] font-bold tracking-[0.14em] uppercase sm:top-9 sm:left-9">
          Core service
        </span>
        <span className="mb-5 inline-flex size-12 items-center justify-center rounded-lg bg-white/10 backdrop-blur">
          <Icon aria-hidden="true" className="size-6" />
        </span>
        <h3 className="text-2xl font-bold sm:text-3xl">
          <Link href={href} className="outline-none after:absolute after:inset-0">
            {title}
          </Link>
        </h3>
        <p className="mt-3 max-w-md leading-relaxed text-white/75">{description}</p>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold">
          Learn more
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group bg-card hover:border-brand-blue/30 hover:shadow-soft has-[a:focus-visible]:ring-ring relative flex items-center gap-4 rounded-2xl border p-5 transition-all duration-300 sm:flex-col sm:items-stretch sm:gap-6 sm:p-6 has-[a:focus-visible]:ring-2",
        className,
      )}
    >
      <div className="flex shrink-0 items-start justify-between">
        <span className="bg-brand-blue-light text-brand-blue group-hover:bg-brand-blue inline-flex size-11 items-center justify-center rounded-lg transition-colors duration-300 group-hover:text-white">
          <Icon aria-hidden="true" className="size-5" />
        </span>
        <ArrowUpRight
          aria-hidden="true"
          className="text-muted-foreground group-hover:text-brand-red hidden size-5 sm:block transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
      <div className="space-y-1 sm:mt-auto sm:space-y-2">
        <h3 className="text-ink text-lg leading-snug font-bold">
          <Link href={href} className="outline-none after:absolute after:inset-0">
            {title}
          </Link>
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </article>
  );
}
