"use client";

import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  Compass,
  Inbox,
  Mail,
  MessageSquare,
  Palmtree,
  Plane,
  Reply,
  Send,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AdminStatCard } from "@/components/admin-dashboard/admin-stat-card";
import { useTravelStore } from "@/lib/storage/travel-store";
import { AdminTravelNavHeader } from "./admin-travel-nav-header";
import { InquiryDetailsDialog } from "./inquiry-details-dialog";
import { TravelInquiriesTable } from "./travel-inquiries-table";
import type {
  InquiryReply,
  InquiryStatus,
  TravelInquiry,
} from "./types";

export function TravelInquiriesView() {
  const {
    inquiries,
    updateInquiryStatus,
    addInquiryReply,
    deleteInquiry,
  } = useTravelStore();

  const [activeInquiry, setActiveInquiry] = useState<TravelInquiry | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  // Summary counts
  const totalCount = inquiries.length;
  const newCount = inquiries.filter((i) => i.status === "New").length;
  const reviewingCount = inquiries.filter((i) => i.status === "Reviewing").length;
  const repliedCount = inquiries.filter((i) => i.status === "Replied").length;
  const confirmedCount = inquiries.filter((i) => i.status === "Confirmed").length;

  const handleViewInquiry = (inq: TravelInquiry) => {
    setActiveInquiry(inq);
    setInquiryModalOpen(true);
  };

  const handleUpdateStatus = (id: string, status: InquiryStatus) => {
    updateInquiryStatus(id, status);
    if (activeInquiry && activeInquiry.id === id) {
      setActiveInquiry((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const handleSendReply = (
    id: string,
    replyData: {
      sender: string;
      senderEmail: string;
      recipientEmail: string;
      subject: string;
      message: string;
    },
  ) => {
    const newReply = addInquiryReply(id, replyData);
    if (activeInquiry && activeInquiry.id === id) {
      setActiveInquiry((prev) => {
        if (!prev) return null;
        const history = prev.replyHistory || [];
        return {
          ...prev,
          status: "Replied",
          replyHistory: [...history, newReply],
        };
      });
    }
  };

  const handleDeleteInquiry = (id: string) => {
    const target = inquiries.find((i) => i.id === id);
    if (!target) return;
    deleteInquiry(id);
    toast.success(`Inquiry #${target.referenceNumber} from ${target.customerName} has been deleted.`);
  };

  return (
    <div className="space-y-6">
      <AdminTravelNavHeader />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        <AdminStatCard
          label="Total Inquiries"
          value={String(totalCount)}
          icon={Inbox}
          hint="All customer submissions"
          accentColor="blue"
        />
        <AdminStatCard
          label="New Inquiries"
          value={String(newCount)}
          icon={Clock}
          hint={newCount > 0 ? "Action required" : "No pending new requests"}
          highlight={newCount > 0}
          accentColor={newCount > 0 ? "red" : "navy"}
        />
        <AdminStatCard
          label="Under Review"
          value={String(reviewingCount)}
          icon={Compass}
          hint="Itineraries being quoted"
          accentColor="blue"
        />
        <AdminStatCard
          label="Replied Inquiries"
          value={String(repliedCount)}
          icon={Reply}
          hint="Email responses logged"
          accentColor="navy"
        />
        <AdminStatCard
          label="Confirmed Tours"
          value={String(confirmedCount)}
          icon={CalendarCheck}
          hint="Finalized customer bookings"
          accentColor="blue"
        />
      </div>

      {/* Inquiries Table */}
      <TravelInquiriesTable
        inquiries={inquiries}
        onViewInquiry={handleViewInquiry}
        onUpdateStatus={handleUpdateStatus}
        onDeleteInquiry={handleDeleteInquiry}
      />

      {/* Inquiry Details Modal with Email Reply & History */}
      <InquiryDetailsDialog
        inquiry={activeInquiry}
        open={inquiryModalOpen}
        onOpenChange={setInquiryModalOpen}
        onUpdateStatus={handleUpdateStatus}
        onSendReply={handleSendReply}
      />
    </div>
  );
}
