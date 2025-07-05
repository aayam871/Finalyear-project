import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cart: [],

  
  addToCart: (item) => {
    const cart = get().cart;
    const existingItem = cart.find((i) => i.id === item.id);

    if (existingItem) {
      set({
        cart: cart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({
        cart: [...cart, { ...item, quantity: 1 }],
      });
    }
  },

  
  removeFromCart: (id) => {
    const cart = get().cart;
    const item = cart.find((i) => i.id === id);

    if (item && item.quantity > 1) {
      set({
        cart: cart.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        ),
      });
    } else {
      set({
        cart: cart.filter((i) => i.id !== id),
      });
    }
  },

  
  clearCart: () => set({ cart: [] }),
}));
