"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { ROUTES } from "@/config/routes";
import { authApi } from "../api/auth.api";
import type { RegisterInput } from "../schemas/register.schema";

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: (input: RegisterInput) => authApi.register(input),
    onSuccess: (result) => {
      router.replace(
        result.verificationRequired ? ROUTES.auth.verifyEmail : ROUTES.customer.dashboard,
      );
      router.refresh();
    },
  });
}
