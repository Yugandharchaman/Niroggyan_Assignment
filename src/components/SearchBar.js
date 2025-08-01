import React from "react";

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="flex justify-end mb-4">
      <input
        type="text"
        placeholder="Search doctors..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-90 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;
