"use client";

import { AppCard } from "@/components/ui/app-card";
import { AppButton } from "@/components/ui/app-button";
import { SquareService } from "@/app/api/services/route";

interface ServiceCardProps {
  service: SquareService;
  className?: string;
}

/**
 * Service card component that uses the reusable AppCard for consistent styling
 */
export function ServiceCard({ service, className }: ServiceCardProps) {
  return (
    <AppCard
      title={service.title}
      description={service.description}
      price={service.price}
      duration={service.duration}
      features={service.features || []}
      actions={
        <AppButton variant="primary" fullWidth>
          Book Now
        </AppButton>
      }
      {...(className && { className })}
    />
  );
}
