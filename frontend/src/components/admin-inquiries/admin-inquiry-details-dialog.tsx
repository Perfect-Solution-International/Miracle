"use client";

import {
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  FileSpreadsheet,
  FileText,
  FileUp,
  Globe2,
  History,
  Mail,
  MapPin,
  MessageSquare,
  Palmtree,
  Phone,
  Plane,
  Reply,
  Send,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Tag,
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
} from "@/components/admin-travel/types";

interface AdminInquiryDetailsDialogProps {
  inquiry: TravelInquiry | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateStatus: (id: string, status: InquiryStatus) => void;
  onSendReply: (
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

export function AdminInquiryDetailsDialog({
  inquiry,
  open,
  onOpenChange,
  onUpdateStatus,
  onSendReply,
}: AdminInquiryDetailsDialogProps) {
  const [activeTab, setActiveTab] = useState<"details" | "reply" | "history">("details");
  const [replySender, setReplySender] = useState("Miracle International Desk");
  const [replySenderEmail, setReplySenderEmail] = useState("desk@miracleinternational.com");
  const [replySubject, setReplySubject] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (inquiry) {
      setActiveTab("details");
      setReplySubject(
        `Re: Inquiry #${inquiry.referenceNumber} - ${inquiry.packageName || inquiry.inquiryType}`,
      );
      setReplyMessage(
        `Dear ${inquiry.customerName},\n\nThank you for contacting Miracle International regarding your ${inquiry.inquiryType} request.\n\nWe have reviewed your requirements and would be delighted to assist you...\n\nWarm regards,\nMiracle International Team`,
      );
    }
  }, [inquiry]);

  if (!inquiry) return null;

