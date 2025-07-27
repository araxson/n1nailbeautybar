import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function HomePage() {
  const menuData = {
    manicure: [
      { name: "NAKED Manicure", price: 30 },
      { name: "Luxury Naked Manicure", price: 50 },
      { name: "Polish Manicure", price: 40 },
      { name: "Luxury Polish Manicure", price: 54 },
      { name: "Gel Manicure", price: 60 },
      { name: "Luxury Gel Manicure", price: 70 }
    ],
    pedicure: [
      { name: "Signature Pedicure (Polish)", price: 60 },
      { name: "Signature Pedicure (Gel)", price: 75 },
      { name: "Luxury Pedicure (Naked)", price: 65 },
      { name: "Luxury Pedicure (Polish)", price: 70 },
      { name: "Luxury Pedicure (Gel)", price: 85 }
    ],
    maniPedi: [
      { name: "Luxury Gel Mani & Pedi", price: 140 }
    ],
    vipService: [
      { name: "Head Spa Package A", price: 70 },
      { name: "Head Spa Package B", price: 100 },
      { name: "Head Spa Package C", price: 125 }
    ],
    houseCall: [
      { name: "Nail Enhancement Full Set", price: "80-100" },
      { name: "Nail Enhancement Refill", price: "70-90" },
      { name: "Color Refresh + Polish", price: 25 },
      { name: "Color Refresh + Gel", price: 35 }
    ]
  };

  return (
    <div>
      <HeroSection />
      <ServicesSection menuData={menuData} />
      <AboutSection />
      <ContactSection />
    </div>
  );
}