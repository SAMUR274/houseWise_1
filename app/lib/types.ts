export interface Property {
  id: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  images: string[];
  propertyType: string;
  yearBuilt?: number;
}

export interface SearchParams {
  location: string;
  price_max?: number;
  price_min?: number;
  bedrooms?: number;
}