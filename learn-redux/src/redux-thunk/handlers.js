import { createAsyncThunk } from "@reduxjs/toolkit";
import requestGetNews from "./requests";

export const handleFetchNews = createAsyncThunk(
  "news/handleFetchNews",
  async (query, thunkAPI) => {
    const response = await requestGetNews(query);
    return response.data.hits;
  }
);
