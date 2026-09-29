import { Construction } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/feedback/empty-state";

/**
 * Scaffold for routes whose feature module is not built yet.
 *
 * Keeps every route in the information architecture navigable from day one, so
 * navigation, breadcrumbs, and permissions can be exercised end to end. Replace
 * with the real page as each feature lands.
 */
export function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <>
      <PageHeader title={title} description={description} />
      <EmptyState
        icon={Construction}
        title="Coming soon"
        description="This module is part of the planned roadmap and has not been implemented yet."
      />
    </>
  );
}
