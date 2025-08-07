"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { motion, AnimatePresence } from "framer-motion";
import { navigationData } from "@/data/navigation";
import { scrollToElement } from "@/lib/utils";
import { SlidingTextBar } from "@/components/ui/sliding-text-bar";
import { siteConfig } from "@/data/site";

interface UnifiedHeaderProps {
  isInitialLoading?: boolean;
  onLoadingComplete?: () => void;
}

export function UnifiedHeader({
  isInitialLoading = false,
  onLoadingComplete,
}: UnifiedHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHamburgerActive, setIsHamburgerActive] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showLoader, setShowLoader] = useState(isInitialLoading);

  // Cleanup function to reset body scroll when component unmounts
  useEffect(() => {
    return () => {
      document.body.classList.remove("body-scroll-locked");
    };
  }, []);

  useEffect(() => {
    if (!isInitialLoading) return;

    const timer = setTimeout(() => {
      setShowLoader(false);
      onLoadingComplete?.();
    }, 1800); // Faster modern timing

    return () => clearTimeout(timer);
  }, [isInitialLoading, onLoadingComplete]);

  const toggleMenu = () => {
    if (!isMenuOpen) {
      setIsHamburgerActive(true);
      // Prevent body scroll when menu opens
      document.body.classList.add("body-scroll-locked");
      setTimeout(() => {
        setIsMenuOpen(true);
      }, 300);
    } else {
      setIsClosing(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        // Re-enable body scroll when menu closes
        document.body.classList.remove("body-scroll-locked");
      }, 300);
      setTimeout(() => {
        setIsHamburgerActive(false);
        setIsClosing(false);
      }, 900);
    }
  };

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      // Re-enable body scroll when menu closes
      document.body.classList.remove("body-scroll-locked");
    }, 300);
    setTimeout(() => {
      setIsHamburgerActive(false);
      setIsClosing(false);
    }, 900);
  };

  const handleMenuItemClick = (href: string, event: React.MouseEvent) => {
    event.preventDefault();

    if (href.startsWith("#")) {
      const sectionId = href.substring(1);
      setIsClosing(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        // Re-enable body scroll when menu closes
        document.body.classList.remove("body-scroll-locked");
      }, 300);
      setTimeout(() => {
        scrollToElement(sectionId, 80);
      }, 400);
      setTimeout(() => {
        setIsHamburgerActive(false);
        setIsClosing(false);
      }, 900);
    } else {
      closeMenu();
      setTimeout(() => {
        window.location.href = href;
      }, 300);
    }
  };

  const menuSlideVariants = {
    closed: {
      x: "-100%",
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
    open: {
      x: "0%",
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1] as const,
      },
    },
  };

  const menuItemVariants = {
    closed: {
      opacity: 0,
      x: -20,
      y: 20,
      filter: "blur(1px)",
    },
    open: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1] as const,
      },
    },
  };

  const staggerContainer = {
    open: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  return (
    <>
      {/* Black Loading Overlay */}
      <AnimatePresence>
        {showLoader && (
          <motion.div
            className="fixed inset-0 z-[9998] bg-black origin-top"
            initial={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{
              duration: 0.5,
              ease: [0.22, 0.61, 0.36, 1],
            }}
          />
        )}
      </AnimatePresence>

      {/* Loading Logo - separate from header logo */}
      <AnimatePresence>
        {showLoader && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.2 },
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 2, opacity: 1 }}
              exit={{ scale: 1, opacity: 0 }}
              transition={{
                scale: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.3 },
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
        )}
      </AnimatePresence>

      {/* Sliding Text Bar */}
      <motion.div
        className="absolute top-0 z-50 w-full overflow-hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: showLoader ? 0 : 1, y: showLoader ? -20 : 0 }}
        transition={{ delay: showLoader ? 0 : 0.8, duration: 0.8 }}
      >
        <SlidingTextBar
          text="PREMIUM NAIL SERVICES • LUXURY EXPERIENCE • BOOK YOUR APPOINTMENT TODAY"
          speed={25}
        />
      </motion.div>

      <header className="absolute top-8 z-50 w-full bg-transparent px-4 md:px-0">
        <Container>
          <div className="flex items-center justify-between h-20">
            {/* LEFT - Hamburger Menu */}
            <motion.div
              className="flex items-center md:hidden flex-shrink-0 -ml-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: showLoader ? 0 : 1 }}
              transition={{ delay: showLoader ? 0 : 0.8, duration: 0.5 }}
            >
              <motion.button
                onClick={toggleMenu}
                className="w-10 h-10 flex flex-col justify-center items-center relative p-2"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
                whileHover={{ opacity: 0.8 }}
                whileTap={{ opacity: 1 }}
              >
                <motion.span
                  className="w-6 h-0.5 bg-white absolute"
                  initial={{ y: 0, rotate: 0 }}
                  animate={{
                    rotate: 0,
                    y: isHamburgerActive && !isClosing ? 0 : -4,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1] as const,
                    delay: isHamburgerActive ? 0 : 0.6,
                  }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-white absolute"
                  initial={{ y: 0, rotate: 0 }}
                  animate={{
                    rotate: 0,
                    y: isHamburgerActive && !isClosing ? 0 : 4,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1] as const,
                    delay: isHamburgerActive ? 0 : 0.6,
                  }}
                />
              </motion.button>
            </motion.div>

            {/* CENTER - Logo */}
            <motion.div
              className="flex items-center flex-1 md:flex-none justify-center px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: showLoader ? 0 : 1 }}
              transition={{ delay: showLoader ? 0 : 0.5, duration: 0.5 }}
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

            {/* RIGHT - Desktop Navigation */}
            <motion.div
              className="hidden md:flex items-center space-x-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: showLoader ? 0 : 1 }}
              transition={{ delay: showLoader ? 0 : 0.8, duration: 0.5 }}
            >
              <nav className="flex items-center space-x-10">
                {navigationData.mainNav.slice(1).map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="text-sm font-light text-white/90 tracking-[0.2em] uppercase relative overflow-hidden hover:text-white transition-colors duration-200"
                    onClick={(e) => {
                      if (item.href.startsWith("#")) {
                        e.preventDefault();
                        const sectionId = item.href.substring(1);
                        scrollToElement(sectionId, 80);
                      }
                    }}
                  >
                    <span>{item.title}</span>
                  </a>
                ))}
              </nav>

              {/* Shopping Basket Icon */}
              <button
                className="w-10 h-10 flex items-center justify-center text-white/90 relative group hover:text-white transition-colors duration-200"
                aria-label="Shopping cart"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119.993zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-gray-900 rounded-full text-xs font-medium flex items-center justify-center">
                  0
                </span>
              </button>
            </motion.div>

            {/* RIGHT - Mobile Shopping Cart */}
            <motion.div
              className="flex items-center md:hidden flex-shrink-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: showLoader ? 0 : 1 }}
              transition={{ delay: showLoader ? 0 : 0.8, duration: 0.5 }}
            >
              <button
                className="w-10 h-10 flex items-center justify-center text-white/90 relative group hover:text-white transition-colors duration-200"
                aria-label="Shopping cart"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119.993zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-gray-900 rounded-full text-xs font-medium flex items-center justify-center">
                  0
                </span>
              </button>
            </motion.div>
          </div>
        </Container>
      </header>

      {/* Mobile Menu - unchanged */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.23, 1, 0.32, 1] as const,
            }}
            onClick={closeMenu}
            style={{
              height: "100vh",
              width: "100vw",
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: 40,
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-sheet-full z-50 bg-white md:hidden"
            variants={menuSlideVariants}
            initial="closed"
            animate="open"
            exit="closed"
            style={{
              willChange: "transform",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              WebkitTouchCallout: "none",
            }}
          >
            {/* Close Button - Fixed for better touch interaction */}
            <div className="absolute top-4 right-4 z-50">
              <motion.button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  closeMenu();
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  closeMenu();
                }}
                className="w-12 h-12 flex flex-col justify-center items-center relative p-3 cursor-pointer touch-manipulation"
                aria-label="Close menu"
                whileHover={{ opacity: 0.7, scale: 1.05 }}
                whileTap={{ opacity: 1, scale: 0.95 }}
                initial={{ opacity: 0, rotate: 45, filter: "blur(2px)" }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                  filter: "blur(0px)",
                }}
                transition={{
                  delay: 0.2,
                  duration: 0.5,
                  ease: [0.23, 1, 0.32, 1] as const,
                }}
                style={{
                  WebkitTapHighlightColor: "transparent",
                  WebkitTouchCallout: "none",
                  WebkitUserSelect: "none",
                  userSelect: "none",
                }}
              >
                <motion.span
                  className="w-6 h-0.5 bg-gray-800 absolute rounded-full"
                  animate={{
                    rotate: isMenuOpen && !isClosing ? 45 : 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.23, 1, 0.32, 1] as const,
                  }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-gray-800 absolute rounded-full"
                  animate={{
                    rotate: isMenuOpen && !isClosing ? -45 : 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.23, 1, 0.32, 1] as const,
                  }}
                />
              </motion.button>
            </div>

            <div className="mobile-sheet-content pt-24 px-6 sm:px-8">
              <motion.nav
                className="space-y-0"
                variants={staggerContainer}
                initial="closed"
                animate="open"
              >
                {navigationData.mainNav.map((item, index) => (
                  <div key={item.title}>
                    <motion.a
                      href={item.href}
                      className="block text-xl sm:text-2xl font-light text-gray-900 tracking-wide py-5 sm:py-6 relative overflow-hidden"
                      onClick={(e) => handleMenuItemClick(item.href, e)}
                      variants={menuItemVariants}
                      whileHover={{
                        color: "rgb(75, 85, 99)",
                        transition: { duration: 0.2 },
                      }}
                    >
                      <motion.span>{item.title}</motion.span>
                    </motion.a>
                    {index < navigationData.mainNav.length - 1 && (
                      <motion.div
                        className="w-full h-px bg-gray-100"
                        variants={menuItemVariants}
                        transition={{ delay: 0.1 }}
                      />
                    )}
                  </div>
                ))}
              </motion.nav>

              {/* Social Media Links - Mobile Only */}
              <motion.div
                className="mt-12 pt-8 border-t border-gray-100"
                variants={menuItemVariants}
                initial="closed"
                animate="open"
              >
                <div className="flex items-center justify-center space-x-6">
                  <motion.a
                    href="https://www.tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
                    aria-label="Follow us on TikTok"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.83a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.26z" />
                    </svg>
                  </motion.a>

                  <motion.a
                    href={siteConfig.links.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
                    aria-label="Follow us on Facebook"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </motion.a>

                  <motion.a
                    href={siteConfig.links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
                    aria-label="Follow us on Instagram"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
