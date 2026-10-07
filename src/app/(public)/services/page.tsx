import type { Metadata } from "next";

import { ServicesOverview } from "@/features/marketing/components/services-overview";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Business Services & Solutions";
const DESCRIPTION =
  "Explore Miracle International's trading, franchise, import and export, investment and marketing services.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.services,
  image: SITE_MEDIA.services.hero,
});

export default function Page() {
  return <ServicesOverview />;
}
