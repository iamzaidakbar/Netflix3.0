const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedInUser: {
      email: "",
      displayName: "",
      photoURL: "",
    },
  },
  reducers: {
    addUser: (state, action) => {
      console.log(state);
      state.loggedInUser = { ...action.payload };
    },
    removeUser: () => {
      return {
        email: "",
        displayName: "",
        photoURL: "",
      };
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
