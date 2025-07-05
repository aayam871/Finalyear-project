import React, { useState } from "react";

const hardcodedAgents = [
  {
    id: 1,
    username: "Aakash Rayamajhi",
    email: "aakash@example.com",
    status: "pending",
  },
  {
    id: 2,
    username: "Prabesh Aryal",
    email: "prabesh@example.com",
    status: "pending",
  },
  {
    id: 3,
    username: "Nirmal Pandey",
    email: "nirmal@example.com",
    status: "verified",
  },
  {
    id: 4,
    username: "Bimal Ghimire",
    email: "bimal@example.com",
    status: "rejected",
  },
];

const DeliveryAgents = () => {
  const [agents, setAgents] = useState(hardcodedAgents);

  const updateStatus = (id, newStatus) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === id ? { ...agent, status: newStatus } : agent
      )
    );
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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-orange-800 mb-6">
        Delivery Agents Status
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="bg-white border p-4 rounded shadow hover:shadow-md transition"
          >
            <p className="text-lg font-semibold">{agent.username}</p>
            <p className="text-sm text-gray-600">{agent.email}</p>
            <span
              className={`inline-block mt-2 px-3 py-1 text-xs rounded-full font-medium ${getStatusBadge(
                agent.status
              )}`}
            >
              {agent.status}
            </span>

            {agent.status === "pending" && (
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryAgents;
