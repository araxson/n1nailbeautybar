import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: "default" | "muted" | "primary" | "gradient";
  spacing?: "sm" | "md" | "lg";
  container?: boolean;
  variant?: "standard" | "grid";
}

/**
 * Enhanced section component with grid-based layout support
 * Provides consistent spacing, backgrounds, and container layouts
 */
export function Section({
  children,
  className,
  background = "default",
  spacing = "md",
  container = true,
  variant = "standard",
}: SectionProps) {
  const sectionContent = container ? (
    <div className="container px-6 md:px-8">{children}</div>
  ) : (
    children
  );

  if (variant === "grid") {
    return (
      <div
        className={cn(
          "grid-section",
          // Background variants for grid sections
          background === "default" && "bg-background",
          background === "muted" && "bg-muted/30",
          background === "primary" && "bg-primary text-primary-foreground",
          background === "gradient" &&
            "bg-gradient-to-b from-background via-background/95 to-muted/30",
          className
        )}
      >
        {sectionContent}
      </div>
    );
  }

  return (
    <section
      className={cn(
        // Background variants
        background === "default" && "bg-background",
        background === "muted" && "bg-muted/50",
        background === "primary" && "bg-primary text-primary-foreground",
        background === "gradient" &&
          "bg-gradient-to-b from-background via-background/95 to-muted/30",

        // Spacing variants
        spacing === "sm" && "py-16 md:py-20",
        spacing === "md" && "py-24 md:py-32",
        spacing === "lg" && "py-32 md:py-40",

        className
      )}
    >
      {sectionContent}
    </section>
  );
}
