import type { Metadata } from "next";
import { Suspense } from "react";

import { LoginForm } from "@/features/auth";
import { LoadingState } from "@/components/feedback/loading-state";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Miracle International account.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    // `useSearchParams` in the form requires a Suspense boundary above it.
    <Suspense fallback={<LoadingState rows={3} />}>
      <LoginForm />
    </Suspense>
  );
}
