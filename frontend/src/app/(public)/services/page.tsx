import type { Metadata } from "next";

import { ServicesOverview } from "@/features/marketing/components/services-overview";

export const metadata: Metadata = {
  title: "Business Services & Solutions",
  description: "Explore Miracle International's trading, franchise, import and export, investment and marketing services.",
  openGraph: {
    title: "Business Services & Solutions",
    description: "Explore Miracle International's trading, franchise, import and export, investment and marketing services.",
  },
};

export default function Page() {
  return <ServicesOverview />;
}
