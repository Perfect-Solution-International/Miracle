"use client";

import { Bell } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
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
import { useAuth } from "@/providers/auth-provider";

/**
 * Notification bell.
 *
 * Renders the shell and empty state now; the notifications feature module will
 * supply `useNotifications()` and replace the placeholder list without changing
 * the header.
 */
export function NotificationMenu() {
  const { isAuthenticated, ability } = useAuth();

  if (!isAuthenticated || !ability.can("notifications.read")) return null;

  const unreadCount = 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label={
            unreadCount > 0 ? `Notifications, ${unreadCount} unread` : "Notifications"
          }
        >
          <Bell aria-hidden="true" />
          {unreadCount > 0 ? (
            <Badge className="absolute -top-0.5 -right-0.5 size-4 justify-center p-0 text-[10px]">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <p className="text-muted-foreground px-2 py-6 text-center text-sm">
          You have no new notifications.
        </p>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={ROUTES.customer.notifications} className="justify-center text-sm">
            View all
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
