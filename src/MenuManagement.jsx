import React from "react";
import { useMenuStore } from "./menuStore";

const MenuManagement = () => {
  const items = useMenuStore((state) => state.items);

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-orange-600">
        Menu Management
      </h2>
      <table className="w-full table-auto text-left">
        <thead>
          <tr className="bg-orange-200 text-gray-700">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Price (Rs.)</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.category}</td>
              <td className="px-4 py-2">{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MenuManagement;
