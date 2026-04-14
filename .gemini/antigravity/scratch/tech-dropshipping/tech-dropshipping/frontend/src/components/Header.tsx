'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useState, useRef, useEffect } from 'react';
import CartPopover from './CartPopover';

export default function Header() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  // Close cart when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full bg-[#f5f5f7]/80 backdrop-blur-md border-b border-black/5 transition-all">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="font-semibold text-lg tracking-tight text-black hover:text-gray-600 transition-colors">
            NEXUS<span className="text-gray-500">GEAR</span>
          </Link>

          {/* Minimal Nav Links */}
          <nav className="hidden md:flex space-x-10 text-xs font-medium tracking-wide text-gray-600">
            <Link href="/" className="hover:text-black transition-colors">Store</Link>
            <Link href="#products" className="hover:text-black transition-colors">Devices</Link>
            <Link href="#" className="hover:text-black transition-colors">Support</Link>
          </nav>

          {/* Cart Icon & Popover */}
          <div className="flex items-center relative" ref={cartRef}>
            <button 
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative text-gray-600 hover:text-black transition-colors"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
            
            {/* Embedded Popover Component */}
            <CartPopover isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          </div>
        </div>
      </div>
    </header>
  );
}
