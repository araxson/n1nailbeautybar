import { SectionHeader } from "@/components/ui/typography";
import { Container, Section } from "@/components/ui/container";
import { AppButton } from "@/components/ui/app-button";
import { servicesData } from "@/data/services";
import { siteConfig } from "@/data/site";

export default function ServicesPage() {
  return (
    <div>
      {/* Header */}
      <Section padding="xl" background="default">
        <Container>
          <div className="text-center mb-12">
            <SectionHeader
              title="Our Services"
              description="Discover our comprehensive range of premium nail services. Each treatment is designed to enhance your natural beauty and provide a luxurious experience."
            />
          </div>
        </Container>
      </Section>

      {/* Services by Category */}
      <div>
        {servicesData.map((category, index) => (
          <Section
            key={category.id}
            padding="xl"
            background={index % 2 === 0 ? "default" : "muted"}
            border
          >
            <Container>
              <div className="text-center mb-12">
                <SectionHeader
                  title={category.title}
                  description={category.description}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.services.map((service) => (
                  <div key={service.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4 flex-1">{service.description}</p>
                    <div className="flex justify-between items-center mt-auto">
                      <div className="text-sm font-medium text-black">
                        From ${service.price}
                      </div>
                      <div className="text-xs text-gray-500">
                        {service.duration}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </Section>
        ))}

        {/* CTA Section */}
        <Section padding="xl" background="muted" border>
          <Container>
            <div className="text-center mb-12">
              <SectionHeader
                title="Ready to Book?"
                description="Contact us to schedule your appointment and experience the luxury of N1 Nail Beauty Bar"
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold mb-4">Call Now</h3>
                <p className="text-gray-600 mb-6">
                  Speak directly with our team to schedule your appointment
                </p>
                <AppButton variant="outline" asChild>
                  <a href={`tel:${siteConfig.contact.phone}`}>
                    {siteConfig.contact.phone}
                  </a>
                </AppButton>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold mb-4">Email Us</h3>
                <p className="text-gray-600 mb-6">
                  Send us a message and we&apos;ll get back to you within 24 hours
                </p>
                <AppButton variant="primary" asChild>
                  <a href={`mailto:${siteConfig.contact.email}`}>
                    Send Email
                  </a>
                </AppButton>
              </div>
            </div>
          </Container>
        </Section>
      </div>
    </div>
  );
}