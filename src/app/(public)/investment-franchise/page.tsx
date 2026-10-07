import type { Metadata } from "next";

import { InvestmentLanding } from "@/features/investment/components/investment-landing";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Investment Opportunities & Business Support";
const DESCRIPTION =
  "Explore business opportunities, investment projects and practical business ideas with professional support from Miracle International.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.investmentFranchise,
  image: SITE_MEDIA.investment.hero,
});

export default function Page() {
  return <InvestmentLanding />;
}
