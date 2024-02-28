const { createSlice } = require("@reduxjs/toolkit");

const profileSlice = createSlice({
  name: "avatar",
  initialState: {
    selectedAvatar: null,
  },
  reducers: {
    addAvatar: (state, action) => {
      state.selectedAvatar = action.payload;
    },
    removeAvatar: () => {
      return null;
    }
  },
});

export const { addAvatar, addDisplayName } = profileSlice.actions;
export default profileSlice.reducer;
