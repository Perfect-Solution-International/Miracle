"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";

import { AdminPackageDetailPage } from "@/features/travel";
import { getStoredPackages } from "@/lib/storage/travel-store";
import type { TravelPackage } from "@/components/admin-travel/types";

/**
 * Client-side wrapper that looks up an admin-created package by slug from
 * localStorage. Used when the slug does not exist in the static catalogue.
 */
export function PackageDetailClient({ slug }: { slug: string }) {
  const [pkg, setPkg] = useState<TravelPackage | null | "loading">("loading");

  useEffect(() => {
    const packages = getStoredPackages();
    const found = packages.find((p) => p.slug === slug);
    setPkg(found ?? null);
  }, [slug]);

  if (pkg === "loading") {
    return (
      <div className="container-page py-24 text-center">
        <div className="mx-auto size-10 animate-spin rounded-full border-4 border-brand-blue border-t-transparent" />
        <p className="text-muted-foreground mt-4 text-sm">Loading package details…</p>
      </div>
    );
  }

  if (pkg === null) {
    // Trigger Next.js 404
    notFound();
  }

  return <AdminPackageDetailPage pkg={pkg} />;
}
