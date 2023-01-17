import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "global",
  initialState: {
    darkmode: false,
    showSidebar: true,
  },
  reducers: {
    toggleDarkMode: (state, { payload }) => {
      return {
        ...state,
        darkmode: payload,
      };
    },
    toggleSidebar: (state, { payload }) => {
      return {
        ...state,
        showSidebar: payload,
      };
    },
  },
});

export const { toggleDarkMode, toggleSidebar } = globalSlice.actions;

export default globalSlice.reducer;
