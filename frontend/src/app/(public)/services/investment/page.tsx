import type { Metadata } from "next";

import { ROUTES } from "@/config/routes";
import { InvestmentLanding } from "@/features/investment/components/investment-landing";

export const metadata: Metadata = {
  title: "Investment Opportunities",
  description: "Explore business opportunities, investment projects and practical business ideas with Miracle International.",
};

export default function Page() {
  return (
    <InvestmentLanding
      breadcrumbs={[
        { label: "Services", href: ROUTES.public.services },
        { label: "Investment" },
      ]}
    />
  );
}