import { api } from "@/lib/api/client";
import { API_ROUTES } from "@/lib/api/endpoints";
import type { ForgotPasswordInput, ResetPasswordInput } from "../schemas/password.schema";
import type { LoginInput } from "../schemas/login.schema";
import type { RegisterInput } from "../schemas/register.schema";
import type { AuthenticatedUser, LoginResult, RegisterResult } from "../types/auth.types";

/**
 * Auth transport.
 *
 * These call the BFF routes, which exchange credentials with the Rust API and
 * set HTTP-only cookies. No token is ever returned to or stored by the browser.
 */
export const authApi = {
  login: (input: LoginInput) => api.post<LoginResult>(API_ROUTES.auth.login, input),

  register: ({ confirmPassword: _confirm, ...input }: RegisterInput) =>
    // `confirmPassword` is a client-side concern; the backend never needs it.
    api.post<RegisterResult>(API_ROUTES.auth.register, input),

  logout: () => api.post<{ signedOut: boolean }>(API_ROUTES.auth.logout),

  currentUser: () => api.get<AuthenticatedUser>(API_ROUTES.auth.me),

  forgotPassword: (input: ForgotPasswordInput) =>
    api.post<{ sent: boolean }>(API_ROUTES.auth.forgotPassword, input),

  resetPassword: ({ confirmPassword: _confirm, ...input }: ResetPasswordInput) =>
    api.post<{ reset: boolean }>(API_ROUTES.auth.resetPassword, input),

  verifyEmail: (token: string) =>
    api.post<{ verified: boolean }>(API_ROUTES.auth.verifyEmail, { token }),

  resendVerification: () =>
    api.post<{ sent: boolean }>(API_ROUTES.auth.resendVerification),
};
