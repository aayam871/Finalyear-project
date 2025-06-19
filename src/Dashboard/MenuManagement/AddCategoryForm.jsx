import { useState } from "react";

const AddCategoryForm = () => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [active, setActive] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Added category: ${categoryName}`);
    // Here you can add API or state update logic
  };

  return (
    <form className="bg-white p-6 rounded shadow mb-8" onSubmit={handleSubmit}>
      <h3 className="text-orange-500 text-xl mb-4 font-semibold">
        Add Category
      </h3>

      <input
        type="text"
        placeholder="Category Name (e.g. Pizza)"
        className="w-full border border-gray-300 rounded p-2 mb-3"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        required
      />

      <textarea
        placeholder="Description (optional)"
        className="w-full border border-gray-300 rounded p-2 mb-3"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="url"
        placeholder="Image URL (optional)"
        className="w-full border border-gray-300 rounded p-2 mb-3"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
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
        Add Category
      </button>
    </form>
  );
};

export default AddCategoryForm;
