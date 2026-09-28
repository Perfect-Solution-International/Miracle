import type { Metadata } from "next";

import { ROUTES } from "@/config/routes";
import { DEFAULT_PACKAGES } from "@/lib/storage/default-travel-packages";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { PackageDetailClient } from "./package-detail-client";

export function generateStaticParams() {
  return DEFAULT_PACKAGES.filter((p) => Boolean(p.slug)).map((p) => ({
    slug: p.slug as string,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = DEFAULT_PACKAGES.find((p) => p.slug === slug);

  if (!pkg) {
    return {
      title: "Travel Package | Miracle International",
      description: "Explore our exclusive travel and holiday packages.",
    };
  }

  return buildPageMetadata({
    title: `${pkg.name} | Miracle International`,
    description: pkg.shortDescription || pkg.description || "Discover Sri Lanka and world travel experiences.",
    path: ROUTES.public.travelPackage(pkg.slug || slug),
    image: pkg.coverImage || pkg.images?.[0]
      ? { src: pkg.coverImage || pkg.images?.[0] || "", alt: pkg.name }
      : undefined,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PackageDetailClient slug={slug} />;
}
