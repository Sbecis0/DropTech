"use client";
import React, { useState } from 'react';
import { useCartStore } from '../store/useCartStore';

export default function AddToCartButton({ product }: { product: any }) {
  const addItem = useCartStore(state => state.addItem);
  const setIsOpen = useCartStore(state => state.setIsOpen);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.imageUrl });
    setAdded(true);
    setIsOpen(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button 
      onClick={handleAdd}
      className={`w-full md:w-auto px-10 py-5 rounded-full font-bold text-lg transition-all ${
        added ? 'bg-gray-100 text-black border border-gray-200' : 'bg-black text-white hover:bg-gray-800 shadow-xl shadow-black/10'
      }`}
    >
      {added ? 'Agregado a la Cesta 🛒' : 'Añadir a la Cesta'}
    </button>
  );
}
