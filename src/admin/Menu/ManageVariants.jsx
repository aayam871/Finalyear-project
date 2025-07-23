import React, { useEffect, useState } from "react";
import { axiosWithRefresh } from "../../axiosWithRefresh";

const ManageVariants = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editId, setEditId] = useState(null);
  const [selectedFoodItemId, setSelectedFoodItemId] = useState("");

  useEffect(() => {
    fetchFoodItemsWithVariants();
  }, []);

  const fetchFoodItemsWithVariants = async () => {
    setLoading(true);
    try {
      const res = await axiosWithRefresh({
        method: "get",
        url: "/public/foodItems",
      });
      setFoodItems(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("❌ Failed to fetch food items:", error);
      setFoodItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !price || !selectedFoodItemId) {
      alert("⚠️ Please fill in all fields.");
      return;
    }

    try {
      const payload = {
        name: name.trim(),
        price: parseFloat(price),
        foodItemId: parseInt(selectedFoodItemId),
      };

      if (editId) {
        // Update existing variant
        await axiosWithRefresh({
          method: "put",
          url: `/api/v1/admin/foodVariant/${editId}`,
          data: payload,
          headers: { "Content-Type": "application/json" },
        });
      } else {
        // Add new variant
        await axiosWithRefresh({
          method: "post",
          url: `/api/v1/admin/addFoodVariant`,
          data: payload,
          headers: { "Content-Type": "application/json" },
        });
      }

      resetForm();
      fetchFoodItemsWithVariants();
    } catch (error) {
      console.error("❌ Failed to save variant:", error);
      alert("❌ Failed to save variant");
    }
  };

  const handleEdit = (variant, foodItemId) => {
    setEditId(variant.id);
    setName(variant.name);
    setPrice(variant.price.toString());
    setSelectedFoodItemId(foodItemId.toString());
  };

  const handleDelete = async (variantId) => {
    if (!window.confirm("Are you sure you want to delete this variant?"))
      return;

    try {
      await axiosWithRefresh({
        method: "delete",
        url: `/api/v1/admin/foodVariant/${variantId}`,
      });
      fetchFoodItemsWithVariants();
    } catch (error) {
      console.error("❌ Failed to delete variant:", error);
      alert("❌ Failed to delete variant");
    }
  };

  const resetForm = () => {
    setEditId(null);
    setName("");
    setPrice("");
    setSelectedFoodItemId("");
  };

  return (
    <div className="space-y-10 p-6">
      {/* Form Section */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-red-600 mb-6">
          {editId ? "Edit Variant" : "Add New Variant"}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Food Item
              </label>
              <select
                value={selectedFoodItemId}
                onChange={(e) => setSelectedFoodItemId(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">-- Select Food --</option>
                {foodItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Variant Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Large, Medium"
                required
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (NPR)
              </label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g., 250"
                required
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="py-2 px-4 rounded-md border text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="py-2 px-6 rounded-md text-white bg-orange-600 hover:bg-orange-700"
            >
              {editId ? "Update Variant" : "Add Variant"}
            </button>
          </div>
        </form>
      </div>

      {/* Existing Variants List */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-red-600 mb-6">
          Existing Variants
        </h2>
        {loading ? (
          <p>Loading...</p>
        ) : foodItems.length === 0 ? (
          <p className="text-gray-500">No food items found.</p>
        ) : (
          foodItems.map((foodItem) => (
            <div key={foodItem.id} className="mb-6">
              <h3 className="text-lg font-semibold text-orange-500 mb-3">
                {foodItem.name}
              </h3>
              {foodItem.foodVariants && foodItem.foodVariants.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {foodItem.foodVariants.map((variant) => (
                    <li
                      key={variant.id}
                      className="py-3 flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {variant.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          NPR {variant.price}
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <button
                          onClick={() => handleEdit(variant, foodItem.id)}
                          className="text-sm text-indigo-600 hover:text-indigo-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(variant.id)}
                          className="text-sm text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 italic ml-4">
                  No variants for this item.
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageVariants;
