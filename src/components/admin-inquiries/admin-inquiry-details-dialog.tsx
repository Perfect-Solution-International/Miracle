"use client";

import {
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Download,
  Eye,
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
  Star,
  Tag,
  Trash2,
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
  PackageReview,
  ReviewStatus,
  TravelInquiry,
} from "@/components/admin-travel/types";

const REVIEWS_STORAGE_KEY = "miracle_travel_package_reviews";

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
  const [activeTab, setActiveTab] = useState<"details" | "reply" | "history" | "review">("details");
  const [replySender, setReplySender] = useState("Miracle International Operations Desk");
  const [replySenderEmail, setReplySenderEmail] = useState("desk@miracleinternational.com");
  const [replySubject, setReplySubject] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Linked review for tour packages (if any)
  const [linkedReview, setLinkedReview] = useState<PackageReview | null>(null);

  const isTourInquiry =
    Boolean(inquiry?.inquiryType?.toLowerCase().includes("tour")) ||
    Boolean(inquiry?.travelType) ||
    Boolean(inquiry?.packageId) ||
    Boolean(inquiry?.packageName);

  useEffect(() => {
    if (inquiry) {
      setActiveTab("details");
      setReplySubject(
        `Re: Inquiry #${inquiry.referenceNumber} - ${inquiry.packageName || inquiry.inquiryType}`,
      );
      setReplyMessage(
        `Dear ${inquiry.customerName},\n\nThank you for reaching out to Miracle International regarding your ${inquiry.inquiryType} request.\n\nWe have reviewed your inquiry details and are pleased to provide you with the following assistance...\n\nPlease feel free to reply to this email or contact us directly on WhatsApp.\n\nWarm regards,\nMiracle International Team\nhttps://miracleinternational.com`,
      );

      // Check for existing review linked to this package or inquiry
      if (typeof window !== "undefined") {
        try {
          const raw = localStorage.getItem(REVIEWS_STORAGE_KEY);
          if (raw) {
            const allReviews: PackageReview[] = JSON.parse(raw);
            const found = allReviews.find(
              (r) =>
                (inquiry.id && r.inquiryId === inquiry.id) ||
                (inquiry.packageSlug && r.packageSlug === inquiry.packageSlug) ||
                (inquiry.customerEmail && r.customerEmail === inquiry.customerEmail),
            );
            setLinkedReview(found || null);
          }
        } catch {
          setLinkedReview(null);
        }
      }
    }
  }, [inquiry]);

  if (!inquiry) return null;

  const handleStatusChange = (newStatus: InquiryStatus) => {
    onUpdateStatus(inquiry.id, newStatus);
    toast.success(`Inquiry #${inquiry.referenceNumber} status changed to "${newStatus}".`);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replySubject.trim() || !replyMessage.trim()) {
      toast.error("Please fill in both the subject and the reply message.");
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
      toast.success(`Email reply dispatched to ${inquiry.customerEmail}`);
      setActiveTab("history");
    }, 400);
  };

  const cleanPhone = inquiry.whatsappNumber || inquiry.customerPhone;
  const rawPhoneDigits = cleanPhone ? cleanPhone.replace(/[^0-9]/g, "") : "";
  const whatsappUrl = rawPhoneDigits ? `https://wa.me/${rawPhoneDigits}` : null;
  const telUrl = cleanPhone ? `tel:${cleanPhone}` : null;

  const getStatusBadgeColor = (status: InquiryStatus) => {
    switch (status) {
      case "New":
        return "bg-emerald-600 text-white";
      case "Reviewing":
        return "bg-amber-600 text-white";
      case "Replied":
        return "bg-sky-600 text-white";
      case "In Progress":
        return "bg-blue-600 text-white";
      case "Completed":
      case "Confirmed":
        return "bg-emerald-700 text-white";
      case "Cancelled":
        return "bg-slate-600 text-white";
      default:
        return "bg-slate-600 text-white";
    }
  };

  // Handle Review Moderation
  const handleUpdateReviewStatus = (status: ReviewStatus) => {
    if (!linkedReview) return;
    try {
      const raw = localStorage.getItem(REVIEWS_STORAGE_KEY);
      const all: PackageReview[] = raw ? JSON.parse(raw) : [];
      const updated = all.map((r) =>
        r.id === linkedReview.id ? { ...r, status } : r,
      );
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updated));
      setLinkedReview((prev) => (prev ? { ...prev, status } : null));
      toast.success(`Review for "${linkedReview.packageName}" marked as ${status}.`);
    } catch {}
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl xl:max-w-5xl w-[96vw] max-h-[92vh] flex flex-col p-0 rounded-2xl shadow-2xl bg-card border border-border/80 overflow-hidden">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b border-border/70 bg-gradient-to-r from-slate-50 via-white to-blue-50/40 dark:from-slate-900 dark:via-card dark:to-slate-900 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue shrink-0 shadow-xs">
                <MessageSquare className="size-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <DialogTitle className="text-lg sm:text-xl font-bold text-navy dark:text-foreground">
                    Inquiry #{inquiry.referenceNumber}
                  </DialogTitle>
                  <Badge className={`text-[11px] font-bold px-2.5 py-0.5 ${getStatusBadgeColor(inquiry.status)}`}>
                    {inquiry.status}
                  </Badge>
                </div>
                <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                  Submitted on {inquiry.submittedDate} • {inquiry.inquiryType}
                </DialogDescription>
              </div>
            </div>

            {/* Quick Status Selector */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Status:</span>
              <Select
                value={inquiry.status}
                onValueChange={(val) => handleStatusChange(val as InquiryStatus)}
              >
                <SelectTrigger className="h-9 w-36 text-xs bg-background border-border font-semibold rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Reviewing">Reviewing</SelectItem>
                  <SelectItem value="Replied">Replied</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-border/50 mt-3">
            <button
              type="button"
              onClick={() => setActiveTab("details")}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "details"
                  ? "bg-brand-blue text-white shadow-xs"
                  : "bg-muted text-muted-foreground hover:text-foreground"
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
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <Reply className="size-3.5" />
              Email Customer
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("history")}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "history"
                  ? "bg-brand-blue text-white shadow-xs"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <History className="size-3.5" />
              Communication History ({inquiry.replyHistory?.length || 0})
            </button>
            {isTourInquiry && (
              <button
                type="button"
                onClick={() => setActiveTab("review")}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === "review"
                    ? "bg-brand-blue text-white shadow-xs"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <Star className="size-3.5 text-amber-500 fill-amber-500" />
                Tour Review {linkedReview ? `(${linkedReview.status})` : ""}
              </button>
            )}
          </div>
        </DialogHeader>

        {/* Tab 1: Request Details */}
        {activeTab === "details" && (
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-slate-50/40 dark:bg-card/40">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Information Card */}
              <div className="space-y-4 rounded-2xl border border-border/70 bg-card p-5 shadow-2xs">
                <div className="flex items-center gap-2 text-brand-blue pb-2 border-b border-border/50">
                  <User className="size-4" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-navy dark:text-foreground">
                    Customer Information
                  </h3>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase font-bold block">Full Name</span>
                    <span className="font-bold text-sm text-navy dark:text-foreground">{inquiry.customerName}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase font-bold block">Email Address</span>
                    <div className="flex items-center justify-between gap-2 mt-0.5">
                      <span className="font-medium text-foreground">{inquiry.customerEmail}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setActiveTab("reply")}
                        className="h-7 text-[11px] font-semibold text-brand-blue border-brand-blue/30 hover:bg-brand-blue/5 gap-1 px-2"
                      >
                        <Mail className="size-3" />
                        Send Email
                      </Button>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase font-bold block">Contact Number</span>
                    <div className="flex items-center justify-between gap-2 mt-0.5">
                      <span className="font-mono text-foreground font-medium">{inquiry.customerPhone || "—"}</span>
                      {telUrl ? (
                        <a href={telUrl}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-[11px] font-semibold text-foreground border-border gap-1 px-2"
                          >
                            <Phone className="size-3 text-brand-blue" />
                            Call
                          </Button>
                        </a>
                      ) : null}
                    </div>
                  </div>

                  {inquiry.whatsappNumber ? (
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold block">WhatsApp Number</span>
                      <div className="flex items-center justify-between gap-2 mt-0.5">
                        <span className="font-mono text-foreground font-medium">{inquiry.whatsappNumber}</span>
                        {whatsappUrl ? (
                          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                            <Button
                              size="sm"
                              className="h-7 text-[11px] font-semibold bg-emerald-600 hover:bg-emerald-700 text-white gap-1 px-2.5 shadow-2xs"
                            >
                              <MessageSquare className="size-3" />
                              Open WhatsApp
                            </Button>
                          </a>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Inquiry & Service Information Card */}
              <div className="space-y-4 rounded-2xl border border-border/70 bg-card p-5 shadow-2xs">
                <div className="flex items-center gap-2 text-brand-blue pb-2 border-b border-border/50">
                  <Tag className="size-4" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-navy dark:text-foreground">
                    Inquiry Specifications
                  </h3>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase font-bold block">Inquiry Type</span>
                    <span className="font-semibold text-foreground">{inquiry.inquiryType}</span>
                  </div>

                  {inquiry.travelType ? (
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold block">Travel Type</span>
                      <Badge
                        variant="outline"
                        className={
                          inquiry.travelType === "Inbound"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]"
                            : "bg-blue-50 text-blue-700 border-blue-200 text-[10px]"
                        }
                      >
                        {inquiry.travelType} Tour
                      </Badge>
                    </div>
                  ) : null}

                  {inquiry.packageName ? (
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold block">Selected Package</span>
                      <span className="font-bold text-brand-blue">{inquiry.packageName}</span>
                    </div>
                  ) : null}

                  {inquiry.destination ? (
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold block">Destination / Route</span>
                      <span className="font-medium text-foreground">
                        {inquiry.destination}
                        {inquiry.country ? ` (${inquiry.country})` : ""}
                      </span>
                    </div>
                  ) : null}

                  {/* Tour specific details */}
                  {inquiry.travelDate ? (
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold block">Preferred Travel Date</span>
                      <span className="font-medium text-foreground">{inquiry.travelDate}</span>
                    </div>
                  ) : null}

                  {inquiry.travelers ? (
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold block">Number of Travelers</span>
                      <span className="font-medium text-foreground">{inquiry.travelers} Traveler(s)</span>
                    </div>
                  ) : null}

                  {inquiry.duration ? (
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold block">Package Duration</span>
                      <span className="font-medium text-foreground">{inquiry.duration}</span>
                    </div>
                  ) : null}

                  {inquiry.packagePrice != null ? (
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold block">Package Price Reference</span>
                      <span className="font-extrabold text-navy dark:text-foreground">
                        {inquiry.packageCurrency || "LKR"} {inquiry.packagePrice.toLocaleString()}
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Customer Requirements Section */}
            <div className="space-y-2 rounded-2xl border border-border/70 bg-card p-5 shadow-2xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-navy dark:text-foreground pb-2 border-b border-border/50 flex items-center gap-2">
                <FileText className="size-4 text-brand-blue" />
                Customer Requirements &amp; Special Requests
              </h3>
              {inquiry.additionalRequirements ? (
                <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap pt-1 font-medium">
                  {inquiry.additionalRequirements}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground italic pt-1">
                  No additional special requirements provided in the initial form submission.
                </p>
              )}
            </div>

            {/* Documents & Attachments */}
            <div className="space-y-2 rounded-2xl border border-border/70 bg-card p-5 shadow-2xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-navy dark:text-foreground pb-2 border-b border-border/50 flex items-center gap-2">
                <FileSpreadsheet className="size-4 text-brand-blue" />
                Uploaded Documents &amp; Attachments
              </h3>
              {inquiry.documents && inquiry.documents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {inquiry.documents.map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/20 text-xs"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <FileText className="size-4 text-brand-blue shrink-0" />
                        <span className="font-semibold truncate">{doc}</span>
                      </div>
                      <a href={doc} target="_blank" rel="noopener noreferrer" download>
                        <Button size="sm" variant="ghost" className="h-7 text-xs text-brand-blue gap-1">
                          <Download className="size-3" />
                          Download
                        </Button>
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground italic pt-1">No documents attached.</p>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Email Customer Composer */}
        {activeTab === "reply" && (
          <form onSubmit={handleSend} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4 bg-card">
            <div className="p-3.5 bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/50 rounded-xl text-xs text-brand-blue space-y-0.5">
              <p className="font-bold flex items-center gap-1.5">
                <Mail className="size-3.5" />
                Customer Response Dispatcher
              </p>
              <p className="text-[11px] text-muted-foreground">
                Composing direct email reply for #{inquiry.referenceNumber}. The customer&apos;s email is loaded automatically.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Recipient Email (Customer)</Label>
                <Input
                  value={inquiry.customerEmail}
                  disabled
                  className="h-9 text-xs bg-muted/60 font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Sender Display Name</Label>
                <Input
                  value={replySender}
                  onChange={(e) => setReplySender(e.target.value)}
                  className="h-9 text-xs bg-background font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Subject Line</Label>
              <Input
                value={replySubject}
                onChange={(e) => setReplySubject(e.target.value)}
                className="h-9 text-xs bg-background font-medium"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Message Narrative</Label>
              <Textarea
                rows={9}
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                className="text-xs leading-relaxed bg-background"
                required
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/60">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setActiveTab("details")}
                className="text-xs text-muted-foreground"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSending}
                className="bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-semibold gap-1.5 h-9 px-4 shadow-sm"
              >
                {isSending ? (
                  <span>Dispatching...</span>
                ) : (
                  <>
                    <Send className="size-3.5" />
                    <span>Send Email Response</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        )}

        {/* Tab 3: Communication History Log */}
        {activeTab === "history" && (
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4 bg-slate-50/40 dark:bg-card/40">
            {/* Initial Inquiry Message */}
            <div className="rounded-2xl border border-border/70 bg-card p-5 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between border-b border-border/50 pb-2">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold text-navy dark:text-foreground">
                    Initial Customer Request from {inquiry.customerName}
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground font-mono">{inquiry.submittedDate}</span>
              </div>
              <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap">
                {inquiry.additionalRequirements || `Submitted interest in ${inquiry.packageName || inquiry.inquiryType} (${inquiry.destination || "General"}).`}
              </p>
            </div>

            {/* Admin Replies Timeline */}
            {inquiry.replyHistory && inquiry.replyHistory.length > 0 ? (
              inquiry.replyHistory.map((rep) => (
                <div
                  key={rep.id}
                  className="rounded-2xl border border-blue-200/80 bg-blue-50/30 dark:bg-blue-950/20 p-5 space-y-2 ml-4 sm:ml-8 shadow-2xs"
                >
                  <div className="flex items-center justify-between border-b border-blue-200/60 pb-2">
                    <div className="flex items-center gap-2">
                      <Reply className="size-3.5 text-brand-blue" />
                      <span className="text-xs font-bold text-brand-blue">
                        Admin Reply by {rep.sender} ({rep.senderEmail})
                      </span>
                    </div>
                    <span className="text-[10px] text-muted-foreground font-mono">{rep.sentAt}</span>
                  </div>
                  <p className="text-xs font-semibold text-navy dark:text-foreground">{rep.subject}</p>
                  <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap">{rep.message}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground italic text-center py-6">
                No outbound replies logged yet. Use the &quot;Email Customer&quot; tab to send and log communications.
              </p>
            )}
          </div>
        )}

        {/* Tab 4: Tour Review (Sections 11, 12, 13) */}
        {activeTab === "review" && isTourInquiry && (
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-5 bg-card">
            <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/50 space-y-1">
              <h4 className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                <Star className="size-4 text-amber-500 fill-amber-500" />
                Tour Package Customer Review Management
              </h4>
              <p className="text-[11px] text-muted-foreground">
                Reviews are strictly restricted to Tour Packages. Approved reviews display publicly on the package detail page.
              </p>
            </div>

            {linkedReview ? (
              <div className="space-y-4 rounded-2xl border border-border p-5 bg-muted/20">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground block">Package</span>
                    <span className="font-bold text-xs text-navy dark:text-foreground">{linkedReview.packageName}</span>
                  </div>
                  <Badge
                    className={
                      linkedReview.status === "Approved"
                        ? "bg-emerald-600 text-white text-[10px]"
                        : linkedReview.status === "Pending"
                          ? "bg-amber-600 text-white text-[10px]"
                          : "bg-slate-600 text-white text-[10px]"
                    }
                  >
                    {linkedReview.status}
                  </Badge>
                </div>

                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`size-4 ${
                        i < linkedReview.rating ? "fill-amber-500 text-amber-500" : "text-slate-300"
                      }`}
                    />
                  ))}
                  <span className="text-xs font-bold text-navy dark:text-foreground ml-1.5">
                    {linkedReview.rating} out of 5 stars
                  </span>
                </div>

                {linkedReview.reviewTitle ? (
                  <p className="text-xs font-bold text-navy dark:text-foreground">{linkedReview.reviewTitle}</p>
                ) : null}

                <p className="text-xs text-foreground leading-relaxed bg-background p-3 rounded-xl border border-border/70">
                  {linkedReview.reviewText}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <span className="text-[10px] text-muted-foreground font-mono">
                    Submitted on {linkedReview.createdAt} by {linkedReview.customerName}
                  </span>

                  <div className="flex items-center gap-2">
                    {linkedReview.status !== "Approved" && (
                      <Button
                        size="sm"
                        onClick={() => handleUpdateReviewStatus("Approved")}
                        className="h-8 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        <Check className="size-3.5 mr-1" />
                        Approve Review
                      </Button>
                    )}
                    {linkedReview.status !== "Rejected" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUpdateReviewStatus("Rejected")}
                        className="h-8 text-xs text-amber-700 hover:bg-amber-50"
                      >
                        Reject
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-muted-foreground border border-dashed border-border rounded-2xl">
                <Star className="size-8 text-muted-foreground/40 mx-auto mb-2" />
                <p className="text-xs font-semibold text-navy dark:text-foreground">No customer review submitted yet for this package inquiry.</p>
                <p className="text-[11px] text-muted-foreground max-w-sm mx-auto mt-0.5">
                  When the customer submits a testimonial or rating for &quot;{inquiry.packageName || "this tour"}&quot;, it will appear here for admin moderation.
                </p>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
