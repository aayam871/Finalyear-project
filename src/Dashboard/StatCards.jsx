import { motion } from "framer-motion";

const stats = [
  { label: "Total Users", value: 1050 },
  { label: "Active Agents", value: 45 },
  { label: "Daily Order Value", value: "Rs. 25,000" },
  { label: "Monthly Order Value", value: "Rs. 7,45,000" },
];

const StatCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="bg-white p-5 shadow rounded-xl border-l-4 border-orange-500"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <p className="text-sm text-gray-500">{stat.label}</p>
          <h2 className="text-2xl font-semibold text-gray-800 mt-1">
            {stat.value}
          </h2>
        </motion.div>
      ))}
    </div>
  );
};

export default StatCards;
