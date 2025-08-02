import { NextRequest, NextResponse } from 'next/server';
// @ts-expect-error - square-connect module doesn't have TypeScript declarations
import { ApiClient, CatalogApi } from 'square-connect';

// Square client configuration
const defaultClient = ApiClient.instance;
defaultClient.basePath = process.env.SQUARE_ENVIRONMENT === 'production' 
  ? 'https://connect.squareup.com' 
  : 'https://connect.squareupsandbox.com';

// Configure OAuth2 access token for authorization
const oauth2 = defaultClient.authentications['oauth2'];
oauth2.accessToken = process.env.SQUARE_ACCESS_TOKEN;

const catalogApi = new CatalogApi();

export interface SquareMembershipLevel {
  readonly id: string;
  readonly title: string;
  readonly yearlyPrice: string;
  readonly benefits: readonly string[];
  readonly squareId: string;
  readonly subscriptionUrl?: string;
}

// Helper function to format price from Square's Money object
function formatPrice(amount: number): string {
  if (amount === 0) return 'Free';
  return `$${(amount / 100).toFixed(0)}`;
}

// Extract benefits from description
function extractBenefits(description: string): string[] {
  const lines = description.split('\n');
  return lines
    .filter(line => line.trim().startsWith('•'))
    .map(line => line.replace('•', '').trim())
    .filter(Boolean);
}

// Map Square subscription plan to our format
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapSquareSubscriptionToMembership(plan: any): SquareMembershipLevel | null {
  try {
    const planData = plan.subscription_plan_data;
    if (!planData) return null;

    const phase = planData.subscription_phases?.[0];
    if (!phase) return null;

    const price = phase.recurring_price_money?.amount || 0;
    const title = planData.name?.replace(' Membership', '') || '';
    const description = planData.description || '';
    const benefits = extractBenefits(description);
    
    // Generate subscription URL (you'll need to configure this based on your Square setup)
    const subscriptionUrl = `https://squareup.com/dashboard/subscriptions/plans/${plan.id}/subscribe`;
    
    return {
      id: generateIdFromTitle(title),
      title,
      yearlyPrice: formatPrice(price),
      benefits,
      squareId: plan.id,
      subscriptionUrl,
    };
  } catch (error) {
    console.error('Error mapping Square subscription plan:', error);
    return null;
  }
}

// Helper function to generate ID from title
function generateIdFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export async function GET(_request: NextRequest) {
  try {
    // Get all subscription plans from Square
    const result = await catalogApi.listCatalog({ types: 'SUBSCRIPTION_PLAN' });
    
    if (!result.objects) {
      return NextResponse.json({ memberships: [] });
    }
    
    // Map Square subscription plans to our membership format
    const memberships: SquareMembershipLevel[] = result.objects
      .map(mapSquareSubscriptionToMembership)
      .filter((membership: SquareMembershipLevel | null): membership is SquareMembershipLevel => membership !== null)
      .sort((a: SquareMembershipLevel, b: SquareMembershipLevel) => {
        // Sort by price: Silver (lowest) -> Gold -> Platinum (highest)
        const priceA = parseInt(a.yearlyPrice.replace(/[^0-9]/g, ''));
        const priceB = parseInt(b.yearlyPrice.replace(/[^0-9]/g, ''));
        return priceA - priceB;
      });
    
    return NextResponse.json({ 
      memberships,
      total: memberships.length,
      lastUpdated: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('Error fetching memberships from Square:', error);
    return NextResponse.json(
      { error: 'Failed to fetch memberships from Square' },
      { status: 500 }
    );
  }
}