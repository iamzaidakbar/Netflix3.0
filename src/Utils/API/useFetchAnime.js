import axios from "axios";
import { TMDB_BASE_URL } from "../constants";
import { API_OPTIONS } from "../constants";
import { useDispatch } from "react-redux";
import { addAnime } from "../Slices/animeSlice";

const useFetchAnime = () => {
  const dispatch = useDispatch();

  const fetchAnime = async () => {
    try {
      const response = await axios.request({
        url: TMDB_BASE_URL + "discover/movie",
        params: {
          with_genres: "16",
        },
        ...API_OPTIONS,
      });

      const anime = response.data.results;

      // Dispatch the action to update the Redux store
      dispatch(addAnime(anime));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return fetchAnime;
};

export default useFetchAnime;
