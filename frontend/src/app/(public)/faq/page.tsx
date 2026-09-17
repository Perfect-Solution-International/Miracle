import type { Metadata } from "next";

import { PageInProgress } from "@/components/common/page-in-progress";
import { ROUTES } from "@/config/routes";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Frequently Asked Questions";
const DESCRIPTION =
  "Answers to common questions about sourcing, quotations, orders, and our services.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.faq,
});

export default function Page() {
  return <PageInProgress title={TITLE} description={DESCRIPTION} eyebrow="Support" />;
}
