import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/delivery-agent/dashboard", label: "Dashboard" },
  { to: "/delivery-agent/assigned-orders", label: "Assigned Orders" },
  { to: "/delivery-agent/order-history", label: "Order History" },
  { to: "/delivery-agent/cod-management", label: "COD Money Management" },
  { to: "/delivery-agent/map-navigation", label: "Map Navigation" },
];

const Sidebar = () => (
  <aside className="fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white flex flex-col shadow-lg overflow-y-auto">
    <div className="px-6 py-4 text-2xl font-bold tracking-tight border-b border-gray-800 flex-shrink-0 sticky top-0 bg-gray-900 z-10">
      Delivery Agent
    </div>
    <nav className="flex-1 overflow-y-auto px-2 py-4">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `block px-4 py-3 rounded font-medium transition-colors duration-150 ${
              isActive
                ? "bg-orange-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-orange-400"
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default Sidebar;
