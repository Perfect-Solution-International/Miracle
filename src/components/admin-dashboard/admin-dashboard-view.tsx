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
  const draftInboundCount = inboundPackages.filter((p) => p.status === "Draft").length;
  const inactiveInboundCount = inboundPackages.filter((p) => p.status === "Inactive").length;

  const activeOutboundCount = outboundPackages.filter((p) => p.status === "Active").length;
  const draftOutboundCount = outboundPackages.filter((p) => p.status === "Draft").length;
  const inactiveOutboundCount = outboundPackages.filter((p) => p.status === "Inactive").length;

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
          // JS getDay(): 0 is Sun, 1 is Mon
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

  const peakItem = useMemo(() => {
    if (chartData.length === 0) return null;
    return chartData.reduce((prev, curr) => (curr.count > prev.count ? curr : prev), chartData[0]!);
  }, [chartData]);

  // Recent Inquiries (Latest 6)
  const recentInquiries = useMemo(() => {
    return [...inquiries]
      .sort((a, b) => new Date(b.submittedDate || "").getTime() - new Date(a.submittedDate || "").getTime())
      .slice(0, 6);
  }, [inquiries]);

  // Recent System Activity Events (Derived from real actions)
  const recentActivities = useMemo(() => {
    const list: { id: string; type: string; title: string; subtitle: string; date: string; icon: any }[] = [];

    inquiries.slice(0, 5).forEach((inq) => {
      list.push({
        id: `act-inq-${inq.id}`,
        type: "inquiry",
        title: `New inquiry from ${inq.customerName}`,
        subtitle: `${inq.inquiryType} • ${inq.destination || inq.packageName || inq.referenceNumber}`,
        date: inq.submittedDate,
        icon: MessageSquare,
      });
    });

    inboundPackages.slice(0, 3).forEach((pkg) => {
      list.push({
        id: `act-pkg-${pkg.id}`,
        type: "package",
        title: `Inbound package "${pkg.name}"`,
        subtitle: `Status: ${pkg.status} • Destination: ${pkg.destination}`,
        date: pkg.updatedAt || pkg.createdAt || "Recently",
        icon: Palmtree,
      });
    });

    outboundPackages.slice(0, 3).forEach((pkg) => {
      list.push({
        id: `act-out-${pkg.id}`,
        type: "package",
        title: `Outbound package "${pkg.name}"`,
        subtitle: `Status: ${pkg.status} • Country: ${pkg.country || pkg.destination}`,
        date: pkg.updatedAt || pkg.createdAt || "Recently",
        icon: Globe2,
      });
    });

    return list.slice(0, 7);
  }, [inquiries, inboundPackages, outboundPackages]);

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
      {/* ========================================================================= */}
      {/* 1. DASHBOARD HEADER */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-heading text-2xl font-bold tracking-tight text-navy dark:text-foreground">
              Dashboard
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-brand-blue border border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900">
              <span className="size-1.5 rounded-full bg-brand-blue animate-pulse" />
              Private Admin Portal
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 max-w-2xl leading-relaxed">
            Overview of inquiries, tour packages and recent activity across Miracle International.
          </p>
        </div>

        {/* Time Period Filter */}
        <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-xl border border-border/70 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setTimePeriod("week")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              timePeriod === "week"
                ? "bg-card text-brand-blue shadow-xs border border-border"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            This Week
          </button>
          <button
            type="button"
            onClick={() => setTimePeriod("month")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              timePeriod === "month"
                ? "bg-card text-brand-blue shadow-xs border border-border"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            This Month
          </button>
          <button
            type="button"
            onClick={() => setTimePeriod("year")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              timePeriod === "year"
                ? "bg-card text-brand-blue shadow-xs border border-border"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            This Year
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. OVERVIEW CARDS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Total Inquiries */}
        <AdminStatCard
          label="Total Inquiries"
          value={String(totalInquiriesCount)}
          icon={MessageSquare}
          hint={`Inquiries during ${timePeriod === "week" ? "this week" : timePeriod === "month" ? "this month" : "this year"}`}
          accentColor="blue"
        />

        {/* New Inquiries */}
        <AdminStatCard
          label="New Inquiries"
          value={String(newInquiriesCount)}
          icon={Clock}
          hint={newInquiriesCount > 0 ? "Awaiting first response" : "All inquiries reviewed"}
          highlight={newInquiriesCount > 0}
          accentColor="red"
        />

        {/* In Progress */}
        <AdminStatCard
          label="In Progress"
          value={String(inProgressCount)}
          icon={Layers}
          hint="Under active processing"
          accentColor="blue"
        />

        {/* Completed Inquiries */}
        <AdminStatCard
          label="Completed"
          value={String(completedCount)}
          icon={CheckCircle2}
          hint="Replied or finalized"
          accentColor="navy"
        />

        {/* Active Inbound Packages */}
        <AdminStatCard
          label="Active Inbound"
          value={String(activeInboundCount)}
          icon={Palmtree}
          hint="Sri Lanka packages live"
          accentColor="blue"
        />

        {/* Active Outbound Packages */}
        <AdminStatCard
          label="Active Outbound"
          value={String(activeOutboundCount)}
          icon={Globe2}
          hint="International packages live"
          accentColor="navy"
        />
      </div>

      {/* ========================================================================= */}
      {/* 3. CHARTS ROW: INQUIRY ACTIVITY & INQUIRY TYPE BREAKDOWN */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Inquiry Activity Chart (7 Cols) */}
        <Card className="lg:col-span-7 rounded-2xl border-border/70 bg-card shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-border/50">
            <div>
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-navy dark:text-foreground flex items-center gap-2">
                <BarChart3 className="size-4 text-brand-blue" />
                Inquiry Activity
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Customer inquiries received during {timePeriod === "week" ? "this week" : timePeriod === "month" ? "this month" : "this year"}.
              </p>
            </div>
            <span className="text-xs font-bold text-navy dark:text-foreground bg-muted/60 px-2.5 py-1 rounded-lg">
              {filteredInquiries.length} total
            </span>
          </CardHeader>
          <CardContent className="p-6">
            {filteredInquiries.length === 0 ? (
              <div className="h-56 flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
                <Inbox className="size-8 text-muted-foreground/50 mb-2" />
                <p className="text-sm font-semibold text-navy dark:text-foreground">No inquiry activity yet.</p>
                <p className="text-xs text-muted-foreground max-w-xs mt-1">
                  Inquiry activity will appear here when customers submit requests through the website.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* SVG Bar Chart Visualization */}
                <div className="h-52 flex items-end gap-2 sm:gap-3 pt-6 pb-2 border-b border-border/60">
                  {chartData.map((item, idx) => {
                    const heightPercent =
                      maxChartCount > 0 && item.count > 0
                        ? Math.max(Math.round((item.count / maxChartCount) * 100), 12)
                        : 4;

                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                        <span className="text-[10px] font-bold text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity">
                          {item.count}
                        </span>
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full max-w-[36px] rounded-t-lg transition-all duration-300 ${
                            item.count > 0
                              ? "bg-brand-blue hover:bg-brand-blue-dark group-hover:shadow-sm"
                              : "bg-muted/60"
                          }`}
                        />
                        <span className="text-[11px] font-medium text-muted-foreground truncate max-w-full">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                  <span>Real inquiry submissions timeline</span>
                  <span className="font-semibold text-navy dark:text-foreground">
                    Peak period: {peakItem?.label || "—"} ({peakItem?.count || 0} requests)
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Inquiry Type Breakdown (5 Cols) */}
        <Card className="lg:col-span-5 rounded-2xl border-border/70 bg-card shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-border/50">
            <div>
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-navy dark:text-foreground flex items-center gap-2">
                <TrendingUp className="size-4 text-brand-blue" />
                Inquiry Type Breakdown
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Distribution of customer requests by service category.
              </p>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {inquiries.length === 0 ? (
              <div className="h-56 flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
                <Inbox className="size-8 text-muted-foreground/50 mb-2" />
                <p className="text-sm font-semibold text-navy dark:text-foreground">No inquiry data available.</p>
                <p className="text-xs text-muted-foreground max-w-xs mt-1">
                  Category distribution will calculate automatically as inquiries arrive.
                </p>
              </div>
            ) : (
              <div className="space-y-3.5 max-h-[260px] overflow-y-auto pr-1">
                {categoryBreakdown.map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-navy dark:text-foreground font-semibold">{item.label}</span>
                      <span className="text-muted-foreground font-mono">
                        {item.count} ({item.percentage}%)
                      </span>
                    </div>
                    <div className="h-2 w-full bg-muted/60 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${item.percentage}%` }}
                        className="h-full bg-brand-blue rounded-full transition-all duration-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ========================================================================= */}
      {/* 4. INQUIRY PROGRESS (STATUS OVERVIEW) */}
      {/* ========================================================================= */}
      <Card className="rounded-2xl border-border/70 bg-card shadow-xs">
        <CardHeader className="pb-3 border-b border-border/50">
          <CardTitle className="text-sm font-bold uppercase tracking-wider text-navy dark:text-foreground flex items-center gap-2">
            <Activity className="size-4 text-brand-blue" />
            Inquiry Progress
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">
            Real-time status breakdown across all customer travel and business inquiries.
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* New */}
            <div className="p-3.5 rounded-xl border border-emerald-200/80 bg-emerald-50/40 dark:bg-emerald-950/20 dark:border-emerald-900/40">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase">New</span>
                <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <p className="text-2xl font-extrabold text-emerald-900 dark:text-emerald-200 mt-1 font-heading">
                {statusCounts.New}
              </p>
              <p className="text-[10px] text-emerald-700 dark:text-emerald-400 mt-0.5">Awaiting initial review</p>
            </div>

            {/* Reviewing */}
            <div className="p-3.5 rounded-xl border border-amber-200/80 bg-amber-50/40 dark:bg-amber-950/20 dark:border-amber-900/40">
              <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 uppercase">Reviewing</span>
              <p className="text-2xl font-extrabold text-amber-900 dark:text-amber-200 mt-1 font-heading">
                {statusCounts.Reviewing}
              </p>
              <p className="text-[10px] text-amber-700 dark:text-amber-400 mt-0.5">Under assessment</p>
            </div>

            {/* Replied */}
            <div className="p-3.5 rounded-xl border border-sky-200/80 bg-sky-50/40 dark:bg-sky-950/20 dark:border-sky-900/40">
              <span className="text-[11px] font-bold text-sky-800 dark:text-sky-300 uppercase">Replied</span>
              <p className="text-2xl font-extrabold text-sky-900 dark:text-sky-200 mt-1 font-heading">
                {statusCounts.Replied}
              </p>
              <p className="text-[10px] text-sky-700 dark:text-sky-400 mt-0.5">Quote / details sent</p>
            </div>

            {/* In Progress */}
            <div className="p-3.5 rounded-xl border border-blue-200/80 bg-blue-50/40 dark:bg-blue-950/20 dark:border-blue-900/40">
              <span className="text-[11px] font-bold text-blue-800 dark:text-blue-300 uppercase">In Progress</span>
              <p className="text-2xl font-extrabold text-blue-900 dark:text-blue-200 mt-1 font-heading">
                {statusCounts["In Progress"]}
              </p>
              <p className="text-[10px] text-blue-700 dark:text-blue-400 mt-0.5">Active coordination</p>
            </div>

            {/* Completed */}
            <div className="p-3.5 rounded-xl border border-emerald-200/80 bg-emerald-50/40 dark:bg-emerald-950/20 dark:border-emerald-900/40">
              <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase">Completed</span>
              <p className="text-2xl font-extrabold text-emerald-900 dark:text-emerald-200 mt-1 font-heading">
                {statusCounts.Completed}
              </p>
              <p className="text-[10px] text-emerald-700 dark:text-emerald-400 mt-0.5">Successfully finalized</p>
            </div>

            {/* Cancelled */}
            <div className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/40 dark:bg-slate-900/20 dark:border-slate-800">
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase">Cancelled</span>
              <p className="text-2xl font-extrabold text-slate-800 dark:text-slate-200 mt-1 font-heading">
                {statusCounts.Cancelled}
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">Closed / inactive</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ========================================================================= */}
      {/* 5. MAIN CONTENT ROW: RECENT INQUIRIES & TOUR PACKAGES OVERVIEW */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Inquiries Table (8 Cols) */}
        <Card className="lg:col-span-8 rounded-2xl border-border/70 bg-card shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-border/50">
            <div>
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-navy dark:text-foreground">
                Recent Inquiries
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Latest customer travel and business inquiries received.
              </p>
            </div>

            <Link href={ROUTES.admin.inquiries}>
              <Button variant="ghost" size="sm" className="h-8 text-xs font-semibold text-brand-blue gap-1 hover:bg-brand-blue/5">
                <span>View All Inquiries</span>
                <ArrowRight className="size-3.5" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            {recentInquiries.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                <Inbox className="size-8 text-muted-foreground/50 mx-auto mb-2" />
                <p className="text-sm font-semibold text-navy dark:text-foreground">No inquiries yet.</p>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto mt-1">
                  Customer inquiries will appear here when submitted through the website.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-muted/30 border-b border-border/60">
                    <tr>
                      <th className="py-2.5 pl-6 text-left font-bold uppercase tracking-wider text-muted-foreground text-[10px]">
                        Customer
                      </th>
                      <th className="py-2.5 px-3 text-left font-bold uppercase tracking-wider text-muted-foreground text-[10px]">
                        Inquiry Type
                      </th>
                      <th className="py-2.5 px-3 text-left font-bold uppercase tracking-wider text-muted-foreground text-[10px]">
                        Service / Package
                      </th>
                      <th className="py-2.5 px-3 text-left font-bold uppercase tracking-wider text-muted-foreground text-[10px]">
                        Date
                      </th>
                      <th className="py-2.5 px-3 text-left font-bold uppercase tracking-wider text-muted-foreground text-[10px]">
                        Status
                      </th>
                      <th className="py-2.5 pr-6 text-right font-bold uppercase tracking-wider text-muted-foreground text-[10px]">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {recentInquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-muted/20 transition-colors">
                        <td className="py-3 pl-6">
                          <p className="font-bold text-navy dark:text-foreground">{inq.customerName}</p>
                          <p className="text-[11px] text-muted-foreground truncate max-w-[150px]">
                            {inq.customerEmail}
                          </p>
                        </td>
                        <td className="py-3 px-3">
                          <Badge variant="outline" className="text-[10px] font-semibold">
                            {inq.inquiryType}
                          </Badge>
                        </td>
                        <td className="py-3 px-3 max-w-[180px]">
                          <p className="font-medium text-foreground truncate">
                            {inq.packageName || inq.destination || inq.referenceNumber}
                          </p>
                          {inq.country ? (
                            <span className="text-[10px] text-muted-foreground block">{inq.country}</span>
                          ) : null}
                        </td>
                        <td className="py-3 px-3 text-muted-foreground whitespace-nowrap font-mono text-[11px]">
                          {inq.submittedDate}
                        </td>
                        <td className="py-3 px-3">
                          <Badge
                            className={
                              inq.status === "New"
                                ? "bg-emerald-600 text-white text-[10px]"
                                : inq.status === "Replied"
                                  ? "bg-sky-600 text-white text-[10px]"
                                  : inq.status === "Completed"
                                    ? "bg-emerald-700 text-white text-[10px]"
                                    : "bg-slate-600 text-white text-[10px]"
                            }
                          >
                            {inq.status}
                          </Badge>
                        </td>
                        <td className="py-3 pr-6 text-right">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleOpenInquiry(inq)}
                            className="h-7 text-xs font-semibold px-2.5 text-brand-blue border-brand-blue/30 hover:bg-brand-blue/5"
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tour Package Overview (4 Cols) */}
        <Card className="lg:col-span-4 rounded-2xl border-border/70 bg-card shadow-xs flex flex-col">
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-navy dark:text-foreground flex items-center gap-2">
              <Compass className="size-4 text-brand-blue" />
              Tour Packages
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Live status across Sri Lanka &amp; International packages.
            </p>
          </CardHeader>
          <CardContent className="p-5 space-y-4 flex-1 flex flex-col justify-between">
            {/* Inbound Block */}
            <div className="p-4 rounded-xl border border-border/70 bg-muted/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-navy dark:text-foreground flex items-center gap-1.5">
                  <Palmtree className="size-4 text-emerald-600" />
                  Inbound Tours
                </span>
                <span className="text-xs font-bold bg-card px-2 py-0.5 rounded border border-border">
                  {inboundPackages.length} total
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 bg-card rounded-lg border border-border/60">
                  <span className="text-[10px] text-muted-foreground block">Active</span>
                  <span className="font-extrabold text-emerald-600 text-sm">{activeInboundCount}</span>
                </div>
                <div className="p-2 bg-card rounded-lg border border-border/60">
                  <span className="text-[10px] text-muted-foreground block">Draft</span>
                  <span className="font-extrabold text-amber-600 text-sm">{draftInboundCount}</span>
                </div>
                <div className="p-2 bg-card rounded-lg border border-border/60">
                  <span className="text-[10px] text-muted-foreground block">Inactive</span>
                  <span className="font-extrabold text-slate-600 text-sm">{inactiveInboundCount}</span>
                </div>
              </div>
              <Link href={ROUTES.admin.toursInbound} className="block">
                <Button variant="outline" size="sm" className="w-full h-8 text-xs font-semibold gap-1 text-brand-blue hover:bg-brand-blue/5">
                  <span>View Inbound Tours</span>
                  <ArrowUpRight className="size-3.5" />
                </Button>
              </Link>
            </div>

            {/* Outbound Block */}
            <div className="p-4 rounded-xl border border-border/70 bg-muted/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-navy dark:text-foreground flex items-center gap-1.5">
                  <Globe2 className="size-4 text-blue-600" />
                  Outbound Tours
                </span>
                <span className="text-xs font-bold bg-card px-2 py-0.5 rounded border border-border">
                  {outboundPackages.length} total
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 bg-card rounded-lg border border-border/60">
                  <span className="text-[10px] text-muted-foreground block">Active</span>
                  <span className="font-extrabold text-emerald-600 text-sm">{activeOutboundCount}</span>
                </div>
                <div className="p-2 bg-card rounded-lg border border-border/60">
                  <span className="text-[10px] text-muted-foreground block">Draft</span>
                  <span className="font-extrabold text-amber-600 text-sm">{draftOutboundCount}</span>
                </div>
                <div className="p-2 bg-card rounded-lg border border-border/60">
                  <span className="text-[10px] text-muted-foreground block">Inactive</span>
                  <span className="font-extrabold text-slate-600 text-sm">{inactiveOutboundCount}</span>
                </div>
              </div>
              <Link href={ROUTES.admin.toursOutbound} className="block">
                <Button variant="outline" size="sm" className="w-full h-8 text-xs font-semibold gap-1 text-brand-blue hover:bg-brand-blue/5">
                  <span>View Outbound Tours</span>
                  <ArrowUpRight className="size-3.5" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ========================================================================= */}
      {/* 6. BOTTOM ROW: RECENT ACTIVITY & QUICK ACTIONS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Activity (8 Cols) */}
        <Card className="lg:col-span-8 rounded-2xl border-border/70 bg-card shadow-xs">
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-navy dark:text-foreground flex items-center gap-2">
              <Clock className="size-4 text-brand-blue" />
              Recent Activity
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Chronological log of customer requests, package creations, and updates.
            </p>
          </CardHeader>
          <CardContent className="p-5">
            {recentActivities.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                <p className="text-xs italic">No recent activity.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentActivities.map((act) => {
                  const Icon = act.icon;
                  return (
                    <div
                      key={act.id}
                      className="flex items-center justify-between p-3 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
                          <Icon className="size-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-navy dark:text-foreground">{act.title}</p>
                          <p className="text-[11px] text-muted-foreground">{act.subtitle}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap">
                        {act.date}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions (4 Cols) */}
        <Card className="lg:col-span-4 rounded-2xl border-border/70 bg-card shadow-xs flex flex-col justify-between">
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-navy dark:text-foreground flex items-center gap-2">
              <Sparkles className="size-4 text-brand-blue" />
              Quick Actions
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Direct shortcuts to tour packages and inquiries desk.
            </p>
          </CardHeader>
          <CardContent className="p-5 space-y-3 flex-1 flex flex-col justify-center">
            <Link href={ROUTES.admin.toursInbound} className="block">
              <Button className="w-full h-10 bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-semibold gap-2 rounded-xl shadow-xs justify-start px-4">
                <Palmtree className="size-4" />
                <span>Add Inbound Package</span>
              </Button>
            </Link>

            <Link href={ROUTES.admin.toursOutbound} className="block">
              <Button
                variant="outline"
                className="w-full h-10 text-xs font-semibold gap-2 rounded-xl border-border/80 hover:border-brand-blue hover:bg-brand-blue/5 text-navy dark:text-foreground justify-start px-4"
              >
                <Globe2 className="size-4 text-blue-600" />
                <span>Add Outbound Package</span>
              </Button>
            </Link>

            <Link href={ROUTES.admin.inquiries} className="block">
              <Button
                variant="outline"
                className="w-full h-10 text-xs font-semibold gap-2 rounded-xl border-border/80 hover:border-brand-blue hover:bg-brand-blue/5 text-navy dark:text-foreground justify-start px-4"
              >
                <MessageSquare className="size-4 text-emerald-600" />
                <span>View Inquiries ({inquiries.length})</span>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Inquiry Detail Dialog */}
      <AdminInquiryDetailsDialog
        inquiry={selectedInquiry}
        open={inquiryModalOpen}
        onOpenChange={setInquiryModalOpen}
        onUpdateStatus={handleStatusChange}
        onSendReply={handleSendReply}
      />
    </div>
  );
}
