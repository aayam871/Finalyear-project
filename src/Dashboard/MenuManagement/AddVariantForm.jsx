import { useState } from "react";

const categories = ["Pizza", "Burger", "Chinese", "Soup", "Drinks"]; // replace with actual categories list

const AddVariantForm = () => {
  const [category, setCategory] = useState(categories[0]);
  const [variantName, setVariantName] = useState("");
  const [priceModifier, setPriceModifier] = useState("");
  const [active, setActive] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Added variant "${variantName}" for category ${category} with price modifier ${priceModifier}`
    );
    // API or state update here
  };

  return (
    <form className="bg-white p-6 rounded shadow mb-8" onSubmit={handleSubmit}>
      <h3 className="text-orange-500 text-xl mb-4 font-semibold">
        Add Variant
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
        placeholder="Variant Name (e.g., Large)"
        className="w-full border border-gray-300 rounded p-2 mb-3"
        value={variantName}
        onChange={(e) => setVariantName(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Price Modifier (e.g., 200)"
        className="w-full border border-gray-300 rounded p-2 mb-3"
        value={priceModifier}
        onChange={(e) => setPriceModifier(e.target.value)}
        required
      />

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
        Add Variant
      </button>
    </form>
  );
};

export default AddVariantForm;
