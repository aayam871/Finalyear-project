import { motion } from "framer-motion";

const agents = [
  {
    id: 1,
    name: "Aayam Regmi",
    email: "aayam@example.com",
    status: "Pending",
  },
  {
    id: 2,
    name: "Arun Bhandari",
    email: "arun@example.com",
    status: "Verified",
  },
  {
    id: 3,
    name: "Amrit Bhattarai",
    email: "amrit@example.com",
    status: "Rejected",
  },
];

const AgentVerification = () => {
  return (
    <motion.div
      className="mb-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-xl font-semibold mb-4 text-orange-500">
        Verify New Agents
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="py-2 px-4 text-left">SN.</th>
              <th className="py-2 px-4 text-left">Agent Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent, index) => (
              <tr
                key={agent.id}
                className="border-b hover:bg-orange-50 transition duration-200"
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{agent.name}</td>
                <td className="py-2 px-4">{agent.email}</td>
                <td className="py-2 px-4">{agent.status}</td>
                <td className="py-2 px-4">
                  <button className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 transition">
                    Details
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

export default AgentVerification;
