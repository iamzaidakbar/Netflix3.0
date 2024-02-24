// Search.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import VCard from "../common/v-card";
import { useParams } from "react-router";
import { setResults } from "../../Utils/Slices/searchSlice";
import { searchApiRequest } from "../../Utils/API/useSearchApiCall";
import Footer from "../common/footer";
import "../../styles/search-page.scss";

const Search = () => {
  const { query } = useParams();
  const dispatch = useDispatch();
  const cachedResults = useSelector((state) => state?.search);

  async function fetchData() {
    const results = await searchApiRequest(query);
    dispatch(setResults({ [query]: results }));
  }
  useEffect(() => {
    if (cachedResults[query]) {
    } else {
      fetchData();
    }
  }, [query, cachedResults]);

  console.log(cachedResults[query]);

  return (
    <>
      <label className="label">
        <span className="text">Search &#62;</span> <span className="query">{query}</span>
      </label>
      <div className="Search">
        {cachedResults[query] &&
          cachedResults[query]
            ?.filter((item) => item?.backdrop_path && item?.original_title )
            ?.map((data) => <VCard data={data} key={data?.id} flag={false} />)}
      </div>
      <Footer />
    </>
  );
};

export default Search;
