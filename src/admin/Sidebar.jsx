import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  HomeIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  TruckIcon,
  RectangleGroupIcon,
  CurrencyRupeeIcon,
  BanknotesIcon,
  BellIcon,
  AdjustmentsHorizontalIcon,
  PlusIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const menuSections = [
  {
    label: "Dashboard",
    icon: <HomeIcon className="h-5 w-5" />,
    to: "/admin/dashboard",
  },
  {
    label: "Agents",
    icon: <TruckIcon className="h-5 w-5" />,
    children: [
      {
        to: "/admin/delivery-agents",
        label: "Agent Verification",
        icon: <TruckIcon className="h-5 w-5" />,
      },
      {
        to: "/admin/approved-agents",
        label: "Approved Agents",
        icon: <UsersIcon className="h-5 w-5" />,
      },
    ],
  },
  {
    label: "Users",
    icon: <UsersIcon className="h-5 w-5" />,
    to: "/admin/users",
  },
  {
    label: "Menu Management",
    icon: <RectangleGroupIcon className="h-5 w-5" />,
    children: [
      {
        to: "/admin/categories",
        label: "Manage Categories",
        icon: <RectangleGroupIcon className="h-5 w-5" />,
      },
      {
        to: "/admin/add-category",
        label: "Add Category",
        icon: <PlusIcon className="h-5 w-5" />,
      },
      {
        to: "/admin/foods",
        label: "Manage Menu Items",
        icon: <ClipboardDocumentListIcon className="h-5 w-5" />,
      },
      {
        to: "/admin/add-food",
        label: "Add Food",
        icon: <PlusIcon className="h-5 w-5" />,
      },
      {
        to: "/admin/manage-variants",
        label: "Manage Variants",
        icon: <AdjustmentsHorizontalIcon className="h-5 w-5" />,
      },
    ],
  },
  {
    label: "Order Management",
    icon: <ClipboardDocumentListIcon className="h-5 w-5" />,
    children: [
      {
        to: "/admin/orders",
        label: "Manage Orders",
        icon: <ClipboardDocumentListIcon className="h-5 w-5" />,
      },
      {
        to: "/admin/assign-agent",
        label: "Assign Agent",
        icon: <TruckIcon className="h-5 w-5" />,
      },
    ],
  },
  {
    label: "Earnings & Salaries",
    icon: <CurrencyRupeeIcon className="h-5 w-5" />,
    children: [
      {
        to: "/admin/earnings",
        label: "Agent Earnings",
        icon: <CurrencyRupeeIcon className="h-5 w-5" />,
      },
      {
        to: "/admin/salaries",
        label: "Agent Salaries",
        icon: <BanknotesIcon className="h-5 w-5" />,
      },
    ],
  },
  {
    label: "Notifications",
    icon: <BellIcon className="h-5 w-5" />,
    to: "/admin/notifications",
  },
];

const Sidebar = () => {
  const location = useLocation();
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (label) => {
    setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white flex flex-col shadow-lg overflow-y-auto">
      <div className="px-6 py-4 text-2xl font-bold tracking-tight border-b border-gray-800 flex-shrink-0 sticky top-0 bg-gray-900 z-10">
        Admin Panel
      </div>
      <nav className="flex-1 overflow-y-auto px-2 py-4">
        {menuSections.map((section) => {
          if (section.children) {
            const isActive = section.children.some((child) =>
              location.pathname.startsWith(child.to)
            );
            return (
              <div key={section.label}>
                <button
                  onClick={() => toggleSection(section.label)}
                  className={`flex items-center w-full px-4 py-3 rounded font-medium transition-colors duration-150 ${
                    isActive
                      ? "bg-orange-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-orange-400"
                  }`}
                >
                  <span className="mr-3">{section.icon}</span>
                  {section.label}
                  <span className="ml-auto">
                    {openSections[section.label] || isActive ? (
                      <ChevronDownIcon className="h-4 w-4" />
                    ) : (
                      <ChevronRightIcon className="h-4 w-4" />
                    )}
                  </span>
                </button>
                {(openSections[section.label] || isActive) && (
                  <div className="ml-6 mt-1">
                    {section.children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        end
                        className={({ isActive }) =>
                          `flex items-center px-4 py-2 rounded font-medium transition-colors duration-150 ${
                            isActive
                              ? "bg-orange-600 text-white"
                              : "text-gray-300 hover:bg-gray-800 hover:text-orange-400"
                          }`
                        }
                      >
                        <span className="mr-2">{child.icon}</span>
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <NavLink
              key={section.to}
              to={section.to}
              end
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded font-medium transition-colors duration-150 ${
                  isActive
                    ? "bg-orange-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-orange-400"
                }`
              }
            >
              <span className="mr-3">{section.icon}</span>
              {section.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
