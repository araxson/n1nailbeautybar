import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
}

interface SectionProps {
  children: ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  background?: "default" | "muted" | "accent";
  border?: boolean;
}

/**
 * Container component for consistent layout and spacing
 */
export function Container({
  children,
  className,
  size = "lg",
  padding = "md",
}: ContainerProps) {
  const sizeMap = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-7xl",
    xl: "max-w-8xl",
    full: "max-w-full",
  };

  const paddingMap = {
    none: "px-0",
    sm: "px-4",
    md: "px-6",
    lg: "px-8",
    xl: "px-12",
  };

  return (
    <div
      className={cn(
        "mx-auto w-full",
        sizeMap[size],
        paddingMap[padding],
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * Section component for page sections - full width with inner container
 */
export function Section({
  children,
  className,
  padding = "lg",
  background = "default",
  border = false,
}: SectionProps) {
  const paddingMap = {
    none: "py-0",
    sm: "py-8",
    md: "py-12",
    lg: "py-16",
    xl: "py-24",
  };

  const backgroundMap = {
    default: "bg-white",
    muted: "bg-gray-50",
    accent: "bg-gray-100",
  };

  return (
    <section
      className={cn(
        "w-full",
        paddingMap[padding],
        backgroundMap[background],
        border && "border-b border-gray-200",
        className
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
