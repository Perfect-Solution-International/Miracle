import Link from "next/link";
import { LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

/** Rendered when `unauthorized()` is called, with a 401 status. */
export default function Unauthorized() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 p-6 text-center">
      <LogIn className="text-muted-foreground size-10" aria-hidden="true" />
      <h1 className="text-2xl font-semibold">Sign in required</h1>
      <p className="text-muted-foreground max-w-md text-sm">
        Your session has ended or you are not signed in. Sign in to continue.
      </p>
      <Button asChild>
        <Link href={ROUTES.auth.login}>Sign in</Link>
      </Button>
    </main>
  );
}
