import {
  Banknote,
  Bell,
  Blocks,
  Boxes,
  Briefcase,
  Building2,
  ClipboardList,
  FileSpreadsheet,
  FileText,
  Globe2,
  Headphones,
  LayoutDashboard,
  LifeBuoy,
  Package,
  Plane,
  Receipt,
  Settings,
  Ship,
  ShoppingCart,
  Stamp,
  Truck,
  UserCircle,
  Users,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { Permission } from "@/lib/permissions/permissions";
import type { Portal } from "@/lib/permissions/roles";
import { ROUTES } from "./routes";

/**
 * Sidebar navigation as data, not JSX.
 *
 * All four portals render from this one structure, so there is a single
 * implementation of the sidebar. An item appears only when the user holds at
 * least one of its `permissions`; an empty array means "any signed-in user".
 */
export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  /** User needs ANY of these. Empty means no permission requirement. */
  permissions: readonly Permission[];
  /** Match child routes too, so `/admin/orders/123` highlights "Orders". */
  matchNested?: boolean;
}

export interface NavSection {
  title: string;
  items: readonly NavItem[];
}

const CUSTOMER_NAV: readonly NavSection[] = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        href: ROUTES.customer.dashboard,
        icon: LayoutDashboard,
        permissions: [],
      },
    ],
  },
  {
    title: "Procurement",
    items: [
      {
        title: "Requirements",
        href: ROUTES.customer.requirements,
        icon: ClipboardList,
        permissions: ["requirements.read"],
        matchNested: true,
      },
      {
        title: "Quotations",
        href: ROUTES.customer.quotations,
        icon: FileText,
        permissions: ["quotations.read"],
        matchNested: true,
      },
      {
        title: "Orders",
        href: ROUTES.customer.orders,
        icon: ShoppingCart,
        permissions: ["orders.read"],
        matchNested: true,
      },
    ],
  },
  {
    title: "Finance",
    items: [
      {
        title: "Payments",
        href: ROUTES.customer.payments,
        icon: Banknote,
        permissions: ["payments.read"],
      },
      {
        title: "Invoices",
        href: ROUTES.customer.invoices,
        icon: Receipt,
        permissions: ["invoices.read"],
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        title: "Documents",
        href: ROUTES.customer.documents,
        icon: FileSpreadsheet,
        permissions: ["documents.read"],
      },
      {
        title: "Bookings",
        href: ROUTES.customer.bookings,
        icon: Plane,
        permissions: ["bookings.read"],
      },
      {
        title: "Notifications",
        href: ROUTES.customer.notifications,
        icon: Bell,
        permissions: ["notifications.read"],
      },
      {
        title: "Support",
        href: ROUTES.customer.support,
        icon: LifeBuoy,
        permissions: ["support.read"],
      },
      {
        title: "Profile",
        href: ROUTES.customer.profile,
        icon: UserCircle,
        permissions: [],
      },
    ],
  },
];

const SUPPLIER_NAV: readonly NavSection[] = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        href: ROUTES.supplier.dashboard,
        icon: LayoutDashboard,
        permissions: [],
      },
    ],
  },
  {
    title: "Business",
    items: [
      {
        title: "Products",
        href: ROUTES.supplier.products,
        icon: Package,
        permissions: ["products.manage"],
        matchNested: true,
      },
      {
        title: "Requests",
        href: ROUTES.supplier.requests,
        icon: ClipboardList,
        permissions: ["requirements.read"],
        matchNested: true,
      },
      {
        title: "Quotations",
        href: ROUTES.supplier.quotations,
        icon: FileText,
        permissions: ["quotations.read"],
        matchNested: true,
      },
      {
        title: "Orders",
        href: ROUTES.supplier.orders,
        icon: ShoppingCart,
        permissions: ["orders.read"],
        matchNested: true,
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        title: "Documents",
        href: ROUTES.supplier.documents,
        icon: FileSpreadsheet,
        permissions: ["documents.read"],
      },
      {
        title: "Profile",
        href: ROUTES.supplier.profile,
        icon: UserCircle,
        permissions: [],
      },
    ],
  },
];

const STAFF_NAV: readonly NavSection[] = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        href: ROUTES.staff.dashboard,
        icon: LayoutDashboard,
        permissions: [],
      },
    ],
  },
  {
    title: "Operations",
    items: [
      {
        title: "Requirements",
        href: ROUTES.admin.requirements,
        icon: ClipboardList,
        permissions: ["requirements.manage"],
        matchNested: true,
      },
      {
        title: "Quotations",
        href: ROUTES.admin.quotations,
        icon: FileText,
        permissions: ["quotations.manage"],
        matchNested: true,
      },
      {
        title: "Orders",
        href: ROUTES.admin.orders,
        icon: ShoppingCart,
        permissions: ["orders.manage"],
        matchNested: true,
      },
      {
        title: "Suppliers",
        href: ROUTES.admin.suppliers,
        icon: Building2,
        permissions: ["suppliers.read"],
        matchNested: true,
      },
      {
        title: "Logistics",
        href: ROUTES.admin.logistics,
        icon: Truck,
        permissions: ["logistics.read"],
      },
      {
        title: "Support",
        href: ROUTES.admin.support,
        icon: Headphones,
        permissions: ["support.manage"],
      },
    ],
  },
];

