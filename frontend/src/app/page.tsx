import React from 'react';
import ProductGrid from '../components/ProductGrid';

export const dynamic = 'force-dynamic'; // Evitamos estáticos de Next.js para mostrar stock siempre real.

export default async function HomePage() {
  let products = [];
  
  try {
    // Pedimos al backend los productos en tiempo real (forzamos IPv4 directo)
    const res = await fetch('http://127.0.0.1:5000/api/products', { cache: 'no-store' });
    if (res.ok) {
      products = await res.json();
    }
  } catch (err) {
    console.error("Backend no disponible:", err instanceof Error ? err.message : String(err));
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 px-6 flex justify-center border-b border-gray-100 dark:border-neutral-900 transition-colors duration-300">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-semibold mb-6 tracking-tighter text-black dark:text-white leading-tight">
            Design meets technology.
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-10 leading-relaxed font-normal">
            A curated selection of premium gadgets delivered seamlessly to your door in 24/48 hours.
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-8 py-4 rounded-full bg-black dark:bg-white text-white dark:text-black font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-sm tracking-wide">
              Shop the Collection
            </button>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-12 text-center md:text-left flex flex-col md:flex-row justify-between items-end">
          <div>
            <h2 className="text-2xl font-medium tracking-tight text-black dark:text-white">New Arrivals</h2>
          </div>
          <span className="text-sm font-medium text-gray-400 mt-4 md:mt-0 uppercase tracking-widest">In Stock</span>
        </div>

        <ProductGrid products={products} />
      </section>
    </div>
  );
}
