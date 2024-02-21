const { createSlice } = require("@reduxjs/toolkit");

const topRatedSlice = createSlice({
  name: "topRated",
  initialState: {
    topRatedVideos: null,
  },
  reducers: {
    addTopedVideos: (state, action) => {
      state.topRatedVideos = action.payload;
    },
  },
});

export const { addTopedVideos } = topRatedSlice.actions;
export default topRatedSlice.reducer;
