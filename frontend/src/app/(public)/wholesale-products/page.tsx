import type { Metadata } from "next";

import { TradingLanding } from "@/features/trading/components/trading-landing";

export const metadata: Metadata = {
  title: "Trading Solutions",
  description:
    "Connect with suppliers, buyers and products through Miracle International trading solutions.",
  openGraph: {
    title: "Trading Solutions",
    description:
      "Connect with suppliers, buyers and products through Miracle International trading solutions.",
  },
};

export default function Page() {
  return <TradingLanding />;
}
