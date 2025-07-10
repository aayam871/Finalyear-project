import React, { useState, useEffect, useMemo } from "react";
import { useCartStore } from "./cartStore";
import { useMenuStore } from "./menuStore";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

// Fix leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const BASE_URL = "https://5aeb0071168a.ngrok-free.app";

const CartSkeleton = () => (
  <div className="flex items-center justify-between bg-white rounded-xl shadow-md p-5 animate-pulse">
    <div className="flex items-center gap-5">
      <div className="w-20 h-20 bg-gray-200 rounded-md" />
      <div className="space-y-2">
        <div className="h-4 w-36 bg-gray-300 rounded-md" />
        <div className="h-3 w-28 bg-gray-300 rounded-md" />
        <div className="h-3 w-20 bg-gray-300 rounded-md" />
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div className="w-9 h-9 bg-gray-200 rounded-full" />
      <div className="w-6 h-4 bg-gray-300 rounded-md" />
      <div className="w-9 h-9 bg-gray-200 rounded-full" />
    </div>
  </div>
);

const mapCartItems = (backendItems, foods) => {
  return backendItems.map((item) => {
    let matchedFoodItem = null;
    let matchedVariant = null;

    for (const food of foods) {
      const variant = food.foodVariants.find(
        (v) => v.name === item.variantName
      );
      if (variant && food.name === item.foodName) {
        matchedFoodItem = food;
        matchedVariant = variant;
        break;
      }
    }

    return {
      ...item,
      foodVariantId: matchedVariant?.id || 0,
      imageUrl: matchedFoodItem?.imageUrl || "",
    };
  });
};

