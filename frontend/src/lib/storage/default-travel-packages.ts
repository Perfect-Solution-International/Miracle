import type { TravelPackage } from "@/components/admin-travel/types";

// Default authentic initial packages (ready for admin modification or public display)
export const DEFAULT_PACKAGES: TravelPackage[] = [
  {
    id: "pkg-inbound-01",
    slug: "sri-lanka-signature-heritage-wildlife",
    name: "Sri Lanka Signature Heritage & Wildlife Expedition",
    travelType: "Inbound",
    destination: "Sigiriya, Kandy, Nuwara Eliya, Yala, Galle",
    country: "Sri Lanka",
    duration: "10 Days / 9 Nights",
    price: 240000,
    currency: "LKR",
    shortDescription:
      "A premier 10-day private journey across ancient kingdoms, misty tea hills, and leopard safaris.",
    description:
      "Experience the very best of Sri Lanka with our signature private expedition. Starting in the cultural triangle, ascend the Sigiriya rock fortress, wander through royal botanical gardens in Kandy, board the scenic blue train to the highlands, and embark on thrilling game drives in Yala National Park before relaxing in historic Galle Fort.",
    highlights: [
      "Sigiriya Lion Rock Fortress climb",
      "Temple of the Tooth Relic in Kandy",
      "Scenic tea country train journey",
      "Big game safari in Yala National Park",
      "UNESCO Galle Dutch Fort walking tour",
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
          "Scenic coastal expressway drive to Colombo for last-minute shopping and sightseeing before transfer to BIA for your flight home.",
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
      "https://images.unsplash.com/photo-1588598198321-9735fd52455b?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1566296517066-d5607df2e2b3?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&auto=format&fit=crop&q=80",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1588598198321-9735fd52455b?w=1200&auto=format&fit=crop&q=80",
    status: "Active",
    createdAt: "Sep 28, 2026",
  },
  {
    id: "pkg-inbound-02",
    slug: "sri-lanka-coastal-cultural-escape",
    name: "Classic Sri Lanka Culture & Coastline",
    travelType: "Inbound",
    destination: "Colombo, Dambulla, Kandy, Bentota & Galle",
    country: "Sri Lanka",
    duration: "7 Days / 6 Nights",
    price: 165000,
    currency: "LKR",
    shortDescription:
      "A scenic 7-day tour combining cultural monuments with pristine tropical golden beaches.",
    description:
      "Explore the UNESCO World Heritage Golden Cave Temple of Dambulla, experience cultural dance performances in Kandy, and unwind at beachfront luxury resorts in Bentota.",
    highlights: [
      "Dambulla Cave Temples",
      "Kandy Lake & Spice Gardens",
      "Madu River boat safari in Balapitiya",
      "Water sports in Bentota beach",
      "Galle Fort colonial ramparts",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Cultural Triangle Transfer",
        description: "Warm welcome at Colombo BIA airport and comfortable transfer to Dambulla.",
      },
      {
        day: 2,
        title: "Sigiriya Rock Fortress & Village Experience",
        description: "Climb the ancient rock citadel and enjoy a traditional village catamaran ride and local lunch.",
      },
      {
        day: 3,
        title: "Royal Botanical Gardens & Kandy City Tour",
        description: "Explore Peradeniya botanical gardens and the sacred Temple of the Tooth Relic.",
      },
      {
        day: 4,
        title: "Scenic Drive to Bentota & River Boat Safari",
        description: "Travel to the southwest coast with an eco boat safari through the mangroves of Madu River.",
      },
      {
        day: 5,
        title: "Bentota Golden Beach Leisure",
        description: "Full day of beach relaxation, Ayurvedic spa treatments, and water sports.",
      },
      {
        day: 6,
        title: "Day Trip to Galle Fort & Sea Turtle Conservation",
        description: "Visit the historic Portuguese and Dutch ramparts of Galle Fort and a sea turtle sanctuary.",
      },
      {
        day: 7,
        title: "Colombo City Highlights & Departure",
        description: "Sightseeing in the capital city followed by airport transfer for your departure.",
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
    whatToExpect: "Leisurely paced itinerary suitable for families, couples, and relaxed explorers.",
    entryRequirements: "Passport valid for at least 6 months.",
    visaInformation: "Sri Lanka ETA tourist visa assistance provided.",
    images: [
      "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&auto=format&fit=crop&q=80",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=1200&auto=format&fit=crop&q=80",
    status: "Active",
    createdAt: "Sep 28, 2026",
  },
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
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80",
    status: "Active",
    createdAt: "Sep 28, 2026",
  },
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
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&auto=format&fit=crop&q=80",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&auto=format&fit=crop&q=80",
    status: "Active",
    createdAt: "Sep 28, 2026",
  },
];
