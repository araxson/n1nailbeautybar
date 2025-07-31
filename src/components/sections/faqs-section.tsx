"use client";

import { useState } from "react";
import { faqsData, faqCategories, type FAQ } from "@/data/faqs";

interface FAQItemProps {
  faq: FAQ;
  isLast?: boolean;
}

function FAQItem({ faq, isLast = false }: FAQItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <div
      className={`group border-b ${isLast ? "border-transparent" : "border-neutral-100/50"}`}
    >
      <div className="transition-all duration-300 hover:bg-neutral-50/40 sm:hover:bg-neutral-50/40 hover:bg-neutral-50 sm:mx-0 -mx-4 sm:rounded-none rounded-lg">
        {/* Question Row - Clickable */}
        <div
          className="flex items-center justify-between gap-4 py-4 sm:py-5 px-4 sm:px-0 cursor-pointer"
          onClick={toggleExpanded}
        >
          {/* Question */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-light text-neutral-800 group-hover:text-neutral-900 transition-colors duration-300 tracking-[0.01em] leading-relaxed">
              {faq.question}
            </h3>
          </div>

          {/* Expand/Collapse Button */}
          <button
            className="flex-shrink-0 p-1 text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
            aria-label={isExpanded ? "Collapse answer" : "Expand answer"}
          >
            <svg
              className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
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

        {/* Answer - Collapsible */}
        <div
          className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-40 opacity-100 pb-4" : "max-h-0 opacity-0"}`}
        >
          <div className="text-sm sm:text-base font-light text-neutral-600 leading-relaxed px-4 sm:px-0">
            {faq.answer}
          </div>
        </div>
      </div>
    </div>
  );
}

interface CategoryFilterProps {
  categories: typeof faqCategories;
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-8 sm:mb-12">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 py-2 text-xs sm:text-sm font-light tracking-[0.1em] uppercase transition-all duration-300 border ${
            activeCategory === category.id
              ? "border-neutral-400 text-neutral-900 bg-neutral-50"
              : "border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:text-neutral-800"
          }`}
        >
          {category.title}
        </button>
      ))}
    </div>
  );
}

export function FAQsSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredFAQs =
    activeCategory === "all"
      ? faqsData
      : faqsData.filter((faq) => faq.category === activeCategory);

  return (
    <section
      className="w-full py-12 sm:py-16 md:py-24 lg:py-32 bg-neutral-50/30"
      id="faqs"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-thin tracking-[0.4em] text-neutral-800 mb-4 sm:mb-6">
            FAQS
          </h2>
          <div className="h-[0.5px] w-16 sm:w-20 bg-neutral-300 mx-auto mb-4 sm:mb-6" />
          <p className="text-xs font-light tracking-[0.4em] uppercase text-neutral-500">
            Frequently Asked Questions
          </p>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          categories={faqCategories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* FAQs List */}
        <div className="space-y-0">
          {filteredFAQs.map((faq, index) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isLast={index === filteredFAQs.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
