import { createSlice } from "@reduxjs/toolkit";

const unitSlice = createSlice({
  name: "unit",
  initialState: "C",
  reducers: {
    toggleUnit: (state) => {
      return state === "C" ? "F" : "C";
    }
  }
});

export const {toggleUnit} = unitSlice.actions;

export default unitSlice.reducer;