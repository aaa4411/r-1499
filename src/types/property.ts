
export interface Property {
  id: string;
  image: string;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: 'sale' | 'rent';
  status?: string;
  featured?: boolean;
}

export type PropertyType = 'sale' | 'rent' | 'all';
