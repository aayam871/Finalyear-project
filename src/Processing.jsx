import React from "react";

const Processing = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 px-4 text-center">
      <h1 className="text-3xl font-bold text-yellow-700 mb-4">
        Account Pending Approval
      </h1>
      <p className="text-gray-800 max-w-md">
        Your registration is complete, but your account is still awaiting admin
        approval. <br /> You will receive an email notification once your
        account is verified. Please check back later.
      </p>
    </div>
  );
};

export default Processing;
