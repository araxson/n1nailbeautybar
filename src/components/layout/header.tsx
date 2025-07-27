"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { motion, AnimatePresence } from "framer-motion";
import { navigationData } from "@/data/navigation";
import { scrollToElement } from "@/lib/utils";
import { SlidingTextBar } from "@/components/ui/sliding-text-bar";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHamburgerActive, setIsHamburgerActive] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const toggleMenu = () => {
    if (!isMenuOpen) {
      // Opening: hamburger collapses to single line → then sheet opens
      setIsHamburgerActive(true); // Collapse to single line
      setTimeout(() => {
        setIsMenuOpen(true); // Open menu sheet
      }, 300); // Wait for collapse animation to complete
    } else {
      // Closing: X animates to line → sheet closes smoothly
      setIsClosing(true);
      setTimeout(() => {
        setIsMenuOpen(false);
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
    }, 300); // Consistent with toggleMenu
    setTimeout(() => {
      setIsHamburgerActive(false);
      setIsClosing(false);
    }, 900); // Allow full animation to complete
  };

  const handleMenuItemClick = (href: string, event: React.MouseEvent) => {
    event.preventDefault();
    
    // If it's a section link (starts with #), handle smooth scrolling
    if (href.startsWith('#')) {
      const sectionId = href.substring(1);
      
      // Close the menu first
      setIsClosing(true);
      setTimeout(() => {
        setIsMenuOpen(false);
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
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    },
    open: {
      x: "0%",
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1] as const
      }
    }
  };

  const menuItemVariants = {
    closed: { 
      opacity: 0, 
      x: -20,
      y: 20,
      filter: "blur(1px)"
    },
    open: { 
      opacity: 1, 
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1] as const
      }
    }
  };

  const staggerContainer = {
    open: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    },
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  return (
    <>
      {/* Sliding Text Bar */}
      <motion.div 
        className="absolute top-0 z-50 w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <SlidingTextBar 
          text="PREMIUM NAIL SERVICES • LUXURY EXPERIENCE • BOOK YOUR APPOINTMENT TODAY"
          speed={25}
        />
      </motion.div>

      <header 
        className="absolute top-8 z-50 w-full bg-transparent"
      >
        <Container>
          <div className="flex items-center justify-between h-20">
            {/* LEFT - Hamburger Menu */}
            <div 
              className="flex items-center md:hidden"
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
                    y: isHamburgerActive && !isClosing ? 0 : -4
                  }}
                  transition={{ 
                    duration: 0.3, 
                    ease: [0.22, 1, 0.36, 1] as const,
                    delay: isHamburgerActive ? 0 : 0.6 // No delay when collapsing on click
                  }}
                />
                <motion.span 
                  className="w-6 h-0.5 bg-white absolute"
                  initial={{ y: 0, rotate: 0 }}
                  animate={{
                    rotate: 0,
                    y: isHamburgerActive && !isClosing ? 0 : 4
                  }}
                  transition={{ 
                    duration: 0.3, 
                    ease: [0.22, 1, 0.36, 1] as const,
                    delay: isHamburgerActive ? 0 : 0.6 // No delay when collapsing on click
                  }}
                />
              </motion.button>
            </div>

            {/* CENTER - Logo */}
            <div 
              className="flex items-center flex-1 md:flex-none justify-center"
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
                  className="h-10 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* RIGHT - Desktop Navigation */}
            <div 
              className="hidden md:flex items-center space-x-6"
            >
              <nav className="flex items-center space-x-10">
                {navigationData.mainNav.slice(1).map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="text-sm font-light text-white/90 tracking-[0.2em] uppercase relative overflow-hidden hover:text-white transition-colors duration-200"
                    onClick={(e) => {
                      if (item.href.startsWith('#')) {
                        e.preventDefault();
                        const sectionId = item.href.substring(1);
                        scrollToElement(sectionId, 80);
                      }
                    }}
                  >
                    <span>
                      {item.title}
                    </span>
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
                
                {/* Cart count badge */}
                <span 
                  className="absolute -top-1 -right-1 w-4 h-4 bg-white text-gray-900 rounded-full text-xs font-medium flex items-center justify-center"
                >
                  0
                </span>
              </button>
            </div>

            {/* RIGHT - Mobile Shopping Cart */}
            <div 
              className="flex items-center md:hidden"
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
                
                {/* Cart count badge */}
                <span 
                  className="absolute -top-1 -right-1 w-4 h-4 bg-white text-gray-900 rounded-full text-xs font-medium flex items-center justify-center"
                >
                  0
                </span>
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-40 bg-black md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.23, 1, 0.32, 1] as const 
            }}
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed top-0 left-0 z-50 h-full w-full bg-white md:hidden"
            variants={menuSlideVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Close Button */}
            <div className="absolute top-6 right-6">
              <motion.button 
                onClick={closeMenu}
                className="w-10 h-10 flex flex-col justify-center items-center relative p-2"
                aria-label="Close menu"
                whileHover={{ opacity: 0.8 }}
                whileTap={{ opacity: 1 }}
                initial={{ opacity: 0, rotate: 45, filter: "blur(2px)" }}
                animate={{ 
                  opacity: 1, 
                  rotate: 0, 
                  filter: "blur(0px)"
                }}
                transition={{ 
                  delay: 0.2, 
                  duration: 0.5,
                  ease: [0.23, 1, 0.32, 1] as const
                }}
              >
                <motion.span 
                  className="w-6 h-0.5 bg-gray-800 absolute"
                  animate={{
                    rotate: isMenuOpen && !isClosing ? 45 : 0
                  }}
                  transition={{ 
                    duration: 0.3, 
                    ease: [0.23, 1, 0.32, 1] as const 
                  }}
                />
                <motion.span 
                  className="w-6 h-0.5 bg-gray-800 absolute"
                  animate={{
                    rotate: isMenuOpen && !isClosing ? -45 : 0
                  }}
                  transition={{ 
                    duration: 0.3, 
                    ease: [0.23, 1, 0.32, 1] as const 
                  }}
                />
              </motion.button>
            </div>

            <div className="pt-28 px-8">
              <motion.nav 
                className="space-y-0"
                variants={staggerContainer}
                initial="closed"
                animate="open"
              >
                {navigationData.mainNav.slice(1).map((item, index) => (
                  <div key={item.title}>
                    <motion.a 
                      href={item.href}
                      className="block text-2xl font-light text-gray-900 tracking-wide py-6 relative overflow-hidden"
                      onClick={(e) => handleMenuItemClick(item.href, e)}
                      variants={menuItemVariants}
                      whileHover={{ 
                        color: "rgb(75, 85, 99)",
                        transition: { duration: 0.2 }
                      }}
                    >
                      <motion.span>
                        {item.title}
                      </motion.span>
                    </motion.a>
                    {index < navigationData.mainNav.slice(1).length - 1 && (
                      <motion.div 
                        className="w-full h-px bg-gray-100"
                        variants={menuItemVariants}
                        transition={{ delay: 0.1 }}
                      />
                    )}
                  </div>
                ))}
              </motion.nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}