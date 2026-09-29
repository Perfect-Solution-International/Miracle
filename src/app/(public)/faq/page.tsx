import type { Metadata } from "next";

import { ROUTES } from "@/config/routes";
import { FaqContent } from "@/features/faq/components/faq-content";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Frequently Asked Questions";
const DESCRIPTION =
  "Find clear answers regarding our global sourcing, enterprise IT solutions, travel services, and quotation processes.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.faq,
});

export default function Page() {
  return <FaqContent />;
}
