import { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import _debounce from "lodash/debounce";

const useSearchBar = () => {
  const [active, setActive] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();


  const debouncedNavigate = useCallback(
    _debounce((value) => {
      navigate(value ? `/search/${value}` : "/home");
    }, 1500),
    [navigate]
  );

  const handleChange = useCallback(
    (e) => {
      setQuery(e.target.value);
      debouncedNavigate(e.target.value);
    },
    [debouncedNavigate]
  );

  const handleFocus = useCallback(() => {
    setActive(true);
  }, []);

  const handleBlur = useCallback(() => {
    setActive(false);
  }, []);

  const clearQuery = useCallback(() => {
    setQuery("");
    debouncedNavigate();
  }, [debouncedNavigate]);

  return {
    active,
    query,
    setQuery,
    handleChange,
    handleFocus,
    handleBlur,
    clearQuery,
    debouncedNavigate
  };
};

export default useSearchBar;
