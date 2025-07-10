import toast from "react-hot-toast";
import { axiosWithRefresh } from "./axiosWithRefresh";
import { useCartStore } from "./cartStore";

export const addToCartHandler = async ({
  food,
  selectedVariantId,
  setJustAdded,
  setButtonDisabled,
  setCartFromBackend,
}) => {
  const userData = localStorage.getItem("user");
  if (!userData) {
    toast.error("Please login to continue.");
    return false;
  }

  const user = JSON.parse(userData);
  const token = user.accessToken;
  if (!token) {
    toast.error("Please login to continue.");
    return false;
  }

  if (!selectedVariantId) {
    toast.error("Please select a variant.");
    return false;
  }

  try {
    setButtonDisabled?.(true);

    // Add to backend
    const res = await axiosWithRefresh({
      method: "POST",
      url: "/api/v1/cart/add",
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      },
      data: {
        foodItemId: food.id,
        foodVariantId: selectedVariantId,
        quantity: 1,
      },
    });

    if (res.status === 200 || res.status === 201) {
      // Fetch updated cart
      const cartRes = await axiosWithRefresh({
        method: "GET",
        url: "/api/v1/cart",
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });

      if (Array.isArray(cartRes.data.items)) {
        setCartFromBackend(cartRes.data.items);
        localStorage.setItem("localCart", JSON.stringify(cartRes.data.items));
      }

      toast.success(`${food.name} is placed in a cart.`);
      setJustAdded?.(true);
      setTimeout(() => setJustAdded?.(false), 1200);
      return true;
    } else {
      toast.error("Failed to add item to cart.");
      return false;
    }
  } catch (err) {
    toast.error("Failed to add to cart.");
    return false;
  } finally {
    setButtonDisabled?.(false);
  }
};
