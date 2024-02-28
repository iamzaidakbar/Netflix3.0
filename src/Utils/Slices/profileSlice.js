const { createSlice } = require("@reduxjs/toolkit");

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    selectedAvatar: null,
  },
  reducers: {
    addAvatar: (state, action) => {
      state.selectedAvatar = action.payload;
    },

    removeAvatar: () => {
      return null;
    },
  },
});

export const { addAvatar, removeAvatar } = profileSlice.actions;
export default profileSlice.reducer;
