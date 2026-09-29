/**
 * Every backend path in one registry.
 *
 * Feature API modules import from here rather than writing string literals, so a
 * backend route rename is a single-file change and paths stay greppable.
 */
export const API_ROUTES = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    register: "/auth/register",
    refresh: "/auth/refresh",
    me: "/auth/me",
    verifyEmail: "/auth/verify-email",
    resendVerification: "/auth/resend-verification",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    changePassword: "/auth/change-password",
  },
  users: {
    list: "/users",
    detail: (id: string) => `/users/${id}`,
  },
  customers: {
    list: "/customers",
    detail: (id: string) => `/customers/${id}`,
  },
  suppliers: {
    list: "/suppliers",
    detail: (id: string) => `/suppliers/${id}`,
    verify: (id: string) => `/suppliers/${id}/verify`,
  },
  products: {
    list: "/products",
    detail: (id: string) => `/products/${id}`,
  },
  requirements: {
    list: "/requirements",
    create: "/requirements",
    detail: (id: string) => `/requirements/${id}`,
    update: (id: string) => `/requirements/${id}`,
    submit: (id: string) => `/requirements/${id}/submit`,
    cancel: (id: string) => `/requirements/${id}/cancel`,
  },
  quotations: {
    list: "/quotations",
    create: "/quotations",
    detail: (id: string) => `/quotations/${id}`,
    approve: (id: string) => `/quotations/${id}/approve`,
    reject: (id: string) => `/quotations/${id}/reject`,
  },
  orders: {
    list: "/orders",
    create: "/orders",
    detail: (id: string) => `/orders/${id}`,
    updateStatus: (id: string) => `/orders/${id}/status`,
    tracking: (id: string) => `/orders/${id}/tracking`,
  },
  payments: {
    list: "/payments",
    detail: (id: string) => `/payments/${id}`,
  },
  invoices: {
    list: "/invoices",
    detail: (id: string) => `/invoices/${id}`,
    download: (id: string) => `/invoices/${id}/download`,
  },
  documents: {
    list: "/documents",
    detail: (id: string) => `/documents/${id}`,
    /** Returns a pre-signed upload URL from object storage. */
    presign: "/documents/presign",
    confirm: (id: string) => `/documents/${id}/confirm`,
  },
  notifications: {
    list: "/notifications",
    markRead: (id: string) => `/notifications/${id}/read`,
    markAllRead: "/notifications/read-all",
  },
  support: {
    tickets: "/support/tickets",
    ticket: (id: string) => `/support/tickets/${id}`,
  },
  reports: {
    summary: "/reports/summary",
  },
  opportunities: {
    list: "/opportunities",
    featured: "/opportunities/featured",
    detail: (slug: string) => `/opportunities/${slug}`,
  },
  cms: {
    testimonials: "/cms/testimonials",
  },
} as const;
