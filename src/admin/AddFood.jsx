import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = "https://8e9f-103-167-232-13.ngrok-free.app";

const AddFood = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token"); 

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));

    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/api/v1/admin/addFoodItem`, data, {
        headers: {
          Authorization: `Bearer ${token}`, 
          "ngrok-skip-browser-warning": "true",
        },
      });
      setMessage("✅ Food item added successfully!");
      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        image: null,
      });
    } catch (err) {
      console.error("Failed to add food item", err);
      setMessage("❌ Failed to add food item. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow space-y-5">
      <h2 className="text-2xl font-bold text-orange-600">Add New Food Item</h2>

      {message && (
        <div className="text-sm p-2 rounded bg-yellow-100 border border-yellow-300 text-gray-800">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Food Name</label>
          <input
            name="name"
            type="text"
            value={form.name}
            placeholder="e.g. Chicken Momo"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            placeholder="e.g. Delicious steamed dumplings..."
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price (NPR)</label>
          <input
            name="price"
            type="number"
            value={form.price}
            placeholder="e.g. 120"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            name="category"
            type="text"
            value={form.category}
            placeholder="e.g. Momo"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Food Image</label>
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
            required
          />
          {form.image && (
            <p className="text-sm mt-1 text-gray-500">
              Selected: {form.image.name}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Add Food Item"}
        </button>
      </form>
    </div>
  );
};

export default AddFood;
