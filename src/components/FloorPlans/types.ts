export interface FloorPlanVariant {
  sqft: number;
  bedrooms: number;
  bathrooms: number;
}

export interface Upgrade {
  id: string;
  name: string;
  price: number;
}

export interface FloorPlan {
  id: string;
  name: string;
  basePrice: number;
  variants: FloorPlanVariant[];
  description: string;
  image: string;
  upgrades: Upgrade[];
}

export interface Filters {
  minPrice: number;
  maxPrice: number;
  minSqft: number;
  maxSqft: number;
  bedrooms: string;
  bathrooms: string;
}