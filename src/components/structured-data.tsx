import { siteConfig } from "@/data/site";

export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NailSalon",
    name: "N1 Nail Beauty Bar",
    image: [
      `${siteConfig.url}/n1-logo.png`,
      `${siteConfig.url}/hero-desktop-1.webp`,
      `${siteConfig.url}/hero-desktop-2.webp`,
      `${siteConfig.url}/hero-desktop-3.webp`,
    ],
    "@id": siteConfig.url,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "2833 14 St SW",
      addressLocality: "Calgary",
      addressRegion: "AB",
      postalCode: "T2T 3V3",
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.028,
      longitude: -114.0952,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "11:00",
        closes: "17:00",
      },
    ],
    sameAs: [siteConfig.links.instagram, siteConfig.links.facebook],
    priceRange: "$$",
    servesCuisine: "Nail Services",
    acceptsReservations: true,
    areaServed: {
      "@type": "City",
      name: "Calgary",
      "@id": "https://en.wikipedia.org/wiki/Calgary",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Nail Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Classic Manicure",
            description:
              "Professional nail shaping, cuticle care, and polish application",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Gel Manicure",
            description: "Long-lasting gel polish with UV curing",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Classic Pedicure",
            description: "Relaxing foot care with nail trimming and polish",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Nail Art",
            description: "Custom nail designs and artistic applications",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
