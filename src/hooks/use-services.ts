"use client";

import { useState, useEffect } from "react";
import type { SquareServiceCategory } from "@/app/api/services/route";
import type { SquareMembershipLevel } from "@/app/api/memberships/route";

interface UseServicesReturn {
  categories: SquareServiceCategory[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  lastUpdated: string | null;
}

interface UseMembershipsReturn {
  memberships: SquareMembershipLevel[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  lastUpdated: string | null;
}

// Services hook
export function useServices(): UseServicesReturn {
  const [categories, setCategories] = useState<SquareServiceCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/services?_t=${Date.now()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch services: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setCategories(data.categories || []);
      setLastUpdated(data.lastUpdated || null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      console.error("Error fetching services from API:", err);

      // Set empty categories on error
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return {
    categories,
    isLoading,
    error,
    refetch: fetchServices,
    lastUpdated,
  };
}

// Memberships hook
export function useMemberships(): UseMembershipsReturn {
  const [memberships, setMemberships] = useState<SquareMembershipLevel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchMemberships = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`/api/memberships?_t=${Date.now()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch memberships: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Use hardcoded membership data instead of Square API
      const hardcodedMemberships: SquareMembershipLevel[] = [
        {
          id: "silver",
          title: "Silver",
          yearlyPrice: "$100",
          benefits: [
            "10% off all services",
            "10% off all products",
            "1 friend pass per month (friend gets 10% off)",
          ],
          squareId: "hardcoded-silver",
        },
        {
          id: "gold",
          title: "Gold",
          yearlyPrice: "$200",
          benefits: [
            "20% off all services",
            "15% off all products",
            "1 FREE Express Natural Nails monthly (value $30)",
            "2 friend passes per month (friends get 20% off)",
          ],
          squareId: "hardcoded-gold",
        },
        {
          id: "platinum",
          title: "Platinum",
          yearlyPrice: "$300",
          benefits: [
            "30% off all services",
            "20% off all products",
            "2 FREE Express Natural Nails monthly (value $60)",
            "3 friend passes per month (friends get 30% off)",
          ],
          squareId: "hardcoded-platinum",
        },
      ];

      setMemberships(hardcodedMemberships);
      setLastUpdated(data.lastUpdated || null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      console.error("Error fetching memberships from API:", err);

      // Set empty memberships on error
      setMemberships([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMemberships();
  }, []);

  return {
    memberships,
    isLoading,
    error,
    refetch: fetchMemberships,
    lastUpdated,
  };
}

// Combined hook for both services and memberships
export function useSquareData() {
  const services = useServices();
  const memberships = useMemberships();

  return {
    services,
    memberships,
    isLoading: services.isLoading || memberships.isLoading,
    hasErrors: !!(services.error || memberships.error),
    errors: {
      services: services.error,
      memberships: memberships.error,
    },
    refetchAll: async () => {
      await Promise.all([services.refetch(), memberships.refetch()]);
    },
  };
}
