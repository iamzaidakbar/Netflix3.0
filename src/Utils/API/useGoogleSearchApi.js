import { useState, useCallback } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { GOOGLE_SUGGESTION_API } from "../constants";

const useGoogleSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedGetGoogleApiSuggestions = useCallback(
    debounce(async (query) => {
      try {
        setLoading(true);
        const response = await axios.get(GOOGLE_SUGGESTION_API + query);
        setSuggestions(response.data[1]);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }, 500), // Adjust the debounce delay as needed
    []
  );

  const getGoogleApiSuggestions = (query) => {
    debouncedGetGoogleApiSuggestions(query);
  };

  return { getGoogleApiSuggestions, suggestions, loading, error };
};

export default useGoogleSuggestions;
