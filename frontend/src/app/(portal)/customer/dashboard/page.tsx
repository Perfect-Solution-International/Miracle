import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardList, FileText, Package, Receipt } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/data-display/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/config/routes";
import { verifySession } from "@/server/dal/session";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

/**
 * Customer landing page. Reads the session on the server, so the greeting is
 * rendered without a client-side fetch or a loading flash.
 */
export default async function CustomerDashboardPage() {
  const user = await verifySession();

  return (
    <>
      <PageHeader
        title={`Welcome back, ${user.firstName || "there"}`}
        description="Your sourcing activity at a glance."
        actions={
          <Button asChild>
            <Link href="/customer/requirements/new">New requirement</Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Open requirements" value="0" icon={ClipboardList} />
        <StatCard label="Pending quotations" value="0" icon={FileText} />
        <StatCard label="Active orders" value="0" icon={Package} />
        <StatCard label="Unpaid invoices" value="0" icon={Receipt} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent quotations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Quotations prepared for you will appear here.{" "}
              <Link
                href={ROUTES.customer.quotations}
                className="text-foreground underline"
              >
                View all
              </Link>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Order tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Shipment updates will appear here once you have active orders.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
