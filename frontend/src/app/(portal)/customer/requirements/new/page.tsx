import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { CreateRequirementForm } from "@/features/requirements";
import { requirePermission } from "@/server/dal/require-permission";

export const metadata: Metadata = {
  title: "New Requirement",
  robots: { index: false, follow: false },
};

export default async function NewRequirementPage() {
  await requirePermission("requirements.create");

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Tell us what you need"
        description="Describe your product requirement and our sourcing team will find suppliers and prepare quotations."
      />
      <CreateRequirementForm />
    </div>
  );
}
