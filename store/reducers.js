import { combineReducers } from "@reduxjs/toolkit";
import favoritesSlice from "./favoritesSlice";
import unitSlice from "./unitSlice";


const RootReducer = combineReducers({
  favorites: favoritesSlice,
  unit: unitSlice,
});

export default RootReducer;