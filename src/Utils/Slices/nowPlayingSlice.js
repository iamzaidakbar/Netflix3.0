const { createSlice } = require("@reduxjs/toolkit");

const nowPlayingSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;},
  },
});

export const { addNowPlayingMovies } = nowPlayingSlice.actions;
export default nowPlayingSlice.reducer;
