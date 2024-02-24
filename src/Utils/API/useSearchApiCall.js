// api.js
import axios from "axios";
import { TMDB_BASE_URL } from "../constants";
import { API_OPTIONS } from "../constants";

export const searchApiRequest = async (query) => {
  try {
    const response = await axios.request({
      url: TMDB_BASE_URL + "search/multi",
      params: {
        query: query,
        page: 1,
      },
      ...API_OPTIONS,
    });
    return response.data.results;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
