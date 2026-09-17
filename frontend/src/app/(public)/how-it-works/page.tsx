import type { Metadata } from "next";

import { PageInProgress } from "@/components/common/page-in-progress";
import { ROUTES } from "@/config/routes";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "How It Works";
const DESCRIPTION =
  "From submitting a requirement to delivery: how Miracle International coordinates your business needs.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.howItWorks,
});

export default function Page() {
  return <PageInProgress title={TITLE} description={DESCRIPTION} eyebrow="Our Process" />;
}
