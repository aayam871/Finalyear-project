import { motion } from "framer-motion";

const salaries = [
  {
    id: 1,
    agent: "Aayam Regmi",
    salary: "Rs. 10,000",
    month: "June 2025",
    status: "Paid",
  },
  {
    id: 2,
    agent: "Arun Bhandari",
    salary: "Rs. 10,000",
    month: "June 2025",
    status: "Unpaid",
  },
];

const AgentSalaries = () => {
  return (
    <motion.div
      className="mb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold mb-4 text-orange-500">
        Manage Agent Salaries
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="py-2 px-4 text-left">SN</th>
              <th className="py-2 px-4 text-left">Agent</th>
              <th className="py-2 px-4 text-left">Salary</th>
              <th className="py-2 px-4 text-left">Month</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {salaries.map((item, idx) => (
              <tr
                key={item.id}
                className="border-b hover:bg-orange-50 transition"
              >
                <td className="py-2 px-4">{idx + 1}</td>
                <td className="py-2 px-4">{item.agent}</td>
                <td className="py-2 px-4">{item.salary}</td>
                <td className="py-2 px-4">{item.month}</td>
                <td className="py-2 px-4">{item.status}</td>
                <td className="py-2 px-4">
                  <button className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 transition">
                    {item.status === "Paid" ? "✓" : "Pay"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default AgentSalaries;
