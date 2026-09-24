import { SITE_MEDIA, type SiteImage } from "@/config/site-media";

export interface TravelDestination {
  name: string;
  image: SiteImage;
}

/** Sri Lanka destination showcase — the inbound half of "Popular Destinations". */
export const SRI_LANKA_DESTINATIONS: readonly TravelDestination[] = [
  { name: "Colombo", image: SITE_MEDIA.travelDestinations.colombo },
  { name: "Kandy", image: SITE_MEDIA.travelDestinations.kandy },
  { name: "Ella", image: SITE_MEDIA.travelDestinations.ella },
  { name: "Galle", image: SITE_MEDIA.travelDestinations.galle },
  { name: "Nuwara Eliya", image: SITE_MEDIA.travelDestinations.nuwaraEliya },
  { name: "Sigiriya", image: SITE_MEDIA.travelDestinations.sigiriya },
  { name: "Mirissa", image: SITE_MEDIA.travelDestinations.mirissa },
  { name: "Yala", image: SITE_MEDIA.travelDestinations.yala },
];

/** International destination showcase — the outbound half of "Popular Destinations". */
export const INTERNATIONAL_DESTINATIONS: readonly TravelDestination[] = [
  { name: "Dubai", image: SITE_MEDIA.travelDestinations.dubai },
  { name: "Singapore", image: SITE_MEDIA.travelDestinations.singapore },
  { name: "Thailand", image: SITE_MEDIA.travelDestinations.thailand },
  { name: "Maldives", image: SITE_MEDIA.travelDestinations.maldives },
  { name: "India", image: SITE_MEDIA.travelDestinations.india },
  { name: "Malaysia", image: SITE_MEDIA.travelDestinations.malaysia },
  { name: "Europe", image: SITE_MEDIA.travelDestinations.europe },
];
