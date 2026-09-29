import type { Metadata } from "next";

import { InboundToursView } from "@/components/travel/inbound-tours-view";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Inbound Tours (Sri Lanka) | Miracle International";
const DESCRIPTION =
  "Discover Sri Lanka with customized inbound travel packages, private chauffeur tours, boutique luxury stays, and 24/7 coordinator assistance. Send an inquiry today.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.inboundTravel,
  image: SITE_MEDIA.travelCategoryCards.inbound,
});

export default function InboundTravelPage() {
  return <InboundToursView />;
}
