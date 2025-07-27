import { siteConfig } from "@/data/site";

export function ContactSection() {
  return (
    <section className="w-full py-20 md:py-32 bg-white" id="contact">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div>
          {/* Section Header */}
          <div className="text-center mb-20 md:mb-28">
            <h2 className="text-4xl md:text-5xl font-extralight tracking-[0.3em] text-gray-900 mb-6">
              Contact
            </h2>
            <div className="h-px w-28 bg-gray-300 mx-auto mb-8 origin-center" />
            <p className="text-sm font-light tracking-[0.3em] uppercase text-gray-500">
              Connect With Us
            </p>
          </div>
        
          {/* Contact Grid */}
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 md:gap-20 mb-20 md:mb-32">
              {[
                {
                  title: "Phone",
                  content: siteConfig.contact.phone,
                  link: `tel:${siteConfig.contact.phone.replace(/[^\d]/g, '')}`
                },
                {
                  title: "Email", 
                  content: siteConfig.contact.email,
                  link: `mailto:${siteConfig.contact.email}`
                },
                {
                  title: "Studio",
                  content: siteConfig.contact.address.replace(", ", "\n"),
                  link: null
                }
              ].map((contact) => (
                <div 
                  key={contact.title}
                  className="text-center group"
                >
                  <div className="mb-8">
                    <h3 className="text-xl font-light tracking-[0.2em] text-gray-900 mb-6 uppercase">
                      {contact.title}
                    </h3>
                    <div className="h-px w-12 bg-gray-300/60 mx-auto mb-6 origin-center" />
                  </div>
                  {contact.link ? (
                    <a 
                      href={contact.link}
                      className="text-base font-light text-gray-600 hover:text-gray-900 tracking-wide inline-block transition-colors duration-300"
                    >
                      {contact.content}
                    </a>
                  ) : (
                    <div className="text-base font-light text-gray-600 tracking-wide leading-relaxed">
                      {contact.content.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < contact.content.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          
            {/* Hours */}
            <div className="text-center py-12 md:py-16 border-t border-b border-gray-100/60">
              <h3 className="text-2xl font-light tracking-[0.2em] text-gray-900 mb-4 uppercase">
                Studio Hours
              </h3>
              <div className="h-px w-16 bg-gray-300/60 mx-auto mb-8 md:mb-12" />
              <div className="max-w-lg mx-auto">
                <div className="space-y-3 md:space-y-4 text-gray-700">
                  {[
                    { day: "Monday", hours: "10:00 AM - 07:00 PM" },
                    { day: "Tuesday", hours: "10:00 AM - 07:00 PM" },
                    { day: "Wednesday", hours: "10:00 AM - 07:00 PM" },
                    { day: "Thursday", hours: "10:00 AM - 07:00 PM" },
                    { day: "Friday", hours: "10:00 AM - 07:00 PM" },
                    { day: "Saturday", hours: "10:00 AM - 06:00 PM" },
                    { day: "Sunday", hours: "10:00 AM - 05:00 PM" }
                  ].map((schedule) => (
                    <div 
                      key={schedule.day}
                      className="flex justify-between items-center py-2 group"
                    >
                      <span className="font-light tracking-wide text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                        {schedule.day}
                      </span>
                      <span className="font-light tracking-wide text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200/40">
                  <p className="text-sm font-light text-gray-500 leading-relaxed tracking-wide">
                    Appointments recommended<br />
                    Walk-ins welcome based on availability
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Google Maps - Full Width */}
      <div className="mt-20 md:mt-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12 mb-12 md:mb-16">
          <div className="text-center">
            <h3 className="text-2xl font-light tracking-[0.2em] text-gray-900 mb-4 uppercase">
              Visit Our Studio
            </h3>
            <div className="h-px w-20 bg-gray-300/60 mx-auto" />
          </div>
        </div>
        <div className="w-full">
          <div className="relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2509.317100934556!2d-114.0949576!3d51.0287638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53716f56220c4e35%3A0xbcaa9eef3c4cb58f!2sN1%20Nail%20Beauty%20Bar!5e0!3m2!1sen!2sca!4v1753573318785!5m2!1sen!2sca"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="N1 Nail Beauty Bar Location"
              className="md:h-[480px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}