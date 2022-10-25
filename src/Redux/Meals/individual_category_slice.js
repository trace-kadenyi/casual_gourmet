import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";

export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async (category) => {
    const response = await axios.get(`${BASE_URL}${category}`);
    return response.data.meals;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: [],
    loading: false,
  },
  extraReducers: {
    [fetchCategory.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.category = action.payload;
    },
    [fetchCategory.rejected]: (state, action) => {
      state.loading = false;
    }
  }
});

export default categorySlice.reducer;
