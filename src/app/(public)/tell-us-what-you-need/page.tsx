import type { Metadata } from "next";

import { ROUTES } from "@/config/routes";
import { TellUsWhatYouNeedView } from "@/features/requirements";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Tell Us What You Need";
const DESCRIPTION =
  "Submit any business, product, travel, or service requirement to Miracle International. Get customized end-to-end solutions.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.tellUsWhatYouNeed,
});

/**
 * Professional, modern, clean white "Tell Us What You Need" page.
 * Features 5 core sections:
 * 1. Hero Section (Clean white, no images)
 * 2. What Can We Help You With? (11 category cards with simple icons)
 * 3. Requirement Form (Full intake form with file upload & confirmation)
 * 4. How It Works (4-step process)
 * 5. Final CTA
 */
export default function Page() {
  return <TellUsWhatYouNeedView />;
}

