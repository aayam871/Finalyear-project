import React from "react";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import { useMenuStore } from "./menuStore";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const categories = ["All", "Pizza", "Burger", "Chinese", "Soup", "Drinks"];

const Menu = () => {
  const items = useMenuStore((state) => state.items);
  const selectedCategory = useMenuStore((state) => state.selectedCategory);
  const setCategory = useMenuStore((state) => state.setCategory);
  const searchTerm = useMenuStore((state) => state.searchTerm);
  const isLoggedIn = useMenuStore((state) => state.isLoggedIn);
  const setIsLoggedIn = useMenuStore((state) => state.setIsLoggedIn);

  const filteredItems = React.useMemo(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().startsWith(lowerSearchTerm);
      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchTerm]);

  const handleOrderClick = (itemName) => {
    if (!isLoggedIn) {
      alert("Please login to order.");
      return;
    }
    alert(`Ordering ${itemName}`);
  };

  return (
    <>
      <div className="bg-gradient-to-br from-gray-500 via-orange-300 min-h-screen py-8 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <div className="text-center mb-10 md:mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold font-serif mb-3 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-black to-orange-600">
              Our Delicious Menu
            </h1>
            <p className="text-lg font-serif text-gray-900 max-w-xl mx-auto">
              Explore a variety of flavors crafted with the freshest
              ingredients.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-5 py-2.5 rounded-full font-semibold transition-all duration-300 ease-in-out transform focus:outline-none
                  ${
                    selectedCategory === cat
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg ring-2 ring-offset-2 ring-orange-400 scale-105"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-orange-100 hover:border-orange-400 hover:text-orange-700 hover:shadow-md active:scale-95"
                  }`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="mb-10 max-w-lg mx-auto">
            <SearchBar />
          </div>

          {/* Food Items */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col group transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5"
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-56 object-contain group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    />
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-orange-600 transition-colors duration-300">
                      {item.name}
                    </h3>
                    <p className="text-lg font-semibold text-red-600 mb-3">
                      Rs. {item.price}
                    </p>
                    {item.description && (
                      <p className="text-gray-500 text-sm mb-4 flex-grow min-h-[40px]">
                        {item.description.substring(0, 70)}
                        {item.description.length > 70 && "..."}
                      </p>
                    )}
                    <button
                      onClick={() => handleOrderClick(item.name)}
                      className="mt-auto w-full px-6 py-2.5 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center col-span-full py-16">
              <MagnifyingGlassIcon className="mx-auto h-16 w-16 text-orange-300" />
              <h3 className="mt-4 text-2xl font-semibold text-gray-700">
                No Items Found
              </h3>
              <p className="mt-2 text-md text-gray-500">
                Sorry, we couldn't find any items matching your selection.
                <br />
                Try a different category or search term.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Menu;
