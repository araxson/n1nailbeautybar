"use client";

import { useState } from "react";
import { testimonialsData, type Testimonial } from "@/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white p-6 sm:p-8 border border-neutral-100 transition-all duration-300 hover:border-neutral-200 group">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-light text-neutral-800 tracking-[0.05em]">
              {testimonial.name}
            </h3>
            <p className="text-xs font-light text-neutral-500 tracking-[0.1em] uppercase mt-1">
              {testimonial.service}
            </p>
          </div>
          <div className="flex space-x-0.5">
            {[...Array(5)].map((_, index) => (
              <svg
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className={`w-3.5 h-3.5 ${
                  index < testimonial.rating
                    ? "text-neutral-800"
                    : "text-neutral-200"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.784-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
              </svg>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-light text-neutral-600 leading-relaxed italic">
            &ldquo;{testimonial.review}&rdquo;
          </p>
        </div>
        <div className="pt-4 border-t border-neutral-50">
          <p className="text-xs font-light text-neutral-400 tracking-[0.05em]">
            {testimonial.date.split(" ").map((part, i) => {
              // Bold the "ago" part
              if (part === "ago") {
                return (
                  <span
                    key={`date-${testimonial.name}-${part}`}
                    className="font-normal"
                  >
                    {part}
                  </span>
                );
              }
              return i > 0 ? ` ${part}` : part;
            })}
          </p>
        </div>
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
      setVisibleCount((prev) => Math.min(prev + 2, testimonialsData.length));
      setIsLoading(false);
    }, 500);
  };

  const visibleTestimonials = testimonialsData.slice(0, visibleCount);
  const hasMore = visibleCount < testimonialsData.length;

  return (
    <section
      className="w-full py-12 sm:py-16 md:py-24 lg:py-32 bg-white"
      id="testimonials"
    >
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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {visibleTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
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
                  <svg
                    className="animate-spin -ml-1 mr-3 h-4 w-4 text-neutral-700"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </>
              ) : (
                "Load More Reviews"
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
