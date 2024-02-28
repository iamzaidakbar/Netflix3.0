const { createSlice } = require("@reduxjs/toolkit");

const profileSlice = createSlice({
  name: "avatar",
  initialState: {
    selectedAvatar: null,
    name: "",
  },
  reducers: {
    addAvatar: (state, action) => {
      state.selectedAvatar = action.payload;
    },
    addDisplayName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { addAvatar, addDisplayName } = profileSlice.actions;
export default profileSlice.reducer;
