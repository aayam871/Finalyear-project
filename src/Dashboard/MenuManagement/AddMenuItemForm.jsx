import { useState } from "react";

const categories = ["Pizza", "Burger", "Chinese", "Soup", "Drinks"]; // you can import or fetch from data

const AddMenuItemForm = () => {
  const [category, setCategory] = useState(categories[0]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [dietaryTags, setDietaryTags] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableUntil, setAvailableUntil] = useState("");
  const [active, setActive] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Added menu item: ${name} under ${category}`);
    // API or state update here
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-8">
      <h3 className="text-orange-500 text-xl mb-4 font-semibold">
        Add Menu Item
      </h3>

      <select
        className="w-full border border-gray-300 rounded p-2 mb-3"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        {categories.map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Menu Item Name"
        className="w-full border border-gray-300 rounded p-2 mb-3"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <textarea
        placeholder="Description (optional)"
        className="w-full border border-gray-300 rounded p-2 mb-3"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="number"
        placeholder="Base Price"
        className="w-full border border-gray-300 rounded p-2 mb-3"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <input
        type="url"
        placeholder="Image URL (optional)"
        className="w-full border border-gray-300 rounded p-2 mb-3"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <input
        type="text"
        placeholder="Dietary Tags (comma separated)"
        className="w-full border border-gray-300 rounded p-2 mb-3"
        value={dietaryTags}
        onChange={(e) => setDietaryTags(e.target.value)}
      />

      <div className="flex gap-3 mb-3">
        <input
          type="time"
          placeholder="Available From"
          className="w-1/2 border border-gray-300 rounded p-2"
          value={availableFrom}
          onChange={(e) => setAvailableFrom(e.target.value)}
        />
        <input
          type="time"
          placeholder="Available Until"
          className="w-1/2 border border-gray-300 rounded p-2"
          value={availableUntil}
          onChange={(e) => setAvailableUntil(e.target.value)}
        />
      </div>

      <label className="inline-flex items-center mb-4 cursor-pointer">
        <input
          type="checkbox"
          checked={active}
          onChange={() => setActive(!active)}
          className="form-checkbox h-5 w-5 text-orange-500"
        />
        <span className="ml-2 text-gray-700">Active</span>
      </label>

      <button
        type="submit"
        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
      >
        Add Menu Item
      </button>
    </form>
  );
};

export default AddMenuItemForm;
