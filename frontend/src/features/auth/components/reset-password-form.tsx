"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  CircleCheck,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/config/routes";
import { applyBackendErrors } from "@/lib/validation/backend-errors";

import { useResetPassword } from "../hooks/use-reset-password";
import { resetPasswordSchema, type ResetPasswordInput } from "../schemas/password.schema";

/** Shared shell so the invalid-link and success panels match the form's card. */
function ResetPasswordPanel({
  icon: Icon,
  iconTone,
  title,
  description,
  action,
}: {
  icon: typeof CircleCheck;
  iconTone: "success" | "warning";
  title: string;
  description: string;
  action: { href: string; label: string };
}) {
  return (
    <Card className="shadow-xs">
      <CardContent className="flex flex-col items-center gap-4 pt-6 text-center">
        <span
          className={
            iconTone === "success"
              ? "bg-brand-blue-light text-brand-blue inline-flex size-14 items-center justify-center rounded-full"
              : "bg-destructive/10 text-destructive inline-flex size-14 items-center justify-center rounded-full"
          }
        >
          <Icon aria-hidden="true" className="size-6" />
        </span>
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground text-sm text-balance">{description}</p>
        </div>
        <Button asChild size="xl" className="w-full">
          <Link href={action.href}>{action.label}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

/**
 * Lands from the link sent by `ForgotPasswordForm`. The token travels as a
 * query param rather than a visible field, so it is registered as a hidden
 * input instead of rendered.
 */
export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const resetPassword = useResetPassword();
  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token, password: "", confirmPassword: "" },
  });

  async function onSubmit(values: ResetPasswordInput) {
    setFormError(null);
    try {
      await resetPassword.mutateAsync(values);
      setResetComplete(true);
    } catch (error) {
      const message = applyBackendErrors(error, form.setError, [
        "password",
        "confirmPassword",
      ]);
      setFormError(message);
    }
  }

  if (!token) {
    return (
      <ResetPasswordPanel
        icon={TriangleAlert}
        iconTone="warning"
        title="Invalid Reset Link"
        description="This password reset link is invalid or has expired. Request a new one to continue."
        action={{ href: ROUTES.auth.forgotPassword, label: "Request a New Link" }}
      />
    );
  }

  if (resetComplete) {
    return (
      <ResetPasswordPanel
        icon={CircleCheck}
        iconTone="success"
        title="Password Reset"
        description="Your password has been reset successfully. You can now sign in with your new password."
        action={{ href: ROUTES.auth.login, label: "Continue to Login" }}
      />
    );
  }

  return (
    <Card className="shadow-xs">
      <CardHeader>
        <h1 className="text-2xl font-bold tracking-tight">Reset Your Password</h1>
        <p className="text-muted-foreground text-sm">
          Choose a new password for your account.
        </p>
      </CardHeader>
      <CardContent>
        {formError ? (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        ) : null}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <input type="hidden" {...form.register("token")} />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <div className="relative">
                    <Lock
                      aria-hidden="true"
                      className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
                    />
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Create a new password"
                        className="pr-9 pl-9"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff aria-hidden="true" className="size-4" />
                      ) : (
                        <Eye aria-hidden="true" className="size-4" />
                      )}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <div className="relative">
                    <Lock
                      aria-hidden="true"
                      className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
                    />
                    <FormControl>
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Re-enter your new password"
                        className="pr-9 pl-9"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((value) => !value)}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                    >
                      {showConfirmPassword ? (
                        <EyeOff aria-hidden="true" className="size-4" />
                      ) : (
                        <Eye aria-hidden="true" className="size-4" />
                      )}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              size="xl"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" aria-hidden="true" />
                  Resetting...
                </>
              ) : (
                <>
                  Reset Password
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
