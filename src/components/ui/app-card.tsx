import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AppCardProps {
  title?: string;
  subtitle?: string;
  description?: string;
  price?: string;
  duration?: string;
  features?: readonly string[];
  tags?: readonly string[];
  media?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
  variant?: "default" | "minimal" | "featured";
  layout?: "vertical" | "horizontal";
}

/**
 * Reusable card component that provides consistent styling and layout options
 * for all card-based UI elements across the application
 */
export function AppCard({
  title,
  subtitle,
  description,
  price,
  duration,
  features,
  tags,
  media,
  actions,
  children,
  className,
  variant = "default",
  layout = "vertical",
}: AppCardProps) {
  return (
    <Card
      className={cn(
        "h-full border border-gray-100 p-6 transition-colors duration-300 hover:border-gray-200",
        variant === "minimal" && "border-0",
        variant === "featured" && "border-2 border-gray-200",
        layout === "horizontal" && "flex",
        className
      )}
    >
      {media && (
        <div
          className={cn(
            "relative overflow-hidden",
            layout === "horizontal" ? "w-1/3" : "aspect-square"
          )}
        >
          {media}
        </div>
      )}

      <div
        className={cn(
          "flex-1",
          layout === "horizontal" && "flex flex-col justify-between"
        )}
      >
        <CardHeader className={cn("pb-6", layout === "horizontal" && "pb-4")}>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              {title && (
                <CardTitle className="heading-md text-foreground margin-sm">
                  {title}
                </CardTitle>
              )}
              {subtitle && (
                <CardDescription className="text-body text-muted-foreground">
                  {subtitle}
                </CardDescription>
              )}
              {description && (
                <p className="text-body text-muted-foreground mt-2">
                  {description}
                </p>
              )}
            </div>
            {(price || duration) && (
              <div className="text-right ml-6">
                {price && (
                  <div className="heading-md text-foreground margin-sm">
                    {price}
                  </div>
                )}
                {duration && (
                  <div className="text-small text-muted-foreground">
                    {duration}
                  </div>
                )}
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {features && features.length > 0 && (
            <div className="space-y-4 margin-lg">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center text-body text-muted-foreground"
                >
                  <div className="w-3 h-px bg-border mr-4 flex-shrink-0" />
                  <span className="tracking-wide">{feature}</span>
                </div>
              ))}
            </div>
          )}

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-small bg-muted text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {children}

          {actions && <div className="mt-6">{actions}</div>}
        </CardContent>
      </div>
    </Card>
  );
}
