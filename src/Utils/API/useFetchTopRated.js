import axios from "axios";
import { TMDB_BASE_URL } from "../constants";
import { API_OPTIONS } from "../constants";
import { useDispatch } from "react-redux";
import { addTopedVideos } from "../Slices/topRatedSlice";

const useFetchTopRated = () => {
  const dispatch = useDispatch();

  const fetchTopRated = async () => {
    try {
      const response = await axios.request({
        url: TMDB_BASE_URL + "discover/movie",
        ...API_OPTIONS,
      });

      const topRated = response.data.results.slice(0, 10);;

      // Dispatch the action to update the Redux store
      dispatch(addTopedVideos(topRated));

      console.log(topRated)
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return fetchTopRated;
};

export default useFetchTopRated;
