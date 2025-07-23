import React, { useEffect, useState } from "react";
import { axiosWithRefresh } from "../../axiosWithRefresh";

const AgentList = ({ onViewDetails }) => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    setLoading(true);
    try {
      const res = await axiosWithRefresh({
        method: "get",
        url: "/api/v1/admin/pending-agents",
      });
      setAgents(res.data || []);
    } catch (err) {
      setAgents([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Agent Verification Panel</h2>

      {loading ? (
        <p>Loading agents...</p>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="min-w-full table-auto divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "#", "First Name", "Last Name", "User Name", "Email",
                  "Registered At", "Status", "Actions"
                ].map((heading, idx) => (
                  <th
                    key={idx}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {agents.map((agent, idx) => (
                <tr key={agent.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{idx + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{agent.firstName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{agent.lastName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{agent.userName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{agent.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{agent.registeredAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        agent.status === "verified"
                          ? "bg-green-100 text-green-700"
                          : agent.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {agent.status || "pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => onViewDetails(agent)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {agents.length === 0 && (
            <p className="text-center py-4 text-gray-500">No agents found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AgentList;
