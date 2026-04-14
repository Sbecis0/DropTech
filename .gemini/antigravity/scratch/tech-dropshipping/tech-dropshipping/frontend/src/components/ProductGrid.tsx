'use client';

import ProductCard, { Product } from './ProductCard';
import { motion } from 'framer-motion';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const mappedProducts = products.map((p, index) => {
    // Generate Apple-style headlines for the aesthetic based on index
    if (index === 0) return { ...p, headline: "Intelligent auto-tracking.", isLarge: false };
    if (index === 1) return { ...p, headline: "Bone conduction. Hear everything.", isLarge: false };
    if (index === 2) return { ...p, headline: "Lighting that adapts to you.", isLarge: true };
    
    // For dynamically mapped real nodes
    return { ...p, headline: p.category || "Pro grade." };
  });

  return (
    <section id="products" className="py-24 bg-[#f5f5f7]">
      <div className="container mx-auto px-4 max-w-[1400px]">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight">The latest.</h2>
          <p className="text-xl text-gray-500 mt-4 font-medium">Take a look at what&apos;s new, right now.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mappedProducts.map((product, i) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={product.isLarge ? "md:col-span-2" : ""}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
