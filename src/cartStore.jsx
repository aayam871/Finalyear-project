import { create } from "zustand";

const getInitialCart = () => {
  try {
    const stored = localStorage.getItem("localCart");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const useCartStore = create((set, get) => ({
  cart: getInitialCart(),

  // Add to cart expects item with { id, variantId, quantity?, ... }
  addToCart: (item) => {
    const cart = get().cart;
    // Match by id and variantId (variantId must be consistent)
    const existingItem = cart.find(
      (i) => i.id === item.id && i.variantId === item.variantId
    );

    if (existingItem) {
      set({
        cart: cart.map((i) =>
          i.id === item.id && i.variantId === item.variantId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      });
    } else {
      set({
        cart: [...cart, { ...item, quantity: 1 }],
      });
    }
  },

  removeFromCart: (item) => {
    const cart = get().cart;
    const existingItem = cart.find(
      (i) => i.id === item.id && i.variantId === item.variantId
    );

    if (existingItem && existingItem.quantity > 1) {
      set({
        cart: cart.map((i) =>
          i.id === item.id && i.variantId === item.variantId
            ? { ...i, quantity: i.quantity - 1 }
            : i
        ),
      });
    } else {
      set({
        cart: cart.filter(
          (i) => !(i.id === item.id && i.variantId === item.variantId)
        ),
      });
    }
  },

  clearCart: () => {
    set({ cart: [] });
    localStorage.removeItem("localCart");
  },

  // Normalize backend items before setting cart state
  setCartFromBackend: (backendItems) => {
    const normalizedItems = backendItems.map((item) => ({
      id: item.foodItemId ?? item.id,
      cartItemId: item.id,
      variantId:
        item.foodVariantId ??
        item.variantId ??
        item.variantName ??
        "default_variant",
      quantity: item.quantity,
      foodName: item.foodName,
      unitPrice: item.unitPrice,
      subtotal: item.subtotal,
      imageUrl: item.imageUrl || "",
    }));
    set({ cart: normalizedItems });
    localStorage.setItem("localCart", JSON.stringify(normalizedItems)); // persist
  },
}));
