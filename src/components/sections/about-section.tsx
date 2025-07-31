export function AboutSection() {
  return (
    <section className="w-full py-24 md:py-40 bg-neutral-50/20" id="about">
      <div className="max-w-5xl mx-auto px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-24 md:mb-40">
            <h2 className="text-3xl md:text-4xl font-thin tracking-[0.4em] text-neutral-800 mb-8 md:mb-12">
              ABOUT
            </h2>
            <div className="h-[0.5px] w-20 bg-neutral-300 mx-auto mb-8" />
            <p className="text-xs font-light tracking-[0.4em] uppercase text-neutral-500">
              Our Philosophy
            </p>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
            {/* Text Content */}
            <div className="space-y-16">
              <div>
                <h3 className="text-lg md:text-xl font-thin tracking-[0.3em] text-neutral-800 mb-8 uppercase">
                  Refined Excellence
                </h3>
                <div className="space-y-6">
                  <p className="text-base font-light text-neutral-600 leading-relaxed tracking-[0.01em]">
                    At N1 Nail Beauty Bar, Calgary&apos;s premier nail
                    destination, we believe that nail care transcends mere
                    beauty—it&apos;s an art form that demands precision,
                    creativity, and an unwavering commitment to excellence.
                  </p>
                  <p className="text-base font-light text-neutral-600 leading-relaxed tracking-[0.01em]">
                    Located in the heart of Calgary on 14 St SW, our
                    minimalistic environment provides the perfect backdrop for
                    transformative experiences, where skilled artisans craft
                    bespoke nail designs with meticulous attention to detail.
                  </p>
                </div>
              </div>

              {/* Values */}
              <div className="space-y-8">
                {[
                  {
                    title: "Artisanal Craftsmanship",
                    desc: "Master techniques perfected through years of dedication",
                  },
                  {
                    title: "Premium Materials",
                    desc: "Only the finest quality products and tools",
                  },
                  {
                    title: "Personalized Service",
                    desc: "Each experience tailored to your unique style",
                  },
                ].map((value) => (
                  <div key={value.title} className="group">
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="w-1 h-1 bg-neutral-400 group-hover:bg-neutral-600 transition-all duration-500 rounded-full" />
                      <h4 className="text-sm font-light tracking-[0.15em] text-neutral-700 group-hover:text-neutral-900 uppercase transition-colors duration-500">
                        {value.title}
                      </h4>
                    </div>
                    <p className="text-sm font-light text-neutral-500 leading-relaxed ml-5">
                      {value.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote */}
            <div className="relative md:mt-8">
              <div className="relative">
                <div className="absolute -top-4 -left-4 text-6xl md:text-7xl font-thin text-neutral-200 leading-none select-none">
                  &ldquo;
                </div>
                <div className="relative z-10 pt-8">
                  <blockquote className="text-lg md:text-xl font-light text-neutral-700 leading-relaxed mb-8 italic tracking-[0.01em]">
                    Every detail matters. Every stroke is intentional. Every
                    client leaves feeling transformed.
                  </blockquote>
                  <div className="flex items-center space-x-4">
                    <div className="h-[0.5px] w-12 bg-neutral-300" />
                    <cite className="text-xs font-light tracking-[0.2em] text-neutral-500 uppercase not-italic">
                      N1 Philosophy
                    </cite>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
