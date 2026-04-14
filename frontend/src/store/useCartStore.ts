import { create } from 'zustand';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  setIsOpen: (val: boolean) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  isOpen: false,
  setIsOpen: (val) => set({ isOpen: val }),
  addItem: (product) => set((state) => {
    const existing = state.items.find(i => i.id === product.id);
    const quantity = product.quantity || 1;
    if (existing) {
      return {
        items: state.items.map(i => i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i)
      };
    }
    return { items: [...state.items, { ...product, quantity }] as CartItem[] };
  }),
  removeItem: (id) => set((state) => ({
    items: state.items.filter(i => i.id !== id)
  })),
  clearCart: () => set({ items: [] })
}));
