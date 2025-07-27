export interface NavigationItem {
  readonly title: string;
  readonly href: string;
  readonly description?: string;
}

export interface NavigationData {
  readonly mainNav: readonly NavigationItem[];
  readonly footerNav: readonly NavigationItem[];
}

export const navigationData: NavigationData = {
  mainNav: [
    {
      title: "Home",
      href: "/",
      description: "Welcome to N1 Nail Shop",
    },
    {
      title: "Services",
      href: "#services",
      description: "Our premium nail services",
    },
    {
      title: "Gallery",
      href: "#gallery",
      description: "View our work portfolio",
    },
    {
      title: "About",
      href: "#about",
      description: "Learn about our story",
    },
  ],
  footerNav: [
    {
      title: "Privacy Policy",
      href: "/privacy",
    },
    {
      title: "Terms of Service",
      href: "/terms",
    },
  ],
} as const;
