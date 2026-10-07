import { Suspense } from "react";
import { redirect } from "next/navigation";

import { ROUTES } from "@/config/routes";
import { verifySession } from "@/server/dal/session";

async function AdminRootWithAuth() {
  await verifySession();
  redirect(ROUTES.admin.dashboard);
  return null;
}

export default function AdminPage() {
  return (
    <Suspense fallback={null}>
      <AdminRootWithAuth />
    </Suspense>
  );
}