  const handleStatusChange = (newStatus: InquiryStatus) => {
    onUpdateStatus(inquiry.id, newStatus);
    toast.success(`Inquiry #${inquiry.referenceNumber} status changed to ${newStatus}`);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replySubject.trim() || !replyMessage.trim()) {
      toast.error("Please fill in the subject and reply message.");
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      onSendReply(inquiry.id, {
        sender: replySender,
        senderEmail: replySenderEmail,
        recipientEmail: inquiry.customerEmail,
        subject: replySubject,
        message: replyMessage,
      });
      setIsSending(false);
      toast.success(`Reply email logged & sent to ${inquiry.customerEmail}`);
      setActiveTab("history");
    }, 600);
  };

  const cleanPhone = inquiry.whatsappNumber || inquiry.customerPhone;
  const whatsappUrl = cleanPhone
    ? `https://wa.me/${cleanPhone.replace(/[^0-9]/g, "")}`
    : null;

  const getStatusColor = (status: InquiryStatus) => {
    switch (status) {
      case "New":
        return "bg-brand-red text-white";
      case "Reviewing":
        return "bg-amber-500 text-white";
      case "In Progress":
        return "bg-blue-600 text-white";
      case "Replied":
        return "bg-sky-600 text-white";
      case "Completed":
      case "Confirmed":
        return "bg-emerald-600 text-white";
      case "Cancelled":
        return "bg-slate-400 text-white";
      default:
        return "bg-slate-600 text-white";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl xl:max-w-5xl w-[96vw] max-h-[92vh] flex flex-col p-0 rounded-3xl shadow-2xl bg-white border border-slate-200 overflow-hidden">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b border-slate-200 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue shrink-0 shadow-xs">
                <MessageSquare className="size-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <DialogTitle className="text-lg sm:text-xl font-bold text-navy">
                    Inquiry Details: #{inquiry.referenceNumber}
                  </DialogTitle>
                  <Badge className={`text-[11px] font-bold px-2.5 py-0.5 ${getStatusColor(inquiry.status)}`}>
                    {inquiry.status}
                  </Badge>
                </div>
                <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                  Submitted on {inquiry.submittedDate} • {inquiry.inquiryType}
                </DialogDescription>
              </div>
            </div>

            {/* Quick Status Selector in Header */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs font-bold text-slate-700">Status:</span>
              <Select
                value={inquiry.status}
                onValueChange={(val) => handleStatusChange(val as InquiryStatus)}
              >
                <SelectTrigger className="h-9 w-36 text-xs bg-white border-slate-200 font-semibold rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200">
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Reviewing">Reviewing</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Replied">Replied</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 pt-4 border-t border-slate-100 mt-3">
            <button
              type="button"
              onClick={() => setActiveTab("details")}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "details"
                  ? "bg-brand-blue text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Customer &amp; Request Details
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("reply")}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "reply"
                  ? "bg-brand-blue text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Reply className="size-3.5" />
              Reply via Email
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("history")}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "history"
                  ? "bg-brand-blue text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <History className="size-3.5" />
              Communication Log ({inquiry.replyHistory?.length || 0})
            </button>
          </div>
        </DialogHeader>

        {/* Tab 1: Request Details */}
        {activeTab === "details" && (
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Customer Info Card */}
              <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
                <div className="flex items-center gap-2 text-brand-blue pb-2 border-b border-slate-100">
                  <User className="size-4" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-navy">
                    Customer Contact Information
                  </h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Full Name</span>
                    <span className="font-bold text-sm text-ink">{inquiry.customerName}</span>
                  </div>

                  <div>
                    <span className="text-muted-foreground block text-[11px]">Email Address</span>
                    <a
                      href={`mailto:${inquiry.customerEmail}`}
                      className="font-bold text-brand-blue hover:underline flex items-center gap-1.5 mt-0.5"
                    >
                      <Mail className="size-3.5" />
                      {inquiry.customerEmail}
                    </a>
                  </div>

                  <div>
                    <span className="text-muted-foreground block text-[11px]">Contact Phone</span>
                    <a
                      href={`tel:${inquiry.customerPhone}`}
                      className="font-bold text-ink hover:text-brand-blue flex items-center gap-1.5 mt-0.5"
                    >
                      <Phone className="size-3.5" />
                      {inquiry.customerPhone}
                    </a>
                  </div>

                  {inquiry.whatsappNumber ? (
                    <div>
                      <span className="text-muted-foreground block text-[11px]">WhatsApp</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-bold text-ink">{inquiry.whatsappNumber}</span>
                        {whatsappUrl ? (
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md text-[10px] font-bold hover:bg-emerald-200"
                          >
                            Open WhatsApp
                          </a>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Service & Travel Schedule Card */}
              <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
                <div className="flex items-center gap-2 text-brand-blue pb-2 border-b border-slate-100">
                  <Tag className="size-4" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-navy">
                    Inquiry &amp; Service Details
                  </h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-muted-foreground block text-[11px]">Inquiry Type</span>
                      <Badge className="bg-brand-blue/10 text-brand-blue border-brand-blue/20 font-bold text-xs mt-0.5">
                        {inquiry.inquiryType}
                      </Badge>
                    </div>
                    {inquiry.travelType ? (
                      <div>
                        <span className="text-muted-foreground block text-[11px] text-right">Travel Type</span>
                        <Badge variant="outline" className="text-xs font-semibold mt-0.5">
                          {inquiry.travelType}
                        </Badge>
                      </div>
                    ) : null}
                  </div>

                  {inquiry.packageName ? (
                    <div>
                      <span className="text-muted-foreground block text-[11px]">Package / Service</span>
                      <span className="font-bold text-ink block mt-0.5">{inquiry.packageName}</span>
                    </div>
                  ) : null}

                  {inquiry.destination ? (
                    <div>
                      <span className="text-muted-foreground block text-[11px]">Destination(s)</span>
                      <span className="font-bold text-ink flex items-center gap-1.5 mt-0.5">
                        <MapPin className="size-3.5 text-sky-500 shrink-0" />
                        {inquiry.destination}
                      </span>
                    </div>
                  ) : null}

                  {inquiry.country ? (
                    <div>
                      <span className="text-muted-foreground block text-[11px]">Country</span>
                      <span className="font-semibold text-ink flex items-center gap-1.5 mt-0.5">
                        <Globe2 className="size-3.5 text-emerald-600 shrink-0" />
                        {inquiry.country}
                      </span>
                    </div>
                  ) : null}

                  <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-100">
                    {inquiry.duration ? (
                      <div>
                        <span className="text-muted-foreground block text-[11px]">Duration</span>
                        <span className="font-semibold text-ink flex items-center gap-1 mt-0.5">
                          <Clock className="size-3.5 text-amber-600" />
                          {inquiry.duration}
                        </span>
                      </div>
                    ) : null}

                    {inquiry.packagePrice != null ? (
                      <div>
                        <span className="text-muted-foreground block text-[11px]">Package Price</span>
                        <span className="font-bold text-navy mt-0.5 block">
                          {inquiry.packageCurrency || (inquiry.travelType === "Inbound" ? "LKR" : "USD")}{" "}
                          {inquiry.packagePrice.toLocaleString()}
                        </span>
                      </div>
                    ) : null}
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-100">
                    {inquiry.travelDate ? (
                      <div>
                        <span className="text-muted-foreground block text-[11px]">Preferred Date</span>
                        <span className="font-bold text-ink flex items-center gap-1 mt-0.5">
                          <Calendar className="size-3.5 text-brand-blue" />
                          {inquiry.travelDate}
                        </span>
                      </div>
                    ) : null}

                    {inquiry.travelers ? (
                      <div>
                        <span className="text-muted-foreground block text-[11px]">Travelers / Pax</span>
                        <span className="font-bold text-ink flex items-center gap-1 mt-0.5">
                          <Users className="size-3.5 text-brand-blue" />
                          {inquiry.travelers} Pax
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

            </div>

            {/* Customer Requirements & Notes */}
            <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
              <div className="flex items-center gap-2 text-brand-blue pb-2 border-b border-slate-100">
                <FileText className="size-4" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-navy">
                  Customer Requirements &amp; Special Notes
                </h3>
              </div>

              {inquiry.additionalRequirements ? (
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-wrap bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {inquiry.additionalRequirements}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground italic">
                  No additional notes or customization requirements provided.
                </p>
              )}
            </div>

            {/* Uploaded Documents */}
            {inquiry.documents && inquiry.documents.length > 0 ? (
              <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
                <div className="flex items-center gap-2 text-brand-blue pb-2 border-b border-slate-100">
                  <FileUp className="size-4" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-navy">
                    Attached Files ({inquiry.documents.length})
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {inquiry.documents.map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                    >
                      <FileSpreadsheet className="size-4 text-brand-blue" />
                      <span className="truncate max-w-[220px]">{doc}</span>
                      <button
                        type="button"
                        onClick={() => toast.info(`Viewing attachment: ${doc}`)}
                        className="text-brand-blue hover:underline ml-1 font-sans text-xs font-bold"
                      >
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* Tab 2: Email Reply */}
        {activeTab === "reply" && (
          <form onSubmit={handleSend} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4 bg-white">
            <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4 text-xs text-slate-700 flex items-center gap-3">
              <ShieldCheck className="size-5 text-brand-blue shrink-0" />
              <span>
                Replying to <strong>{inquiry.customerName}</strong> ({inquiry.customerEmail}) regarding Inquiry #{inquiry.referenceNumber}.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-700">From Name</Label>
                <Input
                  value={replySender}
                  onChange={(e) => setReplySender(e.target.value)}
                  className="h-10 text-xs bg-white border-slate-200 rounded-xl"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-700">From Email</Label>
                <Input
                  type="email"
                  value={replySenderEmail}
                  onChange={(e) => setReplySenderEmail(e.target.value)}
                  className="h-10 text-xs bg-white border-slate-200 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-700">Email Subject</Label>
              <Input
                value={replySubject}
                onChange={(e) => setReplySubject(e.target.value)}
                className="h-10 text-xs bg-white border-slate-200 rounded-xl"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-700">Response Message</Label>
              <Textarea
                rows={8}
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                className="text-xs sm:text-sm bg-white border-slate-200 rounded-xl p-3 font-sans"
                required
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setActiveTab("details")}
                className="h-10 text-xs px-5 rounded-xl font-bold"
              >
                Back to Details
              </Button>
              <Button
                type="submit"
                disabled={isSending}
                className="h-10 text-xs px-6 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold gap-2 shadow-md"
              >
                <Send className="size-3.5" />
                {isSending ? "Sending..." : "Send & Log Reply"}
              </Button>
            </div>
          </form>
        )}

        {/* Tab 3: History */}
        {activeTab === "history" && (
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4 bg-white">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-navy">
                Communication History &amp; Outgoing Replies
              </h3>
              <Button
                type="button"
                size="sm"
                onClick={() => setActiveTab("reply")}
                className="h-8 text-xs bg-brand-blue hover:bg-brand-blue-dark text-white rounded-lg font-bold gap-1"
              >
                <Reply className="size-3" /> Write Reply
              </Button>
            </div>

            {inquiry.replyHistory && inquiry.replyHistory.length > 0 ? (
              <div className="space-y-4">
                {inquiry.replyHistory.map((rep) => (
                  <div
                    key={rep.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2 text-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 border-b border-slate-200 pb-2">
                      <div>
                        <span className="font-bold text-ink">{rep.sender}</span>
                        <span className="text-muted-foreground ml-2">({rep.senderEmail})</span>
                      </div>
                      <span className="text-muted-foreground text-[11px] font-mono">{rep.sentAt}</span>
                    </div>
                    <div className="font-semibold text-slate-800">
                      Subject: {rep.subject}
                    </div>
                    <p className="text-slate-600 whitespace-pre-wrap leading-relaxed">
                      {rep.message}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center text-muted-foreground text-xs space-y-2">
                <History className="size-8 mx-auto text-slate-300" />
                <p>No outgoing email replies have been recorded for this inquiry yet.</p>
              </div>
            )}
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-mono">
            Ref #{inquiry.referenceNumber}
          </span>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="h-9 text-xs px-6 rounded-xl font-bold bg-white"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
