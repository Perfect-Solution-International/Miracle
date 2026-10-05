"use client";

import {
  AlertCircle,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  DollarSign,
  Eye,
  FileText,
  Globe2,
  Image as ImageIcon,
  Info,
  Layers,
  Loader2,
  MapPin,
  MoveLeft,
  MoveRight,
  Palmtree,
  Percent,
  Plus,
  PlusCircle,
  Send,
  ShieldAlert,
  Sparkles,
  Star,
  Tag,
  Trash2,
  Upload,
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
  Currency,
  ItineraryDay,
  PackageHighlight,
  PackageOffer,
  PackageStatus,
  TravelPackage,
  TravelPackageFormData,
  TravelType,
} from "./types";
import { getPackageCoverImage } from "@/lib/travel/package-image-helper";

interface TravelPackageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: TravelPackageFormData, editId?: string) => void;
  editingPackage?: TravelPackage | null;
  defaultTravelType?: TravelType;
}

const PRESET_INCLUDED_OPTIONS = [
  "Accommodation",
  "Transportation",
  "Airport Transfer",
  "Sightseeing",
  "Guided Tours",
  "Activities",
  "Meals",
  "Other",
];

const DEFAULT_FORM: TravelPackageFormData = {
  name: "",
  travelType: "Inbound",
  destination: "",
  country: "Sri Lanka",
  duration: "",
  durationDays: null,
  durationNights: null,
  price: null,
  currency: "LKR",
  priceOnRequest: false,
  shortDescription: "",
  description: "",
  highlights: [],
  includedItems: [
    "Accommodation",
    "Transportation",
    "Airport Transfer",
    "Guided Tours",
  ],
  customIncludedItems: [],
  includedServices: "",
  accommodation: "",
  transportation: "",
  whatToExpect: "",
  whatToExpectImages: [],
  entryRequirements: "",
  visaInformation: "",
  visaNotes: "",
  offers: {
    enabled: false,
    title: "",
    description: "",
    offerType: "Percentage Discount",
    originalPrice: null,
    offerPrice: null,
    startDate: "",
    endDate: "",
    status: "Active",
  },
  itinerary: [],
  images: [],
  coverImage: "",
  status: "Active",
};

