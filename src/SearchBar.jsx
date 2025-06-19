import React from "react";
import { useMenuStore } from "./menuStore";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";

const SearchBar = () => {
  const searchTerm = useMenuStore((state) => state.searchTerm);
  const setSearchTerm = useMenuStore((state) => state.setSearchTerm);

  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-2xl shadow-xl rounded-full overflow-hidden bg-white border border-orange-300 focus-within:ring-2 focus-within:ring-orange-400 transition-all duration-200">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search your craving..."
          className="flex-grow px-6 py-3 text-lg text-gray-800 placeholder-gray-400 focus:outline-none rounded-l-full"
        />

        {searchTerm && (
          <button
            onClick={handleClear}
            className="px-3 text-gray-400 hover:text-red-500 focus:outline-none"
            title="Clear"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        )}

        {/* Search Icon Button */}
        <div className="px-5 py-3 bg-orange-500 text-white rounded-r-full flex items-center justify-center hover:bg-orange-600 transition">
          <MagnifyingGlassIcon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
