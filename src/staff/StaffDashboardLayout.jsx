import React, { useState, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import icon from "../images/icon.jpeg";
import logo from "../images/QuickBites_Logo_Transparent1.png";
import { staffLogout } from "./staffAPI";

export default function StaffDashboardLayout() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = async () => {
    try {
      await staffLogout();
    } catch (e) {
      
    }
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      
      <header className="flex items-center justify-between bg-white shadow px-8 py-4 sticky top-0 z-30">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="h-12 w-auto drop-shadow-md" />
          <span className="text-2xl font-bold text-orange-500 tracking-tight">
            Restaurant Staff Dashboard
          </span>
        </div>
        <div className="flex items-center space-x-6">
          <div className="relative" ref={dropdownRef}>
            <img
              src={icon}
              alt="Profile"
              className="h-11 w-11 rounded-full border-2 border-blue-500 cursor-pointer shadow-md hover:shadow-lg transition"
              onClick={() => setDropdownOpen((v) => !v)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg p-3 w-48 z-50 animate-fade-in">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 px-3 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-md font-medium"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1 p-6 overflow-y-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}
