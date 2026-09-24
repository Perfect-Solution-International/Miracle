import { SITE_MEDIA, type SiteImage } from "@/config/site-media";

export interface TravelDestination {
  name: string;
  description: string;
  image: SiteImage;
}

/** Sri Lanka destination showcase — "Where Will You Go?" */
export const SRI_LANKA_DESTINATIONS: readonly TravelDestination[] = [
  {
    name: "Ella",
    description: "Hill-country views, hikes and the Nine Arch Bridge.",
    image: SITE_MEDIA.travelDestinations.ella,
  },
  {
    name: "Sigiriya",
    description: "The ancient rock fortress rising from the plains.",
    image: SITE_MEDIA.travelDestinations.sigiriya,
  },
  {
    name: "Kandy",
    description: "The cultural heart of Sri Lanka, by a misty lake.",
    image: SITE_MEDIA.travelDestinations.kandy,
  },
  {
    name: "Galle",
    description: "A colonial fort town on the southern coast.",
    image: SITE_MEDIA.travelDestinations.galle,
  },
  {
    name: "Nuwara Eliya",
    description: "Cool climate, tea estates and rolling green hills.",
    image: SITE_MEDIA.travelDestinations.nuwaraEliya,
  },
  {
    name: "Yala",
    description: "Safari country, home to leopards and elephants.",
    image: SITE_MEDIA.travelDestinations.yala,
  },
  {
    name: "Mirissa",
    description: "Palm-lined beaches and seasonal whale watching.",
    image: SITE_MEDIA.travelDestinations.mirissa,
  },
  {
    name: "Bentota",
    description: "Golden beaches, water sports and riverside resorts.",
    image: SITE_MEDIA.travelDestinations.bentota,
  },
  {
    name: "Colombo",
    description: "The commercial capital, gateway to your journey.",
    image: SITE_MEDIA.travelDestinations.colombo,
  },
  {
    name: "Arugam Bay",
    description: "A laid-back east-coast escape loved by surfers.",
    image: SITE_MEDIA.travelDestinations.arugamBay,
  },
];

/** International destination showcase, used on the Outbound Travel page. */
export const INTERNATIONAL_DESTINATIONS: readonly TravelDestination[] = [
  {
    name: "Dubai",
    description: "Skyline views, desert safaris and world-class shopping.",
    image: SITE_MEDIA.travelDestinations.dubai,
  },
  {
    name: "Singapore",
    description: "A modern city-state of gardens and skyline views.",
    image: SITE_MEDIA.travelDestinations.singapore,
  },
  {
    name: "Thailand",
    description: "Limestone cliffs, islands and vibrant street life.",
    image: SITE_MEDIA.travelDestinations.thailand,
  },
  {
    name: "Maldives",
    description: "Overwater villas and turquoise lagoons.",
    image: SITE_MEDIA.travelDestinations.maldives,
  },
  {
    name: "India",
    description: "Ancient monuments and vast cultural diversity.",
    image: SITE_MEDIA.travelDestinations.india,
  },
  {
    name: "Malaysia",
    description: "Twin towers, rainforest and island escapes.",
    image: SITE_MEDIA.travelDestinations.malaysia,
  },
  {
    name: "Europe",
    description: "Historic cities and coastlines across the continent.",
    image: SITE_MEDIA.travelDestinations.europe,
  },
];