export function TravelPackageDialog({
  open,
  onOpenChange,
  onSubmit,
  editingPackage,
  defaultTravelType = "Inbound",
}: TravelPackageDialogProps) {
  const [formData, setFormData] = useState<TravelPackageFormData>(DEFAULT_FORM);
  const [priceInput, setPriceInput] = useState<string>("");
  const [customIncludedInput, setCustomIncludedInput] = useState<string>("");
  const [imageUrlInput, setImageUrlInput] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Highlight item temporary inputs
  const [highlightTitle, setHighlightTitle] = useState("");
  const [highlightDesc, setHighlightDesc] = useState("");
  const [highlightIcon, setHighlightIcon] = useState("");

  // Duration individual fields
  const [daysInput, setDaysInput] = useState<string>("");
  const [nightsInput, setNightsInput] = useState<string>("");

  // Upload States
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgressText, setUploadProgressText] = useState<string>("");
  const [uploadingDayIdx, setUploadingDayIdx] = useState<number | null>(null);
  const [isUploadingNewDayImage, setIsUploadingNewDayImage] = useState<boolean>(false);
  const [isUploadingCover, setIsUploadingCover] = useState<boolean>(false);

  // New Itinerary Day Input Temporary State
  const [newDayTitle, setNewDayTitle] = useState("");
  const [newDayLocation, setNewDayLocation] = useState("");
  const [newDayDesc, setNewDayDesc] = useState("");
  const [newDayImage, setNewDayImage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverFileInputRef = useRef<HTMLInputElement>(null);
  const isEditing = Boolean(editingPackage);

  // Determine current travel type (locked based on editing package or defaultTravelType)
  const lockedTravelType: TravelType = editingPackage
    ? editingPackage.travelType
    : defaultTravelType || "Inbound";

  useEffect(() => {
    if (editingPackage) {
      const travelType = editingPackage.travelType || lockedTravelType;
      const currency =
        travelType === "Outbound"
          ? "USD"
          : editingPackage.currency || "LKR";

      // Parse days/nights if present
      let days = editingPackage.durationDays ?? null;
      let nights = editingPackage.durationNights ?? null;
      if (days === null && editingPackage.duration) {
        const dMatch = editingPackage.duration.match(/(\d+)\s*Days?/i);
        const nMatch = editingPackage.duration.match(/(\d+)\s*Nights?/i);
        if (dMatch?.[1]) days = parseInt(dMatch[1], 10);
        if (nMatch?.[1]) nights = parseInt(nMatch[1], 10);
      }

      setFormData({
        name: editingPackage.name || "",
        travelType,
        destination: editingPackage.destination || "",
        country:
          editingPackage.country || (travelType === "Inbound" ? "Sri Lanka" : ""),
        duration: editingPackage.duration || "",
        durationDays: days,
        durationNights: nights,
        price: editingPackage.price ?? null,
        currency,
        priceOnRequest: Boolean(editingPackage.priceOnRequest || (editingPackage.price === null && !editingPackage.price)),
        shortDescription: editingPackage.shortDescription || "",
        description: editingPackage.description || "",
        highlights: editingPackage.highlights || [],
        itinerary: editingPackage.itinerary ? [...editingPackage.itinerary] : [],
        includedItems:
          editingPackage.includedItems && editingPackage.includedItems.length > 0
            ? editingPackage.includedItems
            : [
                "Accommodation",
                "Transportation",
                "Airport Transfer",
                "Guided Tours",
              ],
        customIncludedItems: editingPackage.customIncludedItems || [],
        includedServices: editingPackage.includedServices || "",
        accommodation: editingPackage.accommodation || "",
        transportation: editingPackage.transportation || "",
        whatToExpect: editingPackage.whatToExpect || "",
        whatToExpectImages: editingPackage.whatToExpectImages || [],
        entryRequirements: editingPackage.entryRequirements || "",
        visaInformation: editingPackage.visaInformation || "",
        visaNotes: editingPackage.visaNotes || "",
        offers: editingPackage.offers || {
          enabled: false,
          title: "",
          description: "",
          offerType: "Percentage Discount",
          originalPrice: null,
          offerPrice: null,
          startDate: "",
          endDate: "",
          status: "Active",
        },
        images: editingPackage.images || [],
        coverImage: editingPackage.coverImage || (editingPackage.images?.[0] ?? ""),
        status: editingPackage.status || "Active",
      });

      setPriceInput(editingPackage.price != null ? String(editingPackage.price) : "");
      setDaysInput(days ? String(days) : "");
      setNightsInput(nights ? String(nights) : "");
    } else {
      const isOutbound = lockedTravelType === "Outbound";
      setFormData({
        ...DEFAULT_FORM,
        travelType: lockedTravelType,
        country: isOutbound ? "" : "Sri Lanka",
        currency: isOutbound ? "USD" : "LKR",
      });
      setPriceInput("");
      setDaysInput("");
      setNightsInput("");
    }
    setError("");
    setCustomIncludedInput("");
    setImageUrlInput("");
    setHighlightTitle("");
    setHighlightDesc("");
    setHighlightIcon("");
    setNewDayTitle("");
    setNewDayLocation("");
    setNewDayDesc("");
    setNewDayImage("");
  }, [editingPackage, lockedTravelType, open]);

  const updateField = <K extends keyof TravelPackageFormData>(
    field: K,
    value: TravelPackageFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateOfferField = <K extends keyof PackageOffer>(
    field: K,
    value: PackageOffer[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      offers: {
        ...(prev.offers || { enabled: false }),
        [field]: value,
      },
    }));
  };

  // Helper to upload a single image to the backend server
  const uploadImageFile = async (file: File): Promise<string | null> => {
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
    if (!validTypes.includes(file.type)) {
      toast.error(`"${file.name}" is not a supported format. Please upload JPG, PNG, WebP, or AVIF.`);
      return null;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error(`"${file.name}" exceeds the 10MB maximum file size limit.`);
      return null;
    }

    const body = new FormData();
    body.append("file", file);

    try {
      const res = await fetch("/api/v1/travel/upload", {
        method: "POST",
        body,
      });
      const data = await res.json();
      if (res.ok && data.success && data.url) {
        return data.url as string;
      } else {
        toast.error(data.error || "Failed to upload image.");
        return null;
      }
    } catch (err) {
      console.error("Image upload error:", err);
      toast.error("Network error while connecting to upload server.");
      return null;
    }
  };

  // Handle Cover Image Upload
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingCover(true);
    const url = await uploadImageFile(file);
    if (url) {
      updateField("coverImage", url);
      // Ensure it's in images array too
      if (!formData.images.includes(url)) {
        updateField("images", [url, ...formData.images]);
      }
      toast.success("Package cover image updated.");
    }
    setIsUploadingCover(false);
    e.target.value = "";
  };

  // Duration synchronizer
  const handleDurationChange = (days: string, nights: string) => {
    setDaysInput(days);
    setNightsInput(nights);
    const dNum = days ? parseInt(days, 10) : null;
    const nNum = nights ? parseInt(nights, 10) : null;
    setFormData((prev) => {
      let formatted = prev.duration;
      if (dNum && nNum) {
        formatted = `${dNum} Day${dNum > 1 ? "s" : ""} / ${nNum} Night${nNum > 1 ? "s" : ""}`;
      } else if (dNum) {
        formatted = `${dNum} Day${dNum > 1 ? "s" : ""}`;
      }
      return {
        ...prev,
        durationDays: dNum,
        durationNights: nNum,
        duration: formatted,
      };
    });
  };

  // --- Highlights Management ---
  const handleAddHighlight = () => {
    if (!highlightTitle.trim()) return;
    const current = formData.highlights || [];
    const newHighlight: PackageHighlight = {
      title: highlightTitle.trim(),
      description: highlightDesc.trim() || undefined,
      icon: highlightIcon.trim() || undefined,
    };
    updateField("highlights", [...current, newHighlight]);
    setHighlightTitle("");
    setHighlightDesc("");
    setHighlightIcon("");
  };

  const handleRemoveHighlight = (index: number) => {
    const current = formData.highlights || [];
    updateField(
      "highlights",
      current.filter((_, i) => i !== index),
    );
  };

  // --- Day-by-Day Itinerary Management ---
  const handleAddItineraryDay = () => {
    if (!newDayTitle.trim() && !newDayDesc.trim()) {
      toast.error("Please provide at least a title or description for the day.");
      return;
    }
    const currentItinerary = formData.itinerary || [];
    const nextDayNum = currentItinerary.length + 1;

    const newDay: ItineraryDay = {
      day: nextDayNum,
      title: newDayTitle.trim() || `Day ${nextDayNum} Itinerary`,
      location: newDayLocation.trim() || undefined,
      description: newDayDesc.trim(),
      image: newDayImage.trim() || undefined,
    };

    updateField("itinerary", [...currentItinerary, newDay]);
    setNewDayTitle("");
    setNewDayLocation("");
    setNewDayDesc("");
    setNewDayImage("");
  };

  const handleNewDayImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingNewDayImage(true);
    const url = await uploadImageFile(file);
    if (url) {
      setNewDayImage(url);
      toast.success("Itinerary day photo uploaded.");
    }
    setIsUploadingNewDayImage(false);
    e.target.value = "";
  };

  const handleExistingDayImageUpload = async (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingDayIdx(idx);
    const url = await uploadImageFile(file);
    if (url) {
      handleUpdateDay(idx, { image: url });
      toast.success(`Day ${idx + 1} photo updated.`);
    }
    setUploadingDayIdx(null);
    e.target.value = "";
  };

  const handleUpdateDay = (index: number, updatedFields: Partial<ItineraryDay>) => {
    const current = [...(formData.itinerary || [])];
    if (current[index]) {
      current[index] = { ...current[index], ...updatedFields };
      updateField("itinerary", current);
    }
  };

  const handleDeleteDay = (index: number) => {
    const current = (formData.itinerary || []).filter((_, i) => i !== index);
    const renumbered = current.map((day, idx) => ({ ...day, day: idx + 1 }));
    updateField("itinerary", renumbered);
  };

  const handleMoveDay = (index: number, direction: "up" | "down") => {
    const current = [...(formData.itinerary || [])];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= current.length) return;

    const a = current[index];
    const b = current[targetIdx];
    if (!a || !b) return;

    current[index] = b;
    current[targetIdx] = a;

    const renumbered = current.map((day, idx) => ({ ...day, day: idx + 1 }));
    updateField("itinerary", renumbered);
  };

  // --- Included Items Management ---
  const handleToggleIncludedItem = (item: string) => {
    const current = formData.includedItems || [];
    if (current.includes(item)) {
      updateField(
        "includedItems",
        current.filter((i) => i !== item),
      );
    } else {
      updateField("includedItems", [...current, item]);
    }
  };

  const handleAddCustomIncluded = () => {
    const text = customIncludedInput.trim();
    if (!text) return;
    const current = formData.customIncludedItems || [];
    if (!current.includes(text)) {
      updateField("customIncludedItems", [...current, text]);
    }
    setCustomIncludedInput("");
  };

  const handleRemoveCustomIncluded = (index: number) => {
    const current = formData.customIncludedItems || [];
    updateField(
      "customIncludedItems",
      current.filter((_, i) => i !== index),
    );
  };

  // --- Images Management ---
  const handleAddImageUrl = () => {
    const trimmed = imageUrlInput.trim();
    if (!trimmed) return;
    const current = formData.images || [];
    const newImages = [...current, trimmed];
    updateField("images", newImages);
    if (!formData.coverImage) {
      updateField("coverImage", trimmed);
    }
    setImageUrlInput("");
    toast.success("Image URL added to gallery.");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList: File[] = Array.from(files);
    setIsUploading(true);
    const totalFiles = fileList.length;
    setUploadProgressText(`Uploading ${totalFiles} image${totalFiles > 1 ? "s" : ""} to storage...`);

    const uploadedUrls: string[] = [];
    for (let i = 0; i < totalFiles; i++) {
      const file = fileList[i];
      if (!file) continue;
      setUploadProgressText(`Uploading (${i + 1}/${totalFiles}) ${file.name}...`);
      const url = await uploadImageFile(file);
      if (url) {
        uploadedUrls.push(url);
      }
    }

    if (uploadedUrls.length > 0) {
      setFormData((prev) => {
        const updated = [...prev.images, ...uploadedUrls];
        return {
          ...prev,
          images: updated,
          coverImage: prev.coverImage || uploadedUrls[0],
        };
      });
      toast.success(`Successfully uploaded ${uploadedUrls.length} image(s).`);
    }

    setIsUploading(false);
    setUploadProgressText("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    const current = formData.images || [];
    const imageToRemove = current[index];
    const filtered = current.filter((_, i) => i !== index);
    let newCover = formData.coverImage;
    if (newCover === imageToRemove) {
      newCover = filtered.length > 0 ? filtered[0] : "";
    }
    setFormData((prev) => ({
      ...prev,
      images: filtered,
      coverImage: newCover,
    }));
  };

  const handleMoveImage = (index: number, direction: "left" | "right") => {
    const current = [...(formData.images || [])];
    const targetIdx = direction === "left" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= current.length) return;

    const a = current[index];
    const b = current[targetIdx];
    if (!a || !b) return;

    current[index] = b;
    current[targetIdx] = a;

    updateField("images", current);
  };

  const handleSetCover = (imgUrl: string) => {
    updateField("coverImage", imgUrl);
    toast.success("Primary cover image updated.");
  };

  // --- Final Form Submission with status parameter ---
  const handleSaveWithStatus = (statusToApply: PackageStatus) => {
    setError("");

    if (!formData.name.trim()) {
      setError("Please provide a Package Name.");
      return;
    }

    if (!formData.destination.trim()) {
      setError("Please specify at least one destination or route.");
      return;
    }

    if (!formData.duration.trim()) {
      setError("Please enter the package duration (e.g. 7 Days / 6 Nights).");
      return;
    }

    // Price handling
    let finalPrice: number | null = null;
    if (!formData.priceOnRequest && priceInput.trim() !== "") {
      const parsed = parseFloat(priceInput);
      if (isNaN(parsed) || parsed < 0) {
        setError("Please enter a valid non-negative number for package price.");
        return;
      }
      finalPrice = parsed;
    }

    // Currency rule: Outbound is USD only
    const finalCurrency: Currency =
      lockedTravelType === "Outbound" ? "USD" : formData.currency || "LKR";

    const payload: TravelPackageFormData = {
      ...formData,
      travelType: lockedTravelType,
      currency: finalCurrency,
      country:
        lockedTravelType === "Inbound"
          ? "Sri Lanka"
          : formData.country?.trim() || "",
      price: formData.priceOnRequest ? null : finalPrice,
      status: statusToApply,
      coverImage: formData.coverImage || formData.images[0] || "",
    };

    onSubmit(payload, editingPackage?.id);
    onOpenChange(false);
  };

  // Preview helper values
  const previewCover = formData.coverImage || formData.images[0] || getPackageCoverImage(formData);
  const parsedPriceNum =
    !formData.priceOnRequest && priceInput.trim() !== "" && !isNaN(Number(priceInput))
      ? Number(priceInput)
      : formData.price;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-[96vw] lg:w-[92vw] max-h-[94vh] flex flex-col p-0 rounded-2xl shadow-2xl bg-card border border-border/80 overflow-hidden">
        {/* Modal Header */}
        <DialogHeader className="p-6 pb-4 border-b border-border/70 bg-gradient-to-r from-slate-50 via-white to-blue-50/40 dark:from-slate-900/60 dark:via-card dark:to-slate-900/30 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
                  {lockedTravelType === "Inbound" ? <Palmtree className="size-4.5" /> : <Globe2 className="size-4.5" />}
                </div>
                <DialogTitle className="text-xl font-bold text-navy dark:text-foreground">
                  {isEditing ? `Edit ${lockedTravelType} Package` : `Create ${lockedTravelType} Package`}
                </DialogTitle>
                <Badge
                  variant="outline"
                  className={
                    formData.status === "Active"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-400 font-bold"
                      : formData.status === "Draft"
                        ? "bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/40 dark:text-amber-400 font-bold"
                        : "bg-muted text-muted-foreground font-bold"
                  }
                >
                  {formData.status}
                </Badge>
              </div>
              <DialogDescription className="text-xs text-muted-foreground mt-1">
                Configure {lockedTravelType.toLowerCase()} travel package specifications, pricing, itinerary, highlights, and media.
              </DialogDescription>
            </div>

            {/* Quick Status Pill */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto bg-muted/40 p-1 rounded-lg border border-border/60">
              <span className="text-[11px] font-medium text-muted-foreground px-2">Status:</span>
              <button
                type="button"
                onClick={() => updateField("status", "Active")}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                  formData.status === "Active"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Active
              </button>
              <button
                type="button"
                onClick={() => updateField("status", "Draft")}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                  formData.status === "Draft"
                    ? "bg-amber-600 text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Draft
              </button>
              <button
                type="button"
                onClick={() => updateField("status", "Inactive")}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                  formData.status === "Inactive"
                    ? "bg-slate-700 text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Inactive
              </button>
            </div>
          </div>
        </DialogHeader>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-slate-50/40 dark:bg-card/40">
          {error ? (
            <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-xs font-medium text-brand-red dark:bg-red-950/40 dark:border-red-900 flex items-center gap-2.5 shadow-sm">
              <AlertCircle className="size-4.5 shrink-0" />
              <span>{error}</span>
            </div>
          ) : null}

          {/* ========================================================================= */}
          {/* SECTION 01 — BASIC INFORMATION */}
          {/* ========================================================================= */}
          <div className="bg-card rounded-xl border border-border/70 p-5 md:p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2.5 border-b border-border/50 pb-3">
              <div className="flex size-6 items-center justify-center rounded-md bg-brand-blue/10 text-brand-blue font-bold text-xs">
                01
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy dark:text-foreground">
                Section 01 — Basic Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {/* Package Name */}
              <div className="md:col-span-2 space-y-1.5">
                <Label htmlFor="pkg-name" className="text-xs font-semibold flex items-center justify-between">
                  <span>Package Name <span className="text-brand-red">*</span></span>
                  <span className="text-[11px] text-muted-foreground font-normal">Primary title for public package cards and detail pages</span>
                </Label>
                <Input
                  id="pkg-name"
                  placeholder={lockedTravelType === "Inbound" ? "e.g. Sri Lanka Signature Heritage & Wildlife Expedition" : "e.g. Wonders of Dubai & Abu Dhabi Luxury Experience"}
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="h-10 text-xs font-medium bg-background"
                  required
                />
              </div>

              {/* Travel Type (Locked) */}
              <div className="space-y-1.5">
                <Label htmlFor="pkg-type" className="text-xs font-semibold flex items-center justify-between">
                  <span>Travel Type <span className="text-brand-red">*</span></span>
                  <span className="text-[11px] text-brand-blue font-medium">(Locked to this section)</span>
                </Label>
                <div className="h-10 px-3 py-2 rounded-md border border-border bg-muted/60 text-xs font-semibold text-navy dark:text-foreground flex items-center gap-2">
                  {lockedTravelType === "Inbound" ? (
                    <>
                      <Palmtree className="size-4 text-emerald-600" />
                      <span>Inbound (Sri Lanka Tours)</span>
                    </>
                  ) : (
                    <>
                      <Globe2 className="size-4 text-blue-600" />
                      <span>Outbound (International Tours)</span>
                    </>
                  )}
                </div>
              </div>

              {/* Country */}
              <div className="space-y-1.5">
                <Label htmlFor="pkg-country" className="text-xs font-semibold">
                  Country {lockedTravelType === "Inbound" ? "(Default: Sri Lanka)" : "(Destination Country)"}
                </Label>
                <Input
                  id="pkg-country"
                  placeholder={lockedTravelType === "Inbound" ? "Sri Lanka" : "e.g. United Arab Emirates, Maldives, Thailand"}
                  value={formData.country || ""}
                  onChange={(e) => updateField("country", e.target.value)}
                  className="h-10 text-xs bg-background font-medium"
                  disabled={lockedTravelType === "Inbound"}
                />
              </div>

              {/* Destination */}
              <div className="space-y-1.5">
                <Label htmlFor="pkg-dest" className="text-xs font-semibold">
                  Destination(s) <span className="text-brand-red">*</span>
                </Label>
                <Input
                  id="pkg-dest"
                  placeholder={lockedTravelType === "Inbound" ? "e.g. Sigiriya, Kandy, Nuwara Eliya & Yala" : "e.g. Dubai, Abu Dhabi, Desert Safari"}
                  value={formData.destination}
                  onChange={(e) => updateField("destination", e.target.value)}
                  className="h-10 text-xs bg-background font-medium"
                  required
                />
              </div>

              {/* Duration (Days & Nights) */}
              <div className="space-y-1.5">
                <Label htmlFor="pkg-dur" className="text-xs font-semibold flex items-center justify-between">
                  <span>Duration <span className="text-brand-red">*</span></span>
                  <span className="text-[11px] text-muted-foreground font-normal">e.g. 7 Days / 6 Nights</span>
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    min="1"
                    placeholder="Days (e.g. 7)"
                    value={daysInput}
                    onChange={(e) => handleDurationChange(e.target.value, nightsInput)}
                    className="h-10 text-xs bg-background font-medium"
                  />
                  <Input
                    type="number"
                    min="0"
                    placeholder="Nights (e.g. 6)"
                    value={nightsInput}
                    onChange={(e) => handleDurationChange(daysInput, e.target.value)}
                    className="h-10 text-xs bg-background font-medium"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div className="md:col-span-2 space-y-1.5">
                <Label htmlFor="pkg-short-desc" className="text-xs font-semibold">
                  Short Description (Card Summary)
                </Label>
                <Input
                  id="pkg-short-desc"
                  placeholder="One-sentence highlight shown on package cards"
                  value={formData.shortDescription}
                  onChange={(e) => updateField("shortDescription", e.target.value)}
                  className="h-10 text-xs bg-background"
                />
              </div>

              {/* Full Description */}
              <div className="md:col-span-2 space-y-1.5">
                <Label htmlFor="pkg-desc" className="text-xs font-semibold">
                  Full Package Overview &amp; Narrative
                </Label>
                <Textarea
                  id="pkg-desc"
                  rows={4}
                  placeholder="Comprehensive description for the package detail page covering milestones, scenic landscapes, culture, and highlights..."
                  value={formData.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  className="text-xs leading-relaxed bg-background min-h-[100px]"
                />
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 02 — PRICING */}
          {/* ========================================================================= */}
          <div className="bg-card rounded-xl border border-border/70 p-5 md:p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2.5 border-b border-border/50 pb-3">
              <div className="flex size-6 items-center justify-center rounded-md bg-brand-blue/10 text-brand-blue font-bold text-xs">
                02
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy dark:text-foreground">
                Section 02 — Pricing
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {/* Price on Request Toggle */}
              <div className="md:col-span-2 flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border/60">
                <input
                  type="checkbox"
                  id="price-on-request"
                  checked={Boolean(formData.priceOnRequest)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    updateField("priceOnRequest", checked);
                    if (checked) {
                      setPriceInput("");
                    }
                  }}
                  className="size-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                />
                <Label htmlFor="price-on-request" className="text-xs font-semibold cursor-pointer">
                  Price on Request <span className="text-muted-foreground font-normal">(Package has no fixed price; display &quot;Price on Request&quot;)</span>
                </Label>
              </div>

              {!formData.priceOnRequest ? (
                <>
                  {/* Currency */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">
                      Currency {lockedTravelType === "Outbound" ? "(USD ONLY)" : "(LKR or USD)"}
                    </Label>
                    {lockedTravelType === "Outbound" ? (
                      <div className="h-10 px-3 py-2 rounded-md border border-border bg-muted/60 text-xs font-bold text-navy dark:text-foreground flex items-center gap-2">
                        <span>USD ($) — International Outbound Standard</span>
                      </div>
                    ) : (
                      <Select
                        value={formData.currency || "LKR"}
                        onValueChange={(val) => updateField("currency", val as Currency)}
                      >
                        <SelectTrigger className="h-10 text-xs bg-background font-bold text-navy dark:text-foreground">
                          <SelectValue placeholder="Currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="LKR">LKR (Rs) — Sri Lankan Rupee</SelectItem>
                          <SelectItem value="USD">USD ($) — US Dollar</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>

                  {/* Package Price */}
                  <div className="space-y-1.5">
                    <Label htmlFor="pkg-price" className="text-xs font-semibold">
                      Package Price ({formData.currency || (lockedTravelType === "Inbound" ? "LKR" : "USD")})
                    </Label>
                    <Input
                      id="pkg-price"
                      type="number"
                      min="0"
                      step="any"
                      placeholder={lockedTravelType === "Inbound" ? "e.g. 185000" : "e.g. 1450"}
                      value={priceInput}
                      onChange={(e) => setPriceInput(e.target.value)}
                      className="h-10 text-xs bg-background font-bold"
                    />
                  </div>
                </>
              ) : null}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 03 — PACKAGE COVER IMAGE */}
          {/* ========================================================================= */}
          <div className="bg-card rounded-xl border border-border/70 p-5 md:p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2.5 border-b border-border/50 pb-3">
              <div className="flex size-6 items-center justify-center rounded-md bg-brand-blue/10 text-brand-blue font-bold text-xs">
                03
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy dark:text-foreground">
                Section 03 — Package Cover Image
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {/* Image Preview */}
              <div className="md:col-span-1">
                <div className="aspect-video w-full rounded-xl overflow-hidden border border-border/80 bg-muted relative group">
                  {formData.coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={formData.coverImage}
                      alt="Cover Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground p-4 text-center">
                      <ImageIcon className="size-8 mb-1.5 opacity-50" />
                      <span className="text-xs font-medium">No cover image set</span>
                    </div>
                  )}
                  {isUploadingCover ? (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs gap-2">
                      <Loader2 className="size-4 animate-spin" />
                      <span>Uploading...</span>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Upload & Actions */}
              <div className="md:col-span-2 space-y-3">
                <p className="text-xs text-muted-foreground">
                  The cover image is permanently uploaded to the server and displayed as the primary banner on cards and detail pages.
                </p>
                <div className="flex flex-wrap items-center gap-2.5">
                  <input
                    ref={coverFileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    className="hidden"
                    onChange={handleCoverUpload}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => coverFileInputRef.current?.click()}
                    disabled={isUploadingCover}
                    className="h-9 text-xs gap-1.5 font-semibold text-brand-blue border-brand-blue/30 hover:bg-brand-blue/5"
                  >
                    <Upload className="size-3.5" />
                    {formData.coverImage ? "Replace Cover Image" : "Upload Cover Image"}
                  </Button>

                  {formData.coverImage ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => updateField("coverImage", "")}
                      className="h-9 text-xs text-brand-red hover:bg-red-50 hover:text-brand-red"
                    >
                      <Trash2 className="size-3.5 mr-1" />
                      Remove Image
                    </Button>
                  ) : null}
                </div>

                <div className="pt-2">
                  <Label className="text-[11px] text-muted-foreground">Or provide direct image URL:</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      placeholder="https://..."
                      value={formData.coverImage || ""}
                      onChange={(e) => updateField("coverImage", e.target.value)}
                      className="h-8.5 text-xs bg-background"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 04 — PACKAGE HIGHLIGHTS */}
          {/* ========================================================================= */}
          <div className="bg-card rounded-xl border border-border/70 p-5 md:p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2.5 border-b border-border/50 pb-3">
              <div className="flex size-6 items-center justify-center rounded-md bg-brand-blue/10 text-brand-blue font-bold text-xs">
                04
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy dark:text-foreground">
                Section 04 — Package Highlights
              </h3>
            </div>

            {/* Existing Highlights */}
            {formData.highlights && formData.highlights.length > 0 ? (
              <div className="space-y-2">
                {formData.highlights.map((hl, idx) => {
                  const title = typeof hl === "string" ? hl : hl.title;
                  const desc = typeof hl === "object" ? hl.description : null;
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg border border-border/70 bg-background"
                    >
                      <div className="flex items-center gap-2.5">
                        <Sparkles className="size-4 text-brand-blue shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-navy dark:text-foreground">{title}</p>
                          {desc ? <p className="text-[11px] text-muted-foreground">{desc}</p> : null}
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveHighlight(idx)}
                        className="size-8 p-0 text-muted-foreground hover:text-brand-red"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic">No highlights added yet. Add key experience bullet points below.</p>
            )}

            {/* Add Highlight Form */}
            <div className="p-4 rounded-xl border border-dashed border-border bg-muted/20 space-y-3">
              <p className="text-xs font-semibold text-navy dark:text-foreground">Add New Highlight</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  placeholder="Highlight Title (e.g. Scenic Tea Country Train Ride)"
                  value={highlightTitle}
                  onChange={(e) => setHighlightTitle(e.target.value)}
                  className="h-8.5 text-xs bg-background"
                />
                <Input
                  placeholder="Short description (optional)"
                  value={highlightDesc}
                  onChange={(e) => setHighlightDesc(e.target.value)}
                  className="h-8.5 text-xs bg-background"
                />
              </div>
              <Button
                type="button"
                size="sm"
                onClick={handleAddHighlight}
                disabled={!highlightTitle.trim()}
                className="h-8 text-xs font-semibold bg-brand-blue hover:bg-brand-blue-dark text-white gap-1.5"
              >
                <Plus className="size-3.5" />
                Add Highlight
              </Button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 05 — ITINERARY */}
          {/* ========================================================================= */}
          <div className="bg-card rounded-xl border border-border/70 p-5 md:p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2.5 border-b border-border/50 pb-3">
              <div className="flex size-6 items-center justify-center rounded-md bg-brand-blue/10 text-brand-blue font-bold text-xs">
                05
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy dark:text-foreground">
                Section 05 — Itinerary
              </h3>
            </div>

            {/* List of Days */}
            {formData.itinerary && formData.itinerary.length > 0 ? (
              <div className="space-y-4">
                {formData.itinerary.map((day, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-border/70 bg-background space-y-3 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-brand-blue text-white text-xs font-bold">
                          Day {day.day || idx + 1}
                        </span>
                        <span className="text-xs font-bold text-navy dark:text-foreground">{day.title}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          disabled={idx === 0}
                          onClick={() => handleMoveDay(idx, "up")}
                          className="size-7 p-0"
                          title="Move Up"
                        >
                          <ArrowUp className="size-3.5" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          disabled={idx === (formData.itinerary?.length || 0) - 1}
                          onClick={() => handleMoveDay(idx, "down")}
                          className="size-7 p-0"
                          title="Move Down"
                        >
                          <ArrowDown className="size-3.5" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteDay(idx)}
                          className="size-7 p-0 text-muted-foreground hover:text-brand-red"
                          title="Delete Day"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Input
                        placeholder="Day Title"
                        value={day.title}
                        onChange={(e) => handleUpdateDay(idx, { title: e.target.value })}
                        className="h-8 text-xs"
                      />
                      <Input
                        placeholder="Location (e.g. Kandy / Sigiriya)"
                        value={day.location || ""}
                        onChange={(e) => handleUpdateDay(idx, { location: e.target.value })}
                        className="h-8 text-xs"
                      />
                    </div>

                    <Textarea
                      placeholder="Day activity narrative & description..."
                      rows={2}
                      value={day.description}
                      onChange={(e) => handleUpdateDay(idx, { description: e.target.value })}
                      className="text-xs"
                    />

                    {/* Day Photo */}
                    <div className="flex items-center gap-3 pt-1">
                      {day.image ? (
                        <div className="size-12 rounded-lg overflow-hidden border border-border shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={day.image} alt={day.title} className="w-full h-full object-cover" />
                        </div>
                      ) : null}
                      <label className="cursor-pointer inline-flex items-center gap-1.5 text-xs text-brand-blue font-medium hover:underline">
                        <Upload className="size-3" />
                        <span>{day.image ? "Change Photo" : "Upload Day Photo"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleExistingDayImageUpload(idx, e)}
                        />
                      </label>
                      {uploadingDayIdx === idx ? <Loader2 className="size-3 animate-spin text-brand-blue" /> : null}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic">No itinerary days created yet.</p>
            )}

            {/* Add New Day Box */}
            <div className="p-4 rounded-xl border border-dashed border-border bg-muted/20 space-y-3">
              <p className="text-xs font-semibold text-navy dark:text-foreground">
                + Add Day {(formData.itinerary?.length || 0) + 1}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  placeholder="Day Title (e.g. Arrival & Transfer to Kandy)"
                  value={newDayTitle}
                  onChange={(e) => setNewDayTitle(e.target.value)}
                  className="h-8.5 text-xs bg-background"
                />
                <Input
                  placeholder="Location (e.g. Colombo -> Kandy)"
                  value={newDayLocation}
                  onChange={(e) => setNewDayLocation(e.target.value)}
                  className="h-8.5 text-xs bg-background"
                />
              </div>
              <Textarea
                placeholder="Day itinerary description, morning activities, meals, and overnight stay..."
                rows={2}
                value={newDayDesc}
                onChange={(e) => setNewDayDesc(e.target.value)}
                className="text-xs bg-background"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer inline-flex items-center gap-1.5 text-xs text-brand-blue font-medium hover:underline">
                    <Upload className="size-3" />
                    <span>Upload Day Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleNewDayImageUpload}
                    />
                  </label>
                  {isUploadingNewDayImage ? <Loader2 className="size-3 animate-spin text-brand-blue" /> : null}
                  {newDayImage ? <span className="text-[11px] text-emerald-600 font-medium">Photo attached ✓</span> : null}
                </div>
                <Button
                  type="button"
                  size="sm"
                  onClick={handleAddItineraryDay}
                  className="h-8 text-xs font-semibold bg-brand-blue hover:bg-brand-blue-dark text-white gap-1.5"
                >
                  <Plus className="size-3.5" />
                  Add Day
                </Button>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 06 — WHAT'S INCLUDED */}
          {/* ========================================================================= */}
          <div className="bg-card rounded-xl border border-border/70 p-5 md:p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2.5 border-b border-border/50 pb-3">
              <div className="flex size-6 items-center justify-center rounded-md bg-brand-blue/10 text-brand-blue font-bold text-xs">
                06
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy dark:text-foreground">
                Section 06 — What&apos;s Included
              </h3>
            </div>

            {/* Standard Inclusions Checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {PRESET_INCLUDED_OPTIONS.map((item) => {
                const isSelected = (formData.includedItems || []).includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleToggleIncludedItem(item)}
                    className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-medium transition-all text-left ${
                      isSelected
                        ? "bg-brand-blue/10 border-brand-blue text-brand-blue font-semibold"
                        : "bg-background border-border/70 text-muted-foreground hover:border-border"
                    }`}
                  >
                    <div
                      className={`size-4 rounded flex items-center justify-center text-[10px] ${
                        isSelected ? "bg-brand-blue text-white" : "border border-muted-foreground/40"
                      }`}
                    >
                      {isSelected ? "✓" : ""}
                    </div>
                    <span>{item}</span>
                  </button>
                );
              })}
            </div>

            {/* Custom Inclusions if Other or customized */}
            <div className="space-y-3 pt-2">
              <Label className="text-xs font-semibold">Custom Inclusions / Specific Add-ons:</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g. English speaking national tour guide, Mineral water bottles"
                  value={customIncludedInput}
                  onChange={(e) => setCustomIncludedInput(e.target.value)}
                  className="h-8.5 text-xs bg-background"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddCustomIncluded();
                    }
                  }}
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={handleAddCustomIncluded}
                  className="h-8.5 text-xs font-semibold bg-brand-blue hover:bg-brand-blue-dark text-white"
                >
                  Add
                </Button>
              </div>

              {formData.customIncludedItems && formData.customIncludedItems.length > 0 ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {formData.customIncludedItems.map((ci, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted text-xs font-medium text-foreground"
                    >
                      <span>{ci}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCustomIncluded(idx)}
                        className="text-muted-foreground hover:text-brand-red"
                      >
                        <X className="size-3" />
                      </button>
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 07 — WHAT TO EXPECT */}
          {/* ========================================================================= */}
          <div className="bg-card rounded-xl border border-border/70 p-5 md:p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2.5 border-b border-border/50 pb-3">
              <div className="flex size-6 items-center justify-center rounded-md bg-brand-blue/10 text-brand-blue font-bold text-xs">
                07
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy dark:text-foreground">
                Section 07 — What to Expect
              </h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="what-to-expect" className="text-xs font-semibold">
                Travel Experience, Climate, Clothing &amp; Cultural Norms
              </Label>
              <Textarea
                id="what-to-expect"
                rows={3}
                placeholder="Describe what travelers should anticipate: physical pacing, weather, recommended attire for temples/sacred sites, photography rules..."
                value={formData.whatToExpect || ""}
                onChange={(e) => updateField("whatToExpect", e.target.value)}
                className="text-xs bg-background"
              />
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 08 — ENTRY REQUIREMENTS */}
          {/* ========================================================================= */}
          <div className="bg-card rounded-xl border border-border/70 p-5 md:p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2.5 border-b border-border/50 pb-3">
              <div className="flex size-6 items-center justify-center rounded-md bg-brand-blue/10 text-brand-blue font-bold text-xs">
                08
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy dark:text-foreground">
                Section 08 — Entry Requirements
              </h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="entry-req" className="text-xs font-semibold flex items-center justify-between">
                <span>Entry &amp; Passport Requirements</span>
                <span className="text-[11px] text-muted-foreground font-normal">(Optional — hidden on public page if empty)</span>
              </Label>
              <Textarea
                id="entry-req"
                rows={2}
                placeholder="e.g. Passport validity at least 6 months from arrival date, proof of return ticket..."
                value={formData.entryRequirements || ""}
                onChange={(e) => updateField("entryRequirements", e.target.value)}
                className="text-xs bg-background"
              />
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 09 — VISA INFORMATION */}
          {/* ========================================================================= */}
          <div className="bg-card rounded-xl border border-border/70 p-5 md:p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2.5 border-b border-border/50 pb-3">
              <div className="flex size-6 items-center justify-center rounded-md bg-brand-blue/10 text-brand-blue font-bold text-xs">
                09
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy dark:text-foreground">
                Section 09 — Visa Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="visa-info" className="text-xs font-semibold">
                  Visa Guidelines &amp; ETA Process
                </Label>
                <Textarea
                  id="visa-info"
                  rows={2}
                  placeholder={lockedTravelType === "Inbound" ? "e.g. ETA electronic travel authorization required prior to arrival at eta.gov.lk" : "e.g. Tourist visa required on arrival or via embassy"}
                  value={formData.visaInformation || ""}
                  onChange={(e) => updateField("visaInformation", e.target.value)}
                  className="text-xs bg-background"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="visa-notes" className="text-xs font-semibold">
                  Visa Notes &amp; Important Exemptions
                </Label>
                <Textarea
                  id="visa-notes"
                  rows={2}
                  placeholder="e.g. Visa-free access applicable for certain passport holders..."
                  value={formData.visaNotes || ""}
                  onChange={(e) => updateField("visaNotes", e.target.value)}
                  className="text-xs bg-background"
                />
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 10 — OFFERS */}
          {/* ========================================================================= */}
          <div className="bg-card rounded-xl border border-border/70 p-5 md:p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-border/50 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex size-6 items-center justify-center rounded-md bg-brand-blue/10 text-brand-blue font-bold text-xs">
                  10
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-navy dark:text-foreground">
                  Section 10 — Offers &amp; Discounts
                </h3>
              </div>

              {/* Enable Offer Toggle */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="enable-offer"
                  checked={Boolean(formData.offers?.enabled)}
                  onChange={(e) => updateOfferField("enabled", e.target.checked)}
                  className="size-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                />
                <Label htmlFor="enable-offer" className="text-xs font-semibold cursor-pointer">
                  Enable Offer
                </Label>
              </div>
            </div>

            {formData.offers?.enabled ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-1">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Offer Title</Label>
                  <Input
                    placeholder="e.g. Early Bird Summer Special"
                    value={formData.offers?.title || ""}
                    onChange={(e) => updateOfferField("title", e.target.value)}
                    className="h-8.5 text-xs bg-background"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Offer Type</Label>
                  <Select
                    value={formData.offers?.offerType || "Percentage Discount"}
                    onValueChange={(val) =>
                      updateOfferField("offerType", val as PackageOffer["offerType"])
                    }
                  >
                    <SelectTrigger className="h-8.5 text-xs bg-background">
                      <SelectValue placeholder="Offer Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Percentage Discount">Percentage Discount (%)</SelectItem>
                      <SelectItem value="Fixed Amount">Fixed Amount Discount</SelectItem>
                      <SelectItem value="Special Offer">Special Offer / Bonus Add-on</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Original Price ({formData.currency})</Label>
                  <Input
                    type="number"
                    min="0"
                    placeholder="e.g. 210000"
                    value={formData.offers?.originalPrice != null ? String(formData.offers.originalPrice) : ""}
                    onChange={(e) => updateOfferField("originalPrice", e.target.value ? parseFloat(e.target.value) : null)}
                    className="h-8.5 text-xs bg-background"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Offer Price / Discounted Value</Label>
                  <Input
                    type="number"
                    min="0"
                    placeholder="e.g. 185000 or 15%"
                    value={formData.offers?.offerPrice != null ? String(formData.offers.offerPrice) : ""}
                    onChange={(e) => updateOfferField("offerPrice", e.target.value ? parseFloat(e.target.value) : null)}
                    className="h-8.5 text-xs bg-background font-bold text-emerald-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Start Date</Label>
                  <Input
                    type="date"
                    value={formData.offers?.startDate || ""}
                    onChange={(e) => updateOfferField("startDate", e.target.value)}
                    className="h-8.5 text-xs bg-background"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">End Date</Label>
                  <Input
                    type="date"
                    value={formData.offers?.endDate || ""}
                    onChange={(e) => updateOfferField("endDate", e.target.value)}
                    className="h-8.5 text-xs bg-background"
                  />
                </div>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic">
                Offer is currently disabled. No promotional badge will appear publicly.
              </p>
            )}
          </div>

          {/* ========================================================================= */}
          {/* SECTION 11 — GALLERY */}
          {/* ========================================================================= */}
          <div className="bg-card rounded-xl border border-border/70 p-5 md:p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2.5 border-b border-border/50 pb-3">
              <div className="flex size-6 items-center justify-center rounded-md bg-brand-blue/10 text-brand-blue font-bold text-xs">
                11
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy dark:text-foreground">
                Section 11 — Gallery Photos
              </h3>
            </div>

            {/* Gallery Grid */}
            {formData.images && formData.images.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {formData.images.map((imgUrl, idx) => {
                  const isCover = formData.coverImage === imgUrl;
                  return (
                    <div
                      key={idx}
                      className="group relative rounded-xl overflow-hidden border border-border/80 aspect-video bg-muted shadow-xs"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imgUrl} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                      
                      {isCover ? (
                        <div className="absolute top-1.5 left-1.5">
                          <span className="px-2 py-0.5 rounded-md bg-brand-blue text-white text-[10px] font-bold shadow-sm">
                            Cover
                          </span>
                        </div>
                      ) : null}

                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 p-2">
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          disabled={idx === 0}
                          onClick={() => handleMoveImage(idx, "left")}
                          className="size-7 p-0 text-white hover:bg-white/20"
                          title="Move Left"
                        >
                          <MoveLeft className="size-3.5" />
                        </Button>
                        {!isCover ? (
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => handleSetCover(imgUrl)}
                            className="h-7 px-2 text-[10px] text-white hover:bg-white/20"
                            title="Set as Cover"
                          >
                            Set Cover
                          </Button>
                        ) : null}
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          disabled={idx === formData.images.length - 1}
                          onClick={() => handleMoveImage(idx, "right")}
                          className="size-7 p-0 text-white hover:bg-white/20"
                          title="Move Right"
                        >
                          <MoveRight className="size-3.5" />
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveImage(idx)}
                          className="size-7 p-0 text-red-400 hover:bg-white/20"
                          title="Remove Photo"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic">No gallery images added yet.</p>
            )}

            {/* Gallery Upload Controls */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp,image/avif"
                className="hidden"
                onChange={handleFileUpload}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="h-8.5 text-xs font-semibold text-brand-blue border-brand-blue/30 hover:bg-brand-blue/5 gap-1.5"
              >
                {isUploading ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />}
                <span>Upload Photos</span>
              </Button>

              <div className="flex items-center gap-2 flex-1 max-w-md">
                <Input
                  placeholder="Or enter image URL..."
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  className="h-8.5 text-xs bg-background"
                />
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={handleAddImageUrl}
                  className="h-8.5 text-xs font-medium"
                >
                  Add URL
                </Button>
              </div>
            </div>
            {uploadProgressText ? (
              <p className="text-xs text-brand-blue font-medium flex items-center gap-1.5">
                <Loader2 className="size-3 animate-spin" />
                {uploadProgressText}
              </p>
            ) : null}
          </div>

          {/* ========================================================================= */}
          {/* SECTION 12 — PACKAGE STATUS */}
          {/* ========================================================================= */}
          <div className="bg-card rounded-xl border border-border/70 p-5 md:p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 border-b border-border/50 pb-3">
              <div className="flex size-6 items-center justify-center rounded-md bg-brand-blue/10 text-brand-blue font-bold text-xs">
                12
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy dark:text-foreground">
                Section 12 — Package Status
              </h3>
            </div>

            <p className="text-xs text-muted-foreground">
              Only <strong>Active</strong> packages appear publicly on the Miracle International travel website. Draft and Inactive packages remain in the admin management desk.
            </p>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => updateField("status", "Active")}
                className={`p-3 rounded-xl border text-center transition-all ${
                  formData.status === "Active"
                    ? "bg-emerald-50 border-emerald-500 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 font-bold shadow-xs"
                    : "bg-background border-border/70 text-muted-foreground hover:border-border"
                }`}
              >
                <p className="text-xs font-bold">Active</p>
                <p className="text-[10px] opacity-80">Published Live</p>
              </button>

              <button
                type="button"
                onClick={() => updateField("status", "Draft")}
                className={`p-3 rounded-xl border text-center transition-all ${
                  formData.status === "Draft"
                    ? "bg-amber-50 border-amber-500 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 font-bold shadow-xs"
                    : "bg-background border-border/70 text-muted-foreground hover:border-border"
                }`}
              >
                <p className="text-xs font-bold">Draft</p>
                <p className="text-[10px] opacity-80">Under Preparation</p>
              </button>

              <button
                type="button"
                onClick={() => updateField("status", "Inactive")}
                className={`p-3 rounded-xl border text-center transition-all ${
                  formData.status === "Inactive"
                    ? "bg-slate-100 border-slate-500 text-slate-800 dark:bg-slate-800 dark:text-slate-200 font-bold shadow-xs"
                    : "bg-background border-border/70 text-muted-foreground hover:border-border"
                }`}
              >
                <p className="text-xs font-bold">Inactive</p>
                <p className="text-[10px] opacity-80">Archived / Hidden</p>
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 13 — PREVIEW */}
          {/* ========================================================================= */}
          <div className="bg-card rounded-xl border border-border/70 p-5 md:p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 border-b border-border/50 pb-3">
              <div className="flex size-6 items-center justify-center rounded-md bg-brand-blue/10 text-brand-blue font-bold text-xs">
                13
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy dark:text-foreground">
                Section 13 — Customer-Facing Live Preview
              </h3>
            </div>

            <div className="max-w-md mx-auto rounded-2xl overflow-hidden border border-border/80 bg-background shadow-md">
              <div className="relative aspect-video w-full bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewCover} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-blue text-white text-[11px] font-bold shadow-sm">
                    {lockedTravelType}
                  </span>
                  {formData.offers?.enabled ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[11px] font-bold shadow-sm flex items-center gap-1">
                      <Tag className="size-3" />
                      Special Offer
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1 font-medium text-brand-blue">
                    <MapPin className="size-3" />
                    {formData.destination || "Destination"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" />
                    {formData.duration || "Duration"}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-navy dark:text-foreground line-clamp-1">
                  {formData.name || "Package Title"}
                </h4>

                <p className="text-xs text-muted-foreground line-clamp-2">
                  {formData.shortDescription || formData.description || "Package description snippet shown on public travel cards..."}
                </p>

                <div className="pt-2 border-t border-border/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-muted-foreground block">Starting from</span>
                    {formData.priceOnRequest ? (
                      <span className="text-xs font-bold text-navy dark:text-foreground">Price on Request</span>
                    ) : parsedPriceNum != null ? (
                      <span className="text-sm font-extrabold text-navy dark:text-foreground">
                        <span className="text-xs mr-1 text-muted-foreground">{formData.currency}</span>
                        {parsedPriceNum.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground font-medium">—</span>
                    )}
                  </div>

                  <Button size="sm" className="h-7 text-xs font-semibold bg-brand-blue text-white rounded-lg">
                    Inquiry Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <DialogFooter className="p-4 px-6 border-t border-border/70 bg-card shrink-0 flex flex-row items-center justify-between gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            Cancel
          </Button>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSaveWithStatus("Draft")}
              className="text-xs font-semibold h-9 border-border/80 hover:bg-muted"
            >
              Save as Draft
            </Button>
            <Button
              type="button"
              onClick={() => handleSaveWithStatus("Active")}
              className="bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-semibold h-9 px-4 gap-1.5 shadow-sm"
            >
              <CheckCircle2 className="size-4" />
              Save &amp; Publish
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
