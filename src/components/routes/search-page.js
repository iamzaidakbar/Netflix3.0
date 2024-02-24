import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import VCard from "../common/v-card";
import { useParams } from "react-router";
import { setResults } from "../../Utils/Slices/searchSlice";
import { searchApiRequest } from "../../Utils/API/useSearchApiCall";
import Footer from "../common/footer";
import "../../styles/search-page.scss";
import useGoogleSuggestions from "../../Utils/API/useGoogleSearchApi";
import useSearchBar from "../../Utils/API/useSearchBar";

const Search = () => {
  const { setQuery, debouncedNavigate } = useSearchBar();

  const { getGoogleApiSuggestions, suggestions, loading } =
    useGoogleSuggestions();
  const { query } = useParams();
  const dispatch = useDispatch();
  const cachedResults = useSelector((state) => state?.search);

  const fetchData = async (searchQuery) => {
    const results = await searchApiRequest(searchQuery);
    dispatch(setResults({ [searchQuery]: results }));
  };

  useEffect(() => {
    const isQueryCached = cachedResults[query];
    if (!isQueryCached) {
      fetchData(query);
    }
    getGoogleApiSuggestions(query);
  }, [query, cachedResults]);

  const handleSuggestionClick = (suggestion) => {
    const formattedQuery = suggestion.split(" ").join("");
    setQuery(formattedQuery);
    debouncedNavigate(formattedQuery);
  };

  console.log(cachedResults[query]);
  return (
    <>
      {loading && <p>Loading...</p>}

      <label className="label">
        {suggestions.length > 0 ? (
          <span className="text">More to explore &#62;</span>
        ) : (
          <span className="text">Query &#62;</span>
        )}

        <span className="queries">
          {!loading && suggestions.length > 0
            ? suggestions.map((suggestion, index) => (
                <li
                  onClick={() => handleSuggestionClick(suggestion)}
                  key={index}
                >
                  {suggestion} {index === suggestions.length - 1 ? "" : "|"}
                </li>
              ))
            : query.toUpperCase()}
        </span>
      </label>

      <div className="Search">
        {cachedResults[query]?.length === 0 ? (
          <span className="no-cache-results">
            Your search for "{query}" did not find any matches.
          </span>
        ) : (
          cachedResults[query]?.map((data) => (
            <VCard data={data} key={data?.id} flag={false} />
          ))
        )}
      </div>

      <Footer />
    </>
  );
};

export default Search;
