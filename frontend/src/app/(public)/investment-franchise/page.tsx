import type { Metadata } from "next";

import { InvestmentLanding } from "@/features/investment/components/investment-landing";

export const metadata: Metadata = {
  title: "Investment Opportunities & Business Support",
  description: "Explore business opportunities, investment projects and practical business ideas with professional support from Miracle International.",
  openGraph: {
    title: "Investment Opportunities & Business Support",
    description: "Explore business opportunities, investment projects and practical business ideas with professional support from Miracle International.",
  },
};

export default function Page() {
  return <InvestmentLanding />;
}
