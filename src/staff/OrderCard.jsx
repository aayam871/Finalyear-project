import React from "react";

const OrderCard = ({ order, kitchenStatuses, onStatusChange }) => {
  const { orderId, items, kitchenStatus } = order;

  const handleChange = (e) => {
    const newStatus = e.target.value;
    if (newStatus !== kitchenStatus) {
      onStatusChange(orderId, newStatus);
    }
  };

  return (
    <div className="border p-4 mb-3 shadow rounded-md bg-white">
      <h3 className="text-xl font-semibold">🧾 Order ID: {orderId}</h3>
      <ul className="list-disc ml-5 my-2">
        {items.map((item, i) => (
          <li key={i}>
            {item.quantity} × {item.foodName} ({item.variantName})
          </li>
        ))}
      </ul>

      <div className="mt-2">
        <label htmlFor={`status-${orderId}`} className="mr-2 font-medium">
          Status:
        </label>
        <select
          id={`status-${orderId}`}
          value={kitchenStatus}
          onChange={handleChange}
          className="border rounded px-2 py-1"
          disabled={kitchenStatus === "READY"} 
        >
          {kitchenStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default OrderCard;
