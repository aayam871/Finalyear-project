import React, { useEffect, useState } from "react";
import { axiosWithRefresh } from "../../axiosWithRefresh";

const AgentSalaries = () => {
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchSalaries();
  }, []);

  const fetchSalaries = async () => {
    setLoading(true);
    try {
      // Replace with your real endpoint if available
      const res = await axiosWithRefresh({ method: "get", url: "/api/v1/admin/agent-salaries" });
      setSalaries(res.data.salaries || []);
    } catch {
      setSalaries([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkPaid = async (salaryId) => {
    try {
      await axiosWithRefresh({ method: "put", url: `/api/v1/admin/agent-salaries/${salaryId}/mark-paid` });
      setSuccess("Salary marked as paid.");
      fetchSalaries();
      setTimeout(() => setSuccess(""), 2000);
    } catch {
      setSuccess("");
      alert("Failed to mark as paid.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Agent Salaries</h2>
      {loading ? (
        <p>Loading salaries...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {salaries.map((salary) => (
                <tr key={salary.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{salary.agentName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{salary.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">NPR {salary.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      salary.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {salary.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {salary.status !== "paid" && (
                      <button
                        onClick={() => handleMarkPaid(salary.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Mark as Paid
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {salaries.length === 0 && <p className="text-center py-4 text-gray-500">No salary records found.</p>}
        </div>
      )}
      {success && <div className="text-green-600 mt-4">{success}</div>}
    </div>
  );
};

export default AgentSalaries;
