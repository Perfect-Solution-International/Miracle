import type { Metadata } from "next";
import { Suspense } from "react";

import { LoadingState } from "@/components/feedback/loading-state";
import { ResetPasswordForm } from "@/features/auth";

export const metadata: Metadata = {
  title: "Reset password",
  description: "Choose a new password for your Miracle International account.",
  robots: { index: false, follow: false },
};

export default function Page() {
  // `useSearchParams` in the form (reading the reset token) requires a
  // Suspense boundary above it.
  return (
    <Suspense fallback={<LoadingState rows={3} />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
