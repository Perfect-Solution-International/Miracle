import type { Metadata } from "next";

import { verifySession } from "@/server/dal/session";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = {
  title: "Supplier Dashboard",
  robots: { index: false, follow: false },
};

export default async function Page() {
  await verifySession();

  return (
    <PlaceholderPage
      title={"Supplier Dashboard"}
      description={"Overview of your activity with Miracle International."}
    />
  );
}
