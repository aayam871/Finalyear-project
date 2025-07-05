const SearchBar = ({ value, onChange }) => (
  <div className="flex justify-center mb-8">
    <input
      type="text"
      placeholder="Search your cravings..."
      value={value}
      onChange={onChange}
      className="w-full text-lg text-black max-w-xl p-3 rounded-full border border-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
    />
  </div>
);

export default SearchBar;