const Cart = () => {
  const { cart, setCartFromBackend } = useCartStore();
  const { cachedFoods } = useMenuStore();
  const navigate = useNavigate();

  const [isCartLoading, setIsCartLoading] = useState(true);
  const [modifyingItemId, setModifyingItemId] = useState(null);
  const [clearingCart, setClearingCart] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);

  const [showCheckout, setShowCheckout] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [latLng, setLatLng] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  // Fetch cart on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?.accessToken) {
          setIsCartLoading(false);
          return;
        }
        const res = await fetch(`${BASE_URL}/api/v1/cart`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            "ngrok-skip-browser-warning": "true",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch cart");

        const data = await res.json();
        if (data?.items && cachedFoods.length > 0) {
          const mappedItems = mapCartItems(data.items, cachedFoods);
          setCartFromBackend(mappedItems);
          localStorage.setItem("localCart", JSON.stringify(mappedItems));
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setIsCartLoading(false);
      }
    };
    fetchCart();
  }, [cachedFoods]); // eslint-disable-line react-hooks/exhaustive-deps

  const total = useMemo(
    () =>
      cart.reduce((sum, item) => {
        return sum + item.unitPrice * item.quantity;
      }, 0),
    [cart]
  );

  const modifyCartItem = async (
    item,
    increment = true,
    directRemove = false
  ) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.accessToken) {
        toast.error("Please login to modify cart");
        return;
      }

      setModifyingItemId(item.id);

      if (directRemove) {
        // Directly remove the item
        const res = await fetch(`${BASE_URL}/api/v1/cart/remove/${item.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            "ngrok-skip-browser-warning": "true",
          },
        });
        if (!res.ok) throw new Error("Failed to delete cart item");
      } else {
        // Update quantity (never allow < 1)
        const newQuantity = increment ? item.quantity + 1 : item.quantity - 1;
        if (newQuantity < 1) return;

        const res = await fetch(`${BASE_URL}/api/v1/cart/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify({ cartItemId: item.id, quantity: newQuantity }),
        });
        if (!res.ok) throw new Error("Failed to update cart item");
      }

      // Refresh cart after modification
      const cartRes = await fetch(`${BASE_URL}/api/v1/cart`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "ngrok-skip-browser-warning": "true",
        },
      });

      if (!cartRes.ok) throw new Error("Failed to refresh cart");

      const cartData = await cartRes.json();
      if (cartData?.items && cachedFoods.length > 0) {
        const mappedItems = mapCartItems(cartData.items, cachedFoods);
        setCartFromBackend(mappedItems);
      }
    } catch (error) {
      console.error("Error modifying cart item:", error);
      toast.error("Failed to update cart");
    } finally {
      setModifyingItemId(null);
    }
  };

  const clearCartHandler = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.accessToken) {
        toast.error("Please login to clear cart");
        return;
      }

      setClearingCart(true);

      const res = await fetch(`${BASE_URL}/api/v1/cart/clear`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "ngrok-skip-browser-warning": "true",
        },
      });

      if (!res.ok) throw new Error("Failed to clear cart");

      setCartFromBackend([]);
      toast.success("Cart cleared");
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Error while clearing cart");
    } finally {
      setClearingCart(false);
    }
  };

  const handleConfirmOrder = async () => {
    if (!phone || !address) {
      toast.error("Please complete shipping details");
      return;
    }

    try {
      setPlacingOrder(true);

      if (paymentMethod === "Online") {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await fetch(`${BASE_URL}/api/v1/create-checkout-session`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify({
            phone,
            address,
            items: cart.map(({ id, foodVariantId, quantity }) => ({
              foodItemId: id,
              foodVariantId,
              quantity,
            })),
          }),
        });

        if (!res.ok) {
          toast.error("Failed to initiate payment");
          setPlacingOrder(false);
          return;
        }

        const data = await res.json();
        if (data?.url) {
          window.location.href = data.url;
        } else {
          toast.error("Failed to initiate payment");
          setPlacingOrder(false);
        }
      } else {
        await clearCartHandler();
        setShowCheckout(false);
        navigate("/confirmation");
      }
    } catch (error) {
      console.error("Order failed:", error);
      toast.error("Order failed. Try again.");
      setPlacingOrder(false);
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        setLatLng({ lat, lng });

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
          );
          const data = await res.json();
          setAddress(data.display_name || "");
        } catch {
          toast.error("Failed to fetch address");
        }
      },
    });

    return latLng ? <Marker position={latLng} /> : null;
  };

  if (isCartLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 mt-10 space-y-6">
        {[...Array(3)].map((_, i) => (
          <CartSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-serif text-orange-800 font-semibold">
          Your cart is empty!
        </h2>
        <Toaster position="top-center" />
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" />
      <div className="max-w-4xl mx-auto p-6 mt-10">
        <h2 className="text-3xl font-bold mb-6 text-orange-600">Your Cart</h2>

        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={`${item.id}-${item.foodVariantId}`}
              className="flex items-center justify-between bg-white rounded-lg shadow-md p-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={`${BASE_URL}/uploads/images/foodItemImages/${item.imageUrl}`}
                  alt={item.foodName}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.foodName}</h3>
                  <p className="text-sm text-gray-500">
                    {item.variantName ? `Variant: ${item.variantName}` : ""}
                  </p>
                  <p className="text-sm text-gray-700 font-semibold">
                    Rs. {item.unitPrice}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  disabled={modifyingItemId === item.id}
                  onClick={
                    () =>
                      item.quantity === 1
                        ? modifyCartItem(item, true, true) // direct remove
                        : modifyCartItem(item, false) // decrement
                  }
                  className="p-2 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition"
                >
                  {item.quantity > 1 ? <FiMinus /> : <FiTrash2 />}
                </button>
                <span className="text-lg">{item.quantity}</span>
                <button
                  disabled={modifyingItemId === item.id}
                  onClick={() => modifyCartItem(item, true)}
                  className="p-2 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition"
                >
                  <FiPlus />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between items-center">
          <div className="text-xl font-semibold">Total: Rs. {total}</div>
          <button
            onClick={() => setShowCheckout(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-semibold transition"
          >
            Proceed to Checkout
          </button>
          <button
            disabled={clearingCart}
            onClick={clearCartHandler}
            className="ml-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-semibold transition"
          >
            {clearingCart ? "Clearing..." : "Clear Cart"}
          </button>
        </div>
      </div>

      {showCheckout && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setShowCheckout(false)}
        >
          <div
            className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-auto p-6 flex gap-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-1 flex flex-col gap-4">
              <h3 className="text-2xl text-orange-700 font-semibold mb-4">
                Enter Your Shipping Details
              </h3>

              <label className="font-semibold text-orange-500">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="border border-gray-300 rounded-md p-2"
              />

              <label className="font-semibold text-orange-500 mt-4">
                Payment Method
              </label>
              <div className="flex gap-6 mt-2">
                {["COD", "Online"].map((method) => (
                  <label
                    key={method}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={() => setPaymentMethod(method)}
                    />
                    {method === "COD" ? "Cash on Delivery" : "Online Payment"}
                  </label>
                ))}
              </div>

              <label className="font-semibold text-orange-500 mt-4">
                Address
              </label>
              <textarea
                readOnly
                value={address}
                rows={4}
                className="border border-gray-300 rounded-md p-2 resize-none"
                placeholder="Click on the map to select your address"
              />

              {latLng && (
                <div className="text-sm mt-2 text-gray-900">
                  <p>
                    <strong>Latitude:</strong> {latLng.lat.toFixed(6)}
                  </p>
                  <p>
                    <strong>Longitude:</strong> {latLng.lng.toFixed(6)}
                  </p>
                </div>
              )}

              <button
                disabled={placingOrder}
                onClick={handleConfirmOrder}
                className="mt-auto bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-semibold transition"
              >
                {placingOrder
                  ? "Placing Order..."
                  : paymentMethod === "Online"
                  ? "Confirm Order & Pay"
                  : "Confirm and Place your order"}
              </button>
            </div>

            <div className="flex-1 h-[400px] rounded-md overflow-hidden">
              <MapContainer
                center={[27.700769, 83.448904]}
                zoom={13}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
              </MapContainer>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
