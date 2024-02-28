const { createSlice } = require("@reduxjs/toolkit");

const currentProfile = createSlice({
  name: "currentProfile",
  initialState: {
    currentUserProfile: null,
  },
  reducers: {
    addCurrentProfile: (state, action) => {
      state.currentUserProfile = action.payload;
    },
  },
});

export const { addCurrentProfile } = currentProfile.actions;
export default currentProfile.reducer;
