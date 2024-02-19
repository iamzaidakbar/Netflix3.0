const { createSlice } = require("@reduxjs/toolkit");

const movieTrailerSlice = createSlice({
  name: "trailer",
  initialState: {
    movieTrailer: null,
  },
  reducers: {
    addMovieTrailer: (state, action) => {
      state.movieTrailer = action.payload;},
  },
});

export const { addMovieTrailer } = movieTrailerSlice.actions;
export default movieTrailerSlice.reducer;
