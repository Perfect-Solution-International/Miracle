"use client";

import { CircleCheck, Loader2, MailCheck, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/config/routes";
import { isApiError } from "@/lib/api/api-error";

import { useResendVerification, useVerifyEmail } from "../hooks/use-verify-email";

function PanelShell({
  icon: Icon,
  tone,
  title,
  spin = false,
  children,
}: {
  icon: typeof CircleCheck;
  tone: "success" | "warning" | "neutral";
  title: string;
  spin?: boolean;
  children: ReactNode;
}) {
  const toneClass =
    tone === "warning"
      ? "bg-destructive/10 text-destructive"
      : "bg-brand-blue-light text-brand-blue";

  return (
    <Card className="shadow-xs">
      <CardContent className="flex flex-col items-center gap-4 pt-6 text-center">
        <span
          className={`${toneClass} inline-flex size-14 items-center justify-center rounded-full`}
        >
          <Icon aria-hidden="true" className={spin ? "size-6 animate-spin" : "size-6"} />
        </span>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {children}
      </CardContent>
    </Card>
  );
}

/**
 * Two entry points share this page: straight after registration (no token —
 * "check your inbox", with a resend button), and from the emailed link
 * (`?token=` — the token is redeemed once, automatically).
 */
export function VerifyEmailPanel() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  if (token) return <RedeemToken token={token} />;
  return <AwaitingEmail />;
}

function RedeemToken({ token }: { token: string }) {
  const verifyEmail = useVerifyEmail();
  // Tokens are single use. The ref keeps React's development double-invoke of
  // effects from redeeming it twice and showing a spurious "expired" error.
  const submitted = useRef(false);

  useEffect(() => {
    if (submitted.current) return;
    submitted.current = true;
    verifyEmail.mutate(token);
  }, [token, verifyEmail]);

  if (verifyEmail.isSuccess) {
    return (
      <PanelShell icon={CircleCheck} tone="success" title="Email Verified">
        <p className="text-muted-foreground text-sm text-balance">
          Thanks for confirming your email address. Your account is ready to use.
        </p>
        <Button asChild size="xl" className="w-full">
          <Link href={ROUTES.customer.dashboard}>Continue</Link>
        </Button>
      </PanelShell>
    );
  }

  if (verifyEmail.isError) {
    return (
      <PanelShell icon={TriangleAlert} tone="warning" title="Link Invalid or Expired">
        <p className="text-muted-foreground text-sm text-balance">
          {isApiError(verifyEmail.error)
            ? verifyEmail.error.message
            : "We couldn't verify your email. Please try again."}
        </p>
        <Button asChild size="xl" className="w-full">
          <Link href={ROUTES.auth.verifyEmail}>Request a New Link</Link>
        </Button>
      </PanelShell>
    );
  }

  return (
    <PanelShell icon={Loader2} tone="neutral" title="Verifying your email..." spin>
      <p className="text-muted-foreground text-sm">This only takes a moment.</p>
    </PanelShell>
  );
}

function AwaitingEmail() {
  const resend = useResendVerification();
  const [notice, setNotice] = useState<string | null>(null);

  async function onResend() {
    setNotice(null);
    try {
      const result = await resend.mutateAsync();
      setNotice(
        result.alreadyVerified
          ? "Your email is already verified."
          : "A new verification link is on its way.",
      );
    } catch {
      // Rendered from `resend.error` below.
    }
  }

  const resendError = resend.error
    ? isApiError(resend.error) && resend.error.isUnauthenticated
      ? "Sign in to request a new verification link."
      : isApiError(resend.error)
        ? resend.error.message
        : "Something went wrong. Please try again."
    : null;

  return (
    <PanelShell icon={MailCheck} tone="neutral" title="Verify your email">
      <p className="text-muted-foreground text-sm text-balance">
        We&apos;ve sent a verification link to your email address. Open it to confirm
        your account.
      </p>

      {notice ? (
        <Alert className="text-left">
          <AlertDescription>{notice}</AlertDescription>
        </Alert>
      ) : null}
      {resendError ? (
        <Alert variant="destructive" className="text-left">
          <AlertDescription>{resendError}</AlertDescription>
        </Alert>
      ) : null}

      <Button
        type="button"
        size="xl"
        className="w-full"
        onClick={onResend}
        disabled={resend.isPending}
      >
        {resend.isPending ? (
          <>
            <Loader2 className="animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          "Resend verification email"
        )}
      </Button>

      <Link
        href={ROUTES.auth.login}
        className="text-muted-foreground hover:text-foreground text-sm"
      >
        Back to sign in
      </Link>
    </PanelShell>
  );
}
