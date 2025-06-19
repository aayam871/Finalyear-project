import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "./images/QuickBites_Logo_Transparent.png";
import icon from "./images/icon.jpeg";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Reload user from localStorage when route changes
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      setUser(null);
    }
  }, [location]);

  const isLoggedIn = !!user;
  const roles = user?.roles || [];
  const isAdmin = roles.includes("ROLE_ADMIN");
  const isCustomer = roles.includes("ROLE_CUSTOMER");
  const isAgent = roles.includes("ROLE_AGENT");

  const getHomeRoute = () => {
    if (isAdmin) return "/admin";
    if (isCustomer) return "/customer-home";
    if (isAgent) return "/delivery-home";
    return "/";
  };

  const navItems = [
    { to: getHomeRoute(), label: "Home" },
    { to: "/menu", label: "Menu" },
    { to: "/features", label: "About" },
    { to: "/contact", label: "Contact Us" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const handleHomeClick = (e, path) => {
    if (path === "/" && location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-orange-400 text-gray-900 shadow-md px-4 py-0 sticky top-0 z-50">
      <div className="flex items-center justify-between h-20">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <NavLink
            to={getHomeRoute()}
            onClick={(e) => handleHomeClick(e, getHomeRoute())}
          >
            <img
              src={logo}
              alt="QuickBites Logo"
              className="h-16 drop-shadow-md cursor-pointer"
            />
          </NavLink>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-12 font-semibold text-lg">
          {navItems.map(({ to, label }) => (
            <li key={to} className="relative">
              <NavLink
                to={to}
                onClick={(e) => handleHomeClick(e, to)}
                className={({ isActive }) =>
                  `transition-colors duration-300 ${
                    isActive ? "text-orange-800" : "hover:text-orange-800"
                  }`
                }
              >
                {({ isActive }) => (
                  <span className="relative">
                    {label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-orange-800 animate-scale-in origin-left" />
                    )}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Login / Profile */}
        <div className="ml-2 relative">
          {isLoggedIn ? (
            <div className="group relative">
              <img
                src={icon}
                alt="Profile"
                className="h-10 w-10 rounded-full cursor-pointer border-2 border-white"
              />
              <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-md p-3 w-48 hidden group-hover:block z-50">
                {isAdmin && (
                  <NavLink
                    to="/adashboard"
                    className="block py-2 px-3 hover:bg-orange-100 rounded-md"
                  >
                    Dashboard
                  </NavLink>
                )}
                {(isCustomer || isAgent) && (
                  <NavLink
                    to="/aorders"
                    className="block py-2 px-3 hover:bg-orange-100 rounded-md"
                  >
                    Orders
                  </NavLink>
                )}
                <NavLink
                  to="/aprofile"
                  className="block py-2 px-3 hover:bg-orange-100 rounded-md"
                >
                  My Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 px-3 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-md"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full text-base font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
