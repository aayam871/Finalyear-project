import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const SuccessPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
    <CheckCircle size={72} className="text-green-600 mb-4" />
    <h2 className="text-3xl font-bold text-green-700">Payment Successful</h2>
    <p className="text-gray-600 mt-2 mb-6">Thank you for your order!</p>
    <Link
      to="/"
      className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
    >
      Return to Homepage
    </Link>
  </div>
);

export default SuccessPage;
