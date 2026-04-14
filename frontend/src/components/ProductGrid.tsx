"use client";
import React from 'react';
import Link from 'next/link';
import { useCartStore } from '../store/useCartStore';

export default function ProductGrid({ products }: { products: any[] }) {
  const addItem = useCartStore(state => state.addItem);
  const setIsOpen = useCartStore(state => state.setIsOpen);

  const handleAdd = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ id: product.id, name: product.name, price: product.price, image: product.imageUrl });
    setIsOpen(true);
  };

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 bg-gray-50 rounded-3xl border border-gray-100 col-span-full">
        <p className="text-gray-500 text-lg">No hay productos listados todavía.</p>
        <p className="text-sm font-semibold text-black mt-4">⚠️ Asegúrate de que API/Backend está corriendo en http://localhost:5000</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      {products.map(product => (
        <div key={product.id} className="group relative border border-gray-100 rounded-3xl overflow-hidden hover:border-gray-200 transition-all duration-500 bg-white">
          <Link href={`/product/${product.id}`} className="block aspect-square overflow-hidden bg-gray-50 dark:bg-neutral-900 flex items-center justify-center relative transition-all duration-500 group-hover:bg-gray-100 dark:group-hover:bg-neutral-800">
            {product.imageUrl?.startsWith('http') ? (
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
            ) : (
              <span className="text-8xl transform group-hover:scale-105 transition-transform duration-500">
                {product.imageUrl || '📦'}
              </span>
            )}
          </Link>
          <div className="p-6">
            <Link href={`/product/${product.id}`}>
              <h3 className="text-lg font-medium text-black mb-1 truncate hover:text-gray-600 transition-colors" title={product.name}>
                {product.name}
              </h3>
            </Link>
            <p className="text-gray-500 text-sm mb-6 truncate">Spain Warehouse · {product.local_stock} disponibles</p>
            
            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
              <span className="text-xl font-semibold text-black">
                €{product.price}
              </span>
              <button 
                onClick={(e) => handleAdd(product, e)}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors text-xl font-light focus:outline-none focus:scale-110 active:scale-95"
                title="Añadir rápido"
              >
                +
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
