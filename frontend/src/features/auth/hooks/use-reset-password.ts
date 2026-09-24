"use client";

import { useMutation } from "@tanstack/react-query";

import { authApi } from "../api/auth.api";
import type { ResetPasswordInput } from "../schemas/password.schema";

export function useResetPassword() {
  return useMutation({
    mutationFn: (input: ResetPasswordInput) => authApi.resetPassword(input),
  });
}
