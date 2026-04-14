"use client";
import React, { useEffect, useState } from "react";
import { useCartStore } from "../store/useCartStore";

export default function CartButton() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);
  const setIsOpen = useCartStore((state) => state.setIsOpen);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <button 
      onClick={() => setIsOpen(true)}
      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-full transition-all text-sm font-semibold border border-transparent hover:border-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-200"
    >
      <span>Cart</span>
      <span className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold">
        {mounted ? totalItems : 0}
      </span>
    </button>
  );
}
