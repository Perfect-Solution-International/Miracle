"use client";

import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck2,
  FileEdit,
  Globe2,
  Inbox,
  Layers,
  MapPin,
  MessageSquare,
  Palmtree,
  Plane,
  Plus,
  Send,
  Sparkles,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminStatCard } from "./admin-stat-card";
import { AdminInquiryDetailsDialog } from "@/components/admin-inquiries/admin-inquiry-details-dialog";
import { useTravelStore } from "@/lib/storage/travel-store";
import type { InquiryStatus, TravelInquiry } from "@/components/admin-travel/types";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";

type TimePeriod = "week" | "month" | "year";

interface AdminDashboardViewProps {
  adminEmail?: string;
  adminName?: string;
}

export function AdminDashboardView({
  adminEmail = "admin@miracleinternational.com",
  adminName = "Administrator",
}: AdminDashboardViewProps) {
  const { inquiries, inboundPackages, outboundPackages, updateInquiryStatus, addInquiryReply } =
    useTravelStore();

  const [timePeriod, setTimePeriod] = useState<TimePeriod>("month");
  const [selectedInquiry, setSelectedInquiry] = useState<TravelInquiry | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  // Time filter date boundary helper
  const filteredInquiries = useMemo(() => {
    const now = new Date();
    return inquiries.filter((inq) => {
      if (!inq.submittedDate) return true;
      const itemDate = new Date(inq.submittedDate);
      if (isNaN(itemDate.getTime())) return true;

      if (timePeriod === "week") {
        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(now.getDate() - 7);
        return itemDate >= oneWeekAgo;
      }
      if (timePeriod === "month") {
        const oneMonthAgo = new Date(now);
        oneMonthAgo.setDate(now.getDate() - 30);
        return itemDate >= oneMonthAgo;
      }
      if (timePeriod === "year") {
        const oneYearAgo = new Date(now);
        oneYearAgo.setFullYear(now.getFullYear() - 1);
        return itemDate >= oneYearAgo;
      }
      return true;
    });
  }, [inquiries, timePeriod]);

  // Primary Overview Metrics (Real Data Only)
  const totalInquiriesCount = filteredInquiries.length;
  const newInquiriesCount = filteredInquiries.filter((i) => i.status === "New").length;
  const inProgressCount = filteredInquiries.filter(
    (i) => i.status === "In Progress" || i.status === "Reviewing"
  ).length;
  const completedCount = filteredInquiries.filter(
    (i) => i.status === "Completed" || i.status === "Replied"
  ).length;

  // Package Overview Metrics (Real Data Only)
  const activeInboundCount = inboundPackages.filter((p) => p.status === "Active").length;
  const activeOutboundCount = outboundPackages.filter((p) => p.status === "Active").length;

  // Status breakdown metrics
  const statusCounts = useMemo(() => {
    return {
      New: inquiries.filter((i) => i.status === "New").length,
      Reviewing: inquiries.filter((i) => i.status === "Reviewing").length,
      Replied: inquiries.filter((i) => i.status === "Replied").length,
      "In Progress": inquiries.filter((i) => i.status === "In Progress").length,
      Completed: inquiries.filter((i) => i.status === "Completed").length,
      Cancelled: inquiries.filter((i) => i.status === "Cancelled").length,
    };
  }, [inquiries]);

  // Inquiry Category Breakdown (Real Data Only)
  const categoryBreakdown = useMemo(() => {
    const categories: Record<string, number> = {
      "Inbound Tour": 0,
      "Outbound Tour": 0,
      "Customize Trip": 0,
      "Flight Tickets": 0,
      "Visa Services": 0,
      "Work Visa": 0,
      "Import & Export": 0,
      "Trading & Sourcing": 0,
      "Business Solutions": 0,
      "General Inquiry": 0,
    };

    inquiries.forEach((inq) => {
      const type = inq.inquiryType || "General Inquiry";
      if (categories[type] !== undefined) {
        categories[type] += 1;
      } else {
        categories["General Inquiry"] = (categories["General Inquiry"] || 0) + 1;
      }
    });

    const total = inquiries.length;
    return Object.entries(categories)
      .map(([label, count]) => ({
        label,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0,
      }))
      .filter((item) => item.count > 0 || total === 0)
      .sort((a, b) => b.count - a.count);
  }, [inquiries]);

  // Dynamic Chart Points (Real Data Only)
  const chartData = useMemo(() => {
    if (timePeriod === "week") {
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const counts: number[] = [0, 0, 0, 0, 0, 0, 0];

      filteredInquiries.forEach((inq) => {
        if (!inq.submittedDate) return;
        const d = new Date(inq.submittedDate);
        if (!isNaN(d.getTime())) {
          const dayIdx = (d.getDay() + 6) % 7;
          if (dayIdx >= 0 && dayIdx < 7) {
            counts[dayIdx] = (counts[dayIdx] ?? 0) + 1;
          }
        }
      });

      return days.map((label, i) => ({ label, count: counts[i] ?? 0 }));
    }

    if (timePeriod === "month") {
      const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];
      const counts: number[] = [0, 0, 0, 0];

      filteredInquiries.forEach((inq) => {
        if (!inq.submittedDate) return;
        const d = new Date(inq.submittedDate);
        if (!isNaN(d.getTime())) {
          const dateNum = d.getDate();
          const wIdx = Math.min(Math.floor((dateNum - 1) / 7), 3);
          counts[wIdx] = (counts[wIdx] ?? 0) + 1;
        }
      });

      return weeks.map((label, i) => ({ label, count: counts[i] ?? 0 }));
    }

    // "year"
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const counts: number[] = new Array(12).fill(0);

    filteredInquiries.forEach((inq) => {
      if (!inq.submittedDate) return;
      const d = new Date(inq.submittedDate);
      if (!isNaN(d.getTime())) {
        const mIdx = d.getMonth();
        if (mIdx >= 0 && mIdx < 12) {
          counts[mIdx] = (counts[mIdx] ?? 0) + 1;
        }
      }
    });

    return months.map((label, i) => ({ label, count: counts[i] ?? 0 }));
  }, [filteredInquiries, timePeriod]);

  const maxChartCount = Math.max(...chartData.map((d) => d.count), 1);

  // Recent Inquiries (Latest 6)
  const recentInquiries = useMemo(() => {
    return [...inquiries]
      .sort((a, b) => new Date(b.submittedDate || "").getTime() - new Date(a.submittedDate || "").getTime())
      .slice(0, 6);
  }, [inquiries]);

  const handleOpenInquiry = (inq: TravelInquiry) => {
    setSelectedInquiry(inq);
    setInquiryModalOpen(true);
  };

  const handleStatusChange = (id: string, newStatus: InquiryStatus) => {
    updateInquiryStatus(id, newStatus);
    toast.success(`Inquiry status updated to "${newStatus}".`);
  };

  const handleSendReply = (
    id: string,
    reply: {
      sender: string;
      senderEmail: string;
      recipientEmail: string;
      subject: string;
      message: string;
    }
  ) => {
    addInquiryReply(id, reply);
    toast.success(`Reply sent to ${reply.recipientEmail}.`);
  };

  return (
    <div className="space-y-8 pb-14">
      {/* ── 1. Dashboard Header Banner ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-navy">
              Executive Dashboard
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-600 border border-blue-200/70 shadow-2xs">
              <span className="size-1.5 rounded-full bg-blue-600 animate-pulse" />
              Live Operations
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Welcome back, {adminName}. Here is the real-time operational summary of customer inquiries and active tours.
          </p>
        </div>

        {/* Time Period Filter Pills */}
        <div className="inline-flex items-center rounded-xl border border-slate-200/80 bg-slate-50/80 p-1 shadow-2xs">
          {(["week", "month", "year"] as TimePeriod[]).map((period) => (
            <button
              key={period}
              type="button"
              onClick={() => setTimePeriod(period)}
              className={cn(
                "rounded-lg px-3.5 py-1.5 text-xs font-bold capitalize transition-all duration-200",
                timePeriod === period
                  ? "bg-white text-blue-600 shadow-2xs font-bold border border-slate-200/60"
                  : "text-slate-600 hover:text-slate-900",
              )}
            >
              {period === "week" ? "Last 7 Days" : period === "month" ? "Last 30 Days" : "This Year"}
            </button>
          ))}
        </div>
      </div>

      {/* ── 2. Primary Metric Cards (Soft-Glass Cards) ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <AdminStatCard
          label="Total Inquiries"
          value={totalInquiriesCount}
          icon={MessageSquare}
          hint="All client submissions"
          accentColor="blue"
        />
        <AdminStatCard
          label="New Inquiries"
          value={newInquiriesCount}
          icon={Inbox}
          highlight={newInquiriesCount > 0}
          hint={newInquiriesCount > 0 ? "Awaiting review" : "All cleared"}
          accentColor="red"
        />
        <AdminStatCard
          label="In Progress"
          value={inProgressCount}
          icon={Clock}
          hint="Under active processing"
          accentColor="amber"
        />
        <AdminStatCard
          label="Completed Inquiries"
          value={completedCount}
          icon={CheckCircle2}
          hint="Fulfilled & replied"
          accentColor="emerald"
        />
        <AdminStatCard
          label="Active Inbound"
          value={activeInboundCount}
          icon={Palmtree}
          hint="Published Sri Lanka packages"
          accentColor="blue"
        />
        <AdminStatCard
          label="Active Outbound"
          value={activeOutboundCount}
          icon={Globe2}
          hint="Published outbound packages"
          accentColor="navy"
        />
      </div>

      {/* ── 3. Charts & Analytics Grid ── */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Inquiry Volume Bar Chart */}
        <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-2xs backdrop-blur-xs lg:col-span-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-navy flex items-center gap-2">
                  <BarChart3 className="size-4.5 text-blue-600" aria-hidden="true" />
                  Inquiry Volume &amp; Activity
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">
                  Trend distribution over the selected period ({timePeriod === "week" ? "Daily" : timePeriod === "month" ? "Weekly" : "Monthly"})
                </p>
              </div>
              <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                Max: {maxChartCount} inquiries
              </span>
            </div>

            {/* Visual Bar Graph */}
            <div className="mt-8 grid grid-cols-4 sm:grid-flow-col gap-2 sm:gap-3 items-end h-52 pt-4 px-2">
              {chartData.map((item) => {
                const heightPct = Math.max(Math.round((item.count / maxChartCount) * 100), 8);
                return (
                  <div key={item.label} className="flex flex-col items-center gap-2 group">
                    <span className="text-[11px] font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.count}
                    </span>
                    <div className="w-full max-w-[48px] bg-slate-100/90 rounded-xl h-40 flex items-end p-1 shadow-inner">
                      <div
                        style={{ height: `${heightPct}%` }}
                        className={cn(
                          "w-full rounded-lg transition-all duration-500",
                          item.count > 0
                            ? "bg-gradient-to-t from-blue-600 to-blue-500 group-hover:from-blue-700 group-hover:to-blue-600 shadow-sm"
                            : "bg-slate-200/60"
                        )}
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-500 truncate max-w-[60px]">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-3 flex items-center justify-between text-xs text-slate-500">
            <span>Aggregated from real customer requirements</span>
            <Link href={ROUTES.admin.inquiries} className="font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1">
              View all inquiries <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>

        {/* Category Breakdown Card */}
        <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-2xs backdrop-blur-xs lg:col-span-4 flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-base font-bold text-navy flex items-center gap-2">
                <Layers className="size-4.5 text-blue-600" aria-hidden="true" />
                Inquiries by Category
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                Distribution across service areas
              </p>
            </div>

            <div className="mt-5 space-y-3.5">
              {categoryBreakdown.slice(0, 5).map(({ label, count, percentage }) => (
                <div key={label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-700 truncate max-w-[180px]">{label}</span>
                    <span className="text-navy">{count} <span className="text-slate-400 font-normal">({percentage}%)</span></span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      style={{ width: `${percentage}%` }}
                      className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-3 text-xs text-slate-500 flex justify-between">
            <span>Total Categories: {categoryBreakdown.length}</span>
            <span className="font-bold text-navy">100% Real-Time</span>
          </div>
        </div>
      </div>

      {/* ── 4. Recent Inquiries Table ── */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-2xs overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 p-5 sm:px-6">
          <div>
            <h3 className="text-base font-bold text-navy flex items-center gap-2">
              <MessageSquare className="size-4.5 text-blue-600" aria-hidden="true" />
              Recent Customer Inquiries
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Latest requirement submissions awaiting action
            </p>
          </div>
          <Button asChild size="sm" variant="outline" className="rounded-xl text-xs font-bold border-slate-200 hover:bg-slate-50">
            <Link href={ROUTES.admin.inquiries}>
              View All Inquiries
              <ArrowRight className="size-3.5 ml-1.5" />
            </Link>
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5">Customer / Contact</th>
                <th className="px-6 py-3.5">Category &amp; Subject</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentInquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                    No inquiries recorded yet.
                  </td>
                </tr>
              ) : (
                recentInquiries.map((inq) => {
                  const statusStyles =
                    inq.status === "New"
                      ? "bg-red-50 text-brand-red border-red-200/70"
                      : inq.status === "In Progress" || inq.status === "Reviewing"
                        ? "bg-blue-50 text-blue-700 border-blue-200/70"
                        : inq.status === "Completed" || inq.status === "Replied"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200/70"
                          : "bg-slate-100 text-slate-700 border-slate-200";

                  return (
                    <tr
                      key={inq.id}
                      className="transition-colors hover:bg-slate-50/60"
                    >
                      <td className="px-6 py-4">
                        <p className="font-bold text-navy text-sm">{inq.customerName}</p>
                        <p className="text-xs text-slate-500">{inq.customerEmail || inq.customerPhone || "—"}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-800 text-xs sm:text-sm">{inq.inquiryType}</p>
                        <p className="text-xs text-slate-500 truncate max-w-[240px]">
                          {inq.destination || inq.packageName || inq.additionalRequirements || inq.referenceNumber}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border shadow-2xs", statusStyles)}>
                          {inq.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-500">
                        {inq.submittedDate ? new Date(inq.submittedDate).toLocaleDateString() : "Recently"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleOpenInquiry(inq)}
                          className="rounded-lg text-xs font-bold text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── 5. Inquiry Details Modal ── */}
      {selectedInquiry && (
        <AdminInquiryDetailsDialog
          inquiry={selectedInquiry}
          open={inquiryModalOpen}
          onOpenChange={setInquiryModalOpen}
          onUpdateStatus={handleStatusChange}
          onSendReply={handleSendReply}
        />
      )}
    </div>
  );
}
