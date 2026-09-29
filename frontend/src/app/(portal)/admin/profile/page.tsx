import type { Metadata } from "next";
import { UserCircle, ShieldCheck, Mail, Phone, Building2, KeyRound } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Admin Profile | Miracle International",
  description: "View and manage Administrator profile and credentials.",
  robots: { index: false, follow: false },
};

export default function AdminProfilePage() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="border-b border-border/60 pb-4">
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-navy">
          Admin Profile
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Manage your administrative profile, role permissions, and security credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="rounded-2xl border-slate-200 bg-white shadow-xs md:col-span-1 p-6 text-center space-y-4">
          <div className="size-20 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center mx-auto border-2 border-brand-blue/20">
            <UserCircle className="size-12" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-navy">Miracle Administrator</h2>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">admin@miracleinternational.com</p>
            <Badge className="bg-emerald-600 text-white text-xs font-bold mt-2">
              Super Admin / Manager
            </Badge>
          </div>
          <div className="border-t border-slate-100 pt-4 text-xs space-y-2 text-left">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Portal:</span>
              <span className="font-bold text-ink">Administration</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Access Level:</span>
              <span className="font-bold text-brand-blue">Full Control</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <span className="font-bold text-emerald-600">Active</span>
            </div>
          </div>
        </Card>

        {/* Details & Security Card */}
        <Card className="rounded-2xl border-slate-200 bg-white shadow-xs md:col-span-2">
          <CardHeader className="p-6 pb-4 border-b border-slate-100">
            <CardTitle className="text-base font-bold text-navy">
              Account Information &amp; Permissions
            </CardTitle>
            <CardDescription className="text-xs">
              System access configuration for Miracle International operations.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-muted-foreground block text-[11px]">Organization</span>
                <span className="font-bold text-sm text-ink">Miracle International (Pvt) Ltd</span>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground block text-[11px]">Primary Contact</span>
                <span className="font-bold text-sm text-ink">+94 11 234 5678</span>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground block text-[11px]">Tour Management</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <ShieldCheck className="size-3.5" /> Full Access (Inbound &amp; Outbound)
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground block text-[11px]">Centralized Inquiries</span>
                <span className="font-bold text-brand-blue flex items-center gap-1">
                  <ShieldCheck className="size-3.5" /> Full Management &amp; Reply Desk
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h3 className="font-bold text-xs text-navy mb-2">Security &amp; Password</h3>
              <p className="text-muted-foreground text-xs leading-relaxed mb-4">
                To update your administrator password or multi-factor authentication, visit Security Settings.
              </p>
              <Button variant="outline" size="sm" className="h-9 text-xs rounded-xl font-bold gap-1.5">
                <KeyRound className="size-3.5" /> Change Password
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
