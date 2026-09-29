import type { ServiceRequest, TravelBooking, ServiceOverviewItem, ServiceType } from "./types";

export const INITIAL_SUMMARY_STATS = {
  totalCustomers: {
    value: "0",
    label: "Total Customers",
    hint: "Registered customer accounts",
  },
  pendingRequests: {
    value: "0",
    label: "Pending Requests",
    hint: "Requires admin review",
  },
  travelBookings: {
    value: "0",
    label: "Travel Bookings",
    hint: "Active travel & tour bookings",
  },
  flightTicketRequests: {
    value: "0",
    label: "Flight Ticket Requests",
    hint: "Flight inquiries & ticketing",
  },
  workVisaRequests: {
    value: "0",
    label: "Work Visa Requests",
    hint: "Visa applications & documents",
  },
  importExportRequests: {
    value: "0",
    label: "Import & Export Requests",
    hint: "Customs & logistics clearance",
  },
  tradingRequests: {
    value: "0",
    label: "Trading Requests",
    hint: "Sourcing & trade inquiries",
  },
  businessRequests: {
    value: "0",
    label: "Business Requests",
    hint: "Setup, consultation & planning",
  },
};

export const ALL_SERVICE_TYPES: ServiceType[] = [
  "Travel",
  "Flight Tickets",
  "Work Visa",
  "Visa & Passport",
  "Import & Export",
  "Trading",
  "Business Solutions",
  "Investment",
  "Franchise",
];

export const INITIAL_SERVICE_OVERVIEW: ServiceOverviewItem[] = ALL_SERVICE_TYPES.map(
  (service) => ({
    service,
    count: 0,
    percentage: 0,
    pendingCount: 0,
    reviewingCount: 0,
    activeCount: 0,
    completedCount: 0,
  }),
);

export const INITIAL_RECENT_REQUESTS: ServiceRequest[] = [];

export const INITIAL_TRAVEL_BOOKINGS: TravelBooking[] = [];
