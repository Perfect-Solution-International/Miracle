import type { Metadata } from "next";

import { PageInProgress } from "@/components/common/page-in-progress";
import { ROUTES } from "@/config/routes";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Products";
const DESCRIPTION =
  "Browse wholesale products by category, with minimum order quantities and sourcing countries.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.products,
});

export default function Page() {
  return (
    <PageInProgress
      title={TITLE}
      description={DESCRIPTION}
      eyebrow="Wholesale & Products"
    />
  );
}
