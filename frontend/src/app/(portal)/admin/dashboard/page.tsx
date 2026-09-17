import type { Metadata } from "next";
import { Building2, ClipboardList, FileText, ShoppingCart } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/data-display/stat-card";
import { verifySession } from "@/server/dal/session";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const user = await verifySession();

  return (
    <>
      <PageHeader
        title="Administration"
        description={`Signed in as ${user.email}. Platform activity overview.`}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Open requirements" value="0" icon={ClipboardList} />
        <StatCard label="Quotations awaiting action" value="0" icon={FileText} />
        <StatCard label="Active orders" value="0" icon={ShoppingCart} />
        <StatCard label="Suppliers pending verification" value="0" icon={Building2} />
      </div>
    </>
  );
}
