import type { Permission } from "@/lib/permissions/permissions";
import type { Role } from "@/lib/permissions/roles";

/** Shape returned by the auth endpoints once tokens have been stripped by the BFF. */
export interface AuthenticatedUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: Role[];
  permissions: Permission[];
  emailVerified: boolean;
  companyName?: string;
  avatarUrl?: string;
}

export interface LoginResult {
  user: AuthenticatedUser;
  /** Where to send the user next, resolved from their roles. */
  redirectTo?: string;
}

export interface RegisterResult {
  user: AuthenticatedUser;
  verificationRequired: boolean;
}
