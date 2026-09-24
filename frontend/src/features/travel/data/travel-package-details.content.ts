import { SITE_MEDIA } from "@/config/site-media";

import type { TravelPackageDetail } from "../types/travel-package-detail.types";

/**
 * The full catalogue backing both the "Featured Travel Packages" cards and
 * each package's `/travel-tourism/packages/[slug]` page. Indicative pricing
 * only — there is no live rates engine yet, so every price is paired with
 * "final price on request" language rather than presented as a firm quote.
 */
export const TRAVEL_PACKAGE_DETAILS: readonly TravelPackageDetail[] = [
  {
    slug: "sri-lanka-highlights",
    title: "Sri Lanka Highlights",
    tagline: "The essential Sri Lanka journey, from ancient rock fortress to hill country.",
    image: SITE_MEDIA.travelPackagesFull.sriLankaHighlights,
    gallery: [
      SITE_MEDIA.travelDestinations.sigiriya,
      SITE_MEDIA.travelDestinations.kandy,
      SITE_MEDIA.travelDestinations.ella,
      SITE_MEDIA.travelDestinations.galle,
    ],
    popular: true,
    location: "Sri Lanka",
    travelers: "2–10 Travellers",
    travelType: "leisure",
    duration: { days: 7, nights: 6 },
    startingPrice: "From $650 per person",
    highlights: [
      "Climb Sigiriya rock fortress",
      "Nine Arch Bridge in Ella",
      "Historic Galle Fort",
      "Private guided transport",
    ],
    about:
      "Experience the beauty, culture and nature of Sri Lanka through a carefully planned 7-day journey covering the country's most popular destinations. Perfect for couples, families, friends and small groups.",
    destinations: ["Colombo", "Kandy", "Ella", "Galle"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Colombo",
        items: ["Airport pickup", "Hotel check-in", "Colombo city experience"],
      },
      {
        day: 2,
        title: "Colombo → Kandy",
        items: ["Travel to Kandy", "Cultural attractions", "Kandy city tour"],
      },
      {
        day: 3,
        title: "Kandy → Ella",
        items: ["Scenic journey", "Mountain views", "Ella accommodation"],
      },
      {
        day: 4,
        title: "Explore Ella",
        items: ["Nine Arch Bridge", "Little Adam's Peak", "Local sightseeing"],
      },
      {
        day: 5,
        title: "Ella → South Coast",
        items: ["Scenic journey", "Beach destination", "Hotel check-in"],
      },
      {
        day: 6,
        title: "Explore Galle",
        items: ["Galle Fort", "Beach activities", "Local experiences"],
      },
      { day: 7, title: "Departure", items: ["Hotel checkout", "Airport transfer"] },
    ],
    included: [
      "Hotel Accommodation",
      "Airport Transfers",
      "Private Transportation",
      "Selected Sightseeing",
      "Travel Assistance",
      "Local Travel Guide",
    ],
    notIncluded: [
      "International Flight Tickets",
      "Personal Expenses",
      "Optional Activities",
      "Travel Insurance",
      "Expenses not mentioned above",
    ],
    accommodation: {
      title: "3 / 4 Star options available",
      note: "Accommodation can be customized according to customer preference and budget.",
    },
    transportation: {
      title: "Private vehicle",
      note: "Airport transfers and transportation throughout the tour.",
    },
    visaInformation: [
      "Most nationalities can apply for a Sri Lanka Electronic Travel Authorization (ETA) online before departure.",
      "Our team can guide you through the ETA application as part of your booking.",
    ],
    audience: ["Couples", "Families", "Friends", "Small Groups"],
    importantInfo: [
      "Package duration can be customized.",
      "Destinations can be added or removed.",
      "Hotel category can be changed.",
      "Activities can be customized.",
      "Final price depends on selected options and requirements.",
    ],
  },
  {
    slug: "tropical-sri-lanka-escape",
    title: "Tropical Sri Lanka Escape",
    tagline: "A relaxed coastal getaway across Sri Lanka's palm-fringed south.",
    image: SITE_MEDIA.travelPackagesFull.tropicalSriLankaEscape,
    gallery: [
      SITE_MEDIA.travelDestinations.mirissa,
      SITE_MEDIA.travelDestinations.galle,
      SITE_MEDIA.travelDestinations.colombo,
    ],
    location: "Sri Lanka",
    travelers: "2–8 Travellers",
    travelType: "leisure",
    duration: { days: 5, nights: 4 },
    startingPrice: "From $420 per person",
    highlights: [
      "Palm-fringed south coast beaches",
      "Whale watching in Mirissa",
      "Historic Galle Fort",
      "Beachfront hotel stays",
    ],
    about:
      "Trade an itinerary packed with sightseeing for slow mornings, warm water and quiet beaches. This 5-day escape settles into Sri Lanka's south coast, with just enough exploring to see the highlights along the way.",
    destinations: ["Colombo", "Bentota", "Mirissa", "Galle"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Colombo",
        items: ["Airport pickup", "Transfer to the south coast", "Hotel check-in"],
      },
      {
        day: 2,
        title: "Bentota Beach",
        items: ["Beach relaxation", "Optional water sports", "River safari"],
      },
      {
        day: 3,
        title: "Bentota → Mirissa",
        items: ["Scenic coastal drive", "Whale watching (seasonal)", "Beach evening"],
      },
      {
        day: 4,
        title: "Explore Galle",
        items: ["Galle Fort walking tour", "Local cafes and shopping", "Sunset by the ramparts"],
      },
      { day: 5, title: "Departure", items: ["Hotel checkout", "Airport transfer"] },
    ],
    included: [
      "Beachfront Hotel Accommodation",
      "Airport Transfers",
      "Private Transportation",
      "Whale Watching Excursion",
      "Travel Assistance",
    ],
    notIncluded: [
      "International Flight Tickets",
      "Personal Expenses",
      "Optional Water Sports",
      "Travel Insurance",
      "Expenses not mentioned above",
    ],
    accommodation: {
      title: "3 / 4 Star beachfront hotels",
      note: "Accommodation can be customized according to customer preference and budget.",
    },
    transportation: {
      title: "Private vehicle",
      note: "Airport transfers and transportation throughout the tour.",
    },
    visaInformation: [
      "Most nationalities can apply for a Sri Lanka Electronic Travel Authorization (ETA) online before departure.",
      "Our team can guide you through the ETA application as part of your booking.",
    ],
    audience: ["Couples", "Friends", "Small Groups"],
    importantInfo: [
      "Whale watching is seasonal and weather-dependent.",
      "Package duration can be extended.",
      "Hotel category can be changed.",
      "Final price depends on selected options and requirements.",
    ],
  },
  {
    slug: "sri-lanka-adventure",
    title: "Sri Lanka Adventure",
    tagline: "White water, wildlife and hill-country trails for the more active traveller.",
    image: SITE_MEDIA.travelPackagesFull.sriLankaAdventure,
    gallery: [
      SITE_MEDIA.travelDestinations.ella,
      SITE_MEDIA.travelDestinations.yala,
      SITE_MEDIA.travelDestinations.nuwaraEliya,
    ],
    location: "Sri Lanka",
    travelers: "2–8 Travellers",
    travelType: "adventure",
    duration: { days: 8, nights: 7 },
    startingPrice: "From $780 per person",
    highlights: [
      "White water rafting in Kitulgala",
      "Yala National Park safari",
      "Hiking in Ella and Nuwara Eliya",
      "Local adventure guides",
    ],
    about:
      "An 8-day trail through Sri Lanka's more active side — river rapids, safari jeeps and hill-country hikes — for travellers who want their itinerary to move as much as they do.",
    destinations: ["Kitulgala", "Nuwara Eliya", "Ella", "Yala"],
    itinerary: [
      {
        day: 1,
        title: "Arrival → Kitulgala",
        items: ["Airport pickup", "Transfer to Kitulgala", "Riverside hotel check-in"],
      },
      {
        day: 2,
        title: "Kitulgala Rafting",
        items: ["White water rafting", "Rainforest walk", "Overnight in Kitulgala"],
      },
      {
        day: 3,
        title: "Kitulgala → Nuwara Eliya",
        items: ["Scenic hill-country drive", "Tea plantation visit", "Hotel check-in"],
      },
      {
        day: 4,
        title: "Explore Nuwara Eliya",
        items: ["Tea factory tour", "Horton Plains (optional)", "Local sightseeing"],
      },
      {
        day: 5,
        title: "Nuwara Eliya → Ella",
        items: ["Scenic train or road transfer", "Little Adam's Peak hike", "Ella accommodation"],
      },
      {
        day: 6,
        title: "Ella → Yala",
        items: ["Travel to Yala", "Nine Arch Bridge stop en route", "Hotel check-in"],
      },
      {
        day: 7,
        title: "Yala Safari",
        items: ["Morning safari jeep", "Wildlife spotting", "Evening safari (optional)"],
      },
      { day: 8, title: "Departure", items: ["Hotel checkout", "Airport transfer"] },
    ],
    included: [
      "Hotel Accommodation",
      "Airport Transfers",
      "Private Transportation",
      "White Water Rafting Session",
      "Yala Safari Jeep & Park Entry",
      "Local Adventure Guide",
    ],
    notIncluded: [
      "International Flight Tickets",
      "Personal Expenses",
      "Optional Evening Safari",
      "Travel Insurance",
      "Expenses not mentioned above",
    ],
    accommodation: {
      title: "3 / 4 Star options available",
      note: "Accommodation can be customized according to customer preference and budget.",
    },
    transportation: {
      title: "Private vehicle & safari jeep",
      note: "Airport transfers, road transport and safari jeep transfers included.",
    },
    visaInformation: [
      "Most nationalities can apply for a Sri Lanka Electronic Travel Authorization (ETA) online before departure.",
      "Our team can guide you through the ETA application as part of your booking.",
    ],
    audience: ["Friends", "Small Groups", "Solo Travellers"],
    importantInfo: [
      "Activity difficulty can be adjusted to the group's fitness level.",
      "Rafting and safari activities are weather and season dependent.",
      "Package duration can be customized.",
      "Final price depends on selected options and requirements.",
    ],
  },
  {
    slug: "cultural-sri-lanka-experience",
    title: "Cultural Sri Lanka Experience",
    tagline: "Ancient cities and ceremony across Sri Lanka's Cultural Triangle.",
    image: SITE_MEDIA.travelPackagesFull.culturalSriLankaExperience,
    gallery: [
      SITE_MEDIA.travelDestinations.sigiriya,
      SITE_MEDIA.travelDestinations.kandy,
      SITE_MEDIA.travelDestinations.colombo,
    ],
    location: "Sri Lanka",
    travelers: "2–10 Travellers",
    travelType: "leisure",
    duration: { days: 6, nights: 5 },
    startingPrice: "From $590 per person",
    highlights: [
      "Sigiriya rock fortress & Dambulla caves",
      "Ancient cities of Anuradhapura & Polonnaruwa",
      "Temple of the Sacred Tooth Relic, Kandy",
      "Traditional cultural performance",
    ],
    about:
      "A 6-day journey through Sri Lanka's Cultural Triangle — ancient capitals, cave temples and centuries of Buddhist heritage — guided throughout by a local expert in the island's history.",
    destinations: ["Colombo", "Anuradhapura", "Sigiriya", "Kandy"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Colombo",
        items: ["Airport pickup", "Transfer towards the Cultural Triangle", "Hotel check-in"],
      },
      {
        day: 2,
        title: "Anuradhapura",
        items: ["Ancient city ruins", "Sacred Bodhi Tree", "Local heritage guide"],
      },
      {
        day: 3,
        title: "Anuradhapura → Sigiriya",
        items: ["Dambulla Cave Temple", "Sigiriya rock fortress climb", "Hotel check-in"],
      },
      {
        day: 4,
        title: "Sigiriya → Kandy",
        items: ["Spice garden visit en route", "Kandy city tour", "Hotel check-in"],
      },
      {
        day: 5,
        title: "Explore Kandy",
        items: [
          "Temple of the Sacred Tooth Relic",
          "Royal Botanical Gardens",
          "Evening cultural dance performance",
        ],
      },
      {
        day: 6,
        title: "Departure",
        items: ["Hotel checkout", "Transfer to airport"],
      },
    ],
    included: [
      "Hotel Accommodation",
      "Airport Transfers",
      "Private Transportation",
      "Entrance Fees to Listed Sites",
      "Local Heritage Guide",
      "Cultural Dance Performance Ticket",
    ],
    notIncluded: [
      "International Flight Tickets",
      "Personal Expenses",
      "Optional Activities",
      "Travel Insurance",
      "Expenses not mentioned above",
    ],
    accommodation: {
      title: "3 / 4 Star options available",
      note: "Accommodation can be customized according to customer preference and budget.",
    },
    transportation: {
      title: "Private vehicle",
      note: "Airport transfers and transportation throughout the tour.",
    },
    visaInformation: [
      "Most nationalities can apply for a Sri Lanka Electronic Travel Authorization (ETA) online before departure.",
      "Our team can guide you through the ETA application as part of your booking.",
      "Modest dress is required at temple sites; shoulders and knees should be covered.",
    ],
    audience: ["Couples", "Families", "Friends", "Small Groups"],
    importantInfo: [
      "Sigiriya rock fortress involves a moderate climb of around 1,200 steps.",
      "Package duration can be customized.",
      "Hotel category can be changed.",
      "Final price depends on selected options and requirements.",
    ],
  },
  {
    slug: "dubai-city-escape",
    title: "Dubai City Escape",
    tagline: "Skyline views, desert adventure and world-class shopping in Dubai.",
    image: SITE_MEDIA.travelPackagesFull.dubaiCityEscape,
    gallery: [
      SITE_MEDIA.travelDestinations.dubai,
      SITE_MEDIA.travelCategoryCards.luxury,
    ],
    location: "Dubai, UAE",
    travelers: "2–8 Travellers",
    travelType: "leisure",
    duration: { days: 5, nights: 4 },
    startingPrice: "From $890 per person",
    highlights: [
      "Burj Khalifa observation deck",
      "Desert safari with dinner",
      "Dubai Marina & Old Dubai",
      "Luxury city hotel stay",
    ],
    about:
      "A 5-day city escape covering Dubai's skyline, souks and desert in equal measure — for travellers who want modern luxury and a taste of Arabian tradition in one trip.",
    destinations: ["Downtown Dubai", "Dubai Marina", "Al Fahidi", "Desert Conservation Reserve"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Dubai",
        items: ["Airport pickup", "Hotel check-in", "Dubai Marina evening walk"],
      },
      {
        day: 2,
        title: "Downtown Dubai",
        items: ["Burj Khalifa observation deck", "Dubai Mall & Fountain show", "Old Dubai souks"],
      },
      {
        day: 3,
        title: "Desert Safari",
        items: ["Dune bashing", "Camel ride", "Bedouin-style BBQ dinner"],
      },
      {
        day: 4,
        title: "Leisure Day",
        items: ["Beach or pool day", "Optional Palm Jumeirah tour", "Shopping"],
      },
      { day: 5, title: "Departure", items: ["Hotel checkout", "Airport transfer"] },
    ],
    included: [
      "Hotel Accommodation",
      "Airport Transfers",
      "Burj Khalifa Entry Ticket",
      "Desert Safari with Dinner",
      "Private Transportation",
    ],
    notIncluded: [
      "International Flight Tickets",
      "Personal Expenses",
      "Optional Palm Jumeirah Tour",
      "Travel Insurance",
      "Expenses not mentioned above",
    ],
    accommodation: {
      title: "4 / 5 Star city hotels",
      note: "Accommodation can be customized according to customer preference and budget.",
    },
    transportation: {
      title: "Private vehicle",
      note: "Airport transfers and transportation throughout the tour.",
    },
    visaInformation: [
      "Many nationalities are eligible for UAE visa-on-arrival or a short-stay e-visa.",
      "Our team can assist with visa arrangements as part of your booking.",
    ],
    audience: ["Couples", "Families", "Friends", "Small Groups"],
    importantInfo: [
      "Desert safari timing may shift slightly with sunset hours.",
      "Package duration can be customized.",
      "Hotel category can be upgraded to 5-star.",
      "Final price depends on selected options and requirements.",
    ],
  },
  {
    slug: "maldives-luxury-getaway",
    title: "Maldives Luxury Getaway",
    tagline: "Overwater villas and turquoise lagoons for a total escape.",
    image: SITE_MEDIA.travelPackagesFull.maldivesLuxuryGetaway,
    gallery: [
      SITE_MEDIA.travelDestinations.maldives,
      SITE_MEDIA.travelCategoryCards.honeymoon,
    ],
    popular: true,
    location: "Maldives",
    travelers: "2 Travellers",
    travelType: "honeymoon",
    duration: { days: 4, nights: 3 },
    startingPrice: "From $1,450 per person",
    highlights: [
      "Overwater villa accommodation",
      "Seaplane or speedboat transfer",
      "Snorkeling in the house reef",
      "Private beach dinner (optional)",
    ],
    about:
      "A 4-day resort escape built for slowing down completely — an overwater villa, a private lagoon and nothing on the itinerary but the ocean. Popular as a honeymoon package, but suited to any couple or solo traveller after total quiet.",
    destinations: ["Malé", "Resort Island"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Malé",
        items: ["Airport meet & greet", "Seaplane or speedboat transfer", "Resort check-in"],
      },
      {
        day: 2,
        title: "Island Leisure",
        items: ["Snorkeling in the house reef", "Spa treatment (optional)", "Sunset cruise"],
      },
      {
        day: 3,
        title: "Water Activities",
        items: ["Optional diving excursion", "Private beach dinner (optional)", "Free time"],
      },
      { day: 4, title: "Departure", items: ["Resort checkout", "Transfer to Malé airport"] },
    ],
    included: [
      "Overwater Villa Accommodation",
      "Seaplane or Speedboat Transfers",
      "Daily Breakfast",
      "Snorkeling Equipment",
      "Resort Welcome Experience",
    ],
    notIncluded: [
      "International Flight Tickets",
      "Personal Expenses",
      "Spa Treatments",
      "Diving Excursions",
      "Travel Insurance",
    ],
    accommodation: {
      title: "5 Star overwater & beach villas",
      note: "Resort and villa category can be adjusted to preference and budget.",
    },
    transportation: {
      title: "Seaplane or speedboat",
      note: "Transfer type depends on the resort's distance from Malé.",
    },
    visaInformation: [
      "A free 30-day visa-on-arrival is issued to most nationalities visiting the Maldives.",
      "A valid return ticket and confirmed resort booking are required at entry.",
    ],
    audience: ["Couples", "Honeymooners", "Solo Travellers"],
    importantInfo: [
      "Resort choice significantly affects both price and transfer time.",
      "Package duration can be extended.",
      "Final price depends on selected resort and requirements.",
    ],
  },
];

