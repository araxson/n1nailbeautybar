import Link from "next/link";
import { SectionHeader } from "@/components/ui/typography";
import { Container, Section } from "@/components/ui/container";
import { AppButton } from "@/components/ui/app-button";
import { galleryData } from "@/data/gallery";

export default function GalleryPage() {
  return (
    <div>
      {/* Header */}
      <Section padding="xl" background="default">
        <Container>
          <div className="text-center mb-12">
            <SectionHeader
              title="Our Gallery"
              description="Browse through our collection of stunning nail designs and transformations. Each piece showcases our commitment to artistry and precision."
            />
          </div>
        </Container>
      </Section>

      {/* Gallery Grid */}
      <Section padding="xl" background="muted" border>
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryData.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="aspect-square bg-gray-100 rounded-md mb-4 flex items-center justify-center">
                  <div className="text-gray-500 text-sm font-medium">
                    {item.category}
                  </div>
                </div>
                <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section padding="xl" background="default">
        <Container>
          <div className="text-center">
            <SectionHeader
              title="Inspired?"
              description="Ready to create your own stunning nail design? Book an appointment and let our artists bring your vision to life."
            />
            <div className="mt-8">
              <AppButton variant="primary" size="lg" className="px-8 py-4" asChild>
                <Link href="/#contact">Book Appointment</Link>
              </AppButton>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}