import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "https://8e9f-103-167-232-13.ngrok-free.app";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    imageFile: null,
    imageUrl: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/public/foodCategories`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });
      const data = Array.isArray(res.data) ? res.data : res.data.data || [];
      const updated = data.map((cat) => ({
        ...cat,
        isActive: cat.isActive ?? true,
      }));
      setCategories(updated);
    } catch (err) {
      console.error("Error loading categories:", err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      await axios.patch(
        `${API_BASE_URL}/api/v1/admin/foodCategory/${id}`,
        { isActive: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === id ? { ...cat, isActive: !currentStatus } : cat
        )
      );
    } catch (err) {
      console.error("Status update failed", err);
      alert("Failed to update category status.");
    }
  };

  const startEditing = (category) => {
    setEditingId(category.id);
    setEditForm({
      name: category.name || "",
      description: category.description || "",
      imageFile: null,
      imageUrl: category.imageUrl || "",
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({ name: "", description: "", imageFile: null, imageUrl: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files?.[0]) {
      setEditForm((prev) => ({
        ...prev,
        imageFile: e.target.files[0],
        imageUrl: URL.createObjectURL(e.target.files[0]),
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

      await axios.patch(
        `${API_BASE_URL}/api/v1/admin/foodCategory/${editingId}`,
        {
          name: editForm.name,
          description: editForm.description,
          imageUrl: updatedImageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingId
            ? {
                ...cat,
                name: editForm.name,
                description: editForm.description,
                imageUrl: updatedImageUrl,
              }
            : cat
        )
      );
      cancelEditing();
    } catch (err) {
      console.error("Failed to save edits", err);
      alert("Update failed. Try again.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/v1/admin/foodCategory/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      if (editingId === id) cancelEditing();
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete category.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-orange-800 mb-6">
        Manage Food Categories
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.length > 0 ? (
            categories.map((category) =>
              editingId === category.id ? (
                <div
                  key={category.id}
                  className="p-4 border rounded bg-white shadow"
                >
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
                    Change Image:
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
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
                      onClick={() => handleDelete(category.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  key={category.id}
                  className="p-4 border rounded bg-white shadow text-center"
                >
                  <img
                    src={`${API_BASE_URL}/uploads/images/foodCategoryImages/${category.imageUrl}`}
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/150")
                    }
                    alt={category.name}
                    className="h-32 w-full object-cover mb-2 rounded"
                  />
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                  <p className="text-sm text-gray-700 mb-1">
                    {category.description}
                  </p>
                  <p
                    className={`text-xs font-medium mb-2 ${
                      category.isActive ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    Status: {category.isActive ? "Active" : "Inactive"}
                  </p>
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() =>
                        toggleStatus(category.id, category.isActive)
                      }
                      className={`px-3 py-1 rounded text-white ${
                        category.isActive
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {category.isActive ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      onClick={() => startEditing(category)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              )
            )
          ) : (
            <p className="text-gray-500 col-span-3">No categories found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
