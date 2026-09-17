"use client";

import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/config/routes";
import { api } from "@/lib/api/client";
import { API_ROUTES } from "@/lib/api/endpoints";
import { getRoleDefinition } from "@/lib/permissions/roles";
import { useAuth } from "@/providers/auth-provider";

/** Account menu. Logout clears the HTTP-only cookies via the BFF. */
export function UserMenu() {
  const { user, ability } = useAuth();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  if (!user) {
    return (
      <Button asChild size="sm">
        <Link href={ROUTES.auth.login}>Sign in</Link>
      </Button>
    );
  }

  const primaryRole = user.roles[0];
  const roleLabel = primaryRole ? getRoleDefinition(primaryRole).label : "Member";

  async function handleSignOut() {
    setIsSigningOut(true);
    try {
      await api.post(API_ROUTES.auth.logout);
    } finally {
      // Navigate regardless: the cookie may already be gone server-side.
      router.replace(ROUTES.auth.login);
      router.refresh();
    }
  }

  const profileHref =
    ability.portal === "supplier" ? ROUTES.supplier.profile : ROUTES.customer.profile;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open account menu">
          <Avatar className="size-7">
            {user.avatarUrl ? <AvatarImage src={user.avatarUrl} alt="" /> : null}
            <AvatarFallback className="text-xs">{user.initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel className="space-y-0.5">
          <p className="truncate text-sm font-medium">{user.displayName}</p>
          <p className="text-muted-foreground truncate text-xs font-normal">
            {user.email}
          </p>
          <p className="text-muted-foreground text-xs font-normal">{roleLabel}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={profileHref}>
            <User aria-hidden="true" />
            Profile
          </Link>
        </DropdownMenuItem>
        {ability.can("settings.manage") ? (
          <DropdownMenuItem asChild>
            <Link href={ROUTES.admin.settings}>
              <Settings aria-hidden="true" />
              Settings
            </Link>
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} disabled={isSigningOut}>
          <LogOut aria-hidden="true" />
          {isSigningOut ? "Signing out..." : "Sign out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
