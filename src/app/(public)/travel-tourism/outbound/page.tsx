import type { Metadata } from "next";

import { OutboundToursView } from "@/components/travel/outbound-tours-view";
import { ROUTES } from "@/config/routes";
import { SITE_MEDIA } from "@/config/site-media";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Outbound Tours (International Holidays) | Miracle International";
const DESCRIPTION =
  "Explore premier worldwide holiday packages for Dubai, Maldives, Singapore, Europe, and beyond. Flight tickets, tourist visa assistance, and private excursions included.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.outboundTravel,
  image: SITE_MEDIA.travelCategoryCards.outbound,
});

export default function OutboundTravelPage() {
  return <OutboundToursView />;
}
