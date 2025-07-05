import { NavLink } from "react-router-dom";
import {
  PlusIcon,
  ClipboardDocumentListIcon,
  SquaresPlusIcon,
  RectangleGroupIcon,
  UsersIcon,
  TruckIcon,
  Cog6ToothIcon, 
} from "@heroicons/react/24/outline";

const links = [
  {
    to: "/admin/add-food",
    label: "Add Food",
    icon: <PlusIcon className="h-5 w-5" />,
  },
  {
    to: "/admin/foods",
    label: "Manage Foods",
    icon: <ClipboardDocumentListIcon className="h-5 w-5" />,
  },
  {
    to: "/admin/add-category",
    label: "Add Category",
    icon: <SquaresPlusIcon className="h-5 w-5" />,
  },
  {
    to: "/admin/categories",
    label: "Manage Categories",
    icon: <RectangleGroupIcon className="h-5 w-5" />,
  },
  {
    to: "/admin/manage-variants",
    label: "Manage Variants",
    icon: <Cog6ToothIcon className="h-5 w-5" />, 
  },
  {
    to: "/admin/customers",
    label: "Customers",
    icon: <UsersIcon className="h-5 w-5" />,
  },
  {
    to: "/admin/delivery-agents",
    label: "Delivery Agents",
    icon: <TruckIcon className="h-5 w-5" />,
  },
];

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen sticky top-0 bg-orange-100 p-6 border-r border-orange-200">
      <h2 className="text-2xl font-bold text-orange-700 mb-6">Admin Panel</h2>
      <nav>
        <ul className="space-y-3">
          {links.map(({ to, label, icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                    isActive
                      ? "bg-orange-300 text-orange-900 font-semibold"
                      : "hover:bg-orange-200 text-orange-700"
                  }`
                }
              >
                {icon}
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
