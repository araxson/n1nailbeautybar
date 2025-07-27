"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const slides = [
    {
      image: "/hero-bg-1.jpg",
      title: "Premium Nail Care",
      subtitle: "Artisanal Excellence",
      description: "Where precision meets artistry in an atmosphere of refined elegance",
      motionType: "elegantRise"
    },
    {
      image: "/hero-bg-2.jpg",
      title: "Bespoke Designs",
      subtitle: "Creative Artistry", 
      description: "Custom nail art crafted by our skilled artisans with meticulous attention to detail",
      motionType: "luxurySlide"
    },
    {
      image: "/hero-bg-3.jpg",
      title: "Luxury Experience",
      subtitle: "Elevated Service",
      description: "Immerse yourself in our minimalistic sanctuary of beauty and sophistication",
      motionType: "sophisticatedScale"
    },
    {
      image: "/hero-bg-4.jpg",
      title: "Exceptional Wellness",
      subtitle: "Holistic Beauty",
      description: "A transformative journey that nurtures both your nails and your well-being",
      motionType: "refinedFloat"
    }
  ];

  // Ultra-luxury text animations with sophisticated curves
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        delayChildren: 0
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.98
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.98
    }
  };

  const subtitleVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      letterSpacing: "0.1em"
    },
    visible: { 
      opacity: 0.9, 
      y: 0,
      letterSpacing: "0.3em"
    },
    exit: {
      opacity: 0,
      y: -15
    }
  };

  const descriptionVariants = {
    hidden: { 
      opacity: 0, 
      y: 25
    },
    visible: { 
      opacity: 0.8, 
      y: 0
    },
    exit: {
      opacity: 0,
      y: -10
    }
  };

  const dividerVariants = {
    hidden: { 
      scaleX: 0, 
      opacity: 0
    },
    visible: { 
      scaleX: 1, 
      opacity: 0.6
    },
    exit: {
      scaleX: 0,
      opacity: 0
    }
  };


  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Premium slide transitions with orchestrated timing
  const changeSlide = useCallback((newSlideIndex: number | ((prev: number) => number)) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Step 1: Begin sophisticated text exit animation
    setTextVisible(false);
    
    // Step 2: Change slide after text exits with reduced timing
    setTimeout(() => {
      if (typeof newSlideIndex === 'function') {
        setCurrentSlide(newSlideIndex);
      } else {
        setCurrentSlide(newSlideIndex);
      }
      setAnimationKey(prev => prev + 1);
      
      // Step 3: Quick entrance timing
      setTimeout(() => {
        setTextVisible(true);
        setIsTransitioning(false);
      }, 200); // Reduced pause
    }, 500); // Reduced exit timing
  }, [isTransitioning]);

  // Auto-advance slides with ultra-luxury timing
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning) {
        changeSlide((prev) => (prev + 1) % slides.length);
      }
    }, 10000); // Elegant timing for sophisticated experience
    return () => clearInterval(timer);
  }, [slides.length, isTransitioning, changeSlide]);

  // Enhanced mobile touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return; // Only handle on mobile
    
    const touch = e.targetTouches[0];
    if (touch) {
      setTouchStart({ x: touch.clientX, y: touch.clientY });
    }
    setTouchEnd(null);
    
    // Add visual feedback on touch start
    (e.currentTarget as HTMLElement).style.cursor = 'grabbing';
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile || !touchStart) return;
    
    const touch = e.targetTouches[0];
    if (touch) {
      const currentPos = { x: touch.clientX, y: touch.clientY };
      setTouchEnd(currentPos);
      
      // Calculate movement
      const deltaX = Math.abs(touchStart.x - currentPos.x);
      const deltaY = Math.abs(touchStart.y - currentPos.y);
      
      // If horizontal movement is dominant and significant, prevent scrolling
      if (deltaX > deltaY && deltaX > 15) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isMobile) return; // Only handle on mobile
    
    // Reset cursor
    (e.currentTarget as HTMLElement).style.cursor = 'grab';
    
    if (!touchStart || !touchEnd || isTransitioning) {
      setTouchStart(null);
      setTouchEnd(null);
      return;
    }
    
    const deltaX = touchStart.x - touchEnd.x;
    const deltaY = Math.abs(touchStart.y - touchEnd.y);
    const swipeDistance = Math.abs(deltaX);
    const minSwipeDistance = 40; // Optimized for mobile
    const maxVerticalDistance = 100; // Allow more vertical tolerance
    
    // More forgiving swipe detection for mobile
    const isHorizontalSwipe = swipeDistance > minSwipeDistance;
    const isNotVerticalScroll = deltaY < maxVerticalDistance || swipeDistance > deltaY * 1.5;
    
    if (isHorizontalSwipe && isNotVerticalScroll) {
      // Haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate(50);
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
      className="relative h-screen w-full overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ 
        touchAction: 'pan-y',
        WebkitUserSelect: 'none',
        userSelect: 'none'
      }}
    >
      {/* Carousel Images - Crossfade without gaps */}
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 w-full h-[120%]"
          style={{
            transform: `translate3d(0, ${scrollY * 0.5}px, 0)`,
          }}
          initial={false}
          animate={{ 
            opacity: index === currentSlide ? 1 : 0,
            filter: index === currentSlide ? "blur(0px)" : "blur(8px)",
            scale: index === currentSlide ? 1 : 1.1,
            transition: { 
              duration: 2.5, 
              ease: [0.22, 1, 0.36, 1] as const,
              opacity: {
                duration: 2.0
              },
              scale: {
                duration: 3.0
              }
            }
          }}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </motion.div>
      ))}
      
      {/* Premium Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/50"></div>
      
      {/* Hero Content - Bottom Left */}
      <div className="absolute bottom-16 left-8 z-20">
        <div className="text-white max-w-lg">
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
                  className="text-3xl md:text-5xl font-extralight tracking-[0.1em] text-white"
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
                  className="text-sm md:text-base font-light tracking-[0.3em] uppercase opacity-90"
                >
                  {slides[currentSlide]?.subtitle}
                </motion.p>
              </motion.div>
              
              {/* Description */}
              <motion.div className="overflow-hidden">
                <motion.p 
                  variants={descriptionVariants}
                  className="text-sm font-light tracking-wide opacity-75 max-w-sm leading-relaxed"
                >
                  {slides[currentSlide]?.description}
                </motion.p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
          
          {/* Static CTA Button - Outside AnimatePresence */}
          <motion.div 
            className="pt-10"
            initial={{ opacity: 0, y: 50, filter: "blur(6px)", scale: 0.92 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              filter: "blur(0px)",
              scale: 1,
              transition: { 
                delay: 3.2, 
                duration: 1.8, 
                ease: [0.19, 1, 0.22, 1] as const 
              }
            }}
          >
            <motion.button 
              className="bg-white/10 border border-white/30 text-white px-8 py-3 text-xs font-light tracking-[0.2em] uppercase overflow-hidden relative"
              whileHover={{ 
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                borderColor: "rgba(255, 255, 255, 0.5)",
                transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const }
              }}
              whileTap={{ 
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                transition: { duration: 0.1 }
              }}
            >
              <motion.span>
                Book Appointment
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      </div>
      
      {/* Premium Navigation Dots */}
      <motion.div 
        className="absolute bottom-8 left-8 z-20 flex space-x-4"
        initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 3.2, duration: 1.8, ease: [0.22, 1, 0.36, 1] as const }}
      >
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className="w-1.5 h-1.5 rounded-full relative overflow-hidden group"
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 1.2 }}
          >
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-full"
            />
            <motion.div
              className="absolute inset-0 bg-white rounded-full origin-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: index === currentSlide ? 1 : 0,
                scale: index === currentSlide ? 1 : 0
              }}
              transition={{ 
                duration: 0.8, 
                ease: [0.22, 1, 0.36, 1] as const
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
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 flex items-center justify-center text-white/40 group"
        aria-label="Previous slide"
        initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ delay: 3.0, duration: 1.6, ease: [0.22, 1, 0.36, 1] as const }}
        whileHover={{ 
          x: -5,
          transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }
        }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-full backdrop-blur-sm transition-all duration-500" />
        <motion.svg 
          className="w-5 h-5 relative z-10" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          whileHover={{ color: "rgba(255, 255, 255, 0.9)" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.8} d="M15 19l-7-7 7-7" />
        </motion.svg>
      </motion.button>
      
      <motion.button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 flex items-center justify-center text-white/40 group"
        aria-label="Next slide"
        initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ delay: 3.0, duration: 1.6, ease: [0.22, 1, 0.36, 1] as const }}
        whileHover={{ 
          x: 5,
          transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }
        }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-full backdrop-blur-sm transition-all duration-500" />
        <motion.svg 
          className="w-5 h-5 relative z-10" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          whileHover={{ color: "rgba(255, 255, 255, 0.9)" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.8} d="M9 5l7 7-7 7" />
        </motion.svg>
      </motion.button>
    </section>
  );
}