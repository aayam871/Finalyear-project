import React, { useEffect, useState } from "react";
import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));
const token = user?.accessToken;

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `https://8e9f-103-167-232-13.ngrok-free.app/api/v1/orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("orders response data:", res.data);
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setOrders([]); // fallback to empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="orders-page">
      <h2>Your Orders</h2>
      {Array.isArray(orders) && orders.length === 0 && (
        <p>You have no orders yet.</p>
      )}
      {Array.isArray(orders) && orders.length > 0
        ? orders.map((order) => (
            <div key={order.orderId} className="order-card">
              <h3>Order #{order.orderId}</h3>
              <p>Total: ${order.totalAmount}</p>
              <p>Placed: {new Date(order.createdAt).toLocaleString()}</p>
              <ul>
                {order.items.map((item) => (
                  <li key={item.itemId}>
                    {item.quantity}× {item.foodName}
                    {item.variantName ? ` (${item.variantName})` : ""} — $
                    {item.priceAtPurchase}
                  </li>
                ))}
              </ul>
              <hr />
            </div>
          ))
        : null}
    </div>
  );
};

export default OrdersPage;
