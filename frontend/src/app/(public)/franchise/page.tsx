import type { Metadata } from "next";

import { FranchiseLanding } from "@/features/franchise/components/franchise-landing";

export const metadata: Metadata = {
  title: "Franchise Opportunities & Support",
  description:
    "Explore franchise opportunities and get practical support from business selection through ongoing operations.",
  openGraph: {
    title: "Franchise Opportunities & Support",
    description:
      "Explore franchise opportunities and get practical support from business selection through ongoing operations.",
  },
};

export default function Page() {
  return <FranchiseLanding />;
}