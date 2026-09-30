import type { Metadata } from "next";
import { Suspense } from "react";

import { LoadingState } from "@/components/feedback/loading-state";
import { VerifyEmailPanel } from "@/features/auth";

export const metadata: Metadata = {
  title: "Verify your email",
  description: "Confirm the email address for your Miracle International account.",
  robots: { index: false, follow: false },
};

export default function Page() {
  // `useSearchParams` in the panel (reading the verification token) requires a
  // Suspense boundary above it.
  return (
    <Suspense fallback={<LoadingState rows={3} />}>
      <VerifyEmailPanel />
    </Suspense>
  );
}
