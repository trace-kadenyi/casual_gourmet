import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic";

export const fetchCocktails = createAsyncThunk(
  "cocktails/fetchCocktails",
  async () => {
    const response = await axios.get(BASE_URL);
    return response.data.drinks;
  }
);

const cocktailSlice = createSlice({
  name: "cocktails",
  initialState: {
    cocktails: [],
    loading: false,
  },
  extraReducers: {
    [fetchCocktails.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchCocktails.fulfilled]: (state, action) => {
      state.loading = false;
      state.cocktails = action.payload;
    },
    [fetchCocktails.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default cocktailSlice.reducer;
