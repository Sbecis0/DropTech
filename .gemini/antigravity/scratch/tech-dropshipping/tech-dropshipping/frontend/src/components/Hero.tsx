'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] pt-32 overflow-hidden flex flex-col items-center justify-start text-center">
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center text-xs font-semibold tracking-widest text-gray-500 uppercase mb-4">
            New Arrival
          </div>
          
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-4 text-[#1d1d1f]">
            Pro. Beyond.
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-medium text-gray-500 mb-8 max-w-2xl mx-auto">
            The next generation of AI-tracking in a tripod. <br className="hidden md:block"/>
            Stocked locally. Delivered tomorrow.
          </h2>
          
          <div className="flex items-center justify-center gap-6 text-lg">
            <a href="#products" className="apple-link">
              Learn more <ChevronRight className="w-4 h-4 ml-1" />
            </a>
            <a href="#products" className="apple-link">
              Buy <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="mt-auto w-full max-w-6xl relative h-[50vh] md:h-[60vh] z-0"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      >
        <Image 
          src="/images/tripod.png" 
          alt="AI Auto-Tracking Smart Tripod"
          fill
          priority
          className="object-contain object-bottom"
        />
      </motion.div>
    </section>
  );
}
