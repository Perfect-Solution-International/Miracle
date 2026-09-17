import type { Metadata } from "next";

import { PageInProgress } from "@/components/common/page-in-progress";
import { ROUTES } from "@/config/routes";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Terms & Conditions";
const DESCRIPTION =
  "The terms that apply when you use Miracle International services and this website.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.terms,
});

export default function Page() {
  return <PageInProgress title={TITLE} description={DESCRIPTION} eyebrow="Legal" />;
}
