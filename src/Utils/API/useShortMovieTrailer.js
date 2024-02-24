import axios from "axios";
import { TMDB_BASE_URL } from "../constants";
import { API_OPTIONS } from "../constants";

const useFetchShortMovieTrailer = () => {
  const fetchShortMovieTrailers = async (videoId) => {
    try {
      const response = await axios.request({
        url: TMDB_BASE_URL + "movie/" + videoId + "/videos",
        ...API_OPTIONS,
      });

      if (response.status === 200) {
        const trailers = response.data.results;
        return trailers;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return fetchShortMovieTrailers;
};

export default useFetchShortMovieTrailer;
