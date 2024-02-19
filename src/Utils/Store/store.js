const { configureStore } = require("@reduxjs/toolkit");
import moviesReducer from "../Slices/nowPlayingSlice"
import trailerReducer from "../Slices/movieTrailerSlice"

const Store = configureStore({
  reducer: {
    movies: moviesReducer,
    trailer: trailerReducer
  },
});

export default Store;
