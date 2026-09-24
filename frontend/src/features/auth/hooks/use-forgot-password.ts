"use client";

import { useMutation } from "@tanstack/react-query";

import { authApi } from "../api/auth.api";
import type { ForgotPasswordInput } from "../schemas/password.schema";

/**
 * Unlike login/register, success here does not navigate anywhere: the next
 * step is an email the user has to go open, so the form swaps to a
 * confirmation panel in place instead.
 */
export function useForgotPassword() {
  return useMutation({
    mutationFn: (input: ForgotPasswordInput) => authApi.forgotPassword(input),
  });
}
