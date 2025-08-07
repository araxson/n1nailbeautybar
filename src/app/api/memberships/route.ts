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

export interface SquareMembershipLevel {
  readonly id: string;
  readonly title: string;
  readonly yearlyPrice: string;
  readonly benefits: readonly string[];
  readonly squareId: string;
  readonly subscriptionUrl?: string;
}

// Helper function to format price from Square's Money object
function formatPrice(amount: number | bigint): string {
  const numericAmount = typeof amount === "bigint" ? Number(amount) : amount;
  if (numericAmount === 0) return "Free";
  return `$${(numericAmount / 100).toFixed(0)}`;
}

// Extract benefits from description
function extractBenefits(description: string): string[] {
  const lines = description.split("\n");
  return lines
    .filter((line) => line.trim().startsWith("•"))
    .map((line) => line.replace("•", "").trim())
    .filter(Boolean);
}

// Map Square subscription plan to our format
function mapSquareSubscriptionToMembership(
  plan: unknown
): SquareMembershipLevel | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const planObj = plan as any;
    const planData = planObj.subscriptionPlanData;
    if (!planData) return null;

    const phase = planData.subscriptionPhases?.[0];
    if (!phase) return null;

    const price = phase.recurringPriceMoney?.amount || 0;
    const title = planData.name?.replace(" Membership", "") || "";
    const description = planData.description || "";
    const benefits = extractBenefits(description);

    // Generate subscription URL (you'll need to configure this based on your Square setup)
    const subscriptionUrl = `https://squareup.com/dashboard/subscriptions/plans/${planObj.id}/subscribe`;

    return {
      id: generateIdFromTitle(title),
      title,
      yearlyPrice: formatPrice(price),
      benefits,
      squareId: planObj.id,
      subscriptionUrl,
    };
  } catch (error) {
    console.error("Error mapping Square subscription plan:", error);
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
    // Get all subscription plans from Square
    const catalogResponse = await catalogApi.list({
      types: "SUBSCRIPTION_PLAN",
    });

    if (!catalogResponse.data) {
      return NextResponse.json({ memberships: [] });
    }

    // Map Square subscription plans to our membership format
    const memberships: SquareMembershipLevel[] = catalogResponse.data
      .map(mapSquareSubscriptionToMembership)
      .filter(
        (
          membership: SquareMembershipLevel | null
        ): membership is SquareMembershipLevel => membership !== null
      )
      .sort((a: SquareMembershipLevel, b: SquareMembershipLevel) => {
        // Sort by price: Silver (lowest) -> Gold -> Platinum (highest)
        const priceA = parseInt(a.yearlyPrice.replace(/[^0-9]/g, ""));
        const priceB = parseInt(b.yearlyPrice.replace(/[^0-9]/g, ""));
        return priceA - priceB;
      });

    const response = NextResponse.json({
      memberships,
      total: memberships.length,
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
    console.error("Error fetching memberships from Square:", error);
    return NextResponse.json(
      { error: "Failed to fetch memberships from Square" },
      { status: 500 }
    );
  }
}
