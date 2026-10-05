import type { Metadata } from "next";

import { TradingLanding } from "@/features/trading/components/trading-landing";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Trading Solutions";
const DESCRIPTION =
  "Connect with suppliers, buyers and products through Miracle International trading solutions.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.wholesaleProducts,
  image: SITE_MEDIA.services.trading,
});

export default function Page() {
  return <TradingLanding />;
}
