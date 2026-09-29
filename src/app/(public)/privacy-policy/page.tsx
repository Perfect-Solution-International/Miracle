import type { Metadata } from "next";

import { PageInProgress } from "@/components/common/page-in-progress";
import { ROUTES } from "@/config/routes";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Privacy Policy";
const DESCRIPTION =
  "How Miracle International collects, uses, and protects your information.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.privacyPolicy,
});

export default function Page() {
  return <PageInProgress title={TITLE} description={DESCRIPTION} eyebrow="Legal" />;
}
