const { configureStore } = require("@reduxjs/toolkit");
import moviesReducer from "../Slices/nowPlayingSlice";
import trailerReducer from "../Slices/movieTrailerSlice";
import animeReducer from "../Slices/animeSlice";
import topRatedReducer from "../Slices/topRatedSlice";

const Store = configureStore({
  reducer: {
    movies: moviesReducer,
    trailer: trailerReducer,
    anime: animeReducer,
    topRated: topRatedReducer,
  },
});

export default Store;
