import React from "react";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
      <div className="text-xl font-semibold text-orange-500">
        Restaurant Staff Dashboard
      </div>
      <div className="relative">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 hover:text-red-500"
        >
          <FaUserCircle className="text-2xl" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
