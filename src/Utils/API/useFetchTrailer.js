import axios from "axios";
import {  TMDB_BASE_URL } from "../constants";
import { API_OPTIONS } from "../constants";
import { useDispatch } from "react-redux";
import { addMovieTrailer } from "../Slices/movieTrailerSlice";



const useFetchTrailer = () => {
  const dispatch = useDispatch();

  const fetchTrailers = async (videoId) => {
    try {
      const response = await axios.request({
        url: TMDB_BASE_URL + 'movie/' + videoId + '/videos',
        ...API_OPTIONS,
      });

      const trailers = response.data.results;

      // Dispatch the action to update the Redux store
      dispatch(addMovieTrailer(trailers));

    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return fetchTrailers;
};

export default useFetchTrailer;