import React from "react";
import Navbar from "./Navbar";        // Make sure path is correct
import SearchBar from "./SearchBar";  // Make sure path is correct
import { useMenuStore, getFilteredItems } from "./menuStore";

const categories = ["All", "Pizza", "Burger", "Chinese", "Soup", "Drinks"];

const Menu = () => {
  const selectedCategory = useMenuStore((state) => state.selectedCategory);
  const setCategory = useMenuStore((state) => state.setCategory);
  const filteredItems = getFilteredItems();

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-3xl font-extrabold mb-4 text-orange-600 text-center">
          Our Menu
        </h2>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full border font-semibold transition duration-200 ${
                selectedCategory === cat
                  ? "bg-orange-500 text-white"
                  : "bg-orange-100 text-orange-700 border-orange-300 hover:bg-orange-200"
              }`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <SearchBar />

        {/* Food Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center transition-transform duration-300 hover:scale-105 border border-orange-100"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-contain rounded-xl mb-3"
                />
                <h3 className="text-xl font-semibold text-orange-600 text-center">
                  {item.name}
                </h3>
                <p className="text-gray-600 font-medium">Rs. {item.price}</p>
                <button className="mt-3 px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition duration-200">
                  Order Now
                </button>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500">No items found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Menu;
