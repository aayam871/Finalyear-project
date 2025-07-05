import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "https://8e9f-103-167-232-13.ngrok-free.app";

const ManageVariants = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editId, setEditId] = useState(null);
  const [selectedFoodItemId, setSelectedFoodItemId] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchFoodItemsWithVariants();
  }, []);

  const fetchFoodItemsWithVariants = () => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/public/foodItems`, {
        headers: { "ngrok-skip-browser-warning": "true" },
      })
      .then((res) => {
        setFoodItems(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load food items");
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !price || !selectedFoodItemId) {
      alert("Please fill all fields");
      return;
    }

    const payload = {
      name: name.trim(),
      price: parseFloat(price),
      foodItemId: parseInt(selectedFoodItemId),
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "true",
    };

    const request = editId
      ? axios.put(
          `${API_BASE_URL}/api/v1/admin/foodVariant/${editId}`,
          payload,
          { headers }
        )
      : axios.post(`${API_BASE_URL}/api/v1/admin/addFoodVariant`, payload, {
          headers,
        });

    request
      .then(() => {
        alert(editId ? "Variant updated" : "Variant added");
        resetForm();
        fetchFoodItemsWithVariants();
      })
      .catch(() => alert("Failed to save variant"));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this variant?"))
      return;

    axios
      .delete(`${API_BASE_URL}/api/v1/admin/foodVariant/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      })
      .then(() => {
        alert("Variant deleted");
        fetchFoodItemsWithVariants();
      })
      .catch(() => alert("Failed to delete variant"));
  };

  const handleEdit = (variant, foodItemId) => {
    console.log("Editing variant:", variant);
    console.log("Food item id:", foodItemId);

    setName(variant.name);
    setPrice(variant.price.toString());
    setEditId(variant.id);
    setSelectedFoodItemId(foodItemId.toString());
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setEditId(null);
    setSelectedFoodItemId("");
  };

  if (loading) return <p className="p-6">Loading variants...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-orange-800 mb-6">
        Manage Food Variants
      </h2>

      <form
        onSubmit={handleSubmit}
        className="mb-8 space-y-4 bg-white p-6 rounded shadow"
      >
        <div>
          <label className="block font-medium mb-1" htmlFor="foodItem">
            Food Item
          </label>
          <select
            id="foodItem"
            className="w-full border rounded px-3 py-2"
            value={selectedFoodItemId}
            onChange={(e) => setSelectedFoodItemId(e.target.value)}
            required
          >
            <option value="" disabled>
              Select food item
            </option>
            {foodItems.map((fi) => (
              <option key={fi.id} value={fi.id.toString()}>
                {fi.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="name">
            Variant Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full border rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Large, Extra Cheese"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="price">
            Price
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            className="w-full border rounded px-3 py-2"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g. 50"
            required
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded"
          >
            {editId ? "Update Variant" : "Add Variant"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      
      <div className="space-y-8">
        {foodItems.length === 0 ? (
          <p>No food items found.</p>
        ) : (
          foodItems.map((foodItem) => (
            <div key={foodItem.id}>
              <h3 className="text-xl font-semibold mb-3">{foodItem.name}</h3>
              {foodItem.foodVariants && foodItem.foodVariants.length > 0 ? (
                foodItem.foodVariants.map((variant) => (
                  <div
                    key={variant.id}
                    className="bg-white border p-4 rounded shadow flex justify-between items-center mb-2"
                  >
                    <div>
                      <p className="font-semibold">{variant.name}</p>
                      <p className="text-sm text-gray-600">
                        Price: ₹{variant.price}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(variant, foodItem.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(variant.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">No variants found</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageVariants;
