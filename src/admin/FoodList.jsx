import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "https://8e9f-103-167-232-13.ngrok-free.app";

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageFile: null,
    imageUrl: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/public/foodItems`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });
      const data = Array.isArray(res.data) ? res.data : res.data.data || [];
      setFoods(data);
    } catch (err) {
      console.error("Error loading food items", err);
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (food) => {
    setEditingId(food.id);
    setEditForm({
      name: food.name || "",
      description: food.description || "",
      price: food.price || "",
      category: food.category?.name || "",
      imageFile: null,
      imageUrl: food.imageUrl || "",
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({
      name: "",
      description: "",
      price: "",
      category: "",
      imageFile: null,
      imageUrl: "",
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setEditForm((prev) => ({
        ...prev,
        imageFile: files[0],
        imageUrl: URL.createObjectURL(files[0]),
      }));
    } else {
      setEditForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const saveEdits = async () => {
    try {
      let updatedImageUrl = editForm.imageUrl;

      if (editForm.imageFile) {
        const formData = new FormData();
        formData.append("file", editForm.imageFile);

        const uploadRes = await axios.post(
          `${API_BASE_URL}/api/v1/admin/upload`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
        updatedImageUrl = uploadRes.data.imageUrl;
      }

      await axios.put(
        `${API_BASE_URL}/api/v1/admin/foodItem/${editingId}`,
        {
          name: editForm.name,
          description: editForm.description,
          price: editForm.price,
          category: editForm.category,
          imageUrl: updatedImageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      setFoods((prev) =>
        prev.map((food) =>
          food.id === editingId
            ? {
                ...food,
                name: editForm.name,
                description: editForm.description,
                price: editForm.price,
                category: { name: editForm.category },
                imageUrl: updatedImageUrl,
              }
            : food
        )
      );
      cancelEditing();
    } catch (err) {
      console.error("Failed to save edits", err);
      alert("Update failed. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this food item?"))
      return;

    try {
      await axios.delete(`${API_BASE_URL}/api/v1/admin/foodItem/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });
      setFoods((prev) => prev.filter((f) => f.id !== id));
      if (editingId === id) cancelEditing();
    } catch (err) {
      console.error("Failed to delete food item", err);
      alert("Failed to delete food item. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-orange-800 mb-6">
        Manage Food Items
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading food items...</p>
      ) : foods.length === 0 ? (
        <p className="text-gray-500">No food items found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {foods.map((food) =>
            editingId === food.id ? (
              <div key={food.id} className="p-4 border rounded bg-white shadow">
                <label className="block mb-2">
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleChange}
                    className="w-full border px-2 py-1 rounded mt-1"
                  />
                </label>
                <label className="block mb-2">
                  Description:
                  <textarea
                    name="description"
                    value={editForm.description}
                    onChange={handleChange}
                    className="w-full border px-2 py-1 rounded mt-1"
                  />
                </label>
                <label className="block mb-2">
                  Price (NPR):
                  <input
                    type="number"
                    name="price"
                    value={editForm.price}
                    onChange={handleChange}
                    className="w-full border px-2 py-1 rounded mt-1"
                  />
                </label>
                <label className="block mb-2">
                  Category:
                  <input
                    type="text"
                    name="category"
                    value={editForm.category}
                    onChange={handleChange}
                    className="w-full border px-2 py-1 rounded mt-1"
                  />
                </label>
                <label className="block mb-2">
                  Change Image:
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full mt-1"
                  />
                </label>
                {editForm.imageUrl && (
                  <img
                    src={editForm.imageUrl}
                    alt="Preview"
                    className="h-32 w-full object-cover mb-2 rounded"
                  />
                )}
                <div className="flex gap-2 justify-center mt-3">
                  <button
                    onClick={saveEdits}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(food.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div
                key={food.id}
                className="p-4 border rounded bg-white shadow-sm hover:shadow-md transition"
              >
                <img
                  src={`${API_BASE_URL}/uploads/images/foodItemImages/${food.imageUrl}`}
                  alt={food.name}
                  className="h-32 w-full object-cover mb-2 rounded"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />
                <h3 className="text-lg font-semibold">{food.name}</h3>
                <p className="text-sm text-gray-700">{food.description}</p>
                <p className="text-xs text-gray-600 mt-1 italic">
                  Category: {food.category?.name || "N/A"}
                </p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => startEditing(food)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(food.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default FoodList;
