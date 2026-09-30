"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { authApi } from "../api/auth.api";
import { authKeys } from "../api/auth.keys";

export function useVerifyEmail() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (token: string) => authApi.verifyEmail(token),
    onSuccess: async () => {
      // `emailVerified` is part of the session user; re-read it everywhere.
      await queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
      router.refresh();
    },
  });
}

export function useResendVerification() {
  return useMutation({
    mutationFn: () => authApi.resendVerification(),
  });
}
