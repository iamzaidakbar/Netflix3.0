import axios from "axios";
import { TMDB_BASE_URL } from "../constants";
import { API_OPTIONS } from "../constants";

export const searchApiRequest = async (query, pageCount = 3) => {
  try {
    const requests = Array.from({ length: pageCount }, (_, page) =>
      axios.request({
        url: TMDB_BASE_URL + "search/multi",
        params: {
          query: query,
          page: page + 1, // Pages are 1-indexed
        },
        ...API_OPTIONS,
      })
    );

    const responses = await Promise.all(requests);
    const results = responses.flatMap((response) => response.data.results);
    return results;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
