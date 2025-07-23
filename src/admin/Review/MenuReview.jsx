import React, { useEffect, useState } from "react";
import { axiosWithRefresh } from "../../axiosWithRefresh";

const MenuReview = () => {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [catRes, foodRes, varRes] = await Promise.all([
        axiosWithRefresh({ method: "get", url: "/api/v1/admin/foodCategory" }),
        axiosWithRefresh({ method: "get", url: "/api/v1/admin/foodItems" }),
        axiosWithRefresh({ method: "get", url: "/api/v1/admin/foodVariant" }),
      ]);
      setCategories(catRes.data.foodCategories || []);
      setFoods(foodRes.data.foodItems || []);
      setVariants(varRes.data.foodVariants || []);
    } catch {
      setCategories([]); setFoods([]); setVariants([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm(`Delete this ${type}?`)) return;
    let url = "";
    if (type === "category") url = `/api/v1/admin/foodCategory/${id}`;
    if (type === "food") url = `/api/v1/admin/foodItems/${id}`;
    if (type === "variant") url = `/api/v1/admin/foodVariant/${id}`;
    try {
      await axiosWithRefresh({ method: "delete", url });
      fetchAll();
    } catch {
      alert(`Failed to delete ${type}.`);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Categories</h2>
        {loading ? <p>Loading...</p> : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map(cat => (
                <tr key={cat.id}>
                  <td className="px-6 py-4">{cat.name}</td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button onClick={() => handleDelete("category", cat.id)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Menu Items</h2>
        {loading ? <p>Loading...</p> : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {foods.map(food => (
                <tr key={food.id}>
                  <td className="px-6 py-4">{food.name}</td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button onClick={() => handleDelete("food", food.id)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Variants</h2>
        {loading ? <p>Loading...</p> : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {variants.map(variant => (
                <tr key={variant.id}>
                  <td className="px-6 py-4">{variant.name}</td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button onClick={() => handleDelete("variant", variant.id)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MenuReview;
