"use client";

import { Bell, Check, Clock, FileCheck2, Plane, Ship } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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

export interface AdminNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  icon: typeof Bell;
  href: string;
}

const INITIAL_NOTIFICATIONS: AdminNotification[] = [];

export function NotificationMenu() {
  const { isAuthenticated, ability } = useAuth();
  const [notifications, setNotifications] = useState<AdminNotification[]>(INITIAL_NOTIFICATIONS);

  if (!isAuthenticated || !ability.can("notifications.read")) return null;

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative size-8 text-foreground/80 hover:text-brand-blue"
          aria-label={
            unreadCount > 0 ? `Notifications, ${unreadCount} unread` : "Notifications"
          }
        >
          <Bell className="size-4" aria-hidden="true" />
          {unreadCount > 0 ? (
            <span className="absolute 0.5 top-0.5 right-0.5 flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-red" />
            </span>
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between border-b border-border px-3.5 py-2.5">
          <div className="flex items-center gap-1.5">
            <DropdownMenuLabel className="p-0 text-xs font-bold text-navy dark:text-foreground">
              Notifications
            </DropdownMenuLabel>
            {unreadCount > 0 ? (
              <Badge className="h-4 bg-brand-red px-1.5 text-[9px] text-white">
                {unreadCount} new
              </Badge>
            ) : null}
          </div>

          {unreadCount > 0 ? (
            <button
              type="button"
              onClick={markAllAsRead}
              className="text-[11px] font-medium text-brand-blue hover:underline"
            >
              Mark all read
            </button>
          ) : null}
        </div>

        <div className="max-h-72 overflow-y-auto divide-y divide-border/50">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
              <Bell className="size-6 text-muted-foreground/40 mb-1.5" />
              <p className="text-xs font-semibold text-foreground">No notifications</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                You are all caught up. New updates will appear here.
              </p>
            </div>
          ) : (
            notifications.map((item) => {
              const Icon = item.icon;
              return (
                <DropdownMenuItem
                  key={item.id}
                  asChild
                  className="cursor-pointer p-3 focus:bg-muted/60"
                >
                  <Link href={item.href} className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-brand-blue-light text-brand-blue dark:bg-brand-blue/30">
                      <Icon className="size-3.5" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-xs font-semibold text-navy dark:text-foreground truncate">
                          {item.title}
                        </p>
                        {item.unread ? (
                          <span className="size-1.5 shrink-0 rounded-full bg-brand-red" />
                        ) : null}
                      </div>
                      <p className="text-[11px] text-muted-foreground line-clamp-2">
                        {item.description}
                      </p>
                      <p className="text-[10px] text-muted-foreground/80 flex items-center gap-1 pt-0.5">
                        <Clock className="size-2.5" />
                        {item.time}
                      </p>
                    </div>
                  </Link>
                </DropdownMenuItem>
              );
            })
          )}
        </div>

        <div className="border-t border-border p-1.5 text-center">
          <Button asChild variant="ghost" size="sm" className="w-full h-7 text-xs text-muted-foreground hover:text-brand-blue">
            <Link href={ROUTES.admin.dashboard}>
              Miracle International Operations Center
            </Link>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
