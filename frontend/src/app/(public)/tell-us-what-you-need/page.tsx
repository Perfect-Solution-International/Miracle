import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROUTES } from "@/config/routes";
import { getCurrentUser } from "@/server/dal/session";

export const metadata: Metadata = {
  title: "Tell Us What You Need",
  description:
    "Describe your product requirement and our sourcing team will find verified suppliers and prepare quotations.",
};

/**
 * Public entry point to the sourcing funnel.
 *
 * Uses `getCurrentUser()` rather than `verifySession()` so guests are not
 * redirected: signed-in customers go straight to the form, everyone else is
 * invited to register first.
 */
export default async function TellUsWhatYouNeedPage() {
  const user = await getCurrentUser();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Tell us what you need</h1>
      <p className="text-muted-foreground mt-3">
        Share your product requirement and our sourcing team will identify verified
        suppliers, negotiate pricing, and prepare a quotation for you.
      </p>

      <Card className="mt-10">
        <CardHeader>
          <CardTitle>{user ? "Submit a requirement" : "Get started"}</CardTitle>
          <CardDescription>
            {user
              ? "Your requirement will be routed to our procurement team."
              : "Create an account to submit a requirement and track its progress."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          {user ? (
            <Button asChild>
              <Link href="/customer/requirements/new">Continue to the form</Link>
            </Button>
          ) : (
            <>
              <Button asChild>
                <Link href={ROUTES.auth.register}>Create an account</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={ROUTES.auth.login}>Sign in</Link>
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
