import React, { useState, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import icon from "../images/icon.jpeg";
import logo from "../images/QuickBites_Logo_Transparent1.png";

import AdminProfileModal from "./AdminProfileModal";

export default function AdminDashboardLayout() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
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

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="ml-64 flex flex-col min-h-screen w-full">
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow px-8 py-4 sticky top-0 z-30">
          <div className="flex items-center space-x-4">
            <img
              src={logo}
              alt="QuickBites Logo"
              className="h-12 w-auto drop-shadow-md"
            />
            <span className="text-2xl font-bold text-orange-700 tracking-tight">
              Admin Dashboard
            </span>
          </div>
          <div className="flex items-center space-x-6">
            {/* You can add more header elements here if desired */}
            <div className="relative" ref={dropdownRef}>
              <img
                src={icon}
                alt="Profile"
                className="h-11 w-11 rounded-full border-2 border-orange-500 cursor-pointer shadow-md hover:shadow-lg transition"
                onClick={() => setDropdownOpen((v) => !v)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg p-3 w-48 z-50 animate-fade-in">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/admin/profile");
                    }}
                    className="block w-full text-left py-2 px-3 hover:bg-orange-100 rounded-md font-medium"
                  >
                    View Profile
                  </button>
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
        {/* Main content */}
        <div className="flex-1 p-6 overflow-y-auto w-full">
          <Outlet />
        </div>
        {/* Profile Modal removed: now handled as a full page route */}
      </main>
    </div>
  );
}
