import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = "https://8e9f-103-167-232-13.ngrok-free.app";

const AddFood = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/public/foodCategories`);
        setCategories(res.data?.categories || []);
      } catch (err) {
        toast.error("❌ Failed to load categories.");
      }
    };

    fetchCategories();
  }, []);

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
      toast.success("✅ Food item added successfully!");
      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        image: null,
      });
    } catch (err) {
      toast.error("❌ Failed to add food item. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow space-y-5">
      <h2 className="text-2xl font-bold text-orange-600">Add New Food Item</h2>

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
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white"
            required
          >
            <option value="" disabled>
              -- Select Category --
            </option>
            {categories.length > 0 ? (
              categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))
            ) : (
              <option disabled>Loading categories...</option>
            )}
          </select>
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

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddFood;
