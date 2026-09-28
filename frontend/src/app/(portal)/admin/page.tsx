import { redirect } from "next/navigation";

import { ROUTES } from "@/config/routes";
import { verifySession } from "@/server/dal/session";

export default async function AdminPage() {
  await verifySession();
  redirect(ROUTES.admin.dashboard);
}
