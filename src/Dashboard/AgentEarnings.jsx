import { motion } from "framer-motion";

const earnings = [
  {
    id: 1,
    agent: "Aayam Regmi",
    amount: "Rs. 5,200",
    status: "Pending",
  },
  {
    id: 2,
    agent: "Arun Bhandari",
    amount: "Rs. 3,400",
    status: "Notified",
  },
];

const AgentEarnings = () => {
  return (
    <motion.div
      className="mb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold mb-4 text-orange-500">
        Agent Earnings (COD)
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="py-2 px-4 text-left">SN</th>
              <th className="py-2 px-4 text-left">Agent</th>
              <th className="py-2 px-4 text-left">Amount</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {earnings.map((e, idx) => (
              <tr key={e.id} className="border-b hover:bg-orange-50 transition">
                <td className="py-2 px-4">{idx + 1}</td>
                <td className="py-2 px-4">{e.agent}</td>
                <td className="py-2 px-4">{e.amount}</td>
                <td className="py-2 px-4">{e.status}</td>
                <td className="py-2 px-4">
                  <button className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 transition">
                    Notify
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

export default AgentEarnings;
