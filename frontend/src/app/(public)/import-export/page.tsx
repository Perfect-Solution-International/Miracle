import type { Metadata } from "next";

import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";
import { ImportExportHero } from "@/features/import-export";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Import & Export";
const DESCRIPTION =
  "Global sourcing made simple for your business. Tell us what you need to import or export and our trade team will take it from there.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.importExport,
  image: SITE_MEDIA.heroPort,
});

export default function Page() {
  return <ImportExportHero />;
}
