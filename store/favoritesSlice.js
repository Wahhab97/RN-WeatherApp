import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    addFavorite: (state, action) => {
      if (state.find((item) => action.payload.name.toLowerCase() === item.name.toLowerCase())) {
        return state;
      } else {
        let tempArray = state
        tempArray.push(action.payload);
        return tempArray;
      }
    },
    removeFavorite: (state, action) => {
      let tempArray = state.filter((item) => item.name.toLowerCase() !== action.payload.toLowerCase());
      return tempArray;
    },
  }
});

export const {addFavorite, removeFavorite} = favoritesSlice.actions;

export default favoritesSlice.reducer;