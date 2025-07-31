import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { MembershipSection } from "@/components/sections/membership-section";
import { AboutSection } from "@/components/sections/about-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FAQsSection } from "@/components/sections/faqs-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <MembershipSection />
      <AboutSection />
      <TestimonialsSection />
      <FAQsSection />
      <ContactSection />
    </div>
  );
}
