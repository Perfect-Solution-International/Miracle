/**
 * Marketing imagery registry.
 *
 * Every public-site photo is referenced by key from here, never by URL inside a
 * component, so swapping stock photography for commissioned or CMS-hosted assets
 * is a one-file change. Alt text lives beside the source because it describes the
 * image, not the place it is used.
 *
 * TODO: Replace interim stock photography (Unsplash licence) with approved
 * Miracle International brand assets served from object storage or the CMS.
 */

export interface SiteImage {
  src: string;
  alt: string;
}

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2000&q=80`;

export const SITE_MEDIA = {
  heroPort: {
    src: unsplash("1578575437130-527eed3abbec"),
    alt: "Container ship being loaded by gantry cranes at an international port",
  },
  portAerial: {
    src: unsplash("1494412574643-ff11b0a5c1c3"),
    alt: "Aerial view of a busy container terminal with stacked shipping containers",
  },
  earthNight: {
    src: unsplash("1451187580459-43490279c0fa"),
    alt: "Earth from orbit at night with illuminated cities connected across continents",
  },
  warehouse: {
    src: unsplash("1553413077-190dd305871c"),
    alt: "High-bay warehouse aisle stocked with palletised goods",
  },
  distributionCentre: {
    src: unsplash("1586528116311-ad8dd3c8310d"),
    alt: "Distribution centre floor with packaged inventory ready for dispatch",
  },
  freightTruck: {
    src: unsplash("1601584115197-04ecc0da31d7"),
    alt: "Freight truck transporting cargo along a highway",
  },
  businessMeeting: {
    src: unsplash("1600880292203-757bb62b4baf"),
    alt: "Business partners celebrating an agreement at a meeting table",
  },
  handshake: {
    src: unsplash("1521791136064-7986c2920216"),
    alt: "Two business professionals shaking hands",
  },
  manufacturing: {
    src: unsplash("1581091226825-a6a2a5aee158"),
    alt: "Engineer working with automated equipment on a manufacturing line",
  },
  cityTowers: {
    src: unsplash("1486406146926-c627a92ad1ab"),
    alt: "Modern glass office towers in a financial district",
  },
  businessTravel: {
    src: unsplash("1436491865332-7a61a109cc05"),
    alt: "Aircraft wing above the clouds during an international flight",
  },
  technology: {
    src: unsplash("1460925895917-afdab827c52f"),
    alt: "Laptop displaying a business analytics dashboard",
  },
  travelDestinations: {
    colombo: {
      src: unsplash("1486406146926-c627a92ad1ab"),
      alt: "Modern glass office towers in Colombo's financial district",
    },
    kandy: {
      src: unsplash("1544644181-1484b3fdfc62"),
      alt: "Tiered temple on a lake surrounded by misty hills",
    },
    ella: {
      src: unsplash("1566296314736-6eaac1ca0cb9"),
      alt: "Blue train crossing the Nine Arch Bridge through green hills in Ella",
    },
    galle: {
      src: unsplash("1567157577867-05ccb1388e66"),
      alt: "Seafront promenade lined with colonial-era buildings",
    },
    nuwaraEliya: {
      src: unsplash("1602216056096-3b40cc0c9944"),
      alt: "Palm-fringed river winding through green hill country",
    },
    sigiriya: {
      src: unsplash("1751247026229-518bfec9b5e6"),
      alt: "Sigiriya rock fortress in Sri Lanka lit by sunset",
    },
    mirissa: {
      src: unsplash("1760815153715-9fce4c3644a3"),
      alt: "Tropical beach with a hammock strung between palm trees",
    },
    yala: {
      src: unsplash("1549366021-9f761d450615"),
      alt: "Wild elephant standing among dense jungle foliage",
    },
    dubai: {
      src: unsplash("1512453979798-5ea266f8880c"),
      alt: "Dubai skyline with the Burj Khalifa at sunset",
    },
    singapore: {
      src: unsplash("1565967511849-76a60a516170"),
      alt: "Merlion statue overlooking Marina Bay Sands in Singapore",
    },
    thailand: {
      src: unsplash("1552465011-b4e21bf6e79a"),
      alt: "Longtail boats moored beside limestone cliffs at Railay Beach, Thailand",
    },
    maldives: {
      src: unsplash("1516815231560-8f41ec531527"),
      alt: "Overwater walkway and boat dock in a Maldivian lagoon",
    },
    india: {
      src: unsplash("1548013146-72479768bada"),
      alt: "The Taj Mahal framed through a sandstone archway",
    },
    malaysia: {
      src: unsplash("1596422846543-75c6fc197f07"),
      alt: "Petronas Twin Towers illuminated at dusk in Kuala Lumpur",
    },
    europe: {
      src: unsplash("1613395877344-13d4a8e0d49e"),
      alt: "Blue-domed churches overlooking the sea in Santorini",
    },
  },
  travelPackagesFull: {
    sriLankaHighlights: {
      src: unsplash("1751247026229-518bfec9b5e6"),
      alt: "Sigiriya rock fortress in Sri Lanka lit by sunset",
    },
    tropicalSriLankaEscape: {
      src: unsplash("1760815153715-9fce4c3644a3"),
      alt: "Tropical beach with a hammock strung between palm trees",
    },
    sriLankaAdventure: {
      src: unsplash("1549366021-9f761d450615"),
      alt: "Wild elephant standing among dense jungle foliage",
    },
    culturalSriLankaExperience: {
      src: unsplash("1544644181-1484b3fdfc62"),
      alt: "Tiered temple on a lake surrounded by misty hills",
    },
    dubaiCityEscape: {
      src: unsplash("1512453979798-5ea266f8880c"),
      alt: "Dubai skyline with the Burj Khalifa at sunset",
    },
    maldivesLuxuryGetaway: {
      src: unsplash("1590523277543-a94d2e4eb00b"),
      alt: "Aerial view of overwater bungalows in a Maldivian atoll",
    },
    ellaScenic: {
      src: unsplash("1566296314736-6eaac1ca0cb9"),
      alt: "Blue train crossing the Nine Arch Bridge through green hills in Ella",
    },
  },
  travelCategoryCards: {
    inbound: {
      src: unsplash("1751247026229-518bfec9b5e6"),
      alt: "Sigiriya rock fortress in Sri Lanka lit by sunset",
    },
    outbound: {
      src: unsplash("1500835556837-99ac94a94552"),
      alt: "Aircraft wing above the clouds during an international flight",
    },
    familyHolidays: {
      src: unsplash("1475503572774-15a45e5d60b9"),
      alt: "Family holding hands together on the seashore",
    },
    honeymoon: {
      src: unsplash("1590523277543-a94d2e4eb00b"),
      alt: "Aerial view of overwater bungalows in a Maldivian atoll",
    },
    adventure: {
      src: unsplash("1465310477141-6fb93167a273"),
      alt: "Traveller kayaking on a still lake surrounded by mountains",
    },
    business: {
      src: unsplash("1772991221654-49aa6e0a98bc"),
      alt: "Traveller walking through a sunlit modern airport terminal",
    },
    luxury: {
      src: unsplash("1633321088355-d0f81134ca3b"),
      alt: "Pastel hillside town overlooking the Amalfi coastline",
    },
    customized: {
      src: unsplash("1646303297330-17073f7823c3"),
      alt: "Map, camera and passport laid out on a table while planning a trip",
    },
  },
  travelNavFeature: {
    src: unsplash("1751247026229-518bfec9b5e6"),
    alt: "Sigiriya rock fortress in Sri Lanka lit by sunset",
  },
  categories: {
    vehicles: {
      src: unsplash("1494976388531-d1058494cdd8"),
      alt: "Passenger vehicle parked on an open lot",
    },
    electronics: {
      src: unsplash("1498049794561-7780e7231661"),
      alt: "Consumer electronics including a smartphone, headphones and smartwatch",
    },
    furniture: {
      src: unsplash("1555041469-a586c61ea9bc"),
      alt: "Upholstered sofa in a bright interior",
    },
    clothing: {
      src: unsplash("1489987707025-afc232f7ea0f"),
      alt: "Rail of folded and hanging garments in assorted colours",
    },
    shoes: {
      src: unsplash("1542291026-7eec264c27ff"),
      alt: "Athletic shoe photographed against a plain backdrop",
    },
    machinery: {
      src: unsplash("1513828583688-c52646db42da"),
      alt: "Industrial processing machinery with stainless steel pipework",
    },
    industrialEquipment: {
      src: unsplash("1504328345606-18bbc8c9d7d1"),
      alt: "Technician welding steel with industrial equipment",
    },
    rawMaterials: {
      src: unsplash("1504917595217-d4dc5ebe6122"),
      alt: "Sparks from metal being cut during material processing",
    },
  },
} as const satisfies Record<string, SiteImage | Record<string, SiteImage>>;
