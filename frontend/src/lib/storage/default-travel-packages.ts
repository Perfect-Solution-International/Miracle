import type { TravelPackage } from "@/components/admin-travel/types";

// Curated authentic packages with high-resolution imagery matched to each destination & travel experience
export const DEFAULT_PACKAGES: TravelPackage[] = [
  // ── INBOUND 1: Cultural & Wildlife Expedition (10 Days) ───────────────────
  {
    id: "pkg-inbound-01",
    slug: "sri-lanka-signature-heritage-wildlife",
    name: "Kandy Sacred Heritage & Royal Cultural Expedition",
    travelType: "Inbound",
    destination: "Kandy, Peradeniya, Sigiriya, Nuwara Eliya & Colombo",
    country: "Sri Lanka",
    duration: "10 Days / 9 Nights",
    price: 240000,
    currency: "LKR",
    shortDescription:
      "A premier 10-day private journey across the Sacred Temple of the Tooth in Kandy, royal botanical gardens, Sigiriya rock, and scenic highlands.",
    description:
      "Experience the spiritual and cultural heart of Sri Lanka in Kandy. Visit the UNESCO World Heritage Temple of the Sacred Tooth Relic, stroll the royal botanical gardens in Peradeniya, watch traditional Kandyan cultural dancers, explore Sigiriya rock fortress, and board the scenic mountain train to the misty highlands.",
    highlights: [
      "Temple of the Sacred Tooth Relic in Kandy",
      "Peradeniya Royal Botanic Gardens walking tour",
      "Kandyan cultural dance & drumming evening show",
      "Sigiriya Lion Rock Fortress climb",
      "Scenic Ella & Nuwara Eliya tea hills train journey",
      "Colombo City Highlights & Shopping",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Coastal Negombo Welcome",
        description:
          "Meet and greet by your private chauffeur at Bandaranaike International Airport (BIA). Transfer to your coastal hotel for rest and orientation.",
      },
      {
        day: 2,
        title: "Dambulla Golden Cave Temple & Sigiriya",
        description:
          "Journey into the Cultural Triangle. Explore the ancient murals of Dambulla and ascend the world-famous Sigiriya Lion Rock Fortress at sunset.",
      },
      {
        day: 3,
        title: "Polonnaruwa Ancient Kingdom & Minneriya Safari",
        description:
          "Cycle through ancient ruins of Polonnaruwa, followed by an afternoon open-top 4x4 elephant gathering safari in Minneriya National Park.",
      },
      {
        day: 4,
        title: "Matale Spice Gardens & Kandy Royal Heritage",
        description:
          "Travel to the hill capital of Kandy. Visit a fragrant spice grove and witness the evening veneration ceremony at the Sacred Temple of the Tooth.",
      },
      {
        day: 5,
        title: "Highland Tea Plantations & Nuwara Eliya",
        description:
          "Board the iconic highland train winding through misty tea valleys and waterfalls. Visit a colonial tea factory for fresh Ceylon tea tasting.",
      },
      {
        day: 6,
        title: "Horton Plains & World's End Trekking",
        description:
          "Early morning nature trek across Horton Plains National Park, reaching the dramatic 880-meter precipice at World's End and Baker's Falls.",
      },
      {
        day: 7,
        title: "Ella Nine Arch Bridge & Little Adam's Peak",
        description:
          "Hike to Little Adam's Peak for 360-degree mountain panoramas and photograph trains passing over the historic Demodara Nine Arch Bridge.",
      },
      {
        day: 8,
        title: "Yala National Park Big Game Leopard Safari",
        description:
          "Descend to the southern wilderness for dawn and dusk safaris searching for Sri Lankan leopards, sloth bears, and Asian elephants.",
      },
      {
        day: 9,
        title: "UNESCO Galle Dutch Fort & Southern Beaches",
        description:
          "Walk along the 17th-century ramparts of Galle Fort, discover boutique cafes and artisan workshops, and relax along golden sandy shores.",
      },
      {
        day: 10,
        title: "Colombo City Highlights & Airport Departure",
        description:
          "Scenic coastal expressway drive to Colombo for sightseeing, Lotus Tower, and last-minute shopping before transfer to BIA for your flight home.",
      },
    ],
    includedItems: [
      "Accommodation",
      "Transportation",
      "Airport Transfer",
      "Guided Tours",
      "Sightseeing",
      "Meals",
    ],
    includedServices:
      "Luxury boutique accommodation, private air-conditioned transport with chauffeur-guide, daily breakfast, and entrance tickets.",
    accommodation: "5-Star luxury boutique hotels and luxury tented safari lodge",
    transportation: "Private Mercedes executive van with dedicated chauffeur-guide",
    whatToExpect:
      "Moderate walking at cultural sites, comfortable air-conditioned journeys, and warm tropical weather with cooler evenings in Nuwara Eliya.",
    entryRequirements: "Passport valid for minimum 6 months from departure date.",
    visaInformation: "Online ETA tourist visa pre-approval required prior to boarding.",
    images: [
      "https://cdn.getyourguide.com/img/location/5c83eaa670873.jpeg/99.jpg", // Kandy Temple of the Tooth & Lake (GetYourGuide)
      "https://images.unsplash.com/photo-1588598198321-9735fd52455b?w=1200&auto=format&fit=crop&q=80", // Sigiriya Rock
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&auto=format&fit=crop&q=80", // Galle Fort Lighthouse
      "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=1200&auto=format&fit=crop&q=80", // Ella Nine Arch Bridge
      "https://images.unsplash.com/photo-1581852017103-68accd55096a?w=1200&auto=format&fit=crop&q=80", // Yala Wildlife Elephant Safari
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=80", // Colombo City & Coast
    ],
    coverImage:
      "https://cdn.getyourguide.com/img/location/5c83eaa670873.jpeg/99.jpg", // Kandy Temple of the Tooth & Lake (GetYourGuide)
    status: "Active",
    createdAt: "Sep 28, 2026",
  },

  // ── INBOUND 2: Classic Culture & Coastline Escape (7 Days) ────────────────
  {
    id: "pkg-inbound-02",
    slug: "sri-lanka-coastal-cultural-escape",
    name: "Classic Bentota Beach, Culture & Coastline Escape",
    travelType: "Inbound",
    destination: "Bentota Beach, Galle, Dambulla, Sigiriya & Colombo",
    country: "Sri Lanka",
    duration: "7 Days / 6 Nights",
    price: 165000,
    currency: "LKR",
    shortDescription:
      "Unwind on the golden sands of Bentota beach, enjoy water sports, Madu river safaris, Sigiriya rock fortress, and Galle Fort.",
    description:
      "Relax at premier beachfront resorts in Bentota. Cruise the mangrove islets of Madu River on an eco-boat safari, enjoy thrilling water sports, visit a sea turtle hatchery, explore UNESCO World Heritage Sigiriya rock fortress, and stroll along the historic ramparts of Galle Fort.",
    highlights: [
      "Bentota golden sandy beach leisure & water sports",
      "Madu River boat safari in Balapitiya",
      "Kosgoda sea turtle conservation project",
      "Sigiriya Lion Rock Citadel climb",
      "Galle Fort colonial ramparts & lighthouse",
      "Colombo City sightseeing",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Cultural Triangle Transfer",
        description: "Warm welcome at Colombo BIA airport and comfortable transfer to Dambulla & Sigiriya.",
      },
      {
        day: 2,
        title: "Sigiriya Rock Fortress & Village Experience",
        description: "Climb the ancient rock citadel and enjoy a traditional village catamaran ride and local lunch.",
      },
      {
        day: 3,
        title: "Royal Botanical Gardens & Kandy Temple of the Tooth",
        description: "Explore Peradeniya botanical gardens and the sacred Temple of the Tooth Relic in Kandy.",
      },
      {
        day: 4,
        title: "Scenic Drive to Bentota & River Boat Safari",
        description: "Travel to the southwest coast with an eco boat safari through the mangroves of Madu River.",
      },
      {
        day: 5,
        title: "Bentota Golden Beach Leisure & Water Sports",
        description: "Full day of beach relaxation, Ayurvedic spa treatments, jet skiing, and water sports along Bentota beach.",
      },
      {
        day: 6,
        title: "Day Trip to Galle Fort & Sea Turtle Conservation",
        description: "Visit the historic Portuguese and Dutch ramparts of Galle Fort, lighthouse, and a sea turtle sanctuary.",
      },
      {
        day: 7,
        title: "Colombo City Highlights & Departure",
        description: "Sightseeing in the capital city of Colombo followed by airport transfer for your departure.",
      },
    ],
    includedItems: [
      "Accommodation",
      "Transportation",
      "Airport Transfer",
      "Sightseeing",
    ],
    includedServices: "4-star beachfront resort stays, air-conditioned sedan transfer, daily breakfast.",
    accommodation: "4-Star & 5-Star beach resorts and boutique hotels",
    transportation: "Private air-conditioned sedan with professional driver",
    whatToExpect: "Leisurely paced itinerary suitable for families, couples, and relaxed beach explorers.",
    entryRequirements: "Passport valid for at least 6 months.",
    visaInformation: "Sri Lanka ETA tourist visa assistance provided.",
    images: [
      "https://www.srilankaclassytours.com/medias/place/big/574/thumb.jpg", // Bentota Beach (Sri Lanka Classy Tours)
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80", // Bentota Golden Beach
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&auto=format&fit=crop&q=80", // Galle Lighthouse & Coast
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=1200&auto=format&fit=crop&q=80", // Kandy Temple
      "https://images.unsplash.com/photo-1588598198321-9735fd52455b?w=1200&auto=format&fit=crop&q=80", // Sigiriya Rock
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=80", // Colombo Highlights
    ],
    coverImage:
      "https://www.srilankaclassytours.com/medias/place/big/574/thumb.jpg", // Bentota Beach (Sri Lanka Classy Tours)
    status: "Active",
    createdAt: "Sep 28, 2026",
  },

  // ── INBOUND 3: Hill Country, Ella & Scenic Tea Trails (6 Days) ────────────
  {
    id: "pkg-inbound-03",
    slug: "sri-lanka-hill-country-ella-tea-trails",
    name: "Nuwara Eliya Tea Plantations & Highland Scenic Trails",
    travelType: "Inbound",
    destination: "Nuwara Eliya, Horton Plains, Kandy & Ella",
    country: "Sri Lanka",
    duration: "6 Days / 5 Nights",
    price: 155000,
    currency: "LKR",
    shortDescription:
      "Discover the rolling emerald tea plantations of Nuwara Eliya, tour historic tea factories, and ride the scenic highland train.",
    description:
      "Immerse yourself in the emerald mountains of Nuwara Eliya, Sri Lanka's famed tea country. Tour Pedro & Damro tea estates, taste authentic Ceylon tea, hike through misty cloud forests in Horton Plains to World's End, and ride the iconic scenic blue train through Ella.",
    highlights: [
      "Nuwara Eliya Ceylon tea plantation & factory private tour",
      "Iconic Kandy-to-Ella scenic mountain train ride",
      "Horton Plains National Park & World's End trekking",
      "Demodara Nine Arch Bridge sunrise photoshoot",
      "Little Adam's Peak & Ella Rock trekking",
      "Ramboda and Devon scenic waterfalls",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Transfer to Royal Kandy",
        description: "Airport reception and scenic drive through tropical valleys to the hillside city of Kandy.",
      },
      {
        day: 2,
        title: "Kandy Cultural Sights & Peradeniya Gardens",
        description: "Visit the Temple of the Tooth Relic and stroll among orchid houses at Peradeniya Royal Botanic Gardens.",
      },
      {
        day: 3,
        title: "Scenic Highland Blue Train to Nuwara Eliya",
        description: "Board the reserved first-class train winding past waterfalls and tea estates into 'Little England'.",
      },
      {
        day: 4,
        title: "World's End Trekking & Journey to Ella",
        description: "Dawn expedition across Horton Plains plateau, then transfer to the picturesque mountain village of Ella.",
      },
      {
        day: 5,
        title: "Nine Arch Bridge, Little Adam's Peak & Ravana Falls",
        description: "Explore the architectural marvel of Nine Arch Bridge, hike Little Adam's Peak, and swim near Ravana Falls.",
      },
      {
        day: 6,
        title: "Highland Descent & Departure Transfer",
        description: "Scenic descent to Colombo or airport transfer with memories of Sri Lanka's breathtaking misty mountains.",
      },
    ],
    includedItems: [
      "Accommodation",
      "Transportation",
      "Airport Transfer",
      "Guided Tours",
      "Sightseeing",
    ],
    includedServices: "Colonial tea bungalows and mountain view boutique hotels, reserved train tickets, private van.",
    accommodation: "Heritage tea bungalows and luxury mountain view suites in Ella",
    transportation: "Private air-conditioned vehicle and scenic train ticket reservations",
    whatToExpect: "Cool highland temperatures, scenic photography opportunities, and gentle mountain hiking.",
    entryRequirements: "Passport valid for 6+ months.",
    visaInformation: "Online Sri Lanka ETA tourist visa assistance included.",
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&auto=format&fit=crop&q=80", // Nuwara Eliya Tea Hills & Plantations Guide
      "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=1200&auto=format&fit=crop&q=80", // Ella Nine Arch Bridge & Blue Train
      "https://images.unsplash.com/photo-1546708973-b339540b5162?w=1200&auto=format&fit=crop&q=80", // Little Adam's Peak Ella
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=1200&auto=format&fit=crop&q=80", // Kandy Lake & Heritage
    ],
    coverImage:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&auto=format&fit=crop&q=80", // Nuwara Eliya Tea Hills & Plantations Guide
    status: "Active",
    createdAt: "Sep 28, 2026",
  },

  // ── INBOUND 4: Big Game Safari & Wilderness Expedition (5 Days) ───────────
  {
    id: "pkg-inbound-04",
    slug: "sri-lanka-wildlife-safari-expedition",
    name: "Sri Lanka Wildlife Safari & Leopard Trail",
    travelType: "Inbound",
    destination: "Udawalawe, Yala National Park & Mirissa",
    country: "Sri Lanka",
    duration: "5 Days / 4 Nights",
    price: 180000,
    currency: "LKR",
    shortDescription:
      "Encounter wild Asian elephants, leopards, and sloth bears across Yala and Udawalawe with open-top 4x4 safaris.",
    description:
      "Dedicated wildlife adventure through Sri Lanka's richest national parks. Search for the elusive Sri Lankan leopard in Yala, observe orphan elephants at Udawalawe Elephant Transit Home, and witness wild blue whales and dolphins off the coast of Mirissa.",
    highlights: [
      "Exclusive dawn & dusk 4x4 leopard game drives in Yala",
      "Udawalawe elephant herds & Transit Home rehabilitation visit",
      "Minneriya / Bundala exotic bird sanctuary wetlands",
      "Mirissa blue whale watching excursion",
      "Luxury glamping in air-conditioned safari tents",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Transfer to Udawalawe Wilderness",
        description: "Welcome at airport and direct transfer to your eco safari lodge bordering Udawalawe National Park.",
      },
      {
        day: 2,
        title: "Udawalawe Elephant Safari & Journey to Yala",
        description: "Morning open-top jeep safari observing wild elephant herds, followed by transfer to Yala National Park.",
      },
      {
        day: 3,
        title: "Full Day Big Game Leopard Safari in Yala",
        description: "Dawn-to-dusk tracking of leopards, sloth bears, crocodiles, spotted deer, and vibrant hornbills.",
      },
      {
        day: 4,
        title: "Southern Coast Transfer & Sunset in Mirissa",
        description: "Drive along the southern coastline to Mirissa. Relax at Coconut Tree Hill for golden hour photography.",
      },
      {
        day: 5,
        title: "Morning Blue Whale Cruise & Departure",
        description: "Early catamaran cruise to spot majestic blue whales and spinner dolphins before airport transfer.",
      },
    ],
    includedItems: [
      "Accommodation",
      "Transportation",
      "Airport Transfer",
      "Guided Tours",
      "Sightseeing",
      "Activities",
    ],
    includedServices: "Safari tented luxury camp stays, private 4x4 jeeps with park trackers, all park entrance permits.",
    accommodation: "Luxury Safari Tented Camp & Beachfront Boutique Resort",
    transportation: "Customized 4x4 open-top safari jeeps and private van",
    whatToExpect: "Thrilling wildlife encounters, early morning starts for optimal animal sightings, and tropical warmth.",
    entryRequirements: "Passport valid for 6+ months.",
    visaInformation: "Online Sri Lanka ETA tourist visa assistance provided.",
    images: [
      "https://images.unsplash.com/photo-1581852017103-68accd55096a?w=1200&auto=format&fit=crop&q=80", // Yala Wildlife Elephant
      "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=1200&auto=format&fit=crop&q=80", // Mirissa Coconut Tree Hill
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80", // Golden Beach
    ],
    coverImage:
      "https://images.unsplash.com/photo-1581852017103-68accd55096a?w=1200&auto=format&fit=crop&q=80", // Yala Wildlife Elephant
    status: "Active",
    createdAt: "Sep 28, 2026",
  },

  // ── OUTBOUND 1: Dubai & Abu Dhabi Premium Holiday (6 Days) ────────────────
  {
    id: "pkg-outbound-01",
    slug: "dubai-luxury-desert-city-escape",
    name: "Dubai & Abu Dhabi Premium Holiday",
    travelType: "Outbound",
    destination: "Dubai & Abu Dhabi",
    country: "United Arab Emirates",
    duration: "6 Days / 5 Nights",
    price: 1850,
    currency: "USD",
    shortDescription:
      "Experience world-class architecture, luxury shopping, desert safaris, and Ferrari World.",
    description:
      "An extraordinary international holiday for Sri Lankan travelers. Marvel at Burj Khalifa, embark on a sunset 4x4 red dune desert safari with BBQ dinner, cruise Dubai Marina on a luxury yacht, and explore Sheikh Zayed Grand Mosque.",
    highlights: [
      "Burj Khalifa 124th floor observation deck",
      "Desert 4x4 dune bashing & Bedouin BBQ dinner",
      "Sheikh Zayed Grand Mosque private excursion",
      "Dubai Marina luxury yacht cruise",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Dubai & Marina Check-in",
        description: "Private airport transfer to your luxury Downtown hotel. Evening at leisure.",
      },
      {
        day: 2,
        title: "Dubai City Tour & Burj Khalifa At The Top",
        description: "Tour Dubai Museum, Gold Souk, Palm Jumeirah, and ascend Burj Khalifa 124th floor.",
      },
      {
        day: 3,
        title: "Premium 4x4 Red Dune Desert Safari",
        description: "Afternoon dune bashing, sandboarding, camel rides, and five-star BBQ dinner under the stars.",
      },
      {
        day: 4,
        title: "Day Excursion to Abu Dhabi & Ferrari World",
        description: "Marvel at Sheikh Zayed Grand Mosque and experience thrilling rides at Ferrari World.",
      },
      {
        day: 5,
        title: "Dubai Marina Yacht Cruise & Luxury Shopping",
        description: "Morning private yacht cruise followed by shopping at Dubai Mall and the Dubai Fountain show.",
      },
      {
        day: 6,
        title: "Departure & Return Flight to Sri Lanka",
        description: "Airport transfer to Dubai International Airport (DXB) for your return flight.",
      },
    ],
    includedItems: [
      "Accommodation",
      "Transportation",
      "Airport Transfer",
      "Guided Tours",
      "Sightseeing",
      "Activities",
    ],
    includedServices:
      "5-star hotel in Downtown Dubai, all transfers, desert safari, city tour, and tourist visa assistance.",
    accommodation: "5-Star Downtown luxury hotel with daily breakfast",
    transportation: "Private airport transfers and executive tour vehicles",
    whatToExpect: "Urban luxury, desert adventure, and warm climate with indoor air conditioning.",
    entryRequirements: "Passport valid for 6+ months from travel date.",
    visaInformation: "UAE Tourist Visa processing handled directly by our visa desk.",
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&auto=format&fit=crop&q=80",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&auto=format&fit=crop&q=80",
    status: "Active",
    createdAt: "Sep 28, 2026",
  },

  // ── OUTBOUND 2: Maldives Paradise Island Retreat (5 Days) ─────────────────
  {
    id: "pkg-outbound-02",
    slug: "maldives-island-luxury-resort-getaway",
    name: "Maldives Paradise Island Villa Retreat",
    travelType: "Outbound",
    destination: "North Malé Atoll",
    country: "Maldives",
    duration: "5 Days / 4 Nights",
    price: 2100,
    currency: "USD",
    shortDescription:
      "Overwater villa stay with turquoise lagoons, snorkeling with mantas, and all-inclusive dining.",
    description:
      "Just a short flight from Sri Lanka, indulge in total serenity in an overwater villa. Includes speedboat/seaplane transfers, daily gourmet dining, dolphin cruise, and coral reef snorkeling.",
    highlights: [
      "Overwater private bungalow with direct ocean access",
      "Sunset dolphin cruise",
      "Guided coral reef snorkeling & water sports",
      "All-inclusive gourmet meal plan",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Malé & Speedboat/Seaplane Transfer",
        description: "Welcome at Velana International Airport and transfer to your luxury island resort.",
      },
      {
        day: 2,
        title: "Overwater Villa Relaxation & House Reef Snorkeling",
        description: "Explore the vibrant house reef with sea turtles, rays, and tropical fish.",
      },
      {
        day: 3,
        title: "Sunset Dolphin Cruise & Lagoon Water Sports",
        description: "Afternoon kayaking and paddleboarding followed by a sunset cruise watching wild spinner dolphins.",
      },
      {
        day: 4,
        title: "Spa Wellness & Beachside Candlelit Dinner",
        description: "Rejuvenating couple's spa treatment and evening private dining by the water's edge.",
      },
      {
        day: 5,
        title: "Island Farewell & Return Flight to Colombo",
        description: "Scenic return transfer to Malé airport for your short flight back to Sri Lanka.",
      },
    ],
    includedItems: [
      "Accommodation",
      "Transportation",
      "Airport Transfer",
      "Meals",
      "Activities",
    ],
    includedServices:
      "Overwater villa, speedboat or seaplane transfers, all meals & beverages, sunset cruise.",
    accommodation: "Luxury Overwater Pool Villa",
    transportation: "Roundtrip speedboat / seaplane island transfers",
    whatToExpect: "Pure tropical relaxation, world-class marine life, and warm ocean breeze.",
    entryRequirements: "Passport valid for minimum 6 months.",
    visaInformation: "Free 30-day tourist visa on arrival for all nationalities with confirmed stay.",
    images: [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&auto=format&fit=crop&q=80",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&auto=format&fit=crop&q=80",
    status: "Active",
    createdAt: "Sep 28, 2026",
  },
];
