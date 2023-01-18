import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await axios.get(BASE_URL);
    return response.data.drinks;
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    loading: false,
    fulfilled: false,
    hasErrors: false,
  },
  extraReducers: {
    [fetchCategories.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.loading = false;
      state.fulfilled = true;
      state.categories = action.payload;
    },
    [fetchCategories.rejected]: (state, action) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const drinksCategoriesSelector = (state) => state.categories;
export const drinksCategoriesLoadingSelector = (state) =>
  state.categories.loading;
export const drinksCategoriesFulfilledSelector = (state) =>
  state.categories.fulfilled;
export const drinksCategoriesHasErrorsSelector = (state) =>
  state.categories.hasErrors;

export default categoriesSlice.reducer;
