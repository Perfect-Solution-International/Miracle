/**
 * Every in-app path in one place. Components link via `ROUTES.*` rather than
 * string literals so a URL change does not require a codebase-wide search.
 */
export const ROUTES = {
  public: {
    home: "/",
    about: "/about",
    services: "/services",
    globalSourcing: "/global-sourcing",
    wholesaleProducts: "/wholesale-products",
    businessSolutions: "/business-solutions",
    investmentFranchise: "/investment-franchise",
    travelTourism: "/travel-tourism",
    itSolutions: "/it-solutions",
    products: "/products",
    product: (slug: string) => `/products/${slug}`,
    howItWorks: "/how-it-works",
    contact: "/contact",
    tellUsWhatYouNeed: "/tell-us-what-you-need",
    requestQuotation: "/request-quotation",
    faq: "/faq",
    privacyPolicy: "/privacy-policy",
    terms: "/terms-and-conditions",
    cookiePolicy: "/cookie-policy",
  },
  auth: {
    login: "/login",
    register: "/register",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password",
    verifyEmail: "/verify-email",
  },
  customer: {
    dashboard: "/customer/dashboard",
    profile: "/customer/profile",
    requirements: "/customer/requirements",
    requirement: (id: string) => `/customer/requirements/${id}`,
    quotations: "/customer/quotations",
    quotation: (id: string) => `/customer/quotations/${id}`,
    orders: "/customer/orders",
    order: (id: string) => `/customer/orders/${id}`,
    payments: "/customer/payments",
    invoices: "/customer/invoices",
    documents: "/customer/documents",
    bookings: "/customer/bookings",
    notifications: "/customer/notifications",
    support: "/customer/support",
  },
  supplier: {
    dashboard: "/supplier/dashboard",
    profile: "/supplier/profile",
    products: "/supplier/products",
    requests: "/supplier/requests",
    quotations: "/supplier/quotations",
    orders: "/supplier/orders",
    documents: "/supplier/documents",
  },
  staff: {
    dashboard: "/staff/dashboard",
  },
  admin: {
    dashboard: "/admin/dashboard",
    users: "/admin/users",
    customers: "/admin/customers",
    suppliers: "/admin/suppliers",
    products: "/admin/products",
    requirements: "/admin/requirements",
    quotations: "/admin/quotations",
    quotation: (id: string) => `/admin/quotations/${id}`,
    orders: "/admin/orders",
    payments: "/admin/payments",
    imports: "/admin/imports",
    exports: "/admin/exports",
    logistics: "/admin/logistics",
    businessProjects: "/admin/business-projects",
    travel: "/admin/travel",
    visa: "/admin/visa",
    itServices: "/admin/it-services",
    support: "/admin/support",
    cms: "/admin/cms",
    reports: "/admin/reports",
    settings: "/admin/settings",
  },
} as const;

/** Paths that require authentication. Used by the proxy for optimistic redirects. */
export const PROTECTED_PATH_PREFIXES = [
  "/customer",
  "/supplier",
  "/staff",
  "/admin",
] as const;

/** Auth pages a signed-in user should be bounced away from. */
export const AUTH_PATHS: readonly string[] = [
  ROUTES.auth.login,
  ROUTES.auth.register,
  ROUTES.auth.forgotPassword,
];

export function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

/** Landing route for a portal, used after login. */
export const PORTAL_HOME = {
  public: ROUTES.public.home,
  customer: ROUTES.customer.dashboard,
  supplier: ROUTES.supplier.dashboard,
  staff: ROUTES.staff.dashboard,
  admin: ROUTES.admin.dashboard,
} as const;
