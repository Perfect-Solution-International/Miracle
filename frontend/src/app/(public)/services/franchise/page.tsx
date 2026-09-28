import type { Metadata } from "next";

import { ROUTES } from "@/config/routes";
import { FranchiseLanding } from "@/features/franchise/components/franchise-landing";

export const metadata: Metadata = {
  title: "Franchise Services",
  description: "Explore franchise opportunities and receive practical business support from Miracle International.",
};

export default function Page() {
  return (
    <FranchiseLanding
      breadcrumbs={[
        { label: "Services", href: ROUTES.public.services },
        { label: "Franchise" },
      ]}
    />
  );
}