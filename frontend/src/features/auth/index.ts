/**
 * Public surface of the auth feature.
 *
 * Other features import from here, never from internal paths, so the module's
 * internals can be refactored without breaking consumers.
 */
export { ForgotPasswordForm } from "./components/forgot-password-form";
export { LoginForm } from "./components/login-form";
export { RegisterForm } from "./components/register-form";
export { ResetPasswordForm } from "./components/reset-password-form";
export { useForgotPassword } from "./hooks/use-forgot-password";
export { useLogin } from "./hooks/use-login";
export { useRegister } from "./hooks/use-register";
export { useResetPassword } from "./hooks/use-reset-password";
export { useCurrentUser } from "./hooks/use-current-user";
export { authApi } from "./api/auth.api";
export { authKeys } from "./api/auth.keys";
export { loginSchema, type LoginInput } from "./schemas/login.schema";
export {
  registerSchema,
  REGISTRABLE_ACCOUNT_TYPES,
  type RegisterInput,
} from "./schemas/register.schema";
export {
  forgotPasswordSchema,
  resetPasswordSchema,
  type ForgotPasswordInput,
  type ResetPasswordInput,
} from "./schemas/password.schema";
export type { AuthenticatedUser, LoginResult, RegisterResult } from "./types/auth.types";
