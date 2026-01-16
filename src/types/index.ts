export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  tag?: string | null;
  description: string;
  sizes: string[];
  reviews: number;
  reviewCount: number;
}
