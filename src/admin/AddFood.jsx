import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosWithRefresh } from "../axiosWithRefresh";

const API_BASE_URL = "https://5aeb0071168a.ngrok-free.app";

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

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.accessToken;

  // Fetch categories safely
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/public/foodCategories`);
        console.log("categories fetched:", res.data);
        setCategories(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        toast.error("Failed to load categories.");
        setCategories([]);
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
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));

      await axiosWithRefresh({
        method: "post",
        url: "/api/v1/admin/addFoodItem",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
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
    }
    setLoading(false);
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
            {Array.isArray(categories) && categories.length > 0 ? (
              categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
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
