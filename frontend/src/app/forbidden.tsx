import Link from "next/link";
import { ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

/**
 * Rendered when `forbidden()` is called from the DAL, with a 403 status.
 * The user is signed in but lacks the required permission.
 */
export default function Forbidden() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 p-6 text-center">
      <ShieldAlert className="text-destructive size-10" aria-hidden="true" />
      <h1 className="text-2xl font-semibold">Access denied</h1>
      <p className="text-muted-foreground max-w-md text-sm">
        You do not have permission to view this page. If you believe this is a mistake,
        contact your account administrator.
      </p>
      <div className="flex gap-2">
        <Button asChild variant="outline">
          <Link href={ROUTES.public.home}>Return home</Link>
        </Button>
        <Button asChild>
          <Link href={ROUTES.public.contact}>Contact support</Link>
        </Button>
      </div>
    </main>
  );
}
