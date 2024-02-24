import { useState } from "react";
import "../../styles/search-bar.scss";
import { useNavigate } from "react-router";
import _debounce from "lodash/debounce";

const SearchBar = () => {
  const [active, setActive] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const debouncedNavigate = _debounce((value) => {
    navigate("/search/" + value);
  }, 1500);

  const handleChange = (e) => {
    setQuery(e.target.value)
    debouncedNavigate(e.target.value);
  };

  return (
    <>
      <div className={`search-bar ${active ? "active" : ""}`}>
        <span className="material-icons-outlined icon-left">search</span>
        <input
          onFocus={() => {
            setActive(true);
          }}
          onBlur={() => {
            setActive(false);
            setQuery("")
          }}
          value={query}
          type="text"
          placeholder="Titles, people, genres"
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default SearchBar;
