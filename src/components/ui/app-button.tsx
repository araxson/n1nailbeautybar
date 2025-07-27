import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode, ComponentProps } from "react";

interface AppButtonProps
  extends Omit<ComponentProps<typeof Button>, "variant" | "size"> {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost" | "minimal";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

/**
 * Reusable button component that extends Shadcn Button with consistent
 * styling and additional variants for the application
 */
export function AppButton({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  ...props
}: AppButtonProps) {
  // Map our custom variants to Shadcn variants
  const getShadcnVariant = (
    variant: AppButtonProps["variant"]
  ): ComponentProps<typeof Button>["variant"] => {
    switch (variant) {
      case "primary":
        return "default";
      case "outline":
        return "outline";
      case "ghost":
      case "minimal":
        return "ghost";
      default:
        return "default";
    }
  };

  // Map our custom sizes to Shadcn sizes
  const getShadcnSize = (
    size: AppButtonProps["size"]
  ): ComponentProps<typeof Button>["size"] => {
    switch (size) {
      case "sm":
        return "sm";
      case "md":
        return "default";
      case "lg":
        return "lg";
      default:
        return "default";
    }
  };

  return (
    <Button
      variant={getShadcnVariant(variant)}
      size={getShadcnSize(size)}
      className={cn(
        // Custom variants
        variant === "primary" && "button-primary",
        variant === "outline" && "button-outline",
        variant === "ghost" && "hover:bg-accent hover:text-accent-foreground",
        variant === "minimal" &&
          "bg-transparent border hover:bg-accent hover:text-accent-foreground",

        // Size variants
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-6 py-3 text-sm",
        size === "lg" && "px-8 py-4 text-base",

        fullWidth && "w-full",

        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
