const { createSlice } = require("@reduxjs/toolkit");

const movieTrailerSlice = createSlice({
  name: "trailer",
  initialState: {
    movieTrailer: null,
    movieTrailerDetails: null,
  },
  reducers: {
    addMovieTrailer: (state, action) => {
      state.movieTrailer = action.payload;
    },
    addMovieTrailerDetails: (state, action) => {
      state.movieTrailerDetails = action.payload
    }
  },
});

export const { addMovieTrailer, addMovieTrailerDetails } = movieTrailerSlice.actions;
export default movieTrailerSlice.reducer;
