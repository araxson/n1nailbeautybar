"use client";

import { type SquareMembershipLevel } from "@/app/api/memberships/route";
import { useMemberships } from "@/hooks/use-services";
import { useState } from "react";

interface MembershipCardProps {
  membership: SquareMembershipLevel;
  isPopular?: boolean;
}

function MembershipCard({
  membership,
  isPopular = false,
}: MembershipCardProps) {
  return (
    <div
      className={`relative border border-neutral-200 bg-white hover:border-neutral-300 transition-all duration-300 group ${isPopular ? "ring-1 ring-neutral-300" : ""}`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-neutral-800 text-white px-4 py-1 text-xs font-light tracking-[0.2em] uppercase">
            Most Popular
          </span>
        </div>
      )}

      <div className="p-8 lg:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-thin tracking-[0.3em] text-neutral-800 uppercase mb-4">
            {membership.title}
          </h3>
          <div className="h-[0.5px] w-8 bg-neutral-300 mx-auto mb-6" />
          <div className="mb-6">
            <span className="text-3xl font-light text-neutral-800 tracking-[0.02em]">
              {membership.yearlyPrice}
            </span>
            <span className="text-sm font-light text-neutral-500 ml-2 tracking-[0.1em] uppercase">
              per year
            </span>
          </div>
        </div>

        {/* Benefits */}
        <div className="space-y-4">
          {membership.benefits.map((benefit) => (
            <div
              key={`${membership.title}-${benefit.substring(0, 20)}`}
              className="flex items-start space-x-3"
            >
              <div className="w-1 h-1 bg-neutral-400 rounded-full flex-shrink-0 mt-2.5" />
              <span className="text-sm font-light text-neutral-600 leading-relaxed tracking-[0.01em]">
                {benefit}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MembershipSection() {
  const [isTermsExpanded, setIsTermsExpanded] = useState(false);
  const { memberships, isLoading, error } = useMemberships();

  const toggleTerms = () => setIsTermsExpanded(!isTermsExpanded);

  return (
    <section
      className="w-full py-16 sm:py-20 md:py-24 lg:py-32 bg-neutral-50/30"
      id="membership"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-thin tracking-[0.4em] text-neutral-800 mb-4 sm:mb-6">
            MEMBERSHIP
          </h2>
          <div className="h-[0.5px] w-16 sm:w-20 bg-neutral-300 mx-auto mb-4 sm:mb-6" />
          <p className="text-xs font-light tracking-[0.4em] uppercase text-neutral-500 mb-8">
            Exclusive Benefits & Savings
          </p>
          <div className="max-w-2xl mx-auto">
            <p className="text-base font-light text-neutral-600 leading-relaxed tracking-[0.01em]">
              Join our exclusive membership program and enjoy year-round
              savings, complimentary services, and special perks designed for
              our most valued clients.
            </p>
          </div>
        </div>

        {/* Membership Cards */}
        {isLoading ? (
          <div className="text-center">
            <div className="inline-flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-neutral-600"></div>
              <span className="text-sm text-neutral-600 tracking-[0.1em]">
                Loading memberships...
              </span>
            </div>
          </div>
        ) : error ? (
          <div className="text-center">
            <p className="text-sm text-red-600 mb-4">
              Error loading memberships: {error}
            </p>
            <p className="text-xs text-neutral-500">
              Please try refreshing the page
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {memberships.map((membership, _index) => (
              <MembershipCard
                key={membership.id}
                membership={membership}
                isPopular={membership.id === "gold"}
              />
            ))}
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-16 sm:mt-20 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm font-light text-neutral-500 leading-relaxed tracking-[0.01em] mb-8">
              All memberships are billed annually and include exclusive access
              to member-only events, priority booking, and special seasonal
              promotions.
            </p>

            {/* Terms & Conditions Accordion */}
            <div className="border-t border-neutral-200">
              <div
                className="flex items-center justify-center gap-3 py-6 cursor-pointer group"
                onClick={toggleTerms}
              >
                <span className="text-xs font-light tracking-[0.15em] text-neutral-400 group-hover:text-neutral-600 transition-colors duration-300 uppercase">
                  Membership Terms & Conditions
                </span>
                <svg
                  className={`w-4 h-4 text-neutral-400 group-hover:text-neutral-600 transition-all duration-300 ${isTermsExpanded ? "rotate-180" : ""}`}
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
              </div>

              {/* Terms Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ${isTermsExpanded ? "max-h-96 opacity-100 pb-8" : "max-h-0 opacity-0"}`}
              >
                <div className="text-left space-y-4 text-sm font-light text-neutral-600 leading-relaxed">
                  <div>
                    <h4 className="font-normal text-neutral-700 mb-2">
                      Membership Terms:
                    </h4>
                    <ul className="space-y-2 ml-4">
                      <li>
                        • All memberships are billed annually and non-refundable
                      </li>
                      <li>
                        • Monthly benefits reset on the same date each month
                      </li>
                      <li>
                        • Unused monthly benefits do not roll over to the
                        following month
                      </li>
                      <li>
                        • Member discounts cannot be combined with other
                        promotions
                      </li>
                      <li>
                        • Friend passes are valid for one-time use per person
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-normal text-neutral-700 mb-2">
                      Booking & Cancellation:
                    </h4>
                    <ul className="space-y-2 ml-4">
                      <li>
                        • Members receive priority booking during peak seasons
                      </li>
                      <li>
                        • 24-hour cancellation notice required to avoid
                        forfeiting benefits
                      </li>
                      <li>
                        • Membership can be cancelled with 30 days written
                        notice
                      </li>
                      <li>
                        • Early cancellation forfeits remaining membership
                        benefits
                      </li>
                    </ul>
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
