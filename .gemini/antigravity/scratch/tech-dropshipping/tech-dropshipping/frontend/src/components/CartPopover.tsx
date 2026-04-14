'use client';

import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CartPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartPopover({ isOpen, onClose }: CartPopoverProps) {
  const { items, removeItem, getTotalPrice } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="absolute top-12 right-0 w-[350px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 text-[#1d1d1f]"
        >
          <div className="p-5">
            <h3 className="font-semibold text-lg mb-4">Your Bag</h3>
            
            {items.length === 0 ? (
              <p className="text-gray-500 text-sm py-4">Your bag is empty.</p>
            ) : (
              <div className="space-y-6 max-h-[350px] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-16 h-16 bg-[#f5f5f7] rounded-xl overflow-hidden flex-shrink-0">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-contain p-2"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm leading-tight pr-4">{item.name}</h4>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-gray-500 text-xs mt-1">Qty: {item.quantity}</p>
                      <p className="font-semibold mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {items.length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex justify-between font-semibold text-lg mb-6">
                  <span>Total</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                
                <button 
                  onClick={() => {
                    onClose();
                    window.location.href = '/checkout';
                  }}
                  className="w-full py-3 bg-[#0071e3] text-white rounded-xl font-medium hover:bg-[#0077ed] transition-colors"
                >
                  Check Out
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
