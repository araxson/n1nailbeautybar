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
function formatPrice(amount: number): string {
  if (amount === 0) return 'Free';
  return `$${(amount / 100).toFixed(0)}`;
}

// Helper function to format duration from milliseconds
function formatDuration(durationMs: number): string {
  const minutes = Math.floor(durationMs / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours > 0 && remainingMinutes > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes} min${remainingMinutes > 1 ? 's' : ''}`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  } else {
    return `${minutes} min${minutes > 1 ? 's' : ''}`;
  }
}

// Extract features from description
function extractFeatures(description: string): string[] {
  const lines = description.split('\n');
  const featuresIndex = lines.findIndex(line => line.toLowerCase().includes('features:'));
  
  if (featuresIndex === -1) return [];
  
  return lines
    .slice(featuresIndex + 1)
    .filter(line => line.trim().startsWith('•'))
    .map(line => line.replace('•', '').trim())
    .filter(Boolean);
}

// Map Square services to our format with category information
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapSquareServiceToCategory(item: any): SquareService | null {
  try {
    const variation = item.item_data?.variations?.[0];
    if (!variation?.item_variation_data) return null;

    const variationData = variation.item_variation_data;
    const price = variationData.price_money?.amount || 0;
    const duration = variationData.service_duration || 3600000; // Default 1 hour
    
    // Extract main description and features
    const fullDescription = item.item_data?.description || '';
    const descriptionParts = fullDescription.split('\n\nFeatures:');
    const mainDescription = descriptionParts[0] || '';
    const features = extractFeatures(fullDescription);
    
    // Determine category from item name or description
    const title = item.item_data?.name || '';
    const category = determineCategoryFromTitle(title);
    
    // Generate Square external booking link using the correct format
    // https://book.squareup.com/appointments/{merchant_id}/location/{location_id}/services/{service_id}
    const merchantId = process.env.SQUARE_MERCHANT_ID || process.env.NEXT_PUBLIC_SQUARE_MERCHANT_ID;
    const locationId = process.env.SQUARE_LOCATION_ID || process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;
    
    const bookingLink = merchantId && locationId 
      ? `https://book.squareup.com/appointments/${merchantId}/location/${locationId}/services/${item.id}`
      : `https://n1nail.ca/book?service=${generateIdFromTitle(title)}`;
    
    return {
      id: generateIdFromTitle(title),
      title,
      description: mainDescription,
      price: formatPrice(price),
      duration: formatDuration(duration),
      category,
      features,
      bookingLink,
      squareId: item.id,
    };
  } catch (error) {
    console.error('Error mapping Square service:', error);
    return null;
  }
}

// Helper function to determine category from service title
function determineCategoryFromTitle(title: string): string {
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes('manicure') && !titleLower.includes('gel') && !titleLower.includes('vip')) {
    return 'manicures';
  } else if (titleLower.includes('pedicure') && !titleLower.includes('gel') && !titleLower.includes('vip')) {
    return 'pedicures';
  } else if (titleLower.includes('gel') || titleLower.includes('extension') || titleLower.includes('strengthening')) {
    return 'long-lasting-options';
  } else if (titleLower.includes('sheer') || titleLower.includes('french') || titleLower.includes('minimalist')) {
    return 'simple-nail-art';
  } else if (titleLower.includes('vip')) {
    return 'vip-services';
  } else if (titleLower.includes('express') || titleLower.includes('maintenance') || titleLower.includes('polish change') || titleLower.includes('strategist')) {
    return 'quick-services';
  } else if (titleLower.includes('essential') || titleLower.includes('luxury') || titleLower.includes('ultimate') || titleLower.includes('combo')) {
    return 'packages';
  } else if (titleLower.includes('wax') || titleLower.includes('callus') || titleLower.includes('repair') || titleLower.includes('removal')) {
    return 'add-on-services';
  }
  
  return 'other';
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

// Category information mapping
const categoryInfo: Record<string, { title: string; description: string }> = {
  'manicures': {
    title: 'Manicures',
    description: 'Professional hand care and nail enhancement',
  },
  'pedicures': {
    title: 'Pedicures',
    description: 'Complete foot care and relaxation',
  },
  'long-lasting-options': {
    title: 'Long-Lasting Options',
    description: 'Durable nail enhancements and treatments',
  },
  'simple-nail-art': {
    title: 'Simple Nail Art',
    description: 'Elegant and creative nail designs',
  },
  'vip-services': {
    title: 'VIP Services',
    description: 'Premium services with our top artist specialists',
  },
  'quick-services': {
    title: 'Quick Services',
    description: 'Express treatments for busy schedules',
  },
  'packages': {
    title: 'Packages',
    description: 'Combined services for complete care',
  },
  'add-on-services': {
    title: 'Add-On Services',
    description: 'Enhance your experience with additional treatments',
  },
};

export async function GET(_request: NextRequest) {
  try {
    // Get all catalog items from Square
    const result = await catalogApi.listCatalog({ types: 'ITEM' });
    
    if (!result.objects) {
      return NextResponse.json({ categories: [] });
    }
    
    // Map Square items to our service format
    const services: SquareService[] = result.objects
      .map(mapSquareServiceToCategory)
      .filter((service: SquareService | null): service is SquareService => service !== null);
    
    // Group services by category
    const categorizedServices: Record<string, SquareService[]> = {};
    
    services.forEach(service => {
      const category = service.category;
      if (!categorizedServices[category]) {
        categorizedServices[category] = [];
      }
      categorizedServices[category].push(service);
    });
    
    // Convert to category format
    const categories: SquareServiceCategory[] = Object.entries(categorizedServices).map(([categoryId, categoryServices]) => ({
      id: categoryId,
      title: categoryInfo[categoryId]?.title || categoryId,
      description: categoryInfo[categoryId]?.description || '',
      services: categoryServices,
    }));
    
    return NextResponse.json({ 
      categories,
      total: services.length,
      lastUpdated: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('Error fetching services from Square:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services from Square' },
      { status: 500 }
    );
  }
}