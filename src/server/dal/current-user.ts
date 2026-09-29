import "server-only";

import { cache } from "react";

import { getCurrentUser, type SessionUser } from "./session";

/**
 * Data Transfer Object for the browser.
 *
 * Server components pass this to client components instead of the full session
 * object, so only fields the UI needs cross the network boundary.
 */
export interface CurrentUserDto {
  id: string;
  email: string;
  displayName: string;
  initials: string;
  roles: SessionUser["roles"];
  permissions: SessionUser["permissions"];
  emailVerified: boolean;
  avatarUrl?: string;
  companyName?: string;
}

function initialsOf(first: string, last: string, email: string): string {
  const letters = `${first.charAt(0)}${last.charAt(0)}`.trim();
  return (letters || email.charAt(0)).toUpperCase();
}

export const getCurrentUserDto = cache(async (): Promise<CurrentUserDto | null> => {
  const user = await getCurrentUser();
  if (!user) return null;

  const displayName = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();

  return {
    id: user.id,
    email: user.email,
    displayName: displayName || user.email,
    initials: initialsOf(user.firstName, user.lastName, user.email),
    roles: user.roles,
    permissions: user.permissions,
    emailVerified: user.emailVerified,
    avatarUrl: user.avatarUrl,
    companyName: user.companyName,
  };
});
