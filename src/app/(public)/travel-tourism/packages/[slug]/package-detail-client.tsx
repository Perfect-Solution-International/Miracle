"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";

import { AdminPackageDetailPage } from "@/features/travel";
import { getStoredPackages, saveStoredPackages } from "@/lib/storage/travel-store";
import type { TravelPackage } from "@/components/admin-travel/types";

/**
 * Client-side wrapper that looks up an admin-created package by slug from
 * local storage or the persistent server database API.
 */
export function PackageDetailClient({ slug }: { slug: string }) {
  const [pkg, setPkg] = useState<TravelPackage | null | "loading">("loading");

  useEffect(() => {
    // 1. Quick check in local cache
    const packages = getStoredPackages();
    const found = packages.find((p) => p.slug === slug || p.id === slug);
    if (found) {
      setPkg(found);
      return;
    }

    // 2. Fetch from persistent server database
    fetch("/api/v1/travel/packages")
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((result) => {
        if (result.success && Array.isArray(result.data)) {
          saveStoredPackages(result.data, false);
          const serverFound = (result.data as TravelPackage[]).find(
            (p) => p.slug === slug || p.id === slug
          );
          setPkg(serverFound ?? null);
        } else {
          setPkg(null);
        }
      })
      .catch(() => {
        setPkg(null);
      });
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
