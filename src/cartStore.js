import create from "zustand";

export const useCartStore = create((set, get) => ({
  cart: [],
  setCartFromBackend: (items) => set({ cart: items }),
  addToCart: (item) => {
    const cart = get().cart;
    const existing = cart.find((i) => i.id === item.id);
    if (existing) {
      // Limit quantity to 10 per item
      if (existing.quantity >= 10) return;
      set({
        cart: cart.map((i) =>
          i.id === item.id
            ? { ...i, quantity: Math.min(i.quantity + 1, 10) }
            : i
        ),
      });
    } else {
      set({ cart: [...cart, { ...item, quantity: 1 }] });
    }
  },
  // ...other cart actions...
}));
