import Link from "next/link";
import { navigationData } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { Container, Section } from "@/components/ui/container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200" role="contentinfo">
      {/* Main Footer Content */}
      <Section padding="xl" background="default">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{siteConfig.name}</h3>
              <p className="text-gray-600 mb-4">{siteConfig.description}</p>
              <div className="flex space-x-4">
                <Link
                  href={siteConfig.links.instagram}
                  className="text-sm text-gray-600 hover:text-black transition-colors duration-200"
                  aria-label="Follow us on Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </Link>
                <Link
                  href={siteConfig.links.facebook}
                  className="text-sm text-gray-600 hover:text-black transition-colors duration-200"
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
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <nav role="navigation" aria-label="Footer navigation">
                <ul className="space-y-3">
                  {navigationData.mainNav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-600 hover:text-black transition-colors duration-200"
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
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <address className="space-y-3 text-gray-600 not-italic">
                <div>
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="text-sm hover:text-black transition-colors duration-200"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>
                <div>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-sm hover:text-black transition-colors duration-200"
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
      </Section>

      {/* Bottom Copyright Row */}
      <Section padding="md" background="muted">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600">
              © {currentYear} {siteConfig.name}. All rights reserved.
            </div>
            <nav
              className="flex space-x-6"
              role="navigation"
              aria-label="Legal navigation"
            >
              {navigationData.footerNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-gray-600 hover:text-black transition-colors duration-200"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </Container>
      </Section>
    </footer>
  );
}
