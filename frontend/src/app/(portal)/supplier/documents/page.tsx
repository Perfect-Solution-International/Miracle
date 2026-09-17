import type { Metadata } from "next";

import { requirePermission } from "@/server/dal/require-permission";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = {
  title: "Documents",
  robots: { index: false, follow: false },
};

export default async function Page() {
  // Authorisation is enforced here, not in the layout: layouts do not
  // re-render between sibling routes, so each page checks for itself.
  await requirePermission("documents.read");

  return (
    <PlaceholderPage
      title={"Documents"}
      description={"Verification and compliance documents."}
    />
  );
}
