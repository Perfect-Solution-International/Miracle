import type { Metadata } from "next";

import { verifySession } from "@/server/dal/session";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = {
  title: "Staff Dashboard",
  robots: { index: false, follow: false },
};

export default async function Page() {
  await verifySession();

  return (
    <PlaceholderPage
      title={"Staff Dashboard"}
      description={"Your queue and team activity."}
    />
  );
}
