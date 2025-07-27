export interface AboutData {
  readonly story: {
    readonly title: string;
    readonly content: string;
  };
  readonly mission: {
    readonly title: string;
    readonly content: string;
  };
  readonly values: {
    readonly title: string;
    readonly items: readonly {
      readonly title: string;
      readonly description: string;
      readonly icon: string;
    }[];
  };
  readonly team: {
    readonly title: string;
    readonly members: readonly {
      readonly name: string;
      readonly role: string;
      readonly bio: string;
      readonly image: string;
    }[];
  };
}

export const aboutData: AboutData = {
  story: {
    title: "Our Story",
    content:
      "Founded with a passion for beauty and precision, N1 Nail Beauty Bar has been serving our community with exceptional nail care services since 2018. What started as a small studio has grown into a premier destination for those seeking luxury nail treatments in a sophisticated environment.",
  },
  mission: {
    title: "Our Mission",
    content:
      "We are committed to providing the highest quality nail services using premium products and advanced techniques. Our mission is to enhance your natural beauty while ensuring the health and strength of your nails, creating a relaxing and luxurious experience for every client.",
  },
  values: {
    title: "Our Values",
    items: [
      {
        title: "Quality",
        description:
          "We use only the finest products and maintain the highest standards in every service.",
        icon: "✨",
      },
      {
        title: "Precision",
        description:
          "Every detail matters. We pay attention to the smallest aspects to ensure perfect results.",
        icon: "🎯",
      },
      {
        title: "Luxury",
        description:
          "We create an atmosphere of sophistication and comfort for an exceptional experience.",
        icon: "💎",
      },
      {
        title: "Care",
        description:
          "Your nail health and satisfaction are our top priorities in everything we do.",
        icon: "❤️",
      },
    ],
  },
  team: {
    title: "Our Team",
    members: [
      {
        name: "Sarah Johnson",
        role: "Lead Nail Technician",
        bio: "With over 10 years of experience, Sarah specializes in luxury manicures and nail art.",
        image: "/images/team/sarah-johnson.jpg",
      },
      {
        name: "Maria Rodriguez",
        role: "Senior Technician",
        bio: "Maria is our pedicure specialist, known for her gentle touch and attention to detail.",
        image: "/images/team/maria-rodriguez.jpg",
      },
      {
        name: "Emily Chen",
        role: "Nail Artist",
        bio: "Emily brings creativity and innovation to every design, specializing in custom nail art.",
        image: "/images/team/emily-chen.jpg",
      },
    ],
  },
} as const;
