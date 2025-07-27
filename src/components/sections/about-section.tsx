export function AboutSection() {
  return (
    <section className="w-full py-20 md:py-32 bg-gray-50/30" id="about">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20 md:mb-28">
            <h2 className="text-4xl md:text-5xl font-extralight tracking-[0.3em] text-gray-900 mb-6">
              About
            </h2>
            <div className="h-px w-28 bg-gray-300 mx-auto mb-8 origin-center" />
            <p className="text-sm font-light tracking-[0.3em] uppercase text-gray-500">
              Our Philosophy
            </p>
          </div>
          
          {/* Content */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Text Content */}
            <div className="space-y-12">
              <div>
                <h3 className="text-xl sm:text-2xl font-light tracking-[0.15em] sm:tracking-[0.2em] text-gray-900 mb-6 sm:mb-8 uppercase">
                  Refined Excellence
                </h3>
                <p className="text-base sm:text-lg font-light text-gray-600 leading-relaxed mb-6 sm:mb-8 tracking-wide">
                  At N1 Nail Beauty Bar, we believe that nail care transcends mere beauty—it&apos;s an art form 
                  that demands precision, creativity, and an unwavering commitment to excellence.
                </p>
                <p className="text-base sm:text-lg font-light text-gray-600 leading-relaxed tracking-wide">
                  Our minimalistic environment provides the perfect backdrop for transformative 
                  experiences, where skilled artisans craft bespoke nail designs with meticulous 
                  attention to detail.
                </p>
              </div>
              
              {/* Values */}
              <div className="space-y-6">
                {['Artisanal Craftsmanship', 'Premium Materials', 'Personalized Service'].map((value) => (
                  <div 
                    key={value}
                    className="flex items-center space-x-6 group"
                  >
                    <div className="w-3 h-3 bg-gray-300 group-hover:bg-gray-500 transition-all duration-300" />
                    <span className="text-sm font-light tracking-[0.2em] text-gray-500 group-hover:text-gray-700 uppercase transition-colors duration-300">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Quote */}
            <div className="relative">
              <div className="p-8 sm:p-12 md:p-16 border border-gray-100/80 hover:border-gray-200/80 transition-all duration-300">
                <div className="text-5xl sm:text-6xl md:text-7xl font-light text-gray-200/60 mb-4 sm:mb-6 leading-none">
                  &ldquo;
                </div>
                <blockquote className="text-lg sm:text-xl font-light text-gray-700 leading-relaxed mb-6 sm:mb-8 italic tracking-wide">
                  Every detail matters. Every stroke is intentional. 
                  Every client leaves feeling transformed.
                </blockquote>
                <div className="h-px w-20 bg-gray-300/60 mb-4 sm:mb-6 origin-left" />
                <cite className="text-xs sm:text-sm font-light tracking-[0.15em] sm:tracking-[0.2em] text-gray-500 uppercase not-italic">
                  N1 Beauty Bar Philosophy
                </cite>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}