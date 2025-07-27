import Link from "next/link";
import { aboutData } from "@/data/about";
import { SectionHeader } from "@/components/ui/typography";
import { Container, Section } from "@/components/ui/container";
import { AppButton } from "@/components/ui/app-button";

export default function AboutPage() {
  return (
    <div>
      {/* Header */}
      <Section padding="xl" background="default">
        <Container>
          <div className="text-center mb-12">
            <SectionHeader
              title="About Us"
              description="Learn about our journey, mission, and the passionate team behind N1 Nail Beauty Bar"
            />
          </div>
        </Container>
      </Section>

      {/* Story Section */}
      <Section padding="xl" background="muted" border>
        <Container>
          <div className="text-center mb-12">
            <SectionHeader
              title={aboutData.story.title}
              description="Our journey to excellence"
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-4">Our Beginning</h3>
              <p className="text-gray-600">{aboutData.story.content}</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="text-4xl text-gray-400">🏛️</div>
                <div className="text-sm text-gray-500 tracking-wider uppercase">Studio Story</div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Mission Section */}
      <Section padding="xl" background="default" border>
        <Container>
          <div className="text-center mb-12">
            <SectionHeader
              title={aboutData.mission.title}
              description="What drives us every day"
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="text-4xl text-gray-400">🎯</div>
                <div className="text-sm text-gray-500 tracking-wider uppercase">Our Mission</div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-4">Our Purpose</h3>
              <p className="text-gray-600">{aboutData.mission.content}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Values Section */}
      <Section padding="xl" background="muted" border>
        <Container>
          <div className="text-center mb-12">
            <SectionHeader 
              title={aboutData.values.title}
              description="The principles that guide everything we do"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutData.values.items.map((value) => (
              <div key={value.title} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                <div className="w-12 h-12 bg-gray-100 mx-auto flex items-center justify-center border border-gray-200 rounded-lg mb-4">
                  <span className="text-lg">{value.icon}</span>
                </div>
                <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Team Section */}
      <Section padding="xl" background="default" border>
        <Container>
          <div className="text-center mb-12">
            <SectionHeader 
              title={aboutData.team.title}
              description="Meet the talented professionals behind our success"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aboutData.team.members.map((member) => (
              <div key={member.name} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                <div className="aspect-square bg-gray-50 flex items-center justify-center border border-gray-200 rounded-lg mb-4">
                  <div className="text-center space-y-2">
                    <div className="text-3xl text-gray-400">👩‍🎨</div>
                    <div className="text-xs text-gray-500">{member.name}</div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{member.name}</h3>
                <div className="text-sm text-gray-500 font-medium mb-3">{member.role}</div>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section padding="xl" background="muted">
        <Container>
          <div className="text-center">
            <SectionHeader
              title="Ready to Experience Luxury?"
              description="Book your appointment today and let our expert team create the perfect look for you"
            />
            <div className="mt-8">
              <AppButton variant="primary" size="lg" className="px-8 py-4" asChild>
                <Link href="/#contact">Book Now</Link>
              </AppButton>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}