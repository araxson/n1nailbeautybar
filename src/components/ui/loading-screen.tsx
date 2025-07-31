"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [showLoading, setShowLoading] = useState(true);
  const [startSliding, setStartSliding] = useState(false);

  useEffect(() => {
    // Start sliding after logo animation
    const slideTimer = setTimeout(() => {
      setStartSliding(true);
    }, 2000); // Start slide at 2s

    // Hide loading screen completely
    const completeTimer = setTimeout(() => {
      setShowLoading(false);
      onLoadingComplete();
    }, 2600); // Complete at 2.6s

    return () => {
      clearTimeout(slideTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoadingComplete]);

  if (!showLoading) return null;

  return (
    <>
      {/* Black Background */}
      <motion.div
        className="fixed inset-0 z-[9999] bg-black origin-top"
        initial={{ y: "0%" }}
        animate={{
          y: startSliding ? "-100%" : "0%",
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 0.61, 0.36, 1], // Custom bezier for smooth acceleration
        }}
      />

      {/* Logo - slides up with the background */}
      <motion.div
        className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none origin-top"
        initial={{ y: "0%" }}
        animate={{
          y: startSliding ? "-100%" : "0%",
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 0.61, 0.36, 1], // Same as background for harmony
        }}
      >
        <motion.div
          className="relative"
          initial={{
            x: 0,
            y: 0,
            scale: 2,
          }}
          animate={{
            x: 0,
            y: "calc(-50vh + 68px)", // Exact header position (adjust based on your header height)
            scale: 1,
          }}
          transition={{
            duration: 1.8,
            ease: [0.22, 1, 0.36, 1], // Smooth deceleration
          }}
        >
          <Image
            src="/n1-logo.png"
            alt="N1 Nail Beauty Bar"
            width={120}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </motion.div>
      </motion.div>
    </>
  );
}
