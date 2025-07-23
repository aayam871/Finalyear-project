import React, { useState, useEffect } from "react";
import { axiosWithRefresh } from "../axiosWithRefresh";

const AssignedOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosWithRefresh({ method: "get", url: "/agent/history" });
        if (res.data.status === "success" && res.data.data) {
          setOrders(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching assigned orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Assigned Orders</h2>
      <div className="bg-white rounded shadow p-4">
        {orders.length === 0 && <div>No assigned orders available.</div>}
        {orders.map((order) => (
          <div key={order.orderId} className="flex justify-between items-center border-b py-2">
            <div>
              <div className="font-semibold">Order #{order.orderId}</div>
              <div className="text-gray-600 text-sm">{order.customerName} - {order.deliveryAddress}</div>
              <div className="text-gray-600 text-sm">Total: Rs.{order.totalAmount}</div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-1 rounded">Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignedOrders;
