import React, { useEffect, useState } from "react";
import axios from "axios";

const DeliveryAgents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAgents = async () => {
    try {
      const res = await axios.get(
        "https://8e9f-103-167-232-13.ngrok-free.app/api/v1/admin/pending-agents"
      );
      console.log("Backend response data:", res.data);
      setAgents(
        (res.data ?? []).filter(
          (agent) => agent.otpverified === true && agent.adminApproved === false
        )
      );
    } catch (error) {
      console.error("Error fetching agents", error);
      setAgents([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, action) => {
    try {
      const url =
        action === "verified"
          ? `https://8e9f-103-167-232-13.ngrok-free.app/api/v1/admin/approve-agent/${id}`
          : `https://8e9f-103-167-232-13.ngrok-free.app/api/v1/admin/reject-agent/${id}`;

      await axios.post(url);

      // Remove the agent from the list after approval/rejection
      setAgents((prev) => prev.filter((agent) => agent.id !== id));
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  useEffect(() => {
    fetchAgents();
    const interval = setInterval(fetchAgents, 10000); // every 10 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-orange-800 mb-6">
        Delivery Agents Status
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : Array.isArray(agents) && agents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white border p-4 rounded shadow hover:shadow-md transition"
            >
              <p className="text-lg font-semibold">{agent.userName}</p>
              <p className="text-sm text-gray-600">{agent.email}</p>
              <span
                className={`inline-block mt-2 px-3 py-1 text-xs rounded-full font-medium ${getStatusBadge(
                  "pending"
                )}`}
              >
                pending
              </span>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => updateStatus(agent.id, "verified")}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() => updateStatus(agent.id, "rejected")}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No pending agents found.</p>
      )}
    </div>
  );
};

export default DeliveryAgents;
