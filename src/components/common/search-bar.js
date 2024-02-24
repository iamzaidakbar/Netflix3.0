import React from "react";
import "../../styles/search-bar.scss";
import useSearchBar from "../../Utils/API/useSearchBar";

const SearchBar = () => {
  const {
    active,
    query,
    handleChange,
    handleFocus,
    handleBlur,
  } = useSearchBar();

  return (
    <>
      <div className={`search-bar ${active ? "active" : ""}`}>
        <span className="material-icons-outlined icon-left">search</span>
        <input
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={query}
          type="search"
          placeholder="Titles, people, genres"
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default SearchBar;
