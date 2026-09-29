import type { Metadata } from "next";

import { AdminProfileView } from "@/components/admin-profile/admin-profile-view";
import { verifySession } from "@/server/dal/session";

export const metadata: Metadata = {
  title: "My Profile | Miracle International Admin",
  description: "Manage your account information and security settings.",
  robots: { index: false, follow: false },
};

export default async function AdminProfilePage() {
  const user = await verifySession();

  const fullName = user.firstName
    ? `${user.firstName} ${user.lastName || ""}`.trim()
    : "Miracle Administrator";

  return (
    <AdminProfileView
      initialEmail={user.email}
      initialName={fullName}
    />
  );
}
