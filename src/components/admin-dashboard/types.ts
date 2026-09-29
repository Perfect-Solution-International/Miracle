export type RequestStatus =
  | "Pending"
  | "Reviewing"
  | "Confirmed"
  | "Completed"
  | "Cancelled"
  | "Rescheduled";

export type ServiceType =
  | "Travel"
  | "Flight Tickets"
  | "Work Visa"
  | "Visa & Passport"
  | "Import & Export"
  | "Trading"
  | "Business Solutions"
  | "Investment"
  | "Franchise";

export interface ServiceRequest {
  id: string;
  referenceNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCompany?: string;
  requestType: string;
  service: ServiceType;
  date: string;
  timestamp: string;
  status: RequestStatus;
  priority: "High" | "Medium" | "Low";
  notes: string;
  destinationOrScope?: string;
  assignedStaff?: string;
}

export interface TravelBooking {
  id: string;
  bookingRef: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  package: string;
  destination: string;
  travelDate: string;
  travelers: string;
  status: RequestStatus;
  notes?: string;
  flightIncluded: boolean;
  hotelCategory: string;
}

export interface ServiceOverviewItem {
  service: ServiceType;
  count: number;
  percentage: number;
  pendingCount: number;
  reviewingCount: number;
  activeCount: number;
  completedCount: number;
}

export interface TravelPackageFormData {
  title: string;
  destination: string;
  duration: string;
  category: "Business" | "Leisure" | "Inbound" | "Outbound" | "Tech Tour" | "Cultural";
  priceEstimate?: string;
  description: string;
  status: "Draft" | "Published" | "Archived";
  maxGroupSize?: number;
}
