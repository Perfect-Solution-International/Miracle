import type { ReactNode } from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * Breadcrumb navigation has been removed from all public pages.
 */
export function Breadcrumb(_props?: {
  items?: readonly BreadcrumbItem[];
  tone?: "default" | "inverse";
  className?: string;
}): ReactNode {
  return null;
}
