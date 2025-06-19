import React, { useState } from "react";
import { useMenuStore } from "./menuStore";

const AddItemForm = () => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
  });

  const items = useMenuStore((state) => state.items);
  const setItems = useMenuStore.setState;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.price) return;

    const newItem = {
      id: items.length + 1,
      name: form.name,
      category: form.category,
      price: Number(form.price),
      image: "", // Optionally set a placeholder or leave empty
    };

    setItems((prev) => ({ items: [...prev.items, newItem] }));
    setForm({ name: "", category: "", price: "" });
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-orange-600">Add New Item</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="Item Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border border-gray-300 p-2 rounded"
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border border-gray-300 p-2 rounded"
        />
        <input
          type="number"
          placeholder="Price (Rs.)"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border border-gray-300 p-2 rounded"
        />
        <button
          type="submit"
          className="bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItemForm;
