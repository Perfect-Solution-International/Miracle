import type { Metadata } from "next";

import { PageInProgress } from "@/components/common/page-in-progress";
import { ROUTES } from "@/config/routes";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Request a Quotation";
const DESCRIPTION =
  "Request pricing for a product or service, including items not yet listed in our catalogue.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.requestQuotation,
});

export default function Page() {
  return <PageInProgress title={TITLE} description={DESCRIPTION} eyebrow="Quotations" />;
}
