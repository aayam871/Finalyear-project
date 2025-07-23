import React, { useEffect, useState } from "react";
import { axiosWithRefresh } from "../../axiosWithRefresh";

const AgentEarnings = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    setLoading(true);
    try {
      // Replace with your real endpoint if available
      const res = await axiosWithRefresh({ method: "get", url: "/api/v1/admin/agent-earnings" });
      setAgents(res.data.agents || []);
    } catch {
      setAgents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleNotify = async (agentId) => {
    try {
      await axiosWithRefresh({ method: "post", url: `/api/v1/admin/notify-agent/${agentId}` });
      setSuccess("Agent notified for settlement.");
      setTimeout(() => setSuccess(""), 2000);
    } catch {
      setSuccess("");
      alert("Failed to notify agent.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Agent Earnings & Payouts</h2>
      {loading ? (
        <p>Loading agent earnings...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deliveries</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pending Payment</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {agents.map((agent) => (
                <tr key={agent.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{agent.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{agent.deliveries}</td>
                  <td className="px-6 py-4 whitespace-nowrap">NPR {agent.pendingPayment}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleNotify(agent.id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Notify for Settlement
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {agents.length === 0 && <p className="text-center py-4 text-gray-500">No agent earnings found.</p>}
        </div>
      )}
      {success && <div className="text-green-600 mt-4">{success}</div>}
    </div>
  );
};

export default AgentEarnings;
