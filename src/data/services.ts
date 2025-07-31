export interface Service {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly price: string;
  readonly duration: string;
  readonly category: string;
  readonly image?: string;
  readonly features?: readonly string[];
  readonly bookingLink?: string;
}

export interface ServiceCategory {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly services: readonly Service[];
}

export interface MembershipLevel {
  readonly id: string;
  readonly title: string;
  readonly yearlyPrice: string;
  readonly benefits: readonly string[];
}

export const servicesData: readonly ServiceCategory[] = [
  {
    id: "manicures",
    title: "Manicures",
    description: "Professional hand care and nail enhancement",
    services: [
      {
        id: "basic-manicure",
        title: "Basic Manicure",
        description: "Perfect nail shaping, cuticle care, relaxing hand massage, premium polish",
        price: "$30",
        duration: "1 hour",
        category: "manicures",
        bookingLink: "https://n1nailbeautybar.com/book/basic-manicure",
        features: [
          "Perfect nail shaping",
          "Cuticle care",
          "Relaxing hand massage",
          "Premium polish",
        ],
      },
      {
        id: "deluxe-manicure",
        title: "Deluxe Manicure",
        description: "Everything in Basic + gentle hand scrub, moisturizing mask, longer massage, heated treatment",
        price: "$40",
        duration: "1 hour 15 mins",
        category: "manicures",
        bookingLink: "https://n1nailbeautybar.com/book/deluxe-manicure",
        features: [
          "Everything in Basic",
          "Gentle hand scrub",
          "Moisturizing mask",
          "Longer massage",
          "Heated treatment",
        ],
      },
      {
        id: "premium-manicure",
        title: "Premium Manicure",
        description: "Everything in Deluxe + warm wax treatment, hot stone massage, anti-aging care, complimentary champagne",
        price: "$55",
        duration: "1 hour 30 mins",
        category: "manicures",
        bookingLink: "https://n1nailbeautybar.com/book/premium-manicure",
        features: [
          "Everything in Deluxe",
          "Warm wax treatment",
          "Hot stone massage",
          "Anti-aging care",
          "Complimentary champagne",
        ],
      },
    ],
  },
  {
    id: "pedicures",
    title: "Pedicures",
    description: "Complete foot care and relaxation",
    services: [
      {
        id: "basic-pedicure",
        title: "Basic Pedicure",
        description: "Relaxing foot soak, expert nail care, callus removal, foot massage, perfect polish",
        price: "$45",
        duration: "1 hour",
        category: "pedicures",
        bookingLink: "https://n1nailbeautybar.com/book/basic-pedicure",
        features: [
          "Relaxing foot soak",
          "Expert nail care",
          "Callus removal",
          "Foot massage",
          "Perfect polish",
        ],
      },
      {
        id: "deluxe-pedicure",
        title: "Deluxe Pedicure",
        description: "Everything in Basic + sea salt scrub, clay mask, warm booties, pressure point massage",
        price: "$55",
        duration: "1 hour 15 mins",
        category: "pedicures",
        features: [
          "Everything in Basic",
          "Sea salt scrub",
          "Clay mask",
          "Warm booties",
          "Pressure point massage",
        ],
      },
      {
        id: "premium-pedicure",
        title: "Premium Pedicure",
        description: "Everything in Deluxe + intensive callus care, muscle relief treatment, luxury foot cream to take home",
        price: "$70",
        duration: "1 hour 15 mins",
        category: "pedicures",
        features: [
          "Everything in Deluxe",
          "Intensive callus care",
          "Muscle relief treatment",
          "Luxury foot cream to take home",
        ],
      },
    ],
  },
  {
    id: "long-lasting-options",
    title: "Long-Lasting Options",
    description: "Durable nail enhancements and treatments",
    services: [
      {
        id: "gel-manicure",
        title: "Gel Manicure",
        description: "Chip-free polish that lasts 3-4 weeks",
        price: "$45",
        duration: "1 hour 15 mins",
        category: "long-lasting-options",
        features: ["Chip-free polish", "Lasts 3-4 weeks"],
      },
      {
        id: "gel-pedicure",
        title: "Gel Pedicure",
        description: "Long-wearing polish for perfect toes",
        price: "$60",
        duration: "1 hour 15 mins",
        category: "long-lasting-options",
        features: ["Long-wearing polish", "Perfect toes"],
      },
      {
        id: "nail-strengthening",
        title: "Nail Strengthening",
        description: "Protective overlay to help nails grow stronger",
        price: "$50",
        duration: "1 hour 15 mins",
        category: "long-lasting-options",
        features: ["Protective overlay", "Helps nails grow stronger"],
      },
      {
        id: "extensions-short",
        title: "Extensions - Short",
        description: "Natural-looking length enhancement",
        price: "$65",
        duration: "1 hr 15 min",
        category: "long-lasting-options",
        features: ["Natural-looking", "Length enhancement"],
      },
      {
        id: "extensions-medium",
        title: "Extensions - Medium",
        description: "Classic length for everyday elegance",
        price: "$75",
        duration: "1 hr 15 min",
        category: "long-lasting-options",
        features: ["Classic length", "Everyday elegance"],
      },
      {
        id: "extensions-long",
        title: "Extensions - Long",
        description: "Sophisticated longer length",
        price: "$85",
        duration: "1 hr 15 min",
        category: "long-lasting-options",
        features: ["Sophisticated", "Longer length"],
      },
    ],
  },
  {
    id: "simple-nail-art",
    title: "Simple Nail Art",
    description: "Elegant and creative nail designs",
    services: [
      {
        id: "sheer-natural",
        title: "Sheer & Natural",
        description: "Clear, nude, or soft pink finish",
        price: "$5",
        duration: "5 min",
        category: "simple-nail-art",
        features: ["Clear finish", "Nude finish", "Soft pink finish"],
      },
      {
        id: "classic-french",
        title: "Classic French",
        description: "Timeless white tips",
        price: "$5",
        duration: "10 min",
        category: "simple-nail-art",
        features: ["Timeless", "White tips"],
      },
      {
        id: "minimalist-design",
        title: "Minimalist Design",
        description: "Simple, elegant patterns",
        price: "$10",
        duration: "15 min",
        category: "simple-nail-art",
        features: ["Simple patterns", "Elegant designs"],
      },
      {
        id: "accent-nail",
        title: "Accent Nail",
        description: "One special nail with subtle detail",
        price: "$15",
        duration: "20 min",
        category: "simple-nail-art",
        features: ["Special nail", "Subtle detail"],
      },
    ],
  },
  {
    id: "quick-services",
    title: "Quick Services",
    description: "Express treatments for busy schedules",
    services: [
      {
        id: "express-natural-nails",
        title: "Express Natural Nails",
        description: "Quick but thorough nail care",
        price: "$20",
        duration: "45 min",
        category: "quick-services",
        features: ["Quick service", "Thorough nail care"],
      },
      {
        id: "maintenance-visit",
        title: "Maintenance Visit",
        description: "Keep hands or feet looking perfect between appointments",
        price: "$35",
        duration: "45 min",
        category: "quick-services",
        features: ["Maintenance", "Perfect upkeep"],
      },
      {
        id: "polish-change",
        title: "Polish Change",
        description: "Fresh polish with nail treatment",
        price: "$20",
        duration: "15 mins",
        category: "quick-services",
        features: ["Fresh polish", "Nail treatment"],
      },
      {
        id: "gel-color-change",
        title: "Gel Color Change",
        description: "New gel color with nail care",
        price: "$25",
        duration: "30 mins",
        category: "quick-services",
        features: ["New gel color", "Nail care"],
      },
    ],
  },
  {
    id: "packages",
    title: "Packages",
    description: "Combined services for complete care",
    services: [
      {
        id: "essential-care",
        title: "Essential Care",
        description: "Basic Manicure + Basic Pedicure",
        price: "$70",
        duration: "2 hours",
        category: "packages",
        features: ["Basic Manicure", "Basic Pedicure"],
      },
      {
        id: "complete-luxury",
        title: "Complete Luxury",
        description: "Deluxe Manicure + Deluxe Pedicure",
        price: "$90",
        duration: "2 hour 30 min",
        category: "packages",
        features: ["Deluxe Manicure", "Deluxe Pedicure"],
      },
      {
        id: "ultimate-experience",
        title: "Ultimate Experience",
        description: "Premium Manicure + Premium Pedicure",
        price: "$115",
        duration: "2 hour 45 min",
        category: "packages",
        features: ["Premium Manicure", "Premium Pedicure"],
      },
      {
        id: "long-lasting-combo",
        title: "Long-Lasting Combo",
        description: "Gel Manicure + Gel Pedicure",
        price: "$95",
        duration: "2 hour 30 min",
        category: "packages",
        features: ["Gel Manicure", "Gel Pedicure"],
      },
    ],
  },
  {
    id: "add-on-services",
    title: "Add-On Services",
    description: "Enhance your experience with additional treatments",
    services: [
      {
        id: "warm-wax-treatment",
        title: "Warm Wax Treatment",
        description: "Deep moisturizing for hands or feet",
        price: "$10",
        duration: "15 min",
        category: "add-on-services",
        features: ["Deep moisturizing", "For hands or feet"],
      },
      {
        id: "extra-callus-care",
        title: "Extra Callus Care",
        description: "Additional attention for dry areas",
        price: "$15",
        duration: "20 min",
        category: "add-on-services",
        features: ["Additional attention", "For dry areas"],
      },
      {
        id: "nail-repair",
        title: "Nail Repair",
        description: "Fix damaged or broken nails",
        price: "$5 per nail",
        duration: "10 min",
        category: "add-on-services",
        features: ["Fix damaged nails", "Fix broken nails"],
      },
      {
        id: "cuticle-treatment",
        title: "Cuticle Treatment",
        description: "Intensive cuticle care",
        price: "$5",
        duration: "15 min",
        category: "add-on-services",
        features: ["Intensive care", "Cuticle treatment"],
      },
      {
        id: "polish-removal",
        title: "Polish Removal",
        description: "Complimentary with any service",
        price: "Free",
        duration: "5 min",
        category: "add-on-services",
        features: ["Complimentary", "With any service"],
      },
    ],
  },
] as const;

export const membershipLevels: readonly MembershipLevel[] = [
  {
    id: "silver",
    title: "Silver",
    yearlyPrice: "$100",
    benefits: [
      "10% off all services",
      "10% off all products",
      "1 FREE Polish Change - Hands monthly (value $25)",
      "1 friend pass per month (friend gets 20% off)",
    ],
  },
  {
    id: "gold",
    title: "Gold",
    yearlyPrice: "$200",
    benefits: [
      "20% off all services",
      "15% off all products",
      "3 FREE Express Natural Nails monthly (value $90)",
      "2 friend passes per month (friends get 30% off)",
    ],
  },
  {
    id: "platinum",
    title: "Platinum",
    yearlyPrice: "$300",
    benefits: [
      "30% off all services",
      "20% off all products",
      "4 Free weekly express service",
      "4 Free add-on",
      "3 friend passes per month (friends get 40% off)",
    ],
  },
] as const;
