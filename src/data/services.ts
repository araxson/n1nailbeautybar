export interface Service {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly price: string;
  readonly duration: string;
  readonly category: string;
  readonly image: string;
  readonly features: readonly string[];
}

export interface ServiceCategory {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly services: readonly Service[];
}

export const servicesData: readonly ServiceCategory[] = [
  {
    id: "manicures",
    title: "Manicures",
    description: "Professional hand care and nail enhancement",
    services: [
      {
        id: "classic-manicure",
        title: "Classic Manicure",
        description: "Traditional nail care with polish",
        price: "$35",
        duration: "45 min",
        category: "manicures",
        image: "/images/classic-manicure-001.webp",
        features: [
          "Nail shaping",
          "Cuticle care",
          "Hand massage",
          "Polish application",
        ],
      },
      {
        id: "gel-manicure",
        title: "Gel Manicure",
        description: "Long-lasting gel polish application",
        price: "$45",
        duration: "60 min",
        category: "manicures",
        image: "/images/gel-manicure-001.webp",
        features: ["Nail shaping", "Cuticle care", "Gel polish", "UV curing"],
      },
      {
        id: "luxury-manicure",
        title: "Luxury Manicure",
        description: "Premium hand treatment with luxury products",
        price: "$65",
        duration: "75 min",
        category: "manicures",
        image: "/images/luxury-manicure-001.webp",
        features: [
          "Deep conditioning",
          "Hot stone massage",
          "Luxury polish",
          "Paraffin treatment",
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
        id: "classic-pedicure",
        title: "Classic Pedicure",
        description: "Essential foot care and polish",
        price: "$45",
        duration: "60 min",
        category: "pedicures",
        image: "/images/classic-pedicure-001.webp",
        features: [
          "Foot soak",
          "Nail shaping",
          "Callus removal",
          "Polish application",
        ],
      },
      {
        id: "spa-pedicure",
        title: "Spa Pedicure",
        description: "Relaxing foot treatment with massage",
        price: "$65",
        duration: "90 min",
        category: "pedicures",
        image: "/images/spa-pedicure-001.webp",
        features: [
          "Aromatherapy soak",
          "Deep exfoliation",
          "Foot massage",
          "Hot towel treatment",
        ],
      },
    ],
  },
  {
    id: "nail-art",
    title: "Nail Art",
    description: "Creative and custom nail designs",
    services: [
      {
        id: "basic-nail-art",
        title: "Basic Nail Art",
        description: "Simple designs and patterns",
        price: "$15",
        duration: "30 min",
        category: "nail-art",
        image: "/images/basic-nail-art-001.webp",
        features: ["Simple designs", "Stripes", "Dots", "French tips"],
      },
      {
        id: "premium-nail-art",
        title: "Premium Nail Art",
        description: "Complex designs and 3D elements",
        price: "$35",
        duration: "60 min",
        category: "nail-art",
        image: "/images/premium-nail-art-001.webp",
        features: [
          "3D elements",
          "Hand-painted designs",
          "Stencils",
          "Rhinestones",
        ],
      },
    ],
  },
] as const;
