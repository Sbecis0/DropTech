'use client';

import { useCartStore } from '@/store/cartStore';
import Header from '@/components/Header';
import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Fake processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bento-panel max-w-lg w-full text-center p-12"
          >
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
              ✓
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-[#1d1d1f] mb-4">Order Confirmed</h1>
            <p className="text-gray-600 mb-8 font-medium">
              We'll send shipping updates directly to your email. Thank you for your purchase.
            </p>
            <Link href="/" className="inline-flex items-center justify-center bg-[#0071e3] text-white px-8 py-3 rounded-full font-medium hover:bg-[#0077ed] transition-colors">
              Continue Shopping
            </Link>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-10">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors">
              <ChevronLeft className="w-4 h-4 mr-1" /> Return to Store
            </Link>
            <h1 className="text-4xl font-semibold tracking-tight text-[#1d1d1f] mt-4">Checkout</h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Payment & Shipping Form */}
            <div className="flex-grow order-2 lg:order-1">
              <div className="bento-panel p-8 md:p-10">
                <form onSubmit={handleSimulatePayment} className="space-y-8">
                  
                  {/* Delivery details */}
                  <section>
                    <h2 className="text-xl font-semibold mb-4 text-[#1d1d1f]">Delivery Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input required type="text" placeholder="First Name" className="w-full bg-[#f5f5f7] border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0071e3] focus:border-transparent transition-all" />
                      <input required type="text" placeholder="Last Name" className="w-full bg-[#f5f5f7] border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0071e3] focus:border-transparent transition-all" />
                      <input required type="text" placeholder="Address" className="w-full bg-[#f5f5f7] border border-gray-200 rounded-xl px-4 py-3 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-[#0071e3] focus:border-transparent transition-all" />
                      <input required type="email" placeholder="Email Address" className="w-full bg-[#f5f5f7] border border-gray-200 rounded-xl px-4 py-3 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-[#0071e3] focus:border-transparent transition-all" />
                    </div>
                  </section>

                  <hr className="border-gray-100" />

                  {/* Payment specs */}
                  <section>
                    <h2 className="text-xl font-semibold mb-4 text-[#1d1d1f]">Payment Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input required type="text" placeholder="Card Number" className="w-full bg-[#f5f5f7] border border-gray-200 rounded-xl px-4 py-3 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-[#0071e3] focus:border-transparent transition-all" />
                      <input required type="text" placeholder="MM/YY" className="w-full bg-[#f5f5f7] border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0071e3] focus:border-transparent transition-all" />
                      <input required type="text" placeholder="CVC" className="w-full bg-[#f5f5f7] border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0071e3] focus:border-transparent transition-all" />
                    </div>
                  </section>

                  <button 
                    disabled={items.length === 0 || isProcessing}
                    type="submit" 
                    className="w-full bg-[#0071e3] text-white rounded-xl font-medium py-4 text-lg hover:bg-[#0077ed] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center h-16"
                  >
                    {isProcessing ? 'Processing Securely...' : `Pay $${getTotalPrice().toFixed(2)}`}
                  </button>
                  <p className="text-xs text-center text-gray-500 font-medium">Simulated demo store payload. Do not enter real numbers.</p>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-[400px] order-1 lg:order-2">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 sticky top-24">
                <h3 className="font-semibold text-lg text-[#1d1d1f] mb-6">Order Summary</h3>
                
                {items.length === 0 ? (
                  <p className="text-gray-500 text-sm">Your order is empty.</p>
                ) : (
                  <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative w-16 h-16 bg-[#f5f5f7] rounded-xl overflow-hidden flex-shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                          <span className="absolute -top-1 -right-1 bg-gray-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full z-10">{item.quantity}</span>
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium text-sm text-[#1d1d1f] leading-tight pr-4">{item.name}</h4>
                          <p className="font-semibold mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="space-y-3 pt-6 border-t border-gray-100 text-sm">
                  <div className="flex justify-between text-gray-600 font-medium">
                    <span>Subtotal</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 font-medium">
                    <span>Shipping To Spain</span>
                    <span className="text-green-600">Free 24/48h</span>
                  </div>
                  <div className="flex justify-between font-semibold text-xl text-[#1d1d1f] pt-4">
                    <span>Total</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
