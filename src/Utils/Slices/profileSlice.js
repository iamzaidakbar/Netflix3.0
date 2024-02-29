const { createSlice } = require("@reduxjs/toolkit");

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    selectedAvatar: "",
  },
  reducers: {
    addAvatar: (state, action) => {
      state.selectedAvatar = action.payload;
    },
  },
});

export const { addAvatar, removeAvatar } = profileSlice.actions;
export default profileSlice.reducer;
