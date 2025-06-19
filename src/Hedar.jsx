import React, { useState } from "react";
 import { Bell, UserCircle, LogOut, ChevronDown } from "lucide-react";
 import icon from "./images/icon.jpeg";
 const Hedar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
      {/* Search */}
      <input
        type="text"
        placeholder="Search here.."
        className="px-4 py-2 border border-gray-300 rounded-md w-1/2 focus:outline-none focus:ring focus:border-blue-300"
      />

      {/* Right section */}
      <div className="flex items-center gap-4 relative">
        <Bell className="text-gray-600 cursor-pointer" />
        {/* Profile Icon */}
        <div className="relative flex items-center">
          <img
            src={icon}
            alt="profile"
            className="w-8 h-8 rounded-full cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Hedar;
