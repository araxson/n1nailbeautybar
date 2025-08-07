"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { motion, AnimatePresence } from "framer-motion";
import { navigationData } from "@/data/navigation";
import { scrollToElement } from "@/lib/utils";
import { SlidingTextBar } from "@/components/ui/sliding-text-bar";
import { siteConfig } from "@/data/site";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHamburgerActive, setIsHamburgerActive] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Cleanup function to reset body scroll when component unmounts
  useEffect(() => {
    return () => {
      document.body.classList.remove("body-scroll-locked");
    };
  }, []);

  const toggleMenu = () => {
    if (!isMenuOpen) {
      // Opening: hamburger collapses to single line → then sheet opens
      setIsHamburgerActive(true); // Collapse to single line
      // Prevent body scroll when menu opens
      document.body.classList.add("body-scroll-locked");
      setTimeout(() => {
        setIsMenuOpen(true); // Open menu sheet
      }, 300); // Wait for collapse animation to complete
    } else {
      // Closing: X animates to line → sheet closes smoothly
      setIsClosing(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        // Re-enable body scroll when menu closes
        document.body.classList.remove("body-scroll-locked");
      }, 300); // Professional closing timing
      setTimeout(() => {
        setIsHamburgerActive(false);
        setIsClosing(false);
      }, 900); // Allow full animation to complete
    }
  };

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      // Re-enable body scroll when menu closes
      document.body.classList.remove("body-scroll-locked");
    }, 300); // Consistent with toggleMenu
    setTimeout(() => {
      setIsHamburgerActive(false);
      setIsClosing(false);
    }, 900); // Allow full animation to complete
  };

  const handleMenuItemClick = (href: string, event: React.MouseEvent) => {
    event.preventDefault();

    // If it's a section link (starts with #), handle smooth scrolling
    if (href.startsWith("#")) {
      const sectionId = href.substring(1);

      // Close the menu first
      setIsClosing(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        // Re-enable body scroll when menu closes
        document.body.classList.remove("body-scroll-locked");
      }, 300);

      // Scroll to section after menu starts closing
      setTimeout(() => {
        scrollToElement(sectionId, 80); // 80px offset for header
      }, 400);

      // Complete the hamburger animation
      setTimeout(() => {
        setIsHamburgerActive(false);
        setIsClosing(false);
      }, 900);
    } else {
      // For other links, just close menu and navigate
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
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
    open: {
      x: "0%",
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  const menuItemVariants = {
    closed: {
      opacity: 0,
      x: -20,
      y: 0,
    },
    open: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  const staggerContainer = {
    open: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
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
      {/* Sliding Text Bar */}
      <div className="absolute top-0 z-50 w-full overflow-hidden">
        <SlidingTextBar
          text="PREMIUM NAIL SERVICES • LUXURY EXPERIENCE • BOOK YOUR APPOINTMENT TODAY"
          speed={25}
        />
      </div>

      <header className="absolute top-8 z-50 w-full bg-transparent px-4 md:px-0">
        <Container>
          <div className="flex items-center justify-center md:justify-center h-20 relative">
            {/* LEFT - Hamburger Menu (Mobile) */}
            <div className="absolute left-0 flex items-center md:hidden flex-shrink-0 -ml-4">
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
                    delay: isHamburgerActive ? 0 : 0.6, // No delay when collapsing on click
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
                    delay: isHamburgerActive ? 0 : 0.6, // No delay when collapsing on click
                  }}
                />
              </motion.button>
            </div>

            {/* Logo space - filled by loading animation logo */}
            <div className="flex items-center justify-center md:justify-start md:absolute md:left-0">
              {/* Logo will be positioned here by loading animation */}
            </div>

            {/* CENTER/RIGHT - Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
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
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94] as const,
            }}
            onClick={closeMenu}
            style={{
              height: "100vh",
              width: "100vw",
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: 9999,
            }}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-sheet-full z-[10000] bg-white md:hidden"
            variants={menuSlideVariants}
            initial="closed"
            animate="open"
            exit="closed"
            style={{
              willChange: "transform",
              backfaceVisibility: "hidden",
              transform: "translateZ(0)",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
            }}
          >
            {/* Close Button - Fixed for better touch interaction */}
            <div className="absolute top-6 right-6 z-50">
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
                className="mt-12 pt-8"
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
