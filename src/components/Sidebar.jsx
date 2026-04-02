import { FaChartPie, FaExchangeAlt, FaLightbulb, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";

const Sidebar = () => {
  const [active, setActive] = useState("dashboard");

  const menu = [
    { name: "dashboard", icon: <FaChartPie />, label: "Dashboard" },
    { name: "transactions", icon: <FaExchangeAlt />, label: "Transactions" },
    { name: "insights", icon: <FaLightbulb />, label: "Insights" },
    { name: "settings", icon: <FaCog />, label: "Settings" },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-64 
    bg-gradient-to-b from-gray-900 to-gray-800 
    text-white p-5 flex flex-col justify-between">

      {/* 🔝 Top Section */}
      <div>

        {/* 🏷️ Logo */}
        <h1 className="text-2xl font-bold mb-8">Finance</h1>

        {/* 👤 Profile Section (NEW) */}
        <div className="flex items-center gap-3 mb-8 p-3 rounded-lg bg-white/5">
          <img
            src="photo.jpg"
            alt="user"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">Sanskriti Srivastava</p>
            <p className="text-xs text-gray-400">sanskriti@gmail.com</p>
          </div>
        </div>

        {/* 📋 Menu */}
        <ul className="space-y-3">
          {menu.map((item) => (
            <li
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all
                ${
                  active === item.name
                    ? "bg-blue-500 shadow-lg scale-105"
                    : "hover:bg-gray-700"
                }`}
            >
              {item.icon}
              {item.label}
            </li>
          ))}
        </ul>

      </div>

      {/* 🔻 Bottom Section (Logout) */}
      <div>
        <button className="flex items-center gap-3 p-3 w-full rounded-lg 
        hover:bg-red-500 transition">
          <FaSignOutAlt />
          Logout
        </button>
      </div>

    </div>
  );
};

export default Sidebar;