import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CtaBanner } from "@/components/common/cta-banner";
import { ROUTES } from "@/config/routes";
import {
  getTravelPackageDetail,
  PackageAudienceSection,
  PackageGallerySection,
  PackageHero,
  PackageInclusionsSection,
  PackageItinerarySection,
  PackageLogisticsSection,
  PackageOverviewSection,
  PackageVisaSection,
  TRAVEL_PACKAGE_DETAILS,
} from "@/features/travel";
import { buildPageMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return TRAVEL_PACKAGE_DETAILS.map((detail) => ({ slug: detail.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const detail = getTravelPackageDetail(slug);
  if (!detail) return {};

  return buildPageMetadata({
    title: detail.title,
    description: detail.tagline,
    path: ROUTES.public.travelPackage(detail.slug),
    image: detail.image,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const detail = getTravelPackageDetail(slug);
  if (!detail) notFound();

  return (
    <>
      <PackageHero detail={detail} />
      <PackageGallerySection detail={detail} />
      <PackageOverviewSection detail={detail} />
      <PackageItinerarySection detail={detail} />
      <PackageInclusionsSection detail={detail} />
      <PackageLogisticsSection detail={detail} />
      <PackageVisaSection detail={detail} />
      <PackageAudienceSection detail={detail} />

      <CtaBanner
        eyebrow="Plan Your Trip"
        title={`Ready To Explore ${detail.location}?`}
        description="Tell us your requirements and we'll prepare a package that matches your travel needs and budget."
        primary={{
          label: "Book This Package",
          href: ROUTES.public.tellUsWhatYouNeed,
        }}
        secondary={{
          label: "Customize This Package",
          href: `${ROUTES.public.travelTourism}#customize-trip`,
        }}
      />
    </>
  );
}
