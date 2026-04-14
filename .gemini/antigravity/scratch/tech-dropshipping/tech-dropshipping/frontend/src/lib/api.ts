import { Product } from '@/components/ProductCard';
import { DUMMY_PRODUCTS } from './dummyData';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Fetches all products from the Express backend.
 * Falls back to local Dummy Data if the DB connection or server is down.
 */
export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_URL}/products`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('API down or returning errors');
    
    const json = await res.json();
    if (json.success && json.data.length > 0) {
      return json.data;
    } else {
      throw new Error('No items in DB');
    }
  } catch (error) {
    console.warn('[API Fallback] Backend not reachable or DB empty. Using dummy stock.', error);
    return DUMMY_PRODUCTS;
  }
}

/**
 * Fetches specific product by ID from Express backend.
 * Falls back to dummy data.
 */
export async function fetchProductById(id: string): Promise<Product | undefined> {
  try {
    const res = await fetch(`${API_URL}/products/${id}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Product not found in DB or API error');
    
    const json = await res.json();
    if (json.success && json.data) {
      return json.data;
    }
  } catch (error) {
    console.warn(`[API Fallback] Backend failed for item ${id}. Trying dummy data.`, error);
    return DUMMY_PRODUCTS.find(p => p.id === id);
  }
}
