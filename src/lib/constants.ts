/**
 * Application constants
 */

// Animation durations
export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
  verySlow: 700,
} as const;

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

// Gallery categories
export const GALLERY_CATEGORIES = {
  ALL: "all",
  MANICURES: "manicures",
  PEDICURES: "pedicures",
  NAIL_ART: "nail-art",
} as const;

// Service categories
export const SERVICE_CATEGORIES = {
  MANICURES: "manicures",
  PEDICURES: "pedicures",
  NAIL_ART: "nail-art",
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  GALLERY_CATEGORY: "n1-gallery-category",
  USER_PREFERENCES: "n1-user-preferences",
} as const;

// SEO constants
export const SEO = {
  DEFAULT_TITLE: "N1 Nail Beauty Bar",
  DEFAULT_DESCRIPTION: "Premium nail services with luxury and precision",
  SITE_URL: "https://n1nail.ca",
  OG_IMAGE: "/og-image.jpg",
} as const;

// Contact information
export const CONTACT = {
  PHONE: "+1 (555) 123-4567",
  EMAIL: "n1nailandbeautybar@gmail.com",
  ADDRESS: "123 Luxury Lane, Beverly Hills, CA 90210",
} as const;

// Social media links
export const SOCIAL_LINKS = {
  INSTAGRAM: "http://instagram.com/n1nailbeautybar/",
  FACEBOOK: "https://www.facebook.com/n1nailbeautybar",
} as const;

// Performance constants
export const PERFORMANCE = {
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 100,
  LAZY_LOAD_OFFSET: 100,
} as const;
