"use client";

import { AppCard } from "@/components/ui/app-card";
import { GalleryItem } from "@/data/gallery";

interface GalleryCardProps {
  item: GalleryItem;
  className?: string;
}

/**
 * Gallery card component that uses the reusable AppCard for consistent styling
 */
export function GalleryCard({ item, className = "" }: GalleryCardProps) {
  const media = (
    <div className="aspect-square bg-muted relative overflow-hidden group hover-clean">
      {/* Placeholder for image */}
      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
        <div className="text-center space-y-4">
          <div className="text-4xl">—</div>
          <span className="text-small text-muted-foreground group-hover:text-foreground transition-colors duration-200 tracking-wider uppercase">
            {item.title}
          </span>
        </div>
      </div>

      {/* Clean border overlay */}
      <div className="absolute inset-0 border border-border/5 group-hover:border-border/15 transition-colors duration-200" />
    </div>
  );

  return (
    <AppCard
      title={item.title}
      description={item.description}
      tags={item.tags}
      media={media}
      variant="minimal"
      className={className}
    />
  );
}