const ADMIN_NAV: readonly NavSection[] = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        href: ROUTES.admin.dashboard,
        icon: LayoutDashboard,
        permissions: [],
      },
      {
        title: "Reports",
        href: ROUTES.admin.reports,
        icon: FileSpreadsheet,
        permissions: ["reports.read"],
      },
    ],
  },
  {
    title: "Trade",
    items: [
      {
        title: "Requirements",
        href: ROUTES.admin.requirements,
        icon: ClipboardList,
        permissions: ["requirements.manage"],
        matchNested: true,
      },
      {
        title: "Quotations",
        href: ROUTES.admin.quotations,
        icon: FileText,
        permissions: ["quotations.manage"],
        matchNested: true,
      },
      {
        title: "Orders",
        href: ROUTES.admin.orders,
        icon: ShoppingCart,
        permissions: ["orders.manage"],
        matchNested: true,
      },
      {
        title: "Products",
        href: ROUTES.admin.products,
        icon: Package,
        permissions: ["products.manage"],
        matchNested: true,
      },
      {
        title: "Imports",
        href: ROUTES.admin.imports,
        icon: Ship,
        permissions: ["imports.manage"],
      },
      {
        title: "Exports",
        href: ROUTES.admin.exports,
        icon: Globe2,
        permissions: ["exports.manage"],
      },
      {
        title: "Logistics",
        href: ROUTES.admin.logistics,
        icon: Truck,
        permissions: ["logistics.manage"],
      },
    ],
  },
  {
    title: "Finance",
    items: [
      {
        title: "Payments",
        href: ROUTES.admin.payments,
        icon: Banknote,
        permissions: ["payments.manage"],
      },
    ],
  },
  {
    title: "Relationships",
    items: [
      {
        title: "Customers",
        href: ROUTES.admin.customers,
        icon: Users,
        permissions: ["customers.manage"],
        matchNested: true,
      },
      {
        title: "Suppliers",
        href: ROUTES.admin.suppliers,
        icon: Building2,
        permissions: ["suppliers.manage"],
        matchNested: true,
      },
      {
        title: "Users",
        href: ROUTES.admin.users,
        icon: Users,
        permissions: ["users.manage"],
        matchNested: true,
      },
    ],
  },
  {
    title: "Services",
    items: [
      {
        title: "Business Projects",
        href: ROUTES.admin.businessProjects,
        icon: Briefcase,
        permissions: ["business.manage"],
      },
      {
        title: "Travel",
        href: ROUTES.admin.travel,
        icon: Plane,
        permissions: ["travel.manage"],
      },
      {
        title: "Visa",
        href: ROUTES.admin.visa,
        icon: Stamp,
        permissions: ["visa.manage"],
      },
      {
        title: "IT Services",
        href: ROUTES.admin.itServices,
        icon: Wrench,
        permissions: ["it-services.manage"],
      },
      {
        title: "Support",
        href: ROUTES.admin.support,
        icon: Headphones,
        permissions: ["support.manage"],
      },
    ],
  },
  {
    title: "Platform",
    items: [
      {
        title: "CMS",
        href: ROUTES.admin.cms,
        icon: Blocks,
        permissions: ["cms.manage"],
      },
      {
        title: "Settings",
        href: ROUTES.admin.settings,
        icon: Settings,
        permissions: ["settings.manage"],
      },
    ],
  },
];

export const PORTAL_NAVIGATION: Record<Portal, readonly NavSection[]> = {
  public: [],
  customer: CUSTOMER_NAV,
  supplier: SUPPLIER_NAV,
  staff: STAFF_NAV,
  admin: ADMIN_NAV,
};

/** Public site navigation lives in `./public-navigation.ts`. */

export const PORTAL_LABELS: Record<Portal, string> = {
  public: "Miracle International",
  customer: "Customer Portal",
  supplier: "Supplier Portal",
  staff: "Staff Portal",
  admin: "Administration",
};

/** Icon shown beside the portal name in the sidebar header. */
export const PORTAL_ICONS: Record<Portal, LucideIcon> = {
  public: Globe2,
  customer: Boxes,
  supplier: Building2,
  staff: Briefcase,
  admin: Settings,
};
