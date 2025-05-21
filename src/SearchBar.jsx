import React from "react";
import { useMenuStore } from "./menuStore";

const SearchBar = () => {
  const searchTerm = useMenuStore((state) => state.searchTerm);
  const setSearchTerm = useMenuStore((state) => state.setSearchTerm);

  const handleSearch = () => {
  
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className="flex justify-center mb-6">
      <div className="flex w-full max-w-md">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search your craving..."
          className="flex-grow px-4 py-2 rounded-l-full border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          onClick={handleSearch}
          className="px-5 py-2 bg-orange-500 text-white font-semibold rounded-r-full hover:bg-orange-600 transition"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
