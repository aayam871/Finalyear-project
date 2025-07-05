import React from "react";
import { useCartStore } from "./cartStore";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";


const stripePromise = loadStripe("pk_test_YourStripePublishableKey");

const Cart = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCartStore();

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      const stripe = await stripePromise;

     
      const amountInCents = getTotal() * 100;

     
      const response = await axios.post(
        "https://8e9f-103-167-232-13.ngrok-free.app/api/v1/create-checkout-session",
        { amount: amountInCents }
      );

      const sessionId = response.data.id;

      
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error("Stripe checkout error:", error);
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to initiate payment. Please try again.");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-serif text-orange-800 font-semibold ">
          Cart is empty !!
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <h2 className="text-3xl font-bold mb-6 text-orange-600">Your Cart</h2>

      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white rounded-lg shadow-md p-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={`https://d5f9-103-167-232-191.ngrok-free.app/uploads/images/foodItemImages/${item.imageUrl}`}
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
          onClick={handleCheckout}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-semibold transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
