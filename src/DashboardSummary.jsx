import React from "react";
import { useMenuStore } from "./menuStore";

const DashboardSummary = () => {
  const items = useMenuStore((state) => state.items);

  const totalItems = items.length;
  const totalCategories = [...new Set(items.map((item) => item.category))]
    .length;
  const avgPrice =
    items.reduce((acc, item) => acc + item.price, 0) / totalItems || 0;

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-orange-600">
        Dashboard Summary
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="bg-orange-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold">{totalItems}</h3>
          <p className="text-sm text-gray-600">Total Menu Items</p>
        </div>
        <div className="bg-orange-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold">{totalCategories}</h3>
          <p className="text-sm text-gray-600">Categories</p>
        </div>
        <div className="bg-orange-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold">Rs. {avgPrice.toFixed(2)}</h3>
          <p className="text-sm text-gray-600">Average Price</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
