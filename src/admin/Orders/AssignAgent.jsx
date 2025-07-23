import React, { useEffect, useState } from "react";
import { axiosWithRefresh } from "../../axiosWithRefresh";

// Dummy Hungarian Algorithm for demonstration
function hungarianAlgorithm(orders, agents) {
  // For demo: assign first available agent to each order
  const assignments = [];
  let agentIdx = 0;
  for (let i = 0; i < orders.length; i++) {
    assignments.push({ orderId: orders[i].id, agentId: agents[agentIdx % agents.length]?.id });
    agentIdx++;
  }
  return assignments;
}

const AssignAgent = () => {
  const [orders, setOrders] = useState([]);
  const [agents, setAgents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ordersRes, agentsRes] = await Promise.all([
        axiosWithRefresh({ method: "get", url: "/api/v1/admin/orders?status=pending" }),
        axiosWithRefresh({ method: "get", url: "/api/v1/admin/pending-agents" }),
      ]);
      setOrders(ordersRes.data.orders || []);
      setAgents((agentsRes.data.agents || []).filter(a => a.status === "verified"));
    } catch {
      setOrders([]);
      setAgents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async () => {
    if (!orders.length || !agents.length) return;
    const result = hungarianAlgorithm(orders, agents);
    try {
      await Promise.all(
        result.map(({ orderId, agentId }) =>
          axiosWithRefresh({ method: "put", url: `/api/v1/admin/assign-order/${orderId}`, data: { agentId } })
        )
      );
      setSuccess("Orders assigned to agents successfully.");
      fetchData();
    } catch {
      setSuccess("");
      alert("Failed to assign orders.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Assign Delivery Agent</h2>
      {loading ? (
        <p>Loading orders and agents...</p>
      ) : (
        <>
          <div className="mb-4">
            <button
              onClick={handleAssign}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              disabled={!orders.length || !agents.length}
            >
              Assign Orders to Agents
            </button>
            {success && <span className="ml-4 text-green-600">{success}</span>}
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.customerName || order.customer?.name || "-"}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {orders.length === 0 && <p className="text-center py-4 text-gray-500">No pending orders found.</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default AssignAgent;
