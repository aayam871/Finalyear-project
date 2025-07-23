import React from "react";

const OrderDetailsModal = ({ open, onClose, order }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h3 className="text-xl font-bold mb-4">Order Details</h3>
        <div className="mb-2">
          <span className="font-semibold">Order ID:</span> {order?.id || "#12345"}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Customer:</span> {order?.customer || "John Doe"}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Address:</span> {order?.address || "123 Main St"}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Items:</span>
          <ul className="list-disc ml-6">
            {(order?.items || ["Burger", "Fries"]).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="mb-2">
          <span className="font-semibold">Status:</span> {order?.status || "Assigned"}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal; 