import type { Metadata } from "next";

import { verifySession } from "@/server/dal/session";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = {
  title: "Profile",
  robots: { index: false, follow: false },
};

export default async function Page() {
  await verifySession();

  return (
    <PlaceholderPage
      title={"Profile"}
      description={"Manage your company and contact details."}
    />
  );
}
