import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";

import type { ProductCategory } from "../types/product-category.types";

export function categoryHref(slug: string) {
  return `${ROUTES.public.products}?category=${encodeURIComponent(slug)}`;
}

/** Image-forward category tile linking to the server-filtered catalogue. */
export function WholesaleCategoryCard({
  category,
  wide = false,
  className,
}: {
  category: ProductCategory;
  /** Spans two columns on large screens; uses a wider crop. */
  wide?: boolean;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group bg-navy has-[a:focus-visible]:ring-ring relative isolate flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-2xl p-4 text-white has-[a:focus-visible]:ring-2 sm:aspect-[4/5] sm:p-6",
        wide && "sm:aspect-[4/5] lg:aspect-auto",
        className,
      )}
    >
      <Image
        src={category.image.src}
        alt=""
        fill
        sizes={
          wide
            ? "50vw"
            : "(min-width: 1024px) 25vw, 50vw"
        }
        className="-z-20 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div
        aria-hidden="true"
        className="from-navy/90 via-navy/30 absolute inset-0 -z-10 bg-gradient-to-t to-transparent transition-opacity duration-500 group-hover:opacity-90"
      />
      <span
        aria-hidden="true"
        className="text-ink absolute top-4 right-4 inline-flex size-10 translate-y-1 items-center justify-center rounded-full bg-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
      >
        <ArrowUpRight className="size-4" />
      </span>
      <h3 className="text-base leading-tight font-bold sm:text-xl">
        <Link
          href={categoryHref(category.slug)}
          className="outline-none after:absolute after:inset-0"
        >
          {category.name}
        </Link>
      </h3>
      <p className="mt-1 hidden text-sm text-white/75 sm:block">{category.description}</p>
      <span
        aria-hidden="true"
        className="bg-brand-red mt-4 h-0.5 w-8 rounded-full transition-all duration-500 group-hover:w-16"
      />
    </article>
  );
}
