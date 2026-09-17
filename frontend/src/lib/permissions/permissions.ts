/**
 * The single source of truth for every permission in the platform.
 *
 * Permissions are namespaced `<resource>.<action>`. Adding a module means adding
 * its permissions here first; roles then reference them by name. Because the list
 * is `as const`, `Permission` is a closed union and a typo fails the build.
 */
export const PERMISSIONS = [
  // Catalogue and sourcing
  "products.read",
  "products.manage",
  "sourcing.read",
  "sourcing.manage",

  // Requirements
  "requirements.read",
  "requirements.create",
  "requirements.manage",

  // Quotations
  "quotations.read",
  "quotations.create",
  "quotations.approve",
  "quotations.manage",

  // Orders
  "orders.read",
  "orders.create",
  "orders.manage",

  // Finance
  "payments.read",
  "payments.manage",
  "invoices.read",
  "invoices.manage",

  // Partners
  "suppliers.read",
  "suppliers.verify",
  "suppliers.manage",
  "customers.read",
  "customers.manage",

  // Trade and logistics
  "imports.manage",
  "exports.manage",
  "logistics.read",
  "logistics.manage",

  // Documents and comms
  "documents.read",
  "documents.manage",
  "notifications.read",

  // Services
  "bookings.read",
  "bookings.manage",
  "travel.manage",
  "visa.manage",
  "it-services.read",
  "it-services.manage",
  "business.read",
  "business.manage",
  "investment.read",
  "investment.manage",
  "franchise.read",
  "franchise.manage",
  "support.read",
  "support.manage",

  // Platform
  "cms.manage",
  "reports.read",
  "users.read",
  "users.manage",
  "settings.manage",
] as const;

export type Permission = (typeof PERMISSIONS)[number];

const PERMISSION_SET: ReadonlySet<string> = new Set(PERMISSIONS);

export function isPermission(value: string): value is Permission {
  return PERMISSION_SET.has(value);
}
