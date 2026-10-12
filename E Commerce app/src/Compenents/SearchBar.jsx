import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearchText(value);

    // Send search value to parent component
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchText("");
    onSearch("");
  };

  return (
    <div className="search-container">

      <input
        type="text"
        placeholder="Search products..."
        value={searchText}
        onChange={handleSearch}
      />

      {searchText && (
        <button
          className="clear-btn"
          onClick={clearSearch}
        >
          ✕
        </button>
      )}

      <button className="search-btn">
        🔍
      </button>

    </div>
  );
}

export default SearchBar;