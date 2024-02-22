const { createSlice } = require("@reduxjs/toolkit");

const myListSlice = createSlice({
  name: "myList",
  initialState: {
    myListVideos: [],
  },
  reducers: {
    addMyList: (state, action) => {
      const newItem = action.payload;

      // Check if the item already exists in the list
      const isDuplicate = state.myListVideos.some(
        (existingItem) => existingItem.id === newItem.id
      );

      // If not a duplicate, add the new item to the list
      if (!isDuplicate) {
        state.myListVideos.push(newItem);
      }
    },
  },
});

export const { addMyList } = myListSlice.actions;
export default myListSlice.reducer;
