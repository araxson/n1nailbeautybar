"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToElement } from "@/lib/utils";

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(
    null
  );
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(
    null
  );
  const [isMobile, setIsMobile] = useState(false);
  const [swipeProgress, setSwipeProgress] = useState(0);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const slides = [
    {
      image: "/hero-desktop-1.webp",
      imageMobile: "/hero-mobile-1.webp",
      title: "Premium Nail Care",
      subtitle: "Calgary's Artisanal Excellence",
      description:
        "Where precision meets artistry in Calgary's most refined nail salon atmosphere",
      motionType: "elegantRise",
    },
    {
      image: "/hero-desktop-2.webp",
      imageMobile: "/hero-mobile-2.webp",
      title: "Bespoke Designs",
      subtitle: "Creative Artistry",
      description:
        "Custom nail art crafted by our skilled artisans with meticulous attention to detail",
      motionType: "luxurySlide",
    },
    {
      image: "/hero-desktop-3.webp",
      imageMobile: "/hero-mobile-3.webp",
      title: "Luxury Experience",
      subtitle: "Calgary's Elevated Service",
      description:
        "Immerse yourself in Calgary's premier minimalistic nail sanctuary on 14 St SW",
      motionType: "sophisticatedScale",
    },
  ];

  // Ultra-luxury text animations with sophisticated curves
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        delayChildren: 0,
      },
    },
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.98,
    },
  };

  const subtitleVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      letterSpacing: "0.1em",
    },
    visible: {
      opacity: 0.9,
      y: 0,
      letterSpacing: "0.3em",
    },
    exit: {
      opacity: 0,
      y: -15,
    },
  };

  const descriptionVariants = {
    hidden: {
      opacity: 0,
      y: 25,
    },
    visible: {
      opacity: 0.8,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -10,
    },
  };

  const dividerVariants = {
    hidden: {
      scaleX: 0,
      opacity: 0,
    },
    visible: {
      scaleX: 1,
      opacity: 0.6,
    },
    exit: {
      scaleX: 0,
      opacity: 0,
    },
  };

  // Instant slide transitions without delays
  const changeSlide = useCallback(
    (newSlideIndex: number | ((prev: number) => number)) => {
      if (isTransitioning) return;

      setIsTransitioning(true);

      // Change slide immediately
      if (typeof newSlideIndex === "function") {
        setCurrentSlide(newSlideIndex);
      } else {
        setCurrentSlide(newSlideIndex);
      }
      setAnimationKey((prev) => prev + 1);

      // Reset transition state immediately
      setIsTransitioning(false);
    },
    [isTransitioning]
  );

  // Auto-advance slides with ultra-luxury timing
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning) {
        changeSlide((prev) => (prev + 1) % slides.length);
      }
    }, 10000); // Elegant timing for sophisticated experience
    return () => clearInterval(timer);
  }, [slides.length, isTransitioning, changeSlide]);

  // Enhanced mobile touch handlers for Instagram-like swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0];
    if (touch) {
      setTouchStart({ x: touch.clientX, y: touch.clientY });
      setSwipeProgress(0);
    }
    setTouchEnd(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const touch = e.targetTouches[0];
    if (touch) {
      const currentPos = { x: touch.clientX, y: touch.clientY };
      setTouchEnd(currentPos);

      // Calculate movement
      const deltaX = touchStart.x - currentPos.x;
      const deltaY = Math.abs(touchStart.y - currentPos.y);
      const swipeDistance = Math.abs(deltaX);

      // Calculate swipe progress for visual feedback
      const progress = Math.min(swipeDistance / 100, 1);
      setSwipeProgress(progress);

      // If horizontal movement is dominant and significant, prevent scrolling
      if (swipeDistance > deltaY && swipeDistance > 10) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart || !touchEnd || isTransitioning) {
      setTouchStart(null);
      setTouchEnd(null);
      setSwipeProgress(0);
      return;
    }

    const deltaX = touchStart.x - touchEnd.x;
    const deltaY = Math.abs(touchStart.y - touchEnd.y);
    const swipeDistance = Math.abs(deltaX);
    const minSwipeDistance = 50; // Instagram-like sensitivity
    const maxVerticalDistance = 80; // Tighter vertical tolerance

    // Instagram-like swipe detection
    const isHorizontalSwipe = swipeDistance > minSwipeDistance;
    const isNotVerticalScroll = deltaY < maxVerticalDistance;

    if (isHorizontalSwipe && isNotVerticalScroll) {
      // Haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate(30);
      }

      if (deltaX > 0) {
        // Swipe left - next slide
        changeSlide((prev) => (prev + 1) % slides.length);
      } else {
        // Swipe right - previous slide
        changeSlide((prev) => (prev - 1 + slides.length) % slides.length);
      }
    }

    // Reset touch states
    setTouchStart(null);
    setTouchEnd(null);
    setSwipeProgress(0);
  };

  const nextSlide = () => {
    changeSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    changeSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    if (index !== currentSlide && !isTransitioning) {
      changeSlide(index);
    }
  };

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[600px] w-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        touchAction: "pan-y",
        WebkitUserSelect: "none",
        userSelect: "none",
      }}
    >
      {/* Professional Images without Parallax */}
      {slides.map((slide, index) => (
        <div
          key={`slide-${slide.title.replace(/\s+/g, "-").toLowerCase()}`}
          className="absolute inset-0 w-full h-full overflow-hidden"
        >
          <motion.div
            className="absolute w-full h-full"
            initial={false}
            animate={{
              opacity: index === currentSlide ? 1 : 0,
              transition: {
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1] as const,
              },
            }}
          >
            <Image
              src={isMobile ? slide.imageMobile : slide.image}
              alt={slide.title}
              fill
              className="object-cover object-center"
              priority={index === 0}
              sizes="100vw"
              quality={90}
            />
          </motion.div>
        </div>
      ))}

      {/* Premium Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60"></div>

      {/* Hero Content - Bottom Left */}
      <div className="absolute bottom-8 md:bottom-16 left-4 md:left-8 right-4 md:right-auto z-20">
        <div className="text-white max-w-full md:max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentSlide}-${animationKey}`}
              variants={containerVariants}
              initial="hidden"
              animate={textVisible ? "visible" : "hidden"}
              exit="exit"
              className="space-y-6"
            >
              {/* Title */}
              <motion.div className="overflow-hidden">
                <motion.h1
                  variants={titleVariants}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-[0.05em] md:tracking-[0.1em] text-white"
                >
                  {slides[currentSlide]?.title}
                </motion.h1>
              </motion.div>

              {/* Divider */}
              <motion.div className="overflow-hidden">
                <motion.div
                  variants={dividerVariants}
                  className="h-px w-20 bg-white/60 origin-left"
                />
              </motion.div>

              {/* Subtitle */}
              <motion.div className="overflow-hidden">
                <motion.p
                  variants={subtitleVariants}
                  className="text-xs sm:text-sm md:text-base font-light tracking-[0.2em] md:tracking-[0.3em] uppercase opacity-90"
                >
                  {slides[currentSlide]?.subtitle}
                </motion.p>
              </motion.div>

              {/* Description */}
              <motion.div className="overflow-hidden">
                <motion.p
                  variants={descriptionVariants}
                  className="text-xs sm:text-sm md:text-base font-light tracking-wide opacity-75 max-w-full md:max-w-sm leading-relaxed"
                >
                  {slides[currentSlide]?.description}
                </motion.p>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Static CTA Button - Outside AnimatePresence */}
          <motion.div
            className="pt-6 md:pt-10"
            initial={{ opacity: 0, y: 50, filter: "blur(6px)", scale: 0.92 }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              scale: 1,
              transition: {
                delay: 3.2,
                duration: 1.8,
                ease: [0.19, 1, 0.22, 1] as const,
              },
            }}
          >
            <motion.button
              className="bg-white/10 border border-white/30 text-white px-6 sm:px-8 py-2.5 sm:py-3 text-xs font-light tracking-[0.15em] sm:tracking-[0.2em] uppercase overflow-hidden relative cursor-pointer"
              onClick={() => scrollToElement("services", 80)}
              whileHover={{
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                borderColor: "rgba(255, 255, 255, 0.5)",
                transition: {
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1] as const,
                },
              }}
              whileTap={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                transition: { duration: 0.1 },
              }}
            >
              <motion.span>Book Appointment</motion.span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Premium Navigation Dots */}
      <motion.div
        className="absolute bottom-8 right-4 md:right-8 z-20 flex space-x-3 md:space-x-4"
        initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          delay: 3.2,
          duration: 1.8,
          ease: [0.22, 1, 0.36, 1] as const,
        }}
      >
        {slides.map((slide, index) => (
          <motion.button
            key={`nav-dot-${slide.title.replace(/\s+/g, "-").toLowerCase()}`}
            onClick={() => goToSlide(index)}
            className="w-1.5 h-1.5 rounded-full relative overflow-hidden group"
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 1.2 }}
          >
            <motion.div className="absolute inset-0 bg-white/20 rounded-full" />
            <motion.div
              className="absolute inset-0 bg-white rounded-full origin-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: index === currentSlide ? 1 : 0,
                scale: index === currentSlide ? 1 : 0,
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
            />
            <motion.div
              className="absolute -inset-1 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 blur-sm"
              transition={{ duration: 0.4 }}
            />
          </motion.button>
        ))}
      </motion.div>

      {/* Premium Navigation Arrows */}
      <motion.button
        onClick={prevSlide}
        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center text-white/40"
        aria-label="Previous slide"
        initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{
          delay: 3.0,
          duration: 1.6,
          ease: [0.22, 1, 0.36, 1] as const,
        }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.svg
          className="w-4 h-4 md:w-5 md:h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={0.8}
            d="M15 19l-7-7 7-7"
          />
        </motion.svg>
      </motion.button>

      <motion.button
        onClick={nextSlide}
        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center text-white/40"
        aria-label="Next slide"
        initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{
          delay: 3.0,
          duration: 1.6,
          ease: [0.22, 1, 0.36, 1] as const,
        }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.svg
          className="w-4 h-4 md:w-5 md:h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={0.8}
            d="M9 5l7 7-7 7"
          />
        </motion.svg>
      </motion.button>
    </section>
  );
}