"use client";

import { useEffect, useState } from "react";
import type {
  InquiryReply,
  InquiryStatus,
  PackageStatus,
  PublicTravelInquiryFormData,
  TravelInquiry,
  TravelPackage,
  TravelPackageFormData,
  TravelType,
} from "@/components/admin-travel/types";

const PACKAGES_STORAGE_KEY = "miracle_admin_travel_packages";
const INQUIRIES_STORAGE_KEY = "miracle_admin_travel_inquiries";
const TRAVEL_EVENT_KEY = "miracle_travel_store_updated";

import { DEFAULT_PACKAGES } from "./default-travel-packages";
export { DEFAULT_PACKAGES } from "./default-travel-packages";

function notifyStoreUpdate() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(TRAVEL_EVENT_KEY));
  }
}

export function getStoredPackages(): TravelPackage[] {
  if (typeof window === "undefined") return DEFAULT_PACKAGES;
  try {
    const raw = localStorage.getItem(PACKAGES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PACKAGES_STORAGE_KEY, JSON.stringify(DEFAULT_PACKAGES));
      return DEFAULT_PACKAGES;
    }
    const parsed: TravelPackage[] = JSON.parse(raw);
    let modified = false;

    // Sanitize packages: Inbound packages MUST be in LKR and have proper place imagery
    const sanitized = parsed.map((pkg) => {
      let updated = { ...pkg };
      if (updated.travelType === "Inbound") {
        if (updated.currency !== "LKR") {
          updated.currency = "LKR";
          if (updated.price && updated.price < 50000) {
            updated.price = updated.price * 100; // e.g. 1650 -> 165000
          }
          modified = true;
        }
      }
      return updated;
    });

    if (modified) {
      localStorage.setItem(PACKAGES_STORAGE_KEY, JSON.stringify(sanitized));
    }

    return sanitized;
  } catch {
    return DEFAULT_PACKAGES;
  }
}

export function saveStoredPackages(packages: TravelPackage[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PACKAGES_STORAGE_KEY, JSON.stringify(packages));
    notifyStoreUpdate();
  } catch (err) {
    console.error("Failed to save packages to localStorage:", err);
  }
}

export function getStoredInquiries(): TravelInquiry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(INQUIRIES_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveStoredInquiries(inquiries: TravelInquiry[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(inquiries));
    notifyStoreUpdate();
  } catch (err) {
    console.error("Failed to save inquiries to localStorage:", err);
  }
}

// React Hook for dynamic synchronized state across pages and components
export function useTravelStore() {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [inquiries, setInquiries] = useState<TravelInquiry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const reloadData = () => {
    setPackages(getStoredPackages());
    setInquiries(getStoredInquiries());
  };

  useEffect(() => {
    reloadData();
    setIsLoaded(true);

    const handleStorage = () => reloadData();
    window.addEventListener("storage", handleStorage);
    window.addEventListener(TRAVEL_EVENT_KEY, handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(TRAVEL_EVENT_KEY, handleStorage);
    };
  }, []);

  // --- Package Actions ---
  const addPackage = (data: TravelPackageFormData): TravelPackage => {
    const newPkg: TravelPackage = {
      id: `pkg-${Date.now()}`,
      slug: data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      ...data,
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };
    const updated = [newPkg, ...packages];
    saveStoredPackages(updated);
    setPackages(updated);
    return newPkg;
  };

  const updatePackage = (id: string, data: Partial<TravelPackageFormData>): void => {
    const updated = packages.map((pkg) =>
      pkg.id === id
        ? {
            ...pkg,
            ...data,
            updatedAt: new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
          }
        : pkg,
    );
    saveStoredPackages(updated);
    setPackages(updated);
  };

  const deletePackage = (id: string): void => {
    const updated = packages.filter((pkg) => pkg.id !== id);
    saveStoredPackages(updated);
    setPackages(updated);
  };

  const togglePackageStatus = (id: string, newStatus: PackageStatus): void => {
    updatePackage(id, { status: newStatus });
  };

  // --- Inquiry Actions ---
  const submitInquiry = (data: PublicTravelInquiryFormData): TravelInquiry => {
    const refNum = `TRV-${Math.floor(100000 + Math.random() * 900000)}`;
    const travelType: TravelType = data.inquiryType.includes("Outbound") ? "Outbound" : "Inbound";
    
    const newInquiry: TravelInquiry = {
      id: `inq-${Date.now()}`,
      referenceNumber: refNum,
      customerName: data.fullName,
      customerEmail: data.email,
      customerPhone: data.contactNumber,
      whatsappNumber: data.whatsappNumber || data.contactNumber,
      inquiryType: data.inquiryType,
      travelType,
      packageName: data.selectedPackage,
      destination: data.destination,
      travelDate: data.preferredTravelDate,
      travelers: data.travelers,
      additionalRequirements: data.additionalRequirements || "",
      documents: data.documents || [],
      status: "New",
      submittedDate: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      replyHistory: [],
    };

    const currentInquiries = getStoredInquiries();
    const updated = [newInquiry, ...currentInquiries];
    saveStoredInquiries(updated);
    setInquiries(updated);
    return newInquiry;
  };

  const updateInquiryStatus = (id: string, newStatus: InquiryStatus): void => {
    const currentInquiries = getStoredInquiries();
    const updated = currentInquiries.map((inq) =>
      inq.id === id ? { ...inq, status: newStatus } : inq,
    );
    saveStoredInquiries(updated);
    setInquiries(updated);
  };

  const addInquiryReply = (
    id: string,
    replyData: Omit<InquiryReply, "id" | "sentAt">,
  ): InquiryReply => {
    const newReply: InquiryReply = {
      id: `rep-${Date.now()}`,
      ...replyData,
      sentAt: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    };

    const currentInquiries = getStoredInquiries();
    const updated = currentInquiries.map((inq) => {
      if (inq.id === id) {
        const history = inq.replyHistory || [];
        return {
          ...inq,
          status: "Replied" as InquiryStatus,
          replyHistory: [...history, newReply],
        };
      }
      return inq;
    });

    saveStoredInquiries(updated);
    setInquiries(updated);
    return newReply;
  };

  const deleteInquiry = (id: string): void => {
    const currentInquiries = getStoredInquiries();
    const updated = currentInquiries.filter((inq) => inq.id !== id);
    saveStoredInquiries(updated);
    setInquiries(updated);
  };

  return {
    packages,
    inquiries,
    isLoaded,
    inboundPackages: packages.filter((p) => p.travelType === "Inbound"),
    outboundPackages: packages.filter((p) => p.travelType === "Outbound"),
    addPackage,
    updatePackage,
    deletePackage,
    togglePackageStatus,
    submitInquiry,
    updateInquiryStatus,
    addInquiryReply,
    deleteInquiry,
  };
}
