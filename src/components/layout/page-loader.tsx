"use client";

import {
  useState,
  useEffect,
  Children,
  cloneElement,
  isValidElement,
} from "react";
import { LoadingOverlay } from "@/components/ui/loading-overlay";

interface PageLoaderProps {
  children: React.ReactNode;
}

interface LoadingProps {
  isLoading?: boolean;
  onLoadingComplete?: () => void;
}

export function PageLoader({ children }: PageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);

  const handleLoadingComplete = () => {
    // Start sliding the overlay
    setShowOverlay(false);
    // Mark loading as complete after slide animation
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  };

  // Prevent scroll during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  // Clone children and pass loading props to Header
  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child as React.ReactElement<LoadingProps>, {
        isLoading,
        onLoadingComplete: handleLoadingComplete,
      });
    }
    return child;
  });

  return (
    <>
      {/* Main Content with loading props */}
      {childrenWithProps}

      {/* Loading Overlay */}
      <LoadingOverlay isVisible={showOverlay} />
    </>
  );
}
