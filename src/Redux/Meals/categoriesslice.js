import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1/categories.php";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await axios.get(BASE_URL);
    return response.data.categories;
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    loading: false,
    fulfilled: false,
  },
  extraReducers: {
    [fetchCategories.pending]: (state, action) => {
      state.loading = true;
      state.fulfilled = false;
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.loading = false;
      state.categories = action.payload;
      state.fulfilled = true;
    },
    [fetchCategories.rejected]: (state, action) => {
      state.loading = false;
      state.fulfilled = false;
    },
  },
});

export const fulfilledSelector = (state) => state.categories.fulfilled;
export default categoriesSlice.reducer;
