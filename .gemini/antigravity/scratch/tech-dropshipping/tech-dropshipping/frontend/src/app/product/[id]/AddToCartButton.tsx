'use client';

import { useCartStore } from '@/store/cartStore';
import { Product } from '@/components/ProductCard';

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  return (
    <button 
      onClick={handleAddToCart}
      className="bg-[#0071e3] text-white px-4 py-1.5 rounded-full text-xs hover:bg-[#0077ed] transition-colors"
    >
      Buy
    </button>
  );
}
