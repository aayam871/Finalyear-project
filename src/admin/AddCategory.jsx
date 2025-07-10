import React, { useState } from "react";
import { axiosWithRefresh } from "../axiosWithRefresh";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (image) formData.append("image", image);
      await axiosWithRefresh({
        method: "post",
        url: "/api/v1/admin/addFoodCategory",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("✅ Category added successfully!");
      setName("");
      setImage(null);
    } catch (err) {
      console.error("Error adding category", err);
      setMessage("❌ Failed to add category. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow space-y-5">
      <h2 className="text-2xl font-bold text-orange-600">Add Food Category</h2>

      {message && (
        <div className="text-sm p-2 rounded bg-yellow-100 border border-yellow-300 text-gray-800">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Category Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Beverages"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Category Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full"
            required
          />
          {image && (
            <p className="text-sm mt-1 text-gray-500">Selected: {image.name}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
