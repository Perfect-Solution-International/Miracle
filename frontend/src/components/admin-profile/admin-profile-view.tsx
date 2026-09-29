"use client";

import {
  AlertCircle,
  Building2,
  Camera,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
  Globe2,
  KeyRound,
  Loader2,
  Lock,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  Trash2,
  Upload,
  User,
  UserCircle,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface AdminProfileData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  country: string;
  jobTitle: string;
  avatarUrl?: string;
  role: string;
  accountStatus: string;
  createdAt: string;
  lastUpdated: string;
  lastLogin: string;
}

interface AdminProfileViewProps {
  initialEmail?: string;
  initialName?: string;
}

export function AdminProfileView({
  initialEmail = "admin@miracleinternational.com",
  initialName = "Miracle Administrator",
}: AdminProfileViewProps) {
  const [profile, setProfile] = useState<AdminProfileData>({
    id: "admin-miracle-01",
    fullName: initialName,
    email: initialEmail,
    phone: "+94 11 234 5678",
    whatsappNumber: "+94 77 123 4567",
    country: "Sri Lanka",
    jobTitle: "Operations Administrator",
    avatarUrl: "",
    role: "Administrator",
    accountStatus: "Active",
    createdAt: "Jan 15, 2024",
    lastUpdated: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    lastLogin: "Today, " + new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [profileError, setProfileError] = useState("");

  // Editable Form State
  const [formData, setFormData] = useState({
    fullName: initialName,
    email: initialEmail,
    phone: "+94 11 234 5678",
    whatsappNumber: "+94 77 123 4567",
    country: "Sri Lanka",
    jobTitle: "Operations Administrator",
  });

  // Password Change Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Load Profile from API on mount
  useEffect(() => {
    async function loadProfile() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/v1/admin/profile");
        const json = await res.json();
        if (res.ok && json.success && json.data) {
          const data: AdminProfileData = json.data;
          setProfile(data);
          setFormData({
            fullName: data.fullName || initialName,
            email: data.email || initialEmail,
            phone: data.phone || "",
            whatsappNumber: data.whatsappNumber || "",
            country: data.country || "Sri Lanka",
            jobTitle: data.jobTitle || "Operations Administrator",
          });
        }
      } catch (err) {
        console.error("Error fetching admin profile:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, [initialEmail, initialName]);

  // Handle Avatar Image Upload
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a JPG, PNG, WebP, or AVIF image format.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Avatar image must not exceed 5MB.");
      return;
    }

    setIsUploadingAvatar(true);
    const body = new FormData();
    body.append("file", file);

    try {
      const res = await fetch("/api/v1/travel/upload", {
        method: "POST",
        body,
      });
      const data = await res.json();
      if (res.ok && data.success && data.url) {
        const newAvatarUrl = data.url as string;
        // Save immediately to profile API
        const updateRes = await fetch("/api/v1/admin/profile", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, avatarUrl: newAvatarUrl }),
        });
        if (updateRes.ok) {
          setProfile((prev) => ({ ...prev, avatarUrl: newAvatarUrl }));
          toast.success("Profile photo updated successfully.");
        } else {
          toast.error("Failed to save avatar photo to profile.");
        }
      } else {
        toast.error(data.error || "Failed to upload image.");
      }
    } catch (err) {
      console.error("Avatar upload error:", err);
      toast.error("Network error occurred while uploading avatar.");
    } finally {
      setIsUploadingAvatar(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemoveAvatar = async () => {
    try {
      const updateRes = await fetch("/api/v1/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, avatarUrl: "" }),
      });
      if (updateRes.ok) {
        setProfile((prev) => ({ ...prev, avatarUrl: "" }));
        toast.success("Profile photo removed.");
      }
    } catch {
      toast.error("Failed to remove profile photo.");
    }
  };

  // Handle Profile Form Submission
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError("");

    if (!formData.fullName.trim()) {
      setProfileError("Full Name is required.");
      return;
    }

    if (!formData.email.trim() || !formData.email.includes("@")) {
      setProfileError("Please provide a valid administrator email address.");
      return;
    }

    setIsSavingProfile(true);

    try {
      const res = await fetch("/api/v1/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          avatarUrl: profile.avatarUrl,
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setProfile(json.data);
        toast.success("Admin profile updated successfully.");
      } else {
        setProfileError(json.error || "Failed to save profile changes.");
        toast.error(json.error || "Failed to save profile changes.");
      }
    } catch (err) {
      console.error("Save profile error:", err);
      setProfileError("Network error occurred while updating profile.");
      toast.error("Network error occurred while updating profile.");
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleCancelProfile = () => {
    setFormData({
      fullName: profile.fullName,
      email: profile.email,
      phone: profile.phone,
      whatsappNumber: profile.whatsappNumber,
      country: profile.country,
      jobTitle: profile.jobTitle,
    });
    setProfileError("");
  };

  // Handle Password Change
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    if (!currentPassword) {
      setPasswordError("Please enter your current password.");
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters in length.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }

    setIsChangingPassword(true);

    try {
      const res = await fetch("/api/v1/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        toast.success("Password changed successfully. Your account credentials have been updated.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setPasswordError(json.error || "Failed to change password.");
        toast.error(json.error || "Failed to change password.");
      }
    } catch (err) {
      console.error("Change password error:", err);
      setPasswordError("Network error occurred while changing password.");
      toast.error("Network error occurred while changing password.");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleCancelPassword = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="space-y-8 max-w-5xl pb-16">
      {/* ========================================================================= */}
      {/* 1. PAGE HEADER */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-navy dark:text-foreground">
              My Profile
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800">
              <ShieldCheck className="size-3.5" />
              Verified Administrator
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            Manage your account information and security settings.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground self-start sm:self-auto">
          <span className="rounded-lg border border-border bg-card px-3 py-1.5 font-mono text-[11px] shadow-2xs">
            Admin ID: {profile.id}
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. PROFILE OVERVIEW CARD & READ-ONLY METRICS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Profile Card (Overview) */}
        <Card className="lg:col-span-4 rounded-2xl border-border/70 bg-card shadow-xs flex flex-col justify-between overflow-hidden">
          <div className="p-6 text-center space-y-4">
            {/* Avatar with Upload Control */}
            <div className="relative size-24 sm:size-28 mx-auto group">
              <div className="size-full rounded-full overflow-hidden border-2 border-brand-blue/30 bg-muted/60 shadow-sm flex items-center justify-center">
                {profile.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profile.avatarUrl}
                    alt={profile.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserCircle className="size-16 sm:size-20 text-brand-blue/60" />
                )}
                {isUploadingAvatar ? (
                  <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center text-white text-xs gap-1">
                    <Loader2 className="size-4 animate-spin" />
                  </div>
                ) : null}
              </div>

              {/* Upload Trigger Button */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                className="hidden"
                onChange={handleAvatarUpload}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingAvatar}
                className="absolute bottom-0 right-0 p-2 rounded-full bg-brand-blue hover:bg-brand-blue-dark text-white shadow-md transition-transform hover:scale-105"
                title="Upload or Change Photo"
              >
                <Camera className="size-3.5" />
              </button>
            </div>

            {/* Name, Email, Status */}
            <div className="space-y-1">
              <h2 className="text-base sm:text-lg font-bold text-navy dark:text-foreground">
                {profile.fullName}
              </h2>
              <p className="text-xs text-muted-foreground font-mono">{profile.email}</p>
              <div className="pt-1.5 flex flex-wrap items-center justify-center gap-1.5">
                <Badge className="bg-brand-blue text-white text-[10px] font-bold px-2.5 py-0.5">
                  Role: {profile.role}
                </Badge>
                <Badge className="bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5">
                  Status: {profile.accountStatus}
                </Badge>
              </div>
            </div>

            {/* Avatar Actions */}
            <div className="flex items-center justify-center gap-2 pt-2 border-t border-border/50">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="h-7 text-[11px] font-semibold text-brand-blue border-brand-blue/30 hover:bg-brand-blue/5 gap-1"
              >
                <Upload className="size-3" />
                {profile.avatarUrl ? "Change Photo" : "Upload Photo"}
              </Button>
              {profile.avatarUrl ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveAvatar}
                  className="h-7 text-[11px] text-brand-red hover:bg-red-50 hover:text-brand-red px-2"
                >
                  <Trash2 className="size-3 mr-1" />
                  Remove
                </Button>
              ) : null}
            </div>
          </div>

          <div className="p-4 bg-muted/20 border-t border-border/60">
            <Button
              type="button"
              onClick={scrollToForm}
              variant="outline"
              size="sm"
              className="w-full h-8 text-xs font-semibold text-navy dark:text-foreground"
            >
              Edit Personal Info
            </Button>
          </div>
        </Card>

        {/* Account Information Card (Read-Only) */}
        <Card className="lg:col-span-8 rounded-2xl border-border/70 bg-card shadow-xs flex flex-col justify-between">
          <CardHeader className="p-6 pb-4 border-b border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-navy dark:text-foreground flex items-center gap-2">
                  <ShieldCheck className="size-4 text-brand-blue" />
                  Account Specifications &amp; Credentials
                </CardTitle>
                <CardDescription className="text-xs mt-0.5">
                  Core administrative account details and audit metadata.
                </CardDescription>
              </div>
              <Badge variant="outline" className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 border-emerald-300">
                Active &amp; Verified
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6 text-xs flex-1 flex flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-xl border border-border/70 bg-muted/20 space-y-1">
                <span className="text-[10px] uppercase font-bold text-muted-foreground block">Account Role</span>
                <span className="font-bold text-navy dark:text-foreground text-xs block">{profile.role} (Full Access)</span>
                <span className="text-[10px] text-muted-foreground">Admin Desk &amp; Inquiries</span>
              </div>

              <div className="p-3.5 rounded-xl border border-border/70 bg-muted/20 space-y-1">
                <span className="text-[10px] uppercase font-bold text-muted-foreground block">Account Status</span>
                <span className="font-bold text-emerald-600 text-xs flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  {profile.accountStatus}
                </span>
                <span className="text-[10px] text-muted-foreground">Authenticated session</span>
              </div>

              <div className="p-3.5 rounded-xl border border-border/70 bg-muted/20 space-y-1">
                <span className="text-[10px] uppercase font-bold text-muted-foreground block">Organization</span>
                <span className="font-bold text-navy dark:text-foreground text-xs block">Miracle International</span>
                <span className="text-[10px] text-muted-foreground">Global Travel &amp; Trade</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ========================================================================= */}
      {/* 3. PERSONAL INFORMATION FORM */}
      {/* ========================================================================= */}
      <div ref={formRef}>
        <Card className="rounded-2xl border-border/70 bg-card shadow-xs">
          <CardHeader className="p-6 pb-4 border-b border-border/50">
            <div className="flex items-center gap-2.5">
              <div className="flex size-7 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
                <User className="size-4" />
              </div>
              <div>
                <CardTitle className="text-base font-bold text-navy dark:text-foreground">
                  Personal Information
                </CardTitle>
                <CardDescription className="text-xs">
                  Update your display name, contact phone, WhatsApp, and administrative role title.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSaveProfile} className="space-y-6">
              {profileError ? (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-brand-red flex items-center gap-2">
                  <AlertCircle className="size-4 shrink-0" />
                  <span>{profileError}</span>
                </div>
              ) : null}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="prof-name" className="text-xs font-semibold">
                    Full Name <span className="text-brand-red">*</span>
                  </Label>
                  <Input
                    id="prof-name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="h-9.5 text-xs bg-background font-medium"
                    required
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <Label htmlFor="prof-email" className="text-xs font-semibold">
                    Email Address <span className="text-brand-red">*</span>
                  </Label>
                  <Input
                    id="prof-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-9.5 text-xs bg-background font-medium"
                    required
                  />
                </div>

                {/* Job Title / Role */}
                <div className="space-y-1.5">
                  <Label htmlFor="prof-title" className="text-xs font-semibold">
                    Job Title / Role
                  </Label>
                  <Input
                    id="prof-title"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    className="h-9.5 text-xs bg-background"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <Label htmlFor="prof-phone" className="text-xs font-semibold">
                    Phone Number
                  </Label>
                  <Input
                    id="prof-phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+94 11 234 5678"
                    className="h-9.5 text-xs bg-background font-mono"
                  />
                </div>

                {/* WhatsApp Number */}
                <div className="space-y-1.5">
                  <Label htmlFor="prof-whatsapp" className="text-xs font-semibold">
                    WhatsApp Number
                  </Label>
                  <Input
                    id="prof-whatsapp"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    placeholder="+94 77 123 4567"
                    className="h-9.5 text-xs bg-background font-mono"
                  />
                </div>

                {/* Country */}
                <div className="space-y-1.5">
                  <Label htmlFor="prof-country" className="text-xs font-semibold">
                    Country / Region
                  </Label>
                  <Input
                    id="prof-country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="Sri Lanka"
                    className="h-9.5 text-xs bg-background"
                  />
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-border/60">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCancelProfile}
                  className="h-9 text-xs font-medium"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSavingProfile}
                  className="h-9 px-4 bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-semibold gap-1.5 rounded-xl shadow-xs"
                >
                  {isSavingProfile ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    <Save className="size-3.5" />
                  )}
                  <span>Save Changes</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* ========================================================================= */}
      {/* 4. SECURITY & CHANGE PASSWORD SECTION */}
      {/* ========================================================================= */}
      <Card className="rounded-2xl border-border/70 bg-card shadow-xs">
        <CardHeader className="p-6 pb-4 border-b border-border/50">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
              <KeyRound className="size-4" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-navy dark:text-foreground">
                Security &amp; Password
              </CardTitle>
              <CardDescription className="text-xs">
                Update your account password securely.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleChangePassword} className="space-y-5 max-w-2xl">
            {passwordError ? (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-brand-red flex items-center gap-2">
                <AlertCircle className="size-4 shrink-0" />
                <span>{passwordError}</span>
              </div>
            ) : null}

            {/* Current Password */}
            <div className="space-y-1.5">
              <Label htmlFor="curr-pw" className="text-xs font-semibold">
                Current Password <span className="text-brand-red">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="curr-pw"
                  type={showCurrentPw ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="h-9.5 text-xs bg-background pr-9"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPw(!showCurrentPw)}
                  className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
                >
                  {showCurrentPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {/* New Password & Confirm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="new-pw" className="text-xs font-semibold">
                  New Password <span className="text-brand-red">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="new-pw"
                    type={showNewPw ? "text" : "password"}
                    placeholder="Min 6 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="h-9.5 text-xs bg-background pr-9"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPw(!showNewPw)}
                    className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
                  >
                    {showNewPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirm-pw" className="text-xs font-semibold">
                  Confirm New Password <span className="text-brand-red">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="confirm-pw"
                    type={showConfirmPw ? "text" : "password"}
                    placeholder="Repeat new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-9.5 text-xs bg-background pr-9"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPw(!showConfirmPw)}
                    className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Password Buttons */}
            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-border/60">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCancelPassword}
                className="h-9 text-xs font-medium"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isChangingPassword}
                className="h-9 px-4 bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-semibold gap-1.5 rounded-xl shadow-xs"
              >
                {isChangingPassword ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <KeyRound className="size-3.5" />
                )}
                <span>Change Password</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
