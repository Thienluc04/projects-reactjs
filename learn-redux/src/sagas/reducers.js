import { combineReducers } from "@reduxjs/toolkit";
import newsSlice from "../redux-thunk/newSlice";

export const reducer = combineReducers({
  news: newsSlice,
});
