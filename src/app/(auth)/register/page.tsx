import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { RegisterForm } from "@/features/auth";

export const metadata: Metadata = {
  title: "Create an account",
  description: "Register to start sourcing with Miracle International.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <Button
        asChild
        variant="outline"
        className="fixed top-4 left-4 z-10 h-11 w-11 gap-2 rounded-xl p-0 shadow-sm sm:top-6 sm:left-6 sm:w-auto sm:px-4"
      >
        <Link href={ROUTES.admin.dashboard}>
          <ArrowLeft className="size-4" aria-hidden="true" />
          <span className="sr-only sm:not-sr-only">Back to dashboard</span>
        </Link>
      </Button>
      <RegisterForm />
    </>
  );
}
