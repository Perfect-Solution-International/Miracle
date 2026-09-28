"use client";

import {
  AlertCircle,
  Check,
  CheckCircle2,
  DollarSign,
  FileText,
  Globe,
  Globe2,
  HelpCircle,
  Image as ImageIcon,
  Info,
  Layers,
  MapPin,
  Palmtree,
  Plus,
  PlusCircle,
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
  PackageStatus,
  TravelPackage,
  TravelPackageFormData,
  TravelType,
} from "./types";

interface TravelPackageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: TravelPackageFormData, editId?: string) => void;
  editingPackage?: TravelPackage | null;
}

const PRESET_HIGHLIGHTS = [
  "Beach experience",
  "Cultural attractions",
  "Wildlife experience",
  "Mountain / hill country",
  "Adventure activities",
  "Ayurveda & Wellness",
  "UNESCO Heritage Sites",
  "Scenic Train Rides",
];

const PRESET_INCLUDED_OPTIONS = [
  "Accommodation",
  "Transportation",
  "Airport Transfer",
  "Sightseeing",
  "Guided Tours",
  "Activities",
  "Meals",
  "Travel Insurance Assistance",
];

const DEFAULT_FORM: TravelPackageFormData = {
  name: "",
  travelType: "Inbound",
  destination: "",
  country: "Sri Lanka",
  duration: "",
  price: null,
  currency: "USD",
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
}: TravelPackageDialogProps) {
  const [formData, setFormData] = useState<TravelPackageFormData>(DEFAULT_FORM);
  const [priceInput, setPriceInput] = useState<string>("");
  const [highlightInput, setHighlightInput] = useState<string>("");
  const [customIncludedInput, setCustomIncludedInput] = useState<string>("");
  const [imageUrlInput, setImageUrlInput] = useState<string>("");
  const [error, setError] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEditing = Boolean(editingPackage);

  useEffect(() => {
    if (editingPackage) {
      setFormData({
        name: editingPackage.name || "",
        travelType: editingPackage.travelType || "Inbound",
        destination: editingPackage.destination || "",
        country: editingPackage.country || (editingPackage.travelType === "Inbound" ? "Sri Lanka" : ""),
        duration: editingPackage.duration || "",
        price: editingPackage.price ?? null,
        currency: editingPackage.currency ?? (editingPackage.travelType === "Inbound" ? "LKR" : "USD"),
        shortDescription: editingPackage.shortDescription || "",
        description: editingPackage.description || "",
        highlights: editingPackage.highlights || [],
        itinerary: editingPackage.itinerary || [],
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
      setFormData(DEFAULT_FORM);
      setPriceInput("");
    }
    setError("");
    setHighlightInput("");
    setCustomIncludedInput("");
    setImageUrlInput("");
  }, [editingPackage, open]);

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
      currency: formData.currency || "USD",
      status: effectiveStatus,
      coverImage: formData.coverImage || formData.images[0] || "",
    };

    setError("");
    onSubmit(payload, editingPackage?.id);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl w-[95vw] lg:w-[90vw] max-h-[92vh] flex flex-col p-0 rounded-2xl shadow-2xl bg-card border border-border/80 overflow-hidden">
        {/* Modal Header */}
        <DialogHeader className="p-6 pb-4 border-b border-border/70 bg-gradient-to-r from-slate-50 via-white to-blue-50/40 dark:from-slate-900/60 dark:via-card dark:to-slate-900/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
                  <Palmtree className="size-4.5" />
                </div>
                <DialogTitle className="text-xl font-bold text-navy dark:text-foreground">
                  {isEditing ? "Edit Travel Package" : "Add New Travel Package"}
                </DialogTitle>
                <Badge
                  variant="outline"
                  className={
                    formData.status === "Active"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-400"
                      : formData.status === "Draft"
                        ? "bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/40 dark:text-amber-400"
                        : "bg-muted text-muted-foreground"
                  }
                >
                  {formData.status}
                </Badge>
              </div>
              <DialogDescription className="text-xs text-muted-foreground mt-1">
                Configure comprehensive itinerary specifications, pricing, highlights, services, and media assets.
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
          {/* SECTION 1 — BASIC PACKAGE INFORMATION */}
          {/* ========================================================================= */}
          <div className="bg-card rounded-xl border border-border/70 p-5 md:p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2.5 border-b border-border/50 pb-3">
              <div className="flex size-6 items-center justify-center rounded-md bg-brand-blue/10 text-brand-blue font-bold text-xs">
                1
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy dark:text-foreground">
                Basic Package Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {/* Package Name */}
              <div className="md:col-span-2 space-y-1.5">
                <Label htmlFor="pkg-name" className="text-xs font-semibold flex items-center justify-between">
                  <span>Package Name <span className="text-brand-red">*</span></span>
                  <span className="text-[11px] text-muted-foreground font-normal">Primary title displayed across website and itineraries</span>
                </Label>
                <Input
                  id="pkg-name"
                  placeholder="e.g. Sri Lanka Cultural & Wildlife Heritage Tour"
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
                    if (newType === "Inbound" && !formData.country) {
                      updateField("country", "Sri Lanka");
                    }
                  }}
                >
                  <SelectTrigger id="pkg-type" className="h-10 text-xs bg-background">
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
                  placeholder="e.g. Sri Lanka, Maldives, UAE"
                  value={formData.country || ""}
                  onChange={(e) => updateField("country", e.target.value)}
                  className="h-10 text-xs bg-background"
                />
              </div>

              {/* Destination */}
              <div className="space-y-1.5">
                <Label htmlFor="pkg-dest" className="text-xs font-semibold">
                  Destination(s) <span className="text-brand-red">*</span>
                </Label>
                <Input
                  id="pkg-dest"
                  placeholder="e.g. Colombo, Sigiriya, Kandy, Nuwara Eliya, Yala"
                  value={formData.destination}
                  onChange={(e) => updateField("destination", e.target.value)}
                  className="h-10 text-xs bg-background"
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
                  className="h-10 text-xs bg-background"
                  required
                />
              </div>

              {/* Package Price & Currency */}
              <div className="space-y-1.5">
                <Label htmlFor="pkg-price" className="text-xs font-semibold flex items-center justify-between">
                  <span>Package Price</span>
                  <span className="text-[11px] text-muted-foreground font-normal">Optional / Leave empty if on inquiry</span>
                </Label>
                <div className="flex gap-2">
                  <Select
                    value={formData.currency || "USD"}
                    onValueChange={(val) => updateField("currency", val as Currency)}
                  >
                    <SelectTrigger className="h-10 w-28 text-xs bg-background font-medium">
                      <SelectValue placeholder="USD" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="LKR">LKR (Rs)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    id="pkg-price"
                    type="number"
                    min="0"
                    step="any"
                    placeholder="e.g. 1450"
                    value={priceInput}
                    onChange={(e) => setPriceInput(e.target.value)}
                    className="h-10 text-xs flex-1 bg-background font-medium"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div className="md:col-span-2 space-y-1.5">
                <Label htmlFor="pkg-short-desc" className="text-xs font-semibold">
                  Short Description / Tagline
                </Label>
                <Input
                  id="pkg-short-desc"
                  placeholder="Brief one-line summary highlighting the unique experience (e.g. An unforgettable 7-day luxury wildlife & cultural expedition)"
                  value={formData.shortDescription}
                  onChange={(e) => updateField("shortDescription", e.target.value)}
                  className="h-10 text-xs bg-background"
                />
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 2 — PACKAGE DESCRIPTION */}
          {/* ========================================================================= */}
          <div className="bg-card rounded-xl border border-border/70 p-5 md:p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 border-b border-border/50 pb-3">
              <div className="flex size-6 items-center justify-center rounded-md bg-brand-blue/10 text-brand-blue font-bold text-xs">
                2
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy dark:text-foreground">
                Package Description
              </h3>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="pkg-desc" className="text-xs font-semibold">
                Full Package Overview &amp; Itinerary Summary
              </Label>
              <Textarea
                id="pkg-desc"
                rows={5}
                placeholder="Provide a comprehensive narrative of the journey, daily overview, scenic routes, historical context, and tour milestones..."
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                className="text-xs leading-relaxed bg-background min-h-[120px]"
              />
              <p className="text-[11px] text-muted-foreground">
                Detailed description helps travelers understand what makes this package special.
              </p>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 3 — PACKAGE HIGHLIGHTS */}
          {/* ========================================================================= */}
          <div className="bg-card rounded-xl border border-border/70 p-5 md:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-border/50 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex size-6 items-center justify-center rounded-md bg-brand-blue/10 text-brand-blue font-bold text-xs">
                  3
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-navy dark:text-foreground">
                    Package Highlights
                  </h3>
                </div>
              </div>
              <span className="text-xs font-semibold text-brand-blue">
                {(formData.highlights || []).length} highlights added
              </span>
            </div>

            {/* Quick Suggestion Chips */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="size-3 text-amber-500" />
                Quick Suggestions (Click to Add):
              </span>
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

            {/* Custom Input */}
            <div className="flex gap-2 pt-1">
              <Input
                placeholder="Type a custom highlight (e.g. Scenic blue train ride to Ella, Leopard safari in Yala)"
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

            {/* Added Highlights Badges */}
            {(formData.highlights || []).length > 0 ? (
              <div className="flex flex-wrap gap-2 pt-2 p-3 bg-muted/30 rounded-xl border border-border/60">
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
                No highlights added yet. Select from suggestions above or enter custom key highlights.
              </p>
            )}
          </div>

          {/* ========================================================================= */}
          {/* SECTION 4 — WHAT'S INCLUDED */}
          {/* ========================================================================= */}
          <div className="bg-card rounded-xl border border-border/70 p-5 md:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-border/50 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex size-6 items-center justify-center rounded-md bg-brand-blue/10 text-brand-blue font-bold text-xs">
                  4
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-navy dark:text-foreground">
                  What&apos;s Included
                </h3>
              </div>
              <span className="text-xs font-semibold text-emerald-600">
                {(formData.includedItems || []).length} items included
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
                  placeholder="e.g. Wildlife Safari Jeep entrance fee, English speaking naturalist guide"
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
                  Add Item
                </Button>
              </div>
            </div>

            {/* Custom Tag Display if non-preset items exist */}
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

            {/* Additional Inclusions Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <Label htmlFor="pkg-accom" className="text-xs font-semibold">
                  Accommodation Specifications
                </Label>
                <Textarea
                  id="pkg-accom"
                  rows={2}
                  placeholder="e.g. 4-Star & 5-Star Boutique Hotels, luxury eco-lodges with daily breakfast"
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
                  placeholder="e.g. Private air-conditioned luxury vehicle with dedicated English-speaking chauffeur-guide"
                  value={formData.transportation || ""}
                  onChange={(e) => updateField("transportation", e.target.value)}
                  className="text-xs bg-background"
                />
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 5 — WHAT TO EXPECT */}
          {/* ========================================================================= */}
          <div className="bg-card rounded-xl border border-border/70 p-5 md:p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 border-b border-border/50 pb-3">
              <div className="flex size-6 items-center justify-center rounded-md bg-brand-blue/10 text-brand-blue font-bold text-xs">
                5
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy dark:text-foreground">
                What to Expect
              </h3>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="pkg-expect" className="text-xs font-semibold">
                Travel Experience, Activity Pace &amp; Practical Advice
              </Label>
              <Textarea
                id="pkg-expect"
                rows={4}
                placeholder="Describe the overall pace, physical activity level, climate advice, attire guidelines for religious/cultural sites, photography tips, and travel nuances..."
                value={formData.whatToExpect || ""}
                onChange={(e) => updateField("whatToExpect", e.target.value)}
                className="text-xs leading-relaxed bg-background min-h-[100px]"
              />
              <p className="text-[11px] text-muted-foreground">
                Guides travelers on what clothes to pack, weather preparation, and daily activity intensity.
              </p>
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
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy dark:text-foreground">
                Entry Requirements &amp; Visa Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <div className="space-y-1.5">
                <Label htmlFor="pkg-entry" className="text-xs font-semibold flex items-center gap-1.5">
                  <ShieldAlert className="size-3.5 text-brand-blue" />
                  Entry &amp; Health Requirements
                </Label>
                <Textarea
                  id="pkg-entry"
                  rows={4}
                  placeholder="e.g. Passport must be valid for at least 6 months from arrival date. Return air ticket and proof of sufficient funds required."
                  value={formData.entryRequirements || ""}
                  onChange={(e) => updateField("entryRequirements", e.target.value)}
                  className="text-xs leading-relaxed bg-background"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pkg-visa" className="text-xs font-semibold flex items-center gap-1.5">
                  <Globe2 className="size-3.5 text-brand-blue" />
                  Visa Guidelines &amp; ETA Information
                </Label>
                <Textarea
                  id="pkg-visa"
                  rows={4}
                  placeholder="e.g. Electronic Travel Authorization (ETA) required before departure. Our visa desk can handle processing or travelers can apply online."
                  value={formData.visaInformation || ""}
                  onChange={(e) => updateField("visaInformation", e.target.value)}
                  className="text-xs leading-relaxed bg-background"
                />
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 7 — PACKAGE IMAGES */}
          {/* ========================================================================= */}
          <div className="bg-card rounded-xl border border-border/70 p-5 md:p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-border/50 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex size-6 items-center justify-center rounded-md bg-brand-blue/10 text-brand-blue font-bold text-xs">
                  7
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-navy dark:text-foreground">
                  Package Images &amp; Gallery
                </h3>
              </div>
              <span className="text-xs font-semibold text-brand-blue">
                {(formData.images || []).length} images uploaded
              </span>
            </div>

            {/* Upload Area / URL Input */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Local File Upload Dropzone */}
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
                  <p className="text-xs font-semibold text-foreground">Click to browse or upload images</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Supports PNG, JPG, WEBP formats</p>
                </div>
              </div>

              {/* Add by Image URL */}
              <div className="p-5 rounded-xl border border-border/70 bg-muted/10 space-y-3 flex flex-col justify-center">
                <Label htmlFor="pkg-img-url" className="text-xs font-semibold">
                  Or Add Image by Direct Web URL:
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
                <p className="text-[11px] text-muted-foreground">
                  Paste high-resolution photo links from your CDN or image host.
                </p>
              </div>
            </div>

            {/* Visual Image Previews Grid */}
            {(formData.images || []).length > 0 ? (
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Gallery Previews (Click star to set Cover Image):
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
                              // fallback if invalid image url
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

                        {/* Card Footer Bar */}
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
                            {isCover ? "Main Cover" : "Make Cover"}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="p-1 text-muted-foreground hover:text-brand-red transition-colors rounded hover:bg-red-50 dark:hover:bg-red-950/40"
                            aria-label="Remove image"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-muted/20 border border-border/50 text-center text-muted-foreground">
                <ImageIcon className="size-8 mx-auto mb-2 text-muted-foreground/50" />
                <p className="text-xs font-semibold">No images added yet</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Upload package photos or add image links to showcase this travel itinerary.
                </p>
              </div>
            )}
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
                Package Status
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
                  Saved privately for internal admin review before public release.
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
                <p className="text-xs font-semibold text-navy dark:text-foreground">Archived / Inactive</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Temporarily hidden or archived itinerary.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 9 — STICKY ACTIONS FOOTER */}
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
