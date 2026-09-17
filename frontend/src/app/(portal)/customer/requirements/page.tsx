import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/feedback/empty-state";
import { requirePermission } from "@/server/dal/require-permission";

export const metadata: Metadata = {
  title: "Requirements",
  robots: { index: false, follow: false },
};

export default async function CustomerRequirementsPage() {
  await requirePermission("requirements.read");

  return (
    <>
      <PageHeader
        title="Requirements"
        description="Product requirements you have submitted for sourcing."
        actions={
          <Button asChild>
            <Link href="/customer/requirements/new">
              <Plus aria-hidden="true" />
              New requirement
            </Link>
          </Button>
        }
      />
      <EmptyState
        title="No requirements yet"
        description="Submit a requirement and our sourcing team will start finding suppliers."
        action={
          <Button asChild>
            <Link href="/customer/requirements/new">Create your first requirement</Link>
          </Button>
        }
      />
    </>
  );
}