export function getTravelPackageDetail(slug: string): TravelPackageDetail | undefined {
  return TRAVEL_PACKAGE_DETAILS.find((entry) => entry.slug === slug);
}

export interface TravelPackageFilters {
  /** Free text, matched against the location, title and destination list. */
  destination?: string;
  /** Exact `TravelPackageType` match, from the quick planner or a category card. */
  type?: string;
  /** Coarse Sri Lanka vs. international split, from the travel category cards. */
  region?: string;
}

/** Applies the quick planner's search params to the package catalogue. Every
 * provided filter must match (AND), and an empty/absent filter is a no-op. */
export function filterTravelPackages(
  packages: readonly TravelPackageDetail[],
  filters: TravelPackageFilters,
): readonly TravelPackageDetail[] {
  const destination = filters.destination?.trim().toLowerCase();
  const type = filters.type?.trim().toLowerCase();
  const region = filters.region?.trim().toLowerCase();

  return packages.filter((pkg) => {
    if (
      destination &&
      !pkg.location.toLowerCase().includes(destination) &&
      !pkg.title.toLowerCase().includes(destination) &&
      !pkg.destinations.some((place) => place.toLowerCase().includes(destination))
    ) {
      return false;
    }
    if (type && pkg.travelType !== type) return false;
    if (region === "sri-lanka" && pkg.location !== "Sri Lanka") return false;
    if (region === "international" && pkg.location === "Sri Lanka") return false;
    return true;
  });
}
