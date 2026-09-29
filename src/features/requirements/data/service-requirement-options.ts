import { ROUTES } from "@/config/routes";

export type ServiceContext = "business" | "it";

export const SERVICE_OPTIONS = {
  business: [
    "Start a Business",
    "Business Consultation",
    "Business Planning",
    "Business Setup Support",
    "Business Expansion",
    "Machinery & Equipment",
    "Business Technology",
    "Business Support",
    "Other Business Requirement",
  ],
  it: [
    "Website Development",
    "Software Development",
    "POS System Development",
    "Business Management Systems",
    "Digital Solutions",
    "IT Consulting",
    "Business Automation",
    "Other IT Requirement",
  ],
} as const;

export const SERVICE_BY_PATH: Record<string, string> = {
  [ROUTES.public.businessStart]: "Start a Business",
  [ROUTES.public.businessConsultation]: "Business Consultation",
  [ROUTES.public.businessPlanning]: "Business Planning",
  [ROUTES.public.businessSetup]: "Business Setup Support",
  [ROUTES.public.businessExpansion]: "Business Expansion",
  [ROUTES.public.businessMachinery]: "Machinery & Equipment",
  [ROUTES.public.businessTechnology]: "Business Technology",
  [ROUTES.public.businessSupport]: "Business Support",
  [ROUTES.public.websiteDevelopment]: "Website Development",
  [ROUTES.public.softwareDevelopment]: "Software Development",
  [ROUTES.public.posSystemDevelopment]: "POS System Development",
  [ROUTES.public.businessManagementSystems]: "Business Management Systems",
  [ROUTES.public.digitalSolutions]: "Digital Solutions",
  [ROUTES.public.itConsulting]: "IT Consulting",
  [ROUTES.public.businessAutomation]: "Business Automation",
};
