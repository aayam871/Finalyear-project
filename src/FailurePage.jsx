import React from "react";
import { Link } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";

const FailurePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-rose-100 to-white p-6">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center border border-red-200">
        <FaTimesCircle className="text-red-500 mx-auto mb-5 text-6xl" />
        <h2 className="text-3xl font-semibold text-red-700 mb-3">
          Payment Unsuccessful
        </h2>
        <p className="text-gray-700 text-base mb-3 leading-relaxed">
          Unfortunately, we couldn’t process your payment. <br />
          Please check your payment method and try again.
        </p>
        <p className="text-gray-500 text-sm mb-6">
          If the issue persists, feel free to contact our support.
        </p>
        <Link
          to="/cart"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-medium tracking-wide transition duration-300 shadow-sm"
        >
          Retry Payment
        </Link>
      </div>
    </div>
  );
};

export default FailurePage;
