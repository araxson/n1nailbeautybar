"use client";

import { type SquareService } from "@/app/api/services/route";
import { useServices } from "@/hooks/use-services";
import { useState } from "react";

// Generate booking link for any service
const generateBookingLink = (service: SquareService): string => {
  return service.bookingLink || `https://n1nail.ca/book/${service.id}`;
};

interface ServiceItemProps {
  service: SquareService;
  isLast?: boolean;
}

function ServiceItem({ service, isLast = false }: ServiceItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <div
      className={`group border-b ${isLast ? "border-transparent" : "border-neutral-100/50"}`}
    >
      <div className="transition-all duration-300 hover:bg-neutral-50/40 sm:hover:bg-neutral-50/40 hover:bg-neutral-50 sm:mx-0 -mx-4 sm:rounded-none rounded-lg">
        {/* Main Service Row - Clickable */}
        <div
          className="flex items-center justify-between gap-4 py-3 sm:py-4 px-4 sm:px-0 cursor-pointer"
          onClick={toggleExpanded}
        >
          {/* Service Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-light text-neutral-800 group-hover:text-neutral-900 transition-colors duration-300 mb-1 tracking-[0.01em]">
                  {service.title}
                </h4>
                <div className="flex items-center gap-2 text-sm font-light text-neutral-500">
                  <span className="whitespace-nowrap">{service.duration}</span>
                  <span className="w-1 h-1 bg-neutral-300 rounded-full flex-shrink-0"></span>
                  <span className="text-base font-light text-neutral-700 group-hover:text-neutral-900 transition-colors duration-300 tracking-[0.02em]">
                    {service.price}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Expand Button + Book Button */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Book Button */}
            <a
              href={generateBookingLink(service)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()} // Prevent row click when clicking book button
              className="inline-flex items-center justify-center px-4 py-1.5 text-xs font-light tracking-[0.1em] uppercase border border-neutral-300 text-neutral-700 hover:border-neutral-400 hover:text-neutral-900 hover:bg-neutral-50 transition-all duration-300 min-w-[70px]"
            >
              Book
            </a>

            {/* Expand/Collapse Button */}
            <button
              className="flex-shrink-0 p-1 text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
              aria-label={
                isExpanded ? "Collapse description" : "Expand description"
              }
            >
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Collapsible Description */}
        <div
          className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-24 opacity-100 pb-3" : "max-h-0 opacity-0"}`}
        >
          <div className="text-sm font-light text-neutral-600 leading-relaxed px-4 sm:px-0">
            {service.description}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ServiceCategoryProps {
  title: string;
  services: readonly SquareService[];
  isLast?: boolean;
}

function ServiceCategory({
  title,
  services,
  isLast = false,
}: ServiceCategoryProps) {
  return (
    <div className={`${!isLast ? "pb-12 sm:pb-16" : ""}`}>
      <div className="mb-8 sm:mb-10">
        <h3 className="text-lg sm:text-xl font-thin tracking-[0.3em] text-neutral-800 uppercase mb-4">
          {title}
        </h3>
        <div className="h-[0.5px] w-10 bg-neutral-300" />
      </div>

      <div className="space-y-0">
        {services.map((service, serviceIndex) => (
          <ServiceItem
            key={service.id}
            service={service}
            isLast={serviceIndex === services.length - 1}
          />
        ))}
      </div>

      {!isLast && (
        <div className="mt-12 sm:mt-16 flex justify-center">
          <div className="h-[0.5px] w-6 bg-neutral-200" />
        </div>
      )}
    </div>
  );
}

export function ServicesSection() {
  const { categories, isLoading, error } = useServices();

  if (isLoading) {
    return (
      <section
        className="w-full py-12 sm:py-16 md:py-24 lg:py-32 bg-white"
        id="services"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-neutral-600"></div>
              <span className="text-sm text-neutral-600 tracking-[0.1em]">
                Loading services...
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        className="w-full py-12 sm:py-16 md:py-24 lg:py-32 bg-white"
        id="services"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="text-center">
            <p className="text-sm text-red-600 mb-4">
              Error loading services: {error}
            </p>
            <p className="text-xs text-neutral-500">
              Please try refreshing the page
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="w-full py-12 sm:py-16 md:py-24 lg:py-32 bg-white"
      id="services"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-thin tracking-[0.4em] text-neutral-800 mb-4 sm:mb-6">
            SERVICES
          </h2>
          <div className="h-[0.5px] w-16 sm:w-20 bg-neutral-300 mx-auto mb-4 sm:mb-6" />
          <p className="text-xs font-light tracking-[0.4em] uppercase text-neutral-500">
            Complete Service Directory
          </p>
        </div>

        {/* All Services Categories */}
        <div className="space-y-12 sm:space-y-16 md:space-y-20">
          {categories.map((category, categoryIndex) => (
            <ServiceCategory
              key={category.id}
              title={category.title}
              services={category.services}
              isLast={categoryIndex === categories.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
