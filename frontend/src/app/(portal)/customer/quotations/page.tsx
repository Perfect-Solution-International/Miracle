import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { ROUTES } from "@/config/routes";
import { QuotationTable } from "@/features/quotations";
import { requirePermission } from "@/server/dal/require-permission";

export const metadata: Metadata = {
  title: "Quotations",
  robots: { index: false, follow: false },
};

/**
 * The page is a Server Component that performs the authorisation check and
 * renders the interactive table as a client island, so only the table ships
 * JavaScript.
 */
export default async function CustomerQuotationsPage() {
  await requirePermission("quotations.read");

  return (
    <>
      <PageHeader
        title="Quotations"
        description="Review, approve, or reject quotations prepared for your requirements."
      />
      <QuotationTable detailHref={(id) => ROUTES.customer.quotation(id)} />
    </>
  );
}
