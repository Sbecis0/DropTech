'use client';

import Header from '@/components/Header';
import { useState } from 'react';
import { Search, MapPin, Package, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<boolean | null>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber) return;
    
    setIsSearching(true);
    setResult(null);

    // Simulate fetch delay
    setTimeout(() => {
      setIsSearching(false);
      // Let's pretend any specific code works if it has 'NX' prefix
      setResult(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1d1d1f] mb-4">Track Order</h1>
            <p className="text-lg text-gray-500 font-medium tracking-tight">Enter your NEXUSGEAR order number to check local Spain delivery status.</p>
          </div>

          <div className="bento-panel p-8 md:p-10 shadow-sm border border-gray-100">
            <form onSubmit={handleTrack} className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="text" 
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="Order Number (e.g. NX-001294)" 
                className="w-full bg-[#f5f5f7] border border-gray-200 rounded-2xl pl-12 pr-32 py-5 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#0071e3] transition-all" 
              />
              <div className="absolute inset-y-2 right-2 flex items-center">
                <button 
                  type="submit"
                  disabled={isSearching}
                  className="bg-[#0071e3] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#0077ed] transition-colors disabled:opacity-50 h-full flex items-center"
                >
                  {isSearching ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : 'Track'}
                </button>
              </div>
            </form>

            <AnimatePresence>
              {result && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 40 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-gray-100 pt-10">
                    <div className="flex justify-between items-center mb-8">
                       <h3 className="font-semibold text-xl text-[#1d1d1f]">Status: In Transit</h3>
                       <span className="bg-blue-100 text-[#0071e3] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Arriving Tomorrow</span>
                    </div>

                    <div className="relative">
                      {/* Timeline Line */}
                      <div className="absolute left-6 top-0 bottom-8 w-0.5 bg-gray-100"></div>
                      
                      <div className="space-y-8">
                        <div className="flex gap-6 relative z-10">
                          <div className="w-12 h-12 bg-[#0071e3] text-white rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <div className="pt-2">
                            <h4 className="font-bold text-[#1d1d1f]">En route to regional facility</h4>
                            <p className="text-gray-500 text-sm mt-1">Valencia, Spain • Today, 08:42 AM</p>
                          </div>
                        </div>

                        <div className="flex gap-6 relative z-10 text-gray-500">
                           <div className="w-12 h-12 bg-white border-2 border-gray-200 text-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                            <Package className="w-5 h-5" />
                          </div>
                          <div className="pt-2 opacity-50">
                            <h4 className="font-bold">Package left CJ facility</h4>
                            <p className="text-sm mt-1">Madrid Warehouse • Yesterday, 19:30 PM</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-6 relative z-10 text-gray-500">
                           <div className="w-12 h-12 bg-white border-2 border-gray-200 text-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                          <div className="pt-2 opacity-50">
                            <h4 className="font-bold">Order Confirmed</h4>
                            <p className="text-sm mt-1">Payment verified • Yesterday, 14:15 PM</p>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </main>
    </div>
  );
}
