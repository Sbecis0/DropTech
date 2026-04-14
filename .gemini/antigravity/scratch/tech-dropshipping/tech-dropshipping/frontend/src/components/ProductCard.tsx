'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { ChevronRight } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  headline?: string;
  isLarge?: boolean;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  return (
    <Link href={`/product/${product.id}`} className="group block h-full">
      <div className={`bento-panel h-full flex flex-col relative pt-12 px-8 ${product.isLarge ? 'md:col-span-2 md:pt-16 pb-0 px-12 md:px-20' : 'pb-8'}`}>
        
        {/* Header Text aligned top and center for Apple feel */}
        <div className="text-center z-10">
          <h3 className={`font-semibold text-[#1d1d1f] tracking-tight ${product.isLarge ? 'text-4xl md:text-5xl' : 'text-3xl'} mb-2`}>
            {product.name.split(' ')[0]}
          </h3>
          <p className={`${product.isLarge ? 'text-xl' : 'text-lg'} text-gray-500 font-medium mb-4`}>
            {product.headline || product.name}
          </p>
          <p className="text-[#1d1d1f] mb-6 font-medium">From ${product.price}</p>
          
          <div className="flex items-center justify-center gap-4 text-sm font-medium">
             <button 
                onClick={handleAddToCart}
                className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
                aria-label="Buy"
              >
                Buy
              </button>
              <span className="apple-link cursor-pointer">
                Learn more <ChevronRight className="w-4 h-4 ml-1" />
              </span>
          </div>
        </div>

        {/* Image pinned to bottom or center depending on layout */}
        <div className={`mt-10 relative flex-grow ${product.isLarge ? 'min-h-[400px]' : 'min-h-[250px]'}`}>
           <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-contain ${product.isLarge ? 'object-bottom' : 'object-center'} group-hover:scale-105 transition-transform duration-700 ease-out`}
          />
        </div>
      </div>
    </Link>
  );
}
