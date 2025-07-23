import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "https://519862b3b376.ngrok-free.app";

export const addToCartHandler = async ({
  food,
  selectedVariantId,
  setJustAdded,
  setButtonDisabled,
  setCartFromBackend,
}) => {
  const userData = localStorage.getItem("user");
  if (!userData) {
    toast.error("You must be logged in to add items to the cart.");
    return;
  }

  setButtonDisabled(true);

  try {
    const user = JSON.parse(userData);
    const token = user.accessToken;
    if (!token) {
      toast.error("Please login again.");
      setButtonDisabled(false);
      return;
    }

    if (!selectedVariantId) {
      toast.error("Please select a variant.");
      setButtonDisabled(false);
      return;
    }

    const response = await axios.post(
      `${BASE_URL}/api/v1/cart/add`,
      {
        foodItemId: food.id,
        foodVariantId: selectedVariantId,
        quantity: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      toast.success(`${food.name} has been added to the cart.`);
      setJustAdded(true);

      const cartRes = await axios.get(`${BASE_URL}/api/v1/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });

      if (Array.isArray(cartRes.data.items)) {
        setCartFromBackend(cartRes.data.items);
      }

      setTimeout(() => {
        setJustAdded(false);
        setButtonDisabled(false);
      }, 2000);
    } else {
      toast.error("Failed to add item to cart");
      setButtonDisabled(false);
    }
  } catch (error) {
    console.error("Add to cart error:", error);
    toast.error("Error adding to cart");
    setButtonDisabled(false);
  }
};