import { motion } from "framer-motion";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const SummaryCard = ({ title, amount, color, icon, growth }) => {
  const isPositive = growth >= 0;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`relative p-6 rounded-2xl text-white 
      bg-gradient-to-r ${color}
      shadow-xl shadow-black/10 overflow-hidden`}
    >
      {/* Glow */}
      <div className="absolute inset-0 opacity-20 bg-white blur-2xl"></div>

      {/* Top */}
      <div className="flex justify-between items-center relative z-10">
        <h3 className="text-sm opacity-80">{title}</h3>
        <div className="text-xl">{icon}</div>
      </div>

      {/* Amount */}
      <h1 className="text-3xl font-bold mt-4 relative z-10">
        ₹{amount}
      </h1>

      {/* Growth */}
      <div className="flex items-center gap-2 mt-2 text-xs relative z-10">
        {isPositive ? (
          <FaArrowUp className="text-green-200" />
        ) : (
          <FaArrowDown className="text-red-200" />
        )}

        <span>
          {growth.toFixed(1)}% from last month
        </span>
      </div>
    </motion.div>
  );
};

export default SummaryCard;