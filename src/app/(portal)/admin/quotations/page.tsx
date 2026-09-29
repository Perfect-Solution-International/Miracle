import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { ROUTES } from "@/config/routes";
import { QuotationTable } from "@/features/quotations";
import { requirePermission } from "@/server/dal/require-permission";

export const metadata: Metadata = {
  title: "Quotations",
  robots: { index: false, follow: false },
};

export default async function AdminQuotationsPage() {
  await requirePermission("quotations.manage");

  return (
    <>
      <PageHeader
        title="Quotations"
        description="All quotations across customers and suppliers."
      />
      <QuotationTable detailHref={(id) => ROUTES.admin.quotation(id)} />
    </>
  );
}
