import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import * as React from "react";

interface TypographyProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  style?: React.CSSProperties;
}

interface HeadingProps extends TypographyProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: "xl" | "lg" | "md" | "sm";
}

interface TextProps extends TypographyProps {
  variant?: "body" | "small" | "muted" | "lead";
}

type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

/**
 * Reusable heading component with consistent typography styles
 */
export function Heading({
  children,
  className,
  level = 1,
  size = "lg",
  as,
  style,
}: HeadingProps) {
  const getHeadingElement = (): HeadingElement => {
    if (as && ["h1", "h2", "h3", "h4", "h5", "h6"].includes(as)) {
      return as as HeadingElement;
    }
    return `h${level}` as HeadingElement;
  };

  const Component = getHeadingElement();

  return (
    <Component
      className={cn(
        // Size variants
        size === "xl" && "heading-xl",
        size === "lg" && "heading-lg",
        size === "md" && "heading-md",
        size === "sm" && "text-xl font-light tracking-wide",

        "text-foreground",
        className
      )}
      style={style}
    >
      {children}
    </Component>
  );
}

/**
 * Reusable text component with consistent typography styles
 */
export function Text({
  children,
  className,
  variant = "body",
  as = "p",
  style,
}: TextProps) {
  const Component = as;

  return (
    <Component
      className={cn(
        // Variant styles
        variant === "body" && "text-body text-foreground",
        variant === "small" && "text-small text-foreground",
        variant === "muted" && "text-body text-muted-foreground",
        variant === "lead" &&
          "text-lg md:text-xl font-light leading-relaxed text-muted-foreground",

        className
      )}
      style={style}
    >
      {children}
    </Component>
  );
}

/**
 * Reusable section header component for consistent page headers
 */
export function SectionHeader({
  title,
  subtitle,
  description,
  className,
}: {
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("text-center mb-16", className)}>
      <Heading size="lg" className="mb-8">
        {title}
      </Heading>
      {subtitle && (
        <Text variant="lead" className="mb-8">
          {subtitle}
        </Text>
      )}
      {description && (
        <Text variant="muted" className="max-w-3xl mx-auto">
          {description}
        </Text>
      )}
    </div>
  );
}
