/**
 * One-off scaffold generator for placeholder routes.
 *
 * Writes a typed page per route so the information architecture is navigable
 * before each feature module exists. Never overwrites a page that already has a
 * real implementation.
 */
import { mkdir, writeFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";

const root = process.cwd();

/** [routePath, title, description, permission|null] */
const portalPages = [
  // Customer
  ["(portal)/customer/profile", "Profile", "Manage your company and contact details.", null],
  ["(portal)/customer/payments", "Payments", "Track payments against your orders.", "payments.read"],
  ["(portal)/customer/invoices", "Invoices", "Download and review your invoices.", "invoices.read"],
  ["(portal)/customer/documents", "Documents", "Your trade and compliance documents.", "documents.read"],
  ["(portal)/customer/bookings", "Bookings", "Travel and service bookings.", "bookings.read"],
  ["(portal)/customer/notifications", "Notifications", "Updates across your account.", "notifications.read"],
  ["(portal)/customer/support", "Support", "Raise and track support tickets.", "support.read"],

  // Supplier
  ["(portal)/supplier/dashboard", "Supplier Dashboard", "Overview of your activity with Miracle International.", null],
  ["(portal)/supplier/profile", "Company Profile", "Your company details and verification status.", null],
  ["(portal)/supplier/products", "Products", "Manage the catalogue you offer.", "products.manage"],
  ["(portal)/supplier/requests", "Sourcing Requests", "Buyer requirements matched to you.", "requirements.read"],
  ["(portal)/supplier/quotations", "Quotations", "Quotations you have submitted.", "quotations.read"],
  ["(portal)/supplier/orders", "Orders", "Orders placed with you.", "orders.read"],
  ["(portal)/supplier/documents", "Documents", "Verification and compliance documents.", "documents.read"],

  // Staff
  ["(portal)/staff/dashboard", "Staff Dashboard", "Your queue and team activity.", null],

  // Admin
  ["(portal)/admin/users", "Users", "Manage platform users and their roles.", "users.manage"],
  ["(portal)/admin/customers", "Customers", "Customer accounts and relationships.", "customers.manage"],
  ["(portal)/admin/suppliers", "Suppliers", "Supplier directory and verification.", "suppliers.manage"],
  ["(portal)/admin/products", "Products", "Master product catalogue.", "products.manage"],
  ["(portal)/admin/requirements", "Requirements", "Incoming sourcing requirements.", "requirements.manage"],
  ["(portal)/admin/payments", "Payments", "Reconcile customer and supplier payments.", "payments.manage"],
  ["(portal)/admin/imports", "Imports", "Inbound shipments and customs.", "imports.manage"],
  ["(portal)/admin/exports", "Exports", "Outbound shipments and documentation.", "exports.manage"],
  ["(portal)/admin/logistics", "Logistics", "Freight, carriers, and delivery tracking.", "logistics.manage"],
  ["(portal)/admin/business-projects", "Business Projects", "Business setup and consulting engagements.", "business.manage"],
  ["(portal)/admin/travel", "Travel", "Travel services and itineraries.", "travel.manage"],
  ["(portal)/admin/visa", "Visa", "Visa applications and processing.", "visa.manage"],
  ["(portal)/admin/it-services", "IT Services", "IT service requests and delivery.", "it-services.manage"],
  ["(portal)/admin/support", "Support", "Support tickets across the platform.", "support.manage"],
  ["(portal)/admin/cms", "Content", "Manage public website content.", "cms.manage"],
  ["(portal)/admin/reports", "Reports", "Operational and financial reporting.", "reports.read"],
  ["(portal)/admin/settings", "Settings", "Platform configuration.", "settings.manage"],
];

const publicPages = [
  ["(public)/about", "About Us", "Who we are and how we work."],
  ["(public)/services", "Services", "End-to-end trade and business services."],
  ["(public)/global-sourcing", "Global Sourcing", "Find verified suppliers worldwide."],
  ["(public)/wholesale-products", "Wholesale Products", "Browse our wholesale catalogue."],
  ["(public)/business-solutions", "Business Solutions", "Company setup, consulting, and growth."],
  ["(public)/investment-franchise", "Investment & Franchise", "Investment and franchise opportunities."],
  ["(public)/travel-tourism", "Travel & Tourism", "Business travel, visa, and tourism services."],
  ["(public)/it-solutions", "IT Solutions", "Software and IT services for your business."],
  ["(public)/contact", "Contact", "Get in touch with our team."],
];

const authPages = [
  ["(auth)/register", "Create an account", "Register to start sourcing with Miracle International."],
  ["(auth)/forgot-password", "Forgot password", "We will email you a reset link."],
  ["(auth)/reset-password", "Reset password", "Choose a new password for your account."],
  ["(auth)/verify-email", "Verify your email", "Confirm your email address to continue."],
];

function portalTemplate(title, description, permission) {
  const guardImport = permission
    ? `import { requirePermission } from "@/server/dal/require-permission";\n`
    : `import { verifySession } from "@/server/dal/session";\n`;

  const guardCall = permission
    ? `  // Authorisation is enforced here, not in the layout: layouts do not\n  // re-render between sibling routes, so each page checks for itself.\n  await requirePermission("${permission}");`
    : `  await verifySession();`;

  return `import type { Metadata } from "next";

${guardImport}import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = {
  title: ${JSON.stringify(title)},
  robots: { index: false, follow: false },
};

export default async function Page() {
${guardCall}

  return (
    <PlaceholderPage
      title={${JSON.stringify(title)}}
      description={${JSON.stringify(description)}}
    />
  );
}
`;
}

function publicTemplate(title, description) {
  return `import type { Metadata } from "next";

export const metadata: Metadata = {
  title: ${JSON.stringify(title)},
  description: ${JSON.stringify(description)},
  openGraph: {
    title: ${JSON.stringify(title)},
    description: ${JSON.stringify(description)},
  },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">${title}</h1>
      <p className="text-muted-foreground mt-3 max-w-2xl">${description}</p>
      <p className="text-muted-foreground mt-10 text-sm">
        This page is part of the planned public site and is awaiting content.
      </p>
    </div>
  );
}
`;
}

function authTemplate(title, description) {
  return `import type { Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: ${JSON.stringify(title)},
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>${title}</CardTitle>
        <CardDescription>${description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">
          This flow is scaffolded and awaiting its form implementation.
        </p>
      </CardContent>
    </Card>
  );
}
`;
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

let created = 0;
let skipped = 0;

async function write(routePath, contents) {
  const file = join(root, "src", "app", routePath, "page.tsx");
  if (await exists(file)) {
    skipped += 1;
    return;
  }
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, contents, "utf8");
  created += 1;
}

for (const [route, title, description, permission] of portalPages) {
  await write(route, portalTemplate(title, description, permission));
}
for (const [route, title, description] of publicPages) {
  await write(route, publicTemplate(title, description));
}
for (const [route, title, description] of authPages) {
  await write(route, authTemplate(title, description));
}

console.log(`created ${created}, skipped ${skipped}`);
