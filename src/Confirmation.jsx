import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const Confirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
        <CheckCircle className="text-orange-500 mx-auto mb-4" size={48} />
        <h1 className="text-3xl font-bold text-orange-700 mb-2">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-700 text-base mb-4">
          Thank you for your order. <br /> Our delivery agent will reach you
          shortly.
        </p>
        <p className="text-gray-500 text-sm mb-6">
          Please keep your phone nearby and be ready to receive your food.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
