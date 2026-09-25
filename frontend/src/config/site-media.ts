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
  foodProducts: {
    src: unsplash("1542838132-92c53300491e"),
    alt: "Fresh produce arranged for commercial food supply",
  },
  investment: {
    hero: {
      src: unsplash("1556761175-b413da4baf72"),
      alt: "Business professionals reviewing an investment strategy together",
    },
    partnership: {
      src: unsplash("1521737711867-e3b97375f902"),
      alt: "International business team discussing a growth plan around a table",
    },
    analysis: {
      src: unsplash("1551836022-d5d88e9218df"),
      alt: "Professional reviewing financial charts and business performance data",
    },
    planning: {
      src: unsplash("1454165804606-c3d57bc86b40"),
      alt: "Business planning workspace with charts and notes",
    },
    growth: {
      src: unsplash("1758518726609-c551f858cd5c"),
      alt: "Business partners discussing an investment growth plan together",
    },
  },
  services: {
    hero: {
      src: unsplash("1552664730-d307ca884978"),
      alt: "Business professionals collaborating in a bright international office",
    },
    introduction: {
      src: unsplash("1504384308090-c894fdcc538d"),
      alt: "Entrepreneur reviewing a business plan at a modern workspace",
    },
    trading: {
      src: unsplash("1524758631624-e2822e304c36"),
      alt: "Business team discussing products and commercial opportunities",
    },
    franchise: {
      src: unsplash("1542744173-8e7e53415bb0"),
      alt: "Entrepreneurs planning a growing business together",
    },
    importExport: {
      src: unsplash("1566576912321-d58ddd7a6088"),
      alt: "Cargo containers and logistics operations at a global port",
    },
    investment: {
      src: unsplash("1556742049-0cfed4f6a45d"),
      alt: "Professionals reviewing business growth and investment information",
    },
    marketing: {
      src: unsplash("1531482615713-2afd69097998"),
      alt: "Creative business team developing a marketing strategy",
    },
  },
  marketingAdvertising: {
    hero: {
      src: unsplash("1758691736424-4b4273948341"),
      alt: "Marketing team reviewing a campaign presentation in a boardroom",
    },
    heroInset: {
      src: unsplash("1777559542650-f2b84a66d30f"),
      alt: "Marketing team planning digital content with laptops and notebooks",
    },
    strategy: {
      src: unsplash("1758873269035-aae0e1fd3422"),
      alt: "Marketing team shaping a campaign strategy at a whiteboard",
    },
    value: {
      src: unsplash("1624555130581-1d9cca783bc0"),
      alt: "Creative team discussing marketing ideas around a table",
    },
  },
  franchise: {
    hero: {
      src: unsplash("1683803055067-1ca1c17cb2b9"),
      alt: "Entrepreneurs planning a business together around a table of laptops",
    },
    journey: {
      src: unsplash("1758611972678-bc3b29b4718f"),
      alt: "Colleagues reviewing documents and next steps for a business venture",
    },
    opening: {
      src: unsplash("1441984904996-e0b6ba687e04"),
      alt: "Organized retail store interior ready to welcome customers",
    },
    foodBeverage: {
      src: unsplash("1774101200315-8ac504fa0fd4"),
      alt: "Restaurant staff preparing food in a working kitchen",
    },
    retail: {
      src: unsplash("1771033834141-023d630b3965"),
      alt: "Products displayed inside a modern retail store",
    },
    education: {
      src: unsplash("1509062522246-3755977927d7"),
      alt: "Teacher presenting to students in a classroom",
    },
    services: {
      src: unsplash("1774921676536-12e96b39238c"),
      alt: "Customer service staff assisting visitors at a reception desk",
    },
    technology: {
      src: unsplash("1748345952129-3bdd7d39f155"),
      alt: "Technology team working at computer stations in a modern office",
    },
    otherOpportunities: {
      src: unsplash("1560264280-88b68371db39"),
      alt: "People working across an open business office",
    },
  },
  travelDestinations: {
    colombo: {
      src: unsplash("1765153743359-cfd5b64b2b64"),
      alt: "Colombo waterfront skyline and city lights at dusk",
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
    bentota: {
      src: unsplash("1708868065091-a6f0ac265dfa"),
      alt: "People enjoying the shoreline at Bentota Beach in Sri Lanka",
    },
    arugamBay: {
      src: unsplash("1465310477141-6fb93167a273"),
      alt: "Surfer paddling out at a tropical beach break",
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

  itSolutions: {
    hero: {
      src: unsplash("1702047149248-a6049168d2a8"),
      alt: "Technology team planning together around a table of laptops",
    },
    heroInset: {
      src: unsplash("1758691737467-fe12934ddc58"),
      alt: "Colleagues reviewing work together on a computer screen",
    },
    overview: {
      src: unsplash("1629904869392-ae2a682d4d01"),
      alt: "Technology professionals working at computers in a bright office",
    },
    partnership: {
      src: unsplash("1758873268444-73528cd3ec93"),
      alt: "Two colleagues collaborating on a project at a laptop",
    },
    impact: {
      src: unsplash("1659141088063-16e6bb9b9ee1"),
      alt: "Business software interface open on a laptop at a workspace",
    },
    cta: {
      src: unsplash("1683770997177-0603bd44d070"),
      alt: "Technology professionals working together at office computers",
    },
    websiteDevelopment: {
      src: unsplash("1498050108023-c5249f4df085"),
      alt: "Laptop showing a code editor with a website preview on the monitor behind it",
    },

    softwareDevelopment: {
      src: unsplash("1461749280684-dccba630e2f6"),
      alt: "Close-up of application source code displayed on a monitor",
    },

    posSystem: {
      src: unsplash("1556740758-90de374c12ad"),
      alt: "Retail staff member using a point-of-sale tablet at a store counter",
    },

    businessManagementSystems: {
      src: unsplash("1551288049-bebda4e38f71"),
      alt: "Business analytics dashboard displayed across multiple charts on a monitor",
    },

    digitalSolutions: {
      src: unsplash("1573164713988-8665fc963095"),
      alt: "IT professional reviewing a laptop beside a server room data rack",
    },

    itConsulting: {
      src: unsplash("1516321318423-f06f85e504b3"),
      alt: "Consultant pointing at a laptop screen while advising a client",
    },

    businessAutomation: {
      src: unsplash("1531746790731-6c087fecd65a"),
      alt: "Robotic arm reaching forward, representing automated business processes",
    },
    websiteDevelopmentHero: {
      src: unsplash("1782898669223-ab17b600d486"),
      alt: "Designer working on a laptop displaying a website interface",
    },
    websiteDevelopmentSupport: {
      src: unsplash("1587355760421-b9de3226a046"),
      alt: "Website designer arranging interface wireframes beside a laptop",
    },
    softwareDevelopmentHero: {
      src: unsplash("1780253256194-34e5867ccb8c"),
      alt: "Software developer writing code on a laptop",
    },
    posSystemHero: {
      src: unsplash("1742836531271-98fd8151d257"),
      alt: "Shop employee using a point-of-sale tablet at checkout",
    },
    businessManagementSystemsHero: {
      src: unsplash("1688646583123-16844c80e78a"),
      alt: "Project manager working with business software on a laptop",
    },
    digitalSolutionsHero: {
      src: unsplash("1564457461758-8ff96e439e83"),
      alt: "Network cabinets and blue cabling inside a data centre",
    },
    itConsultingHero: {
      src: unsplash("1517245386807-bb43f82c33c4"),
      alt: "Technology adviser discussing a laptop project with a client team",
    },
    businessAutomationHero: {
      src: unsplash("1761195696590-3490ea770aa1"),
      alt: "Operations team reviewing an automated warehouse conveyor",
    },
  },

  businessSolutions: {
    hero: {
      src: unsplash("1758518729711-1cbacd55efdb"),
      alt: "Business team collaborating around a table in a modern office",
    },
    heroInset: {
      src: unsplash("1780733066519-df99b3123d30"),
      alt: "Advisor explaining a business plan during a client meeting",
    },
    partnership: {
      src: unsplash("1758518730151-cf64fddb4f0a"),
      alt: "Business partners discussing plans in a corporate meeting",
    },
    cta: {
      src: unsplash("1758518731706-be5d5230e5a5"),
      alt: "Business team considering a new project around a meeting table",
    },
    overview: {
      src: unsplash("1758518727929-4506fc031e1c"),
      alt: "Business team using a tablet to discuss operational plans",
    },
    startBusiness: {
      src: unsplash("1770626894265-bdb99db109f1"),
      alt: "Entrepreneur working through a new business idea at her laptop",
    },
    startBusinessHero: {
      src: unsplash("1758519290311-7e6ddb194016"),
      alt: "Entrepreneur considering a new venture while working at a laptop",
    },
    startBusinessInset: {
      src: unsplash("1654154117054-d774c3869a25"),
      alt: "Notebook and coffee on a desk prepared for startup planning",
    },
    startBusinessSupport: {
      src: unsplash("1783094269325-4ba186e8e01b"),
      alt: "Small business owner working at a laptop in her office",
    },
    businessConsultation: {
      src: unsplash("1758518727077-ffb66ffccced"),
      alt: "Business advisers discussing documents in a client meeting",
    },
    businessConsultationHero: {
      src: unsplash("1758518729706-b1810dd39cc6"),
      alt: "Business advisers discussing a client's plans around a meeting table",
    },
    businessConsultationSupport: {
      src: unsplash("1758518727343-e578b7795ad5"),
      alt: "Consultants reviewing recommendations together during a meeting",
    },
    businessConsultationInset: {
      src: unsplash("1759310610775-b298f34f73aa"),
      alt: "Business professionals exchanging guidance around a conference table",
    },

    businessPlanning: {
      src: unsplash("1758598305246-2500f540bf40"),
      alt: "Professional planning a business project with a laptop and sticky notes",
    },
    businessPlanningHero: {
      src: unsplash("1783094268259-942dbd1de4d3"),
      alt: "Professional writing business planning notes beside a laptop",
    },
    businessPlanningInset: {
      src: unsplash("1759884247503-b7b28d35bc53"),
      alt: "Whiteboard notes and markers arranged for a planning session",
    },
    businessPlanningSupport: {
      src: unsplash("1761914410572-02614b575847"),
      alt: "Planning documents and charts organized on a desk",
    },

    businessSetup: {
      src: unsplash("1522071820081-009f0129c71c"),
      alt: "Team collaborating around laptops while setting up a new business workflow",
    },
    businessSetupHero: {
      src: unsplash("1777026321659-64941fb943dd"),
      alt: "Organized warehouse inventory prepared for business operations",
    },
    businessSetupInset: {
      src: unsplash("1781559818983-4180d744416a"),
      alt: "Operations manager checking stock information on a warehouse tablet",
    },
    businessSetupSupport: {
      src: unsplash("1740914994154-c3273e113336"),
      alt: "Forklift operator moving goods through an active warehouse",
    },

    businessExpansion: {
      src: unsplash("1786361284635-e9053d2ac5b5"),
      alt: "Growing commercial district with modern office towers",
    },
    businessExpansionHero: {
      src: unsplash("1779700210487-a01758a3c55a"),
      alt: "Corporate meeting room overlooking a growing city skyline",
    },
    businessExpansionInset: {
      src: unsplash("1758873269320-372f7ad170f0"),
      alt: "Colleagues planning the next stage of business growth around a table",
    },
    businessExpansionSupport: {
      src: unsplash("1769740029093-83f39268a6a7"),
      alt: "City skyline seen alongside a business growth planning chart",
    },
    machineryEquipment: {
      src: unsplash("1738162837330-9257f938463c"),
      alt: "Worker operating industrial machinery on a factory floor",
    },
    machineryEquipmentHero: {
      src: unsplash("1748347687685-5613deb470ec"),
      alt: "Technician inspecting industrial equipment in a factory",
    },
    machineryEquipmentInset: {
      src: unsplash("1764835994645-3faa2c40f708"),
      alt: "Industrial production machinery arranged on a factory floor",
    },
    machineryEquipmentSupport: {
      src: unsplash("1747999610489-de5c0ad00e56"),
      alt: "Factory worker operating a pipe-cutting machine",
    },
    businessTechnology: {
      src: unsplash("1781559818983-c32838ee3d55"),
      alt: "Warehouse manager using a tablet to coordinate operations",
    },
    businessTechnologyHero: {
      src: unsplash("1759752394755-1241472b589d"),
      alt: "Professional using enterprise software on a laptop",
    },
    businessTechnologyInset: {
      src: unsplash("1768483538267-fce52de424d5"),
      alt: "Professional working with a business application on a laptop",
    },
    businessTechnologySupport: {
      src: unsplash("1769685528172-b74293fdeebd"),
      alt: "Business colleagues working together at a computer screen",
    },

    businessSupport: {
      src: unsplash("1712159018726-4564d92f3ec2"),
      alt: "Support professional assisting a business client from a computer workstation",
    },
    businessSupportHero: {
      src: unsplash("1758518729912-bf3a84c400e0"),
      alt: "Business colleagues reviewing operational questions together",
    },
    businessSupportInset: {
      src: unsplash("1758876203026-99a024dc43b9"),
      alt: "Colleagues working through documents together at a laptop",
    },
    businessSupportFeature: {
      src: unsplash("1758691737212-3eebbc8f84ed"),
      alt: "Business team collaborating on ongoing work in a shared office",
    },
  },

  // Main

  productCategories: {
    consumer: {
      src: unsplash("1513506003901-1e6a229e2d15"),
      alt: "Everyday household and consumer products arranged for retail supply",
    },
    food: {
      src: unsplash("1542838132-92c53300491e"),
      alt: "Fresh and packaged food products arranged for commercial supply",
    },
    electronics: {
      src: unsplash("1498049794561-7780e7231661"),
      alt: "Modern consumer electronics and connected devices",
    },
    electrical: {
      src: unsplash("1558618666-fcd25c85cd64"),
      alt: "Electrical cables and components used in commercial installations",
    },
    vehicles: {
      src: unsplash("1494976388531-d1058494cdd8"),
      alt: "Professional vehicle and automotive supply scene",
    },
    clothing: {
      src: unsplash("1489987707025-afc232f7ea0f"),
      alt: "Garments and apparel arranged in a professional clothing collection",
    },
    homeOffice: {
      src: unsplash("1497366754035-f200968a6e72"),
      alt: "Modern practical office furniture and workplace equipment",
    },
    furniture: {
      src: unsplash("1555041469-a586c61ea9bc"),
      alt: "Modern commercial furniture collection",
    },
    wood: {
      src: unsplash("1549490349-8643362247b5"),
      alt: "Timber and finished wood materials for commercial use",
    },
    machinery: {
      src: unsplash("1513828583688-c52646db42da"),
      alt: "Industrial machinery and production equipment",
    },
    industrial: {
      src: unsplash("1504328345606-18bbc8c9d7d1"),
      alt: "Industrial equipment and materials in a manufacturing environment",
    },
    packaging: {
      src: unsplash("1586528116311-ad8dd3c8310d"),
      alt: "Commercial packaging and containers prepared for dispatch",
    },
    construction: {
      src: unsplash("1581091226825-a6a2a5aee158"),
      alt: "Construction and building materials used on a project site",
    },
    agriculture: {
      src: unsplash("1500382017468-9049fed747ef"),
      alt: "Agricultural crops and farm products in a cultivated field",
    },
    beauty: {
      src: unsplash("1556228578-8c89e6adf883"),
      alt: "Beauty and personal care products arranged for retail supply",
    },
    medical: {
      src: unsplash("1576091160399-112ba8d25d1d"),
      alt: "Professional medical equipment in a healthcare environment",
    },
    business: {
      src: unsplash("1497366216548-37526070297c"),
      alt: "Commercial equipment and supplies in a modern business environment",
    },
    other: {
      src: unsplash("1556761175-b413da4baf72"),
      alt: "Diverse product sourcing discussion for a business requirement",
    },
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
