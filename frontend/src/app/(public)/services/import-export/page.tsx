import type { Metadata } from "next";

import { ImportExportLanding } from "@/features/import-export/components/import-export-landing";

export const metadata: Metadata = {
  title: "Import & Export Services",
  description: "Source and move products across international markets with Miracle International.",
};

export default function Page() {
  return <ImportExportLanding />;
}