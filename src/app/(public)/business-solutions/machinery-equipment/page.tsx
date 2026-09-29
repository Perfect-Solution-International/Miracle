import { BusinessDetailPage } from "@/features/business/components/business-detail-page";
import { BUSINESS_DETAILS } from "@/features/business/data/business-detail";
import { buildPageMetadata } from "@/lib/seo/metadata";

const detail = BUSINESS_DETAILS.machinery;
export const metadata = buildPageMetadata({
  title: detail.title,
  description: detail.lead,
  path: detail.href,
  image: detail.image,
});

export default function Page() {
  return <BusinessDetailPage service="machinery" />;
}
