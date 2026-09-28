"use client";

import {
  BedDouble,
  Calendar,
  Car,
  CheckCircle2,
  Clock,
  Compass,
  FileUp,
  Globe2,
  Mail,
  MapPin,
  Palmtree,
  Phone,
  Plane,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Upload,
  Users,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
  InquiryType,
  PublicTravelInquiryFormData,
  TravelPackage,
} from "@/components/admin-travel/types";
import { useTravelStore } from "@/lib/storage/travel-store";

export interface PublicTravelInquiryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultPackage?: TravelPackage | null;
  defaultInquiryType?: InquiryType;
  defaultDestination?: string;
  mode?: "inquiry" | "customize";
  onSuccess?: () => void;
}

const DEFAULT_FORM: PublicTravelInquiryFormData = {
  fullName: "",
  email: "",
  contactNumber: "",
  whatsappNumber: "",
  inquiryType: "Inbound Tour",
  selectedPackage: "",
  destination: "",
  preferredTravelDate: "",
  travelers: 2,
  additionalRequirements: "",
  documents: [],
};

const ACCOMMODATION_OPTIONS = [
  "5-Star Luxury & Heritage Boutique Hotels",
  "4-Star Premium Resorts & City Hotels",
  "3-Star Comfortable Stays",
  "Private Villas & Tea Bungalows",
  "Eco Lodges & Safari Camps",
];

const TRANSPORT_OPTIONS = [
  "Private Air-Conditioned Sedan (1-3 Pax)",
  "Executive Luxury Van (4-7 Pax)",
  "Tourist Mini Coach (8-15 Pax)",
  "Large Luxury Coach (16+ Pax)",
  "Scenic Train Tickets + Chauffeur Connections",
];

const INTEREST_OPTIONS = [
  "Ancient Heritage & Temples",
  "Wildlife & Leopard Safaris",
  "Hill Country & Tea Plantations",
  "Golden Beaches & Coastlines",
  "Whale Watching & Marine Life",
  "Adventure & Water Sports",
  "Ayurveda & Spa Wellness",
  "Culinary & Village Tours",
];

