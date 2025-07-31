import Link from "next/link";
import { navigationData } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white" role="contentinfo">
      {/* Main Footer Content */}
      <div className="py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="sm:col-span-2 md:col-span-1">
              <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 text-white">{siteConfig.name}</h3>
              <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4 leading-relaxed">{siteConfig.description}</p>
              <div className="flex space-x-6">
                <Link
                  href={siteConfig.links.instagram}
                  className="text-sm text-gray-300 hover:text-white transition-colors duration-300"
                  aria-label="Follow us on Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </Link>
                <Link
                  href={siteConfig.links.facebook}
                  className="text-sm text-gray-300 hover:text-white transition-colors duration-300"
                  aria-label="Follow us on Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 text-white">Quick Links</h3>
              <nav role="navigation" aria-label="Footer navigation">
                <ul className="space-y-3">
                  {navigationData.mainNav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-300 hover:text-white transition-colors duration-300"
                        title={item.description}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 text-white">Contact</h3>
              <address className="space-y-3 text-gray-300 not-italic">
                <div>
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="text-sm hover:text-white transition-colors duration-300"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>
                <div>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-sm hover:text-white transition-colors duration-300"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
                <div className="text-sm leading-relaxed">
                  {siteConfig.contact.address}
                </div>
              </address>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Copyright Row */}
      <div className="border-t border-gray-800 py-6">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} {siteConfig.name}. All rights reserved.
            </div>
            <nav
              className="flex flex-wrap justify-center gap-4 sm:gap-6"
              role="navigation"
              aria-label="Legal navigation"
            >
              {navigationData.footerNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </Container>
      </div>
    </footer>
  );
}
