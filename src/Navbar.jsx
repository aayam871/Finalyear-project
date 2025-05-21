import React from "react";
import { Link } from "react-router-dom";
import logo from "./images/QuickBites_Logo_Transparent.png";

const Navbar = () => {
  return (
    <nav className="bg-orange-400 text-gray-900 shadow-md px-4 py-0 sticky top-0 z-50">
      <div className="flex items-center justify-between h-20">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <img
            src={logo}
            alt="QuickBites Logo"
            className="h-16 drop-shadow-md"
          />
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-12 font-semibold text-lg">
          <li>
            <Link
              to="/"
              className="hover:text-orange-800 hover:underline  transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/menu"
              className="hover:text-orange-800 hover:underline transition-colors duration-300"
            >
              Menu
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-orange-800 hover:underline transition-colors duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-orange-800 hover:underline transition-colors duration-300 "
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Login Button */}
        <div className="ml-2">
          <Link
            to="/login"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full text-base font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
          >
          Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
