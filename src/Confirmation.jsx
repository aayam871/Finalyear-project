import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const Confirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-400 via-orange-500 to-yellow-300 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center border border-orange-200">
        <CheckCircle className="text-amber-600 mx-auto mb-5" size={56} />
        <h1 className="text-3xl font-semibold text-orange-800 mb-3">
          Your Order Has Been Placed!
        </h1>
        <p className="text-gray-700 text-base mb-3 leading-relaxed">
          Thank you for choosing us. Our kitchen is preparing your meal with
          care, and a delivery agent will be on the way shortly.
        </p>
        <p className="text-gray-500 text-sm mb-6">
          Please ensure your phone is reachable for any delivery updates.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-lg font-medium tracking-wide transition duration-300 shadow-sm"
        >
          Return to Homepage
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
