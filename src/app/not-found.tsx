import Link from "next/link";
import { FileQuestion } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 p-6 text-center">
      <FileQuestion className="text-muted-foreground size-10" aria-hidden="true" />
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="text-muted-foreground max-w-md text-sm">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Button asChild>
        <Link href={ROUTES.public.home}>Return home</Link>
      </Button>
    </main>
  );
}
