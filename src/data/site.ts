export interface SiteConfig {
  readonly name: string;
  readonly description: string;
  readonly url: string;
  readonly ogImage: string;
  readonly links: {
    readonly instagram: string;
    readonly facebook: string;
  };
  readonly contact: {
    readonly phone: string;
    readonly email: string;
    readonly address: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "N1 Nail Shop",
  description: "Premium nail services with luxury and precision",
  url: "https://n1nailshop.com",
  ogImage: "/og-image.jpg",
  links: {
    instagram: "https://instagram.com/n1nailshop",
    facebook: "https://facebook.com/n1nailshop",
  },
  contact: {
    phone: "(403) 454-0488",
    email: "n1nailandbeautybar@gmail.com",
    address: "2833 14 St SW, Calgary, AB T2T 3V3",
  },
} as const;
