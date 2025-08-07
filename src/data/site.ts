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
  name: "N1 Nail Beauty Bar - Calgary's Premier Nail Salon",
  description:
    "Experience luxury nail services in Calgary. Professional manicures, pedicures, nail art & spa treatments at N1 Nail Beauty Bar on 14 St SW. Book your appointment today!",
  url: "https://n1nail.ca",
  ogImage: "/og-image.jpg",
  links: {
    instagram: "http://instagram.com/n1nailbeautybar/",
    facebook: "https://www.facebook.com/n1nailbeautybar",
  },
  contact: {
    phone: "(403) 454-0488",
    email: "n1nailandbeautybar@gmail.com",
    address: "2833 14 St SW, Calgary, AB T2T 3V3",
  },
} as const;
