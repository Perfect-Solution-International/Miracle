import { redirect } from "next/navigation";
import { ROUTES } from "@/config/routes";

export default function AdminPaymentsPage() {
  redirect(ROUTES.admin.dashboard);
}
