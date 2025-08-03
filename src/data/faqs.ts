export interface FAQ {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
  readonly category?: string;
}

export const faqsData: readonly FAQ[] = [
  {
    id: "booking-1",
    question: "How do I book an appointment?",
    answer:
      "You can book an appointment by clicking the 'Book' button next to any service, calling us directly, or visiting our salon. We recommend booking in advance to secure your preferred time slot.",
    category: "booking",
  },
  {
    id: "booking-2",
    question: "How far in advance should I book?",
    answer:
      "We recommend booking 1-2 weeks in advance, especially for weekend appointments or popular services like gel manicures and premium treatments. Same-day appointments may be available based on availability.",
    category: "booking",
  },
  {
    id: "booking-3",
    question: "What is your cancellation policy?",
    answer:
      "We require at least 24 hours notice for cancellations or rescheduling. Late cancellations or no-shows may be subject to a fee. We understand emergencies happen and will work with you when possible.",
    category: "booking",
  },
  {
    id: "services-1",
    question: "How long do gel manicures last?",
    answer:
      "Our gel manicures typically last 3-4 weeks with proper care. The longevity depends on your daily activities, nail growth rate, and how well you follow our aftercare instructions.",
    category: "services",
  },
  {
    id: "services-2",
    question: "What's the difference between your manicure tiers?",
    answer:
      "Basic includes nail shaping, cuticle care, hand massage, and polish. Deluxe adds scrub, mask, and heated treatment. Premium includes everything plus warm wax treatment, hot stone massage.",
    category: "services",
  },
  {
    id: "services-3",
    question: "Do you offer nail art or custom designs?",
    answer:
      "Yes! We offer simple nail art including minimalist designs, accent nails, and classic French tips. For complex custom designs, please discuss with your technician during booking to ensure adequate time is allocated.",
    category: "services",
  },
  {
    id: "services-4",
    question: "Can I bring my own nail polish?",
    answer:
      "Absolutely! We welcome you to bring your own polish. However, we cannot guarantee the same longevity or finish quality as our professional-grade polishes. Our extensive color collection is also available for your selection.",
    category: "services",
  },
  {
    id: "pricing-1",
    question: "Do you offer any packages or memberships?",
    answer:
      "Yes! We offer combination packages like Essential Care (Basic Mani + Basic Pedi) and Complete Luxury (Deluxe Mani + Deluxe Pedi). Ask about our membership programs for regular clients with exclusive discounts.",
    category: "pricing",
  },
  {
    id: "pricing-2",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, cash, and contactless payments including Apple Pay and Google Pay. Gift certificates are also available for purchase.",
    category: "pricing",
  },
  {
    id: "hygiene-1",
    question: "What safety and hygiene measures do you follow?",
    answer:
      "We maintain the highest hygiene standards with hospital-grade sterilization of all tools, single-use items when possible, and thorough sanitization between clients. All staff follow strict health and safety protocols.",
    category: "hygiene",
  },
  {
    id: "hygiene-2",
    question: "Are your tools properly sterilized?",
    answer:
      "Yes, all reusable tools are sterilized using hospital-grade autoclaves and UV sanitizers. We use single-use files and buffers for each client, and all equipment is thoroughly cleaned and disinfected between appointments.",
    category: "hygiene",
  },
  {
    id: "general-1",
    question: "What should I expect during my first visit?",
    answer:
      "Your first visit includes a brief consultation about your preferences and nail health, followed by your chosen service. We'll explain each step and provide aftercare instructions to help you maintain your beautiful nails at home.",
    category: "general",
  },
  {
    id: "general-2",
    question: "Do you have parking available?",
    answer:
      "Yes, we offer convenient parking for our clients. Street parking is also available nearby. Please let us know if you need directions or have any accessibility requirements.",
    category: "general",
  },
  {
    id: "general-3",
    question: "What are your operating hours?",
    answer:
      "We're open Monday through Saturday from 9 AM to 7 PM, and Sunday from 10 AM to 6 PM. Holiday hours may vary. Please call ahead to confirm availability on specific dates.",
    category: "general",
  },
] as const;

export const faqCategories = [
  { id: "all", title: "All Questions" },
  { id: "booking", title: "Booking & Appointments" },
  { id: "services", title: "Services & Treatments" },
  { id: "pricing", title: "Pricing & Payment" },
  { id: "hygiene", title: "Safety & Hygiene" },
  { id: "general", title: "General Information" },
] as const;
