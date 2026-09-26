import type { Metadata } from "next";

import { ROUTES } from "@/config/routes";
import { ImportExportLanding } from "@/features/import-export/components/import-export-landing";

export const metadata: Metadata = {
  title: "Import & Export Services",
  description: "Source and move products across international markets with Miracle International.",
};

export default function Page() {
  return (
    <ImportExportLanding
      breadcrumbs={[
        { label: "Services", href: ROUTES.public.services },
        { label: "Import & Export" },
      ]}
    />
  );
}