declare module "squareup" {
  export interface Money {
    amount?: number;
    currency?: string;
  }

  export interface CatalogObject {
    id: string;
    type: string;
    updated_at?: string;
    created_at?: string;
    version?: number;
    is_deleted?: boolean;
    present_at_all_locations?: boolean;
    item_data?: {
      name?: string;
      description?: string;
      variations?: Array<{
        id: string;
        type: string;
        item_variation_data?: {
          item_id?: string;
          name?: string;
          pricing_type?: string;
          price_money?: Money;
          service_duration?: number;
          available_for_booking?: boolean;
        };
      }>;
    };
    subscription_plan_data?: {
      name?: string;
      description?: string;
      subscription_phases?: Array<{
        cadence?: string;
        recurring_price_money?: Money;
        ordinal?: number;
      }>;
    };
  }

  export interface ListCatalogResponse {
    objects?: CatalogObject[];
    cursor?: string;
  }

  export interface CatalogApi {
    listCatalog(
      cursor?: string,
      types?: string
    ): Promise<{ result: ListCatalogResponse }>;
  }

  export const Environment = {
    Production: "production",
    Sandbox: "sandbox",
  } as const;

  export interface ClientConfig {
    accessToken: string;
    environment: string;
  }

  export class Client {
    constructor(config: ClientConfig);
    catalogApi: CatalogApi;
  }
}
