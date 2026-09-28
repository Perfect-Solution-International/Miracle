import { SITE_MEDIA } from "@/config/site-media";

import type { TravelPackageDetail } from "../types/travel-package-detail.types";

/**
 * The full catalogue backing both the "Featured Travel Packages" cards and
 * each package's details modal and `/travel-tourism/packages/[slug]` page.
 *
 * Inbound Travel: International travelers visiting Sri Lanka.
 * Outbound Travel: Sri Lankan travelers visiting international destinations.
 *
 * Clear, transparent information on what is included, what to expect, and
 * realistic pricing indications without fake ratings or guaranteed claims.
 */
export const TRAVEL_PACKAGE_DETAILS: readonly TravelPackageDetail[] = [
  // ── INBOUND 1: Sri Lanka Highlights ───────────────────────────
  {
    slug: "sri-lanka-highlights",
    title: "Sri Lanka Highlights",
    tagline: "The essential Sri Lanka journey, from ancient rock fortress to mist-covered hill country.",
    image: SITE_MEDIA.travelPackagesFull.sriLankaHighlights,
    secondaryImage: SITE_MEDIA.travelPackagesFull.ellaScenic,
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
    travelDirection: "Inbound",
    duration: { days: 7, nights: 6 },
    startingPrice: "From $650 per person",
    highlights: [
      "Climb Sigiriya 5th-century rock fortress",
      "Nine Arch Bridge & tea estates in Ella",
      "UNESCO-listed colonial Galle Fort",
      "Dedicated air-conditioned private vehicle & guide",
    ],
    whatToExpect: [
      {
        title: "Ancient UNESCO Rock Citadel",
        description:
          "Climb the 5th-century Sigiriya rock fortress, view ancient fresco paintings, and explore royal water gardens with your private guide.",
        badge: "Heritage",
        image: SITE_MEDIA.travelDestinations.sigiriya,
      },
      {
        title: "Scenic Hill Country & Tea Terraces",
        description:
          "Travel past cascading waterfalls and tea plantations to Ella, with time to photograph the famous Nine Arch Bridge and hike Little Adam's Peak.",
        badge: "Nature",
        image: SITE_MEDIA.travelPackagesFull.ellaScenic,
      },
      {
        title: "Colonial Galle Fort & Southern Coast",
        description:
          "Wander the cobblestone pathways, boutique cafes, and historic ramparts of Galle Fort as the sun sets over the Indian Ocean.",
        badge: "Coastal",
        image: SITE_MEDIA.travelPackagesFull.galleLighthouse,
      },
      {
        title: "Chauffeured Comfort & Dedicated Assistance",
        description:
          "Travel in a private, air-conditioned vehicle with an experienced English-speaking chauffeur guide, backed by 24/7 Miracle travel support.",
        badge: "Service",
      },
    ],
    about:
      "Experience the beauty, culture, and nature of Sri Lanka through a carefully planned 7-day journey covering the island's most iconic destinations. Designed for international visitors seeking a smooth, well-coordinated tour.",
    destinations: ["Colombo", "Kandy", "Ella", "Galle"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Colombo",
        items: ["Personal airport meet & greet", "Private transfer to hotel", "Colombo orientation & evening relaxation"],
      },
      {
        day: 2,
        title: "Colombo → Kandy",
        items: ["Scenic drive to Kandy", "Visit royal botanical gardens", "Temple of the Sacred Tooth Relic visit"],
      },
      {
        day: 3,
        title: "Kandy → Ella",
        items: ["Scenic mountain drive through tea country", "Tea factory visit & tasting", "Hotel check-in with mountain views"],
      },
      {
        day: 4,
        title: "Explore Ella",
        items: ["Nine Arch Bridge photo stop", "Hike Little Adam's Peak", "Evening at leisure in Ella village"],
      },
      {
        day: 5,
        title: "Ella → South Coast",
        items: ["Descend to the sunny southern coast", "Beachfront hotel check-in", "Sunset stroll on the beach"],
      },
      {
        day: 6,
        title: "Explore Galle Fort",
        items: ["Guided walking tour of historic Galle Fort", "Lighthouse & ramparts exploration", "Artisan shops & cafes"],
      },
      {
        day: 7,
        title: "Departure",
        items: ["Hotel checkout", "Comfortable expressway transfer to Colombo Bandaranaike International Airport (CMB)"],
      },
    ],
    included: [
      "Hotel Accommodation (3-Star / 4-Star Options)",
      "Daily Breakfast at All Hotels",
      "Private Air-Conditioned Vehicle Throughout",
      "Professional English-Speaking Chauffeur Guide",
      "All Airport Pickups & Transfers",
      "Sigiriya & Listed Sightseeing Entry Fees",
      "Highway Tolls, Parking & Fuel",
      "24/7 Miracle Travel Coordinator Support",
    ],
    notIncluded: [
      "International Airfare",
      "Sri Lanka ETA / Visa Fees (Guidance Provided)",
      "Lunches & Dinners (Unless Specified)",
      "Personal Expenses & Gratuities",
      "Travel Insurance",
    ],
    accommodation: {
      title: "3 / 4 Star handpicked hotels",
      note: "Hotel category and room types can be customized according to your preference and budget.",
    },
    transportation: {
      title: "Private air-conditioned car / van",
      note: "Dedicated vehicle and chauffeur for the entire duration of your stay.",
    },
    visaInformation: [
      "Most international travelers can easily obtain a Sri Lanka Electronic Travel Authorization (ETA) online before arrival.",
      "Our team provides complete document verification and step-by-step ETA guidance.",
    ],
    audience: ["Couples", "Families", "Friends", "Small Groups"],
    importantInfo: [
      "Itinerary pace and stops can be customized to your flight schedule.",
      "Hotel upgrades to boutique villas and 5-star properties are available upon request.",
      "Final price quotation is based on your exact travel dates and party size.",
    ],
  },

  // ── INBOUND 2: Tropical Sri Lanka Escape ──────────────────────
  {
    slug: "tropical-sri-lanka-escape",
    title: "Tropical Sri Lanka Escape",
    tagline: "A relaxed coastal getaway across Sri Lanka's golden palm-fringed southern beaches.",
    image: SITE_MEDIA.travelPackagesFull.tropicalSriLankaEscape,
    secondaryImage: SITE_MEDIA.travelDestinations.mirissa,
    gallery: [
      SITE_MEDIA.travelDestinations.mirissa,
      SITE_MEDIA.travelDestinations.bentota,
      SITE_MEDIA.travelDestinations.galle,
      SITE_MEDIA.travelDestinations.colombo,
    ],
    location: "Sri Lanka",
    travelers: "2–8 Travellers",
    travelType: "leisure",
    travelDirection: "Inbound",
    duration: { days: 5, nights: 4 },
    startingPrice: "From $420 per person",
    highlights: [
      "Palm-fringed golden beaches of Bentota & Mirissa",
      "Seasonal whale & dolphin watching excursion",
      "Historic UNESCO Galle Fort sunset walk",
      "Beachfront hotel accommodation with sea views",
    ],
    whatToExpect: [
      {
        title: "Golden Beaches & Coastal Serenity",
        description:
          "Enjoy slow mornings and warm ocean waters along Sri Lanka's renowned south coast beaches with beachfront hotel comfort.",
        badge: "Beach",
        image: SITE_MEDIA.travelDestinations.bentota,
      },
      {
        title: "Whale Watching in Mirissa",
        description:
          "Embark on an early morning boat excursion off Mirissa to spot blue whales and pods of spinner dolphins in their natural habitat.",
        badge: "Wildlife",
        image: SITE_MEDIA.travelDestinations.mirissa,
      },
      {
        title: "Madu River Safari & Turtle Conservation",
        description:
          "Glide through mangrove channels on a boat safari and visit a sea turtle rehabilitation project along the southern coastline.",
        badge: "Eco-Tour",
      },
      {
        title: "Galle Fort Sunset & Coastal Dining",
        description:
          "Stroll the historic ramparts of Galle Fort and dine on fresh local seafood overlooking the ocean.",
        badge: "Culture",
        image: SITE_MEDIA.travelPackagesFull.galleLighthouse,
      },
    ],
    about:
      "Trade a rushed schedule for slow coastal mornings, warm waters, and scenic seaside towns. This 5-day escape focuses on Sri Lanka's finest southern beaches, paired with convenient private transfers.",
    destinations: ["Colombo", "Bentota", "Mirissa", "Galle"],
    itinerary: [
      {
        day: 1,
        title: "Airport Arrival → Bentota",
        items: ["Airport meet & greet", "Scenic transfer to Bentota", "Beachside hotel check-in & leisure"],
      },
      {
        day: 2,
        title: "Bentota Beach & River Safari",
        items: ["Madu River mangrove boat safari", "Turtle conservation hatchery visit", "Afternoon beach leisure & water sports"],
      },
      {
        day: 3,
        title: "Bentota → Mirissa",
        items: ["Coastal drive past stilt fishermen", "Mirissa hotel check-in", "Coconut Tree Hill sunset viewpoint"],
      },
      {
        day: 4,
        title: "Whale Watching & Galle Fort",
        items: ["Early morning whale watching excursion", "Afternoon guided tour of Galle Fort", "Seafood dinner by the sea"],
      },
      {
        day: 5,
        title: "Departure",
        items: ["Hotel checkout", "Comfortable private transfer to Colombo airport for departure"],
      },
    ],
    included: [
      "Beachfront Hotel Accommodation (4 Nights)",
      "Daily Breakfast",
      "Private Air-Conditioned Vehicle & Chauffeur",
      "All Airport Pickups & Drop-offs",
      "Mirissa Whale Watching Boat Excursion Tickets",
      "Madu River Boat Safari Tickets",
      "24/7 Miracle Travel Support",
    ],
    notIncluded: [
      "International Flights",
      "Optional Water Sports (Jet ski, tube rides)",
      "Personal Expenses & Tips",
      "Travel Insurance",
    ],
    accommodation: {
      title: "3 / 4 Star beachfront properties",
      note: "Option to upgrade to luxury boutique beach resorts or private oceanfront villas.",
    },
    transportation: {
      title: "Private air-conditioned car / van",
      note: "Dedicated vehicle for all transfers and sightseeing along the coast.",
    },
    visaInformation: [
      "Online ETA processing available for tourists arriving in Sri Lanka.",
      "Our team provides guidance to ensure smooth entry upon arrival.",
    ],
    audience: ["Couples", "Honeymooners", "Friends", "Small Groups"],
    importantInfo: [
      "Whale watching excursions operate seasonally (best November through April).",
      "Tour duration can be shortened or extended according to your flights.",
      "Final price is confirmed upon your requested dates and group size.",
    ],
  },

  // ── INBOUND 3: Sri Lanka Adventure ────────────────────────────
  {
    slug: "sri-lanka-adventure",
    title: "Sri Lanka Adventure",
    tagline: "White water rapids, wildlife safaris, and hill-country trails for the active traveller.",
    image: SITE_MEDIA.travelPackagesFull.sriLankaAdventure,
    secondaryImage: SITE_MEDIA.travelPackagesFull.kitulgalaRafting,
    gallery: [
      SITE_MEDIA.travelDestinations.ella,
      SITE_MEDIA.travelDestinations.yala,
      SITE_MEDIA.travelDestinations.nuwaraEliya,
    ],
    location: "Sri Lanka",
    travelers: "2–8 Travellers",
    travelType: "adventure",
    travelDirection: "Inbound",
    duration: { days: 8, nights: 7 },
    startingPrice: "From $780 per person",
    highlights: [
      "Grade 3+ white water rafting in Kitulgala",
      "Yala National Park 4x4 open-jeep leopard safari",
      "Hiking Ella Rock, Little Adam's Peak & tea trails",
      "Highland tea estate exploration in Nuwara Eliya",
    ],
    whatToExpect: [
      {
        title: "White Water Rafting on Kelani River",
        description:
          "Navigate exciting river rapids in Kitulgala with certified safety gear and experienced river instructors.",
        badge: "Rafting",
        image: SITE_MEDIA.travelPackagesFull.kitulgalaRafting,
      },
      {
        title: "Yala Big Game Wildlife Safari",
        description:
          "Board a private 4x4 safari jeep inside Yala National Park to track wild leopards, Asian elephants, spotted deer, and sloth bears.",
        badge: "Safari",
        image: SITE_MEDIA.travelDestinations.yala,
      },
      {
        title: "Ella Mountain Peaks & Cloud Forests",
        description:
          "Hike Little Adam's Peak, walk along the Nine Arch Bridge railway, and take in panoramic gorge views from Ella Rock.",
        badge: "Trekking",
        image: SITE_MEDIA.travelDestinations.ella,
      },
      {
        title: "Highland Cool & Tea Plantations",
        description:
          "Experience the crisp mountain air of Nuwara Eliya, tour historic tea factories, and taste freshly brewed Ceylon tea.",
        badge: "Highlands",
      },
    ],
    about:
      "An 8-day expedition across Sri Lanka's dynamic topography — river rapids, safari jeeps, and scenic mountain trails — built for travellers who want an active, adrenaline-filled itinerary.",
    destinations: ["Kitulgala", "Nuwara Eliya", "Ella", "Yala"],
    itinerary: [
      {
        day: 1,
        title: "Arrival → Kitulgala Rainforest",
        items: ["Airport pickup", "Scenic drive to Kitulgala", "Riverside eco-lodge check-in & briefing"],
      },
      {
        day: 2,
        title: "Kitulgala White Water Rafting",
        items: ["White water rafting session", "Rainforest trekking & natural rock pools", "Evening riverside relaxation"],
      },
      {
        day: 3,
        title: "Kitulgala → Nuwara Eliya",
        items: ["Ascent to the central highlands", "Ramboda waterfalls stop", "Tea plantation & processing tour"],
      },
      {
        day: 4,
        title: "Explore Nuwara Eliya",
        items: ["Horton Plains National Park trek (World's End)", "Gregory Lake walk", "Overnight in Nuwara Eliya"],
      },
      {
        day: 5,
        title: "Nuwara Eliya → Ella",
        items: ["Scenic hill country road or train ride", "Little Adam's Peak hike", "Ella village cafes"],
      },
      {
        day: 6,
        title: "Ella → Yala National Park",
        items: ["Nine Arch Bridge morning view", "Descend to southern wildlife zone", "Safari lodge check-in"],
      },
      {
        day: 7,
        title: "Yala 4x4 Wildlife Safari",
        items: ["Early morning open-jeep safari", "Leopard & elephant tracking", "Afternoon rest & second safari session"],
      },
      {
        day: 8,
        title: "Departure",
        items: ["Hotel checkout", "Private transfer via highway to Colombo International Airport"],
      },
    ],
    included: [
      "7 Nights Hotel & Eco-Lodge Accommodation",
      "Daily Breakfast",
      "Private Air-Conditioned Vehicle Throughout",
      "Kitulgala White Water Rafting Fee & Equipment",
      "Yala National Park Entry Tickets & 4x4 Safari Jeep",
      "Professional Chauffeur & Adventure Guides",
      "All Airport Pickups & Transfers",
      "24/7 Miracle Tour Support",
    ],
    notIncluded: [
      "International Flight Tickets",
      "Optional Additional Safari Sessions",
      "Personal Expenses & Meals",
      "Travel & Medical Insurance",
    ],
    accommodation: {
      title: "3 / 4 Star adventure lodges & hotels",
      note: "Selected for scenic locations, comfort, and proximity to activity trails.",
    },
    transportation: {
      title: "Private vehicle & 4x4 safari jeep",
      note: "Dedicated road vehicle plus customized open safari vehicle in Yala.",
    },
    visaInformation: [
      "Online ETA visa valid for 30 days available for international visitors.",
      "Our team provides visa verification and flight connection advice.",
    ],
    audience: ["Friends", "Small Groups", "Active Travellers", "Couples"],
    importantInfo: [
      "Activity difficulty can be adjusted to your group's fitness level.",
      "Safaris and river activities follow certified safety standards.",
      "Final package quote depends on dates and chosen accommodation tiers.",
    ],
  },

  // ── INBOUND 4: Cultural Sri Lanka Experience ──────────────────
  {
    slug: "cultural-sri-lanka-experience",
    title: "Cultural Sri Lanka Experience",
    tagline: "Centuries of ancient heritage, cave temples, and sacred traditions in Sri Lanka's Cultural Triangle.",
    image: SITE_MEDIA.travelPackagesFull.culturalSriLankaExperience,
    secondaryImage: SITE_MEDIA.travelPackagesFull.kandyTemple,
    gallery: [
      SITE_MEDIA.travelDestinations.sigiriya,
      SITE_MEDIA.travelDestinations.kandy,
      SITE_MEDIA.travelDestinations.colombo,
    ],
    location: "Sri Lanka",
    travelers: "2–10 Travellers",
    travelType: "cultural",
    travelDirection: "Inbound",
    duration: { days: 6, nights: 5 },
    startingPrice: "From $590 per person",
    highlights: [
      "Sigiriya Rock Fortress & Dambulla Cave Temple",
      "Sacred Bodhi Tree & ruins of Anuradhapura",
      "Temple of the Sacred Tooth Relic in Kandy",
      "Traditional Kandyan cultural dance performance",
    ],
    whatToExpect: [
      {
        title: "The Ancient Realm of Anuradhapura",
        description:
          "Walk among centuries-old monumental stupas, monastery ruins, and the sacred Sri Maha Bodhi tree with a knowledgeable heritage guide.",
        badge: "Ancient City",
      },
      {
        title: "Golden Dambulla Cave Temples",
        description:
          "Climb to the UNESCO-listed cave complex housing over 150 Buddha statues and intricate Buddhist mural paintings spanning 2,000 years.",
        badge: "Caves",
      },
      {
        title: "Sigiriya 5th-Century Sky Fortress",
        description:
          "Ascend King Kashyapa's legendary rock palace, marveling at the mirror wall, lion paw gateway, and 360-degree forest canopy vistas.",
        badge: "Citadel",
        image: SITE_MEDIA.travelDestinations.sigiriya,
      },
      {
        title: "Sacred Kandy & Cultural Arts",
        description:
          "Visit the revered Temple of the Tooth Relic on the shores of Kandy Lake and experience an evening of traditional drumming and fire dancing.",
        badge: "Tradition",
        image: SITE_MEDIA.travelPackagesFull.kandyTemple,
      },
    ],
    about:
      "A 6-day cultural odyssey through Sri Lanka's Cultural Triangle. Journey across ancient capitals, cave sanctuaries, and revered temples, guided by local historical specialists.",
    destinations: ["Colombo", "Anuradhapura", "Sigiriya", "Kandy"],
    itinerary: [
      {
        day: 1,
        title: "Arrival → Cultural Triangle",
        items: ["Airport meet & greet", "Drive to Anuradhapura / Habarana", "Hotel check-in & welcome dinner"],
      },
      {
        day: 2,
        title: "Ancient Anuradhapura",
        items: ["Ruwanwelisaya & Jetavanaramaya stupas", "Sacred Sri Maha Bodhi", "Isurumuniya rock temple"],
      },
      {
        day: 3,
        title: "Sigiriya & Dambulla",
        items: ["Morning Sigiriya rock climb", "Dambulla Golden Cave Temples", "Spice garden tour en route to Kandy"],
      },
      {
        day: 4,
        title: "Sacred Kandy",
        items: ["Temple of the Sacred Tooth Relic", "Royal Botanical Gardens at Peradeniya", "Kandyan cultural dance show"],
      },
      {
        day: 5,
        title: "Kandy → Colombo",
        items: ["Scenic drive to Colombo", "Colombo colonial landmarks & National Museum", "Evening shopping & hotel stay"],
      },
      {
        day: 6,
        title: "Departure",
        items: ["Hotel checkout", "Private transfer to Colombo airport for return flight"],
      },
    ],
    included: [
      "5 Nights Hotel Accommodation",
      "Daily Breakfast at All Hotels",
      "Private Air-Conditioned Transportation",
      "All Listed Archaeological Site & Temple Entry Fees",
      "Traditional Cultural Dance Performance Tickets",
      "Experienced English-Speaking Cultural Chauffeur Guide",
      "Airport Transfers & Logistics",
      "24/7 Miracle Travel Coordinator Support",
    ],
    notIncluded: [
      "International Flights",
      "Sri Lanka ETA Visa",
      "Lunches & Dinners",
      "Camera / Video Permits (Where Applicable)",
      "Travel Insurance",
    ],
    accommodation: {
      title: "3 / 4 Star heritage & resort hotels",
      note: "Carefully selected hotels offering authentic hospitality and comfortable amenities.",
    },
    transportation: {
      title: "Private air-conditioned car / van",
      note: "Dedicated vehicle for all inter-city transfers and local heritage site exploration.",
    },
    visaInformation: [
      "Online ETA is required for most nationalities visiting Sri Lanka.",
      "Modest attire (covering shoulders and knees) is required at temple premises.",
    ],
    audience: ["History Enthusiasts", "Couples", "Families", "Cultural Groups"],
    importantInfo: [
      "Sigiriya climb entails approximately 1,200 steps at a steady pace.",
      "Itinerary can be adjusted with extra days in Colombo or hill country.",
      "Final price quotation is based on exact dates and group size.",
    ],
  },

  // ── OUTBOUND 1: Dubai City Escape ────────────────────────────
  {
    slug: "dubai-city-escape",
    title: "Dubai City Escape",
    tagline: "Futuristic skylines, desert dune safaris, and world-class shopping in Dubai.",
    image: SITE_MEDIA.travelPackagesFull.dubaiCityEscape,
    secondaryImage: SITE_MEDIA.travelPackagesFull.dubaiDesert,
    gallery: [
      SITE_MEDIA.travelDestinations.dubai,
      SITE_MEDIA.travelPackagesFull.dubaiDesert,
      SITE_MEDIA.travelCategoryCards.luxury,
    ],
    popular: true,
    location: "Dubai, UAE",
    travelers: "2–8 Travellers",
    travelType: "leisure",
    travelDirection: "Outbound",
    duration: { days: 5, nights: 4 },
    startingPrice: "From $890 per person",
    highlights: [
      "Burj Khalifa 124th floor observation deck",
      "4x4 Desert safari with dune bashing & BBQ dinner",
      "Dubai Marina yacht cruise & Dubai Mall fountain show",
      "Old Dubai gold & spice souks with traditional Abra ride",
    ],
    whatToExpect: [
      {
        title: "Burj Khalifa & Modern Wonders",
        description:
          "Ascend the world's tallest tower for panoramic city views, followed by the spectacular Dubai Fountain musical light show.",
        badge: "Skyline",
        image: SITE_MEDIA.travelPackagesFull.dubaiCityEscape,
      },
      {
        title: "Thrilling Desert Safari & BBQ Dinner",
        description:
          "Ride 4x4 land cruisers across golden dunes, enjoy camel riding and sandboarding, followed by a starlit Bedouin BBQ with live entertainment.",
        badge: "Desert",
        image: SITE_MEDIA.travelPackagesFull.dubaiDesert,
      },
      {
        title: "Old Dubai Heritage & Souks",
        description:
          "Cross Dubai Creek on a traditional wooden Abra boat and explore the aromatic Spice Souk and glittering Gold Souk in Deira.",
        badge: "Heritage",
      },
      {
        title: "Dubai Marina & Palm Jumeirah",
        description:
          "Tour Palm Jumeirah, view Atlantis The Palm, and take a relaxing evening walk along the waterfront promenade of Dubai Marina.",
        badge: "Sightseeing",
      },
    ],
    about:
      "A 5-day escape covering Dubai's iconic modern architecture, thrilling desert sands, and historic trading souks. Tailored for Sri Lankan travelers seeking a seamless overseas holiday with complete visa support.",
    destinations: ["Downtown Dubai", "Dubai Marina", "Al Fahidi Heritage", "Desert Conservation"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Dubai",
        items: ["Arrival at Dubai International Airport (DXB)", "Private hotel transfer & check-in", "Evening leisure at Dubai Marina"],
      },
      {
        day: 2,
        title: "Downtown Dubai & Burj Khalifa",
        items: ["Burj Khalifa Level 124/125 entry", "Dubai Mall shopping & aquarium view", "Dubai Fountain show in the evening"],
      },
      {
        day: 3,
        title: "Desert Safari Experience",
        items: ["Morning at leisure for shopping", "Afternoon 4x4 desert dune safari", "Camel ride, Henna painting & BBQ dinner show"],
      },
      {
        day: 4,
        title: "Old Dubai & Palm Jumeirah Tour",
        items: ["Al Fahidi historical neighborhood", "Abra water taxi across Dubai Creek", "Gold & Spice Souks", "Drive past Palm Jumeirah"],
      },
      {
        day: 5,
        title: "Departure",
        items: ["Hotel checkout", "Last-minute souvenir shopping", "Private airport transfer for departure to Colombo"],
      },
    ],
    included: [
      "4 Nights Hotel Accommodation in Dubai (4-Star)",
      "Daily Buffet Breakfast",
      "Burj Khalifa At The Top (124th Floor) Admission",
      "4x4 Desert Safari with Dune Bashing, Camel Ride & BBQ Dinner",
      "Half-Day Guided Dubai City Tour",
      "All Airport Pickups & Transfers in Dubai",
      "UAE Tourist Visa Assistance & Processing Support",
      "24/7 Miracle Travel Coordinator Support",
    ],
    notIncluded: [
      "International Flights (Colombo ⇄ Dubai - Available on Request)",
      "Dubai Tourism Dirham Fee (Paid directly at hotel check-in)",
      "Personal Shopping & Extra Meals",
      "Travel Insurance",
    ],
    accommodation: {
      title: "4 / 5 Star centrally-located hotels",
      note: "Options in Downtown, Bur Dubai, or Dubai Marina with easy metro and shopping access.",
    },
    transportation: {
      title: "Private transfers & safari 4x4",
      note: "Comfortable air-conditioned vehicles for airport and sightseeing journeys.",
    },
    visaInformation: [
      "UAE Tourist Visa (30-day / 60-day) is processed by our dedicated travel team.",
      "Required documents: Passport copy (6 months validity) and passport-size photograph.",
    ],
    audience: ["Families", "Couples", "Holidaymakers", "Friends"],
    importantInfo: [
      "Flight bookings from Colombo (Emirates, SriLankan, flydubai, FitsAir) can be bundled upon request.",
      "Package duration can be extended to include Abu Dhabi (Ferrari World, Sheikh Zayed Grand Mosque).",
      "Final quotation provided based on chosen travel dates and flight availability.",
    ],
  },

  // ── OUTBOUND 2: Maldives Luxury Getaway ───────────────────────
  {
    slug: "maldives-luxury-getaway",
    title: "Maldives Luxury Getaway",
    tagline: "Overwater villas, crystal lagoons, and untouched coral reefs in paradise.",
    image: SITE_MEDIA.travelPackagesFull.maldivesLuxuryGetaway,
    secondaryImage: SITE_MEDIA.travelDestinations.maldives,
    gallery: [
      SITE_MEDIA.travelDestinations.maldives,
      SITE_MEDIA.travelPackagesFull.maldivesLuxuryGetaway,
      SITE_MEDIA.travelCategoryCards.honeymoon,
    ],
    popular: true,
    location: "Maldives",
    travelers: "2 Travellers",
    travelType: "honeymoon",
    travelDirection: "Outbound",
    duration: { days: 4, nights: 3 },
    startingPrice: "From $1,450 per person",
    highlights: [
      "Luxury overwater villa or beach villa stay",
      "Speedboat or scenic seaplane resort transfer",
      "Coral reef snorkeling & crystal turquoise lagoon",
      "Sunset dolphin cruise and romantic dining options",
    ],
    whatToExpect: [
      {
        title: "Overwater Villa Ocean Sanctuary",
        description:
          "Wake up above turquoise waters with direct lagoon access, a private sundeck, and panoramic sunrise or sunset views.",
        badge: "Villa",
        image: SITE_MEDIA.travelPackagesFull.maldivesLuxuryGetaway,
      },
      {
        title: "Vibrant Coral Reef Snorkeling",
        description:
          "Explore the resort's house reef teeming with tropical fish, reef sharks, rays, and sea turtles in calm, clear water.",
        badge: "Marine",
        image: SITE_MEDIA.travelDestinations.maldives,
      },
      {
        title: "Sunset Dolphin Cruise",
        description:
          "Sail out on a traditional Maldivian Dhoni at golden hour to watch playful spinner dolphins leaping in the waves.",
        badge: "Cruise",
      },
      {
        title: "World-Class Island Relaxation",
        description:
          "Unwind on powder-white sandy beaches, enjoy open-air dining, and rejuvenate with holistic spa therapies.",
        badge: "Wellness",
      },
    ],
    about:
      "A 4-day private island escape designed for couples, honeymooners, and travellers looking for ultimate tranquility. Located just a short 1.5-hour flight from Colombo, the Maldives offers pure island luxury.",
    destinations: ["Malé", "Private Island Atoll"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Malé → Island Transfer",
        items: ["Arrival at Velana International Airport (MLE)", "Speedboat / Seaplane resort transfer", "Island welcome & villa check-in"],
      },
      {
        day: 2,
        title: "Island Leisure & Snorkeling",
        items: ["House reef snorkeling session", "Kayaking and paddleboarding", "Sunset dolphin cruise"],
      },
      {
        day: 3,
        title: "Recreation & Romantic Dining",
        items: ["Spa treatment session (optional)", "Relaxation on private beaches", "Candlelit beachfront dinner"],
      },
      {
        day: 4,
        title: "Departure",
        items: ["Resort breakfast & checkout", "Speedboat / Seaplane transfer to Malé airport for flight to Colombo"],
      },
    ],
    included: [
      "3 Nights Luxury Resort Accommodation (Overwater / Beach Villa)",
      "Daily Breakfast & Dinner (Half Board / All-Inclusive Options Available)",
      "Roundtrip Speedboat or Seaplane Island Transfers",
      "Complimentary Snorkeling Gear & Non-Motorized Water Sports",
      "Resort Welcome Meet & Greet at Malé Airport",
      "All Government Taxes & Service Charges Included",
      "24/7 Miracle Travel Coordinator Support",
    ],
    notIncluded: [
      "International Flights (Colombo ⇄ Malé - Available on Request)",
      "Premium Spa Treatments & Motorized Water Sports",
      "Personal Expenses & Tips",
      "Travel Insurance",
    ],
    accommodation: {
      title: "4 / 5 Star Private Island Resort",
      note: "Options ranging from premium boutique island resorts to 5-star international luxury brands.",
    },
    transportation: {
      title: "Roundtrip Speedboat or Seaplane",
      note: "Seamless airport connection directly to your resort island jetty.",
    },
    visaInformation: [
      "Sri Lankan passport holders and all international travelers receive a free 30-day Tourist Visa on Arrival.",
      "Only a valid passport (minimum 6 months) and confirmed resort booking are required.",
    ],
    audience: ["Honeymooners", "Couples", "Luxury Seekers", "Families"],
    importantInfo: [
      "Flight connections from Colombo take just 1 hour 15 minutes.",
      "All-inclusive meal & beverage packages are available on request.",
      "Final quote is customized according to your requested travel dates and villa tier.",
    ],
  },

  // ── OUTBOUND 3: Singapore & Malaysia Twin City ────────────────
  {
    slug: "singapore-malaysia-twin-city",
    title: "Singapore & Malaysia Twin City",
    tagline: "Futuristic gardens, iconic skyscrapers, theme parks, and vibrant cultural markets.",
    image: SITE_MEDIA.travelPackagesFull.singaporeMalaysia,
    secondaryImage: SITE_MEDIA.travelPackagesFull.petronasTowers,
    gallery: [
      SITE_MEDIA.travelDestinations.singapore,
      SITE_MEDIA.travelDestinations.malaysia,
      SITE_MEDIA.travelPackagesFull.petronasTowers,
    ],
    popular: true,
    location: "Singapore & Malaysia",
    travelers: "2–10 Travellers",
    travelType: "family",
    travelDirection: "Outbound",
    duration: { days: 6, nights: 5 },
    startingPrice: "From $980 per person",
    highlights: [
      "Gardens by the Bay & Marina Bay Sands in Singapore",
      "Sentosa Island cable car & Universal Studios (optional)",
      "Petronas Twin Towers & KL Tower in Kuala Lumpur",
      "Colorful Batu Caves temple & Genting Highlands day trip",
    ],
    whatToExpect: [
      {
        title: "Futuristic Singapore Highlights",
        description:
          "Explore the stunning Supertree Grove at Gardens by the Bay, view Marina Bay Sands, and visit the iconic Merlion Park.",
        badge: "Singapore",
        image: SITE_MEDIA.travelDestinations.singapore,
      },
      {
        title: "Sentosa Island Entertainment",
        description:
          "Ride the scenic cable car to Sentosa Island, with options to visit S.E.A. Aquarium, Madame Tussauds, and sunny beaches.",
        badge: "Island",
      },
      {
        title: "Kuala Lumpur Iconic Towers",
        description:
          "Photograph the glittering Petronas Twin Towers, explore the Golden Triangle, and visit the King's Palace and Merdeka Square.",
        badge: "Skyline",
        image: SITE_MEDIA.travelPackagesFull.petronasTowers,
      },
      {
        title: "Batu Caves & Genting Highlands",
        description:
          "Climb the 272 vibrant steps to the ancient Hindu limestone caves, followed by a cable car ascent to the cool mountain resort of Genting Highlands.",
        badge: "Highlands",
      },
    ],
    about:
      "A 6-day twin-nation holiday connecting the clean, futuristic marvels of Singapore with the energetic shopping, rich heritage, and mountain escapes of Malaysia. A top favorite for Sri Lankan families and friends.",
    destinations: ["Singapore", "Sentosa", "Kuala Lumpur", "Genting Highlands"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Singapore",
        items: ["Arrival at Changi Airport (SIN)", "Hotel transfer & check-in", "Evening visit to Marina Bay Sands & Spectra Light Show"],
      },
      {
        day: 2,
        title: "Singapore City Tour & Gardens by the Bay",
        items: ["Merlion Park, Chinatown & Little India", "Gardens by the Bay (Flower Dome & Cloud Forest)", "Evening at leisure on Orchard Road"],
      },
      {
        day: 3,
        title: "Sentosa Island → Travel to Kuala Lumpur",
        items: ["Morning Sentosa cable car & attractions", "Afternoon comfortable coach or flight to Kuala Lumpur", "KL hotel check-in"],
      },
      {
        day: 4,
        title: "Kuala Lumpur City Highlights",
        items: ["Petronas Twin Towers photo stop", "Batu Caves & Murugan Statue", "Central Market & Bukit Bintang shopping"],
      },
      {
        day: 5,
        title: "Genting Highlands Day Trip",
        items: ["Awana SkyWay cable car ride", "Genting Highlands theme park & shopping mall", "Return to KL in the evening"],
      },
      {
        day: 6,
        title: "Departure",
        items: ["Hotel checkout", "Last-minute duty-free shopping", "Transfer to KLIA airport for departure to Colombo"],
      },
    ],
    included: [
      "5 Nights 4-Star Hotel Accommodation (2N Singapore + 3N Kuala Lumpur)",
      "Daily Breakfast at All Hotels",
      "Singapore Half-Day City Tour & Gardens by the Bay Admission",
      "Sentosa Island Cable Car Tickets",
      "Inter-City Transport (Singapore to Kuala Lumpur)",
      "Kuala Lumpur City Tour & Batu Caves Excursion",
      "Genting Highlands Day Tour with Return Cable Car",
      "All Airport Pickups & Transfers",
      "Visa Assistance for Both Singapore & Malaysia",
      "24/7 Miracle Travel Coordinator Support",
    ],
    notIncluded: [
      "International Flights (Colombo ⇄ Singapore / KL - Available on Request)",
      "Universal Studios Singapore Tickets (Available as add-on)",
      "Personal Expenses & Meals not specified",
      "Travel Insurance",
    ],
    accommodation: {
      title: "4-Star centrally located hotels",
      note: "Located close to MRT/Monorail stations and major shopping hubs in both cities.",
    },
    transportation: {
      title: "Private air-conditioned coaches & cars",
      note: "Smooth transfers including seamless cross-border transit between Singapore and Malaysia.",
    },
    visaInformation: [
      "Singapore eVisa and Malaysia eVisa / Digital Arrival Card support provided by our team.",
      "Complete document check and submission support for Sri Lankan passport holders.",
    ],
    audience: ["Families", "Friends", "Couples", "Holiday Groups"],
    importantInfo: [
      "Flight combinations (Colombo-Singapore / KL-Colombo) can be seamlessly bundled.",
      "Universal Studios or Legoland Malaysia day passes can be added to the package.",
      "Final quote is customized to your exact party size and travel season.",
    ],
  },

  // ── OUTBOUND 4: Thailand Explorer ────────────────────────────
  {
    slug: "thailand-explorer",
    title: "Thailand Explorer",
    tagline: "Gilded temples, Chao Phraya river cruises, coral island beaches, and vibrant night markets.",
    image: SITE_MEDIA.travelPackagesFull.thailandExplorer,
    secondaryImage: SITE_MEDIA.travelPackagesFull.bangkokWatArun,
    gallery: [
      SITE_MEDIA.travelDestinations.thailand,
      SITE_MEDIA.travelPackagesFull.bangkokWatArun,
      SITE_MEDIA.travelCategoryCards.adventure,
    ],
    location: "Thailand",
    travelers: "2–10 Travellers",
    travelType: "leisure",
    travelDirection: "Outbound",
    duration: { days: 5, nights: 4 },
    startingPrice: "From $620 per person",
    highlights: [
      "Bangkok Grand Palace & Wat Arun temple visit",
      "Luxury Chao Phraya River dinner cruise with live music",
      "Pattaya Coral Island speedboat excursion with water sports",
      "World-class shopping at ICONSIAM & Chatuchak weekend market",
    ],
    whatToExpect: [
      {
        title: "Bangkok Royal Heritage & Temples",
        description:
          "Visit the magnificent Wat Pho (Reclining Buddha), the Temple of Dawn (Wat Arun), and the historic royal grounds of the Grand Palace.",
        badge: "Culture",
        image: SITE_MEDIA.travelPackagesFull.bangkokWatArun,
      },
      {
        title: "Chao Phraya River Dinner Cruise",
        description:
          "Sail past illuminated royal temples while enjoying an international buffet, live saxophone music, and sparkling city views.",
        badge: "Cruise",
      },
      {
        title: "Coral Island (Koh Larn) Speedboat Tour",
        description:
          "Speed across turquoise waters to Coral Island for sunbathing, parasailing, sea-walking, and relaxing on white sand beaches.",
        badge: "Island",
        image: SITE_MEDIA.travelDestinations.thailand,
      },
      {
        title: "World-Renowned Shopping & Street Food",
        description:
          "Explore mega-malls like ICONSIAM and MBK, as well as bustling night markets brimming with authentic Thai street food.",
        badge: "Shopping",
      },
    ],
    about:
      "A 5-day holiday showcasing Thailand's cultural wonders and coastal fun. Experience the lively energy of Bangkok paired with tropical island relaxation in Pattaya. Full visa and flight coordination from Colombo.",
    destinations: ["Bangkok", "Pattaya", "Coral Island"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Bangkok → Pattaya",
        items: ["Arrival at Bangkok Suvarnabhumi Airport (BKK)", "Direct private transfer to Pattaya", "Hotel check-in & evening leisure"],
      },
      {
        day: 2,
        title: "Coral Island Speedboat Day Tour",
        items: ["Speedboat transfer to Coral Island (Koh Larn)", "Beach relaxation & water sports", "Indian / Thai buffet lunch included", "Alcazar cabaret show (optional)"],
      },
      {
        day: 3,
        title: "Pattaya → Bangkok City & River Cruise",
        items: ["Transfer to Bangkok", "Gems Gallery visit en route", "Bangkok hotel check-in", "Evening luxury Chao Phraya river dinner cruise"],
      },
      {
        day: 4,
        title: "Bangkok Temple Tour & Shopping",
        items: ["Wat Arun & Wat Pho temple visits", "Shopping at ICONSIAM & Platinum Fashion Mall", "Evening night market exploration"],
      },
      {
        day: 5,
        title: "Departure",
        items: ["Hotel checkout", "Last-minute souvenir shopping", "Private airport transfer for departure to Colombo"],
      },
    ],
    included: [
      "4 Nights 4-Star Hotel Accommodation (2N Pattaya + 2N Bangkok)",
      "Daily Breakfast at Hotels",
      "Coral Island Speedboat Tour with Lunch",
      "Luxury Chao Phraya River Dinner Cruise with Buffet",
      "Bangkok City & Temple Sightseeing Tour",
      "All Airport & Inter-City Transfers in Private AC Vehicle",
      "Thailand Tourist Visa Guidance & Document Verification",
      "24/7 Miracle Travel Coordinator Assistance",
    ],
    notIncluded: [
      "International Flights (Colombo ⇄ Bangkok - Available on Request)",
      "Thailand Visa Fee (Paid at VFS / Embassy)",
      "Water Sports fees on Coral Island (Parasailing, jet ski)",
      "Personal Expenses & Tips",
      "Travel Insurance",
    ],
    accommodation: {
      title: "4-Star well-rated city & resort hotels",
      note: "Central locations with swimming pools, buffet breakfast, and easy access to shopping.",
    },
    transportation: {
      title: "Private air-conditioned vehicle & speedboats",
      note: "Dedicated vehicles for all road transfers between Bangkok and Pattaya.",
    },
    visaInformation: [
      "Thailand Tourist Visa processing assistance provided for Sri Lankan citizens.",
      "Our team provides verified hotel itineraries and booking documentation for embassy submission.",
    ],
    audience: ["Friends", "Families", "Couples", "Shopping Enthusiasts"],
    importantInfo: [
      "Direct flights from Colombo to Bangkok take just 3 hours 30 minutes.",
      "Itinerary can be customized to swap Pattaya for Phuket or Krabi.",
      "Final quote is customized based on your selected dates and room configurations.",
    ],
  },
];

export function getTravelPackageDetail(slug: string): TravelPackageDetail | undefined {
  return TRAVEL_PACKAGE_DETAILS.find((entry) => entry.slug === slug);
}

export interface TravelPackageFilters {
  destination?: string;
  type?: string;
  region?: string;
}

/** Applies the quick planner's search params to the package catalogue. */
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
    if (type && type !== "all" && pkg.travelType !== type) return false;
    if (region === "sri-lanka" && pkg.location !== "Sri Lanka") return false;
    if (region === "international" && pkg.location === "Sri Lanka") return false;
    return true;
  });
}
