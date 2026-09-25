import {
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  Building2,
  ChartNoAxesCombined,
  CheckCircle2,
  ClipboardList,
  Compass,
  Factory,
  Globe2,
  Handshake,
  Headphones,
  Lightbulb,
  MonitorCog,
  Network,
  Package,
  SearchCheck,
  Settings2,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { ROUTES } from "@/config/routes";
import { SITE_MEDIA, type SiteImage } from "@/config/site-media";

export type BusinessDetailKey =
  | "start"
  | "consultation"
  | "planning"
  | "setup"
  | "expansion"
  | "machinery"
  | "technology"
  | "support";

export type BusinessDetail = {
  title: string;
  href: string;
  headline: string;
  lead: string;
  introduction: string;
  image: SiteImage;
  insetImage: SiteImage;
  heroLabel: string;
  overview: string;
  overviewPoints: readonly string[];
  capabilities: readonly { title: string; description: string; icon: LucideIcon }[];
  feature: {
    eyebrow: string;
    title: string;
    description: string;
    image: SiteImage;
    nodes: readonly string[];
    kind: "flow" | "roadmap" | "checklist" | "system" | "cycle";
    link?: { label: string; href: string };
  };
  process: readonly { title: string; description: string; icon: LucideIcon }[];
  outcomes: readonly string[];
  why: string;
  whyPoints: readonly string[];
  related: readonly BusinessDetailKey[];
  cta: { title: string; description: string; label: string; href: string };
  featuredLast?: boolean;
  reverseFeature?: boolean;
  lightProcess?: boolean;
  heroDark?: boolean;
};

export const BUSINESS_DETAILS = {
  start: {
    title: "Start a Business",
    href: ROUTES.public.businessStart,
    headline: "Turn Your Business Idea Into a Clear Plan",
    lead: "Move from an initial idea to practical decisions about the business you want to build.",
    introduction:
      "We help you examine the opportunity, understand the market and organize the first steps toward setup and launch.",
    image: SITE_MEDIA.businessSolutions.startBusinessHero,
    insetImage: SITE_MEDIA.businessSolutions.startBusinessInset,
    heroLabel: "From idea to launch",
    overview:
      "Starting well means asking the right questions early. We bring structure to the idea, connect it to real operating needs and help you prepare for the decisions ahead.",
    overviewPoints: [
      "Clarify the opportunity",
      "Understand the market",
      "Plan the first practical steps",
    ],
    capabilities: [
      {
        title: "Idea Validation",
        description:
          "Explore the problem, offer and potential demand before committing resources.",
        icon: Lightbulb,
      },
      {
        title: "Market Understanding",
        description:
          "Consider customers, competitors and the environment you plan to enter.",
        icon: SearchCheck,
      },
      {
        title: "Business Direction",
        description:
          "Define a focused purpose and the outcomes the business should pursue.",
        icon: Compass,
      },
      {
        title: "Structure Considerations",
        description: "Think through how the business could be organized and operated.",
        icon: Building2,
      },
      {
        title: "Launch Preparation",
        description:
          "Translate early thinking into setup priorities and practical next steps.",
        icon: ArrowUpRight,
      },
    ],
    feature: {
      eyebrow: "From Idea to Launch",
      title: "Give Each Early Decision a Clear Place",
      description:
        "A business idea becomes more useful when it is tested, planned and connected to the work needed to launch.",
      image: SITE_MEDIA.businessSolutions.startBusinessSupport,
      nodes: ["Idea", "Opportunity", "Plan", "Setup", "Launch"],
      kind: "flow",
    },
    process: [
      {
        title: "Discuss the Idea",
        description: "Understand your concept, goals and starting point.",
        icon: Lightbulb,
      },
      {
        title: "Assess the Opportunity",
        description: "Consider demand, audience and practical feasibility.",
        icon: SearchCheck,
      },
      {
        title: "Build the Plan",
        description: "Shape priorities, resources and a direction forward.",
        icon: ClipboardList,
      },
      {
        title: "Prepare the Setup",
        description: "Coordinate the requirements needed to get ready.",
        icon: Settings2,
      },
      {
        title: "Move Toward Launch",
        description: "Turn the plan into a sequence of manageable actions.",
        icon: ArrowUpRight,
      },
    ],
    outcomes: [
      "A clearer business concept",
      "More informed early decisions",
      "A practical startup plan",
      "Better setup priorities",
      "A defined path toward launch",
      "Support for the next stage",
    ],
    why: "Miracle International can connect early business planning with practical setup, sourcing and technology support as your idea takes shape.",
    whyPoints: ["Business-first guidance", "Connected services", "Practical next steps"],
    related: ["planning", "setup", "consultation"],
    cta: {
      title: "Ready to Give Your Idea Direction?",
      description:
        "Tell us what you are considering and we will help you identify the next practical step.",
      label: "Start Your Business Journey",
      href: ROUTES.public.tellUsWhatYouNeed,
    },
  },
  consultation: {
    title: "Business Consultation",
    href: ROUTES.public.businessConsultation,
    headline: "Better Decisions Start With Clearer Business Guidance",
    lead: "Bring a business question, challenge or opportunity into sharper focus.",
    introduction:
      "Our consultation support helps you understand the situation, assess options and choose a practical direction.",
    image: SITE_MEDIA.businessSolutions.businessConsultationHero,
    insetImage: SITE_MEDIA.businessSolutions.businessConsultationInset,
    heroLabel: "Perspective for progress",
    overview:
      "Useful advice starts with the realities of your business. We listen to the challenge, consider the wider context and work with you toward decisions you can act on.",
    overviewPoints: [
      "Understand the challenge",
      "Assess available options",
      "Agree on practical action",
    ],
    capabilities: [
      {
        title: "Challenge Definition",
        description: "Identify the underlying issue before choosing a response.",
        icon: Target,
      },
      {
        title: "Decision Support",
        description: "Compare options against your goals, resources and constraints.",
        icon: Compass,
      },
      {
        title: "Opportunity Assessment",
        description: "Examine whether a new direction fits the business.",
        icon: SearchCheck,
      },
      {
        title: "Operational Guidance",
        description: "Consider improvements to the way work gets done.",
        icon: Settings2,
      },
      {
        title: "Growth Direction",
        description: "Connect immediate decisions with longer-term priorities.",
        icon: TrendingUp,
      },
    ],
    feature: {
      eyebrow: "A Practical Conversation",
      title: "From Challenge to Action",
      description:
        "A clear consultation moves from understanding the issue to recommendations that fit your business.",
      image: SITE_MEDIA.businessSolutions.businessConsultationSupport,
      nodes: ["Challenge", "Insight", "Recommendation", "Action"],
      kind: "flow",
    },
    process: [
      {
        title: "Listen",
        description: "Understand the question and your current position.",
        icon: Headphones,
      },
      {
        title: "Examine",
        description: "Look at constraints, opportunities and useful evidence.",
        icon: SearchCheck,
      },
      {
        title: "Discuss",
        description: "Work through realistic options together.",
        icon: Users,
      },
      {
        title: "Recommend",
        description: "Set out a practical direction and priorities.",
        icon: Compass,
      },
      {
        title: "Follow Through",
        description: "Connect guidance to the next action where needed.",
        icon: ArrowUpRight,
      },
    ],
    outcomes: [
      "Clearer business choices",
      "Better understanding of challenges",
      "Practical recommendations",
      "More focused priorities",
      "Direction for improvement",
      "Support beyond the conversation",
    ],
    why: "Our wider business services help turn guidance into coordinated support when a decision leads to setup, sourcing, technology or growth work.",
    whyPoints: [
      "Practical perspective",
      "Cross-service understanding",
      "Transparent communication",
    ],
    related: ["planning", "expansion", "start"],
    cta: {
      title: "What Decision Is Your Business Facing?",
      description:
        "Share the challenge and we will help you explore a practical way forward.",
      label: "Request a Consultation",
      href: ROUTES.public.contact,
    },
    featuredLast: true,
    reverseFeature: true,
    lightProcess: true,
  },
  planning: {
    title: "Business Planning",
    href: ROUTES.public.businessPlanning,
    headline: "A Clear Plan for the Business You Want to Build",
    lead: "Turn ambitions into a structured plan that connects goals, resources and day-to-day execution.",
    introduction:
      "We help organize the thinking behind a business so the next decisions are clearer and more practical.",
    image: SITE_MEDIA.businessSolutions.businessPlanningHero,
    insetImage: SITE_MEDIA.businessSolutions.businessPlanningInset,
    heroLabel: "Clarity before action",
    overview:
      "A useful business plan is a working guide. It brings your market direction, operating approach, resources and growth priorities into one coherent picture.",
    overviewPoints: [
      "Define the destination",
      "Align resources and operations",
      "Map the implementation",
    ],
    capabilities: [
      {
        title: "Goals & Direction",
        description: "Define what the business is trying to achieve and why.",
        icon: Target,
      },
      {
        title: "Market Approach",
        description: "Consider customers, positioning and routes to market.",
        icon: Globe2,
      },
      {
        title: "Operational Planning",
        description: "Connect daily work, processes and responsibilities.",
        icon: Workflow,
      },
      {
        title: "Resource Considerations",
        description: "Identify people, tools, suppliers and financial considerations.",
        icon: Package,
      },
      {
        title: "Growth Roadmap",
        description: "Set realistic phases for implementation and future development.",
        icon: ChartNoAxesCombined,
      },
    ],
    feature: {
      eyebrow: "Planning Roadmap",
      title: "Make the Direction Visible",
      description:
        "A clear plan links the long-term vision to the resources and operations required to make progress.",
      image: SITE_MEDIA.businessSolutions.businessPlanningSupport,
      nodes: ["Vision", "Strategy", "Resources", "Operations", "Growth"],
      kind: "roadmap",
    },
    process: [
      {
        title: "Define Goals",
        description: "Agree on priorities and the desired direction.",
        icon: Target,
      },
      {
        title: "Study the Market",
        description: "Consider customers, competition and position.",
        icon: SearchCheck,
      },
      {
        title: "Plan Operations",
        description: "Outline processes, people and delivery needs.",
        icon: Settings2,
      },
      {
        title: "Map Resources",
        description: "Identify tools, funding considerations and support.",
        icon: Package,
      },
      {
        title: "Set the Roadmap",
        description: "Sequence the actions needed to move forward.",
        icon: Compass,
      },
    ],
    outcomes: [
      "A clearer business direction",
      "Better aligned priorities",
      "More deliberate resource choices",
      "A coherent operating approach",
      "An implementation roadmap",
      "A plan that can evolve",
    ],
    why: "We connect planning to practical business support, making it easier to move from a document into coordinated action.",
    whyPoints: ["Grounded planning", "Operational perspective", "Connected execution"],
    related: ["start", "setup", "consultation"],
    cta: {
      title: "Ready to Put Your Goals Into a Plan?",
      description:
        "Tell us where your business is heading and we will help structure the path forward.",
      label: "Plan Your Next Step",
      href: ROUTES.public.tellUsWhatYouNeed,
    },
  },
  setup: {
    title: "Business Setup Support",
    href: ROUTES.public.businessSetup,
    headline: "From Planning to Practical Business Setup",
    lead: "Coordinate the people, resources and systems needed to turn a plan into an operating business.",
    introduction:
      "We help bring the practical setup pieces together so your team can prepare to launch with greater clarity.",
    image: SITE_MEDIA.businessSolutions.businessSetupHero,
    insetImage: SITE_MEDIA.businessSolutions.businessSetupInset,
    heroLabel: "Prepare to operate",
    overview:
      "Establishing a business involves many connected decisions. We help organize setup requirements, identify what is needed and coordinate the next steps.",
    overviewPoints: [
      "Understand setup requirements",
      "Coordinate resources and suppliers",
      "Prepare workflows and systems",
    ],
    capabilities: [
      {
        title: "Setup Coordination",
        description: "Bring the different setup tasks into a workable sequence.",
        icon: ClipboardList,
      },
      {
        title: "Supplier Requirements",
        description: "Identify sourcing needs and support supplier coordination.",
        icon: Package,
      },
      {
        title: "Tools & Resources",
        description: "Consider equipment, materials and operational essentials.",
        icon: BriefcaseBusiness,
      },
      {
        title: "Technology Readiness",
        description: "Plan for the digital systems the business will need.",
        icon: MonitorCog,
      },
      {
        title: "Workflow Preparation",
        description: "Prepare the processes that support day-to-day delivery.",
        icon: Workflow,
      },
    ],
    feature: {
      eyebrow: "Connected Setup",
      title: "Bring the Essential Pieces Together",
      description:
        "A coordinated setup connects the plan, resources, suppliers, systems and operations before launch.",
      image: SITE_MEDIA.businessSolutions.businessSetupSupport,
      nodes: [
        "Business Plan",
        "Resources",
        "Suppliers",
        "Systems",
        "Operations",
        "Launch",
      ],
      kind: "checklist",
    },
    process: [
      {
        title: "Review the Plan",
        description: "Confirm the operating model and priorities.",
        icon: ClipboardList,
      },
      {
        title: "List Requirements",
        description: "Identify resources, suppliers and tools.",
        icon: Package,
      },
      {
        title: "Coordinate Setup",
        description: "Bring people and practical tasks into sequence.",
        icon: Network,
      },
      {
        title: "Prepare Systems",
        description: "Consider technology and workflow readiness.",
        icon: MonitorCog,
      },
      {
        title: "Check Launch Readiness",
        description: "Review remaining steps before operations begin.",
        icon: CheckCircle2,
      },
    ],
    outcomes: [
      "More coordinated setup work",
      "Clearer operating requirements",
      "Better resource preparation",
      "Connected suppliers and systems",
      "More defined workflows",
      "Improved launch readiness",
    ],
    why: "Miracle International can connect setup needs with sourcing, technology and ongoing business support through the same wider service network.",
    whyPoints: [
      "Coordinated practical work",
      "Access to related services",
      "Support beyond setup",
    ],
    related: ["start", "planning", "machinery"],
    cta: {
      title: "Ready to Put the Practical Pieces in Place?",
      description:
        "Share your setup requirements and we will help identify the next steps.",
      label: "Discuss Your Business Setup",
      href: ROUTES.public.contact,
    },
    featuredLast: true,
    reverseFeature: true,
    lightProcess: true,
  },
  expansion: {
    title: "Business Expansion",
    href: ROUTES.public.businessExpansion,
    headline: "Prepare Your Business for the Next Stage of Growth",
    lead: "Strengthen the operation you have today while preparing for new markets, capacity and opportunities.",
    introduction:
      "We help established businesses assess what growth requires and coordinate the support behind it.",
    image: SITE_MEDIA.businessSolutions.businessExpansionHero,
    insetImage: SITE_MEDIA.businessSolutions.businessExpansionInset,
    heroLabel: "Build on what works",
    overview:
      "Growth is easier to manage when the operating model, suppliers, systems and partnerships are ready for it. We help bring those considerations together.",
    overviewPoints: [
      "Understand current capacity",
      "Identify growth constraints",
      "Plan the next market move",
    ],
    capabilities: [
      {
        title: "Market Opportunities",
        description: "Explore where your offer can go next.",
        icon: Globe2,
      },
      {
        title: "Capacity Planning",
        description: "Assess the people, tools and systems needed for more demand.",
        icon: ChartNoAxesCombined,
      },
      {
        title: "Supplier Readiness",
        description: "Review sourcing and supply needs for a larger operation.",
        icon: Package,
      },
      {
        title: "Process Improvement",
        description: "Strengthen workflows before increasing complexity.",
        icon: Settings2,
      },
      {
        title: "Partnership Direction",
        description: "Consider relationships that support the next stage.",
        icon: Handshake,
      },
    ],
    feature: {
      eyebrow: "Expansion Roadmap",
      title: "Grow From a Stronger Foundation",
      description:
        "Before entering new opportunities, strengthen the systems and capacity that support your current business.",
      image: SITE_MEDIA.businessSolutions.businessExpansionSupport,
      nodes: ["Current Business", "Strengthen", "Scale", "Expand", "New Opportunities"],
      kind: "roadmap",
    },
    process: [
      {
        title: "Review",
        description: "Understand the current position and ambitions.",
        icon: SearchCheck,
      },
      {
        title: "Prioritize",
        description: "Identify the most useful opportunities.",
        icon: Target,
      },
      {
        title: "Prepare",
        description: "Address capacity, process and supplier needs.",
        icon: Settings2,
      },
      {
        title: "Coordinate",
        description: "Bring partners and resources into the plan.",
        icon: Network,
      },
      {
        title: "Move Forward",
        description: "Take the next step with a clearer operating base.",
        icon: ArrowUpRight,
      },
    ],
    outcomes: [
      "Clearer growth priorities",
      "Better capacity preparation",
      "Stronger supplier coordination",
      "More scalable processes",
      "A more deliberate market approach",
      "Support for new opportunities",
    ],
    why: "Our broader view across business, sourcing and technology helps connect expansion plans with the practical work required to support them.",
    whyPoints: [
      "Business-wide perspective",
      "Connected sourcing support",
      "Practical growth planning",
    ],
    related: ["consultation", "technology", "machinery"],
    cta: {
      title: "What Does Your Next Stage Require?",
      description:
        "Tell us what you want to expand and we will help you map the practical options.",
      label: "Explore Expansion Opportunities",
      href: ROUTES.public.tellUsWhatYouNeed,
    },
  },
  machinery: {
    title: "Machinery & Equipment",
    href: ROUTES.public.businessMachinery,
    headline: "Equipment That Supports Real Business Operations",
    lead: "Find the machinery and commercial equipment that fits the work your business needs to do.",
    introduction:
      "We help clarify requirements, explore sourcing options and coordinate practical equipment decisions.",
    image: SITE_MEDIA.businessSolutions.machineryEquipmentHero,
    insetImage: SITE_MEDIA.businessSolutions.machineryEquipmentInset,
    heroLabel: "Built for operations",
    overview:
      "Equipment decisions affect capacity, workflows and delivery. We start with the operational requirement, then work through selection, sourcing and implementation considerations.",
    overviewPoints: [
      "Define the operational need",
      "Explore appropriate options",
      "Coordinate practical delivery",
    ],
    capabilities: [
      {
        title: "Equipment Requirements",
        description: "Clarify what the operation needs the equipment to achieve.",
        icon: Target,
      },
      {
        title: "Machinery Selection",
        description: "Compare suitable categories and operating considerations.",
        icon: Factory,
      },
      {
        title: "Supplier Coordination",
        description: "Bring sourcing discussions around a clear requirement.",
        icon: Handshake,
      },
      {
        title: "Commercial Equipment",
        description: "Explore tools and equipment for everyday business use.",
        icon: Package,
      },
      {
        title: "Implementation Planning",
        description: "Consider space, workflows and readiness before deployment.",
        icon: Settings2,
      },
    ],
    feature: {
      eyebrow: "Sourcing Flow",
      title: "Start With the Requirement",
      description:
        "A disciplined sourcing flow helps connect operational needs with equipment selection and practical implementation.",
      image: SITE_MEDIA.businessSolutions.machineryEquipmentSupport,
      nodes: ["Requirement", "Identify", "Source", "Evaluate", "Coordinate", "Implement"],
      kind: "flow",
    },
    process: [
      {
        title: "Define",
        description: "Document the business and operational need.",
        icon: ClipboardList,
      },
      {
        title: "Identify",
        description: "Find equipment types that may fit.",
        icon: SearchCheck,
      },
      { title: "Source", description: "Explore suitable supply options.", icon: Package },
      {
        title: "Evaluate",
        description: "Consider specification and practical suitability.",
        icon: ShieldCheck,
      },
      {
        title: "Coordinate",
        description: "Align procurement and delivery requirements.",
        icon: Network,
      },
      {
        title: "Implement",
        description: "Prepare the operation to use the equipment.",
        icon: Factory,
      },
    ],
    outcomes: [
      "Clearer equipment requirements",
      "Better informed selection",
      "More coordinated sourcing",
      "Improved operational readiness",
      "A practical implementation path",
      "Equipment aligned with business needs",
    ],
    why: "Miracle International approaches sourcing in the context of the operation it needs to support, connecting equipment choices with wider business planning.",
    whyPoints: [
      "Requirement-led sourcing",
      "Operational understanding",
      "Coordinated support",
    ],
    related: ["setup", "expansion", "technology"],
    cta: {
      title: "What Equipment Does Your Operation Need?",
      description:
        "Share the requirement and we will help you explore a practical sourcing path.",
      label: "Discuss Your Equipment Needs",
      href: ROUTES.public.contact,
    },
    featuredLast: true,
    reverseFeature: true,
    heroDark: true,
  },
  technology: {
    title: "Business Technology",
    href: ROUTES.public.businessTechnology,
    headline: "Use Technology to Run Your Business Better",
    lead: "Connect people, processes and information through technology shaped around real business work.",
    introduction:
      "We help identify digital systems and improvements that make operations easier to manage and adapt.",
    image: SITE_MEDIA.businessSolutions.businessTechnologyHero,
    insetImage: SITE_MEDIA.businessSolutions.businessTechnologyInset,
    heroLabel: "Business + technology",
    overview:
      "Useful technology solves an operational problem. We begin with how work happens, then consider systems, automation and reporting that can support the business.",
    overviewPoints: [
      "Understand the workflow",
      "Connect teams and information",
      "Plan practical technology changes",
    ],
    capabilities: [
      {
        title: "Digital Systems",
        description: "Consider tools that support core business activities.",
        icon: MonitorCog,
      },
      {
        title: "Workflow Improvement",
        description: "Reduce friction in everyday processes.",
        icon: Workflow,
      },
      {
        title: "Business Automation",
        description: "Identify repetitive work that could be streamlined.",
        icon: Bot,
      },
      {
        title: "Reporting Visibility",
        description: "Make relevant operating information easier to see.",
        icon: ChartNoAxesCombined,
      },
      {
        title: "Technology Planning",
        description: "Choose systems with current needs and future change in mind.",
        icon: Compass,
      },
    ],
    feature: {
      eyebrow: "Connected Systems",
      title: "Technology Works Best When the Business Is Connected",
      description:
        "People, processes, tools and information should support one another rather than operate as isolated pieces.",
      image: SITE_MEDIA.businessSolutions.businessTechnologySupport,
      nodes: ["People", "Processes", "Technology", "Data"],
      kind: "system",
      link: { label: "Explore IT Solutions", href: ROUTES.public.itSolutions },
    },
    process: [
      {
        title: "Understand",
        description: "Review how the work happens today.",
        icon: SearchCheck,
      },
      {
        title: "Identify",
        description: "Find the most useful areas for improvement.",
        icon: Target,
      },
      {
        title: "Plan",
        description: "Select an appropriate technology direction.",
        icon: Compass,
      },
      {
        title: "Connect",
        description: "Bring tools, teams and workflows together.",
        icon: Network,
      },
      {
        title: "Refine",
        description: "Review adoption and adjust as needs change.",
        icon: Settings2,
      },
    ],
    outcomes: [
      "More connected operations",
      "Clearer management visibility",
      "Less repetitive work",
      "Better information flow",
      "Technology aligned with goals",
      "Room for future improvement",
    ],
    why: "Our business and IT services can work together, keeping technology decisions anchored in real operational needs.",
    whyPoints: [
      "Business-led technology",
      "Cross-service support",
      "Practical implementation",
    ],
    related: ["planning", "support", "setup"],
    cta: {
      title: "Could Better Systems Help Your Business?",
      description: "Tell us which workflow or challenge you want to improve.",
      label: "Explore Business Technology",
      href: ROUTES.public.contact,
    },
    lightProcess: true,
  },
  support: {
    title: "Business Support",
    href: ROUTES.public.businessSupport,
    headline: "Support That Continues as Your Business Grows",
    lead: "Keep practical help close as operations, priorities and requirements change.",
    introduction:
      "Our support helps businesses work through everyday needs and prepare for what comes next.",
    image: SITE_MEDIA.businessSolutions.businessSupportHero,
    insetImage: SITE_MEDIA.businessSolutions.businessSupportInset,
    heroLabel: "Progress beyond launch",
    overview:
      "Launching is only one milestone. As the business operates and grows, new supplier, technology and operational questions arise. We help keep the response coordinated.",
    overviewPoints: [
      "Address changing needs",
      "Coordinate practical support",
      "Keep momentum through growth",
    ],
    capabilities: [
      {
        title: "Operational Support",
        description: "Work through practical issues in day-to-day business activity.",
        icon: Settings2,
      },
      {
        title: "Supplier Coordination",
        description: "Keep sourcing requirements connected to operations.",
        icon: Package,
      },
      {
        title: "Troubleshooting",
        description: "Clarify problems and find workable next steps.",
        icon: SearchCheck,
      },
      {
        title: "Business Guidance",
        description: "Discuss decisions as priorities and conditions change.",
        icon: Compass,
      },
      {
        title: "Technology Support",
        description: "Consider systems and digital improvements when needed.",
        icon: MonitorCog,
      },
    ],
    feature: {
      eyebrow: "Business Lifecycle",
      title: "Keep Support Connected to the Next Stage",
      description:
        "Needs change after launch. A steady support relationship can adapt as the business operates, improves and grows.",
      image: SITE_MEDIA.businessSolutions.businessSupportFeature,
      nodes: ["Launch", "Operate", "Improve", "Grow", "Adapt"],
      kind: "cycle",
    },
    process: [
      {
        title: "Listen",
        description: "Understand the current need or challenge.",
        icon: Headphones,
      },
      {
        title: "Prioritize",
        description: "Focus on what matters most now.",
        icon: Target,
      },
      {
        title: "Coordinate",
        description: "Connect the relevant people and services.",
        icon: Network,
      },
      {
        title: "Support",
        description: "Help move the practical work forward.",
        icon: Handshake,
      },
      {
        title: "Review",
        description: "Adapt the approach as the business changes.",
        icon: TrendingUp,
      },
    ],
    outcomes: [
      "More coordinated problem-solving",
      "Clearer support priorities",
      "Better supplier continuity",
      "Practical operational guidance",
      "Support for changing needs",
      "A stronger path beyond launch",
    ],
    why: "With services spanning business, sourcing and technology, Miracle International can help connect ongoing requirements to the right kind of support.",
    whyPoints: ["Ongoing partnership", "Connected services", "Responsive communication"],
    related: ["consultation", "technology", "expansion"],
    cta: {
      title: "What Does Your Business Need Next?",
      description:
        "Share the current challenge and our team will help identify a practical response.",
      label: "Talk to Our Support Team",
      href: ROUTES.public.contact,
    },
    featuredLast: true,
    reverseFeature: true,
    lightProcess: true,
  },
} satisfies Record<BusinessDetailKey, BusinessDetail>;
