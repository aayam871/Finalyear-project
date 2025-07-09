import React, { useState } from "react";
import { useCartStore } from "./cartStore";
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

const Cart = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCartStore();
  const navigate = useNavigate();

  const [showCheckout, setShowCheckout] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [latLng, setLatLng] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD"); // COD default

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleProceed = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setShowCheckout(true);
  };

  const handleConfirmOrder = async () => {
    if (!phone) {
      toast.error("Please enter your phone number");
      return;
    }
    if (!address) {
      toast.error("Please select your address on the map");
      return;
    }

    if (paymentMethod === "Online") {
      const userData = JSON.parse(localStorage.getItem("user"));
      const token = userData?.accessToken;

      if (!token) {
        toast.error("Please login to continue");
        return;
      }

      try {
        const response = await fetch(
          "https://8e9f-103-167-232-13.ngrok-free.app/api/v1/create-checkout-session",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              phone,
              address,
              items: cart.map((item) => ({
                foodItemId: item.id,
                variantId: item.variantId || null,
                quantity: item.quantity,
              })),
            }),
          }
        );

        const data = await response.json();

        if (data.url) {
          window.location.href = data.url; 
        } else {
          toast.error("Failed to initiate payment. Please try again.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Checkout process failed. Please try again.");
      }
    } else {
   
      clearCart();
      setShowCheckout(false);
      navigate("/confirmation"); 
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
        } catch (error) {
          toast.error("Failed to get address from map");
        }
      },
    });

    return latLng === null ? null : <Marker position={latLng}></Marker>;
  };

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
      <div className="max-w-4xl mx-auto p-6 mt-10 relative">
        <h2 className="text-3xl font-bold mb-6 text-orange-600">Your Cart</h2>

        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white rounded-lg shadow-md p-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={`https://8e9f-103-167-232-13.ngrok-free.app/uploads/images/foodItemImages/${item.imageUrl}`}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500">Rs. {item.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition"
                >
                  {item.quantity > 1 ? <FiMinus /> : <FiTrash2 />}
                </button>

                <span className="text-lg font-medium text-gray-800">
                  {item.quantity}
                </span>

                <button
                  onClick={() => addToCart(item)}
                  className="p-2 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition"
                >
                  <FiPlus />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between items-center">
          <div className="text-xl font-semibold text-gray-800">
            Total: Rs. {getTotal()}
          </div>
          <button
            onClick={handleProceed}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-semibold transition"
          >
            Proceed to Checkout
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

            
              <div className="mt-4">
                <label className="font-semibold text-orange-500">
                  Payment Method
                </label>
                <div className="flex gap-6 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={paymentMethod === "COD"}
                      onChange={() => setPaymentMethod("COD")}
                      className="cursor-pointer"
                    />
                    COD (Cash on Delivery)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Online"
                      checked={paymentMethod === "Online"}
                      onChange={() => setPaymentMethod("Online")}
                      className="cursor-pointer"
                    />
                    Online Payment
                  </label>
                </div>
              </div>

          
              <label className="font-semibold text-orange-500 mt-4">
                Address
              </label>
              <textarea
                value={address}
                readOnly
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
                onClick={handleConfirmOrder}
                className="mt-auto bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-semibold transition"
              >
                {paymentMethod === "Online"
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
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
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
