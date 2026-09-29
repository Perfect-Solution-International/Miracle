export type TravelType = "Inbound" | "Outbound";

export type PackageStatus = "Active" | "Draft" | "Inactive";

export type Currency = "USD" | "LKR";

export type InquiryType =
  | "Inbound Tour"
  | "Outbound Tour"
  | "Customize Trip"
  | "Flight Tickets"
  | "Visa Services"
  | "Work Visa"
  | "Import & Export"
  | "Trading & Sourcing"
  | "Business Solutions"
  | "General Inquiry"
  | (string & {});

export type InquiryStatus =
  | "New"
  | "Reviewing"
  | "In Progress"
  | "Replied"
  | "Completed"
  | "Cancelled"
  | "Pending"
  | "Confirmed"
  | "Rescheduled";

export type TravelRequestStatus = InquiryStatus;

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  image?: string;
}

export interface TravelPackage {
  id: string;
  slug?: string;
  name: string;
  travelType: TravelType;
  destination: string;
  country?: string;
  duration: string;
  price?: number | null;
  currency?: Currency;
  shortDescription: string;
  description: string;
  highlights?: string[];
  itinerary?: ItineraryDay[];
  includedItems?: string[];
  includedServices?: string;
  accommodation?: string;
  transportation?: string;
  whatToExpect?: string;
  entryRequirements?: string;
  visaInformation?: string;
  images: string[];
  coverImage?: string;
  status: PackageStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface TravelPackageFormData {
  name: string;
  travelType: TravelType;
  destination: string;
  country?: string;
  duration: string;
  price?: number | null;
  currency?: Currency;
  shortDescription: string;
  description: string;
  highlights?: string[];
  itinerary?: ItineraryDay[];
  includedItems?: string[];
  includedServices?: string;
  accommodation?: string;
  transportation?: string;
  whatToExpect?: string;
  entryRequirements?: string;
  visaInformation?: string;
  images: string[];
  coverImage?: string;
  status: PackageStatus;
}

export interface InquiryReply {
  id: string;
  sender: string;
  senderEmail: string;
  recipientEmail: string;
  subject: string;
  message: string;
  sentAt: string;
}

export interface TravelInquiry {
  id: string;
  referenceNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  whatsappNumber?: string;
  inquiryType: InquiryType;
  travelType: TravelType;
  packageName: string;
  packageId?: string;
  destination: string;
  travelDate: string;
  travelers: string | number;
  additionalRequirements?: string;
  documents?: string[];
  status: InquiryStatus;
  submittedDate: string;
  replyHistory?: InquiryReply[];
}

export type TravelRequest = TravelInquiry;

export interface PublicTravelInquiryFormData {
  fullName: string;
  email: string;
  contactNumber: string;
  whatsappNumber?: string;
  inquiryType: InquiryType;
  selectedPackage: string;
  destination: string;
  preferredTravelDate: string;
  travelers: string | number;
  additionalRequirements?: string;
  documents?: string[];
}
