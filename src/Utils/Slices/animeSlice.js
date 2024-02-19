const { createSlice } = require("@reduxjs/toolkit");

const animeSlice = createSlice({
  name: "anime",
  initialState: {
    animeVideos: null,
  },
  reducers: {
    addAnime: (state, action) => {
      state.animeVideos = action.payload;},
  },
});

export const { addAnime } = animeSlice.actions;
export default animeSlice.reducer;
