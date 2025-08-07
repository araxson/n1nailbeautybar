import { NextRequest, NextResponse } from "next/server";
import { SquareClient, SquareEnvironment } from "square";

// Initialize Square client
const client = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN!,
  environment:
    process.env.SQUARE_ENVIRONMENT === "production"
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox,
});

const catalogApi = client.catalog;

export interface SquareService {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly price: string;
  readonly duration: string;
  readonly category: string;
  readonly image?: string;
  readonly features?: readonly string[];
  readonly bookingLink?: string;
  readonly squareId: string;
}

export interface SquareServiceCategory {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly services: readonly SquareService[];
}

// Helper function to format price from Square's Money object
function formatPrice(amount: number | bigint): string {
  const numericAmount = typeof amount === "bigint" ? Number(amount) : amount;
  if (numericAmount === 0) return "Free";
  return `$${(numericAmount / 100).toFixed(0)}`;
}

// Helper function to format duration from milliseconds
function formatDuration(durationMs: number | bigint): string {
  const numericDuration =
    typeof durationMs === "bigint" ? Number(durationMs) : durationMs;
  const minutes = Math.floor(numericDuration / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0 && remainingMinutes > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ${remainingMinutes} min${remainingMinutes > 1 ? "s" : ""}`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  } else {
    return `${minutes} min${minutes > 1 ? "s" : ""}`;
  }
}

// Extract features from description
function extractFeatures(description: string): string[] {
  const lines = description.split("\n");
  const featuresIndex = lines.findIndex((line) =>
    line.toLowerCase().includes("features:")
  );

  if (featuresIndex === -1) return [];

  return lines
    .slice(featuresIndex + 1)
    .filter((line) => line.trim().startsWith("•"))
    .map((line) => line.replace("•", "").trim())
    .filter(Boolean);
}

// Map Square services to our format with category information
function mapSquareServiceToCategory(
  item: unknown,
  _categoryMap: Record<string, { name: string; description: string }>
): SquareService | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const itemObj = item as any;
    const variation = itemObj.itemData?.variations?.[0];
    if (!variation?.itemVariationData) return null;

    const variationData = variation.itemVariationData;
    const price = variationData.priceMoney?.amount || 0;
    const duration = variationData.serviceDuration || 3600000; // Default 1 hour

    // Extract main description and features
    const fullDescription = itemObj.itemData?.description || "";
    const descriptionParts = fullDescription.split("\n\nFeatures:");
    const mainDescription = descriptionParts[0] || "";
    const features = extractFeatures(fullDescription);

    const title = itemObj.itemData?.name || "";

    // Get category from Square item's category assignment
    const squareCategories = itemObj.itemData?.categories || [];
    const categoryId =
      squareCategories.length > 0
        ? squareCategories[0].id || squareCategories[0]
        : "uncategorized";

    // Generate Square external booking link using the correct format
    // https://book.squareup.com/appointments/{merchant_id}/location/{location_id}/services/{service_id}
    const merchantId =
      process.env.SQUARE_MERCHANT_ID ||
      process.env.NEXT_PUBLIC_SQUARE_MERCHANT_ID;
    const locationId =
      process.env.SQUARE_LOCATION_ID ||
      process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;

    const bookingLink =
      merchantId && locationId
        ? `https://book.squareup.com/appointments/${merchantId}/location/${locationId}/services/${itemObj.id}`
        : `https://n1nail.ca/book?service=${generateIdFromTitle(title)}`;

    return {
      id: generateIdFromTitle(title),
      title,
      description: mainDescription,
      price: formatPrice(price),
      duration: formatDuration(duration),
      category: categoryId,
      features,
      bookingLink,
      squareId: itemObj.id,
    };
  } catch (error) {
    console.error("Error mapping Square service:", error);
    return null;
  }
}

// Helper function to generate ID from title
function generateIdFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export async function GET(_request: NextRequest) {
  try {
    // Get both categories and items from Square
    const [categoriesResponse, itemsResponse] = await Promise.all([
      catalogApi.list({ types: "CATEGORY" }),
      catalogApi.list({ types: "ITEM" }),
    ]);

    if (!itemsResponse.data) {
      return NextResponse.json({ categories: [] });
    }

    // Create a map of category IDs to category info
    const categoryMap: Record<string, { name: string; description: string }> =
      {};
    if (categoriesResponse.data) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      categoriesResponse.data.forEach((category: any) => {
        if (category.categoryData) {
          categoryMap[category.id] = {
            name: category.categoryData.name || "Untitled Category",
            description: category.categoryData.description || "",
          };
        }
      });
    }

    // Map Square items to our service format
    const services: SquareService[] = itemsResponse.data
      .map((item) => mapSquareServiceToCategory(item, categoryMap))
      .filter(
        (service: SquareService | null): service is SquareService =>
          service !== null
      );

    // Group services by category
    const categorizedServices: Record<string, SquareService[]> = {};

    services.forEach((service) => {
      const category = service.category;
      if (!categorizedServices[category]) {
        categorizedServices[category] = [];
      }
      categorizedServices[category].push(service);
    });

    // Convert to category format using Square category data
    const categories: SquareServiceCategory[] = Object.entries(
      categorizedServices
    ).map(([categoryId, categoryServices]) => {
      const categoryInfo = categoryMap[categoryId];
      return {
        id: categoryId,
        title: categoryInfo?.name || "Unknown Category",
        description: categoryInfo?.description || "",
        services: categoryServices,
      };
    });

    const response = NextResponse.json({
      categories,
      total: services.length,
      lastUpdated: new Date().toISOString(),
    });

    // Add cache-busting headers to ensure fresh data
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  } catch (error) {
    console.error("Error fetching services from Square:", error);
    return NextResponse.json(
      { error: "Failed to fetch services from Square" },
      { status: 500 }
    );
  }
}
