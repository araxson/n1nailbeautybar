"use client";

import { useState } from "react";
import { testimonialsData, testimonialStats, type Testimonial } from "@/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white p-6 sm:p-8 border border-neutral-100 transition-all duration-300 hover:border-neutral-200 group">
      {/* Rating Stars */}
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-4 h-4 ${index < testimonial.rating ? 'text-yellow-400' : 'text-neutral-200'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Review Text */}
      <blockquote className="text-sm sm:text-base font-light text-neutral-700 leading-relaxed mb-6 italic">
        &ldquo;{testimonial.review}&rdquo;
      </blockquote>

      {/* Client Info */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-light text-neutral-800 tracking-[0.01em]">
              {testimonial.name}
            </h4>
            {testimonial.verified && (
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <p className="text-xs font-light text-neutral-500 tracking-[0.02em]">
            {testimonial.service}
          </p>
          {testimonial.location && (
            <p className="text-xs font-light text-neutral-400 tracking-[0.02em]">
              {testimonial.location}
            </p>
          )}
        </div>
        <div className="text-right">
          <p className="text-xs font-light text-neutral-400">
            {new Date(testimonial.date).toLocaleDateString('en-US', { 
              month: 'short', 
              year: 'numeric' 
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

interface StatsDisplayProps {
  stats: typeof testimonialStats;
}

function StatsDisplay({ stats }: StatsDisplayProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
      <div className="text-center">
        <div className="text-2xl sm:text-3xl font-thin text-neutral-800 mb-2">
          {stats.totalReviews}+
        </div>
        <p className="text-xs font-light tracking-[0.2em] uppercase text-neutral-500">
          Reviews
        </p>
      </div>
      <div className="text-center">
        <div className="text-2xl sm:text-3xl font-thin text-neutral-800 mb-2">
          {stats.averageRating}
        </div>
        <p className="text-xs font-light tracking-[0.2em] uppercase text-neutral-500">
          Average Rating
        </p>
      </div>
      <div className="text-center">
        <div className="text-2xl sm:text-3xl font-thin text-neutral-800 mb-2">
          {stats.fiveStarPercentage}%
        </div>
        <p className="text-xs font-light tracking-[0.2em] uppercase text-neutral-500">
          Five Stars
        </p>
      </div>
      <div className="text-center">
        <div className="text-2xl sm:text-3xl font-thin text-neutral-800 mb-2">
          {stats.recommendationRate}%
        </div>
        <p className="text-xs font-light tracking-[0.2em] uppercase text-neutral-500">
          Recommend
        </p>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const [visibleCount, setVisibleCount] = useState(2);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 2, testimonialsData.length));
      setIsLoading(false);
    }, 500);
  };

  const visibleTestimonials = testimonialsData.slice(0, visibleCount);
  const hasMore = visibleCount < testimonialsData.length;

  return (
    <section className="w-full py-12 sm:py-16 md:py-24 lg:py-32 bg-white" id="testimonials">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-thin tracking-[0.4em] text-neutral-800 mb-4 sm:mb-6">
            TESTIMONIALS
          </h2>
          <div className="h-[0.5px] w-16 sm:w-20 bg-neutral-300 mx-auto mb-4 sm:mb-6" />
          <p className="text-xs font-light tracking-[0.4em] uppercase text-neutral-500">
            What Our Clients Say
          </p>
        </div>

        {/* Stats Display */}
        <StatsDisplay stats={testimonialStats} />
        
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {visibleTestimonials.map((testimonial) => (
            <TestimonialCard 
              key={testimonial.id}
              testimonial={testimonial}
            />
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center">
            <button
              onClick={loadMore}
              disabled={isLoading}
              className="inline-flex items-center justify-center px-8 py-3 text-xs font-light tracking-[0.1em] uppercase border border-neutral-300 text-neutral-700 hover:border-neutral-400 hover:text-neutral-900 hover:bg-neutral-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-neutral-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </>
              ) : (
                'Load More Reviews'
              )}
            </button>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-neutral-100">
          <p className="text-sm font-light text-neutral-600 mb-4">
            Ready to experience our exceptional service?
          </p>
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('services');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="inline-flex items-center justify-center px-8 py-3 text-xs font-light tracking-[0.1em] uppercase border border-neutral-300 text-neutral-700 hover:border-neutral-400 hover:text-neutral-900 hover:bg-neutral-50 transition-all duration-300"
          >
            Book Your Appointment
          </a>
        </div>
      </div>
    </section>
  );
}