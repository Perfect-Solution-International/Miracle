import { PERMISSIONS, type Permission } from "@/lib/permissions/permissions";
import type { Role } from "@/lib/permissions/roles";

/**
 * Temporary development/testing admin account configuration and helpers.
 *
 * NOTE: For frontend development and testing purposes only.
 * Production authentication remains authoritative in the backend.
 */
export const DEV_ADMIN_CREDENTIALS = {
  email: "admin@miracleinternational.com",
  password: "Admin@123",
} as const;

export const DEV_ADMIN_STORAGE_KEY = "miracle_temp_admin_auth";
export const LEGACY_ADMIN_STORAGE_KEY = "temp_admin_auth";
export const DEV_ADMIN_COOKIE_NAME = "mi_session";
export const DEV_ADMIN_SESSION_TOKEN = "temp-admin-session";

export interface DevAdminAuthState {
  email: string;
  role: string;
  isAuthenticated: boolean;
  loggedInAt?: string;
}

export interface DevAdminUserDto {
  id: string;
  email: string;
  displayName: string;
  initials: string;
  roles: Role[];
  permissions: Permission[];
  emailVerified: boolean;
  avatarUrl?: string;
  companyName?: string;
}

export interface DevAdminSessionUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: Role[];
  permissions: Permission[];
  emailVerified: boolean;
  avatarUrl?: string;
  companyName?: string;
}

/**
 * Validates if the given credentials match the temporary development admin account.
 */
export function isTestAdminCredentials(
  email?: string | null,
  password?: string | null,
): boolean {
  if (!email || !password) return false;
  const isEmailMatch = email.trim().toLowerCase() === DEV_ADMIN_CREDENTIALS.email.toLowerCase();
  const isPasswordMatch =
    password === "Admin@123456" ||
    password === "Admin@123" ||
    password === DEV_ADMIN_CREDENTIALS.password;
  return isEmailMatch && isPasswordMatch;
}

/**
 * Returns mock user DTO representation for test admin.
 */
export function getTestAdminUserDto(): DevAdminUserDto {
  return {
    id: "temp-admin-id",
    email: DEV_ADMIN_CREDENTIALS.email,
    displayName: "Admin Administrator",
    initials: "AA",
    roles: ["super_admin", "admin"],
    permissions: [...PERMISSIONS],
    emailVerified: true,
    companyName: "Miracle International",
  };
}

/**
 * Returns mock session user representation for test admin.
 */
export function getTestAdminSessionUser(): DevAdminSessionUser {
  return {
    id: "temp-admin-id",
    email: DEV_ADMIN_CREDENTIALS.email,
    firstName: "Admin",
    lastName: "Administrator",
    roles: ["super_admin", "admin"],
    permissions: [...PERMISSIONS],
    emailVerified: true,
    companyName: "Miracle International",
  };
}

/**
 * Saves temporary admin authentication state into localStorage and sets the session cookie.
 */
export function setTestAdminAuthState(): void {
  if (typeof window === "undefined") return;

  const state: DevAdminAuthState = {
    email: DEV_ADMIN_CREDENTIALS.email,
    role: "admin",
    isAuthenticated: true,
    loggedInAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(DEV_ADMIN_STORAGE_KEY, JSON.stringify(state));
    localStorage.setItem(LEGACY_ADMIN_STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.warn("Failed to save temporary admin state to localStorage", err);
  }

  // Set the session cookie so server components and proxy middleware recognize the session
  document.cookie = `${DEV_ADMIN_COOKIE_NAME}=${DEV_ADMIN_SESSION_TOKEN}; path=/; max-age=86400; SameSite=Lax`;

  // Dispatch custom event for real-time reactivity in client components
  window.dispatchEvent(new CustomEvent("dev-admin-auth-change", { detail: state }));
}

/**
 * Retrieves the temporary admin auth state from localStorage.
 */
export function getTestAdminAuthState(): DevAdminAuthState | null {
  if (typeof window === "undefined") return null;

  try {
    const raw =
      localStorage.getItem(DEV_ADMIN_STORAGE_KEY) ||
      localStorage.getItem(LEGACY_ADMIN_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<DevAdminAuthState>;
    if (
      parsed.isAuthenticated &&
      parsed.email?.toLowerCase() === DEV_ADMIN_CREDENTIALS.email.toLowerCase()
    ) {
      return {
        email: parsed.email,
        role: parsed.role || "admin",
        isAuthenticated: true,
        loggedInAt: parsed.loggedInAt,
      };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Checks if the test admin authentication state is active in localStorage.
 */
export function isTestAdminAuthenticated(): boolean {
  return Boolean(getTestAdminAuthState()?.isAuthenticated);
}

/**
 * Clears the temporary admin authentication state from localStorage and cookies.
 */
export function clearTestAdminAuthState(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(DEV_ADMIN_STORAGE_KEY);
    localStorage.removeItem(LEGACY_ADMIN_STORAGE_KEY);
  } catch (err) {
    console.warn("Failed to remove temporary admin state from localStorage", err);
  }

  // Expire the session cookie
  document.cookie = `${DEV_ADMIN_COOKIE_NAME}=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT`;

  window.dispatchEvent(new CustomEvent("dev-admin-auth-change", { detail: null }));
}
