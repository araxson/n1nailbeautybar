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
      title: "HOME",
      href: "#hero",
      description: "Welcome to N1 Nail Beauty Bar",
    },
    {
      title: "SERVICES",
      href: "#services",
      description: "Our premium nail services",
    },
    {
      title: "ABOUT",
      href: "#about",
      description: "Learn about our story",
    },
    {
      title: "CONTACT",
      href: "#contact",
      description: "Get in touch with us",
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
