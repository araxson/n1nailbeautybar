"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface LoadingAnimationProps {
  onComplete: () => void;
  isLoading: boolean;
}

export function LoadingAnimation({
  onComplete,
  isLoading,
}: LoadingAnimationProps) {
  const [showCurtain, setShowCurtain] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [desktopLeftPosition, setDesktopLeftPosition] = useState("24px");

  useEffect(() => {
    // Check if desktop and calculate position
    const checkDesktop = () => {
      const isDesktopSize = window.innerWidth >= 768;
      setIsDesktop(isDesktopSize);

      if (isDesktopSize) {
        // Calculate position for max-w-7xl (1280px) container
        const viewportWidth = window.innerWidth;
        const maxWidth = 1280; // max-w-7xl
        const containerPadding = 24; // px-6

        if (viewportWidth > maxWidth + containerPadding * 2) {
          // Container is centered, calculate offset
          const containerOffset = (viewportWidth - maxWidth) / 2;
          setDesktopLeftPosition(`${containerOffset + containerPadding}px`);
        } else {
          // Container takes full width with padding
          setDesktopLeftPosition(`${containerPadding}px`);
        }
      }
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    // Start curtain animation
    const curtainTimer = setTimeout(() => {
      setShowCurtain(true);
    }, 1800);

    // Complete loading
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2600);

    return () => {
      window.removeEventListener("resize", checkDesktop);
      clearTimeout(curtainTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <>
      {/* Logo Animation */}
      <motion.div
        className={isLoading ? "fixed z-[9999]" : "absolute z-[9999]"}
        initial={{
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          scale: 2,
        }}
        animate={{
          top: "52px", // 32px (top-8) + 20px (higher position) = upper part of header
          left: isDesktop ? desktopLeftPosition : "50%", // Desktop: calculated position for max-w-7xl, Mobile: center
          x: isDesktop ? "0%" : "-50%",
          y: "0%",
          scale: 1,
        }}
        transition={{
          duration: 1.5,
          delay: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Link
          href="/"
          className="group transition-all duration-200"
          aria-label="N1 Nail Beauty Bar - Home"
        >
          <Image
            src="/n1-logo.png"
            alt="N1 Nail Beauty Bar"
            width={120}
            height={40}
            className="h-8 md:h-10 w-auto"
            priority
          />
        </Link>
      </motion.div>

      {/* Black Curtain that slides UP from bottom - only during loading */}
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9998] bg-black"
          initial={{ y: "0%" }}
          animate={{ y: showCurtain ? "-100%" : "0%" }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      )}
    </>
  );
}