export function PublicTravelInquiryModal({
  open,
  onOpenChange,
  defaultPackage,
  defaultInquiryType = "Inbound Tour",
  defaultDestination = "",
  mode = "inquiry",
  onSuccess,
}: PublicTravelInquiryModalProps) {
  const { submitInquiry } = useTravelStore();
  const [formData, setFormData] = useState<PublicTravelInquiryFormData>(DEFAULT_FORM);
  const [accommodationPref, setAccommodationPref] = useState(ACCOMMODATION_OPTIONS[0]);
  const [transportPref, setTransportPref] = useState(TRANSPORT_OPTIONS[0]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setSubmittedRef(null);
      setError("");
      setUploadedFiles([]);
      setSelectedInterests([]);

      const inqType: InquiryType = defaultPackage
        ? defaultPackage.travelType === "Outbound"
          ? "Outbound Tour"
          : "Inbound Tour"
        : defaultInquiryType;

      setFormData({
        fullName: "",
        email: "",
        contactNumber: "",
        whatsappNumber: "",
        inquiryType: inqType,
        selectedPackage: defaultPackage?.name || "",
        destination:
          defaultPackage?.destination ||
          defaultDestination ||
          (inqType === "Inbound Tour" ? "Sri Lanka" : ""),
        preferredTravelDate: "",
        travelers: 2,
        additionalRequirements: "",
        documents: [],
      });
    }
  }, [open, defaultPackage, defaultInquiryType, defaultDestination]);

  const updateField = <K extends keyof PublicTravelInquiryFormData>(
    field: K,
    value: PublicTravelInquiryFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest],
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const names = Array.from(files).map((f) => f.name);
    setUploadedFiles((prev) => [...prev, ...names]);
    updateField("documents", [...(formData.documents || []), ...names]);
  };

  const handleRemoveFile = (index: number) => {
    const filtered = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(filtered);
    updateField("documents", filtered);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.contactNumber.trim()) {
      setError("Please fill in your full name, email address, and contact number.");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");

    // Build combined requirements string including preferences
    const extraDetails = [
      formData.additionalRequirements?.trim(),
      accommodationPref ? `Accommodation: ${accommodationPref}` : null,
      transportPref ? `Transport: ${transportPref}` : null,
      selectedInterests.length > 0 ? `Interests: ${selectedInterests.join(", ")}` : null,
    ]
      .filter(Boolean)
      .join("\n\n");

    const payload: PublicTravelInquiryFormData = {
      ...formData,
      additionalRequirements: extraDetails,
    };

    const result = submitInquiry(payload);
    setSubmittedRef(result.referenceNumber);
    toast.success("Travel request received successfully!");
    if (onSuccess) onSuccess();
  };

  const isInbound = defaultPackage
    ? defaultPackage.travelType === "Inbound"
    : formData.inquiryType === "Inbound Tour";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl w-[95vw] max-h-[92vh] flex flex-col p-0 rounded-3xl shadow-2xl bg-white border border-slate-200 overflow-hidden">
        {submittedRef ? (
          /* ========================================================================= */
          /* SUCCESS STATE VIEW */
          /* ========================================================================= */
          <div className="p-8 sm:p-12 flex flex-col items-center text-center space-y-6 bg-white overflow-y-auto">
            <div className="flex size-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-inner">
              <CheckCircle2 className="size-12" />
            </div>

            <div className="space-y-2">
              <Badge className="bg-emerald-600 text-white font-mono text-xs px-3.5 py-1">
                Ref #{submittedRef}
              </Badge>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
                Travel Request Received Successfully!
              </h3>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
                Thank you for reaching out to Miracle International. Our dedicated travel desk has
                received your travel preferences and will get back to you with a customized
                itinerary and quote within 24 hours.
              </p>
            </div>

            <div className="w-full max-w-md rounded-2xl bg-slate-50 border border-slate-200 p-5 text-xs space-y-2.5 text-left">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-muted-foreground">Traveler Name:</span>
                <span className="font-bold text-ink">{formData.fullName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-muted-foreground">Travel Type:</span>
                <span className="font-bold text-brand-blue">{formData.inquiryType}</span>
              </div>
              {formData.selectedPackage ? (
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-muted-foreground">Selected Package:</span>
                  <span className="font-bold text-ink">{formData.selectedPackage}</span>
                </div>
              ) : null}
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Contact Email:</span>
                <span className="font-bold text-ink">{formData.email}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-blue-50/60 px-4 py-2.5 rounded-xl border border-blue-100">
              <ShieldCheck className="size-4 text-brand-blue shrink-0" />
              <span>
                No online payment or registration required. All bookings are managed personally by our tour consultants.
              </span>
            </div>

            <Button
              onClick={() => onOpenChange(false)}
              className="bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs px-10 h-11 rounded-xl shadow-md"
            >
              Done / Return to Website
            </Button>
          </div>
        ) : (
          /* ========================================================================= */
          /* FORM VIEW */
          /* ========================================================================= */
          <>
            <DialogHeader className="p-6 pb-4 border-b border-slate-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue shrink-0 shadow-xs">
                    <Palmtree className="size-5" />
                  </div>
                  <div>
                    <DialogTitle className="text-xl sm:text-2xl font-extrabold text-navy tracking-tight">
                      Send Travel Inquiry &amp; Trip Details
                    </DialogTitle>
                    <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                      No payment or account required. Share your requirements and our travel desk will craft your perfect itinerary.
                    </DialogDescription>
                  </div>
                </div>
              </div>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-white">
              {error ? (
                <div className="rounded-xl bg-red-50 border border-red-200 p-3.5 text-xs font-semibold text-brand-red">
                  {error}
                </div>
              ) : null}

              {/* Package Banner if prefilled */}
              {defaultPackage ? (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-brand-blue/20 shadow-xs">
                  <div className="flex items-center gap-3.5">
                    {defaultPackage.coverImage ? (
                      <div className="relative size-16 sm:size-18 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={defaultPackage.coverImage}
                          alt={defaultPackage.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : null}
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={
                            isInbound
                              ? "bg-emerald-600 text-white font-bold text-[10px]"
                              : "bg-blue-600 text-white font-bold text-[10px]"
                          }
                        >
                          {isInbound ? "Inbound Tour" : "Outbound Tour"}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1 font-mono">
                          <Clock className="size-3 text-brand-blue" />
                          {defaultPackage.duration}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-navy mt-1 line-clamp-1">
                        {defaultPackage.name}
                      </h4>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin className="size-3 text-sky-500 shrink-0" />
                        <span>{defaultPackage.destination}</span>
                      </p>
                    </div>
                  </div>

                  <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block">
                      Package Price
                    </span>
                    <span className="text-base font-extrabold text-navy">
                      {defaultPackage.price != null
                        ? `${defaultPackage.currency === "LKR" ? "LKR" : "USD"} ${defaultPackage.price.toLocaleString()}`
                        : "Price on Request"}
                    </span>
                  </div>
                </div>
              ) : null}

              {/* 2-Column Form Layout on Desktop */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* ── LEFT COLUMN: Personal & Contact Details ── */}
                <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
                  <div className="flex items-center gap-2 text-brand-blue pb-2 border-b border-slate-100">
                    <Users className="size-4" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-navy">
                      1. Personal &amp; Contact Details
                    </h3>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="inq-name" className="text-xs font-bold text-ink">
                      Full Name <span className="text-brand-red">*</span>
                    </Label>
                    <Input
                      id="inq-name"
                      placeholder="e.g. Johnathan Smith"
                      value={formData.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                      className="h-10 text-xs bg-white border-slate-200"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1.5">
                      <Label htmlFor="inq-email" className="text-xs font-bold text-ink">
                        Email Address <span className="text-brand-red">*</span>
                      </Label>
                      <Input
                        id="inq-email"
                        type="email"
                        placeholder="e.g. name@example.com"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        className="h-10 text-xs bg-white border-slate-200"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="inq-phone" className="text-xs font-bold text-ink">
                        Contact Phone <span className="text-brand-red">*</span>
                      </Label>
                      <Input
                        id="inq-phone"
                        type="tel"
                        placeholder="e.g. +94 77 123 4567"
                        value={formData.contactNumber}
                        onChange={(e) => updateField("contactNumber", e.target.value)}
                        className="h-10 text-xs bg-white border-slate-200"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1.5">
                      <Label htmlFor="inq-whatsapp" className="text-xs font-bold text-ink">
                        WhatsApp Number <span className="text-[10px] text-muted-foreground font-normal">(Optional)</span>
                      </Label>
                      <Input
                        id="inq-whatsapp"
                        type="tel"
                        placeholder="e.g. +94 77 123 4567"
                        value={formData.whatsappNumber || ""}
                        onChange={(e) => updateField("whatsappNumber", e.target.value)}
                        className="h-10 text-xs bg-white border-slate-200"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="inq-type" className="text-xs font-bold text-ink">
                        Tour Type <span className="text-brand-red">*</span>
                      </Label>
                      <Select
                        value={formData.inquiryType}
                        onValueChange={(val) => updateField("inquiryType", val as InquiryType)}
                      >
                        <SelectTrigger id="inq-type" className="h-10 text-xs bg-white border-slate-200">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-slate-200">
                          <SelectItem value="Inbound Tour">Inbound Tour (Sri Lanka Visit)</SelectItem>
                          <SelectItem value="Outbound Tour">Outbound Tour (International Travel)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* ── RIGHT COLUMN: Travel Plan & Dates ── */}
                <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
                  <div className="flex items-center gap-2 text-brand-blue pb-2 border-b border-slate-100">
                    <Compass className="size-4" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-navy">
                      2. Travel Schedule &amp; Party
                    </h3>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="inq-dest" className="text-xs font-bold text-ink">
                      Destination(s) / Preferred Places
                    </Label>
                    <Input
                      id="inq-dest"
                      placeholder="e.g. Sigiriya, Kandy, Nuwara Eliya, Galle / Dubai, Maldives"
                      value={formData.destination}
                      onChange={(e) => updateField("destination", e.target.value)}
                      className="h-10 text-xs bg-white border-slate-200"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1.5">
                      <Label htmlFor="inq-date" className="text-xs font-bold text-ink">
                        Preferred Travel Date
                      </Label>
                      <Input
                        id="inq-date"
                        type="date"
                        value={formData.preferredTravelDate}
                        onChange={(e) => updateField("preferredTravelDate", e.target.value)}
                        className="h-10 text-xs bg-white border-slate-200"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="inq-travelers" className="text-xs font-bold text-ink">
                        Total Travelers
                      </Label>
                      <Input
                        id="inq-travelers"
                        type="number"
                        min="1"
                        placeholder="e.g. 2 Adults, 1 Child"
                        value={formData.travelers}
                        onChange={(e) => updateField("travelers", e.target.value)}
                        className="h-10 text-xs bg-white border-slate-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-ink">Accommodation Preference</Label>
                    <Select value={accommodationPref} onValueChange={setAccommodationPref}>
                      <SelectTrigger className="h-10 text-xs bg-white border-slate-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-slate-200">
                        {ACCOMMODATION_OPTIONS.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

              </div>

              {/* ── CUSTOMIZATION & INTERESTS ── */}
              <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-brand-blue">
                    <Sparkles className="size-4 text-amber-500" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-navy">
                      3. Customization &amp; Preferences
                    </h3>
                  </div>
                  <span className="text-[11px] text-muted-foreground">Select options</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {INTEREST_OPTIONS.map((interest) => {
                    const isSelected = selectedInterests.includes(interest);
                    return (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`text-xs px-3.5 py-1.5 rounded-xl border transition-all font-medium ${
                          isSelected
                            ? "bg-brand-blue text-white border-brand-blue shadow-xs font-bold"
                            : "bg-white text-slate-700 border-slate-200 hover:border-brand-blue/50"
                        }`}
                      >
                        {interest}
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-ink">Transportation Preference</Label>
                    <Select value={transportPref} onValueChange={setTransportPref}>
                      <SelectTrigger className="h-10 text-xs bg-white border-slate-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-slate-200">
                        {TRANSPORT_OPTIONS.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-ink">Document Attachment (Optional)</Label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border border-dashed border-slate-300 hover:border-brand-blue rounded-xl h-10 px-3 flex items-center justify-between cursor-pointer transition-colors bg-white"
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <span className="text-xs text-muted-foreground truncate">
                        {uploadedFiles.length > 0
                          ? `${uploadedFiles.length} file(s) attached`
                          : "Upload notes / flight tickets (PDF, PNG, JPG)"}
                      </span>
                      <Upload className="size-4 text-brand-blue shrink-0 ml-2" />
                    </div>
                  </div>
                </div>

                {uploadedFiles.length > 0 ? (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {uploadedFiles.map((fn, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-xs font-mono border border-slate-200"
                      >
                        <FileUp className="size-3 text-brand-blue" />
                        <span className="truncate max-w-[160px]">{fn}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(idx)}
                          className="text-muted-foreground hover:text-brand-red ml-1"
                        >
                          <X className="size-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                ) : null}

                {/* Additional notes textarea */}
                <div className="space-y-1.5 pt-1">
                  <Label htmlFor="inq-reqs" className="text-xs font-bold text-ink">
                    Additional Requirements or Special Requests
                  </Label>
                  <Textarea
                    id="inq-reqs"
                    rows={3}
                    placeholder="Tell us any specific hotels, meal preferences, pacing requests, or celebrations..."
                    value={formData.additionalRequirements || ""}
                    onChange={(e) => updateField("additionalRequirements", e.target.value)}
                    className="text-xs bg-white border-slate-200"
                  />
                </div>
              </div>

              {/* Bottom Guarantee Banner */}
              <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs text-muted-foreground flex items-center gap-2.5">
                <ShieldCheck className="size-5 text-brand-blue shrink-0" />
                <span>
                  <strong>Miracle International Travel Guarantee:</strong> Our tour specialists will review your requirements and design a customized quote within 24 hours. Zero booking obligations.
                </span>
              </div>

              {/* Modal Action Footer */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-200 bg-white">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => onOpenChange(false)}
                  className="h-11 text-xs px-6 rounded-xl font-bold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  className="h-11 text-xs px-8 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold shadow-md gap-2"
                >
                  <Send className="size-3.5" />
                  Submit Travel Request
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
