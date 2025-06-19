import { useState } from "react";
import { motion } from "framer-motion";
import { menuItems } from "../menuData";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

const tabs = ["Menu Items", "Categories", "Variants", "AddOns"];

const FoodItemManagement = () => {
  const [activeTab, setActiveTab] = useState("Menu Items");

  const groupedByCategory = menuItems.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const handleEdit = (item) => {
    alert(`Edit clicked for ${item.name}`);
  };

  const handleDelete = (item) => {
    const confirm = window.confirm(`Are you sure to delete ${item.name}?`);
    if (confirm) {
      alert(`Deleted ${item.name}`);
    }
  };

  return (
    <motion.div
      className="mb-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold mb-4 text-orange-500">
        Food Item Management
      </h2>

      {/* Tab Menu */}
      <div className="flex gap-4 mb-6 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full font-medium transition
              ${
                activeTab === tab
                  ? "bg-orange-500 text-white shadow-md scale-105"
                  : "bg-gray-200 text-gray-700 hover:bg-orange-100"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white shadow rounded-xl p-6">
        {activeTab === "Menu Items" && (
          <div className="space-y-8">
            {Object.keys(groupedByCategory).map((category) => (
              <div key={category}>
                <h3 className="text-lg font-bold text-orange-600 mb-2">
                  {category}
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-orange-100 text-gray-700">
                      <tr>
                        <th className="px-4 py-2 text-left">Image</th>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Price</th>
                        <th className="px-4 py-2 text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupedByCategory[category].map((item) => (
                        <tr
                          key={item.id}
                          className="border-b hover:bg-orange-50 transition"
                        >
                          <td className="px-4 py-2">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                          </td>
                          <td className="px-4 py-2">{item.name}</td>
                          <td className="px-4 py-2">Rs. {item.price}</td>
                          <td className="px-4 py-2">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEdit(item)}
                                className="text-orange-600 hover:text-orange-800"
                              >
                                <PencilSquareIcon className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleDelete(item)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <TrashIcon className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab !== "Menu Items" && (
          <div className="text-center text-gray-500 py-20">
            <p className="text-md">{activeTab} management coming soon...</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FoodItemManagement;
