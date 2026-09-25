import type { Metadata } from "next";
import { Suspense } from "react";

import { ROUTES } from "@/config/routes";
import {
  VisaBenefitsSection,
  VisaHero,
  VisaRequestForm,
  VisaTypesSection,
} from "@/features/visa-services";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Visa Services";
const DESCRIPTION =
  "Tell us about your travel plans and our team will guide you through the visa process.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ROUTES.public.visaServices,
});

export default function Page() {
  return (
    <>
      <VisaHero />
      <VisaTypesSection />

      <Suspense fallback={null}>
        <VisaRequestForm />
      </Suspense>

      <VisaBenefitsSection />
    </>
  );
}
