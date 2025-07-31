"use client";

import { Heading, Text } from "@/components/ui/typography";
import { AppButton } from "@/components/ui/app-button";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText?: string;
}

/**
 * Clean hero section component with grid-based layout
 */
export function HeroSection({
  title,
  subtitle,
  description,
  ctaText = "Book Now",
}: HeroSectionProps) {
  return (
    <section className="relative border-b border-border/20">
      <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <Heading
            size="xl"
            className="text-4xl md:text-6xl lg:text-7xl mb-8 font-light tracking-tight"
          >
            {title}
          </Heading>

          <Text
            variant="lead"
            className="text-xl md:text-2xl mb-8 text-muted-foreground font-light"
          >
            {subtitle}
          </Text>

          <Text
            variant="muted"
            className="max-w-2xl mx-auto mb-12 text-base leading-relaxed"
          >
            {description}
          </Text>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <AppButton variant="primary" size="lg" className="px-8 py-4">
              {ctaText}
            </AppButton>
            <AppButton variant="outline" size="lg" className="px-8 py-4">
              View Services
            </AppButton>
          </div>
        </div>
      </div>
    </section>
  );
}
