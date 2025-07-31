import { cn } from "@/lib/utils";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "skeleton";
  className?: string;
  text?: string;
}

/**
 * Simple loading component without animations
 */
export function Loading({
  size = "md",
  variant = "spinner",
  className,
  text,
}: LoadingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const renderSpinner = () => (
    <div
      className={cn(
        "rounded-full border-2 border-muted-foreground/20 border-t-foreground",
        sizeClasses[size],
        className
      )}
    />
  );

  const renderDots = () => (
    <div className={cn("flex space-x-1", className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={`loading-dot-${i}`}
          className={cn(
            "bg-foreground rounded-full",
            size === "sm" && "w-1 h-1",
            size === "md" && "w-2 h-2",
            size === "lg" && "w-3 h-3"
          )}
        />
      ))}
    </div>
  );

  const renderSkeleton = () => (
    <div className={cn("bg-muted rounded", className)}>
      <div
        className={cn(
          "bg-muted-foreground/20",
          size === "sm" && "h-4",
          size === "md" && "h-6",
          size === "lg" && "h-8"
        )}
      />
    </div>
  );

  const renderContent = () => {
    switch (variant) {
      case "dots":
        return renderDots();
      case "skeleton":
        return renderSkeleton();
      default:
        return renderSpinner();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {renderContent()}
      {text && <p className="text-small text-muted-foreground">{text}</p>}
    </div>
  );
}

/**
 * Skeleton component for content loading
 */
interface SkeletonProps {
  className?: string;
  lines?: number;
}

export function Skeleton({ className, lines = 1 }: SkeletonProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className={cn(
            "bg-muted rounded",
            i === lines - 1 ? "w-3/4" : "w-full",
            "h-4"
          )}
        />
      ))}
    </div>
  );
}

/**
 * Page loading component
 */
export function PageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loading size="lg" variant="spinner" text="Loading..." />
    </div>
  );
}
