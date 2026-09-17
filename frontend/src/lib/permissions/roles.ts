import { PERMISSIONS, type Permission } from "./permissions";

/** Every role the platform recognises. Mirrors the roles issued by the Rust API. */
export const ROLES = [
  "guest",
  "customer",
  "business_owner",
  "entrepreneur",
  "investor",
  "supplier",
  "sales_staff",
  "procurement_staff",
  "finance_staff",
  "logistics_staff",
  "it_staff",
  "travel_staff",
  "business_consultant",
  "manager",
  "admin",
  "super_admin",
] as const;

export type Role = (typeof ROLES)[number];

/** Which shell a role lands in after login. Drives post-login redirect and nav. */
export type Portal = "public" | "customer" | "supplier" | "staff" | "admin";

/** Permissions shared by every signed-in user. */
const BASE_AUTHENTICATED: readonly Permission[] = [
  "products.read",
  "documents.read",
  "notifications.read",
  "support.read",
];

/** Permissions common to buyer-side roles (customer, business owner, and so on). */
const BUYER: readonly Permission[] = [
  ...BASE_AUTHENTICATED,
  "requirements.read",
  "requirements.create",
  "quotations.read",
  "quotations.create",
  "quotations.approve",
  "orders.read",
  "orders.create",
  "payments.read",
  "invoices.read",
  "bookings.read",
  "documents.manage",
];

/** Permissions shared by all internal staff roles. */
const STAFF_BASE: readonly Permission[] = [
  ...BASE_AUTHENTICATED,
  "customers.read",
  "suppliers.read",
  "requirements.read",
  "quotations.read",
  "orders.read",
  "reports.read",
];

export interface RoleDefinition {
  readonly role: Role;
  /** Human-readable label. Wrapped in a translation call once i18n lands. */
  readonly label: string;
  readonly portal: Portal;
  readonly permissions: readonly Permission[];
}

export const ROLE_DEFINITIONS: Readonly<Record<Role, RoleDefinition>> = {
  guest: {
    role: "guest",
    label: "Guest",
    portal: "public",
    permissions: ["products.read"],
  },
  customer: {
    role: "customer",
    label: "Customer",
    portal: "customer",
    permissions: BUYER,
  },
  business_owner: {
    role: "business_owner",
    label: "Business Owner",
    portal: "customer",
    permissions: [...BUYER, "business.read", "business.manage"],
  },
  entrepreneur: {
    role: "entrepreneur",
    label: "Entrepreneur",
    portal: "customer",
    permissions: [...BUYER, "business.read", "franchise.read", "investment.read"],
  },
  investor: {
    role: "investor",
    label: "Investor",
    portal: "customer",
    permissions: [
      ...BASE_AUTHENTICATED,
      "investment.read",
      "franchise.read",
      "reports.read",
    ],
  },
  supplier: {
    role: "supplier",
    label: "Supplier",
    portal: "supplier",
    permissions: [
      ...BASE_AUTHENTICATED,
      "products.manage",
      "requirements.read",
      "quotations.read",
      "quotations.create",
      "orders.read",
      "documents.manage",
    ],
  },
  sales_staff: {
    role: "sales_staff",
    label: "Sales Staff",
    portal: "staff",
    permissions: [
      ...STAFF_BASE,
      "requirements.manage",
      "quotations.create",
      "quotations.manage",
      "orders.create",
      "customers.manage",
    ],
  },
  procurement_staff: {
    role: "procurement_staff",
    label: "Procurement Staff",
    portal: "staff",
    permissions: [
      ...STAFF_BASE,
      "sourcing.read",
      "sourcing.manage",
      "products.manage",
      "suppliers.verify",
      "suppliers.manage",
      "quotations.manage",
    ],
  },
  finance_staff: {
    role: "finance_staff",
    label: "Finance Staff",
    portal: "staff",
    permissions: [
      ...STAFF_BASE,
      "payments.read",
      "payments.manage",
      "invoices.read",
      "invoices.manage",
    ],
  },
  logistics_staff: {
    role: "logistics_staff",
    label: "Logistics Staff",
    portal: "staff",
    permissions: [
      ...STAFF_BASE,
      "logistics.read",
      "logistics.manage",
      "imports.manage",
      "exports.manage",
      "documents.manage",
    ],
  },
  it_staff: {
    role: "it_staff",
    label: "IT Staff",
    portal: "staff",
    permissions: [
      ...BASE_AUTHENTICATED,
      "it-services.read",
      "it-services.manage",
      "support.manage",
    ],
  },
  travel_staff: {
    role: "travel_staff",
    label: "Travel Staff",
    portal: "staff",
    permissions: [
      ...BASE_AUTHENTICATED,
      "bookings.read",
      "bookings.manage",
      "travel.manage",
      "visa.manage",
      "customers.read",
    ],
  },
  business_consultant: {
    role: "business_consultant",
    label: "Business Consultant",
    portal: "staff",
    permissions: [
      ...STAFF_BASE,
      "business.read",
      "business.manage",
      "investment.read",
      "franchise.read",
    ],
  },
  manager: {
    role: "manager",
    label: "Manager",
    portal: "admin",
    permissions: [
      ...STAFF_BASE,
      "requirements.manage",
      "quotations.manage",
      "quotations.approve",
      "orders.manage",
      "payments.read",
      "invoices.read",
      "suppliers.manage",
      "suppliers.verify",
      "customers.manage",
      "logistics.read",
      "business.read",
      "support.manage",
      "documents.manage",
    ],
  },
  admin: {
    role: "admin",
    label: "Administrator",
    portal: "admin",
    // Everything except tenant-level settings, reserved for super admins.
    permissions: PERMISSIONS.filter((p) => p !== "settings.manage"),
  },
  super_admin: {
    role: "super_admin",
    label: "Super Administrator",
    portal: "admin",
    permissions: PERMISSIONS,
  },
};

export function getRoleDefinition(role: Role): RoleDefinition {
  return ROLE_DEFINITIONS[role];
}

export function isRole(value: string): value is Role {
  return (ROLES as readonly string[]).includes(value);
}

/**
 * Resolves the effective permission set for a user who may hold several roles.
 * The backend remains authoritative; this only drives UI affordances.
 */
export function resolvePermissions(roles: readonly Role[]): ReadonlySet<Permission> {
  const result = new Set<Permission>();
  for (const role of roles) {
    for (const permission of ROLE_DEFINITIONS[role].permissions) {
      result.add(permission);
    }
  }
  return result;
}

/** Highest-privilege portal among the user's roles. */
export function resolvePortal(roles: readonly Role[]): Portal {
  const precedence: readonly Portal[] = [
    "admin",
    "staff",
    "supplier",
    "customer",
    "public",
  ];
  for (const portal of precedence) {
    if (roles.some((role) => ROLE_DEFINITIONS[role].portal === portal)) {
      return portal;
    }
  }
  return "public";
}
