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
  MapPin,
  MoveLeft,
  MoveRight,
  Palmtree,
  Plus,
  PlusCircle,
  Send,
  ShieldAlert,
  Sparkles,
  Star,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

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

const PRESET_HIGHLIGHTS = [
  "Beach experience & Oceanfront Villas",
  "UNESCO World Heritage Cultural Sites",
  "Wildlife Safari & Leopard Tracking",
  "Scenic Highland Tea Trails & Train Ride",
  "Ayurveda Wellness & Herbal Spas",
  "Historic Colonial Forts & Architecture",
  "Snorkeling, Surfing & Water Sports",
  "Luxury Mountain Chalets & Panoramas",
];

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
  price: null,
  currency: "LKR",
  shortDescription: "",
  description: "",
  highlights: [],
  includedItems: [
    "Accommodation",
    "Transportation",
    "Airport Transfer",
    "Guided Tours",
  ],
  includedServices: "",
  accommodation: "",
  transportation: "",
  whatToExpect: "",
  entryRequirements: "",
  visaInformation: "",
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
  defaultTravelType,
}: TravelPackageDialogProps) {
  const [formData, setFormData] = useState<TravelPackageFormData>(DEFAULT_FORM);
  const [priceInput, setPriceInput] = useState<string>("");
  const [highlightInput, setHighlightInput] = useState<string>("");
  const [customIncludedInput, setCustomIncludedInput] = useState<string>("");
  const [imageUrlInput, setImageUrlInput] = useState<string>("");
  const [error, setError] = useState<string>("");

  // New Itinerary Day Input Temporary State
  const [newDayTitle, setNewDayTitle] = useState("");
  const [newDayLocation, setNewDayLocation] = useState("");
  const [newDayDesc, setNewDayDesc] = useState("");
  const [newDayImage, setNewDayImage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEditing = Boolean(editingPackage);

  useEffect(() => {
    if (editingPackage) {
      setFormData({
        name: editingPackage.name || "",
        travelType: editingPackage.travelType || defaultTravelType || "Inbound",
        destination: editingPackage.destination || "",
        country: editingPackage.country || (editingPackage.travelType === "Inbound" ? "Sri Lanka" : ""),
        duration: editingPackage.duration || "",
        price: editingPackage.price ?? null,
        currency: editingPackage.currency ?? (editingPackage.travelType === "Inbound" ? "LKR" : "USD"),
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
        includedServices: editingPackage.includedServices || "",
        accommodation: editingPackage.accommodation || "",
        transportation: editingPackage.transportation || "",
        whatToExpect: editingPackage.whatToExpect || "",
        entryRequirements: editingPackage.entryRequirements || "",
        visaInformation: editingPackage.visaInformation || "",
        images: editingPackage.images || [],
        coverImage: editingPackage.coverImage || (editingPackage.images?.[0] ?? ""),
        status: editingPackage.status || "Active",
      });
      setPriceInput(editingPackage.price != null ? String(editingPackage.price) : "");
    } else {
      const initialType = defaultTravelType || "Inbound";
      setFormData({
        ...DEFAULT_FORM,
        travelType: initialType,
        country: initialType === "Inbound" ? "Sri Lanka" : "",
        currency: initialType === "Inbound" ? "LKR" : "USD",
      });
      setPriceInput("");
    }
    setError("");
    setHighlightInput("");
    setCustomIncludedInput("");
    setImageUrlInput("");
    setNewDayTitle("");
    setNewDayLocation("");
    setNewDayDesc("");
    setNewDayImage("");
  }, [editingPackage, defaultTravelType, open]);

  const updateField = <K extends keyof TravelPackageFormData>(
    field: K,
    value: TravelPackageFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // --- Highlights Management ---
  const handleAddHighlight = (highlightText?: string) => {
    const text = (highlightText ?? highlightInput).trim();
    if (!text) return;
    const current = formData.highlights || [];
    if (!current.includes(text)) {
      updateField("highlights", [...current, text]);
    }
    setHighlightInput("");
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
    if (!newDayTitle.trim() && !newDayDesc.trim()) return;
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

  const handleUpdateDay = (index: number, updatedFields: Partial<ItineraryDay>) => {
    const current = [...(formData.itinerary || [])];
    if (current[index]) {
      current[index] = { ...current[index], ...updatedFields };
      updateField("itinerary", current);
    }
  };

  const handleDeleteDay = (index: number) => {
    const current = (formData.itinerary || []).filter((_, i) => i !== index);
    // Renumber days
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

    // Renumber days
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
    const current = formData.includedItems || [];
    if (!current.includes(text)) {
      updateField("includedItems", [...current, text]);
    }
    setCustomIncludedInput("");
  };

  const handleRemoveIncludedItem = (item: string) => {
    const current = formData.includedItems || [];
    updateField(
      "includedItems",
      current.filter((i) => i !== item),
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
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setFormData((prev) => {
            const updated = [...prev.images, result];
            return {
              ...prev,
              images: updated,
              coverImage: prev.coverImage || result,
            };
          });
        }
      };
      reader.readAsDataURL(file);
    });

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

  const handleSetCoverImage = (img: string) => {
    updateField("coverImage", img);
  };

  // --- Submission Handler ---
  const handleFormSubmit = (statusOverride?: PackageStatus) => {
    if (!formData.name.trim() || !formData.destination.trim() || !formData.duration.trim()) {
      setError("Please fill in required fields: Package Name, Destination, and Duration.");
      return;
    }

    // Price validation
    let parsedPrice: number | null = null;
    if (priceInput.trim() !== "") {
      const num = Number(priceInput);
      if (isNaN(num) || num < 0) {
        setError("Please enter a valid positive number for package price.");
        return;
      }
      parsedPrice = num;
    }

    const effectiveStatus: PackageStatus = statusOverride ?? formData.status ?? "Active";

    const payload: TravelPackageFormData = {
      ...formData,
      price: parsedPrice,
      currency: formData.currency || (formData.travelType === "Inbound" ? "LKR" : "USD"),
      status: effectiveStatus,
      coverImage: formData.coverImage || formData.images[0] || "",
    };

    setError("");
    onSubmit(payload, editingPackage?.id);
    onOpenChange(false);
  };

  // Preview helper values
  const previewCover = formData.coverImage || formData.images[0] || getPackageCoverImage(formData);
  const parsedPriceNum = priceInput.trim() !== "" && !isNaN(Number(priceInput)) ? Number(priceInput) : formData.price;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-[96vw] lg:w-[92vw] max-h-[94vh] flex flex-col p-0 rounded-2xl shadow-2xl bg-card border border-border/80 overflow-hidden">
        {/* Modal Header */}
        <DialogHeader className="p-6 pb-4 border-b border-border/70 bg-gradient-to-r from-slate-50 via-white to-blue-50/40 dark:from-slate-900/60 dark:via-card dark:to-slate-900/30 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
                  {formData.travelType === "Inbound" ? <Palmtree className="size-4.5" /> : <Globe2 className="size-4.5" />}
                </div>
                <DialogTitle className="text-xl font-bold text-navy dark:text-foreground">
                  {isEditing ? `Edit ${formData.travelType} Package` : `Create New ${formData.travelType} Package`}
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
                Configure complete package specifications, pricing, itinerary, card preview, and media assets.
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
          {/* SECTION 1 — BASIC INFORMATION */}
          {/* ========================================================================= */}
          <div className="bg-card rounded-xl border border-border/70 p-5 md:p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2.5 border-b border-border/50 pb-3">
              <div className="flex size-6 items-center justify-center rounded-md bg-brand-blue/10 text-brand-blue font-bold text-xs">
                1
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy dark:text-foreground">
                Section 1 — Basic Information
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
                  placeholder="e.g. Sri Lanka Signature Heritage & Wildlife Expedition"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="h-10 text-xs font-medium bg-background"
                  required
                />
              </div>

              {/* Travel Type */}
              <div className="space-y-1.5">
                <Label htmlFor="pkg-type" className="text-xs font-semibold">
                  Travel Type <span className="text-brand-red">*</span>
                </Label>
                <Select
                  value={formData.travelType}
                  onValueChange={(val) => {
                    const newType = val as TravelType;
                    updateField("travelType", newType);
                    if (newType === "Inbound") {
                      updateField("country", "Sri Lanka");
                      updateField("currency", "LKR");
                    } else {
                      updateField("currency", "USD");
                    }
                  }}
                >
                  <SelectTrigger id="pkg-type" className="h-10 text-xs bg-background font-medium">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inbound">Inbound (Sri Lanka Tours)</SelectItem>
                    <SelectItem value="Outbound">Outbound (International Tours)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Country */}
              <div className="space-y-1.5">
                <Label htmlFor="pkg-country" className="text-xs font-semibold">
                  Country
                </Label>
                <Input
                  id="pkg-country"
                  placeholder="e.g. Sri Lanka, United Arab Emirates, Maldives"
                  value={formData.country || ""}
                  onChange={(e) => updateField("country", e.target.value)}
                  className="h-10 text-xs bg-background font-medium"
                />
              </div>

              {/* Destination */}
              <div className="space-y-1.5">
                <Label htmlFor="pkg-dest" className="text-xs font-semibold">
                  Destination(s) <span className="text-brand-red">*</span>
                </Label>
                <Input
                  id="pkg-dest"
                  placeholder="e.g. Sigiriya, Kandy, Nuwara Eliya & Yala"
                  value={formData.destination}
                  onChange={(e) => updateField("destination", e.target.value)}
                  className="h-10 text-xs bg-background font-medium"
                  required
                />
              </div>

              {/* Duration */}
              <div className="space-y-1.5">
                <Label htmlFor="pkg-dur" className="text-xs font-semibold">
                  Duration <span className="text-brand-red">*</span>
                </Label>
                <Input
                  id="pkg-dur"
                  placeholder="e.g. 7 Days / 6 Nights"
                  value={formData.duration}
                  onChange={(e) => updateField("duration", e.target.value)}
                  className="h-10 text-xs bg-background font-medium"
                  required
                />
              </div>

              {/* Package Price & Currency */}
              <div className="space-y-1.5">
                <Label htmlFor="pkg-price" className="text-xs font-semibold flex items-center justify-between">
                  <span>Package Price</span>
                  <span className="text-[11px] text-muted-foreground font-normal">Starting price (Leave empty if on request)</span>
                </Label>
                <div className="flex gap-2">
                  <Select
                    value={formData.currency || (formData.travelType === "Inbound" ? "LKR" : "USD")}
                    onValueChange={(val) => updateField("currency", val as Currency)}
                  >
                    <SelectTrigger className="h-10 w-28 text-xs bg-background font-bold text-navy dark:text-foreground">
                      <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LKR">LKR (Rs)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    id="pkg-price"
                    type="number"
                    min="0"
                    step="any"
                    placeholder="e.g. 185000"
                    value={priceInput}
                    onChange={(e) => setPriceInput(e.target.value)}
                    className="h-10 text-xs flex-1 bg-background font-bold"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div className="space-y-1.5">
                <Label htmlFor="pkg-short-desc" className="text-xs font-semibold">
                  Short Description (Card Summary)
                </Label>
                <Input
                  id="pkg-short-desc"
                  placeholder="One-sentence tagline shown on package cards"
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
          {/* SECTION 2 — PACKAGE CARD INFORMATION & LIVE PREVIEW */}
          {/* ========================================================================= */}
          <div className="bg-card rounded-xl border border-border/70 p-5 md:p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-border/50 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex size-6 items-center justify-center rounded-md bg-brand-blue/10 text-brand-blue font-bold text-xs">
                  2
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-navy dark:text-foreground">
                    Section 2 — Package Card Information &amp; Live Preview
                  </h3>
                </div>
              </div>
              <span className="text-xs font-semibold text-brand-blue">
                {(formData.highlights || []).length} highlights added
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Highlights Builder (7 Cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="size-3 text-amber-500" />
                    Quick Suggestion Chips (Click to Add):
                  </Label>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_HIGHLIGHTS.map((preset) => {
                      const isAdded = (formData.highlights || []).includes(preset);
                      return (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => handleAddHighlight(preset)}
                          disabled={isAdded}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                            isAdded
                              ? "bg-muted text-muted-foreground border-border/50 opacity-60 cursor-not-allowed"
                              : "bg-background text-foreground border-border hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/5"
                          }`}
                        >
                          {isAdded ? <Check className="size-3 text-emerald-600" /> : <Plus className="size-3" />}
                          {preset}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <Input
                    placeholder="Add a custom highlight (e.g. Scenic Nine Arch Bridge train ride)"
                    value={highlightInput}
                    onChange={(e) => setHighlightInput(e.target.value)}
                    className="h-9.5 text-xs bg-background flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddHighlight();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddHighlight()}
                    className="h-9.5 text-xs gap-1.5 border-brand-blue/40 text-brand-blue hover:bg-brand-blue/5 font-semibold shrink-0"
                  >
                    <PlusCircle className="size-4" />
                    Add Highlight
                  </Button>
                </div>

                {/* Highlights List */}
                {(formData.highlights || []).length > 0 ? (
                  <div className="flex flex-wrap gap-2 p-3 bg-muted/30 rounded-xl border border-border/60">
                    {(formData.highlights || []).map((hl, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card text-xs font-medium text-navy dark:text-foreground border border-border/80 shadow-xs"
                      >
                        <Star className="size-3.5 text-amber-500 fill-amber-500 shrink-0" />
                        <span>{hl}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveHighlight(idx)}
                          className="text-muted-foreground hover:text-brand-red ml-1 transition-colors"
                          aria-label={`Remove highlight ${hl}`}
                        >
                          <X className="size-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] text-muted-foreground italic">
                    No highlights added yet. Select quick chips above or type custom highlights.
                  </p>
                )}
              </div>

              {/* Live Package Card Preview (5 Cols) */}
              <div className="lg:col-span-5 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-brand-blue uppercase tracking-wider">
                  <Eye className="size-3.5" />
                  Live Card Preview (Public Website View):
                </div>

                <div className="rounded-2xl border border-border/80 bg-card overflow-hidden shadow-md max-w-sm mx-auto transition-all">
                  <div className="relative aspect-[16/10] bg-muted overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewCover}
                      alt={formData.name || "Package preview"}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                    <div className="absolute top-2.5 left-2.5">
                      <Badge
                        className={
                          formData.travelType === "Inbound"
                            ? "bg-emerald-600 text-white text-[10px] font-bold"
                            : "bg-blue-600 text-white text-[10px] font-bold"
                        }
                      >
                        {formData.travelType}
                      </Badge>
                    </div>

                    <div className="absolute top-2.5 right-2.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-sm text-white text-[10px] font-semibold">
                        <Clock className="size-2.5 text-sky-300" />
                        {formData.duration || "7 Days / 6 Nights"}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                      <p className="text-[11px] font-medium flex items-center gap-1 drop-shadow-sm truncate">
                        <MapPin className="size-3 text-sky-300 shrink-0" />
                        <span>{formData.destination || "Destination"}</span>
                      </p>
                    </div>
                  </div>

                  <div className="p-4 space-y-2.5">
                    <h4 className="font-bold text-xs text-navy dark:text-foreground line-clamp-1">
                      {formData.name || "Package Title Goes Here"}
                    </h4>
                    <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                      {formData.shortDescription || "A memorable journey through scenic sights and culture."}
                    </p>

                    {/* Highlights mini preview */}
                    {(formData.highlights || []).length > 0 ? (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {(formData.highlights || []).slice(0, 2).map((h, i) => (
                          <span key={i} className="text-[10px] text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded flex items-center gap-1">
                            <Star className="size-2.5 fill-amber-500 text-amber-500" />
                            <span className="truncate max-w-[120px]">{h}</span>
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                      <div>
                        <span className="text-[9px] uppercase font-bold text-muted-foreground block">
                          Starting From
                        </span>
                        <span className="text-xs font-bold text-navy dark:text-foreground">
                          {parsedPriceNum != null ? (
                            `${formData.currency === "LKR" ? "LKR" : "USD"} ${parsedPriceNum.toLocaleString()}`
                          ) : (
                            "Price on Request"
                          )}
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-brand-blue flex items-center gap-1">
                        View Package <ArrowRight className="size-3" />
                      </span>
                    </div>

                    <Button
                      type="button"
                      size="sm"
                      className="w-full h-8 text-xs font-bold bg-brand-blue text-white rounded-lg gap-1.5"
                    >
                      <Send className="size-3" />
                      Send Inquiry
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 3 — DAY-BY-DAY ITINERARY BUILDER */}
          {/* ========================================================================= */}
          <div className="bg-card rounded-xl border border-border/70 p-5 md:p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-border/50 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex size-6 items-center justify-center rounded-md bg-brand-blue/10 text-brand-blue font-bold text-xs">
                  3
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-navy dark:text-foreground">
                  Section 3 — Day-by-Day Itinerary Builder
                </h3>
              </div>
              <span className="text-xs font-semibold text-brand-blue">
                {(formData.itinerary || []).length} days configured
              </span>
            </div>

            {/* List of existing days */}
            {(formData.itinerary || []).length > 0 ? (
              <div className="space-y-4">
                {(formData.itinerary || []).map((day, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-border/80 bg-background space-y-3 shadow-xs"
                  >
                    <div className="flex items-center justify-between border-b border-border/40 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-brand-blue text-white text-xs font-bold font-mono">
                          Day {String(day.day).padStart(2, "0")}
                        </span>
                        <span className="text-xs font-bold text-navy dark:text-foreground">
                          {day.title}
                        </span>
                      </div>

                      {/* Day Action Buttons */}
                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          disabled={idx === 0}
                          onClick={() => handleMoveDay(idx, "up")}
                          className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                          title="Move Day Up"
                        >
                          <ArrowUp className="size-3.5" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          disabled={idx === (formData.itinerary || []).length - 1}
                          onClick={() => handleMoveDay(idx, "down")}
                          className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                          title="Move Day Down"
                        >
                          <ArrowDown className="size-3.5" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteDay(idx)}
                          className="h-7 w-7 p-0 text-muted-foreground hover:text-brand-red ml-1"
                          title="Delete Day"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-[11px] font-semibold text-muted-foreground">
                          Day Title / Headline:
                        </Label>
                        <Input
                          value={day.title}
                          onChange={(e) => handleUpdateDay(idx, { title: e.target.value })}
                          className="h-8.5 text-xs bg-card font-medium"
                          placeholder="e.g. Arrival & Sigiriya Fortress Sunset"
                        />
                      </div>

                      <div className="space-y-1">
                        <Label className="text-[11px] font-semibold text-muted-foreground">
                          Day Location(s):
                        </Label>
                        <Input
                          value={day.location || ""}
                          onChange={(e) => handleUpdateDay(idx, { location: e.target.value })}
                          className="h-8.5 text-xs bg-card"
                          placeholder="e.g. BIA Airport & Sigiriya"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-[11px] font-semibold text-muted-foreground">
                        Day Description &amp; Milestones:
                      </Label>
                      <Textarea
                        rows={2}
                        value={day.description}
                        onChange={(e) => handleUpdateDay(idx, { description: e.target.value })}
                        className="text-xs bg-card min-h-[60px]"
                        placeholder="Detailed itinerary breakdown for this day..."
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {/* Form to add a new day */}
            <div className="p-4 rounded-xl border border-dashed border-brand-blue/40 bg-brand-blue/5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-blue">
                <PlusCircle className="size-4" />
                Add Day {String((formData.itinerary || []).length + 1).padStart(2, "0")} Itinerary:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-[11px] font-semibold text-foreground">Day Title:</Label>
                  <Input
                    placeholder="e.g. Scenic Hill Country Train & Nine Arch Bridge"
                    value={newDayTitle}
                    onChange={(e) => setNewDayTitle(e.target.value)}
                    className="h-8.5 text-xs bg-background"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-[11px] font-semibold text-foreground">Location:</Label>
                  <Input
                    placeholder="e.g. Kandy to Ella"
                    value={newDayLocation}
                    onChange={(e) => setNewDayLocation(e.target.value)}
                    className="h-8.5 text-xs bg-background"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-[11px] font-semibold text-foreground">Activities &amp; Highlights:</Label>
                <Textarea
                  rows={2}
                  placeholder="Describe morning, afternoon and evening schedule for this day..."
                  value={newDayDesc}
                  onChange={(e) => setNewDayDesc(e.target.value)}
                  className="text-xs bg-background min-h-[60px]"
                />
              </div>

              <Button
                type="button"
                size="sm"
                onClick={handleAddItineraryDay}
                disabled={!newDayTitle.trim() && !newDayDesc.trim()}
                className="h-8.5 text-xs font-semibold bg-brand-blue hover:bg-brand-blue-dark text-white gap-1.5"
              >
                <Plus className="size-3.5" />
                Add Day to Itinerary
              </Button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 4 — INCLUDED SERVICES */}
          {/* ========================================================================= */}
          <div className="bg-card rounded-xl border border-border/70 p-5 md:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-border/50 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex size-6 items-center justify-center rounded-md bg-brand-blue/10 text-brand-blue font-bold text-xs">
                  4
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-navy dark:text-foreground">
                  Section 4 — What&apos;s Included &amp; Services
                </h3>
              </div>
              <span className="text-xs font-semibold text-emerald-600">
                {(formData.includedItems || []).length} inclusions selected
              </span>
            </div>

            {/* Standard Inclusions Checkboxes */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Select Standard Inclusions:
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {PRESET_INCLUDED_OPTIONS.map((item) => {
                  const isChecked = (formData.includedItems || []).includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleToggleIncludedItem(item)}
                      className={`flex items-center gap-2 p-2.5 rounded-lg border text-left text-xs font-medium transition-all ${
                        isChecked
                          ? "bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300 shadow-xs"
                          : "bg-background border-border text-foreground hover:bg-muted/40"
                      }`}
                    >
                      <div
                        className={`size-4 rounded flex items-center justify-center border transition-colors ${
                          isChecked
                            ? "bg-emerald-600 border-emerald-600 text-white"
                            : "border-muted-foreground/40 bg-card"
                        }`}
                      >
                        {isChecked ? <Check className="size-3 stroke-[3]" /> : null}
                      </div>
                      <span className="truncate">{item}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Included Item Input */}
            <div className="space-y-2 pt-1">
              <Label className="text-xs font-semibold">Add Custom Included Feature:</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g. Safari Jeep permit, Naturalist English-speaking guide"
                  value={customIncludedInput}
                  onChange={(e) => setCustomIncludedInput(e.target.value)}
                  className="h-9.5 text-xs bg-background flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddCustomIncluded();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddCustomIncluded}
                  className="h-9.5 text-xs gap-1.5 border-emerald-600/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 font-semibold shrink-0"
                >
                  <PlusCircle className="size-4" />
                  Add Feature
                </Button>
              </div>
            </div>

            {/* Custom Inclusions Tag List */}
            {(formData.includedItems || []).some((item) => !PRESET_INCLUDED_OPTIONS.includes(item)) ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {(formData.includedItems || [])
                  .filter((item) => !PRESET_INCLUDED_OPTIONS.includes(item))
                  .map((customItem, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-medium"
                    >
                      <CheckCircle2 className="size-3.5 text-emerald-600" />
                      <span>{customItem}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveIncludedItem(customItem)}
                        className="text-emerald-700 hover:text-brand-red ml-1"
                        aria-label={`Remove ${customItem}`}
                      >
                        <X className="size-3" />
                      </button>
                    </span>
                  ))}
              </div>
            ) : null}

            {/* Additional Inclusions Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <Label htmlFor="pkg-accom" className="text-xs font-semibold">
                  Accommodation Specifications
                </Label>
                <Textarea
                  id="pkg-accom"
                  rows={2}
                  placeholder="e.g. 4-Star & 5-Star luxury boutique resorts with private pool villas"
                  value={formData.accommodation || ""}
                  onChange={(e) => updateField("accommodation", e.target.value)}
                  className="text-xs bg-background"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pkg-trans" className="text-xs font-semibold">
                  Transportation Specifications
                </Label>
                <Textarea
                  id="pkg-trans"
                  rows={2}
                  placeholder="e.g. Private air-conditioned luxury executive van with dedicated chauffeur"
                  value={formData.transportation || ""}
                  onChange={(e) => updateField("transportation", e.target.value)}
                  className="text-xs bg-background"
                />
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 5 — WHAT TO EXPECT & EXPERIENCE */}
          {/* ========================================================================= */}
          <div className="bg-card rounded-xl border border-border/70 p-5 md:p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 border-b border-border/50 pb-3">
              <div className="flex size-6 items-center justify-center rounded-md bg-brand-blue/10 text-brand-blue font-bold text-xs">
                5
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy dark:text-foreground">
                Section 5 — What to Expect &amp; Experience Details
              </h3>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="pkg-expect" className="text-xs font-semibold">
                What Customers Can Expect (Activity Pace, Climate, Cultural Etiquette, Packing Tips)
              </Label>
              <Textarea
                id="pkg-expect"
                rows={4}
                placeholder="Describe what travelers should anticipate: physical activity levels, climate nuances, attire recommendations for sacred sites, and journey flow..."
                value={formData.whatToExpect || ""}
                onChange={(e) => updateField("whatToExpect", e.target.value)}
                className="text-xs leading-relaxed bg-background min-h-[90px]"
              />
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 6 — ENTRY REQUIREMENTS & VISA INFORMATION */}
          {/* ========================================================================= */}
          <div className="bg-card rounded-xl border border-border/70 p-5 md:p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 border-b border-border/50 pb-3">
              <div className="flex size-6 items-center justify-center rounded-md bg-brand-blue/10 text-brand-blue font-bold text-xs">
                6
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-navy dark:text-foreground">
                  Section 6 — Entry Requirements &amp; Visa Information (Optional)
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  If left empty, no placeholder content will be displayed on the public page.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <div className="space-y-1.5">
                <Label htmlFor="pkg-entry" className="text-xs font-semibold flex items-center gap-1.5">
                  <ShieldAlert className="size-3.5 text-brand-blue" />
                  Entry Requirements
                </Label>
                <Textarea
                  id="pkg-entry"
                  rows={3}
                  placeholder="e.g. Passport valid for 6+ months from entry date."
                  value={formData.entryRequirements || ""}
                  onChange={(e) => updateField("entryRequirements", e.target.value)}
                  className="text-xs leading-relaxed bg-background"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pkg-visa" className="text-xs font-semibold flex items-center gap-1.5">
                  <Globe2 className="size-3.5 text-brand-blue" />
                  Visa Information
                </Label>
                <Textarea
                  id="pkg-visa"
                  rows={3}
                  placeholder="e.g. Sri Lanka ETA tourist visa assistance provided by Miracle International."
                  value={formData.visaInformation || ""}
                  onChange={(e) => updateField("visaInformation", e.target.value)}
                  className="text-xs leading-relaxed bg-background"
                />
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 7 — PACKAGE IMAGES & GALLERY */}
          {/* ========================================================================= */}
          <div className="bg-card rounded-xl border border-border/70 p-5 md:p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-border/50 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex size-6 items-center justify-center rounded-md bg-brand-blue/10 text-brand-blue font-bold text-xs">
                  7
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-navy dark:text-foreground">
                  Section 7 — Package Images &amp; Gallery Management
                </h3>
              </div>
              <span className="text-xs font-semibold text-brand-blue">
                {(formData.images || []).length} images uploaded
              </span>
            </div>

            {/* Upload Area / URL Input */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-border/80 hover:border-brand-blue rounded-xl p-6 text-center cursor-pointer transition-colors bg-muted/20 hover:bg-brand-blue/5 flex flex-col items-center justify-center gap-2"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="flex size-10 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                  <Upload className="size-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Click to upload package images</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Supports PNG, JPG, WEBP formats</p>
                </div>
              </div>

              <div className="p-5 rounded-xl border border-border/70 bg-muted/10 space-y-3 flex flex-col justify-center">
                <Label htmlFor="pkg-img-url" className="text-xs font-semibold">
                  Or Add Image by Direct URL:
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="pkg-img-url"
                    placeholder="https://images.unsplash.com/..."
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    className="h-9.5 text-xs bg-background flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddImageUrl();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddImageUrl}
                    className="h-9.5 text-xs gap-1 font-semibold shrink-0"
                  >
                    <Plus className="size-3.5" />
                    Add URL
                  </Button>
                </div>
              </div>
            </div>

            {/* Visual Image Previews Grid */}
            {(formData.images || []).length > 0 ? (
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Gallery Previews (Star = Set as Cover, Arrows = Reorder, Trash = Remove):
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {(formData.images || []).map((img, idx) => {
                    const isCover = formData.coverImage === img || (!formData.coverImage && idx === 0);
                    return (
                      <div
                        key={idx}
                        className={`group relative rounded-xl overflow-hidden border-2 transition-all ${
                          isCover
                            ? "border-brand-blue ring-2 ring-brand-blue/20 shadow-md"
                            : "border-border/70 hover:border-border"
                        }`}
                      >
                        <div className="aspect-video bg-muted relative">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={img}
                            alt={`Preview ${idx + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&auto=format&fit=crop&q=60";
                            }}
                          />
                          {isCover ? (
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-brand-blue text-white text-[10px] font-bold shadow-xs">
                              Cover Image
                            </span>
                          ) : null}
                        </div>

                        {/* Card Action Bar */}
                        <div className="p-2 bg-card border-t border-border/60 flex items-center justify-between text-xs">
                          <button
                            type="button"
                            onClick={() => handleSetCoverImage(img)}
                            className={`flex items-center gap-1 text-[11px] font-medium transition-colors ${
                              isCover
                                ? "text-brand-blue font-bold"
                                : "text-muted-foreground hover:text-brand-blue"
                            }`}
                          >
                            <Star className={`size-3.5 ${isCover ? "fill-brand-blue text-brand-blue" : ""}`} />
                            {isCover ? "Cover" : "Set Cover"}
                          </button>

                          <div className="flex items-center gap-0.5">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => handleMoveImage(idx, "left")}
                              className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
                              title="Move Left"
                            >
                              <MoveLeft className="size-3" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === (formData.images || []).length - 1}
                              onClick={() => handleMoveImage(idx, "right")}
                              className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
                              title="Move Right"
                            >
                              <MoveRight className="size-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(idx)}
                              className="p-1 text-muted-foreground hover:text-brand-red ml-0.5"
                              title="Remove"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>

          {/* ========================================================================= */}
          {/* SECTION 8 — PACKAGE STATUS */}
          {/* ========================================================================= */}
          <div className="bg-card rounded-xl border border-border/70 p-5 md:p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 border-b border-border/50 pb-3">
              <div className="flex size-6 items-center justify-center rounded-md bg-brand-blue/10 text-brand-blue font-bold text-xs">
                8
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy dark:text-foreground">
                Section 8 — Package Publishing Status
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div
                onClick={() => updateField("status", "Active")}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  formData.status === "Active"
                    ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 shadow-xs"
                    : "border-border/70 bg-background hover:bg-muted/30"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <Badge className="bg-emerald-600 text-white font-semibold text-xs">Active</Badge>
                  {formData.status === "Active" ? <Check className="size-4 text-emerald-600" /> : null}
                </div>
                <p className="text-xs font-semibold text-navy dark:text-foreground">Published &amp; Public</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Visible to all customers on the website travel portal.
                </p>
              </div>

              <div
                onClick={() => updateField("status", "Draft")}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  formData.status === "Draft"
                    ? "border-amber-500 bg-amber-50/50 dark:bg-amber-950/30 shadow-xs"
                    : "border-border/70 bg-background hover:bg-muted/30"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <Badge className="bg-amber-600 text-white font-semibold text-xs">Draft</Badge>
                  {formData.status === "Draft" ? <Check className="size-4 text-amber-600" /> : null}
                </div>
                <p className="text-xs font-semibold text-navy dark:text-foreground">Draft Mode</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Saved privately for internal admin review.
                </p>
              </div>

              <div
                onClick={() => updateField("status", "Inactive")}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  formData.status === "Inactive"
                    ? "border-slate-500 bg-slate-100/70 dark:bg-slate-900/50 shadow-xs"
                    : "border-border/70 bg-background hover:bg-muted/30"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <Badge className="bg-slate-700 text-white font-semibold text-xs">Inactive</Badge>
                  {formData.status === "Inactive" ? <Check className="size-4 text-slate-700 dark:text-slate-300" /> : null}
                </div>
                <p className="text-xs font-semibold text-navy dark:text-foreground">Inactive / Archived</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Temporarily hidden from public website.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* STICKY ACTIONS FOOTER */}
        {/* ========================================================================= */}
        <DialogFooter className="p-4 px-6 border-t border-border/80 bg-background/95 backdrop-blur flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-muted-foreground order-2 sm:order-1">
            <span>* Required fields must be completed.</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end order-1 sm:order-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="h-9 text-xs px-4 border-border"
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => handleFormSubmit("Draft")}
              className="h-9 text-xs px-4 font-semibold text-amber-900 dark:text-amber-200 bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/60 dark:hover:bg-amber-950"
            >
              Save as Draft
            </Button>

            <Button
              type="button"
              size="sm"
              onClick={() => handleFormSubmit(formData.status === "Draft" ? "Active" : formData.status)}
              className="h-9 text-xs px-5 bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold shadow-sm gap-1.5"
            >
              <CheckCircle2 className="size-3.5" />
              {isEditing ? "Save Changes" : "Publish Package"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
