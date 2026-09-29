"use client";

import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileCheck,
  FileText,
  Globe2,
  Mail,
  MapPin,
  MessageSquare,
  Palmtree,
  Phone,
  Plane,
  Reply,
  Send,
  ShieldCheck,
  Sparkles,
  User,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type {
  InquiryReply,
  InquiryStatus,
  TravelInquiry,
} from "./types";

interface InquiryDetailsDialogProps {
  inquiry: TravelInquiry | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateStatus?: (id: string, status: InquiryStatus) => void;
  onSendReply?: (
    id: string,
    reply: {
      sender: string;
      senderEmail: string;
      recipientEmail: string;
      subject: string;
      message: string;
    },
  ) => void;
}

export function InquiryDetailsDialog({
  inquiry,
  open,
  onOpenChange,
  onUpdateStatus,
  onSendReply,
}: InquiryDetailsDialogProps) {
  const [showReplyComposer, setShowReplyComposer] = useState(false);
  const [replySubject, setReplySubject] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (inquiry) {
      setReplySubject(`Re: Miracle International Travel Inquiry (${inquiry.referenceNumber}) - ${inquiry.packageName || inquiry.destination}`);
      setReplyMessage(
        `Dear ${inquiry.customerName},\n\nThank you for reaching out to Miracle International regarding your travel plans to ${inquiry.destination || inquiry.packageName}.\n\nWe have reviewed your request and are delighted to assist you in designing a customized holiday experience.\n\nPlease find our preliminary proposal details below:\n- Preferred Dates: ${inquiry.travelDate || "To be confirmed"}\n- Travelers: ${inquiry.travelers}\n\nPlease let us know if you have any preferred modifications or if you would like to schedule a quick consultation call.\n\nWarm regards,\nMiracle International Travel Desk\nadmin@miracleinternational.com\n+94 77 123 4567`,
      );
      setShowReplyComposer(false);
    }
  }, [inquiry, open]);

  if (!inquiry) return null;

  const handleStatusChange = (newStatus: InquiryStatus) => {
    if (onUpdateStatus) {
      onUpdateStatus(inquiry.id, newStatus);
      toast.success(`Inquiry status updated to "${newStatus}"`);
    }
  };

  const handleSendEmailReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replySubject.trim() || !replyMessage.trim()) {
      toast.error("Please fill in both the subject and message.");
      return;
    }

    setIsSending(true);

    setTimeout(() => {
      if (onSendReply) {
        onSendReply(inquiry.id, {
          sender: "Miracle Travel Desk",
          senderEmail: "admin@miracleinternational.com",
          recipientEmail: inquiry.customerEmail,
          subject: replySubject,
          message: replyMessage,
        });
      }

      setIsSending(false);
      setShowReplyComposer(false);
      toast.success(`Email reply recorded & sent to ${inquiry.customerEmail}!`, {
        description: "Status marked as Replied. Ready for backend email delivery.",
      });
    }, 400);
  };

  const getStatusBadge = (status: InquiryStatus) => {
    switch (status) {
      case "New":
        return <Badge className="bg-brand-red text-white text-xs">New Inquiry</Badge>;
      case "Reviewing":
        return <Badge className="bg-amber-600 text-white text-xs">Reviewing</Badge>;
      case "Replied":
        return <Badge className="bg-blue-600 text-white text-xs">Replied</Badge>;
      case "Confirmed":
        return <Badge className="bg-emerald-600 text-white text-xs">Confirmed</Badge>;
      case "Rescheduled":
        return <Badge className="bg-purple-600 text-white text-xs">Rescheduled</Badge>;
      case "Completed":
        return <Badge className="bg-slate-700 text-white text-xs">Completed</Badge>;
      case "Cancelled":
        return <Badge className="bg-slate-400 text-white text-xs">Cancelled</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-[95vw] sm:w-full max-h-[92vh] flex flex-col p-0 rounded-2xl shadow-2xl bg-card border border-border/80 overflow-hidden">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b border-border/70 bg-gradient-to-r from-slate-50 via-white to-blue-50/40 dark:from-slate-900/60 dark:via-card dark:to-slate-900/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pr-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border/60">
                  #{inquiry.referenceNumber}
                </span>
                <Badge
                  variant="outline"
                  className={
                    inquiry.travelType === "Inbound"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-400"
                      : "bg-blue-50 text-blue-700 border-blue-300 dark:bg-blue-950/40 dark:text-blue-400"
                  }
                >
                  {inquiry.inquiryType}
                </Badge>
                {getStatusBadge(inquiry.status)}
              </div>

              <DialogTitle className="text-xl font-bold text-navy dark:text-foreground mt-2">
                {inquiry.customerName}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                Submitted on {inquiry.submittedDate} • No online payment required (Inquiry Model)
              </DialogDescription>
            </div>

            {/* Status Change Selector */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <Label className="text-xs font-semibold text-muted-foreground whitespace-nowrap">
                Update Status:
              </Label>
              <Select
                value={inquiry.status}
                onValueChange={(val) => handleStatusChange(val as InquiryStatus)}
              >
                <SelectTrigger className="h-8.5 w-[140px] text-xs bg-background">
                  <SelectValue placeholder="Change status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Reviewing">Reviewing</SelectItem>
                  <SelectItem value="Replied">Replied</SelectItem>
                  <SelectItem value="Confirmed">Confirmed</SelectItem>
                  <SelectItem value="Rescheduled">Rescheduled</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </DialogHeader>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30 dark:bg-card/30">
          {/* Section 1: Customer Information & Travel Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Customer Details Card */}
            <div className="p-4.5 rounded-xl border border-border/70 bg-card shadow-xs space-y-3">
              <div className="flex items-center gap-2 border-b border-border/50 pb-2">
                <User className="size-4 text-brand-blue" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy dark:text-foreground">
                  Customer Contact Information
                </h4>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Full Name:</span>
                  <span className="font-semibold text-foreground">{inquiry.customerName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Email:</span>
                  <a
                    href={`mailto:${inquiry.customerEmail}`}
                    className="font-medium text-brand-blue hover:underline flex items-center gap-1"
                  >
                    <Mail className="size-3" />
                    {inquiry.customerEmail}
                  </a>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Contact Phone:</span>
                  <a
                    href={`tel:${inquiry.customerPhone}`}
                    className="font-medium text-foreground hover:text-brand-blue flex items-center gap-1"
                  >
                    <Phone className="size-3" />
                    {inquiry.customerPhone}
                  </a>
                </div>
                {inquiry.whatsappNumber ? (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">WhatsApp:</span>
                    <a
                      href={`https://wa.me/${inquiry.whatsappNumber.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-emerald-600 hover:underline flex items-center gap-1"
                    >
                      <MessageSquare className="size-3" />
                      {inquiry.whatsappNumber}
                    </a>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Travel Details Card */}
            <div className="p-4.5 rounded-xl border border-border/70 bg-card shadow-xs space-y-3">
              <div className="flex items-center gap-2 border-b border-border/50 pb-2">
                <Plane className="size-4 text-brand-blue" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy dark:text-foreground">
                  Travel &amp; Tour Specifications
                </h4>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Inquiry Type:</span>
                  <span className="font-semibold text-brand-blue">{inquiry.inquiryType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Travel Type:</span>
                  <span className="font-semibold text-foreground">{inquiry.travelType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Package Name:</span>
                  <span className="font-semibold text-foreground text-right truncate max-w-[200px]">
                    {inquiry.packageName || "Custom Itinerary"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Destination:</span>
                  <span className="font-medium text-foreground flex items-center gap-1">
                    <MapPin className="size-3 text-brand-blue" />
                    {inquiry.destination || "Not specified"}
                  </span>
                </div>
                {inquiry.country ? (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Country:</span>
                    <span className="font-medium text-foreground flex items-center gap-1">
                      <Globe2 className="size-3 text-emerald-600" />
                      {inquiry.country}
                    </span>
                  </div>
                ) : null}
                {inquiry.duration ? (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium text-foreground flex items-center gap-1">
                      <Clock className="size-3 text-amber-600" />
                      {inquiry.duration}
                    </span>
                  </div>
                ) : null}
                {inquiry.packagePrice != null ? (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Package Price:</span>
                    <span className="font-bold text-navy dark:text-brand-blue">
                      {inquiry.packageCurrency || (inquiry.travelType === "Inbound" ? "LKR" : "USD")}{" "}
                      {inquiry.packagePrice.toLocaleString()}
                    </span>
                  </div>
                ) : null}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Preferred Date:</span>
                  <span className="font-medium text-foreground flex items-center gap-1">
                    <Calendar className="size-3 text-brand-blue" />
                    {inquiry.travelDate || "Flexible"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Travelers Count:</span>
                  <span className="font-semibold text-foreground flex items-center gap-1">
                    <Users className="size-3 text-brand-blue" />
                    {inquiry.travelers} Pax
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Request / Additional Requirements */}
          <div className="p-4.5 rounded-xl border border-border/70 bg-card shadow-xs space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <FileText className="size-3.5 text-brand-blue" />
              Customer Additional Requirements &amp; Special Requests
            </h4>
            <div className="p-3 rounded-lg bg-muted/30 border border-border/60 text-xs text-foreground leading-relaxed whitespace-pre-wrap">
              {inquiry.additionalRequirements || "No additional requirements specified by the customer."}
            </div>
          </div>

          {/* Uploaded Documents */}
          {inquiry.documents && inquiry.documents.length > 0 ? (
            <div className="p-4.5 rounded-xl border border-border/70 bg-card shadow-xs space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <FileCheck className="size-3.5 text-emerald-600" />
                Attached Documents ({inquiry.documents.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {inquiry.documents.map((doc, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted border border-border/70 text-xs font-mono"
                  >
                    <FileCheck className="size-3.5 text-brand-blue" />
                    <span className="truncate max-w-xs">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* ========================================================================= */}
          {/* EMAIL REPLY COMPOSER (SECTION 8) */}
          {/* ========================================================================= */}
          <div className="p-5 rounded-xl border border-brand-blue/30 bg-gradient-to-b from-brand-blue/5 to-card shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-lg bg-brand-blue text-white">
                  <Reply className="size-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-navy dark:text-foreground">
                    Reply to Customer by Email
                  </h4>
                  <p className="text-[11px] text-muted-foreground">
                    Direct communication with {inquiry.customerEmail}
                  </p>
                </div>
              </div>

              {!showReplyComposer ? (
                <Button
                  size="sm"
                  onClick={() => setShowReplyComposer(true)}
                  className="h-8 text-xs bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold gap-1.5"
                >
                  <Mail className="size-3.5" />
                  Compose Email Reply
                </Button>
              ) : null}
            </div>

            {showReplyComposer ? (
              <form onSubmit={handleSendEmailReply} className="space-y-3.5 pt-2 border-t border-border/60">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <Label className="text-[11px] font-semibold text-muted-foreground">Recipient Email:</Label>
                    <Input
                      value={inquiry.customerEmail}
                      disabled
                      className="h-8.5 text-xs bg-muted/50 font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[11px] font-semibold text-muted-foreground">Sender Email:</Label>
                    <Input
                      value="admin@miracleinternational.com (Miracle Travel Desk)"
                      disabled
                      className="h-8.5 text-xs bg-muted/50 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="reply-subject" className="text-xs font-semibold">
                    Email Subject <span className="text-brand-red">*</span>
                  </Label>
                  <Input
                    id="reply-subject"
                    value={replySubject}
                    onChange={(e) => setReplySubject(e.target.value)}
                    className="h-9 text-xs bg-background font-medium"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="reply-msg" className="text-xs font-semibold">
                    Message Body <span className="text-brand-red">*</span>
                  </Label>
                  <Textarea
                    id="reply-msg"
                    rows={7}
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    className="text-xs leading-relaxed bg-background font-sans"
                    required
                  />
                </div>

                <div className="p-3 rounded-lg bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/60 text-[11px] text-muted-foreground flex items-center gap-2">
                  <Sparkles className="size-4 text-brand-blue shrink-0" />
                  <span>
                    Integration ready: Submitting logs this reply into the inquiry conversation history and updates inquiry status to <strong>Replied</strong>.
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowReplyComposer(false)}
                    className="h-8.5 text-xs"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    disabled={isSending}
                    className="h-8.5 text-xs bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold gap-1.5"
                  >
                    <Send className="size-3.5" />
                    {isSending ? "Recording Reply..." : "Send Email Reply"}
                  </Button>
                </div>
              </form>
            ) : null}
          </div>

          {/* ========================================================================= */}
          {/* CONVERSATION & REPLY HISTORY (SECTION 9) */}
          {/* ========================================================================= */}
          <div className="p-4.5 rounded-xl border border-border/70 bg-card shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-border/50 pb-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="size-4 text-brand-blue" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy dark:text-foreground">
                  Inquiry Activity &amp; Conversation History
                </h4>
              </div>
              <span className="text-[11px] font-semibold text-muted-foreground">
                {(inquiry.replyHistory || []).length + 1} records
              </span>
            </div>

            <div className="space-y-3">
              {/* Initial Customer Submission */}
              <div className="p-3.5 rounded-xl bg-muted/40 border border-border/60 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-navy dark:text-foreground flex items-center gap-1">
                    <User className="size-3 text-brand-blue" />
                    {inquiry.customerName} (Customer Initial Inquiry)
                  </span>
                  <span className="text-muted-foreground font-mono">{inquiry.submittedDate}</span>
                </div>
                <p className="text-foreground leading-relaxed">
                  Submitted travel request for <strong>{inquiry.packageName || inquiry.destination}</strong> ({inquiry.inquiryType}).
                </p>
                {inquiry.additionalRequirements ? (
                  <p className="text-muted-foreground italic text-[11px]">
                    &ldquo;{inquiry.additionalRequirements}&rdquo;
                  </p>
                ) : null}
              </div>

              {/* Admin Replies */}
              {inquiry.replyHistory && inquiry.replyHistory.length > 0 ? (
                inquiry.replyHistory.map((reply) => (
                  <div
                    key={reply.id}
                    className="p-3.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-brand-blue/30 text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-brand-blue flex items-center gap-1">
                        <Reply className="size-3" />
                        {reply.sender} &bull; To: {reply.recipientEmail}
                      </span>
                      <span className="text-muted-foreground font-mono flex items-center gap-1">
                        <Clock className="size-3" />
                        {reply.sentAt}
                      </span>
                    </div>
                    <p className="font-semibold text-navy dark:text-foreground text-[11px]">
                      Subject: {reply.subject}
                    </p>
                    <p className="text-foreground whitespace-pre-wrap leading-relaxed text-[11px] bg-card/60 p-2.5 rounded-lg border border-border/50">
                      {reply.message}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-[11px] text-muted-foreground italic text-center py-2">
                  No replies sent to this customer yet. Click &quot;Compose Email Reply&quot; above to message the traveler.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="p-4 px-6 border-t border-border/70 bg-muted/20 gap-2 sm:gap-0">
          <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
