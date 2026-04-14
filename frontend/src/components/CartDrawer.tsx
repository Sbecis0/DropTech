"use client";
import React, { useEffect, useState } from "react";
import { useCartStore } from "../store/useCartStore";

export default function CartDrawer() {
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, isOpen, setIsOpen } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] transition-opacity" 
        onClick={() => setIsOpen(false)}
      />
      <div className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white shadow-2xl z-[70] p-6 md:p-10 flex flex-col transform transition-transform border-l border-gray-100">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-black">Tu Cesta</h2>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-black transition-colors font-light text-4xl leading-none">&times;</button>
        </div>

        <div className="flex-1 overflow-y-auto w-full pr-2">
          {items.length === 0 ? (
             <div className="flex flex-col items-center justify-center h-full opacity-50">
               <span className="text-6xl mb-4">🛒</span>
               <p className="text-gray-500 font-medium">No hay productos aquí.</p>
             </div>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-6 group">
                  <div className="w-20 h-20 bg-gray-50 dark:bg-neutral-800 flex items-center justify-center text-4xl rounded-2xl border border-gray-100 dark:border-neutral-700 transition-colors group-hover:bg-gray-100 dark:group-hover:bg-neutral-700 overflow-hidden shrink-0">
                    {item.image?.startsWith('http') ? (
                       <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (item.image || '📦')}
                  </div>
                  <div className="flex-1 py-1">
                    <h4 className="font-semibold text-black line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">Ctd: {item.quantity}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-black text-lg">€{(item.price * item.quantity).toFixed(2)}</span>
                      <button onClick={() => removeItem(item.id)} className="text-xs text-gray-400 hover:text-red-500 font-medium transition-colors">Eliminar</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-8 border-t border-black mt-auto">
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-500 uppercase tracking-widest text-xs font-bold">Total a pagar</span>
            <span className="text-3xl font-bold text-black tracking-tighter">€{total.toFixed(2)}</span>
          </div>
          <button 
             className="w-full bg-black text-white font-bold py-5 rounded-full hover:bg-gray-800 transition-all disabled:bg-gray-100 disabled:text-gray-400"
             disabled={items.length === 0}
             onClick={() => alert("Simulando Pasarela Stripe conectando a Inventario de España CJ...")}
          >
            Finalizar pedido &rarr;
          </button>
        </div>
      </div>
    </>
  );
}
