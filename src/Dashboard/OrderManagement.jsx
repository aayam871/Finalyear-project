import { motion } from "framer-motion";

const orders = [
  {
    id: 1,
    customer: "Ram Shrestha",
    address: "Butwal-11, Kalikanagar",
    payMethod: "COD",
    total: "Rs. 1,250",
    date: "2025-06-19",
    status: "Pending",
  },
  {
    id: 2,
    customer: "Anisha Gurung",
    address: "Bhairahawa-4",
    payMethod: "Khalti",
    total: "Rs. 890",
    date: "2025-06-18",
    status: "Delivered",
  },
];

const agents = ["Select", "Aayam Regmi", "Arun Bhandari"];

const OrderManagement = () => {
  return (
    <motion.div
      className="mb-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold mb-4 text-orange-500">
        Order Management
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="py-2 px-4 text-left">SN</th>
              <th className="py-2 px-4 text-left">Customer</th>
              <th className="py-2 px-4 text-left">Address</th>
              <th className="py-2 px-4 text-left">Payment</th>
              <th className="py-2 px-4 text-left">Total</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Assign Agent</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className="border-b hover:bg-orange-50 transition"
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{order.customer}</td>
                <td className="py-2 px-4">{order.address}</td>
                <td className="py-2 px-4">{order.payMethod}</td>
                <td className="py-2 px-4">{order.total}</td>
                <td className="py-2 px-4">{order.date}</td>
                <td className="py-2 px-4">{order.status}</td>
                <td className="py-2 px-4">
                  <select className="border rounded px-2 py-1 text-sm">
                    {agents.map((agent, idx) => (
                      <option key={idx}>{agent}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default OrderManagement;
