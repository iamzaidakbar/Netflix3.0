import axios from "axios";
import { TMDB_BASE_URL } from "../constants";
import { API_OPTIONS } from "../constants";

const makeApiRequest = async (genreId) => {
  try {
    const response = await axios.request({
      url: TMDB_BASE_URL + "discover/movie",
      params: {
        with_genres: genreId,
      },
      ...API_OPTIONS,
    });
    return response.data.results;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default makeApiRequest;
