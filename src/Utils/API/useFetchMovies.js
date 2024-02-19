import axios from "axios";
import { MOVIES_KEY, TMDB_BASE_URL } from "../constants";
import { API_OPTIONS } from "../constants";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../Slices/nowPlayingSlice";



const useFetchMovies = () => {
  const dispatch = useDispatch();

  const fetchMovies = async () => {
    try {
      const response = await axios.request({
        url: TMDB_BASE_URL + MOVIES_KEY,
        ...API_OPTIONS,
      });

      const movies = response.data.results;

      // Dispatch the action to update the Redux store
      dispatch(addNowPlayingMovies(movies));

    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return fetchMovies;
};

export default useFetchMovies;
