/**
 * Root namespaces for query keys.
 *
 * Each feature builds its keys from its own namespace (see the `.keys.ts` file
 * in each feature's `api` folder), which keeps invalidation precise:
 * invalidating `["quotations"]` clears every quotation query without touching
 * orders.
 */
export const QUERY_NAMESPACES = {
  auth: "auth",
  users: "users",
  customers: "customers",
  suppliers: "suppliers",
  products: "products",
  requirements: "requirements",
  quotations: "quotations",
  orders: "orders",
  payments: "payments",
  invoices: "invoices",
  documents: "documents",
  notifications: "notifications",
  bookings: "bookings",
  support: "support",
  reports: "reports",
} as const;

export type QueryNamespace = (typeof QUERY_NAMESPACES)[keyof typeof QUERY_NAMESPACES];
