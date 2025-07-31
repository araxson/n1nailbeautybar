"use client";

import { motion } from "framer-motion";

interface SlidingTextBarProps {
  text: string;
  speed?: number;
  className?: string;
}

export function SlidingTextBar({
  text,
  speed = 30,
  className = "",
}: SlidingTextBarProps) {
  // Create repeated text for seamless loop
  const repeatedText = `${text} • `.repeat(10);

  return (
    <div
      className={`relative overflow-hidden bg-transparent border-b border-white/20 ${className}`}
    >
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: [0, -50 * text.length],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <span className="text-[10px] sm:text-xs font-light text-white/80 tracking-[0.2em] sm:tracking-[0.3em] uppercase py-1.5 sm:py-2 px-4">
          {repeatedText}
        </span>
        <span className="text-[10px] sm:text-xs font-light text-white/80 tracking-[0.2em] sm:tracking-[0.3em] uppercase py-1.5 sm:py-2 px-4">
          {repeatedText}
        </span>
      </motion.div>
    </div>
  );
}
