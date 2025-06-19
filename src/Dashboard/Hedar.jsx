import { motion } from "framer-motion";

const Hedar = ({ title }) => {
  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-orange-500">{title}</h1>
      <div className="h-1 w-16 bg-orange-500 mt-2 rounded-full"></div>
    </motion.div>
  );
};

export default Hedar;
