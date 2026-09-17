import { ArrowRight, PackageSearch } from "lucide-react";
import Link from "next/link";

import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";

import { PRODUCT_CATEGORIES } from "../data/product-categories";
import type { ProductCategory } from "../types/product-category.types";
import { WholesaleCategoryCard } from "./wholesale-category-card";

/** Positions (0-based) that render as wide tiles, varying the grid rhythm. */
const WIDE_POSITIONS = new Set([0, 5]);

export function WholesaleCategoriesSection({
  categories = PRODUCT_CATEGORIES,
}: {
  categories?: readonly ProductCategory[];
}) {
  return (
    <Section aria-labelledby="wholesale-heading">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="wholesale-heading"
          eyebrow="Wholesale & Products"
          title="Explore Wholesale Categories"
          description="Browse sourced product categories or ask us to find something specific for your business."
        />
        <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
          <Button asChild size="xl" className="hover:bg-brand-blue-dark">
            <Link href={ROUTES.public.products}>
              View All Products
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild size="xl" variant="outline" className="text-ink">
            <Link href={ROUTES.public.requestQuotation}>Request a Product</Link>
          </Button>
        </div>
      </div>

      <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-16 lg:grid-cols-4 lg:gap-5">
        {categories.map((category, index) => {
          const wide = WIDE_POSITIONS.has(index);
          return (
            <li key={category.slug} className={cn("reveal", wide && "lg:col-span-2")}>
              <WholesaleCategoryCard category={category} wide={wide} className="h-full" />
            </li>
          );
        })}
        <li className="reveal col-span-2">
          <div className="bg-brand-blue-light flex h-full flex-col justify-between gap-6 rounded-2xl p-6 sm:flex-row sm:items-center sm:p-8">
            <div className="flex items-start gap-4">
              <span className="text-brand-blue inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-white">
                <PackageSearch aria-hidden="true" className="size-6" />
              </span>
              <div>
                <h3 className="text-ink text-lg font-bold">
                  Can&apos;t find your product?
                </h3>
                <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                  Send the specification and quantity. We will source it and send a
                  quotation.
                </p>
              </div>
            </div>
            <Button asChild variant="accent" size="lg" className="h-11 shrink-0 px-5">
              <Link href={ROUTES.public.requestQuotation}>
                Request It
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </li>
      </ul>
    </Section>
  );
}
