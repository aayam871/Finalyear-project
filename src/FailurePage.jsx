import React from "react";
import { Link } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";

const FailurePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <FaTimesCircle className="text-red-500 text-6xl mb-4" />
      <h2 className="text-2xl font-bold text-red-700 mb-2">Payment Failed</h2>
      <p className="mb-6">Please try again.</p>
      <Link
        to="/cart"
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
      >
        Retry
      </Link>
    </div>
  );
};

export default FailurePage;
