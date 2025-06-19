import { motion } from "framer-motion";

const users = [
  {
    id: 1,
    name: "Krishna Bista",
    email: "krishna@example.com",
    status: "Active",
  },
  {
    id: 2,
    name: "Sneha Bhandari",
    email: "sneha@example.com",
    status: "Blocked",
  },
];

const UsersManagement = () => {
  return (
    <motion.div
      className="mb-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <h2 className="text-xl font-semibold mb-4 text-orange-500">
        Users Management
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="py-2 px-4 text-left">SN</th>
              <th className="py-2 px-4 text-left">User Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className="border-b hover:bg-orange-50 transition duration-200"
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.status}</td>
                <td className="py-2 px-4">
                  <button
                    className={`${
                      user.status === "Blocked"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    } text-white px-3 py-1 rounded transition`}
                  >
                    {user.status === "Blocked" ? "Unblock" : "Block"}
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

export default UsersManagement;
