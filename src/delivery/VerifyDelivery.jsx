import React, { useState } from "react";

const VerifyDelivery = () => {
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState("");

  const handleVerify = () => {
    // TODO: Integrate with /api/v1/auth/verify-otp
    if (otp === "1234") {
      setStatus("OTP Verified!");
    } else {
      setStatus("Invalid OTP");
    }
  };

  return (
    <div className="bg-white rounded shadow p-4 max-w-sm mx-auto">
      <h3 className="text-lg font-semibold mb-2">Customer Delivery Verification</h3>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={e => setOtp(e.target.value)}
        className="border rounded px-3 py-2 w-full mb-2"
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        onClick={handleVerify}
      >
        Verify OTP
      </button>
      {status && <div className="mt-2 text-sm text-center">{status}</div>}
    </div>
  );
};

export default VerifyDelivery; 