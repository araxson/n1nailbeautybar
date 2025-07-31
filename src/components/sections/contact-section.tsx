import { siteConfig } from "@/data/site";

export function ContactSection() {
  return (
    <section className="w-full py-24 md:py-40 bg-white" id="contact">
      <div className="max-w-5xl mx-auto px-6 md:px-16">
        <div>
          {/* Section Header */}
          <div className="text-center mb-24 md:mb-40">
            <h2 className="text-3xl md:text-4xl font-thin tracking-[0.4em] text-neutral-800 mb-8 md:mb-12">
              CONTACT
            </h2>
            <div className="h-[0.5px] w-20 bg-neutral-300 mx-auto mb-8" />
            <p className="text-xs font-light tracking-[0.4em] uppercase text-neutral-500">
              Connect With Us
            </p>
          </div>

          {/* Contact Grid */}
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-3 gap-16 md:gap-20 mb-24 md:mb-40">
              {[
                {
                  title: "Phone",
                  content: siteConfig.contact.phone,
                  link: `tel:${siteConfig.contact.phone.replace(/[^\d]/g, "")}`,
                },
                {
                  title: "Email",
                  content: siteConfig.contact.email,
                  link: `mailto:${siteConfig.contact.email}`,
                },
                {
                  title: "Studio",
                  content: siteConfig.contact.address.replace(", ", "\n"),
                  link: null,
                },
              ].map((contact) => (
                <div key={contact.title} className="text-center group">
                  <div className="mb-10">
                    <h3 className="text-sm font-light tracking-[0.3em] text-neutral-800 mb-6 uppercase">
                      {contact.title}
                    </h3>
                    <div className="h-[0.5px] w-8 bg-neutral-300 mx-auto" />
                  </div>
                  {contact.link ? (
                    <a
                      href={contact.link}
                      className="text-base font-light text-neutral-600 hover:text-neutral-900 tracking-[0.01em] inline-block transition-colors duration-500"
                    >
                      {contact.content}
                    </a>
                  ) : (
                    <div className="text-base font-light text-neutral-600 tracking-[0.01em] leading-relaxed">
                      {contact.content.split("\n").map((line, i) => (
                        <span key={`${contact.title}-${line.substring(0, 10)}`}>
                          {line}
                          {i < contact.content.split("\n").length - 1 && <br />}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Hours */}
            <div className="text-center py-16 md:py-20 border-t border-neutral-100/50">
              <h3 className="text-lg md:text-xl font-thin tracking-[0.3em] text-neutral-800 mb-6 uppercase">
                Studio Hours
              </h3>
              <div className="h-[0.5px] w-12 bg-neutral-300 mx-auto mb-12 md:mb-16" />
              <div className="max-w-md mx-auto">
                <div className="space-y-4 md:space-y-6">
                  {[
                    { day: "Monday", hours: "10:00 AM - 07:00 PM" },
                    { day: "Tuesday", hours: "10:00 AM - 07:00 PM" },
                    { day: "Wednesday", hours: "10:00 AM - 07:00 PM" },
                    { day: "Thursday", hours: "10:00 AM - 07:00 PM" },
                    { day: "Friday", hours: "10:00 AM - 07:00 PM" },
                    { day: "Saturday", hours: "10:00 AM - 06:00 PM" },
                    { day: "Sunday", hours: "10:00 AM - 05:00 PM" },
                  ].map((schedule) => (
                    <div
                      key={schedule.day}
                      className="flex justify-between items-center py-1 group"
                    >
                      <span className="font-light tracking-[0.05em] text-neutral-600 group-hover:text-neutral-900 transition-colors duration-500 text-sm">
                        {schedule.day}
                      </span>
                      <span className="font-light tracking-[0.05em] text-neutral-700 group-hover:text-neutral-900 transition-colors duration-500 text-sm">
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-12 pt-8 border-t border-neutral-100/40">
                  <p className="text-xs font-light text-neutral-500 leading-relaxed tracking-[0.05em]">
                    Appointments recommended
                    <br />
                    Walk-ins welcome based on availability
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Maps - Full Width */}
      <div className="mt-24 md:mt-40">
        <div className="max-w-5xl mx-auto px-6 md:px-16 mb-16 md:mb-20">
          <div className="text-center">
            <h3 className="text-lg md:text-xl font-thin tracking-[0.3em] text-neutral-800 mb-6 uppercase">
              Visit Our Calgary Studio
            </h3>
            <div className="h-[0.5px] w-16 bg-neutral-300 mx-auto" />
          </div>
        </div>
        <div className="w-full">
          <div className="relative overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2509.317100934556!2d-114.0949576!3d51.0287638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53716f56220c4e35%3A0xbcaa9eef3c4cb58f!2sN1%20Nail%20Beauty%20Bar!5e0!3m2!1sen!2sca!4v1753573318785!5m2!1sen!2sca"
              width="100%"
              height="400"
              style={{ border: 0, filter: "grayscale(20%)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="N1 Nail Beauty Bar Location"
              className="md:h-[500px] transition-all duration-500 hover:filter-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
