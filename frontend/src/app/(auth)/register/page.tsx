import type { Metadata } from "next";

import { RegisterForm } from "@/features/auth";

export const metadata: Metadata = {
  title: "Create an account",
  description: "Register to start sourcing with Miracle International.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <RegisterForm />;
}
